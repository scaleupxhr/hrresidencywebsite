import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function HomePage() {
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

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route 
            path="/admin/dashboard" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
