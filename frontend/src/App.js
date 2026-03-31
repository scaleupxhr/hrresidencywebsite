import React, { useState } from 'react';
import "./App.css";
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import RoomsSection from './components/RoomsSection';
import AmenitiesSection from './components/AmenitiesSection';
import GallerySection from './components/GallerySection';
import AttractionsSection from './components/AttractionsSection';
import ReviewsSection from './components/ReviewsSection';
import LocationSection from './components/LocationSection';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import { Toaster } from './components/ui/sonner';

function App() {
  const [language, setLanguage] = useState('en');

  const handleBookNowClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="App">
      <Header language={language} setLanguage={setLanguage} onBookNowClick={handleBookNowClick} />
      <HeroSection language={language} />
      <AboutSection language={language} />
      <RoomsSection language={language} />
      <AmenitiesSection language={language} />
      <GallerySection language={language} />
      <AttractionsSection language={language} />
      <ReviewsSection language={language} />
      <LocationSection language={language} />
      <Footer language={language} />
      <WhatsAppButton language={language} />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;
