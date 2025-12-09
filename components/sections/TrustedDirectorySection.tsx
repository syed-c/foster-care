'use client';

import { motion } from 'framer-motion';
import { Heart, CheckCircle, Users, Shield } from 'lucide-react';

export const TrustedDirectorySection = () => {
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
            <Heart className="w-5 h-5" />
            <span className="text-base font-medium font-body">Trusted Directory</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-6 font-heading">
            Your Trusted Foster Care <span className="text-brand-blue">Directory</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-text.medium max-w-3xl mx-auto font-body">
            Our foster care directory brings together reliable information about independent fostering agencies, 
            local authority teams, and the support they offer. Every profile is written to help you understand 
            the agency's values, available support, and the kind of placements they specialise in.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <CheckCircle className="w-8 h-8" />,
              title: "Verified Information",
              description: "All agency information is regularly reviewed and updated to ensure accuracy"
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: "Community Driven",
              description: "Built by foster carers, for foster carers, with real experiences"
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Safe & Secure",
              description: "We prioritize your privacy and security throughout your journey"
            },
            {
              icon: <Heart className="w-8 h-8" />,
              title: "Compassionate Support",
              description: "Guidance and resources tailored to your fostering goals"
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              className="glass-card rounded-3xl p-6 shadow-lg border border-brand-white text-center hover:-translate-y-1 transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-16 h-16 rounded-xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mx-auto mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-brand-black mb-3 font-heading">{item.title}</h3>
              <p className="text-text.medium font-body text-base">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};