'use client';

// RegionAllowancesSection.js
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Wallet, GraduationCap, Heart, Users } from 'lucide-react';

export default function RegionAllowancesSection({ data, regionSlug }) {
  // Default values if no data provided
  const title = data?.title || `Support for Foster Carers in This Region`;
  const description = data?.description || `Comprehensive support ensures you're never alone in your fostering journey`;
  const allowances = data?.allowances || [
    { title: "Financial Support", description: "Receive tax-free fostering allowances to cover the costs of caring for a child" },
    { title: "Training Programs", description: "Access initial training courses and ongoing professional development workshops" },
    { title: "Emotional Support", description: "24/7 helpline for emergencies, regular supervising visits, and peer support groups" }
  ];

  // Icons for allowances
  const icons = [Wallet, GraduationCap, Heart, Users];

  return (
    <section className="py-16 md:py-24 bg-brand-light">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong mb-6 border border-brand-white/30 shadow-sm mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Wallet className="w-5 h-5 text-brand-blue" />
              <span className="text-sm font-medium text-brand-black font-heading">Comprehensive Support</span>
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-black mb-6 font-heading"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {title}
            </motion.h2>
            
            <motion.p 
              className="text-xl text-text.medium max-w-3xl mx-auto font-body leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {description}
            </motion.p>
          </motion.div>
          
          {/* Enhanced allowances grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {allowances.map((allowance, index) => {
              const Icon = icons[index % icons.length];
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="rounded-2xl p-8 shadow-lg border border-brand-white/50 bg-white h-full hover:shadow-xl transition-shadow duration-300">
                    <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-brand-blue" />
                    </div>
                    
                    <h3 className="text-xl font-bold text-brand-black mb-4 font-heading">{allowance.title}</h3>
                    <p className="text-text.medium font-body leading-relaxed">{allowance.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}