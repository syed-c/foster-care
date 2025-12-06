'use client';

import { motion } from 'framer-motion';
import { Shield, Award, Users, FileText } from 'lucide-react';

export const TrustBadges = () => {
  const badges = [
    {
      id: 1,
      title: "OFSTED Rated Good/Outstanding",
      description: "All featured agencies meet high regulatory standards",
      icon: <Shield className="w-8 h-8" />
    },
    {
      id: 2,
      title: "HCPC Registered",
      description: "Professionals adhere to strict ethical guidelines",
      icon: <Award className="w-8 h-8" />
    },
    {
      id: 3,
      title: "Community Trusted",
      description: "Over 10,000 families have found their match",
      icon: <Users className="w-8 h-8" />
    },
    {
      id: 4,
      title: "Transparent Process",
      description: "Clear steps, no hidden fees, full support",
      icon: <FileText className="w-8 h-8" />
    }
  ];

  return (
    <section className="py-8 sm:py-12 bg-brand-white">
      <div className="site-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.id}
              className="flex flex-col items-center text-center p-4 rounded-2xl bg-brand-white border border-brand-blue hover:bg-brand-blue/5 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-12 h-12 rounded-xl bg-brand-blue text-white flex items-center justify-center mb-3">
                {badge.icon}
              </div>
              <h3 className="font-bold text-brand-black text-base mb-1 font-heading">{badge.title}</h3>
              <p className="text-text.medium text-xs font-body">{badge.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};