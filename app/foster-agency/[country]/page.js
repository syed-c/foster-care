import { generateCountryPaths, loadRegionsForCountry, formatSlugToTitle, loadAllLocations } from '@/lib/locationData';
import { getLocationContentByCanonicalSlug } from '@/services/locationService';
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

// Make sure pages run on dynamic rendering mode
export const dynamic = "force-dynamic";
export const revalidate = 0; // No caching for better debugging

export async function generateStaticParams() {
  try {
    const paths = await generateCountryPaths();
    console.log('Generated static paths:', paths);
    return paths;
  } catch (error) {
    console.error('Error generating static paths:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const country = resolvedParams.country;
    const countryName = formatSlugToTitle(country);
    const canonicalSlug = `/foster-agency/${country}`;
    
    // Try to get content from the new location content system using canonical slug
    const rawContent = await getLocationContentByCanonicalSlug(canonicalSlug) || {};

    return {
      title: rawContent?.meta_title || rawContent?.title || `Foster Agencies in ${countryName} | UK Directory`,
      description: rawContent?.meta_description || `Find foster agencies in ${countryName}. Browse regions and cities to discover fostering services near you.`,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    const resolvedParams = await params;
    const country = resolvedParams.country;
    const countryName = formatSlugToTitle(country);
    return {
      title: `Foster Agencies in ${countryName} | UK Directory`,
      description: `Find foster agencies in ${countryName}. Browse regions and cities to discover fostering services near you.`,
    };
  }
}

export default async function CountryPage({ params, searchParams }) {
  console.log('COUNTRY PAGE LOADED WITH PARAMS:', params);
  
  try {
    const resolvedParams = await params;
    const country = resolvedParams.country;
    console.log('Country:', country);
    
    // Validate country parameter
    if (!country) {
      console.error('No country parameter provided');
      notFound();
    }
    
    // Use the optimized data loading function
    let structure = {};
    try {
      structure = await loadAllLocations();
      console.log('Location structure loaded');
    } catch (structureError) {
      console.error('Error loading location structure:', structureError);
      structure = {};
    }
    
    // Get regions for this country from the structure
    let regions = [];
    try {
      regions = structure[country] ? Object.entries(structure[country].regions).map(([slug, region]) => ({
        slug,
        name: region.name
      })) : [];
      console.log('Regions found:', regions.length);
    } catch (regionsError) {
      console.error('Error processing regions:', regionsError);
      regions = [];
    }
    
    const countryName = formatSlugToTitle(country);
    const canonicalSlug = `/foster-agency/${country}`;
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
    
    // Initialize regionsToShow properly
    let regionsToShow = [];
    try {
      if (regions.length === 0) {
        const regionsData = await loadRegionsForCountry(country);
        if (regionsData.length === 0) {
          notFound();
        }
        // Use regionsData if available
        regionsToShow = regionsData.map(r => ({ slug: r.slug, name: r.name }));
      } else {
        // Use regions from structure
        regionsToShow = regions;
      }
    } catch (regionsLoadError) {
      console.error('Error loading regions:', regionsLoadError);
      regionsToShow = [];
    }
    
    // Pagination logic for regions
    const regionsPerPage = 6;
    
    // Handle pagination for regions
    const page = parseInt(searchParams?.page) || 1;
    const totalRegions = regionsToShow.length;
    const startIndex = (page - 1) * regionsPerPage;
    const endIndex = startIndex + regionsPerPage;
    const paginatedRegions = regionsToShow.slice(startIndex, endIndex);
    const totalPages = Math.ceil(regionsToShow.length / regionsPerPage);
    
    // Get country-specific data
    const countryData = {
      england: {
        population: "56.5 million",
        agencies: "1,200+",
        demand: "High",
        regulator: "Ofsted",
        description: "England has the largest fostering system in the UK with diverse opportunities across urban and rural areas."
      },
      scotland: {
        population: "5.5 million",
        agencies: "300+",
        demand: "Moderate",
        regulator: "Care Inspectorate",
        description: "Scotland offers unique fostering opportunities with a strong emphasis on community-based care."
      },
      wales: {
        population: "3.1 million",
        agencies: "200+",
        demand: "Moderate",
        regulator: "CSSIW",
        description: "Wales provides bilingual fostering services and close-knit community support networks."
      },
      'northern-ireland': {
        population: "1.9 million",
        agencies: "150+",
        demand: "Moderate",
        regulator: "NICCY",
        description: "Northern Ireland offers personalized fostering experiences with strong local authority support."
      }
    };

    const currentCountryData = countryData[country] || countryData.england;

    // Popular regions for each country
    const popularRegions = {
      england: [
        { name: "Greater London", agencies: "200+", demand: "High" },
        { name: "West Midlands", agencies: "80+", demand: "High" },
        { name: "Greater Manchester", agencies: "75+", demand: "High" },
        { name: "West Yorkshire", agencies: "65+", demand: "High" },
        { name: "South East", agencies: "150+", demand: "High" }
      ],
      scotland: [
        { name: "Glasgow City", agencies: "40+", demand: "High" },
        { name: "Edinburgh", agencies: "35+", demand: "High" },
        { name: "Aberdeen City", agencies: "20+", demand: "Moderate" },
        { name: "Fife", agencies: "25+", demand: "Moderate" }
      ],
      wales: [
        { name: "Cardiff", agencies: "25+", demand: "High" },
        { name: "Swansea", agencies: "20+", demand: "Moderate" },
        { name: "Newport", agencies: "15+", demand: "Moderate" }
      ],
      'northern-ireland': [
        { name: "Belfast", agencies: "20+", demand: "High" },
        { name: "Derry", agencies: "10+", demand: "Moderate" }
      ]
    };

    const currentPopularRegions = popularRegions[country] || popularRegions.england;

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
              <span className="text-text-charcoal font-medium">{countryName}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
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
                <span className="text-sm font-medium text-text-charcoal font-inter">{countryName}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-text-charcoal mb-6 font-poppins">
                {rawContent?.title || `Foster Agencies in ${countryName}`}
              </h1>
              <p className="text-xl text-gray-600 mb-8 font-inter">
                {rawContent?.meta_description || `Find accredited foster agencies in ${countryName}`}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 px-8 py-6 text-lg font-semibold rounded-xl btn-futuristic"
                  asChild
                >
                  <Link href="/contact">Get Foster Agency Support</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="glass font-inter px-8 py-6 text-lg"
                  asChild
                >
                  <Link href="#regions">Explore Regions</Link>
                </Button>
              </div>
              
              {/* Search Bar */}
              <div className="max-w-2xl mx-auto">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder={`Search for agencies in ${countryName}...`}
                    className="w-full pl-12 pr-4 py-4 rounded-xl glass text-text-charcoal placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-green"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Regions Grid */}
        <section id="regions" className="py-16 md:py-24 relative overflow-hidden section-muted">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl float-animation" />
            <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-secondary-blue/5 rounded-full blur-3xl float-animation" style={{ animationDelay: "1.5s" }} />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <MapPin className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-medium text-text-charcoal font-inter">Regions</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                {`Foster Agency Finder by Region`}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-inter">
                {`Discover the best foster agencies across ${countryName} by region. Our comprehensive directory helps you find the perfect match for your fostering journey.`}
              </p>
            </div>
            
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {regionsToShow.slice(0, regionsPerPage).map((region) => (
                  <Card key={region.slug} className="section-card rounded-modern-xl hover-lift transition-all">
                    <CardHeader>
                      <CardTitle className="text-xl font-poppins flex items-center">
                        <MapPin className="w-5 h-5 text-primary-green mr-2" />
                        {region.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        variant="ghost" 
                        className="w-full group-hover:bg-primary-green/10 group-hover:text-primary-green font-inter"
                        asChild
                      >
                        <Link href={`/foster-agency/${country}/${region.slug}`}>
                          View Agencies <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious href="#" className="glass" />
                      </PaginationItem>
                      {[...Array(totalPages)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink 
                            href="#" 
                            isActive={i === 0}
                            className={i === 0 ? "glass bg-primary-green text-white" : "glass"}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext href="#" className="glass" />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error in CountryPage:', error);
    // Return a user-friendly error message
    return (
      <div className="min-h-screen bg-background-offwhite flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-6">
            We're sorry, but we encountered an error while loading the page for {formatSlugToTitle(resolvedParams?.country || 'this location')}. 
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