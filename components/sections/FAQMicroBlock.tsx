'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export const FAQMicroBlock = () => {
  const faqs = [
    {
      question: "How long does the fostering process take?",
      answer: "The process typically takes 4-6 months from initial enquiry to approval.",
      href: "/faq#process-timeline"
    },
    {
      question: "What are the age requirements to become a foster parent?",
      answer: "You must be at least 21 years old with no upper age limit.",
      href: "/faq#age-requirements"
    },
    {
      question: "Can I work and be a foster parent?",
      answer: "Yes, many foster parents work full or part-time with flexible arrangements.",
      href: "/faq#working-parents"
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-r from-brand-blue/5 to-brand-cream">
      <div className="site-container">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-black mb-4 font-heading">
              Frequently Asked <span className="text-brand-blue">Questions</span>
            </h2>
            <p className="text-lg sm:text-xl text-text.medium max-w-2xl mx-auto font-body">
              Everything you need to know about becoming a foster parent
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {faqs.map((faq, index) => (
              <Link 
                key={index}
                href={faq.href}
                className="glass-card rounded-3xl p-6 border border-brand-cream shadow-xl hover:-translate-y-1 hover:shadow-2xl transition group"
              >
                <h3 className="font-bold text-brand-black font-heading text-lg mb-3 group-hover:text-brand-blue transition-colors">
                  {faq.question}
                </h3>
                <p className="text-text.medium font-body text-base mb-4">
                  {faq.answer}
                </p>
                <div className="flex items-center gap-2 text-brand-blue font-body text-sm font-medium">
                  <span>Learn more</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              href="/faq" 
              className="inline-flex items-center gap-2 text-brand-blue hover:text-brand-blue/80 font-body text-base"
            >
              View all frequently asked questions
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};