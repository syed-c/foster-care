'use client';

import { motion } from 'framer-motion';
import { Search, FileText, MessageCircle, CheckCircle } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';

export const PlatformProcessSection = () => {
  const steps = [
    {
      icon: <Search className="w-8 h-8" />,
      title: "Browse Agencies",
      description: "Explore agencies across the UK and filter by region or fostering type."
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Read Clear Profiles",
      description: "Learn about their support, training, Ofsted ratings, and specialist services."
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Connect With Confidence",
      description: "Contact the agency directly when you're ready. No pressure. No confusion."
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-brand-white">
      <div className="site-container">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-6 font-heading">
            How Our Platform <span className="text-brand-blue">Works</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-text.medium max-w-3xl mx-auto font-body">
            We designed everything to be simple and supportive.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="glass-card rounded-3xl p-8 shadow-lg border border-brand-white text-center hover:-translate-y-1 transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mx-auto mb-6">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-brand-black mb-4 font-heading">{step.title}</h3>
              <p className="text-text.medium font-body text-base">{step.description}</p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <GradientButton 
            size="lg" 
            className="rounded-xl px-8 py-4 font-medium text-base"
          >
            Start Your Journey
          </GradientButton>
        </motion.div>
      </div>
    </section>
  );
};