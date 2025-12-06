'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Clock, Phone, Search } from 'lucide-react';

export const LiveLocationDiscovery = () => {
  const [userLocation, setUserLocation] = useState('Detecting your location...');
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for different locations
  const locationData = {
    London: {
      agencies: 87,
      avgApprovalTime: 8,
      supportCenters: 12
    },
    Manchester: {
      agencies: 42,
      avgApprovalTime: 6,
      supportCenters: 8
    },
    Birmingham: {
      agencies: 38,
      avgApprovalTime: 7,
      supportCenters: 6
    }
  };
  
  const currentData = locationData.London; // Default to London for demo

  // Simulate geolocation detection
  useEffect(() => {
    const timer = setTimeout(() => {
      // In a real app, this would use navigator.geolocation
      setUserLocation('London'); // Default to London for demo
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const AnimatedCounter = ({ 
    end, 
    suffix = '', 
    duration = 2 
  }: { 
    end: number; 
    suffix?: string; 
    duration?: number; 
  }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      let startTime: number | null = null;
      const animateCount = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / (duration * 1000), 1);
        const currentValue = Math.floor(percentage * end);
        
        setCount(currentValue);
        
        if (progress < duration * 1000) {
          requestAnimationFrame(animateCount);
        }
      };
      
      requestAnimationFrame(animateCount);
    }, [end, duration]);
    
    return (
      <span className="font-heading font-bold text-4xl text-brand-blue">
        {count}{suffix}
      </span>
    );
  };

  return (
    <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden bg-brand-white">
      {/* Gradient Orbs */}
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-radial from-brand-blue/40 to-brand-white/30 blur-3xl"
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
        className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gradient-radial from-brand-blue/40 to-brand-black/30 blur-3xl"
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
      
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-white text-brand-blue mb-8 border border-brand-blue">
              <MapPin className="w-5 h-5" />
              <span className="text-base font-medium font-body">Live Discovery</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-6 font-heading">
              Fostering <span className="text-brand-blue">Near You</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-text.medium max-w-3xl mx-auto font-body mb-8">
              {isLoading ? 'Detecting your location...' : `We've found fostering opportunities in ${userLocation}`}
            </p>
            
            <div className="max-w-md mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text.light" />
                <input
                  type="text"
                  placeholder="Or search by city or postcode..."
                  className="w-full pl-12 pr-4 h-14 text-base rounded-2xl bg-brand-white border-2 border-brand-blue focus-visible:ring-2 focus-visible:ring-brand-blue font-body text-brand-black"
                />
              </div>
            </div>
          </motion.div>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-16 h-16 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div 
                className="glass-card rounded-3xl p-8 shadow-xl border border-brand-white text-center hover:-translate-y-1 hover:shadow-2xl transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="w-16 h-16 rounded-xl bg-brand-blue flex items-center justify-center text-white mx-auto mb-6">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-brand-black mb-4 font-heading">Agencies</h3>
                <div className="mb-4">
                  <AnimatedCounter end={currentData.agencies} />
                </div>
                <p className="text-text.medium font-body text-base">Verified fostering agencies ready to connect with you</p>
              </motion.div>
              
              <motion.div 
                className="glass-card rounded-3xl p-8 shadow-xl border border-brand-white text-center hover:-translate-y-1 hover:shadow-2xl transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div className="w-16 h-16 rounded-xl bg-brand-blue flex items-center justify-center text-white mx-auto mb-6">
                  <Clock className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-brand-black mb-4 font-heading">Approval Time</h3>
                <div className="mb-4">
                  <AnimatedCounter end={currentData.avgApprovalTime} suffix=" weeks" />
                </div>
                <p className="text-text.medium font-body text-base">Average time from application to approval</p>
              </motion.div>
              
              <motion.div 
                className="glass-card rounded-3xl p-8 shadow-xl border border-brand-white text-center hover:-translate-y-1 hover:shadow-2xl transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                whileHover={{ y: -10 }}
              >
                <div className="w-16 h-16 rounded-xl bg-brand-blue flex items-center justify-center text-white mx-auto mb-6">
                  <Phone className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-brand-black mb-4 font-heading">Support Centers</h3>
                <div className="mb-4">
                  <AnimatedCounter end={currentData.supportCenters} />
                </div>
                <p className="text-text.medium font-body text-base">Local support centers offering guidance and resources</p>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};