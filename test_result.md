# Testing Protocol

## Backend Testing
Test the following backend flows:

### 1. Authentication Flow
- POST /api/auth/login with correct credentials (scaleupxhr@gmail.com / Hrresidency123)
- POST /api/auth/login with incorrect credentials
- GET /api/auth/me with valid session
- POST /api/auth/logout

### 2. Admin Room Management
- GET /api/admin/rooms (authenticated)
- POST /api/admin/rooms (create new room)
- PUT /api/admin/rooms/{id} (update existing room)
- DELETE /api/admin/rooms/{id} (soft delete)

### 3. Public API
- GET /api/public/rooms (should return 3 seeded rooms)
- GET /api/public/rooms/{id}

## Frontend Testing (via Playwright)
Test the following UI flows:

### 1. Admin Login Flow
- Navigate to /admin/login
- Attempt login with wrong credentials → should show error
- Login with correct credentials (scaleupxhr@gmail.com / Hrresidency123) → should redirect to /admin/dashboard
- Verify dashboard shows room management interface

### 2. Room Management UI
- View existing rooms (should show 3 rooms)
- Click "Edit" on a room → form should populate
- Update room price → save → verify success message
- Click "Add New Room" → fill form → save → verify new room appears
- Update room availability checkbox → verify it saves
- Test "Delete" button → confirm dialog → verify room is deleted

### 3. Protected Routes
- Try accessing /admin/dashboard without login → should redirect to /admin/login
- After login, verify user can access dashboard
- Click logout → should redirect to login page

## Test Credentials
Email: scaleupxhr@gmail.com
Password: Hrresidency123

## Expected Behavior
- All auth endpoints should set httpOnly cookies
- All admin routes should require authentication
- Room CRUD operations should work correctly
- Public routes should work without authentication
- UI should be mobile-responsive and intuitive
