import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { hotelInfo, heroImages } from '../data/mockData';
import BookingWidget from './BookingWidget';

const HeroSection = ({ language }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Images with Crossfade */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt={`Kozhikode Beach ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Warm Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/70 via-slate-900/60 to-amber-900/50"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Hotel Name */}
          <h1
            className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl animate-fade-in"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            HR <span className="text-red-500">RESIDENCY</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-amber-50 mb-8 drop-shadow-lg font-light">
            {hotelInfo.tagline[language]}
          </p>

          {/* Rating Badge */}
          <div className="flex items-center justify-center gap-2 mb-12">
            <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
              <span className="font-bold text-slate-900">{hotelInfo.rating}</span>
              <span className="text-slate-600 text-sm ml-1">
                · {hotelInfo.totalReviews} {language === 'en' ? 'Google Reviews' : 'ഗൂഗിൾ അവലോകനങ്ങൾ'}
              </span>
            </div>
          </div>

          {/* Booking Widget */}
          <BookingWidget language={language} />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/70 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
