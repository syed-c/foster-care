'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Search, Heart, Users, MapPin, Star } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';

interface EmotionalHeroProps {
  onSearch: (query: string) => void;
}

export const EmotionalHero: React.FC<EmotionalHeroProps> = ({ onSearch }) => {
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-offwhite-50 to-white">
      {/* Gradient Orbs */}
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-radial from-teal-500/20 to-cyan-500/10 blur-3xl"
        animate={{ 
          x: [0, 20, 0, -20, 0],
          y: [0, -20, 0, 20, 0],
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-radial from-amber-500/20 to-peach-500/10 blur-3xl"
        animate={{ 
          x: [0, -20, 0, 20, 0],
          y: [0, 20, 0, -20, 0],
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <div className="container mx-auto px-4 relative z-10 py-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
          {/* Left Column - Headline + Search */}
          <motion.div 
            className="text-center lg:text-left pt-12"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Shortened headline under 10 words */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-text-charcoal mb-4 font-heading leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Find Your Perfect Fostering Family
            </motion.h1>
            
            {/* Emotionally strong sub-line */}
            <motion.p 
              className="text-xl text-gray-600 mb-8 font-body leading-relaxed max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Transform a child's life with your loving care
            </motion.p>
            
            {/* Search Bar with autocomplete */}
            <motion.div 
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-1 max-w-2xl mb-6 mx-auto lg:mx-0 shadow-lg border border-white/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by city or postcode..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 h-14 text-base rounded-xl bg-white/90 border-0 focus-visible:ring-2 focus-visible:ring-teal-500 font-body"
                  />
                </div>
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <GradientButton 
                    type="submit" 
                    className="h-14 px-8 rounded-xl text-base font-medium"
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
              <p className="text-sm text-gray-500 font-body">
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
              <span className="text-gray-600 font-body text-sm">Popular cities:</span>
              {popularCities.map((city, index) => (
                <Link 
                  key={index}
                  href={city.href}
                  className="px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-body hover:bg-teal-100 transition-colors"
                >
                  {city.name}
                </Link>
              ))}
            </motion.div>
            
            {/* Trust Stats */}
            <motion.div 
              className="flex flex-wrap justify-center lg:justify-start gap-8 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text font-heading">2,500+</div>
                <div className="text-sm text-gray-600 font-body mt-1">Families Helped</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text font-heading">450+</div>
                <div className="text-sm text-gray-600 font-body mt-1">Agencies Listed</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text font-heading">80+</div>
                <div className="text-sm text-gray-600 font-body mt-1">Cities Covered</div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Stacked Floating Cards + Moving Gradient Orb */}
          <motion.div 
            className="relative flex justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full max-w-lg">
              {/* Moving Gradient Orb */}
              <motion.div 
                className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-gradient-radial from-cyan-500/30 to-indigo-500/20 blur-3xl"
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
              
              {/* Stacked Floating Cards */}
              <div className="relative grid grid-cols-2 gap-6">
                {/* Main Image Card */}
                <motion.div 
                  className="col-span-2 row-span-2 rounded-3xl overflow-hidden shadow-2xl"
                  whileHover={{ y: -10, rotate: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="relative h-96">
                    <Image
                      src="https://images.unsplash.com/photo-1582268616942-6a684b4741d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                      alt="Happy diverse family embracing"
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold font-heading">The Johnson Family</h3>
                      <p className="font-body">Fostering for 3 years</p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Stats Card */}
                <motion.div 
                  className="rounded-2xl bg-white p-6 shadow-xl border border-gray-100"
                  whileHover={{ y: -10, rotate: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center text-white">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-text-charcoal font-heading">98%</div>
                      <div className="text-sm text-gray-600 font-body">Success Rate</div>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm font-body">
                    Of families find their perfect match within 30 days
                  </p>
                </motion.div>
                
                {/* Quote Card */}
                <motion.div 
                  className="rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 p-6 shadow-xl text-white"
                  whileHover={{ y: -10, rotate: -1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                      <Heart className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold font-heading">5,000+</div>
                      <div className="text-sm font-body">Children Placed</div>
                    </div>
                  </div>
                  <p className="text-sm font-body">
                    "Opening our hearts has enriched our lives beyond measure"
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};