'use client';

// RegionFinalCtaSection.js
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function RegionFinalCtaSection({ data, regionSlug }) {
  // Default values if no data provided
  const title = data?.title || "Ready to Start Your Fostering Journey?";
  const subtitle = data?.subtitle || "Take the first step towards making a difference in a child's life";
  const primaryCta = data?.primaryCta || { label: "Talk to a Foster Advisor", href: "/contact" };
  const secondaryCta = data?.secondaryCta || { label: "Download Information Pack", href: "#" };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-primary-green to-secondary-blue text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/10 to-transparent" />
        <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/10 to-transparent" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 font-poppins">
            {title}
          </h2>
          <p className="text-xl mb-8 font-inter text-white/90">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="bg-white text-text-charcoal hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-xl font-inter"
              asChild
            >
              <Link href={primaryCta.href}>
                {primaryCta.label}
              </Link>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="glass text-white border-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-xl font-inter"
              asChild
            >
              <Link href={secondaryCta.href}>
                {secondaryCta.label}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}