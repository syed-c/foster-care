'use client';

import { motion } from 'framer-motion';
import { Users, TrendingUp, MessageSquare, Heart } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';

export const ForAgenciesSection = () => {
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
            <Users className="w-5 h-5" />
            <span className="text-base font-medium font-body">For Agencies</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-6 font-heading">
            For Agencies: <span className="text-brand-blue">Join Our Network</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-text.medium max-w-3xl mx-auto font-body">
            Agencies can register to connect with potential foster carers across the UK. Listing with us helps you 
            reach families who want to understand the foster care support services you offer.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: "Increased Visibility",
              description: "Reach thousands of prospective foster carers actively searching for agencies"
            },
            {
              icon: <MessageSquare className="w-8 h-8" />,
              title: "Direct Communication",
              description: "Connect directly with interested families through our platform"
            },
            {
              icon: <Heart className="w-8 h-8" />,
              title: "Community Impact",
              description: "Help more children find loving, stable homes through your services"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="glass-card rounded-3xl p-6 shadow-lg border border-brand-white text-center hover:-translate-y-1 transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mx-auto mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-brand-black mb-3 font-heading">{item.title}</h3>
              <p className="text-text.medium font-body text-base">{item.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="bg-brand-blue/5 backdrop-blur-sm rounded-3xl p-8 border border-brand-blue/20 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <h3 className="text-2xl font-bold text-brand-black mb-4 font-heading">
              We welcome regulated independent fostering agencies and local authorities committed to safe, high-quality care.
            </h3>
            
            <GradientButton 
              size="lg" 
              className="rounded-xl px-8 py-4 font-medium text-base mt-6"
            >
              Register Your Agency
            </GradientButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
};