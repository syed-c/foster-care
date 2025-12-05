import { generateRegionPaths, formatSlugToTitle, loadAllLocations } from '@/lib/locationData';
import { 
  getLocationContentByCanonicalSlug, 
  getAgenciesByRegion, 
  getCitiesByRegion,
  extractSectionsFromContent
} from '@/services/locationService';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { MapPin, ChevronRight, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import SectionRenderer from '@/components/sections/SectionRenderer';

// Make sure pages run on dynamic rendering mode
export const dynamic = "force-dynamic";
export const revalidate = 0; // No caching for better debugging

export async function generateStaticParams() {
  try {
    const paths = await generateRegionPaths();
    console.log('Generated region paths:', paths.length);
    return paths;
  } catch (error) {
    console.error('Error generating region paths:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const { country, region } = resolvedParams;
    const countryName = formatSlugToTitle(country);
    const regionName = formatSlugToTitle(region);
    const canonicalSlug = `/foster-agency/${country}/${region}`;
    
    // Try to get content from the new location content system using canonical slug
    const content = await getLocationContentByCanonicalSlug(canonicalSlug) || {};

    return {
      title: content?.meta_title || `Foster Agencies in ${regionName}, ${countryName} | UK Directory`,
      description: content?.meta_description || `Find foster agencies in ${regionName}, ${countryName}. Browse cities and discover fostering services in your area.`,
    };
  } catch (error) {
    console.error('Error generating region metadata:', error);
    const resolvedParams = await params;
    const { country, region } = resolvedParams;
    const countryName = formatSlugToTitle(country);
    const regionName = formatSlugToTitle(region);
    return {
      title: `Foster Agencies in ${regionName}, ${countryName} | UK Directory`,
      description: `Find foster agencies in ${regionName}, ${countryName}. Browse cities and discover fostering services in your area.`,
    };
  }
}

export default async function RegionPage({ params }) {
  console.log('REGION PAGE LOADED WITH PARAMS:', params);
  
  try {
    const resolvedParams = await params;
    const { country, region } = resolvedParams;
    
    // Validate parameters
    if (!country || !region) {
      console.error('Missing country or region parameter');
      notFound();
    }
    
    // Build the canonical slug
    const canonicalSlug = `/foster-agency/${country}/${region}`;
    console.log('Canonical slug:', canonicalSlug);
    
    // Fetch content from Supabase using canonical slug
    let content = {};
    try {
      content = await getLocationContentByCanonicalSlug(canonicalSlug);
      console.log('Content loaded:', !!content);
      console.log('Content:', JSON.stringify(content, null, 2));
    } catch (contentError) {
      console.error('Error loading content:', contentError);
      content = {};
    }
    
    const countryName = formatSlugToTitle(country);
    const regionName = formatSlugToTitle(region);
    
    // Get cities for this region
    let cities = [];
    try {
      const structure = await loadAllLocations();
      if (structure[country] && structure[country].regions[region]) {
        cities = Object.entries(structure[country].regions[region].cities).map(([slug, city]) => ({
          slug,
          name: city.name
        }));
      }
    } catch (error) {
      console.error('Error loading cities:', error);
      cities = [];
    }
    
    // Get agencies for this region
    let agencies = [];
    try {
      agencies = await getAgenciesByRegion(region);
      console.log('Agencies loaded:', agencies.length);
    } catch (agencyError) {
      console.error('Error loading agencies:', agencyError);
      agencies = [];
    }
    
    // Extract sections from content using the utility function
    const sections = extractSectionsFromContent(content);
    console.log('Extracted sections:', sections.length);

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

        {/* Hero Section */}
        <section className="py-16 md:py-24 relative overflow-hidden section-hero">
          <div className="absolute inset-0 gradient-mesh opacity-50" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-72 h-72 bg-primary-green/15 rounded-full blur-3xl float-animation" />
            <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary-blue/15 rounded-full blur-3xl float-animation" style={{ animationDelay: "2s" }} />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <MapPin className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-medium text-text-charcoal font-inter">{regionName}, {countryName}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-text-charcoal mb-6 font-poppins">
                {content?.title || `Foster Agencies in ${regionName}`}
              </h1>
              <p className="text-xl text-gray-600 mb-8 font-inter max-w-3xl mx-auto">
                {content?.meta_description || `Find accredited foster agencies in ${regionName}, ${countryName}. Browse trusted fostering services.`}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 px-8 py-6 text-lg font-semibold rounded-xl btn-futuristic"
                  asChild
                >
                  <Link href="/contact">Get Support</Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="glass font-inter px-8 py-6 text-lg"
                  asChild
                >
                  <Link href="#agencies">View Agencies</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Render CMS sections if available */}
        {sections.length > 0 && (
          <div className="container mx-auto px-4 py-8">
            {sections.map((section, index) => (
              <SectionRenderer key={index} section={section} regionSlug={region} />
            ))}
          </div>
        )}

        {/* Cities Grid */}
        {cities.length > 0 && (
          <section className="py-12 md:py-16 relative overflow-hidden section-muted">
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
                  {`All Cities in ${regionName}`}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto font-inter">
                  {`Discover foster agencies across cities in ${regionName}. Find the perfect match for your fostering journey.`}
                </p>
              </div>
              
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cities.map((city) => (
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
                items: [] // Will use fallback data
              }
            }} 
            regionSlug={region}
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
            We're sorry, but we encountered an error while loading the region page. 
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