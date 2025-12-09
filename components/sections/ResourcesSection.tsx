'use client';

import { motion } from 'framer-motion';
import { BookOpen, Heart, Lightbulb, Users } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';

export const ResourcesSection = () => {
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue mb-6">
            <BookOpen className="w-5 h-5" />
            <span className="text-base font-medium font-body">Helpful Resources</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-6 font-heading">
            Helpful Guides, Stories & <span className="text-brand-blue">Resources</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-text.medium max-w-3xl mx-auto font-body">
            Our resource hub offers warm, practical foster carer resources and guides to help you understand 
            the process beyond the basics. You'll find simple explainers, real carer experiences, legal 
            information, and day-to-day advice you can trust.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {[
            {
              icon: <Lightbulb className="w-8 h-8" />,
              title: "Getting Started",
              description: "Step-by-step guides for new foster carers"
            },
            {
              icon: <Heart className="w-8 h-8" />,
              title: "Real Stories",
              description: "Experiences from foster families across the UK"
            },
            {
              icon: <BookOpen className="w-8 h-8" />,
              title: "Legal Framework",
              description: "Understanding UK fostering regulations and rights"
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: "Support Networks",
              description: "Connecting with other foster carers and professionals"
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
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-text.medium font-body text-lg max-w-2xl mx-auto mb-6">
            Everything is written with care and reviewed to support your journey with accurate, comforting information.
          </p>
          
          <GradientButton 
            size="lg" 
            className="rounded-xl px-8 py-4 font-medium text-base"
          >
            Explore Resources
          </GradientButton>
        </motion.div>
      </div>
    </section>
  );
};