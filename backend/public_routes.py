from fastapi import APIRouter, HTTPException
from typing import List
from models import Room, HotelInfo, Review, GalleryImage
from motor.motor_asyncio import AsyncIOMotorClient
import os

router = APIRouter(prefix="/api/public", tags=["public"])

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

@router.get("/rooms", response_model=List[Room])
async def get_public_rooms():
    """Get all active and available rooms for public viewing"""
    rooms = await db.rooms.find(
        {"is_active": True},
        {"_id": 0}
    ).to_list(100)
    return rooms

@router.get("/rooms/{room_id}", response_model=Room)
async def get_room_by_id(room_id: int):
    """Get a specific room by ID"""
    room = await db.rooms.find_one({"id": room_id, "is_active": True}, {"_id": 0})
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    return room

@router.get("/hotel-info", response_model=HotelInfo)
async def get_public_hotel_info():
    """Get hotel information"""
    info = await db.hotel_info.find_one({}, {"_id": 0})
    if not info:
        # Return default info if not set
        return {
            "id": "default",
            "name": "HR Residency",
            "phone": "+91 9207765432",
            "whatsapp": "+919207765432",
            "email": "info@hrresidency.com",
            "address_en": "Near Medical College, Kozhikode, Kerala",
            "address_ml": "മെഡിക്കൽ കോളേജ് സമീപം, കോഴിക്കോട്, കേരളം",
            "check_in": "12:00 PM",
            "check_out": "11:00 AM",
            "rating": 4.8,
            "total_reviews": 150
        }
    return info

@router.get("/reviews", response_model=List[Review])
async def get_public_reviews():
    """Get all active reviews"""
    reviews = await db.reviews.find(
        {"is_active": True},
        {"_id": 0}
    ).sort("created_at", -1).to_list(100)
    return reviews

@router.get("/gallery", response_model=List[GalleryImage])
async def get_public_gallery():
    """Get all active gallery images"""
    images = await db.gallery.find(
        {"is_active": True},
        {"_id": 0}
    ).sort("order", 1).to_list(100)
    return images
