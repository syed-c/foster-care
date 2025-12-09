'use client';

import { motion } from 'framer-motion';
import { ChevronDown, CheckCircle } from 'lucide-react';

export const HomePageFaqSection = () => {
  const faqs = [
    {
      question: "How do I choose the right fostering agency?",
      answer: "Look at their support, training, Ofsted rating, and the types of placements they offer. Choose the one that feels supportive and aligned with your values."
    },
    {
      question: "Do you list independent fostering agencies and local authorities?",
      answer: "Yes, our directory includes both, so you can compare the best options for your region."
    },
    {
      question: "Is the information on this site trusted and up-to-date?",
      answer: "We regularly review agency information and highlight official ratings from UK regulators."
    }
  ];

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
            <CheckCircle className="w-5 h-5" />
            <span className="text-base font-medium font-body">Helpful FAQ</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-6 font-heading">
            Helpful <span className="text-brand-blue">FAQ</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-text.medium max-w-3xl mx-auto font-body">
            Short & SEO-friendly
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="glass-card rounded-3xl p-6 shadow-lg border border-brand-white hover:-translate-y-1 transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold text-brand-black font-heading">{faq.question}</h3>
                <ChevronDown className="w-6 h-6 text-brand-blue flex-shrink-0 ml-4" />
              </div>
              <p className="text-text.medium font-body text-base mt-4">{faq.answer}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};