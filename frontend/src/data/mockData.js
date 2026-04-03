// Mock data for HR Residency Hotel Website

export const hotelInfo = {
  name: "HR RESIDENCY",
  tagline: {
    en: "Your peaceful retreat in the heart of Kozhikode",
    ml: "കോഴിക്കോട്ടിന്റെ ഹൃദയഭാഗത്തുള്ള നിങ്ങളുടെ സമാധാനപൂർണ്ണമായ വിശ്രമം"
  },
  phone: "088488 89016",
  whatsapp: "918848889016",
  address: {
    en: "Mini Bypass Rd, Eranhipalam, Kozhikode, Kerala 673006",
    ml: "മിനി ബൈപാസ് റോഡ്, എരഞ്ഞിപ്പലം, കോഴിക്കോട്, കേരളം 673006"
  },
  email: "info@hrresidency.com",
  checkIn: "2:00 PM",
  checkOut: "11:00 AM",
  rating: 4.5,
  totalReviews: 107,
  mapLink: "https://www.google.com/maps/dir//HR+RESIDENCY,+Mini+Bypass+Rd,+Eranhipaalam,+Eranhipalam,+Kozhikode,+Kerala+673006/@10.3638703,75.9042675,7.75z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3ba65f004b03791f:0x5dfc643328113851!2m2!1d75.7841289!2d11.2791206?hl=en-IN&entry=ttu&g_ep=EgoyMDI2MDMyOS4wIKXMDSoASAFQAw%3D%3D",
  embedMapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.0648916304584!2d75.7815540!3d11.2791206!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65f004b03791f%3A0x5dfc643328113851!2sHR%20RESIDENCY!5e0!3m2!1sen!2sin!4v1234567890"
};

export const highlights = {
  en: ["Clean rooms", "Friendly staff", "Affordable rates", "Prime Location", "24/7 Guest Service"],
  ml: ["ശുദ്ധമായ മുറികൾ", "സൗഹൃദപരമായ സ്റ്റാഫ്", "താങ്ങാനാവുന്ന നിരക്കുകൾ", "പ്രധാന സ്ഥാനം", "24/7 അതിഥി സേവനം"]
};

export const roomTypes = [
  {
    id: 1,
    name: { en: "Standard AC Room", ml: "സ്റ്റാൻഡേർഡ് എസി റൂം" },
    image: "https://customer-assets.emergentagent.com/job_malabar-stay/artifacts/o5zi4nnv_2025-01-20%20%281%29.jpg",
    bedType: { en: "Double Bed", ml: "ഡബിൾ ബെഡ്" },
    amenities: {
      en: ["Air Conditioning", "Private Bathroom", "Work Desk", "Free Toiletries", "Hot Water", "TV"],
      ml: ["എയർ കണ്ടീഷനിംഗ്", "സ്വകാര്യ കുളിമുറി", "വർക്ക് ഡെസ്ക്", "സൗജന്യ ടോയ്‌ലട്രീസ്", "ചൂടുവെള്ളം", "ടിവി"]
    },
    pricePerNight: 1400,
    originalPrice: 1800
  },
  {
    id: 2,
    name: { en: "Non-AC Room", ml: "നോൺ-എസി റൂം" },
    image: "https://customer-assets.emergentagent.com/job_malabar-stay/artifacts/1fwi9297_2025-02-05%20%283%29.jpg",
    bedType: { en: "Double Bed", ml: "ഡബിൾ ബെഡ്" },
    amenities: {
      en: ["Ceiling Fan", "Private Bathroom", "Free Toiletries", "Hot Water", "Window View"],
      ml: ["സീലിംഗ് ഫാൻ", "സ്വകാര്യ കുളിമുറി", "സൗജന്യ ടോയ്‌ലട്രീസ്", "ചൂടുവെള്ളം", "വിൻഡോ വ്യൂ"]
    },
    pricePerNight: 1100,
    originalPrice: 1300
  },
  {
    id: 3,
    name: { en: "Single Room", ml: "സിംഗിൾ റൂം" },
    image: "https://customer-assets.emergentagent.com/job_malabar-stay/artifacts/mkhs515v_hr%20residency%20single%20rom.jpeg",
    bedType: { en: "Single Bed", ml: "സിംഗിൾ ബെഡ്" },
    amenities: {
      en: ["Ceiling Fan", "Private Bathroom", "Free Toiletries", "Hot Water", "Window View"],
      ml: ["സീലിംഗ് ഫാൻ", "സ്വകാര്യ കുളിമുറി", "സൗജന്യ ടോയ്‌ലട്രീസ്", "ചൂടുവെള്ളം", "വിൻഡോ വ്യൂ"]
    },
    pricePerNight: 1100,
    originalPrice: 1300
  }
];

export const amenities = [
  { icon: "ParkingCircle", name: { en: "Free Parking", ml: "സൗജന്യ പാർക്കിംഗ്" } },
  { icon: "Clock", name: { en: "24/7 Front Desk", ml: "24/7 ഫ്രണ്ട് ഡെസ്ക്" } },
  { icon: "ShowerHead", name: { en: "Private Bathrooms", ml: "സ്വകാര്യ കുളിമുറികൾ" } },
  { icon: "Bed", name: { en: "Clean Linen", ml: "ശുദ്ധമായ കിടക്കകൾ" } },
  { icon: "Heart", name: { en: "Couple Friendly", ml: "ദമ്പതികൾക്ക് അനുയോജ്യം" } },
  { icon: "Baby", name: { en: "Child Friendly", ml: "കുട്ടികൾക്ക് അനുയോജ്യം" } },
  { icon: "Shield", name: { en: "Safe & Secure", ml: "സുരക്ഷിതവും സുരക്ഷിതവും" } },
  { icon: "Wifi", name: { en: "Free WiFi", ml: "സൗജന്യ വൈഫൈ" } }
];

export const nearbyAttractions = [
  {
    id: 1,
    name: { en: "Kozhikode Beach", ml: "കോഴിക്കോട് ബീച്ച്" },
    distance: { en: "3.5 km", ml: "3.5 കി.മീ" },
    time: { en: "9 mins by car", ml: "കാറിൽ 9 മിനിറ്റ്" },
    icon: "Waves",
    image: "https://images.pexels.com/photos/17300032/pexels-photo-17300032.jpeg"
  },
  {
    id: 2,
    name: { en: "Tali Maha Shiva Kshetram", ml: "താലി മഹാ ശിവ ക്ഷേത്രം" },
    distance: { en: "5 km", ml: "5 കി.മീ" },
    time: { en: "14 mins by car", ml: "കാറിൽ 14 മിനിറ്റ്" },
    icon: "Church",
    image: "https://images.unsplash.com/photo-1772028578109-17320e9ec929"
  },
  {
    id: 3,
    name: { en: "Mishqal Mosque", ml: "മിസ്കാൽ പള്ളി" },
    distance: { en: "6 km", ml: "6 കി.മീ" },
    time: { en: "16 mins by car", ml: "കാറിൽ 16 മിനിറ്റ്" },
    icon: "Building",
    image: "https://images.unsplash.com/photo-1726995036039-1ff318dd445c"
  },
  {
    id: 4,
    name: { en: "Pazhassi Raja Museum", ml: "പഴശ്ശി രാജാ മ്യൂസിയം" },
    distance: { en: "2.5 km", ml: "2.5 കി.മീ" },
    time: { en: "7 mins by car", ml: "കാറിൽ 7 മിനിറ്റ്" },
    icon: "Landmark",
    image: "https://images.pexels.com/photos/34713309/pexels-photo-34713309.jpeg"
  },
  {
    id: 5,
    name: { en: "Regional Science Centre", ml: "റീജിയണൽ സയൻസ് സെന്റർ" },
    distance: { en: "3 km", ml: "3 കി.മീ" },
    time: { en: "9 mins by car", ml: "കാറിൽ 9 മിനിറ്റ്" },
    icon: "Telescope",
    image: "https://images.unsplash.com/photo-1761465196304-ded5a8b42914?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjY2NzF8MHwxfHNlYXJjaHwyfHxzY2llbmNlJTIwY2VudGVyJTIwcGxhbmV0YXJpdW0lMjBidWlsZGluZyUyMG1vZGVybnxlbnwwfHx8fDE3NzUxMjgyNDN8MA&ixlib=rb-4.1.0&q=85"
  },
  {
    id: 6,
    name: { en: "Sarovaram Biopark", ml: "സരോവരം ബയോപാർക്ക്" },
    distance: { en: "6.5 km", ml: "6.5 കി.മീ" },
    time: { en: "16 mins by car", ml: "കാറിൽ 16 മിനിറ്റ്" },
    icon: "Trees",
    image: "https://images.pexels.com/photos/17034372/pexels-photo-17034372.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
  },
  {
    id: 7,
    name: { en: "Kadalundi Bird Sanctuary", ml: "കടലുണ്ടി പക്ഷി സങ്കേതം" },
    distance: { en: "19 km", ml: "19 കി.മീ" },
    time: { en: "49 mins by car", ml: "കാറിൽ 49 മിനിറ്റ്" },
    icon: "Bird",
    image: "https://images.unsplash.com/photo-1566659825785-30e6c37efed9"
  }
];

export const reviews = [
  {
    id: 1,
    name: "Pavadai Rayan",
    rating: 4,
    date: "2 weeks ago",
    comment: {
      en: "Excellent value for money. The room was clean and the staff was very helpful. Perfect location in the heart of the city.",
      ml: "പണത്തിന് മികച്ച മൂല്യം. മുറി വൃത്തിയുള്ളതും സ്റ്റാഫ് വളരെ സഹായകരവുമായിരുന്നു. നഗരത്തിന്റെ ഹൃദയഭാഗത്ത് മികച്ച സ്ഥാനം."
    },
    avatar: "PR"
  },
  {
    id: 2,
    name: "FAYAS C A",
    rating: 5,
    date: "1 month ago",
    comment: {
      en: "Very neat and affordable. The rooms are well-maintained and the service is excellent. Highly recommended for budget travelers.",
      ml: "വളരെ വൃത്തിയുള്ളതും താങ്ങാനാവുന്നതുമാണ്. മുറികൾ നന്നായി പരിപാലിക്കപ്പെടുന്നു, സേവനം മികച്ചതാണ്."
    },
    avatar: "FC"
  },
  {
    id: 3,
    name: "Mou Priya",
    rating: 4,
    date: "3 weeks ago",
    comment: {
      en: "Friendly staff and good location. Easy walking distance to many attractions. The room was comfortable and clean.",
      ml: "സൗഹൃദപരമായ സ്റ്റാഫും നല്ല സ്ഥാനവും. പല ആകർഷണങ്ങളിലേക്കും എളുപ്പത്തിൽ നടന്ന് പോകാം."
    },
    avatar: "MP"
  },
  {
    id: 4,
    name: "Sam STK",
    rating: 5,
    date: "2 months ago",
    comment: {
      en: "Clean and well-maintained property. The staff is courteous and helpful. Great place to stay in Kozhikode at reasonable rates.",
      ml: "ശുദ്ധവും നന്നായി പരിപാലിക്കപ്പെടുന്നതുമായ സ്വത്ത്. സ്റ്റാഫ് മര്യാദയുള്ളവരും സഹായകരവുമാണ്."
    },
    avatar: "SS"
  }
];

export const ratingDistribution = [
  { stars: 5, count: 67, percentage: 63 },
  { stars: 4, count: 28, percentage: 26 },
  { stars: 3, count: 8, percentage: 7 },
  { stars: 2, count: 3, percentage: 3 },
  { stars: 1, count: 1, percentage: 1 }
];

export const bookingPlatforms = [
  { name: "MakeMyTrip", url: "https://www.makemytrip.com", price: 1213 },
  { name: "Booking.com", url: "https://www.booking.com", price: 1229 },
  { name: "Agoda", url: "https://www.agoda.com", price: 1245 }
];

export const galleryImages = [
  {
    id: 1,
    url: "https://customer-assets.emergentagent.com/job_malabar-stay/artifacts/3fh2rgvh_hr%201.jpg",
    alt: "HR Residency Exterior",
    category: "exterior"
  },
  {
    id: 2,
    url: "https://customer-assets.emergentagent.com/job_malabar-stay/artifacts/tdz3rzxk_unnamed.jpg",
    alt: "HR Residency Sign",
    category: "exterior"
  },
  {
    id: 3,
    url: "https://customer-assets.emergentagent.com/job_malabar-stay/artifacts/melsi7ib_2025-02-05%20%285%29.jpg",
    alt: "HR Residency Entrance",
    category: "exterior"
  },
  {
    id: 4,
    url: "https://customer-assets.emergentagent.com/job_malabar-stay/artifacts/o5zi4nnv_2025-01-20%20%281%29.jpg",
    alt: "Standard AC Room",
    category: "rooms"
  },
  {
    id: 5,
    url: "https://customer-assets.emergentagent.com/job_malabar-stay/artifacts/1fwi9297_2025-02-05%20%283%29.jpg",
    alt: "Deluxe Room",
    category: "rooms"
  }
];

export const heroImages = [
  "https://images.unsplash.com/photo-1761662826640-3e3385418f89",
  "https://images.unsplash.com/photo-1655879643554-98b197221c62",
  "https://images.pexels.com/photos/17300032/pexels-photo-17300032.jpeg",
  "https://images.pexels.com/photos/16141237/pexels-photo-16141237.jpeg"
];
