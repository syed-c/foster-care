'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Heart, Users, MapPin, Star } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';

interface PremiumHeroProps {
  onSearch: (query: string) => void;
}

export const PremiumHero: React.FC<PremiumHeroProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  // Popular cities for quick links
  const popularCities = [
    { name: 'London', href: '/fostering-agencies-uk/england/london' },
    { name: 'Manchester', href: '/fostering-agencies-uk/england/manchester' },
    { name: 'Birmingham', href: '/fostering-agencies-uk/england/birmingham' },
    { name: 'Edinburgh', href: '/fostering-agencies-uk/scotland/edinburgh' },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-brand-white">
      {/* Gradient Orbs */}
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-radial from-brand-blue/30 to-brand-white/20 blur-3xl"
        animate={{ 
          x: [0, 30, 0, -30, 0],
          y: [0, -30, 0, 30, 0],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-radial from-brand-blue/30 to-brand-black/20 blur-3xl"
        animate={{ 
          x: [0, -30, 0, 30, 0],
          y: [0, 30, 0, -30, 0],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 relative z-10 py-12 sm:py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-center min-h-[80vh]">
          {/* Left Column - Headline + Search */}
          <motion.div 
            className="text-center lg:text-left pt-8 md:pt-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Shortened headline under 9 words */}
            <motion.h1 
              className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-brand-black mb-4 font-heading leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Transform a Child's Life
            </motion.h1>
            
            {/* Emotionally strong sub-line */}
            <motion.p 
              className="text-lg sm:text-xl lg:text-2xl text-text.medium mb-8 font-body leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Open your heart and home to a young person who needs you
            </motion.p>
            
            {/* Search Bar with autocomplete */}
            <motion.div 
              className="glass-strong rounded-3xl p-1 max-w-2xl mb-6 mx-auto lg:mx-0 shadow-xl border border-brand-white/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text.light" />
                  <input
                    type="text"
                    placeholder="Search by city or postcode..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 h-14 text-base rounded-2xl bg-brand-white/90 border-0 focus-visible:ring-2 focus-visible:ring-brand-blue font-body text-brand-black"
                  />
                </div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <GradientButton 
                    type="submit" 
                    className="h-14 px-8 rounded-2xl text-base font-medium"
                  >
                    Find Agencies
                  </GradientButton>
                </motion.div>
              </form>
            </motion.div>
            
            {/* Micro trust line */}
            <motion.div 
              className="text-center lg:text-left mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p className="text-sm text-text.light font-body">
                Regulated agencies • Verified reviews • UK-wide coverage
              </p>
            </motion.div>
            
            {/* Popular quick links */}
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start gap-3 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <span className="text-text.medium font-body text-sm">Popular cities:</span>
              {popularCities.map((city, index) => (
                <Link 
                  key={index}
                  href={city.href}
                  className="px-4 py-2 bg-brand-white text-brand-blue rounded-full text-sm font-body hover:bg-brand-blue/20 transition-colors border border-brand-blue"
                >
                  {city.name}
                </Link>
              ))}
            </motion.div>
            
            {/* Trust Stats */}
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-brand-blue font-heading">2,500+</div>
                <div className="text-sm text-text.medium font-body mt-1">Families Helped</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-brand-blue font-heading">450+</div>
                <div className="text-sm text-text.medium font-body mt-1">Agencies Listed</div>
              </div>
              
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-brand-blue font-heading">80+</div>
                <div className="text-sm text-text.medium font-body mt-1">Cities Covered</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Asymmetric Layout with Large Image */}
          <motion.div 
            className="relative flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-lg">
              {/* Moving Gradient Orb */}
              <motion.div 
                className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-radial from-brand-blue/40 to-brand-black/30 blur-3xl"
                animate={{ 
                  x: [0, 30, 0, -30, 0],
                  y: [0, -30, 0, 30, 0],
                }}
                transition={{ 
                  duration: 20,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Main Image with Mask */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative h-96 lg:h-[500px]">
                  <Image
                    src="https://images.unsplash.com/photo-1582268616942-6a684b4741d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                    alt="Happy diverse family embracing"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black/50 to-transparent" />
                </div>
              </div>
              
              {/* Floating Trust Cards */}
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-brand-blue rounded-2xl p-4 shadow-xl w-64"
                whileHover={{ y: -10, rotate: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-black">
                    <Star className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white font-heading">4.9/5</div>
                    <div className="text-xs text-white/80 font-body">Parent Rating</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-6 -right-6 bg-brand-blue rounded-2xl p-4 shadow-xl w-64"
                whileHover={{ y: -10, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-brand-black">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-white font-heading">98%</div>
                    <div className="text-xs text-white/80 font-body">Success Rate</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};