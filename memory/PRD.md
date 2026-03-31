# Product Requirements Document (PRD)
## HR Residency Hotel Website

### Project Overview
**Project Name:** HR Residency Website  
**Date Created:** March 31, 2026  
**Status:** Phase 1 Complete (Frontend with Mock Data)

---

## Original Problem Statement
Build a modern, user-friendly hotel website for HR Residency, a budget-friendly hotel in Kozhikode, Kerala, India. The website should showcase the hotel's rooms, amenities, location, and guest reviews, with a warm coastal Kerala luxury aesthetic.

---

## Target Audience
- **Primary Users:**
  - Budget-conscious travelers (local and international)
  - Business travelers seeking affordable accommodation
  - Families visiting Kozhikode
  - Tourists exploring Kerala's Malabar coast

- **User Personas:**
  1. **Local Business Traveler** - Needs quick booking, clear pricing, central location
  2. **Family Vacationer** - Wants to see room types, nearby attractions, family-friendly amenities
  3. **International Tourist** - Seeks authentic Kerala experience, reviews, easy communication

---

## Core Requirements

### Design & Aesthetics
- **Color Palette:** Deep teals, sandy beiges, terracotta accents (coastal Kerala luxury)
- **Typography:** Playfair Display (serif) for headings, Inter (sans-serif) for body
- **Mood:** Approachable, trustworthy, welcoming boutique hotel feel
- **Key Features:**
  - Warm overlay images of Kozhikode Beach
  - Smooth animations and transitions
  - Fully responsive mobile-first design
  - Bilingual support (English + Malayalam)

### Functional Requirements
1. **Multi-language Support** - English and Malayalam with toggle
2. **Mock Booking System** - Date selection and availability check (frontend only)
3. **Photo Gallery** - Display hotel images with lightbox view
4. **Google Maps Integration** - Embedded map showing hotel location
5. **WhatsApp Integration** - Floating chat button for direct messaging
6. **External Booking Links** - Links to MakeMyTrip, Booking.com, Agoda
7. **Responsive Navigation** - Smooth scroll to sections
8. **Guest Reviews Display** - Show Google reviews with ratings

---

## Architecture

### Technology Stack
- **Frontend:** React 19, Tailwind CSS, shadcn/ui components
- **State Management:** React useState hooks
- **Routing:** Single-page application (no routing needed)
- **Mock Data:** `/app/frontend/src/data/mockData.js`

### Folder Structure
```
/app/frontend/src/
├── components/
│   ├── AboutSection.jsx
│   ├── AmenitiesSection.jsx
│   ├── AttractionsSection.jsx
│   ├── BookingWidget.jsx
│   ├── Footer.jsx
│   ├── GallerySection.jsx
│   ├── Header.jsx
│   ├── HeroSection.jsx
│   ├── LanguageToggle.jsx
│   ├── LocationSection.jsx
│   ├── ReviewsSection.jsx
│   ├── RoomsSection.jsx
│   ├── WhatsAppButton.jsx
│   └── ui/ (shadcn components)
├── data/
│   └── mockData.js
├── App.js
├── App.css
└── index.css
```

---

## What's Been Implemented (Phase 1 - March 31, 2026)

### ✅ Completed Features
1. **Hero Section**
   - Full-screen background with rotating Kozhikode beach images (4 images)
   - Hotel name and tagline
   - Google rating badge (4.5 stars, 107 reviews)
   - Booking widget with date pickers
   - Smooth scroll indicator

2. **About Section**
   - Hotel description in both languages
   - Contact information cards (phone, location, email)
   - Check-in/check-out times
   - "Why Choose Us" highlights panel

3. **Rooms Section**
   - 3 room type cards (Standard AC, Non-AC, Family)
   - Room images, amenities, pricing with discounts
   - Mock booking functionality with toast notifications
   - Hover effects and animations

4. **Amenities Section**
   - 8 amenity cards with icons (parking, 24/7 desk, WiFi, etc.)
   - Bilingual labels
   - Hover animations

5. **Photo Gallery**
   - 5 hotel images in masonry grid layout
   - Lightbox modal for full-screen viewing
   - User-provided images integrated

6. **Nearby Attractions**
   - 7 attraction cards with distances and travel times
   - Images of Kerala temples, beaches, museums
   - Icon-based categorization

7. **Guest Reviews Section**
   - Overall rating card with 4.5/5 display
   - Rating distribution bar chart
   - 4 featured review cards with avatars
   - Link to Google reviews

8. **Location & Contact Section**
   - Embedded Google Maps iframe
   - Contact information cards
   - Contact form with mock submission
   - "Get Directions" link

9. **Footer**
   - Booking platform links (MakeMyTrip, Booking.com, Agoda)
   - Quick navigation links
   - Contact information
   - Copyright notice

10. **Additional Features**
    - Sticky header with scroll effects
    - Language toggle (English ↔ Malayalam)
    - Floating WhatsApp button (appears on scroll)
    - Toast notifications for user actions
    - Smooth scroll navigation
    - Fully responsive design

### Images Used
- **User-Provided:** 5 hotel images (exterior and room photos)
- **Curated:** 8 professional images (beaches, temples, attractions)

---

## Mock Data Structure

All data is stored in `/app/frontend/src/data/mockData.js`:
- `hotelInfo` - Name, contact, location, rating
- `roomTypes` - 3 rooms with pricing and amenities
- `amenities` - 8 hotel facilities
- `nearbyAttractions` - 7 local destinations
- `reviews` - 4 guest reviews
- `ratingDistribution` - 5-star breakdown
- `galleryImages` - 5 photo URLs
- `bookingPlatforms` - External booking links

---

## Next Tasks (Prioritized Backlog)

### P0 - Phase 2: Backend Development
1. Set up MongoDB models for:
   - Bookings (check-in, check-out, room type, guest info)
   - Contact form submissions
   - Room availability tracking
2. Create FastAPI endpoints:
   - `POST /api/bookings` - Create booking request
   - `GET /api/bookings/:id` - Get booking details
   - `POST /api/contact` - Submit contact form
   - `GET /api/rooms/availability` - Check real-time availability
3. Remove mock data and integrate backend APIs
4. Add email notifications for bookings

### P1 - Enhancement Features
1. Admin dashboard for managing bookings
2. Real-time room availability calendar
3. Payment gateway integration (Razorpay/Stripe)
4. Email confirmation system
5. Multi-currency support
6. SEO optimization (meta tags, sitemap)

### P2 - Future Improvements
1. Add more photos to gallery
2. Blog section for local travel tips
3. Special offers/packages section
4. Customer testimonial video embeds
5. Live chat support
6. Mobile app development

---

## Design Specifications

### Color Palette
- **Primary Teal:** #0d9488 (teal-600)
- **Secondary Teal:** #14b8a6 (teal-500)
- **Accent Red:** #dc2626 (red-600)
- **Neutral Beige:** #f8fafc (slate-50)
- **Dark Text:** #1e293b (slate-800)

### Typography
- **Headings:** Playfair Display (serif, 400-800 weight)
- **Body:** Inter (sans-serif, 300-700 weight)

### Spacing
- Section padding: 80px vertical (py-20)
- Container max-width: 1280px
- Card spacing: 32px gap (gap-8)

---

## Integrations

### Current Integrations
1. **Google Maps** - Embedded map with hotel location
2. **WhatsApp Business** - Click-to-chat button (918848889016)
3. **External Booking Platforms** - Links to MakeMyTrip, Booking.com, Agoda

### Future Integrations
1. Google Analytics for tracking
2. Facebook Pixel for ads
3. Booking engine API (e.g., RoomRaccoon, Beds24)
4. Email service (SendGrid/Mailgun)
5. Payment gateway (Razorpay)

---

## Success Metrics (To Be Tracked)
- Booking conversion rate
- Average time on site
- Most viewed rooms
- Language preference split
- WhatsApp inquiry rate
- External platform click-through rate

---

## Notes
- All booking functionality is currently MOCK (frontend only)
- No backend or database implemented yet
- No email notifications set up
- All data is hardcoded in mockData.js
- Ready for Phase 2: Backend development
