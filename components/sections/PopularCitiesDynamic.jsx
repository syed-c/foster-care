'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function PopularCitiesDynamic({ title, description, regionSlug }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`/api/cities?region=${regionSlug}`);
        if (response.ok) {
          const data = await response.json();
          setCities(data);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setLoading(false);
      }
    };

    if (regionSlug) {
      fetchCities();
    } else {
      setLoading(false);
    }
  }, [regionSlug]);

  if (loading) {
    return (
      <section className="py-16 md:py-24 relative overflow-hidden section-contrast">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <MapPin className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">Popular Cities</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
              {title || 'Popular Cities'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter">
              {description || 'Loading cities...'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3].map((index) => (
              <Card key={index} className="section-card rounded-modern-xl p-6 hover-lift transition-all">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
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
            <span className="text-sm font-medium text-text-charcoal font-inter">Popular Cities</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
            {title || 'Popular Cities'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-inter">
            {description || 'Explore opportunities in cities across this region'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Array.isArray(cities) && cities.map((city) => (
            <Card key={city.id || city.slug} className="section-card rounded-modern-xl p-6 hover-lift transition-all">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-text-charcoal font-poppins">{city.name}</h3>
                {city.population && (
                  <span className="bg-primary-green/10 text-primary-green text-xs px-2 py-1 rounded-full">
                    {city.population}
                  </span>
                )}
              </div>
              {city.description && (
                <p className="text-gray-600 text-sm mb-4 font-inter">
                  {city.description}
                </p>
              )}
              <Link 
                href={city.link || `/foster-agency/${city.country_slug}/${city.region_slug}/${city.slug}`}
                className="text-primary-green font-medium hover:underline flex items-center"
              >
                Explore Opportunities <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}