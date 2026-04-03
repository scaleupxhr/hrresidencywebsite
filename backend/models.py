from pydantic import BaseModel, EmailStr, Field
from typing import List, Optional, Dict
from datetime import datetime, timezone
import uuid

# User Model (for admin)
class User(BaseModel):
    email: EmailStr
    password_hash: str
    name: str
    role: str = "admin"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_active: bool = True

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

# Room Model
class Room(BaseModel):
    id: int
    name_en: str
    name_ml: str
    image: str
    bed_type_en: str
    bed_type_ml: str
    amenities_en: List[str]
    amenities_ml: List[str]
    price_per_night: int
    original_price: int
    is_available: bool = True  # Room availability status
    is_active: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    updated_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class RoomCreate(BaseModel):
    name_en: str
    name_ml: str
    image: str
    bed_type_en: str
    bed_type_ml: str
    amenities_en: List[str]
    amenities_ml: List[str]
    price_per_night: int
    original_price: int

class RoomUpdate(BaseModel):
    name_en: Optional[str] = None
    name_ml: Optional[str] = None
    image: Optional[str] = None
    bed_type_en: Optional[str] = None
    bed_type_ml: Optional[str] = None
    amenities_en: Optional[List[str]] = None
    amenities_ml: Optional[List[str]] = None
    price_per_night: Optional[int] = None
    original_price: Optional[int] = None
    is_available: Optional[bool] = None  # Allow updating room availability
    is_active: Optional[bool] = None

# Hotel Info Model
class HotelInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    whatsapp: str
    email: EmailStr
    address_en: str
    address_ml: str
    check_in: str
    check_out: str
    rating: float
    total_reviews: int
    updated_at: datetime = Field(default_factory=datetime.utcnow)

# Highlight Model
class Highlight(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    text_en: str
    text_ml: str
    order: int
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Review Model
class Review(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    rating: int
    date: str
    comment_en: str
    comment_ml: str
    avatar: str
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Gallery Image Model
class GalleryImage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    url: str
    alt: str
    category: str
    order: int = 0
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

# Analytics Model
class Analytics(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    event_type: str  # page_view, room_view, booking_click, whatsapp_click
    room_id: Optional[int] = None
    timestamp: datetime = Field(default_factory=datetime.utcnow)
    user_agent: Optional[str] = None
    ip_address: Optional[str] = None

# Booking Request (from WhatsApp)
class BookingRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    room_id: int
    room_name: str
    guest_name: str
    guest_phone: str
    check_in: str
    check_out: str
    guests: int
    status: str = "pending"  # pending, confirmed, cancelled
    created_at: datetime = Field(default_factory=datetime.utcnow)
