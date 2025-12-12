'use client';

// RegionBenefitsSection.js
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Heart, Shield, Users, Award, Clock, Home } from 'lucide-react';

export default function RegionBenefitsSection({ data, regionSlug }) {
  // Default values if no data provided
  const title = data?.title || `Benefits of Fostering Locally`;
  const description = data?.description || `Discover the advantages of becoming a foster carer in your local community`;
  const benefitsItems = data?.items || [
    { title: "Community Connection", description: "Build strong relationships within your local community." },
    { title: "Local Support Networks", description: "Access specialized local resources and support services." },
    { title: "Cultural Familiarity", description: "Understand local customs, schools, and healthcare services." }
  ];

  // Icons for benefits
  const icons = [Heart, Shield, Users, Award, Clock, Home];

  return (
    <section className="py-16 md:py-24 section-highlight bg-brand-light">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced header with animation */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-strong mb-6 border border-brand-white/30 shadow-sm"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Heart className="w-5 h-5 text-brand-blue" />
              <span className="text-sm font-medium text-brand-black font-heading">Comprehensive Support</span>
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
            
            <motion.p 
              className="text-xl text-text.medium max-w-3xl mx-auto font-body leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {description}
            </motion.p>
          </motion.div>
          
          {/* Enhanced grid with modern cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="section-card rounded-3xl p-8 shadow-xl border border-brand-white/50 bg-white h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-blue/10 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-brand-blue" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-black font-heading">Benefits</h3>
                </div>
                
                <ul className="space-y-6">
                  {benefitsItems.map((item, index) => {
                    const Icon = icons[index % icons.length];
                    return (
                      <motion.li 
                        key={index} 
                        className="flex items-start"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: 0.1 * index }}
                      >
                        <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                          <Icon className="w-4 h-4 text-brand-blue" />
                        </div>
                        <div>
                          <div className="font-bold text-lg text-brand-black font-heading mb-1">{item.title}</div>
                          <div className="text-text.medium font-body">{item.description}</div>
                        </div>
                      </motion.li>
                    );
                  })}
                </ul>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="section-card rounded-3xl p-8 shadow-xl border border-brand-white/50 bg-white h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-brand-accent" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-black font-heading">Support Services</h3>
                </div>
                
                <div className="space-y-6">
                  <motion.div 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                      <Clock className="w-4 h-4 text-brand-blue" />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-brand-black font-heading mb-1">24/7 Support Helpline</div>
                      <div className="text-text.medium font-body">Emergency assistance whenever you need it with dedicated regional support staff.</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-accent/10 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                      <Users className="w-4 h-4 text-brand-accent" />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-brand-black font-heading mb-1">Regular Supervision</div>
                      <div className="text-text.medium font-body">Ongoing guidance from experienced professionals who understand your local area.</div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-brand-blue/10 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                      <Award className="w-4 h-4 text-brand-blue" />
                    </div>
                    <div>
                      <div className="font-bold text-lg text-brand-black font-heading mb-1">Continuous Training</div>
                      <div className="text-text.medium font-body">Access to specialized workshops and development programs tailored to regional needs.</div>
                    </div>
                  </motion.div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}