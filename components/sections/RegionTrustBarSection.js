'use client';

// RegionTrustBarSection.js
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Lock } from 'lucide-react';
import Link from 'next/link';

export default function RegionTrustBarSection({ data, regionSlug }) {
  // Default values if no data provided
  const title = data?.title || `Your Safety and Security Matters`;
  const authorityName = data?.authorityName || "Ofsted";
  const authorityUrl = data?.authorityUrl || "https://www.ofsted.gov.uk";
  const ofstedNote = data?.ofstedNote || "All agencies meet Ofsted's strict regulatory standards for child protection and care quality";
  const safeguardingNote = data?.safeguardingNote || "Robust safeguarding procedures protect both children and foster carers throughout the process";

  return (
    <section className="py-12 bg-brand-blue text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced header */}
          <motion.div 
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-4 font-heading text-white"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {title}
            </motion.h2>
            
            <motion.p 
              className="text-white/90 max-w-3xl mx-auto font-body text-lg"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              We prioritize the safety and wellbeing of every child and foster carer in our community
            </motion.p>
          </motion.div>
          
          {/* Enhanced trust indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              className="bg-white/10 rounded-2xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white text-brand-blue flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-white">Regulatory Compliance</h3>
              </div>
              <p className="text-white/90 font-body">
                <Link href={authorityUrl} className="underline hover:text-white">
                  {authorityName}
                </Link> {ofstedNote}
              </p>
            </motion.div>
            
            <motion.div
              className="bg-white/10 rounded-2xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white text-brand-blue flex items-center justify-center">
                  <Lock className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-white">Safeguarding</h3>
              </div>
              <p className="text-white/90 font-body">
                {safeguardingNote}
              </p>
            </motion.div>
            
            <motion.div
              className="bg-white/10 rounded-2xl p-6 border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white text-brand-blue flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold font-heading text-white">Quality Assurance</h3>
              </div>
              <p className="text-white/90 font-body">
                Continuous monitoring and improvement of fostering services to ensure the highest standards of care.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}