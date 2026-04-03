# HR Residency Website - Content Update Guide

## 🎯 Quick Guide to Update Your Website Content

This guide will help you make changes to your website after deployment without breaking anything.

---

## 📍 Where is Everything Located?

All your website content is stored in ONE main file:

**Location:** `/app/frontend/src/data/mockData.js`

This file contains:
- Room prices
- Room amenities
- Hotel information (phone, address, email)
- Highlights ("Why Choose Us")
- Guest reviews
- Nearby attractions

---

## 💰 How to Change Room Prices

### Step 1: Find the file
Navigate to: `/app/frontend/src/data/mockData.js`

### Step 2: Find the room you want to update
Look for the section called `export const roomTypes = [`

### Step 3: Update the prices

**Example - To change AC Room price:**

```javascript
{
  id: 1,
  name: { en: "Standard AC Room", ml: "സ്റ്റാൻഡേർഡ് എസി റൂം" },
  // ... other details ...
  pricePerNight: 1400,      // ← Change this (Offer Price)
  originalPrice: 1800       // ← Change this (MRP)
}
```

**Current Prices:**
- AC Room: ₹1,400 (MRP: ₹1,800)
- Non-AC Room: ₹1,100 (MRP: ₹1,300)
- Single Room: ₹799 (MRP: ₹999)

---

## 📞 How to Change Contact Information

In the same file (`mockData.js`), find:

```javascript
export const hotelInfo = {
  name: "HR RESIDENCY",
  phone: "088488 89016",        // ← Change phone number
  whatsapp: "918848889016",     // ← Change WhatsApp number
  email: "info@hrresidency.com", // ← Change email
  address: {
    en: "Mini Bypass Rd, Eranhipalam, Kozhikode, Kerala 673006",
    ml: "മിനി ബൈപാസ് റോഡ്, എരഞ്ഞിപ്പലം, കോഴിക്കോട്, കേരളം 673006"
  }
  // ...
}
```

---

## ✨ How to Update "Why Choose Us" Highlights

Find the section:

```javascript
export const highlights = {
  en: [
    "Clean rooms",           // ← Edit or add items
    "Friendly staff",
    "Affordable rates",
    "Prime Location",
    "24/7 Guest Service"
  ],
  ml: [
    "ശുദ്ധമായ മുറികൾ",
    // ... Malayalam translations
  ]
}
```

**To add a new highlight:**
Just add a new item to the list:
```javascript
"Free WiFi",  // ← New item
```

---

## 🛏️ How to Add/Remove Room Amenities

Find your room and update the amenities array:

```javascript
amenities: {
  en: [
    "Air Conditioning",
    "Private Bathroom",
    "Work Desk",
    "Free Toiletries",
    "Hot Water",
    "TV",
    "Free WiFi"  // ← Add new amenity
  ]
}
```

---

## 🖼️ How to Change Room Images

In the room object, update the image URL:

```javascript
{
  id: 1,
  name: { en: "Standard AC Room", ml: "..." },
  image: "YOUR_NEW_IMAGE_URL_HERE",  // ← Replace this
  // ...
}
```

**Note:** The image must be a publicly accessible URL (uploaded to cloud storage or image hosting service)

---

## 🔄 After Making Changes - How to Deploy

### Option 1: Quick Redeploy (Recommended)
1. Save the file after making changes
2. On Emergent platform, click "Deploy" or "Redeploy"
3. Wait for deployment to complete (usually 2-3 minutes)
4. Check your live website

### Option 2: Using Git (Advanced)
1. Commit your changes
2. Push to repository
3. Trigger deployment from Emergent dashboard

---

## ⚠️ Important Tips

### ✅ DO:
- Always save the file after making changes
- Test prices make sense (Offer Price < MRP)
- Keep formatting consistent
- Update both English and Malayalam text if bilingual

### ❌ DON'T:
- Don't remove commas (`,`) between items
- Don't delete quotation marks (`"`)
- Don't change file structure
- Don't edit while someone is browsing the website (deploy during low traffic)

---

## 📝 Common Updates Checklist

**Seasonal Price Update:**
- [ ] Update `pricePerNight` for all rooms
- [ ] Update `originalPrice` (MRP)
- [ ] Save file
- [ ] Redeploy

**Contact Info Update:**
- [ ] Update phone number in `hotelInfo`
- [ ] Update WhatsApp number
- [ ] Update email
- [ ] Save file
- [ ] Redeploy

**Add New Amenity:**
- [ ] Add amenity to room's amenities array
- [ ] Add both English and Malayalam text
- [ ] Save file
- [ ] Redeploy

---

## 🆘 Need Help?

**If something breaks:**
1. Don't panic! You can always rollback to previous version
2. Check if you missed a comma or quotation mark
3. Contact Emergent support
4. They can restore previous working version

**For major changes:**
- Contact the developer who built this
- Or hire a developer for complex updates
- Or request an admin panel for easier content management

---

## 🎓 Best Practices

1. **Make changes during low traffic hours** (late night/early morning)
2. **Test on preview URL before deploying** to production
3. **Keep a backup** of the original file before making changes
4. **Document your changes** (write down what you changed and when)
5. **Update prices seasonally** (peak season, off-season)

---

## 📱 Quick Reference - File Paths

| What to Update | File Location |
|----------------|--------------|
| Room Prices | `/app/frontend/src/data/mockData.js` |
| Contact Info | `/app/frontend/src/data/mockData.js` |
| Amenities | `/app/frontend/src/data/mockData.js` |
| Highlights | `/app/frontend/src/data/mockData.js` |
| Reviews | `/app/frontend/src/data/mockData.js` |

**Everything is in ONE file!** 📄

---

## 🚀 Future Upgrade: Admin Panel

**Currently:** You need to edit code files to make changes

**Future Option:** You can request an admin panel where you can:
- Update prices from a simple form
- Add/edit rooms visually
- Change contact info with buttons
- No coding required!

**Ask your developer or Emergent support** about adding an admin panel if you plan to make frequent updates.

---

**Remember:** This website is yours to maintain. Don't be afraid to make small changes. Always keep backups and you'll be fine! 💪

For urgent support: Contact Emergent Platform Support or your developer.

---

*Last Updated: April 2026*
*HR Residency - Kozhikode, Kerala*
