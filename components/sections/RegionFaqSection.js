'use client';

// RegionFaqSection.js
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Users } from 'lucide-react';
import Head from 'next/head';

export default function RegionFaqSection({ data, regionSlug }) {
  // Default values if no data provided
  const title = data?.title || `Frequently Asked Questions`;
  const description = data?.description || `Get answers to common questions about becoming a foster carer`;
  const enableFaqSchema = data?.enableFaqSchema || true;
  const faqs = data?.faqs || [
    {
      question: "How many foster families are needed in this region?",
      answer: "This region has a continuous need for foster families to provide care for children and young people. The exact number varies based on local demand, but there is always a need for dedicated carers who can provide stable, loving homes."
    },
    {
      question: "Who can foster a child in this region?",
      answer: "To foster in this region, you must be over 21, have a spare room, pass background checks, and complete training. You can be single, married, in a relationship, working, or retired. The relevant regulatory body sets the standards for approval."
    },
    {
      question: "Can single people foster in this region?",
      answer: "Yes, single people can foster in this region. What matters most is your ability to provide a stable, loving home for a child in need. All applicants go through the same assessment and approval process regardless of marital status."
    },
    {
      question: "What support is available for foster carers in this region?",
      answer: "Foster carers in this region receive ongoing support including 24/7 helplines, regular supervision, training opportunities, and access to support groups. Agencies also provide financial allowances and respite care."
    }
  ];

  // Generate FAQ schema markup if enabled
  const faqSchema = enableFaqSchema ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  return (
    <>
      {faqSchema && (
        <Head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqSchema)
            }}
          />
        </Head>
      )}
      <section className="py-16 md:py-24 section-alt">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <Users className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-medium text-text-charcoal font-inter">FAQs</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                {title}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-inter">
                {description}
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="section-card rounded-modern-lg border border-gray-200"
                >
                  <AccordionTrigger className="px-6 py-4 text-left font-poppins text-lg font-medium text-text-charcoal hover:bg-gray-50 rounded-t-modern-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-600 font-inter bg-white rounded-b-modern-lg">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </>
  );
}