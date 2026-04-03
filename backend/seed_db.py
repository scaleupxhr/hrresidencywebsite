"""
Database seeding script for HR Residency
Populates initial room data from mock data
"""
import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
import os
from datetime import datetime, timezone
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Initial room data based on mockData.js
INITIAL_ROOMS = [
    {
        "id": 1,
        "name_en": "Standard AC Room",
        "name_ml": "സ്റ്റാൻഡേർഡ് എസി റൂം",
        "image": "https://customer-assets.emergentagent.com/job_malabar-stay/artifacts/o5zi4nnv_2025-01-20%20%281%29.jpg",
        "bed_type_en": "Double Bed",
        "bed_type_ml": "ഡബിൾ ബെഡ്",
        "amenities_en": ["Air Conditioning", "Private Bathroom", "Work Desk", "Free Toiletries", "Hot Water", "TV"],
        "amenities_ml": ["എയർ കണ്ടീഷനിംഗ്", "സ്വകാര്യ കുളിമുറി", "വർക്ക് ഡെസ്ക്", "സൗജന്യ ടോയ്‌ലട്രീസ്", "ചൂടുവെള്ളം", "ടിവി"],
        "price_per_night": 1400,
        "original_price": 1800,
        "is_available": True,
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc)
    },
    {
        "id": 2,
        "name_en": "Non-AC Room",
        "name_ml": "നോൺ-എസി റൂം",
        "image": "https://customer-assets.emergentagent.com/job_malabar-stay/artifacts/1fwi9297_2025-02-05%20%283%29.jpg",
        "bed_type_en": "Double Bed",
        "bed_type_ml": "ഡബിൾ ബെഡ്",
        "amenities_en": ["Ceiling Fan", "Private Bathroom", "Free Toiletries", "Hot Water", "Window View"],
        "amenities_ml": ["സീലിംഗ് ഫാൻ", "സ്വകാര്യ കുളിമുറി", "സൗജന്യ ടോയ്‌ലട്രീസ്", "ചൂടുവെള്ളം", "വിൻഡോ വ്യൂ"],
        "price_per_night": 1100,
        "original_price": 1300,
        "is_available": True,
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc)
    },
    {
        "id": 3,
        "name_en": "Single Room",
        "name_ml": "സിംഗിൾ റൂം",
        "image": "https://customer-assets.emergentagent.com/job_malabar-stay/artifacts/mkhs515v_hr%20residency%20single%20rom.jpeg",
        "bed_type_en": "Single Bed",
        "bed_type_ml": "സിംഗിൾ ബെഡ്",
        "amenities_en": ["Ceiling Fan", "Private Bathroom", "Free Toiletries", "Hot Water", "Window View"],
        "amenities_ml": ["സീലിംഗ് ഫാൻ", "സ്വകാര്യ കുളിമുറി", "സൗജന്യ ടോയ്‌ലട്രീസ്", "ചൂടുവെള്ളം", "വിൻഡോ വ്യൂ"],
        "price_per_night": 799,
        "original_price": 999,
        "is_available": True,
        "is_active": True,
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc)
    }
]

async def seed_rooms():
    """Seed initial room data"""
    print("🌱 Seeding rooms...")
    
    # Check if rooms already exist
    existing_count = await db.rooms.count_documents({})
    if existing_count > 0:
        print(f"✅ Rooms already seeded ({existing_count} rooms exist)")
        return
    
    # Insert initial rooms
    await db.rooms.insert_many(INITIAL_ROOMS)
    print(f"✅ Inserted {len(INITIAL_ROOMS)} rooms")

async def main():
    """Main seeding function"""
    print("🚀 Starting database seeding...")
    await seed_rooms()
    print("✅ Database seeding completed!")
    client.close()

if __name__ == "__main__":
    asyncio.run(main())
