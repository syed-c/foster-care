'use client';

// RegionHeroSection.js
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, Heart } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';

export default function RegionHeroSection({ data, regionSlug }) {
  // Default values if no data provided
  const heading = data?.heading || `Foster Agencies in This Region`;
  const subheading = data?.subheading || `Find accredited foster agencies in this region`;
  const ctaPrimary = data?.cta_primary || { text: "Get Foster Agency Support", link: "/contact" };
  const ctaSecondary = data?.cta_secondary || { text: "Explore Cities", link: "#cities" };

  return (
    <section className="relative py-16 md:py-24 overflow-hidden section-hero bg-brand-light">
      {/* Animated gradient orbs for modern effect */}
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 rounded-full bg-brand-blue/10 blur-3xl"
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
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-brand-accent/10 blur-3xl"
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Enhanced badge with modern styling */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong mb-6 border border-brand-white/30 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MapPin className="w-5 h-5 text-brand-blue" />
            <span className="text-sm font-medium text-brand-black font-heading">Regional Fostering Hub</span>
          </motion.div>
          
          {/* Enhanced heading with better typography */}
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-black mb-6 font-heading leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {heading}
          </motion.h1>
          
          {/* Enhanced subheading with better spacing and typography */}
          <motion.p 
            className="text-xl md:text-2xl text-text.medium mb-10 font-body max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {subheading}
          </motion.p>
          
          {/* Enhanced CTA buttons with modern styling and animation */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <GradientButton
                size="lg"
                className="px-8 py-6 text-lg font-medium rounded-2xl"
                asChild
              >
                <Link href={ctaPrimary.link}>{ctaPrimary.text}</Link>
              </GradientButton>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                size="lg"
                variant="outline"
                className="glass-strong font-body px-8 py-6 text-lg rounded-2xl border border-brand-blue hover:bg-brand-blue/10"
                asChild
              >
                <Link href={ctaSecondary.link}>{ctaSecondary.text}</Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Trust indicators for credibility */}
          <motion.div 
            className="flex flex-wrap justify-center gap-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-brand-blue" />
              <span className="text-text.medium font-body">Ofsted Registered</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-brand-blue" />
              <span className="text-text.medium font-body">Local Authority Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-brand-blue" />
              <span className="text-text.medium font-body">24/7 Support Available</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}