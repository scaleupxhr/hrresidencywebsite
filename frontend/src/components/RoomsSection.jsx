import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Bed, IndianRupee } from 'lucide-react';
import { roomTypes } from '../data/mockData';
import BookingModal from './BookingModal';

const RoomCard = ({ room, language }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBookRoom = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Card className="group overflow-hidden transition-all duration-500 border-0 h-full flex flex-col card-premium rounded-premium-lg">
        <div className="relative overflow-hidden image-hover-zoom">
          <img
            src={room.image}
            alt={room.name[language]}
            className="w-full h-72 object-cover transition-transform duration-700 ease-out"
          />
          <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg animate-fade-in">
            {Math.round(((room.originalPrice - room.pricePerNight) / room.originalPrice) * 100)}% OFF
          </div>
        </div>

        <CardContent className="p-6 space-y-5 flex-1 flex flex-col bg-white">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-slate-900 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {room.name[language]}
            </h3>
            <div className="flex items-center gap-2 text-slate-600">
              <Bed className="h-5 w-5" />
              <span className="text-base">{room.bedType[language]}</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2">
            {room.amenities[language].slice(0, 4).map((amenity, index) => (
              <span
                key={index}
                className="text-xs bg-teal-50 text-teal-700 px-3 py-1.5 rounded-full border border-teal-200 font-medium transition-all hover:bg-teal-100 hover:shadow-sm"
              >
                {amenity}
              </span>
            ))}
            {room.amenities[language].length > 4 && (
              <span className="text-xs bg-slate-100 text-slate-600 px-3 py-1.5 rounded-full font-medium">
                +{room.amenities[language].length - 4} {language === 'en' ? 'more' : 'കൂടുതൽ'}
              </span>
            )}
          </div>

          {/* Pricing */}
          <div className="pt-4 border-t border-slate-100 mt-auto">
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs bg-gradient-to-r from-red-500 to-red-600 text-white px-2.5 py-1 rounded-full font-bold uppercase tracking-wide">
                  {language === 'en' ? 'Special Offer' : 'പ്രത്യേക ഓഫർ'}
                </span>
                <span className="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-full font-semibold">
                  {Math.round(((room.originalPrice - room.pricePerNight) / room.originalPrice) * 100)}% OFF
                </span>
              </div>
              
              <div className="flex items-baseline gap-3">
                <div className="flex items-start">
                  <IndianRupee className="h-7 w-7 text-teal-700 mt-0.5 font-bold" />
                  <span className="text-4xl font-bold text-teal-700">{room.pricePerNight.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-start text-slate-400 line-through">
                    <span className="text-xs uppercase tracking-wide mr-1">MRP</span>
                    <IndianRupee className="h-3.5 w-3.5 mt-0.5" />
                    <span className="text-lg">{room.originalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-slate-600 mb-5 font-medium">
              {language === 'en' ? 'per night (inclusive of taxes)' : 'രാത്രിയിൽ (നികുതി ഉൾപ്പെടെ)'}
            </p>

            <Button
              onClick={handleBookRoom}
              className="w-full bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white py-6 text-base font-semibold transition-all duration-300 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
            >
              {language === 'en' ? 'Book This Room' : 'ഈ മുറി ബുക്ക് ചെയ്യുക'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        room={room} 
        language={language} 
      />
    </>
  );
};

const RoomsSection = ({ language }) => {
  return (
    <section id="rooms" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {language === 'en' ? 'Our Rooms' : 'ഞങ്ങളുടെ മുറികൾ'}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {language === 'en'
              ? 'Choose from our comfortable and well-appointed rooms, designed for your convenience and comfort'
              : 'നിങ്ങളുടെ സൗകര്യത്തിനും സുഖത്തിനുമായി രൂപകൽപ്പന ചെയ്ത മുറികളിൽ നിന്ന് തിരഞ്ഞെടുക്കുക'}
          </p>
          <div className="w-24 h-1 bg-teal-600 mx-auto mt-6"></div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {roomTypes.map((room) => (
            <RoomCard key={room.id} room={room} language={language} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoomsSection;
