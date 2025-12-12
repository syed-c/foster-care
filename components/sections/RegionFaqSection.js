'use client';

// RegionFaqSection.js
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';

export default function RegionFaqSection({ data, regionSlug }) {
  const [openIndex, setState] = useState(null);

  const toggleFAQ = (index) => {
    setState(openIndex === index ? null : index);
  };

  // Default values if no data provided
  const title = data?.title || `Frequently Asked Questions About Fostering`;
  const description = data?.description || `Everything you need to know about becoming a foster carer in this region`;
  const faqs = data?.faqs || [
    { question: "How long does the approval process take?", answer: "The process typically takes 4-6 months, including application, training, assessments, and panel review." },
    { question: "Do I need previous childcare experience?", answer: "No formal experience is required, but you must be committed to providing a safe, nurturing environment for children." }
  ];

  return (
    <section className="py-16 md:py-24 bg-brand-light">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
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
              <HelpCircle className="w-5 h-5 text-brand-blue" />
              <span className="text-sm font-medium text-brand-black font-heading">Regional Guidance</span>
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
          
          {/* Enhanced FAQ accordion */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card 
                  className="rounded-2xl overflow-hidden border border-brand-white/50 bg-white shadow-lg"
                >
                  <button
                    className="w-full text-left p-6 flex justify-between items-center hover:bg-brand-blue/5 transition-colors duration-200"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h3 className="text-lg font-bold text-brand-black font-heading pr-4">{faq.question}</h3>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-5 h-5 text-brand-blue flex-shrink-0" />
                    </motion.div>
                  </button>
                  
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-text.medium font-body border-t border-brand-white/50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}