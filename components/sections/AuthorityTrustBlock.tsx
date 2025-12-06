'use client';

import { motion } from 'framer-motion';
import { Shield, Award, Users, FileText } from 'lucide-react';

export const AuthorityTrustBlock = () => {
  const trustElements = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Regulated & Approved",
      description: "All agencies meet OFSTED standards and government regulations"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Assured",
      description: "Regular inspections ensure highest care standards"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Trusted",
      description: "Over 10,000 families have found their match through us"
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Transparent Process",
      description: "Clear steps, no hidden fees, full support throughout"
    }
  ];

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
      
      <div className="site-container">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 font-heading">
              Why Families Trust Our <span className="text-brand-white">Platform</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mx-auto font-body mb-12">
              We maintain the highest standards of care, transparency, and support throughout your fostering journey
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustElements.map((element, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="w-16 h-16 rounded-xl bg-white text-brand-blue flex items-center justify-center mx-auto mb-6">
                  {element.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 font-heading">{element.title}</h3>
                <p className="text-white/90 font-body text-base">{element.description}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            className="mt-16 p-8 rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-2xl font-bold mb-3 font-heading">Official Recognition</h3>
                <p className="text-white/90 font-body text-lg mb-4">
                  Proud member of the Fostering Network and endorsed by leading child welfare organizations
                </p>
                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-body">OFSTED Approved</span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-body">HCPC Registered</span>
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-body">Children's Commissioner Endorsed</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-full bg-white text-brand-blue flex items-center justify-center font-bold text-2xl">
                  98%
                </div>
                <p className="mt-3 text-center text-white/90 font-body text-sm">
                  Success Rate
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};