from fastapi import APIRouter, HTTPException, Response, Request, Depends
from models import User, LoginRequest
from auth import hash_password, verify_password, create_access_token, create_refresh_token, get_current_user
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime, timezone, timedelta
import jwt
from auth import get_jwt_secret, JWT_ALGORITHM

router = APIRouter(prefix="/api/auth", tags=["auth"])

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Brute force protection helper
async def check_brute_force(identifier: str) -> bool:
    """Check if login attempts exceed limit (5 attempts = 15 min lockout)"""
    attempt = await db.login_attempts.find_one({"identifier": identifier})
    
    if not attempt:
        return True  # No previous attempts, allow
    
    if attempt.get("locked_until"):
        if datetime.now(timezone.utc) < attempt["locked_until"]:
            return False  # Still locked out
        else:
            # Lockout expired, clear it
            await db.login_attempts.delete_one({"identifier": identifier})
            return True
    
    return attempt.get("count", 0) < 5

async def record_failed_login(identifier: str):
    """Record a failed login attempt"""
    attempt = await db.login_attempts.find_one({"identifier": identifier})
    
    if not attempt:
        await db.login_attempts.insert_one({
            "identifier": identifier,
            "count": 1,
            "last_attempt": datetime.now(timezone.utc)
        })
    else:
        count = attempt.get("count", 0) + 1
        update_data = {
            "count": count,
            "last_attempt": datetime.now(timezone.utc)
        }
        
        if count >= 5:
            # Lock for 15 minutes
            update_data["locked_until"] = datetime.now(timezone.utc) + timedelta(minutes=15)
        
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {"$set": update_data}
        )

async def clear_login_attempts(identifier: str):
    """Clear login attempts on successful login"""
    await db.login_attempts.delete_one({"identifier": identifier})

@router.post("/login")
async def login(credentials: LoginRequest, request: Request, response: Response):
    """Admin login endpoint"""
    email = credentials.email.lower()
    
    # Check brute force protection
    identifier = f"{request.client.host}:{email}"
    if not await check_brute_force(identifier):
        raise HTTPException(
            status_code=429,
            detail="Too many failed login attempts. Please try again in 15 minutes."
        )
    
    # Find user
    user = await db.users.find_one({"email": email}, {"_id": 0})
    
    if not user or not verify_password(credentials.password, user["password_hash"]):
        await record_failed_login(identifier)
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    if not user.get("is_active", True):
        raise HTTPException(status_code=401, detail="Account is inactive")
    
    # Clear failed attempts
    await clear_login_attempts(identifier)
    
    # Create tokens (using email as user_id for admin users)
    access_token = create_access_token(user["email"], user["email"])
    refresh_token = create_refresh_token(user["email"])
    
    # Set httpOnly cookies
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=900,  # 15 minutes
        path="/"
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=604800,  # 7 days
        path="/"
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "email": user["email"],
            "name": user["name"],
            "role": user["role"]
        }
    }

@router.post("/logout")
async def logout(response: Response):
    """Logout endpoint - clears auth cookies"""
    response.delete_cookie(key="access_token", path="/")
    response.delete_cookie(key="refresh_token", path="/")
    return {"message": "Logged out successfully"}

@router.get("/me")
async def get_me(request: Request):
    """Get current user information"""
    user = await get_current_user(request, db)
    return user

@router.post("/refresh")
async def refresh_token(request: Request, response: Response):
    """Refresh access token using refresh token"""
    refresh_token = request.cookies.get("refresh_token")
    
    if not refresh_token:
        raise HTTPException(status_code=401, detail="No refresh token")
    
    try:
        payload = jwt.decode(refresh_token, get_jwt_secret(), algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "refresh":
            raise HTTPException(status_code=401, detail="Invalid token type")
        
        email = payload.get("sub")
        user = await db.users.find_one({"email": email}, {"_id": 0})
        
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        
        # Create new access token
        new_access_token = create_access_token(user["email"], user["email"])
        
        # Set new access token cookie
        response.set_cookie(
            key="access_token",
            value=new_access_token,
            httponly=True,
            secure=False,
            samesite="lax",
            max_age=900,
            path="/"
        )
        
        return {"access_token": new_access_token, "token_type": "bearer"}
    
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Refresh token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid refresh token")
