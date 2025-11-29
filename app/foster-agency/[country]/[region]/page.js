import { formatSlugToTitle, loadCitiesForRegion } from '@/lib/locationData';
import { getLocationContentByCanonicalSlug, extractSectionsFromContent } from '@/services/locationService';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, ChevronRight, Heart, Users, BookOpen, Award, Shield, Search, Star, ExternalLink } from 'lucide-react';
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import SectionRenderer from '@/components/sections/SectionRenderer';

// Make sure pages run on dynamic rendering mode
export const dynamic = "force-dynamic";
export const revalidate = 0; // No caching for better debugging

export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const { country, region } = resolvedParams;
    const regionName = formatSlugToTitle(region);
    const canonicalSlug = `/foster-agency/${country}/${region}`;
    
    // Try to get content from the new location content system using canonical slug
    const rawContent = await getLocationContentByCanonicalSlug(canonicalSlug) || {};

    return {
      title: rawContent?.meta_title || rawContent?.title || `Foster Agencies in ${regionName} | UK Directory`,
      description: rawContent?.meta_description || `Find foster agencies in ${regionName}. Browse cities and discover fostering services near you.`,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    const resolvedParams = await params;
    const { country, region } = resolvedParams;
    const regionName = formatSlugToTitle(region);
    return {
      title: `Foster Agencies in ${regionName} | UK Directory`,
      description: `Find foster agencies in ${regionName}. Browse cities and discover fostering services near you.`,
    };
  }
}

export default async function RegionPage({ params, searchParams }) {
  console.log('REGION PAGE LOADED WITH PARAMS:', params);
  
  try {
    const resolvedParams = await params;
    const { country, region } = resolvedParams;
    console.log('Country:', country, 'Region:', region);
    
    // Validate parameters
    if (!country || !region) {
      console.error('Missing country or region parameter');
      notFound();
    }
    
    const countryName = formatSlugToTitle(country);
    const regionName = formatSlugToTitle(region);
    const canonicalSlug = `/foster-agency/${country}/${region}`;
    console.log('Canonical slug:', canonicalSlug);
    
    // Try to get content from the new location content system using canonical slug
    let rawContent = {};
    try {
      rawContent = await getLocationContentByCanonicalSlug(canonicalSlug) || {};
      console.log('Raw content loaded:', Object.keys(rawContent).length > 0 ? 'HAS CONTENT' : 'NO CONTENT');
    } catch (contentError) {
      console.error('Error loading content:', contentError);
      rawContent = {};
    }
    
    // Get cities for this region
    let cities = [];
    try {
      cities = await loadCitiesForRegion(country, region);
      console.log('Cities found:', cities.length);
    } catch (citiesError) {
      console.error('Error loading cities:', citiesError);
      // Use mock data if Supabase is not configured
      cities = [
        { id: '1', name: 'City 1', slug: 'city-1' },
        { id: '2', name: 'City 2', slug: 'city-2' },
        { id: '3', name: 'City 3', slug: 'city-3' }
      ];
    }
    
    // Pagination logic for cities
    const citiesPerPage = 6;
    
    // Handle pagination for cities
    const resolvedSearchParams = await searchParams;
    const page = parseInt(resolvedSearchParams?.page) || 1;
    const totalCities = cities.length;
    const startIndex = (page - 1) * citiesPerPage;
    const endIndex = startIndex + citiesPerPage;
    const paginatedCities = cities.slice(startIndex, endIndex);
    const totalPages = Math.ceil(cities.length / citiesPerPage);
    
    // Extract sections from content using the utility function
    const sections = extractSectionsFromContent(rawContent);
    console.log('Extracted sections:', sections.length);
    
    const sectionMap = {};
    for (const section of sections) {
      if (!section?.type) continue;
      if (!sectionMap[section.type]) {
        sectionMap[section.type] = section; // first one wins
      }
    }
    
    // Filter out empty sections
    const filteredSections = sections.filter(s => s && s.data && Object.keys(s.data).length > 0);
    
    // Get agencies for this region
    let agencies = [];
    try {
      const { data, error } = await supabase
        .from("agencies")
        .select("*")
        .eq("region", region); // assuming region column
      
      if (!error && data) {
        agencies = data;
      }
    } catch (error) {
      console.error('Error fetching agencies:', error);
      // Use mock data if Supabase is not configured
      agencies = [
        { id: '1', name: 'Agency 1', description: 'Description 1', rating: 4.5, reviewCount: 10, type: 'Private', featured: true, slug: 'agency-1' },
        { id: '2', name: 'Agency 2', description: 'Description 2', rating: 4.2, reviewCount: 8, type: 'Charity', featured: false, slug: 'agency-2' }
      ];
    }

    return (
      <div className="min-h-screen bg-background-offwhite">
        {/* Breadcrumb */}
        <div className="bg-white/50 backdrop-blur-sm border-b border-gray-100 py-4">
          <div className="container mx-auto px-4">
            <nav className="flex items-center space-x-2 text-sm text-gray-600 font-inter">
              <Link href="/" className="hover:text-primary-green transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <Link href="/foster-agency" className="hover:text-primary-green transition-colors">Foster Agencies</Link>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <Link href={`/foster-agency/${country}`} className="hover:text-primary-green transition-colors">{countryName}</Link>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="text-text-charcoal font-medium">{regionName}</span>
            </nav>
          </div>
        </div>

        {/* RENDER CMS IN ORDER */}
        {(() => {
          const orderedTypes = [
            'breadcrumb',
            'hero',
            'about',
            'benefitsSupport',
            'popularCities',
            'allowances',
            'testimonials',
            'faq',
            'trustBar',
            'finalCta'
          ];

          return orderedTypes
            .map(type => sectionMap[type])
            .filter(Boolean)
            .map(section => (
              <SectionRenderer key={section.type} section={section} />
            ));
        })()}

        {/* Cities Grid */}
        {paginatedCities.length > 0 && (
          <section id="cities" className="py-12 md:py-16 relative overflow-hidden section-muted">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl float-animation" />
              <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-secondary-blue/5 rounded-full blur-3xl float-animation" style={{ animationDelay: "1.5s" }} />
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="max-w-4xl mx-auto text-center mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                  <MapPin className="w-4 h-4 text-primary-green" />
                  <span className="text-sm font-medium text-text-charcoal font-inter">Cities</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                  Cities in {regionName}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto font-inter">
                  Discover fostering opportunities in cities across {regionName}
                </p>
              </div>
              
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {paginatedCities.map((city) => (
                    <Card key={city.slug} className="section-card rounded-modern-xl hover-lift transition-all">
                      <CardHeader>
                        <CardTitle className="text-xl font-poppins flex items-center">
                          <MapPin className="w-5 h-5 text-primary-green mr-2" />
                          {city.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Button 
                          variant="ghost" 
                          className="w-full group-hover:bg-primary-green/10 group-hover:text-primary-green font-inter"
                          asChild
                        >
                          <Link href={`/foster-agency/${country}/${region}/${city.slug}`}>
                            View Agencies <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex flex-wrap justify-center gap-2 mt-8">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            href={page > 1 ? `?page=${page - 1}` : '#'}
                            className={page > 1 ? "glass" : "glass opacity-50 cursor-not-allowed"}
                          />
                        </PaginationItem>
                        {[...Array(totalPages)].map((_, i) => (
                          <PaginationItem key={i}>
                            <PaginationLink 
                              href={`?page=${i + 1}`} 
                              isActive={page === i + 1}
                              className={page === i + 1 ? "glass bg-primary-green text-white" : "glass"}
                            >
                              {i + 1}
                            </PaginationLink>
                          </PaginationItem>
                        ))}
                        <PaginationItem>
                          <PaginationNext 
                            href={page < totalPages ? `?page=${page + 1}` : '#'}
                            className={page < totalPages ? "glass" : "glass opacity-50 cursor-not-allowed"}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Top Agencies Section */}
        <div className="container mx-auto px-4 py-8">
          <SectionRenderer 
            section={{
              type: 'topAgencies',
              data: {
                title: `Top Agencies in ${regionName}`,
                description: `Discover the highest-rated foster agencies in ${regionName} with excellent support and competitive allowances.`,
                items: agencies || [],
              }
            }} 
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error in RegionPage:', error);
    // Return a user-friendly error message
    return (
      <div className="min-h-screen bg-background-offwhite flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-6">
            We're sorry, but we encountered an error while loading the page for this region. 
            This issue has been logged and we're working to fix it.
          </p>
          <Button asChild>
            <Link href="/foster-agency">Back to Agencies</Link>
          </Button>
        </div>
      </div>
    );
  }
}