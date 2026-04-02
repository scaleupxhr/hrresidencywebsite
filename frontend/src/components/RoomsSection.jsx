import React from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Bed, IndianRupee } from 'lucide-react';
import { roomTypes } from '../data/mockData';
import { toast } from 'sonner';

const RoomCard = ({ room, language }) => {
  const handleBookRoom = () => {
    toast.success(
      language === 'en'
        ? `Booking request for ${room.name[language]} received! Our team will contact you shortly.`
        : `${room.name[language]} ബുക്കിംഗ് അഭ്യർത്ഥന ലഭിച്ചു! ഞങ്ങളുടെ ടീം ഉടൻ നിങ്ങളെ ബന്ധപ്പെടും.`,
      { duration: 4000 }
    );
  };

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-0 h-full flex flex-col">
      <div className="relative overflow-hidden">
        <img
          src={room.image}
          alt={room.name[language]}
          className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-red-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-lg">
          {Math.round(((room.originalPrice - room.pricePerNight) / room.originalPrice) * 100)}% OFF
        </div>
      </div>

      <CardContent className="p-6 space-y-5 flex-1 flex flex-col">
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
              className="text-xs bg-teal-50 text-teal-700 px-3 py-1.5 rounded-full border border-teal-200 font-medium"
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
        <div className="pt-4 border-t border-slate-200 mt-auto">
          <div className="flex items-end gap-3 mb-3">
            <div className="flex items-start">
              <IndianRupee className="h-6 w-6 text-slate-900 mt-0.5" />
              <span className="text-4xl font-bold text-slate-900">{room.pricePerNight.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex items-start text-slate-400 line-through mb-2">
              <IndianRupee className="h-4 w-4 mt-1" />
              <span className="text-xl">{room.originalPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 mb-5 font-medium">
            {language === 'en' ? 'per night' : 'രാത്രിയിൽ'}
          </p>

          <Button
            onClick={handleBookRoom}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-6 text-base font-semibold transition-all rounded-lg shadow-md hover:shadow-lg"
          >
            {language === 'en' ? 'Book This Room' : 'ഈ മുറി ബുക്ക് ചെയ്യുക'}
          </Button>
        </div>
      </CardContent>
    </Card>
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
