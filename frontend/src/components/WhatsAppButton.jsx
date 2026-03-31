import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { hotelInfo } from '../data/mockData';

const WhatsAppButton = ({ language }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = () => {
    const message = language === 'en'
      ? 'Hello! I would like to inquire about room availability at HR Residency.'
      : 'ഹലോ! എച്ച്ആർ റെസിഡൻസിയിൽ മുറി ലഭ്യതയെക്കുറിച്ച് അന്വേഷിക്കാൻ ഞാൻ ആഗ്രഹിക്കുന്നു.';
    const whatsappUrl = `https://wa.me/${hotelInfo.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 group ${
        isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
      }`}
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 group-hover:scale-110 transition-transform" />
      <span className="absolute bottom-full right-0 mb-2 bg-slate-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {language === 'en' ? 'Chat on WhatsApp' : 'വാട്സ്ആപ്പിൽ ചാറ്റ് ചെയ്യുക'}
      </span>
    </button>
  );
};

export default WhatsAppButton;
