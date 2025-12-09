'use client';

import { motion } from 'framer-motion';
import { Home, Clock, Umbrella, Heart, Users, Stethoscope } from 'lucide-react';

export const AgencyTypesSection = () => {
  const agencyTypes = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Long-term fostering",
      description: "Stable, ongoing placements for children who need permanent care"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Short-term placements",
      description: "Temporary care while families address challenges or during transitions"
    },
    {
      icon: <Umbrella className="w-8 h-8" />,
      title: "Emergency fostering",
      description: "Immediate care for children in crisis situations"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Respite care",
      description: "Short breaks for primary carers to rest and recharge"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Parent & child placements",
      description: "Support for young parents learning to care for their children"
    },
    {
      icon: <Stethoscope className="w-8 h-8" />,
      title: "Therapeutic fostering",
      description: "Specialized care for children with complex emotional needs"
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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-6 font-heading">
            Explore Trusted Agencies Across the <span className="text-brand-blue">UK</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-text.medium max-w-3xl mx-auto font-body">
            Every child has unique needs, and every foster carer has different strengths. Our directory allows you 
            to explore agencies offering various services, including:
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {agencyTypes.map((type, index) => (
            <motion.div
              key={index}
              className="glass-card rounded-3xl p-6 shadow-lg border border-brand-white hover:-translate-y-1 transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-6">
                {type.icon}
              </div>
              <h3 className="text-xl font-bold text-brand-black mb-3 font-heading">{type.title}</h3>
              <p className="text-text.medium font-body text-base">{type.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg sm:text-xl text-text.medium max-w-3xl mx-auto font-body">
            This helps you understand which agency aligns with the type of care you want to provide.
          </p>
        </motion.div>
      </div>
    </section>
  );
};