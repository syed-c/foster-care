'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, Calendar } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';

export const StrongCTA = () => {
  return (
    <section className="py-16 sm:py-24 relative overflow-hidden bg-brand-blue text-white">
      {/* Gradient Orbs */}
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-radial from-brand-white/40 to-brand-blue/30 blur-3xl"
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
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-radial from-brand-white/40 to-brand-black/30 blur-3xl"
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
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 font-heading">
                Ready to Make a <span className="text-brand-white">Difference</span>?
              </h2>
              
              <p className="text-lg sm:text-xl text-white/90 mb-8 font-body">
                Join thousands of families who have opened their hearts and homes. Our team is standing by to answer your questions and guide you through the process.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white text-brand-blue flex items-center justify-center">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold font-heading">Call Us</div>
                    <div className="text-white/90 font-body">0800-FOSTER-KIDS</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white text-brand-blue flex items-center justify-center">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold font-heading">Email Us</div>
                    <div className="text-white/90 font-body">info@fostercare.co.uk</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white text-brand-blue flex items-center justify-center">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="font-bold font-heading">Schedule a Chat</div>
                    <div className="text-white/90 font-body">Book a free consultation</div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold mb-6 font-heading">Request More Information</h3>
              
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white/90 mb-2 font-body">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Your name"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-white/90 mb-2 font-body">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="your.email@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-white/90 mb-2 font-body">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="Your phone number"
                  />
                </div>
                
                <div>
                  <label htmlFor="location" className="block text-white/90 mb-2 font-body">Your Location</label>
                  <input
                    type="text"
                    id="location"
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
                    placeholder="City or postcode"
                  />
                </div>
                
                <div>
                  <label htmlFor="interest" className="block text-white/90 mb-2 font-body">Area of Interest</label>
                  <select
                    id="interest"
                    className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <option value="" className="text-brand-black">Select your interest</option>
                    <option value="fostering" className="text-brand-black">Become a Foster Parent</option>
                    <option value="support" className="text-brand-black">Support Services</option>
                    <option value="training" className="text-brand-black">Professional Training</option>
                    <option value="volunteer" className="text-brand-black">Volunteer Opportunities</option>
                  </select>
                </div>
                
                <GradientButton 
                  type="submit" 
                  size="lg" 
                  className="w-full rounded-xl px-6 py-4 font-medium text-base bg-white text-brand-blue hover:bg-white/90"
                >
                  Send Request
                </GradientButton>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};