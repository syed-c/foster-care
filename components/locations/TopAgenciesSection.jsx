'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Heart, Star, ExternalLink, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function TopAgenciesSection({ locationType, locationName, agencies = [] }) {
  // Format the location name for display
  const formattedLocationName = locationName 
    ? locationName.charAt(0).toUpperCase() + locationName.slice(1).replace(/-/g, ' ')
    : 'the UK';

  return (
    <section className="py-16 md:py-24 relative overflow-hidden section-muted">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl float-animation" />
        <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-secondary-blue/5 rounded-full blur-3xl float-animation" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Heart className="w-4 h-4 text-primary-green" />
            <span className="text-sm font-medium text-text-charcoal font-inter">Top Agencies</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
            Top Agencies in {formattedLocationName}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-inter">
            Connect with trusted fostering services in your area
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {agencies.slice(0, 12).map((agency) => (
            <Card key={agency.id} className="section-card rounded-modern-xl hover-lift transition-all">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 rounded-lg glass-icon flex items-center justify-center">
                    <Heart className="w-8 h-8 text-primary-green" />
                  </div>
                  {agency.featured && (
                    <span className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal text-xs px-2 py-1 rounded-full font-inter">
                      Featured
                    </span>
                  )}
                </div>
                <CardTitle className="text-xl font-poppins">
                  {agency.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-1 mt-2 font-inter">
                  <MapPin className="w-4 h-4" />
                  {agency.city || agency.region || agency.country || 'UK'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4 font-inter">
                  {agency.description || agency.summary || 'Dedicated to providing exceptional foster care services.'}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(agency.rating || 0)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-600 ml-2 font-inter">
                      {agency.rating || "N/A"} ({agency.review_count || agency.reviewCount || 0} reviews)
                    </span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-100 font-inter">
                    {agency.type || "Agency"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {agency.phone && (
                    <a 
                      href={`tel:${agency.phone}`} 
                      className="text-primary-green text-sm font-medium hover:underline flex items-center"
                    >
                      <span className="mr-1">📞</span> Call
                    </a>
                  )}
                  {agency.email && (
                    <a 
                      href={`mailto:${agency.email}`} 
                      className="text-primary-green text-sm font-medium hover:underline flex items-center"
                    >
                      <span className="mr-1">✉️</span> Email
                    </a>
                  )}
                  {agency.website && (
                    <a 
                      href={agency.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-green text-sm font-medium hover:underline flex items-center"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" /> Website
                    </a>
                  )}
                </div>
                <Button
                  variant="ghost"
                  className="w-full group-hover:bg-primary-green/10 group-hover:text-primary-green font-inter"
                  asChild
                >
                  <Link href={`/agency/${agency.id}`}>
                    View Agency Profile <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}