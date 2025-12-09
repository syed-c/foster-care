'use client';

import { motion } from 'framer-motion';
import { Heart, BookOpen, Users, Shield } from 'lucide-react';

export const SupportSection = () => {
  return (
    <section className="py-16 sm:py-24 bg-brand-cream">
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
            <span className="text-base font-medium font-body">Comprehensive Support</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-6 font-heading">
            Support You Can <span className="text-brand-blue">Rely On</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-text.medium max-w-3xl mx-auto font-body">
            Fostering can feel overwhelming at first, especially if you're unsure what the process looks like. 
            Our guides explain how to become a foster carer, what the approval steps involve, and the support 
            you can expect once you're approved.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <BookOpen className="w-8 h-8" />,
              title: "Educational Resources",
              description: "Comprehensive guides covering every step of the fostering journey"
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: "Ofsted Approved",
              description: "We highlight agencies that meet the highest regulatory standards"
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Ongoing Assistance",
              description: "Continuous support throughout your fostering career"
            },
            {
              icon: <Heart className="w-8 h-8" />,
              title: "Personal Guidance",
              description: "One-on-one consultations with fostering specialists"
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