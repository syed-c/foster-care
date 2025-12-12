'use client';

// RegionFinalCtaSection.js
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { GradientButton } from '@/components/ui/GradientButton';
import { Heart, Users, MessageCircle } from 'lucide-react';

export default function RegionFinalCtaSection({ data, regionSlug }) {
  // Default values if no data provided
  const title = data?.title || "Ready to Start Your Fostering Journey?";
  const subtitle = data?.subtitle || "Take the first step towards making a difference in a child's life";
  const primaryCta = data?.primaryCta || { label: "Talk to a Foster Advisor", href: "/contact" };
  const secondaryCta = data?.secondaryCta || { label: "Download Information Pack", href: "#" };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-brand-blue text-white">
      {/* Enhanced gradient orbs */}
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 rounded-full bg-brand-blue/20 blur-3xl"
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
        className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-brand-accent/20 blur-3xl"
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
          {/* Enhanced header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 font-heading text-white"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {title}
            </motion.h2>
            
            <motion.p 
              className="text-xl mb-10 font-body text-white/90 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          </motion.div>
          
          {/* Enhanced CTA buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
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
                <Link href={primaryCta.href}>
                  {primaryCta.label}
                </Link>
              </GradientButton>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="lg" 
                variant="outline" 
                className="glass-strong text-white border-white hover:bg-white/10 px-8 py-6 text-lg font-medium rounded-2xl font-body"
                asChild
              >
                <Link href={secondaryCta.href}>
                  {secondaryCta.label}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          {/* Enhanced trust indicators */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold font-heading text-white">2,500+</div>
                <div className="text-sm text-white/80 font-body">Families Helped</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold font-heading text-white">450+</div>
                <div className="text-sm text-white/80 font-body">Agencies Listed</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold font-heading text-white">98%</div>
                <div className="text-sm text-white/80 font-body">Satisfaction Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}