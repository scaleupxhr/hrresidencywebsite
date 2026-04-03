import React from 'react';
import { Phone, MapPin, Mail, Clock } from 'lucide-react';
import { hotelInfo, highlights } from '../data/mockData';

const AboutSection = ({ language }) => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-20">
            <h2
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {language === 'en' ? 'Welcome to HR Residency' : 'എച്ച്ആർ റെസിഡൻസിയിലേക്ക് സ്വാഗതം'}
            </h2>
            <div className="w-24 h-1 bg-teal-600 mx-auto"></div>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left: Info */}
            <div className="space-y-8">
              <p className="text-lg text-slate-700 leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                {language === 'en'
                  ? '"Experience comfort and convenience in the heart of Kozhikode"'
                  : '"കോഴിക്കോട്ടിന്റെ ഹൃദയഭാഗത്ത് സുഖവും സൗകര്യവും അനുഭവിക്കൂ"'}
              </p>
              <p className="text-base text-slate-600 leading-relaxed">
                {language === 'en'
                  ? 'HR Residency offers budget-friendly accommodation with modern amenities, perfect for both business and leisure travelers.'
                  : 'ബിസിനസ്സ്, വിനോദ സഞ്ചാരികൾക്ക് അനുയോജ്യമായ ആധുനിക സൗകര്യങ്ങളോടുകൂടിയ താങ്ങാനാവുന്ന താമസസൗകര്യം എച്ച്ആർ റെസിഡൻസി വാഗ്ദാനം ചെയ്യുന്നു.'}
              </p>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                <a
                  href={`tel:${hotelInfo.phone}`}
                  className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-all group"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                    <Phone className="h-6 w-6 text-teal-700" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-semibold mb-1">
                      {language === 'en' ? 'Call Us' : 'ഞങ്ങളെ വിളിക്കുക'}
                    </p>
                    <p className="text-lg font-bold text-slate-900">{hotelInfo.phone}</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-5 bg-white rounded-xl shadow-md">
                  <div className="flex-shrink-0 w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-amber-700" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 font-semibold mb-1">
                      {language === 'en' ? 'Location' : 'സ്ഥാനം'}
                    </p>
                    <p className="text-sm text-slate-900 leading-relaxed">{hotelInfo.address[language]}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md">
                    <Clock className="h-6 w-6 text-teal-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-600 font-medium mb-1">
                        {language === 'en' ? 'Check-in' : 'ചെക്ക്-ഇൻ'}
                      </p>
                      <p className="font-bold text-slate-900">{hotelInfo.checkIn}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white rounded-xl shadow-md">
                    <Clock className="h-6 w-6 text-red-600 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-slate-600 font-medium mb-1">
                        {language === 'en' ? 'Check-out' : 'ചെക്ക്-ഔട്ട്'}
                      </p>
                      <p className="font-bold text-slate-900">{hotelInfo.checkOut}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Highlights */}
            <div className="bg-gradient-to-br from-teal-600 to-teal-700 rounded-2xl p-10 shadow-2xl text-white">
              <h3 className="text-3xl font-bold mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                {language === 'en' ? 'Why Choose Us?' : 'എന്തുകൊണ്ട് ഞങ്ങളെ തിരഞ്ഞെടുക്കണം?'}
              </h3>
              <ul className="space-y-5">
                {highlights[language].map((highlight, index) => (
                  <li key={index} className="flex items-center gap-4 group">
                    <div className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    </div>
                    <span className={`text-lg leading-relaxed ${index === 3 || index === 4 ? 'font-bold' : ''}`}>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
