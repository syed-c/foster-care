'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      id: 1,
      name: "Sarah & James",
      role: "Foster Parents for 3 Years",
      content: "The support we received throughout our fostering journey was exceptional. From the initial training to ongoing guidance, the team was always there when we needed them. Watching our foster daughter thrive has been the greatest reward.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 2,
      name: "Michael Thompson",
      role: "Social Worker",
      content: "Working with this platform has streamlined our agency matching process significantly. The quality of foster families we've connected with has improved dramatically, and the ongoing support resources are invaluable for both families and professionals.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      role: "Former Foster Youth",
      content: "Finding the right family through this platform changed my life. The careful matching process ensured I found a home where I truly belonged. Now I'm pursuing my degree and giving back to other young people in similar situations.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
    }
  ];

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-12 sm:py-16 lg:py-24 relative overflow-hidden bg-brand-white">
      {/* Gradient Orbs */}
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-radial from-brand-blue/40 to-brand-white/30 blur-3xl"
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
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-radial from-brand-blue/40 to-brand-black/30 blur-3xl"
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
              <Quote className="w-5 h-5" />
              <span className="text-base font-medium font-body">Community Voices</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-6 font-heading">
              Stories of <span className="text-brand-blue">Hope & Healing</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-text.medium max-w-3xl mx-auto font-body">
              Hear from foster families, social workers, and young people whose lives have been transformed
            </p>
          </motion.div>
          
          {/* Testimonial Carousel */}
          <div className="relative">
            <div className="overflow-hidden">
              <motion.div
                className="flex transition-transform duration-500 ease-in-out"
                animate={{ x: `-${currentIndex * 100}%` }}
                transition={{ duration: 0.5 }}
              >
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id} 
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-brand-white rounded-3xl p-8 shadow-xl border border-brand-blue">
                      <div className="flex items-center gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-6 h-6 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      
                      <blockquote className="text-lg text-text.medium mb-8 font-body italic">
                        "{testimonial.content}"
                      </blockquote>
                      
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="font-bold text-brand-black font-heading">{testimonial.name}</div>
                          <div className="text-text.medium font-body text-sm">{testimonial.role}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
            
            {/* Navigation Dots */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex ? 'bg-brand-blue w-8' : 'bg-brand-blue/30'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Stats */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-blue font-heading mb-2">2,500+</div>
              <div className="text-text.medium font-body">Families Helped</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-blue font-heading mb-2">450+</div>
              <div className="text-text.medium font-body">Agencies Partnered</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-brand-blue font-heading mb-2">98%</div>
              <div className="text-text.medium font-body">Success Rate</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};