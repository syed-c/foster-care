'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function FAQAccordion({ faqs = [], title = 'Frequently Asked Questions' }) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <section className="my-12">
      <h2 className="text-3xl font-bold text-[#2C2C2C] mb-8 font-poppins">{title}</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left font-semibold text-[#2C2C2C] font-poppins">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-[#2C2C2C] font-inter">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}