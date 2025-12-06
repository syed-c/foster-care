'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Quote } from 'lucide-react';

export const EmotionalStorySplit = () => {
  return (
    <section className="py-16 sm:py-24 lg:py-32 relative overflow-hidden bg-brand-white">
      {/* Gradient Orbs */}
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-radial from-brand-blue/40 to-brand-white/30 blur-3xl"
        animate={{ 
          x: [0, 30, 0, -30, 0],
          y: [0, -30, 0, 30, 0],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-radial from-brand-blue/40 to-brand-black/30 blur-3xl"
        animate={{ 
          x: [0, -30, 0, 30, 0],
          y: [0, 30, 0, -30, 0],
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />
      
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Large Photography */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative h-[500px] lg:h-[600px]">
                <Image
                  src="https://images.unsplash.com/photo-1577896851231-70ef18881754?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                  alt="Foster family sharing a meal together"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-black/70 to-transparent" />
              </div>
            </div>
            
            {/* Photo Credit */}
            <div className="mt-4 text-center">
              <p className="text-sm text-text.light italic font-body">
                Sarah and her foster son James enjoying family dinner
              </p>
            </div>
          </motion.div>
          
          {/* Right Column - Narrative Copy */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-white text-brand-blue mb-8 border border-brand-blue">
              <Quote className="w-5 h-5" />
              <span className="text-base font-medium font-body">Real Stories</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-6 font-heading">
              Opening Hearts, Changing Lives
            </h2>
            
            <div className="prose prose-lg max-w-none mb-8">
              <p className="text-lg text-text.medium mb-6 font-body leading-relaxed">
                Sarah had always known she wanted to make a difference. But it wasn't until she became a foster parent that she truly understood what that meant.
              </p>
              
              <p className="text-lg text-text.medium mb-6 font-body leading-relaxed">
                When 14-year-old James came into her life, he was withdrawn and distrustful. Through months of patience, consistency, and unconditional love, Sarah helped him rediscover his smile.
              </p>
              
              <p className="text-lg text-text.medium mb-6 font-body leading-relaxed">
                "The day James called me 'mom' was the happiest moment of my life," Sarah shares. "But watching him graduate high school and knowing he's going to college? That's when I knew we'd changed each other's lives forever."
              </p>
              
              <p className="text-lg text-text.medium font-body leading-relaxed">
                Today, James is thriving in university, and Sarah continues fostering, helping other young people find their way home.
              </p>
            </div>
            
            <div className="mt-10">
              <div className="inline-block bg-brand-blue text-white px-8 py-4 rounded-2xl font-bold font-heading text-lg">
                Start Your Journey
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};