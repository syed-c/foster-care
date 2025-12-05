'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FinalCtaSection({ title, subtitle, cta_text, cta_link }) {
  // Provide default values to prevent destructuring errors
  const safeTitle = title || 'Ready to Start Your Fostering Journey?';
  const safeSubtitle = subtitle || 'Take the first step towards making a difference in a child\'s life';
  const safeCtaText = cta_text || 'Talk to a Foster Advisor';
  const safeCtaLink = cta_link || '/contact';
  
  return (
    <section className="py-16 md:py-24 relative overflow-hidden section-contrast">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl float-animation" />
        <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-secondary-blue/5 rounded-full blur-3xl float-animation" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
            {safeTitle}
          </h2>
          <p className="text-xl text-gray-600 mb-8 font-inter">
            {safeSubtitle}
          </p>
          <Button
            size="lg"
            className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 px-8 py-6 text-lg font-semibold rounded-xl btn-futuristic"
            asChild
          >
            <Link href={safeCtaLink}>
              {safeCtaText}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}