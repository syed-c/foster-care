import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection({ heading, subheading, cta_primary, cta_secondary }) {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden section-hero">
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary-green/15 rounded-full blur-3xl float-animation" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary-blue/15 rounded-full blur-3xl float-animation" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <MapPin className="w-4 h-4 text-primary-green" />
            <span className="text-sm font-medium text-text-charcoal font-inter">Location</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-charcoal mb-6 font-poppins">
            {heading}
          </h1>
          <p className="text-xl text-gray-600 mb-8 font-inter">
            {subheading}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {cta_primary && (
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 px-8 py-6 text-lg font-semibold rounded-xl btn-futuristic"
                asChild
              >
                <Link href={cta_primary.link}>{cta_primary.text}</Link>
              </Button>
            )}
            {cta_secondary && (
              <Button
                size="lg"
                variant="outline"
                className="glass font-inter px-8 py-6 text-lg"
                asChild
              >
                <Link href={cta_secondary.link}>{cta_secondary.text}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}