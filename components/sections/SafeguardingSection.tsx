'use client';

import { motion } from 'framer-motion';
import { Shield, AlertTriangle, BookOpen } from 'lucide-react';

export const SafeguardingSection = () => {
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
            <Shield className="w-5 h-5" />
            <span className="text-base font-medium font-body">Safeguarding & Responsibility</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-6 font-heading">
            Safeguarding & <span className="text-brand-blue">Responsibility</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-text.medium max-w-3xl mx-auto font-body">
            We are an independent information platform. We do not recruit foster carers, approve applications, 
            or place children. All agencies listed must follow UK fostering regulations and maintain current 
            Ofsted, CIW, or Care Inspectorate standards.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="glass-card rounded-3xl p-6 shadow-lg border border-brand-white text-center hover:-translate-y-1 transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-brand-black mb-3 font-heading">Our Role</h3>
            <p className="text-text.medium font-body text-base">
              Our role is to provide clarity, support, and a safe starting point for families exploring fostering.
            </p>
          </motion.div>
          
          <motion.div
            className="glass-card rounded-3xl p-6 shadow-lg border border-brand-white text-center hover:-translate-y-1 transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-16 h-16 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-brand-black mb-3 font-heading">Agency Standards</h3>
            <p className="text-text.medium font-body text-base">
              All listed agencies must maintain current regulatory compliance and undergo regular quality assessments.
            </p>
          </motion.div>
          
          <motion.div
            className="glass-card rounded-3xl p-6 shadow-lg border border-brand-white text-center hover:-translate-y-1 transition"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-16 h-16 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-brand-black mb-3 font-heading">Your Responsibility</h3>
            <p className="text-text.medium font-body text-base">
              Please verify all information directly with agencies and consult official regulatory bodies when needed.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};