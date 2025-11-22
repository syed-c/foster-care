'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Search } from 'lucide-react';
import Link from 'next/link';

export default function AgencyFinder({ title, intro, ctaText }) {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden section-highlight">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl float-animation" />
        <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-secondary-blue/5 rounded-full blur-3xl float-animation" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <MapPin className="w-4 h-4 text-primary-green" />
            <span className="text-sm font-medium text-text-charcoal font-inter">Agency Finder</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
            {title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-inter">
            {intro}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search for agencies in this region..."
              className="w-full pl-12 pr-4 py-4 rounded-xl glass text-text-charcoal placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-green"
            />
          </div>
        </div>

        <div className="text-center mt-8">
          <Button size="lg" className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 px-8 py-6 text-lg font-semibold rounded-xl btn-futuristic" asChild>
            <Link href="#">
              {ctaText}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}