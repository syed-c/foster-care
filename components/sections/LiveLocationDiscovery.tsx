'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Clock, Phone, Navigation } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';
import Image from 'next/image';

export const LiveLocationDiscovery = () => {
  const [userLocation, setUserLocation] = useState('London');
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for different locations
  const locationData = {
    London: {
      agencies: 87,
      avgApprovalTime: 8,
      supportCenters: 12,
      agenciesList: ['Bright Futures Fostering', 'Capital Care', 'London Family Services']
    },
    Manchester: {
      agencies: 42,
      avgApprovalTime: 6,
      supportCenters: 8,
      agenciesList: ['Northern Lights Care', 'Manchester Family Support', 'Citywide Fostering']
    },
    Birmingham: {
      agencies: 38,
      avgApprovalTime: 7,
      supportCenters: 6,
      agenciesList: ['Harbour Family Services', 'Midlands Care', 'Birmingham Fostering']
    }
  };
  
  const currentData = locationData[userLocation as keyof typeof locationData] || locationData.London;

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
      <span className="font-heading font-bold text-4xl gradient-text">
        {count}{suffix}
      </span>
    );
  };

  return (
    <section className="py-16 relative overflow-hidden bg-gradient-to-br from-offwhite-50 to-white">
      {/* Gradient Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-radial from-cyan-500/20 to-indigo-500/10 blur-3xl animate-gradient-orb" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gradient-radial from-amber-500/20 to-peach-500/10 blur-3xl animate-gradient-orb" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 text-teal-700 mb-6">
              <Navigation className="w-4 h-4" />
              <span className="text-sm font-medium font-body">Detected Location</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-heading">
              Fostering Opportunities Near <span className="gradient-text">{userLocation}</span>
            </h2>
            
            <p className="text-lg text-gray-600 max-w-3xl mx-auto font-body">
              Discover agencies, support centers, and resources in your area to begin your fostering journey
            </p>
          </motion.div>
          
          {isLoading ? (
            <div className="flex justify-center py-16">
              <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <motion.div 
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center text-white mx-auto mb-4">
                    <Users className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-text-charcoal mb-2 font-heading">Agencies</h3>
                  <div className="mb-3">
                    <AnimatedCounter end={currentData.agencies} />
                  </div>
                  <p className="text-gray-600 font-body text-sm">Verified fostering agencies ready to connect with you</p>
                </motion.div>
                
                <motion.div 
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="w-14 h-14 rounded-xl gradient-bg-warm flex items-center justify-center text-white mx-auto mb-4">
                    <Clock className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-text-charcoal mb-2 font-heading">Approval Time</h3>
                  <div className="mb-3">
                    <AnimatedCounter end={currentData.avgApprovalTime} suffix=" weeks" />
                  </div>
                  <p className="text-gray-600 font-body text-sm">Average time from application to approval</p>
                </motion.div>
                
                <motion.div 
                  className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-indigo-500 flex items-center justify-center text-white mx-auto mb-4">
                    <Phone className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-text-charcoal mb-2 font-heading">Support Centers</h3>
                  <div className="mb-3">
                    <AnimatedCounter end={currentData.supportCenters} />
                  </div>
                  <p className="text-gray-600 font-body text-sm">Local support centers offering guidance and resources</p>
                </motion.div>
              </div>
              
              {/* Featured Agencies */}
              <motion.div 
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-xl font-bold text-text-charcoal mb-5 font-heading flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-teal-500" />
                  Featured Agencies in {userLocation}
                </h3>
                
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  {currentData.agenciesList.map((agency, index) => (
                    <div 
                      key={index} 
                      className="p-4 rounded-xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100"
                    >
                      <h4 className="font-semibold text-text-charcoal font-heading">{agency}</h4>
                      <p className="text-xs text-gray-600 mt-1 font-body">Highly rated • 4.8/5 stars</p>
                    </div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <GradientButton size="md" className="rounded-xl px-6 py-3 font-medium text-sm">
                    View All {currentData.agencies} Agencies
                  </GradientButton>
                  <GradientButton 
                    variant="outline" 
                    size="md" 
                    className="rounded-xl px-6 py-3 font-medium border-2 text-sm"
                  >
                    Contact Local Support Center
                  </GradientButton>
                </div>
              </motion.div>
              
              {/* Location Selector */}
              <div className="text-center">
                <p className="text-gray-600 mb-4 font-body text-sm">Not in {userLocation}?</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {Object.keys(locationData).map((location) => (
                    <button
                      key={location}
                      onClick={() => setUserLocation(location)}
                      className={`px-4 py-2 rounded-full font-body transition-all duration-300 text-sm ${
                        userLocation === location
                          ? 'gradient-bg text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};