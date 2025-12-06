'use client';

import { motion } from 'framer-motion';

export const MissionStatement = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-r from-brand-blue/5 to-brand-cream">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-6 font-heading">
              Our <span className="text-brand-blue">Mission</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-text.medium mb-8 font-body leading-relaxed">
              We believe every child deserves a safe, nurturing environment where they can thrive. 
              Our platform connects compassionate individuals with verified fostering agencies to 
              create life-changing opportunities for young people across the UK.
            </p>
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cream text-brand-blue">
              <span className="text-base font-medium font-body">Compassion • Integrity • Excellence</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};