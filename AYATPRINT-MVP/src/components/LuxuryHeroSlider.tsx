import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

const slides = [
  {
    id: 1,
    title: 'Surah An-Nas',
    setting: 'Luxury Moroccan Salon',
    image: '/hero/moroccan_salon_1784657473204.jpg',
    cta: 'Customize This Artwork'
  },
  {
    id: 2,
    title: 'Ayatul Kursi',
    setting: 'Modern Dubai Majlis',
    image: '/hero/dubai_majlis_1784657484652.jpg',
    cta: 'Customize This Artwork'
  },
  {
    id: 3,
    title: 'Surah Ar-Rahman',
    setting: 'Contemporary Paris Apartment',
    image: '/hero/paris_apartment_1784657494490.jpg',
    cta: 'View in Canvas Studio'
  },
  {
    id: 4,
    title: 'Surah Al-Ikhlas',
    setting: 'Luxury Hotel Lobby',
    image: '/hero/hotel_lobby_1784657505581.jpg',
    cta: 'Order Museum Edition'
  }
];

export default function LuxuryHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-114px)] overflow-hidden bg-black flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          />
          {/* Vignette & Gradient Overlay for readability */}
          <div className="absolute inset-0 bg-black/30 bg-radial from-transparent to-black/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-32 px-6 text-center text-white w-full max-w-5xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`content-${currentSlide}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="space-y-6 flex flex-col items-center"
          >
            <div className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.3em] uppercase text-art-gold">
              {slides[currentSlide].setting}
            </div>
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif font-medium tracking-tight text-white drop-shadow-lg">
              {slides[currentSlide].title}
            </h1>
            
            <button className="mt-8 px-10 py-4 bg-white/10 hover:bg-white text-white hover:text-black backdrop-blur-sm border border-white/30 transition-all duration-500 rounded-sm text-xs font-bold uppercase tracking-widest cursor-pointer group">
              <span className="group-hover:scale-105 inline-block transition-transform duration-300">
                {slides[currentSlide].cta}
              </span>
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-12 left-0 right-0 z-20 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="w-12 h-[2px] rounded-full overflow-hidden bg-white/20 relative cursor-pointer"
          >
            {index === currentSlide && (
              <motion.div
                layoutId="activeSlide"
                className="absolute inset-0 bg-white"
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 6, ease: "linear" }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
