'use client';

// RegionAboutSection.js
import { motion } from 'framer-motion';
import { Heart, Users, Home, Award } from 'lucide-react';

export default function RegionAboutSection({ data, regionSlug }) {
  // Default values if no data provided
  const title = data?.title || `Why Fostering in This Region Matters`;
  const body = data?.body || `<p>Fostering in this region offers unique opportunities to make a meaningful difference in children's lives. With diverse communities and strong local support networks, there's a perfect match for every prospective foster carer.</p><p>Your local knowledge and commitment can provide the stability and care that vulnerable children desperately need.</p>`;

  return (
    <section className="py-16 md:py-24 bg-brand-light">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong mb-6 border border-brand-white/30 shadow-sm mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Heart className="w-5 h-5 text-brand-blue" />
              <span className="text-sm font-medium text-brand-black font-heading">Regional Impact</span>
            </motion.div>
            
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-brand-black mb-6 font-heading"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              {title}
            </motion.h2>
          </motion.div>
          
          {/* Enhanced content with icon highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div 
                className="prose prose-lg max-w-none font-body text-text.medium"
                dangerouslySetInnerHTML={{ __html: body }} 
              />
            </motion.div>
            
            <motion.div
              className="grid grid-cols-2 gap-6"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl p-6 text-center border border-brand-white/50 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="font-bold text-lg text-brand-black font-heading mb-2">Community Connection</h3>
                <p className="text-text.medium text-sm font-body">Build strong relationships within your local community</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 text-center border border-brand-white/50 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Home className="w-6 h-6 text-brand-accent" />
                </div>
                <h3 className="font-bold text-lg text-brand-black font-heading mb-2">Local Support</h3>
                <p className="text-text.medium text-sm font-body">Access specialized local resources and support services</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 text-center border border-brand-white/50 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-brand-blue" />
                </div>
                <h3 className="font-bold text-lg text-brand-black font-heading mb-2">Cultural Familiarity</h3>
                <p className="text-text.medium text-sm font-body">Understand local customs, schools, and healthcare services</p>
              </div>
              
              <div className="bg-white rounded-2xl p-6 text-center border border-brand-white/50 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-brand-accent" />
                </div>
                <h3 className="font-bold text-lg text-brand-black font-heading mb-2">Lasting Impact</h3>
                <p className="text-text.medium text-sm font-body">Create meaningful, long-term positive change</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}