import React, { useState } from 'react';
import { Button } from './ui/button';
import { MapPin, Phone, Mail, Send } from 'lucide-react';
import { hotelInfo } from '../data/mockData';
import { toast } from 'sonner';

const LocationSection = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      toast.success(
        language === 'en'
          ? 'Message sent successfully! We will get back to you soon.'
          : 'സന്ദേശം വിജയകരമായി അയച്ചു! ഞങ്ങൾ ഉടൻ നിങ്ങളെ ബന്ധപ്പെടും.',
        { duration: 4000 }
      );
      setFormData({ name: '', email: '', message: '' });
    } else {
      toast.error(language === 'en' ? 'Please fill all required fields' : 'ദയവായി എല്ലാ ഫീൽഡുകളും പൂരിപ്പിക്കുക');
    }
  };

  return (
    <section id="location" className="py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {language === 'en' ? 'Location & Contact' : 'സ്ഥാനവും ബന്ധപ്പെടലും'}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {language === 'en'
              ? 'Visit us or get in touch for bookings and inquiries'
              : 'ബുക്കിംഗുകൾക്കും അന്വേഷണങ്ങൾക്കും ഞങ്ങളെ സന്ദർശിക്കുക അല്ലെങ്കിൽ ബന്ധപ്പെടുക'}
          </p>
          <div className="w-24 h-1 bg-teal-600 mx-auto mt-6"></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">
          {/* Map */}
          <div className="space-y-8">
            <div className="rounded-2xl overflow-hidden shadow-2xl h-96">
              <iframe
                src={hotelInfo.embedMapSrc}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="HR Residency Location"
              ></iframe>
            </div>

            {/* Contact Info */}
            <div className="grid gap-5">
              <div className="flex items-start gap-5 p-6 bg-white rounded-xl shadow-md">
                <div className="flex-shrink-0 w-14 h-14 bg-teal-100 rounded-lg flex items-center justify-center">
                  <MapPin className="h-7 w-7 text-teal-700" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 mb-2 text-base">
                    {language === 'en' ? 'Address' : 'വിലാസം'}
                  </p>
                  <p className="text-slate-600 text-base leading-relaxed">{hotelInfo.address[language]}</p>
                  <a
                    href={hotelInfo.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-teal-600 hover:text-teal-700 text-base font-semibold inline-flex items-center gap-1 mt-3 transition-colors"
                  >
                    {language === 'en' ? 'Get Directions' : 'ദിശകൾ നേടുക'} →
                  </a>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <a
                  href={`tel:${hotelInfo.phone}`}
                  className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all group"
                >
                  <div className="flex-shrink-0 w-14 h-14 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                    <Phone className="h-7 w-7 text-amber-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-2 text-sm">
                      {language === 'en' ? 'Phone' : 'ഫോൺ'}
                    </p>
                    <p className="text-slate-700 font-bold text-base">{hotelInfo.phone}</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md">
                  <div className="flex-shrink-0 w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center">
                    <Mail className="h-7 w-7 text-red-700" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 mb-2 text-sm">
                      {language === 'en' ? 'Email' : 'ഇമെയിൽ'}
                    </p>
                    <p className="text-slate-700 text-sm break-all">{hotelInfo.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-2xl p-10">
            <h3
              className="text-3xl font-bold text-slate-900 mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {language === 'en' ? 'Send us a Message' : 'ഞങ്ങൾക്ക് ഒരു സന്ദേശം അയയ്ക്കുക'}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  {language === 'en' ? 'Your Name *' : 'നിങ്ങളുടെ പേര് *'}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-slate-200 rounded-lg focus:border-teal-500 focus:outline-none transition-colors text-base"
                  placeholder={language === 'en' ? 'Enter your name' : 'നിങ്ങളുടെ പേര് നൽകുക'}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  {language === 'en' ? 'Email Address *' : 'ഇമെയിൽ വിലാസം *'}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-slate-200 rounded-lg focus:border-teal-500 focus:outline-none transition-colors text-base"
                  placeholder={language === 'en' ? 'your@email.com' : 'നിങ്ങളുടെ@email.com'}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  {language === 'en' ? 'Message *' : 'സന്ദേശം *'}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={6}
                  className="w-full px-5 py-4 border-2 border-slate-200 rounded-lg focus:border-teal-500 focus:outline-none transition-colors resize-none text-base"
                  placeholder={
                    language === 'en'
                      ? 'Tell us about your requirements...'
                      : 'നിങ്ങളുടെ ആവശ്യകതകളെക്കുറിച്ച് ഞങ്ങളോട് പറയുക...'
                  }
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-teal-600 hover:bg-teal-700 text-white py-7 text-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-xl rounded-lg"
              >
                <Send className="h-5 w-5" />
                {language === 'en' ? 'Send Message' : 'സന്ദേശം അയയ്ക്കുക'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
