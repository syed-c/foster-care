'use client';

import { motion } from 'framer-motion';
import { MapPin, Flag } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';

export const RegionsCoverageSection = () => {
  const regions = [
    {
      name: "England",
      description: "Home to numerous fostering agencies with diverse opportunities across metropolitan and rural areas.",
      agencies: "250+ agencies",
      flagColor: "bg-red-600"
    },
    {
      name: "Scotland",
      description: "Distinctive fostering system with strong community support and specialized training programs.",
      agencies: "80+ agencies",
      flagColor: "bg-blue-600"
    },
    {
      name: "Wales",
      description: "Welsh-speaking services and culturally sensitive approaches to fostering families.",
      agencies: "60+ agencies",
      flagColor: "bg-green-600"
    },
    {
      name: "Northern Ireland",
      description: "Close-knit fostering communities with personalized support and local expertise.",
      agencies: "40+ agencies",
      flagColor: "bg-yellow-500"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-brand-cream">
      <div className="site-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue mb-6">
            <MapPin className="w-5 h-5" />
            <span className="text-base font-medium font-body">Nationwide Coverage</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-6 font-heading">
            Helping Carers Across <span className="text-brand-blue">England, Scotland, Wales & Northern Ireland</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-text.medium max-w-3xl mx-auto font-body mb-10">
            Fostering works differently across the UK. That's why we highlight options in all four nations, 
            each with its own regulations, support levels, and training approaches.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {regions.map((region, index) => (
            <motion.div
              key={index}
              className="glass-card rounded-3xl p-6 shadow-lg border border-brand-white hover:-translate-y-1 transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-8 h-8 rounded-full ${region.flagColor} flex items-center justify-center`}>
                  <Flag className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-xl font-bold text-brand-black font-heading">{region.name}</h3>
              </div>
              
              <p className="text-text.medium font-body text-base mb-4">
                {region.description}
              </p>
              
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-brand-white/50">
                <span className="text-brand-blue font-bold font-heading">{region.agencies}</span>
                <GradientButton 
                  variant="outline" 
                  size="sm"
                  className="rounded-xl px-4 py-2 text-sm font-medium border-brand-blue text-brand-blue hover:bg-brand-blue/10"
                >
                  Explore
                </GradientButton>
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <p className="text-text.medium font-body text-lg max-w-2xl mx-auto mb-6">
            Our platform helps you explore local fostering agencies near you so you can see what each area 
            offers and choose a team that fits your family and lifestyle.
          </p>
        </motion.div>
      </div>
    </section>
  );
};