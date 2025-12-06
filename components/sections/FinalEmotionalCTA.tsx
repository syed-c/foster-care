'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, Calendar, Heart } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';

export const FinalEmotionalCTA = () => {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-brand-white text-brand-black">
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
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Heart className="w-12 h-12 mx-auto mb-6 text-brand-blue" />
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 font-heading">
              Ready to <span className="text-brand-blue">Transform</span> a Young Life?
            </h2>
            
            <p className="text-lg sm:text-xl text-text.medium max-w-2xl mx-auto font-body mb-10">
              Take the first step towards becoming a foster parent today. Our team is here to guide you through every stage of the journey.
            </p>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <GradientButton 
              size="lg" 
              className="rounded-xl px-8 py-4 font-medium text-base"
            >
              <Phone className="mr-2 w-5 h-5" />
              Call Us: 0800-FOSTER
            </GradientButton>
            
            <GradientButton 
              variant="outline" 
              size="lg" 
              className="rounded-xl px-8 py-4 font-medium border-2 border-brand-blue text-brand-blue hover:bg-brand-blue/10"
            >
              <Mail className="mr-2 w-5 h-5" />
              Email Us
            </GradientButton>
          </motion.div>
          
          <motion.div 
            className="bg-brand-blue/5 backdrop-blur-sm rounded-3xl p-8 border border-brand-blue/20 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-shrink-0">
                <Calendar className="w-12 h-12 text-brand-blue" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl font-bold mb-2 font-heading">Schedule a Consultation</h3>
                <p className="text-text.medium font-body text-base mb-4">
                  Speak with one of our fostering specialists to learn more about the process and how we can support you.
                </p>
                <div className="inline-block bg-brand-blue text-white px-6 py-3 rounded-2xl font-bold font-heading text-lg">
                  Book Your Appointment
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};