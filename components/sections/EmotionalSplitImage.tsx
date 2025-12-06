'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export const EmotionalSplitImage = () => {
  return (
    <section className="py-16 sm:py-24 bg-brand-cream">
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative h-96 lg:h-[500px]">
                <Image
                  src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                  alt="Diverse group of children playing together"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/30 to-transparent" />
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cream text-brand-blue mb-6">
              <span className="text-sm font-medium font-body">Our Impact</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-6 font-heading">
              Building Brighter <span className="text-brand-blue">Futures</span>
            </h2>
            
            <p className="text-lg text-text.medium mb-6 font-body leading-relaxed">
              Every child deserves a chance to thrive in a safe, nurturing environment. 
              Our platform has connected thousands of children with loving families who 
              provide stability, guidance, and unconditional support.
            </p>
            
            <p className="text-lg text-text.medium mb-8 font-body leading-relaxed">
              Through our carefully vetted network of fostering agencies, we've helped 
              create lasting bonds that transform lives—not just for the children, but 
              for the entire families involved. The ripple effect of these connections 
              extends far beyond individual households, strengthening communities across the UK.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="/impact" 
                className="inline-block bg-gradient-to-r from-brand-blue to-brand-blue/90 text-white px-8 py-4 rounded-2xl font-body font-medium text-base text-center hover:shadow-lg transition-all"
              >
                See Our Impact
              </a>
              <a 
                href="/stories" 
                className="inline-block border-2 border-brand-blue text-brand-blue px-8 py-4 rounded-2xl font-body font-medium text-base text-center hover:bg-brand-blue/10 transition-all"
              >
                Read Success Stories
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};