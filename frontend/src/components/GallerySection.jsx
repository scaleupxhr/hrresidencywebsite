import React, { useState } from 'react';
import { Dialog, DialogContent } from './ui/dialog';
import { X } from 'lucide-react';
import { galleryImages } from '../data/mockData';

const GallerySection = ({ language }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <section id="gallery" className="py-24 bg-white">
        <div className="container mx-auto px-4">
          {/* Section Title */}
          <div className="text-center mb-20">
            <h2
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {language === 'en' ? 'Photo Gallery' : 'ഫോട്ടോ ഗാലറി'}
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {language === 'en'
                ? 'Take a virtual tour of our property and facilities'
                : 'ഞങ്ങളുടെ സ്വത്തിന്റെയും സൗകര്യങ്ങളുടെയും വെർച്വൽ ടൂർ എടുക്കുക'}
            </p>
            <div className="w-24 h-1 bg-teal-600 mx-auto mt-6"></div>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className={`relative overflow-hidden rounded-xl cursor-pointer group shadow-md hover:shadow-xl transition-all ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image.url}
                  alt={image.alt}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                    index === 0 ? 'h-full min-h-[400px]' : 'h-72'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-semibold text-lg">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>

          {/* View More Note */}
          <div className="text-center mt-12">
            <p className="text-slate-600 text-base leading-relaxed">
              {language === 'en'
                ? 'Visit us to experience the warmth and comfort firsthand'
                : 'ഊഷ്മളതയും സുഖവും നേരിട്ട് അനുഭവിക്കാൻ ഞങ്ങളെ സന്ദർശിക്കുക'}
            </p>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage && (
        <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
          <DialogContent className="max-w-5xl w-full p-0 overflow-hidden">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-50 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
            <img
              src={selectedImage.url}
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[85vh] object-contain"
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default GallerySection;
