import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader } from './ui/dialog';
import { Button } from './ui/button';
import { Calendar, User, Phone, Users, X } from 'lucide-react';
import { hotelInfo } from '../data/mockData';
import { toast } from 'sonner';

const BookingModal = ({ isOpen, onClose, room, language }) => {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    checkIn: today,
    checkOut: tomorrow,
    guests: 1
  });

  const handleWhatsAppBooking = () => {
    // Validate form
    if (!formData.name || !formData.phone || !formData.checkIn || !formData.checkOut) {
      toast.error(
        language === 'en' 
          ? 'Please fill all required fields' 
          : 'ദയവായി എല്ലാ ആവശ്യമുള്ള ഫീൽഡുകളും പൂരിപ്പിക്കുക'
      );
      return;
    }

    // Check dates
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));

    if (nights < 1) {
      toast.error(
        language === 'en' 
          ? 'Check-out must be after check-in date' 
          : 'ചെക്ക്-ഔട്ട് ചെക്ക്-ഇൻ തീയതിക്ക് ശേഷമായിരിക്കണം'
      );
      return;
    }

    // Format dates for display
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    // Create WhatsApp message
    const message = language === 'en'
      ? `Hi, I want to book a room:

Room Type: ${room.name[language]}
Check-in: ${formatDate(formData.checkIn)}
Check-out: ${formatDate(formData.checkOut)}
Number of Nights: ${nights}
Guests: ${formData.guests}
Name: ${formData.name}
Phone: ${formData.phone}

Please confirm availability and total price.`
      : `ഹലോ, ഒരു റൂം ബുക്ക് ചെയ്യാൻ ഞാൻ ആഗ്രഹിക്കുന്നു:

റൂം തരം: ${room.name[language]}
ചെക്ക്-ഇൻ: ${formatDate(formData.checkIn)}
ചെക്ക്-ഔട്ട്: ${formatDate(formData.checkOut)}
രാത്രികളുടെ എണ്ണം: ${nights}
അതിഥികൾ: ${formData.guests}
പേര്: ${formData.name}
ഫോൺ: ${formData.phone}

ദയവായി ലഭ്യതയും മൊത്തം വിലയും സ്ഥിരീകരിക്കുക.`;

    // Open WhatsApp
    const whatsappUrl = `https://wa.me/${hotelInfo.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Show success message
    toast.success(
      language === 'en'
        ? 'Opening WhatsApp... Our team will respond shortly!'
        : 'വാട്സ്ആപ്പ് തുറക്കുന്നു... ഞങ്ങളുടെ ടീം ഉടൻ പ്രതികരിക്കും!',
      { duration: 4000 }
    );

    // Close modal
    onClose();

    // Reset form
    setTimeout(() => {
      setFormData({
        name: '',
        phone: '',
        checkIn: today,
        checkOut: tomorrow,
        guests: 1
      });
    }, 500);
  };

  if (!room) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl w-full p-0 overflow-hidden">
        {/* Header with Room Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={room.image}
            alt={room.name[language]}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-full p-2 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="absolute bottom-4 left-6 right-6">
            <h2 
              className="text-3xl font-bold text-white mb-2" 
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {room.name[language]}
            </h2>
            <p className="text-white/90 text-lg">
              ₹{room.pricePerNight.toLocaleString('en-IN')} {language === 'en' ? 'per night' : 'രാത്രിയിൽ'}
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="p-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">
            {language === 'en' ? 'Complete Your Booking' : 'നിങ്ങളുടെ ബുക്കിംഗ് പൂർത്തിയാക്കുക'}
          </h3>

          <div className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <User className="inline h-4 w-4 mr-1" />
                {language === 'en' ? 'Your Name *' : 'നിങ്ങളുടെ പേര് *'}
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-teal-500 focus:outline-none transition-colors"
                placeholder={language === 'en' ? 'Enter your full name' : 'നിങ്ങളുടെ പൂർണ്ണ പേര് നൽകുക'}
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Phone className="inline h-4 w-4 mr-1" />
                {language === 'en' ? 'Phone Number *' : 'ഫോൺ നമ്പർ *'}
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-teal-500 focus:outline-none transition-colors"
                placeholder={language === 'en' ? 'Enter your phone number' : 'നിങ്ങളുടെ ഫോൺ നമ്പർ നൽകുക'}
                required
              />
            </div>

            {/* Dates */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  {language === 'en' ? 'Check-in Date *' : 'ചെക്ക്-ഇൻ തീയതി *'}
                </label>
                <input
                  type="date"
                  value={formData.checkIn}
                  onChange={(e) => setFormData({ ...formData, checkIn: e.target.value })}
                  min={today}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-teal-500 focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  {language === 'en' ? 'Check-out Date *' : 'ചെക്ക്-ഔട്ട് തീയതി *'}
                </label>
                <input
                  type="date"
                  value={formData.checkOut}
                  onChange={(e) => setFormData({ ...formData, checkOut: e.target.value })}
                  min={formData.checkIn || today}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-teal-500 focus:outline-none transition-colors"
                  required
                />
              </div>
            </div>

            {/* Number of Guests */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                <Users className="inline h-4 w-4 mr-1" />
                {language === 'en' ? 'Number of Guests' : 'അതിഥികളുടെ എണ്ണം'}
              </label>
              <select
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-lg focus:border-teal-500 focus:outline-none transition-colors"
              >
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <option key={num} value={num}>
                    {num} {language === 'en' ? (num === 1 ? 'Guest' : 'Guests') : 'അതിഥികൾ'}
                  </option>
                ))}
              </select>
            </div>

            {/* WhatsApp Booking Button */}
            <Button
              onClick={handleWhatsAppBooking}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-6 text-lg font-semibold transition-all shadow-lg hover:shadow-xl rounded-lg flex items-center justify-center gap-3"
            >
              <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              {language === 'en' ? 'Book via WhatsApp' : 'വാട്സ്ആപ്പ് വഴി ബുക്ക് ചെയ്യുക'}
            </Button>

            <p className="text-center text-sm text-slate-600 mt-4">
              {language === 'en' 
                ? '* Our team will respond within minutes to confirm your booking' 
                : '* നിങ്ങളുടെ ബുക്കിംഗ് സ്ഥിരീകരിക്കാൻ ഞങ്ങളുടെ ടീം മിനിറ്റുകൾക്കുള്ളിൽ പ്രതികരിക്കും'}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;