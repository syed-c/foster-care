'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function CitiesGridSection({ country, region, cities = [] }) {
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
            <span className="text-sm font-medium text-text-charcoal font-inter">Cities</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
            Cities in this Region
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-inter">
            View foster agencies in cities across this region
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {cities.map((city) => (
            <Link 
              key={city.id || city.slug} 
              href={`/foster-agency/${country}/${region}/${city.slug || city.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Card className="section-card rounded-modern-xl hover-lift transition-all cursor-pointer group">
                <CardHeader>
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <MapPin className="w-7 h-7 text-primary-green" />
                  </div>
                  <CardTitle className="text-lg font-poppins group-hover:text-primary-green transition-colors">
                    {city.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="font-inter mb-4">
                    View foster agencies in this city
                  </CardDescription>
                  <div className="flex items-center text-primary-green font-medium group-hover:translate-x-1 transition-transform">
                    Explore agencies <ArrowRight className="ml-2 w-4 h-4" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}