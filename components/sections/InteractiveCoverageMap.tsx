'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Clock, Phone } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';

export const InteractiveCoverageMap = () => {
  const [userLocation, setUserLocation] = useState('London');
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for different locations
  const locationData = {
    London: {
      agencies: 87,
      avgApprovalTime: 8,
      supportCenters: 12,
      agenciesList: [
        { name: 'Bright Futures Fostering', rating: 4.9, reviews: 128, specialties: ['Therapeutic', 'Teenagers'] },
        { name: 'Capital Care', rating: 4.8, reviews: 96, specialties: ['Emergency', 'Short-term'] },
        { name: 'London Family Services', rating: 4.7, reviews: 87, specialties: ['Long-term', 'Cultural'] }
      ]
    },
    Manchester: {
      agencies: 42,
      avgApprovalTime: 6,
      supportCenters: 8,
      agenciesList: [
        { name: 'Northern Lights Care', rating: 4.8, reviews: 96, specialties: ['Emergency', 'Short-term'] },
        { name: 'Manchester Family Support', rating: 4.7, reviews: 89, specialties: ['Therapeutic', 'Teenagers'] },
        { name: 'Citywide Fostering', rating: 4.6, reviews: 65, specialties: ['Long-term', 'Cultural'] }
      ]
    },
    Birmingham: {
      agencies: 38,
      avgApprovalTime: 7,
      supportCenters: 6,
      agenciesList: [
        { name: 'Harbour Family Services', rating: 4.9, reviews: 142, specialties: ['Cultural', 'Long-term'] },
        { name: 'Midlands Care', rating: 4.7, reviews: 89, specialties: ['Therapeutic', 'Teenagers'] },
        { name: 'Birmingham Fostering', rating: 4.6, reviews: 76, specialties: ['Emergency', 'Short-term'] }
      ]
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
      <span className="font-heading font-bold text-4xl text-brand-blue">
        {count}{suffix}
      </span>
    );
  };

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-brand-white">
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
      
      <div className="site-container">
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
              <span className="text-base font-medium font-body">National Coverage</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-6 font-heading">
              Fostering Opportunities Across the <span className="text-brand-blue">UK</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-text.medium max-w-3xl mx-auto font-body">
              Discover agencies, support centers, and resources in your area to begin your fostering journey
            </p>
          </motion.div>
          
          {isLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-16 h-16 border-4 border-brand-blue border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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
              
              {/* Featured Agencies Cards */}
              <motion.div 
                className="glass-card rounded-3xl p-8 shadow-xl border border-brand-white mb-12 hover:-translate-y-1 hover:shadow-2xl transition"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-brand-black mb-6 font-heading flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-brand-blue" />
                  Featured Agencies in {userLocation}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {currentData.agenciesList.map((agency, index) => (
                    <motion.div
                      key={index}
                      className="bg-brand-blue rounded-2xl p-5 text-white hover:scale-105 transition-transform duration-300"
                      whileHover={{ y: -5, rotate: index % 2 === 0 ? 1 : -1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-white font-heading text-lg">{agency.name}</h4>
                        <div className="flex items-center gap-1">
                          <span className="text-sm font-bold">{agency.rating}</span>
                          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                          </svg>
                        </div>
                      </div>
                      <p className="text-white/80 text-sm mb-3">({agency.reviews} reviews)</p>
                      <div className="flex flex-wrap gap-1">
                        {agency.specialties.map((specialty, idx) => (
                          <span 
                            key={idx} 
                            className="px-2 py-1 bg-white/20 text-white rounded-full text-xs font-body"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <GradientButton size="lg" className="rounded-xl px-8 py-4 font-medium text-base">
                    View All {currentData.agencies} Agencies
                  </GradientButton>
                  <GradientButton 
                    variant="outline" 
                    size="lg" 
                    className="rounded-xl px-8 py-4 font-medium border-2 text-base border-brand-blue text-brand-blue hover:bg-brand-blue/10"
                  >
                    Contact Local Support Center
                  </GradientButton>
                </div>
              </motion.div>
              
              {/* Location Selector */}
              <div className="text-center">
                <p className="text-text.medium mb-6 font-body text-base">Not in {userLocation}?</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {Object.keys(locationData).map((location) => (
                    <button
                      key={location}
                      onClick={() => setUserLocation(location)}
                      className={`px-6 py-3 rounded-full font-body transition-all duration-300 text-base font-medium hover:-translate-y-1 hover:shadow-lg ${
                        userLocation === location
                          ? 'bg-brand-blue text-white shadow-lg'
                          : 'bg-brand-white text-brand-black hover:bg-brand-blue/10 border border-brand-blue'
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