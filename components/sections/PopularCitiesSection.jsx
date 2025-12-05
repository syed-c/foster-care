'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function PopularCitiesSection({ items, title }) {
  // Provide default values to prevent destructuring errors
  const safeTitle = title || 'Popular Areas';
  const safeItems = Array.isArray(items) ? items : [];
  
  if (safeItems.length === 0) {
    return null; // Don't render if there's no content
  }
  
  return (
    <section className="py-16 md:py-24 relative overflow-hidden section-contrast">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl float-animation" />
        <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-secondary-blue/5 rounded-full blur-3xl float-animation" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <MapPin className="w-4 h-4 text-primary-green" />
            <span className="text-sm font-medium text-text-charcoal font-inter">Popular Areas</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
            {safeTitle}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {safeItems.map((item, index) => (
            <Card key={index} className="section-card rounded-modern-xl p-6 hover-lift transition-all">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-text-charcoal font-poppins">{item?.name || 'Area'}</h3>
                <span className="bg-primary-green/10 text-primary-green text-xs px-2 py-1 rounded-full">
                  {item?.population || 'Population'}
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4 font-inter">
                {item?.reason || 'Reason to visit'}
              </p>
              <Button 
                variant="ghost" 
                className="w-full group-hover:bg-primary-green/10 group-hover:text-primary-green font-inter p-0 h-auto"
                asChild
              >
                <Link href={item?.link || "#"}>
                  Explore Opportunities <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}