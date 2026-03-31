import React from 'react';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { hotelInfo, bookingPlatforms } from '../data/mockData';

const Footer = ({ language }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      {/* Booking Platforms Bar */}
      <div className="bg-red-600 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-lg font-bold">
                {language === 'en' ? 'Book directly and save!' : 'നേരിട്ട് ബുക്ക് ചെയ്ത് സംരക്ഷിക്കുക!'}
              </p>
              <p className="text-sm text-red-50">
                {language === 'en'
                  ? `Starting from ₹${bookingPlatforms[0].price.toLocaleString('en-IN')}/night`
                  : `₹${bookingPlatforms[0].price.toLocaleString('en-IN')}/രാത്രി മുതൽ ആരംഭിക്കുന്നു`}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm text-red-50">
                {language === 'en' ? 'Also available on:' : 'ഇതിലും ലഭ്യമാണ്:'}
              </span>
              {bookingPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-all"
                >
                  {platform.name}
                  <ExternalLink className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Hotel Info */}
          <div>
            <h3
              className="text-2xl font-bold mb-4"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              HR <span className="text-red-500">RESIDENCY</span>
            </h3>
            <p className="text-slate-400 mb-4 leading-relaxed">
              {language === 'en'
                ? 'Your peaceful retreat in the heart of Kozhikode. Experience comfort, affordability, and warm hospitality.'
                : 'കോഴിക്കോട്ടിന്റെ ഹൃദയഭാഗത്തുള്ള നിങ്ങളുടെ സമാധാനപൂർണ്ണമായ വിശ്രമം. സുഖവും താങ്ങാനാവുന്ന നിരക്കും ഊഷ്മള ആതിഥ്യമര്യാദയും അനുഭവിക്കൂ.'}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">
              {language === 'en' ? 'Quick Links' : 'ദ്രുത ലിങ്കുകൾ'}
            </h4>
            <ul className="space-y-2">
              {[
                { label: language === 'en' ? 'Rooms' : 'മുറികൾ', id: 'rooms' },
                { label: language === 'en' ? 'Amenities' : 'സൗകര്യങ്ങൾ', id: 'amenities' },
                { label: language === 'en' ? 'Gallery' : 'ഗാലറി', id: 'gallery' },
                { label: language === 'en' ? 'Reviews' : 'അവലോകനങ്ങൾ', id: 'reviews' },
                { label: language === 'en' ? 'Location' : 'സ്ഥാനം', id: 'location' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => {
                      const element = document.getElementById(link.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="text-slate-400 hover:text-teal-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">
              {language === 'en' ? 'Contact Us' : 'ഞങ്ങളെ ബന്ധപ്പെടുക'}
            </h4>
            <div className="space-y-3">
              <a
                href={`tel:${hotelInfo.phone}`}
                className="flex items-start gap-3 text-slate-400 hover:text-teal-400 transition-colors"
              >
                <Phone className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>{hotelInfo.phone}</span>
              </a>
              <div className="flex items-start gap-3 text-slate-400">
                <Mail className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span>{hotelInfo.email}</span>
              </div>
              <div className="flex items-start gap-3 text-slate-400">
                <MapPin className="h-5 w-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{hotelInfo.address[language]}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-500">
          <p>
            © {currentYear} HR Residency.{' '}
            {language === 'en' ? 'All rights reserved.' : 'എല്ലാ അവകാശങ്ങളും സംരക്ഷിതം.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
