'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQMicroBlock = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  
  const faqs: FAQItem[] = [
    {
      question: "How long does the fostering approval process take?",
      answer: "The approval process typically takes 4-6 months, though this can vary depending on your circumstances and the agency you choose. We help streamline this process by connecting you with agencies that match your situation."
    },
    {
      question: "Do I need previous childcare experience to become a foster parent?",
      answer: "No previous experience is required. Our partner agencies provide comprehensive training to prepare you for fostering. What matters most is your commitment, patience, and genuine desire to make a positive difference in a child's life."
    },
    {
      question: "Can I work full-time and be a foster parent?",
      answer: "Yes, many foster parents work full-time. However, you'll need to consider the needs of the children in your care, particularly for younger children who may need more flexible arrangements. Some agencies offer support with childcare costs."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Generate FAQ schema markup for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer
      }
    }))
  };

  return (
    <section className="py-12 bg-white">
      {/* FAQ Schema Markup */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} 
      />
      
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-text-charcoal mb-6 font-heading text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center p-5 text-left bg-offwhite-50 hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                >
                  <h3 className="font-semibold text-text-charcoal font-heading">{faq.question}</h3>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                
                {openIndex === index && (
                  <div className="p-5 bg-white border-t border-gray-100">
                    <p className="text-gray-700 font-body">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <a 
              href="/faq" 
              className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-body"
            >
              View all frequently asked questions
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};