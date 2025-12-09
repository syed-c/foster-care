'use client';

import { motion } from 'framer-motion';
import { Heart, Star, Award, ThumbsUp } from 'lucide-react';

export const WhyChooseUsSection = () => {
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
            <Star className="w-5 h-5" />
            <span className="text-base font-medium font-body">Why Choose Us</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-6 font-heading">
            Why So Many Carers Start <span className="text-brand-blue">Here</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-text.medium max-w-3xl mx-auto font-body">
            People choose our platform because it feels personal, simple, and helpful. You're not just 
            scrolling through a list—you're being guided. We focus on clarity, warmth, and honesty.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            className="glass-card rounded-3xl p-8 shadow-lg border border-brand-white hover:-translate-y-1 transition"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-brand-black mb-6 font-heading flex items-center gap-3">
              <Heart className="w-8 h-8 text-brand-blue" />
              What We Offer
            </h3>
            
            <ul className="space-y-4">
              {[
                "Clear, jargon-free information about fostering agencies",
                "Detailed support packages and training programs",
                "Respite care options and emergency placements",
                "Placement types for all family situations",
                "Personalized guidance from fostering specialists"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-brand-blue text-xs">✓</span>
                  </div>
                  <span className="text-text.medium font-body text-base">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            className="glass-card rounded-3xl p-8 shadow-lg border border-brand-white hover:-translate-y-1 transition"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-brand-black mb-6 font-heading flex items-center gap-3">
              <Award className="w-8 h-8 text-brand-blue" />
              Our Commitment
            </h3>
            
            <ul className="space-y-4">
              {[
                "Up-to-date agency information and Ofsted ratings",
                "Verified reviews from real foster carers",
                "Transparent processes with no hidden fees",
                "Support for all types of fostering arrangements",
                "Ongoing resources for approved foster carers"
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-brand-blue/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                    <span className="text-brand-blue text-xs">✓</span>
                  </div>
                  <span className="text-text.medium font-body text-base">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-blue/10 text-brand-blue mb-6">
            <ThumbsUp className="w-6 h-6" />
            <span className="text-lg font-medium font-body">Our Goal</span>
          </div>
          
          <p className="text-lg sm:text-xl text-text.medium font-body">
            Our aim is to help you feel ready, informed, and supported from the moment you start your research.
          </p>
        </motion.div>
      </div>
    </section>
  );
};