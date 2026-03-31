import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Phone } from 'lucide-react';
import LanguageToggle from './LanguageToggle';
import { hotelInfo } from '../data/mockData';

const Header = ({ language, setLanguage, onBookNowClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group"
            >
              <h1
                className={`text-2xl font-bold tracking-wider transition-colors ${
                  isScrolled ? 'text-teal-800' : 'text-white drop-shadow-lg'
                }`}
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                HR <span className="text-red-600">RESIDENCY</span>
              </h1>
            </button>

            <nav className="hidden md:flex items-center gap-6">
              {[
                { label: language === 'en' ? 'Rooms' : 'മുറികൾ', id: 'rooms' },
                { label: language === 'en' ? 'Amenities' : 'സൗകര്യങ്ങൾ', id: 'amenities' },
                { label: language === 'en' ? 'Gallery' : 'ഗാലറി', id: 'gallery' },
                { label: language === 'en' ? 'Reviews' : 'അവലോകനങ്ങൾ', id: 'reviews' },
                { label: language === 'en' ? 'Location' : 'സ്ഥാനം', id: 'location' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors hover:text-teal-600 ${
                    isScrolled ? 'text-slate-700' : 'text-white drop-shadow'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <a href={`tel:${hotelInfo.phone}`} className="hidden sm:flex">
              <Button
                variant="outline"
                size="sm"
                className={`flex items-center gap-2 transition-all ${
                  isScrolled
                    ? 'border-teal-600 text-teal-700 hover:bg-teal-50'
                    : 'border-white text-white hover:bg-white/10 backdrop-blur-sm'
                }`}
              >
                <Phone className="h-4 w-4" />
                <span className="hidden lg:inline">{hotelInfo.phone}</span>
              </Button>
            </a>

            <LanguageToggle language={language} setLanguage={setLanguage} />

            <Button
              onClick={onBookNowClick}
              className="bg-red-600 hover:bg-red-700 text-white shadow-lg hover:shadow-xl transition-all"
            >
              {language === 'en' ? 'Book Now' : 'ഇപ്പോൾ ബുക്ക് ചെയ്യുക'}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
