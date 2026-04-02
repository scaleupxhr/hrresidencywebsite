import React, { useState } from 'react';
import { Button } from './ui/button';
import { Calendar } from 'lucide-react';
import { toast } from 'sonner';

const BookingWidget = ({ language }) => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);

  const handleBooking = () => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

      if (nights < 1) {
        toast.error(language === 'en' ? 'Check-out must be after check-in date' : 'ചെക്ക്-ഔട്ട് ചെക്ക്-ഇൻ തീയതിക്ക് ശേഷമായിരിക്കണം');
        return;
      }

      toast.success(
        language === 'en'
          ? `Booking request for ${nights} night${nights > 1 ? 's' : ''} received! Our team will contact you shortly.`
          : `${nights} രാത്രിക്കുള്ള ബുക്കിംഗ് അഭ്യർത്ഥന ലഭിച്ചു! ഞങ്ങളുടെ ടീം ഉടൻ നിങ്ങളെ ബന്ധപ്പെടും.`,
        { duration: 4000 }
      );
    } else {
      toast.error(language === 'en' ? 'Please select check-in and check-out dates' : 'ദയവായി ചെക്ക്-ഇൻ, ചെക്ക്-ഔട്ട് തീയതികൾ തിരഞ്ഞെടുക്കുക');
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-premium rounded-2xl shadow-2xl p-8 max-w-4xl mx-auto card-premium">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
        {/* Check-in */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-teal-600" />
            {language === 'en' ? 'Check-in' : 'ചെക്ക്-ഇൻ'}
          </label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            min={today}
            className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-lg focus:border-teal-500 focus:outline-none transition-all text-base hover:border-slate-300"
          />
        </div>

        {/* Check-out */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Calendar className="h-4 w-4 text-teal-600" />
            {language === 'en' ? 'Check-out' : 'ചെക്ക്-ഔട്ട്'}
          </label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            min={checkIn || today}
            className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-lg focus:border-teal-500 focus:outline-none transition-all text-base hover:border-slate-300"
          />
        </div>

        {/* Book Button */}
        <Button
          onClick={handleBooking}
          className="w-full bg-red-600 hover:bg-red-700 active:bg-red-800 text-white py-7 text-lg font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg hover:-translate-y-1 active:translate-y-0"
        >
          {language === 'en' ? 'Check Availability' : 'ലഭ്യത പരിശോധിക്കുക'}
        </Button>
      </div>

      <p className="text-center text-sm text-slate-600 mt-6 font-medium">
        {language === 'en' ? '✓ Best Price Guaranteed  ·  ✓ Instant Confirmation' : '✓ മികച്ച വില ഉറപ്പ്  ·  ✓ ഉടനടി സ്ഥിരീകരണം'}
      </p>
    </div>
  );
};

export default BookingWidget;
