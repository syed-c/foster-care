'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, Users, Heart, Star, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DynamicLocationSections({ country, region, city, agencies, regions, cities }) {
  const [allRegions, setAllRegions] = useState([]);
  const [topAgencies, setTopAgencies] = useState([]);
  
  // Load all regions when component mounts
  useEffect(() => {
    const loadAllRegions = async () => {
      try {
        const response = await fetch('/api/locations/structure');
        if (response.ok) {
          const structure = await response.json();
          if (structure[country] && structure[country].regions) {
            const regionList = Object.entries(structure[country].regions).map(([slug, region]) => ({
              slug,
              name: region.name
            }));
            setAllRegions(regionList);
          }
        }
      } catch (error) {
        console.error('Error loading regions:', error);
      }
    };
    
    if (country && (!regions || regions.length === 0)) {
      loadAllRegions();
    } else if (regions && regions.length > 0) {
      setAllRegions(regions);
    }
  }, [country, regions]);
  
  // Load top agencies based on location depth
  useEffect(() => {
    const loadTopAgencies = async () => {
      try {
        let url = '/api/agencies?limit=12';
        
        // Determine which level to fetch agencies for
        if (city) {
          // For city level, fetch agencies by city if supported, otherwise by region
          url += `&region=${region}`;
        } else if (region) {
          url += `&region=${region}`;
        } else if (country) {
          // For country level, we'll fetch all agencies (no filter)
          // The API already handles this case
        }
        
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setTopAgencies(data.agencies || []);
        }
      } catch (error) {
        console.error('Error loading agencies:', error);
      }
    };
    
    if ((!agencies || agencies.length === 0)) {
      loadTopAgencies();
    } else {
      setTopAgencies(agencies);
    }
  }, [country, region, city, agencies]);
  
  return (
    <>
      {/* All Regions Grid Section */}
      <section className="py-16 md:py-24 relative overflow-hidden section-highlight">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl float-animation" />
          <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-secondary-blue/5 rounded-full blur-3xl float-animation" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <MapPin className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">All Regions</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
              All Regions in {country ? country.charAt(0).toUpperCase() + country.slice(1).replace(/-/g, ' ') : 'the UK'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter">
              Explore all regions and discover fostering opportunities across the country
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {allRegions.map((regionItem) => (
              <Link key={regionItem.slug} href={`/foster-agency/${country}/${regionItem.slug}`}>
                <Card className="section-card rounded-modern-xl hover-lift transition-all cursor-pointer group">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <MapPin className="w-7 h-7 text-primary-green" />
                    </div>
                    <CardTitle className="text-lg font-poppins group-hover:text-primary-green transition-colors">
                      {regionItem.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="font-inter mb-4">
                      View cities in this region
                    </CardDescription>
                    <div className="flex items-center text-primary-green font-medium group-hover:translate-x-1 transition-transform">
                      Explore cities <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Agencies Grid Section */}
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
              {city ? `Top Agencies in ${city.charAt(0).toUpperCase() + city.slice(1).replace(/-/g, ' ')}` : region ? `Top Agencies in ${region.charAt(0).toUpperCase() + region.slice(1).replace(/-/g, ' ')}` : `Top Agencies in ${country.charAt(0).toUpperCase() + country.slice(1).replace(/-/g, ' ')}`}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter">
              Connect with trusted fostering services in your area
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {topAgencies.slice(0, 12).map((agency) => (
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
                    <Link href={`/agencies/${agency.slug}`}>
                      View Agency Profile <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}