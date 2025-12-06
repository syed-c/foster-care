'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';

export const AgencyComparisonPreview = () => {
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  
  const toggleRow = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };
  
  // Mock data for featured agencies
  const agencies = [
    {
      id: 1,
      name: 'Bright Futures Fostering',
      rating: 4.9,
      reviews: 128,
      approvalTime: '6-8 weeks',
      support: '24/7',
      training: 'Comprehensive',
      allowance: '£450/week',
      specialization: 'Therapeutic, Teenagers',
      featured: true
    },
    {
      id: 2,
      name: 'Capital Care',
      rating: 4.8,
      reviews: 96,
      approvalTime: '8-10 weeks',
      support: 'Business Hours',
      training: 'Standard',
      allowance: '£420/week',
      specialization: 'Emergency, Short-term',
      featured: true
    }
  ];

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
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-6 font-heading">
            Featured <span className="text-brand-blue">Fostering Agencies</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-text.medium max-w-3xl mx-auto font-body mb-8">
            Discover our handpicked selection of OFSTED-rated agencies committed to excellence
          </p>
          
          <GradientButton 
            size="lg" 
            className="rounded-xl px-8 py-4 font-medium text-base"
          >
            View All Agencies
            <ArrowRight className="ml-2 w-5 h-5 inline" />
          </GradientButton>
        </motion.div>
        
        {/* Mobile Cards View */}
        <div className="block lg:hidden space-y-6">
          {agencies.map((agency, index) => (
            <motion.div
              key={agency.id}
              className={`rounded-3xl p-6 shadow-xl border ${
                agency.featured 
                  ? 'bg-gradient-to-br from-brand-blue to-brand-blue/90 text-white border-brand-blue' 
                  : 'bg-brand-white border-brand-blue text-brand-black'
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className={`font-bold font-heading text-xl ${agency.featured ? 'text-white' : 'text-brand-black'}`}>
                    {agency.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(agency.rating) ? 'fill-current' : 'fill-current opacity-30'} ${agency.featured ? 'text-white' : 'text-brand-blue'}`} 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                        </svg>
                      ))}
                    </div>
                    <span className={`text-sm font-body ${agency.featured ? 'text-white/90' : 'text-text.medium'}`}>
                      {agency.rating} ({agency.reviews} reviews)
                    </span>
                  </div>
                </div>
                {agency.featured && (
                  <span className="px-3 py-1 bg-white text-brand-blue rounded-full text-xs font-bold font-body">
                    FEATURED
                  </span>
                )}
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className={`font-body ${agency.featured ? 'text-white/90' : 'text-text.medium'}`}>Approval Time</span>
                  <span className={`font-medium ${agency.featured ? 'text-white' : 'text-brand-black'}`}>{agency.approvalTime}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`font-body ${agency.featured ? 'text-white/90' : 'text-text.medium'}`}>Support</span>
                  <span className={`font-medium ${agency.featured ? 'text-white' : 'text-brand-black'}`}>{agency.support}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`font-body ${agency.featured ? 'text-white/90' : 'text-text.medium'}`}>Training</span>
                  <span className={`font-medium ${agency.featured ? 'text-white' : 'text-brand-black'}`}>{agency.training}</span>
                </div>
                <div className="flex justify-between">
                  <span className={`font-body ${agency.featured ? 'text-white/90' : 'text-text.medium'}`}>Allowance</span>
                  <span className={`font-medium ${agency.featured ? 'text-white' : 'text-brand-black'}`}>{agency.allowance}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className={`text-sm font-body ${agency.featured ? 'text-white/90' : 'text-text.medium'}`}>
                  {agency.specialization}
                </span>
                <GradientButton 
                  variant={agency.featured ? "outline" : "default"}
                  size="sm"
                  className={`rounded-xl px-4 py-2 text-sm font-medium ${
                    agency.featured 
                      ? 'border-white text-white hover:bg-white/20' 
                      : 'border-brand-blue text-brand-blue hover:bg-brand-blue/10'
                  }`}
                >
                  Learn More
                </GradientButton>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Desktop Cards View */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {agencies.map((agency, index) => (
              <motion.div
                key={agency.id}
                className={`rounded-3xl p-6 shadow-xl border ${
                  agency.featured 
                    ? 'bg-gradient-to-br from-brand-blue to-brand-blue/90 text-white border-brand-blue' 
                    : 'bg-brand-white border-brand-blue text-brand-black'
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className={`font-bold font-heading text-xl ${agency.featured ? 'text-white' : 'text-brand-black'}`}>
                      {agency.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(agency.rating) ? 'fill-current' : 'fill-current opacity-30'} ${agency.featured ? 'text-white' : 'text-brand-blue'}`} 
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                          </svg>
                        ))}
                      </div>
                      <span className={`text-sm font-body ${agency.featured ? 'text-white/90' : 'text-text.medium'}`}>
                        {agency.rating} ({agency.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  {agency.featured && (
                    <span className="px-3 py-1 bg-white text-brand-blue rounded-full text-xs font-bold font-body">
                      FEATURED
                    </span>
                  )}
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className={`font-body ${agency.featured ? 'text-white/90' : 'text-text.medium'}`}>Approval Time</span>
                    <span className={`font-medium ${agency.featured ? 'text-white' : 'text-brand-black'}`}>{agency.approvalTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`font-body ${agency.featured ? 'text-white/90' : 'text-text.medium'}`}>Support</span>
                    <span className={`font-medium ${agency.featured ? 'text-white' : 'text-brand-black'}`}>{agency.support}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`font-body ${agency.featured ? 'text-white/90' : 'text-text.medium'}`}>Training</span>
                    <span className={`font-medium ${agency.featured ? 'text-white' : 'text-brand-black'}`}>{agency.training}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`font-body ${agency.featured ? 'text-white/90' : 'text-text.medium'}`}>Allowance</span>
                    <span className={`font-medium ${agency.featured ? 'text-white' : 'text-brand-black'}`}>{agency.allowance}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-body ${agency.featured ? 'text-white/90' : 'text-text.medium'}`}>
                    {agency.specialization}
                  </span>
                  <GradientButton 
                    variant={agency.featured ? "outline" : "default"}
                    size="sm"
                    className={`rounded-xl px-4 py-2 text-sm font-medium ${
                      agency.featured 
                        ? 'border-white text-white hover:bg-white/20' 
                        : 'border-brand-blue text-brand-blue hover:bg-brand-blue/10'
                    }`}
                  >
                    Learn More
                  </GradientButton>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};