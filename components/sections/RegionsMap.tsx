'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Users, Clock, Phone } from 'lucide-react';

export const RegionsMap = () => {
  const [selectedRegion, setSelectedRegion] = useState('nationwide');
  
  const regions = [
    {
      id: 'nationwide',
      name: 'Nationwide',
      agencies: 450,
      avgApprovalTime: 8,
      supportCenters: 85
    },
    {
      id: 'london',
      name: 'London',
      agencies: 87,
      avgApprovalTime: 8,
      supportCenters: 12
    },
    {
      id: 'midlands',
      name: 'Midlands',
      agencies: 64,
      avgApprovalTime: 7,
      supportCenters: 9
    },
    {
      id: 'north',
      name: 'North England',
      agencies: 78,
      avgApprovalTime: 9,
      supportCenters: 11
    },
    {
      id: 'south',
      name: 'South England',
      agencies: 52,
      avgApprovalTime: 7,
      supportCenters: 8
    },
    {
      id: 'scotland',
      name: 'Scotland',
      agencies: 38,
      avgApprovalTime: 10,
      supportCenters: 6
    },
    {
      id: 'wales',
      name: 'Wales',
      agencies: 21,
      avgApprovalTime: 9,
      supportCenters: 4
    },
    {
      id: 'ni',
      name: 'Northern Ireland',
      agencies: 10,
      avgApprovalTime: 11,
      supportCenters: 3
    }
  ];

  const currentRegion = regions.find(region => region.id === selectedRegion) || regions[0];

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
      
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-white text-brand-blue mb-8 border border-brand-blue">
              <MapPin className="w-5 h-5" />
              <span className="text-base font-medium font-body">UK Wide Coverage</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-6 font-heading">
              Fostering <span className="text-brand-blue">Across the UK</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-text.medium max-w-3xl mx-auto font-body">
              Comprehensive support and agencies available throughout England, Scotland, Wales, and Northern Ireland
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Map Visualization */}
            <div className="lg:col-span-2">
              <div className="bg-brand-white rounded-3xl p-6 shadow-xl border border-brand-blue">
                <div className="relative h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-brand-blue/5 to-brand-blue/10">
                  {/* Simplified UK Map Representation */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-full h-full">
                      {/* England */}
                      <div 
                        className={`absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full cursor-pointer transition-all duration-300 ${
                          selectedRegion === 'london' || selectedRegion === 'midlands' || selectedRegion === 'north' || selectedRegion === 'south' 
                            ? 'bg-brand-blue ring-4 ring-brand-blue/30 scale-110' 
                            : 'bg-brand-blue/30 hover:bg-brand-blue/50'
                        }`}
                        onClick={() => setSelectedRegion('nationwide')}
                      ></div>
                      
                      {/* Scotland */}
                      <div 
                        className={`absolute top-0 left-1/3 w-1/3 h-1/3 rounded-full cursor-pointer transition-all duration-300 ${
                          selectedRegion === 'scotland' 
                            ? 'bg-brand-blue ring-4 ring-brand-blue/30 scale-110' 
                            : 'bg-brand-blue/30 hover:bg-brand-blue/50'
                        }`}
                        onClick={() => setSelectedRegion('scotland')}
                      ></div>
                      
                      {/* Wales */}
                      <div 
                        className={`absolute top-1/3 left-1/6 w-1/6 h-1/4 rounded-full cursor-pointer transition-all duration-300 ${
                          selectedRegion === 'wales' 
                            ? 'bg-brand-blue ring-4 ring-brand-blue/30 scale-110' 
                            : 'bg-brand-blue/30 hover:bg-brand-blue/50'
                        }`}
                        onClick={() => setSelectedRegion('wales')}
                      ></div>
                      
                      {/* Northern Ireland */}
                      <div 
                        className={`absolute top-1/4 left-1/20 w-1/12 h-1/8 rounded-full cursor-pointer transition-all duration-300 ${
                          selectedRegion === 'ni' 
                            ? 'bg-brand-blue ring-4 ring-brand-blue/30 scale-110' 
                            : 'bg-brand-blue/30 hover:bg-brand-blue/50'
                        }`}
                        onClick={() => setSelectedRegion('ni')}
                      ></div>
                      
                      {/* Labels */}
                      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-brand-black font-bold">
                        England
                      </div>
                      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-brand-black font-bold">
                        Scotland
                      </div>
                      <div className="absolute top-1/2 left-1/8 transform -translate-x-1/2 text-brand-black font-bold">
                        Wales
                      </div>
                      <div className="absolute top-1/3 left-1/24 text-brand-black font-bold">
                        NI
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Region Stats */}
            <div>
              <div className="bg-brand-white rounded-3xl p-6 shadow-xl border border-brand-blue sticky top-6">
                <h3 className="text-2xl font-bold text-brand-black mb-6 font-heading">
                  {currentRegion.name} Statistics
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue text-white flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-brand-blue font-heading">{currentRegion.agencies}+</div>
                      <div className="text-text.medium font-body">Fostering Agencies</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue text-white flex items-center justify-center">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-brand-blue font-heading">{currentRegion.avgApprovalTime} weeks</div>
                      <div className="text-text.medium font-body">Avg. Approval Time</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue text-white flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-brand-blue font-heading">{currentRegion.supportCenters}</div>
                      <div className="text-text.medium font-body">Support Centers</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="font-bold text-brand-black mb-4 font-heading">Select Region:</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {regions.map((region) => (
                      <button
                        key={region.id}
                        onClick={() => setSelectedRegion(region.id)}
                        className={`px-3 py-2 rounded-xl text-sm font-body transition-colors ${
                          selectedRegion === region.id
                            ? 'bg-brand-blue text-white'
                            : 'bg-brand-blue/10 text-brand-black hover:bg-brand-blue/20'
                        }`}
                      >
                        {region.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};