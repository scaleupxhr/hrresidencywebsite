import React from 'react';
import { Card, CardContent } from './ui/card';
import { MapPin, Navigation } from 'lucide-react';
import { nearbyAttractions } from '../data/mockData';
import {
  Waves,
  Church,
  Building,
  Landmark,
  Telescope,
  Trees,
  Bird
} from 'lucide-react';

const iconMap = {
  Waves,
  Church,
  Building,
  Landmark,
  Telescope,
  Trees,
  Bird
};

const AttractionsSection = ({ language }) => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-20">
          <h2
            className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {language === 'en' ? 'Nearby Attractions' : 'സമീപത്തെ ആകർഷണങ്ങൾ'}
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {language === 'en'
              ? 'Explore the best of Kozhikode from our central location'
              : 'ഞങ്ങളുടെ കേന്ദ്ര സ്ഥാനത്ത് നിന്ന് കോഴിക്കോട്ടിലെ മികച്ചവ പര്യവേക്ഷണം ചെയ്യുക'}
          </p>
          <div className="w-24 h-1 bg-teal-600 mx-auto mt-6"></div>
        </div>

        {/* Attractions Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {nearbyAttractions.map((attraction) => {
            const IconComponent = iconMap[attraction.icon];
            return (
              <Card
                key={attraction.id}
                className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={attraction.image}
                    alt={attraction.name[language]}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-5 left-5 right-5">
                    <h3 className="text-xl font-bold text-white mb-1 leading-tight">
                      {attraction.name[language]}
                    </h3>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-700">
                      <MapPin className="h-5 w-5 text-teal-600" />
                      <span className="font-semibold text-base">{attraction.distance[language]}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                      <Navigation className="h-4 w-4" />
                      <span>{attraction.time[language]}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <div className="w-10 h-10 bg-teal-100 rounded-lg flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-teal-700" />
                    </div>
                    <span className="text-sm text-slate-600 font-medium">
                      {language === 'en' ? 'Popular destination' : 'ജനപ്രിയ ലക്ഷ്യസ്ഥാനം'}
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AttractionsSection;
