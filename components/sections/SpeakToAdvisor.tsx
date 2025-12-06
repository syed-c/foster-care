'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MessageCircle, Clock } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';

export const SpeakToAdvisor = () => {
  const contactOptions = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Immediate Support",
      description: "Call our helpline anytime",
      detail: "0800 123 4567"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email Inquiry",
      description: "Send us a message",
      detail: "support@fostercare.co.uk"
    },
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Live Chat",
      description: "Chat with an advisor",
      detail: "Available Mon-Sun 8am-8pm"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-r from-brand-blue/5 to-brand-cream">
      <div className="site-container">
        <div className="max-w-5xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-4 font-heading">
              Speak to an <span className="text-brand-blue">Advisor</span>
            </h2>
            
            <p className="text-lg sm:text-xl text-text.medium max-w-2xl mx-auto font-body">
              Our compassionate team is here to answer your questions and guide you through the process
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card rounded-3xl p-6 border border-brand-cream shadow-xl text-center hover:-translate-y-1 hover:shadow-2xl transition"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-cream flex items-center justify-center text-brand-black mx-auto mb-4">
                  {option.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-black mb-2 font-heading">{option.title}</h3>
                <p className="text-text.medium font-body text-base mb-3">{option.description}</p>
                <p className="font-bold text-brand-blue font-body">{option.detail}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            className="glass-card rounded-3xl p-8 border border-brand-cream shadow-xl text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-blue to-brand-cream flex items-center justify-center text-brand-black">
                  <Clock className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="font-bold text-brand-black font-heading text-lg">Immediate Assistance</h3>
                  <p className="text-text.medium font-body">Mon-Sun: 8am - 8pm</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <GradientButton size="lg" className="rounded-xl px-8 py-4 font-medium text-base">
                  Call Now: 0800 123 4567
                </GradientButton>
                <GradientButton 
                  variant="outline" 
                  size="lg" 
                  className="rounded-xl px-8 py-4 font-medium text-base border-2 border-brand-blue text-brand-blue hover:bg-brand-blue/10"
                >
                  Send Email
                </GradientButton>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};