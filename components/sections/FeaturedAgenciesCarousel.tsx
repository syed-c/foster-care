'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, MapPin, Users, Award } from 'lucide-react';

export const FeaturedAgenciesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const agencies = [
    {
      id: 1,
      name: "Bright Futures Fostering",
      location: "London, England",
      rating: 4.9,
      reviews: 128,
      familiesSupported: 240,
      specialties: ["Therapeutic", "Teenagers", "Emergency"],
      image: "https://images.unsplash.com/photo-1582268616942-6a684b4741d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      name: "Capital Care",
      location: "Manchester, England",
      rating: 4.8,
      reviews: 96,
      familiesSupported: 180,
      specialties: ["Emergency", "Short-term", "Sibling Groups"],
      image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      name: "Northern Lights Care",
      location: "Edinburgh, Scotland",
      rating: 4.9,
      reviews: 87,
      familiesSupported: 150,
      specialties: ["Long-term", "Cultural", "Young Adults"],
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 4,
      name: "Welsh Family Services",
      location: "Cardiff, Wales",
      rating: 4.7,
      reviews: 76,
      familiesSupported: 130,
      specialties: ["Respite", "Disability", "Kinship"],
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    }
  ];

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % agencies.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [agencies.length]);

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
              <Award className="w-5 h-5" />
              <span className="text-base font-medium font-body">Trusted Partners</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-6 font-heading">
              Featured <span className="text-brand-blue">Fostering Agencies</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-text.medium max-w-3xl mx-auto font-body">
              Discover our handpicked selection of OFSTED-rated agencies committed to excellence
            </p>
          </motion.div>
          
          {/* Carousel */}
          <div className="relative overflow-hidden">
            <div className="overflow-hidden">
              <motion.div
                className="flex transition-transform duration-500 ease-in-out"
                animate={{ x: `-${currentIndex * 100}%` }}
                transition={{ duration: 0.5 }}
              >
                {agencies.map((agency) => (
                  <div 
                    key={agency.id} 
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-brand-white rounded-3xl p-8 shadow-xl border border-brand-blue">
                      <div className="flex flex-col md:flex-row gap-8">
                        {/* Agency Image */}
                        <div className="md:w-1/3">
                          <div className="rounded-2xl overflow-hidden h-64">
                            <img 
                              src={agency.image} 
                              alt={agency.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        
                        {/* Agency Info */}
                        <div className="md:w-2/3">
                          <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-bold text-brand-black font-heading">{agency.name}</h3>
                            <div className="flex items-center gap-1">
                              <Star className="w-5 h-5 text-yellow-400 fill-current" />
                              <span className="font-bold text-brand-black">{agency.rating}</span>
                              <span className="text-text.medium">({agency.reviews})</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-4">
                            <MapPin className="w-5 h-5 text-brand-blue" />
                            <span className="text-text.medium font-body">{agency.location}</span>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-6">
                            <Users className="w-5 h-5 text-brand-blue" />
                            <span className="text-text.medium font-body">{agency.familiesSupported}+ families supported</span>
                          </div>
                          
                          <div className="mb-6">
                            <h4 className="font-bold text-brand-black mb-2 font-heading">Specialties:</h4>
                            <div className="flex flex-wrap gap-2">
                              {agency.specialties.map((specialty, index) => (
                                <span 
                                  key={index} 
                                  className="px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-body"
                                >
                                  {specialty}
                                </span>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex gap-4">
                            <a 
                              href="#" 
                              className="px-6 py-3 bg-brand-blue text-white rounded-xl font-bold font-heading text-base hover:bg-brand-blue/90 transition-colors"
                            >
                              Learn More
                            </a>
                            <a 
                              href="#" 
                              className="px-6 py-3 border-2 border-brand-blue text-brand-blue rounded-xl font-bold font-heading text-base hover:bg-brand-blue/10 transition-colors"
                            >
                              Contact Agency
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 gap-2">
              {agencies.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-brand-blue w-8' : 'bg-brand-blue/30'
                  }`}
                  aria-label={`Go to agency ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};