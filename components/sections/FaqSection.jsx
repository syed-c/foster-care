import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Users } from 'lucide-react';

export default function FaqSection({ title, description, items }) {
  return (
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
            {Array.isArray(items) && items.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="section-card rounded-modern-lg border border-gray-200">
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
  );
}