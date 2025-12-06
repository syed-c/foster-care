'use client';

import { motion } from 'framer-motion';

export const SocialProofMarquee = () => {
  const partners = [
    'Ofsted',
    'National Fostering Association',
    'Fostering Network',
    'Children\'s Commissioner',
    'Local Authority Partners',
    'University Research Teams'
  ];

  return (
    <section className="py-8 bg-brand-black">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16">
        <div className="text-center mb-6">
          <p className="text-brand-cream/80 font-body text-sm uppercase tracking-wider">
            Trusted by leading organizations
          </p>
        </div>
        
        <div className="overflow-hidden">
          <motion.div 
            className="flex gap-12"
            animate={{ x: ['-100%', '0%'] }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {[...partners, ...partners].map((partner, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 text-2xl font-bold text-brand-cream/60 font-heading whitespace-nowrap"
              >
                {partner}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
