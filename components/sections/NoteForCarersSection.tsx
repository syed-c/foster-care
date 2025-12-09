'use client';

import { motion } from 'framer-motion';
import { Heart, BookOpen, Clock } from 'lucide-react';

export const NoteForCarersSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-brand-cream">
      <div className="site-container">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 text-brand-blue mb-6">
            <Heart className="w-5 h-5" />
            <span className="text-base font-medium font-body">A Note for New Carers</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-6 font-heading">
            A Note for <span className="text-brand-blue">New Carers</span>
          </h2>
          
          <div className="glass-card rounded-3xl p-8 shadow-lg border border-brand-white">
            <p className="text-lg sm:text-xl text-text.medium font-body mb-6">
              You don't have to rush your decision. Take your time. Read profiles. Learn about different agencies. 
              And when you're ready, reach out to the one that feels right for you.
            </p>
            
            <p className="text-lg sm:text-xl text-text.medium font-body">
              We're here to make the journey easier, one step at a time.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-8 pt-8 border-t border-brand-white/50">
              <div className="flex items-center gap-2">
                <Clock className="w-6 h-6 text-brand-blue" />
                <span className="text-text.medium font-body">Take your time</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-brand-blue" />
                <span className="text-text.medium font-body">Learn at your pace</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-6 h-6 text-brand-blue" />
                <span className="text-text.medium font-body">Choose with confidence</span>
              </div>
              </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};