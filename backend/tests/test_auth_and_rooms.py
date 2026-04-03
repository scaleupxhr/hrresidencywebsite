"""
Backend API Tests for HR Residency Hotel Website
Tests: Authentication, Admin Room CRUD, Public API endpoints
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Test credentials from /app/memory/test_credentials.md
ADMIN_EMAIL = "scaleupxhr@gmail.com"
ADMIN_PASSWORD = "Hrresidency123"


class TestHealthCheck:
    """Basic health check tests"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data


class TestAuthentication:
    """Authentication endpoint tests"""
    
    def test_login_success(self):
        """Test successful admin login"""
        session = requests.Session()
        response = session.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
        )
        assert response.status_code == 200, f"Login failed: {response.text}"
        
        data = response.json()
        assert "access_token" in data
        assert "user" in data
        assert data["user"]["email"] == ADMIN_EMAIL
        assert data["user"]["role"] == "admin"
        
        # Check cookies are set
        assert "access_token" in session.cookies or "access_token" in response.cookies
    
    def test_login_invalid_credentials(self):
        """Test login with invalid credentials"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": "wrong@example.com", "password": "wrongpass"}
        )
        assert response.status_code == 401
        data = response.json()
        assert "detail" in data
    
    def test_login_invalid_password(self):
        """Test login with correct email but wrong password"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": ADMIN_EMAIL, "password": "wrongpassword"}
        )
        assert response.status_code == 401
        data = response.json()
        assert "detail" in data
    
    def test_get_me_without_auth(self):
        """Test /me endpoint without authentication"""
        response = requests.get(f"{BASE_URL}/api/auth/me")
        assert response.status_code == 401
    
    def test_get_me_with_auth(self):
        """Test /me endpoint with valid authentication"""
        session = requests.Session()
        # Login first
        login_response = session.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
        )
        assert login_response.status_code == 200
        
        # Get access token from response
        access_token = login_response.json().get("access_token")
        
        # Call /me with token in header
        me_response = session.get(
            f"{BASE_URL}/api/auth/me",
            headers={"Authorization": f"Bearer {access_token}"}
        )
        assert me_response.status_code == 200
        
        data = me_response.json()
        assert data["email"] == ADMIN_EMAIL
        assert data["role"] == "admin"
    
    def test_logout(self):
        """Test logout endpoint"""
        session = requests.Session()
        # Login first
        login_response = session.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
        )
        assert login_response.status_code == 200
        
        # Logout
        logout_response = session.post(f"{BASE_URL}/api/auth/logout")
        assert logout_response.status_code == 200
        data = logout_response.json()
        assert "message" in data


class TestAdminRoomsCRUD:
    """Admin room CRUD operations tests"""
    
    @pytest.fixture
    def auth_session(self):
        """Create authenticated session"""
        session = requests.Session()
        login_response = session.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
        )
        assert login_response.status_code == 200
        access_token = login_response.json().get("access_token")
        session.headers.update({"Authorization": f"Bearer {access_token}"})
        return session
    
    def test_get_rooms_without_auth(self):
        """Test getting rooms without authentication"""
        response = requests.get(f"{BASE_URL}/api/admin/rooms")
        assert response.status_code == 401
    
    def test_get_rooms_with_auth(self, auth_session):
        """Test getting rooms with authentication"""
        response = auth_session.get(f"{BASE_URL}/api/admin/rooms")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
    
    def test_create_room(self, auth_session):
        """Test creating a new room"""
        room_data = {
            "name_en": "TEST_Deluxe Suite",
            "name_ml": "ടെസ്റ്റ് ഡീലക്സ് സ്യൂട്ട്",
            "image": "https://example.com/test-room.jpg",
            "bed_type_en": "King Size Bed",
            "bed_type_ml": "കിംഗ് സൈസ് ബെഡ്",
            "amenities_en": ["AC", "WiFi", "TV"],
            "amenities_ml": ["എസി", "വൈഫൈ", "ടിവി"],
            "price_per_night": 2500,
            "original_price": 3000
        }
        
        response = auth_session.post(
            f"{BASE_URL}/api/admin/rooms",
            json=room_data
        )
        assert response.status_code == 200, f"Create room failed: {response.text}"
        
        data = response.json()
        assert data["name_en"] == room_data["name_en"]
        assert data["price_per_night"] == room_data["price_per_night"]
        assert data["is_available"] == True
        assert "id" in data
        
        # Store room ID for cleanup
        return data["id"]
    
    def test_create_and_get_room(self, auth_session):
        """Test creating a room and verifying it persists"""
        # Create room
        room_data = {
            "name_en": "TEST_Verify Room",
            "name_ml": "ടെസ്റ്റ് വെരിഫൈ റൂം",
            "image": "https://example.com/verify-room.jpg",
            "bed_type_en": "Double Bed",
            "bed_type_ml": "ഡബിൾ ബെഡ്",
            "amenities_en": ["AC", "WiFi"],
            "amenities_ml": ["എസി", "വൈഫൈ"],
            "price_per_night": 1800,
            "original_price": 2200
        }
        
        create_response = auth_session.post(
            f"{BASE_URL}/api/admin/rooms",
            json=room_data
        )
        assert create_response.status_code == 200
        created_room = create_response.json()
        room_id = created_room["id"]
        
        # Verify room exists in list
        get_response = auth_session.get(f"{BASE_URL}/api/admin/rooms")
        assert get_response.status_code == 200
        rooms = get_response.json()
        
        found_room = next((r for r in rooms if r["id"] == room_id), None)
        assert found_room is not None, "Created room not found in list"
        assert found_room["name_en"] == room_data["name_en"]
        assert found_room["price_per_night"] == room_data["price_per_night"]
    
    def test_update_room(self, auth_session):
        """Test updating a room"""
        # First create a room
        room_data = {
            "name_en": "TEST_Update Room",
            "name_ml": "ടെസ്റ്റ് അപ്ഡേറ്റ് റൂം",
            "image": "https://example.com/update-room.jpg",
            "bed_type_en": "Single Bed",
            "bed_type_ml": "സിംഗിൾ ബെഡ്",
            "amenities_en": ["AC"],
            "amenities_ml": ["എസി"],
            "price_per_night": 1200,
            "original_price": 1500
        }
        
        create_response = auth_session.post(
            f"{BASE_URL}/api/admin/rooms",
            json=room_data
        )
        assert create_response.status_code == 200
        room_id = create_response.json()["id"]
        
        # Update the room
        update_data = {
            "price_per_night": 1400,
            "is_available": False
        }
        
        update_response = auth_session.put(
            f"{BASE_URL}/api/admin/rooms/{room_id}",
            json=update_data
        )
        assert update_response.status_code == 200
        
        updated_room = update_response.json()
        assert updated_room["price_per_night"] == 1400
        assert updated_room["is_available"] == False
        
        # Verify update persisted
        get_response = auth_session.get(f"{BASE_URL}/api/admin/rooms")
        rooms = get_response.json()
        found_room = next((r for r in rooms if r["id"] == room_id), None)
        assert found_room["price_per_night"] == 1400
        assert found_room["is_available"] == False
    
    def test_delete_room(self, auth_session):
        """Test deleting a room (soft delete)"""
        # First create a room
        room_data = {
            "name_en": "TEST_Delete Room",
            "name_ml": "ടെസ്റ്റ് ഡിലീറ്റ് റൂം",
            "image": "https://example.com/delete-room.jpg",
            "bed_type_en": "Single Bed",
            "bed_type_ml": "സിംഗിൾ ബെഡ്",
            "amenities_en": ["AC"],
            "amenities_ml": ["എസി"],
            "price_per_night": 1000,
            "original_price": 1200
        }
        
        create_response = auth_session.post(
            f"{BASE_URL}/api/admin/rooms",
            json=room_data
        )
        assert create_response.status_code == 200
        room_id = create_response.json()["id"]
        
        # Delete the room
        delete_response = auth_session.delete(f"{BASE_URL}/api/admin/rooms/{room_id}")
        assert delete_response.status_code == 200
        
        data = delete_response.json()
        assert "message" in data
    
    def test_update_nonexistent_room(self, auth_session):
        """Test updating a room that doesn't exist"""
        update_response = auth_session.put(
            f"{BASE_URL}/api/admin/rooms/99999",
            json={"price_per_night": 1000}
        )
        assert update_response.status_code == 404


class TestPublicAPI:
    """Public API endpoint tests"""
    
    def test_get_public_rooms(self):
        """Test getting public rooms (no auth required)"""
        response = requests.get(f"{BASE_URL}/api/public/rooms")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
    
    def test_get_public_hotel_info(self):
        """Test getting public hotel info"""
        response = requests.get(f"{BASE_URL}/api/public/hotel-info")
        assert response.status_code == 200
        data = response.json()
        assert "name" in data
        assert "phone" in data
    
    def test_get_public_reviews(self):
        """Test getting public reviews"""
        response = requests.get(f"{BASE_URL}/api/public/reviews")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)
    
    def test_get_public_gallery(self):
        """Test getting public gallery"""
        response = requests.get(f"{BASE_URL}/api/public/gallery")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)


class TestBruteForceProtection:
    """Test brute force protection (limited tests to avoid lockout)"""
    
    def test_failed_login_recorded(self):
        """Test that failed logins are recorded"""
        # Make one failed attempt
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": "bruteforce_test@example.com", "password": "wrongpass"}
        )
        assert response.status_code == 401
        # We don't test full lockout to avoid affecting other tests


# Cleanup fixture to remove test data
@pytest.fixture(scope="session", autouse=True)
def cleanup_test_rooms():
    """Cleanup TEST_ prefixed rooms after all tests"""
    yield
    # Cleanup after tests
    try:
        session = requests.Session()
        login_response = session.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
        )
        if login_response.status_code == 200:
            access_token = login_response.json().get("access_token")
            session.headers.update({"Authorization": f"Bearer {access_token}"})
            
            # Get all rooms and delete TEST_ prefixed ones
            rooms_response = session.get(f"{BASE_URL}/api/admin/rooms")
            if rooms_response.status_code == 200:
                rooms = rooms_response.json()
                for room in rooms:
                    if room.get("name_en", "").startswith("TEST_"):
                        session.delete(f"{BASE_URL}/api/admin/rooms/{room['id']}")
    except Exception as e:
        print(f"Cleanup error: {e}")
