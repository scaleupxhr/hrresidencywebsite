from fastapi import APIRouter, HTTPException, Depends, Request
from typing import List, Optional
from models import (
    User, LoginRequest, Room, RoomCreate, RoomUpdate,
    HotelInfo, Highlight, Review, GalleryImage, Analytics, BookingRequest
)
from auth import get_current_user
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime, timezone, timedelta

router = APIRouter(prefix="/api/admin", tags=["admin"])

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Dependency to verify admin token
async def get_current_admin(request: Request):
    """Get current admin user from request"""
    user = await get_current_user(request, db)
    
    if user.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")
    
    return user

# ============ AUTH ENDPOINTS ============
# (Auth endpoints moved to auth_routes.py)

# ============ ROOM ENDPOINTS ============

@router.get("/rooms", response_model=List[Room])
async def get_rooms(request: Request, admin = Depends(get_current_admin)):
    """Get all rooms"""
    rooms = await db.rooms.find({}, {"_id": 0}).to_list(100)
    return rooms

@router.post("/rooms", response_model=Room)
async def create_room(room: RoomCreate, request: Request, admin = Depends(get_current_admin)):
    """Create a new room"""
    # Get next ID
    last_room = await db.rooms.find_one(sort=[("id", -1)], projection={"id": 1, "_id": 0})
    next_id = (last_room["id"] + 1) if last_room else 1
    
    room_dict = room.model_dump()
    room_dict["id"] = next_id
    room_dict["is_available"] = True
    room_dict["is_active"] = True
    room_dict["created_at"] = datetime.now(timezone.utc)
    room_dict["updated_at"] = datetime.now(timezone.utc)
    
    await db.rooms.insert_one(room_dict)
    return room_dict

@router.put("/rooms/{room_id}", response_model=Room)
async def update_room(room_id: int, room_update: RoomUpdate, request: Request, admin = Depends(get_current_admin)):
    """Update a room"""
    existing_room = await db.rooms.find_one({"id": room_id}, {"_id": 0})
    if not existing_room:
        raise HTTPException(status_code=404, detail="Room not found")
    
    update_data = {k: v for k, v in room_update.model_dump().items() if v is not None}
    update_data["updated_at"] = datetime.now(timezone.utc)
    
    await db.rooms.update_one({"id": room_id}, {"$set": update_data})
    
    updated_room = await db.rooms.find_one({"id": room_id}, {"_id": 0})
    return updated_room

@router.delete("/rooms/{room_id}")
async def delete_room(room_id: int, request: Request, admin = Depends(get_current_admin)):
    """Soft delete a room"""
    result = await db.rooms.update_one(
        {"id": room_id},
        {"$set": {"is_active": False, "updated_at": datetime.now(timezone.utc)}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Room not found")
    
    return {"message": "Room deleted successfully"}

# ============ HOTEL INFO ENDPOINTS ============

@router.get("/hotel-info", response_model=HotelInfo)
async def get_hotel_info(admin = Depends(get_current_admin)):
    """Get hotel information"""
    info = await db.hotel_info.find_one()
    if not info:
        raise HTTPException(status_code=404, detail="Hotel info not found")
    return info

@router.put("/hotel-info", response_model=HotelInfo)
async def update_hotel_info(info: HotelInfo, admin = Depends(get_current_admin)):
    """Update hotel information"""
    info_dict = info.dict()
    info_dict["updated_at"] = datetime.utcnow()
    
    await db.hotel_info.update_one({}, {"$set": info_dict}, upsert=True)
    
    updated_info = await db.hotel_info.find_one()
    return updated_info

# ============ HIGHLIGHTS ENDPOINTS ============

@router.get("/highlights", response_model=List[Highlight])
async def get_highlights(admin = Depends(get_current_admin)):
    """Get all highlights"""
    highlights = await db.highlights.find({"is_active": True}).sort("order", 1).to_list(100)
    return highlights

@router.post("/highlights", response_model=Highlight)
async def create_highlight(highlight: Highlight, admin = Depends(get_current_admin)):
    """Create a new highlight"""
    await db.highlights.insert_one(highlight.dict())
    return highlight

@router.put("/highlights/{highlight_id}", response_model=Highlight)
async def update_highlight(highlight_id: str, highlight: Highlight, admin = Depends(get_current_admin)):
    """Update a highlight"""
    await db.highlights.update_one({"id": highlight_id}, {"$set": highlight.dict()})
    updated = await db.highlights.find_one({"id": highlight_id})
    return updated

@router.delete("/highlights/{highlight_id}")
async def delete_highlight(highlight_id: str, admin = Depends(get_current_admin)):
    """Delete a highlight"""
    await db.highlights.update_one({"id": highlight_id}, {"$set": {"is_active": False}})
    return {"message": "Highlight deleted"}

# ============ REVIEWS ENDPOINTS ============

@router.get("/reviews", response_model=List[Review])
async def get_reviews(admin = Depends(get_current_admin)):
    """Get all reviews"""
    reviews = await db.reviews.find({"is_active": True}).to_list(100)
    return reviews

@router.post("/reviews", response_model=Review)
async def create_review(review: Review, admin = Depends(get_current_admin)):
    """Create a new review"""
    await db.reviews.insert_one(review.dict())
    return review

@router.put("/reviews/{review_id}", response_model=Review)
async def update_review(review_id: str, review: Review, admin = Depends(get_current_admin)):
    """Update a review"""
    await db.reviews.update_one({"id": review_id}, {"$set": review.dict()})
    updated = await db.reviews.find_one({"id": review_id})
    return updated

@router.delete("/reviews/{review_id}")
async def delete_review(review_id: str, admin = Depends(get_current_admin)):
    """Delete a review"""
    await db.reviews.update_one({"id": review_id}, {"$set": {"is_active": False}})
    return {"message": "Review deleted"}

# ============ GALLERY ENDPOINTS ============

@router.get("/gallery", response_model=List[GalleryImage])
async def get_gallery_images(admin = Depends(get_current_admin)):
    """Get all gallery images"""
    images = await db.gallery.find({"is_active": True}).sort("order", 1).to_list(100)
    return images

@router.post("/gallery", response_model=GalleryImage)
async def add_gallery_image(image: GalleryImage, admin = Depends(get_current_admin)):
    """Add a new gallery image"""
    await db.gallery.insert_one(image.dict())
    return image

@router.delete("/gallery/{image_id}")
async def delete_gallery_image(image_id: str, admin = Depends(get_current_admin)):
    """Delete a gallery image"""
    await db.gallery.update_one({"id": image_id}, {"$set": {"is_active": False}})
    return {"message": "Image deleted"}

# ============ ANALYTICS ENDPOINTS ============

@router.get("/analytics/summary")
async def get_analytics_summary(days: int = 7, admin = Depends(get_current_admin)):
    """Get analytics summary"""
    since = datetime.utcnow() - timedelta(days=days)
    
    # Total views
    total_views = await db.analytics.count_documents({
        "event_type": "page_view",
        "timestamp": {"$gte": since}
    })
    
    # Room views
    room_views = await db.analytics.count_documents({
        "event_type": "room_view",
        "timestamp": {"$gte": since}
    })
    
    # Booking clicks
    booking_clicks = await db.analytics.count_documents({
        "event_type": "booking_click",
        "timestamp": {"$gte": since}
    })
    
    # WhatsApp clicks
    whatsapp_clicks = await db.analytics.count_documents({
        "event_type": "whatsapp_click",
        "timestamp": {"$gte": since}
    })
    
    # Most viewed rooms
    pipeline = [
        {"$match": {"event_type": "room_view", "timestamp": {"$gte": since}}},
        {"$group": {"_id": "$room_id", "count": {"$sum": 1}}},
        {"$sort": {"count": -1}},
        {"$limit": 3}
    ]
    room_stats = await db.analytics.aggregate(pipeline).to_list(3)
    
    return {
        "period_days": days,
        "total_page_views": total_views,
        "room_views": room_views,
        "booking_clicks": booking_clicks,
        "whatsapp_clicks": whatsapp_clicks,
        "most_viewed_rooms": room_stats
    }

@router.get("/booking-requests", response_model=List[BookingRequest])
async def get_booking_requests(admin = Depends(get_current_admin)):
    """Get all booking requests"""
    requests = await db.booking_requests.find().sort("created_at", -1).to_list(100)
    return requests
