'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function TopAgenciesDynamic({ title, description, regionSlug }) {
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgencies = async () => {
      try {
        const response = await fetch(`/api/agencies?region=${regionSlug}&featured=true`);
        if (response.ok) {
          const data = await response.json();
          setAgencies(data);
        }
      } catch (error) {
        console.error('Error fetching agencies:', error);
      } finally {
        setLoading(false);
      }
    };

    if (regionSlug) {
      fetchAgencies();
    } else {
      setLoading(false);
    }
  }, [regionSlug]);

  if (loading) {
    return (
      <section className="py-16 md:py-24 relative overflow-hidden section-highlight">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="h-6 bg-gray-200 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[1, 2, 3].map((index) => (
              <Card key={index} className="section-card rounded-modern-xl p-6 hover-lift transition-all h-full flex flex-col">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-2/3 mb-6"></div>
                  <div className="h-10 bg-gray-200 rounded w-full mb-2"></div>
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
    <section className="py-16 md:py-24 relative overflow-hidden section-highlight">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary-green/5 rounded-full blur-3xl float-animation" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary-blue/5 rounded-full blur-3xl float-animation" style={{ animationDelay: "2.5s" }} />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Star className="w-4 h-4 text-primary-green" />
            <span className="text-sm font-medium text-text-charcoal font-inter">Featured Agencies</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
            {title || 'Top Foster Agencies'}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-inter">
            {description || 'Discover the leading foster agencies with excellent ratings and comprehensive support'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {Array.isArray(agencies) && agencies.map((agency) => (
            <Card key={agency.id} className="section-card rounded-modern-xl p-6 hover-lift transition-all h-full flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-text-charcoal font-poppins">{agency.name}</h3>
                {agency.featured && (
                  <Badge variant="secondary" className="bg-primary-green/10 text-primary-green border-0">
                    Featured
                  </Badge>
                )}
              </div>
              
              <p className="text-gray-600 mb-4 flex-grow font-inter">
                {agency.description || agency.summary}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium">{agency.rating || "N/A"}</span>
                  <span className="mx-1 text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{agency.review_count || agency.reviewCount || 0} reviews</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {agency.type || "Agency"}
                </Badge>
              </div>
              
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-grow font-inter" asChild>
                  <Link href={agency.website || agency.link || "#"}>
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Visit Website
                  </Link>
                </Button>
                <Button size="sm" className="font-inter" asChild>
                  <Link href="/contact">
                    Contact
                  </Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}