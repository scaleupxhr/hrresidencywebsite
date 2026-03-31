import React from 'react';
import {
  ParkingCircle,
  Clock,
  ShowerHead,
  Bed,
  Heart,
  Baby,
  Shield,
  Wifi
} from 'lucide-react';
import { amenities } from '../data/mockData';

const iconMap = {
  ParkingCircle,
  Clock,
  ShowerHead,
  Bed,
  Heart,
  Baby,
  Shield,
  Wifi
};

const AmenitiesSection = ({ language }) => {
  return (
    <section id="amenities" className="py-20 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {language === 'en' ? 'Amenities & Services' : 'സൗകര്യങ്ങളും സേവനങ്ങളും'}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {language === 'en'
              ? 'Everything you need for a comfortable stay'
              : 'സുഖകരമായ താമസത്തിന് നിങ്ങൾക്ക് ആവശ്യമുള്ളതെല്ലാം'}
          </p>
          <div className="w-24 h-1 bg-teal-600 mx-auto mt-4"></div>
        </div>

        {/* Amenities Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {amenities.map((amenity, index) => {
            const IconComponent = iconMap[amenity.icon];
            return (
              <div
                key={index}
                className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-100 to-teal-50 rounded-2xl flex items-center justify-center group-hover:from-teal-200 group-hover:to-teal-100 transition-colors">
                    <IconComponent className="h-8 w-8 text-teal-700" />
                  </div>
                  <p className="font-semibold text-slate-900 text-sm leading-tight">
                    {amenity.name[language]}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AmenitiesSection;
