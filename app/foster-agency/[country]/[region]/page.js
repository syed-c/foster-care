import { generateRegionPaths, formatSlugToTitle } from '@/lib/locationData';
import { 
  getLocationContentByCanonicalSlug, 
  getAgenciesByRegion, 
  getCitiesByRegion 
} from '@/services/locationService';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import RegionSectionRenderer from '@/components/sections/RegionSectionRenderer';
import CitiesGridSection from '@/components/locations/CitiesGridSection';
import TopAgenciesSection from '@/components/locations/TopAgenciesSection';
import { Button } from '@/components/ui/button';
import { MapPin, ChevronRight } from 'lucide-react';

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
    } catch (contentError) {
      console.error('Error loading content:', contentError);
      content = {};
    }
    
    // RegionPage should NEVER return early when content is empty
    // Always render default layout + dynamic sections below
    
    // Extract sections from content - handle both flat content and sections array
    let sections = [];

    // Check if content has a sections array directly
    if (content?.sections && Array.isArray(content.sections)) {
      sections = content.sections;
    } 
    // Check if content has content_json with a sections array
    else if (content?.content_json?.sections && Array.isArray(content.content_json.sections)) {
      sections = content.content_json.sections;
    }
    // Handle flat content structure
    else if (content && typeof content === 'object' && Object.keys(content).length > 0) {
      // Convert flat content to sections array
      sections = Object.keys(content)
        .filter(key => typeof content[key] === 'object' && content[key] !== null && key !== 'meta_title' && key !== 'meta_description')
        .map(key => ({
          type: key,
          key: key,
          data: content[key]
        }));
    }
    
    console.log('Sections extracted:', sections.length);
    
    const countryName = formatSlugToTitle(country);
    const regionName = formatSlugToTitle(region);
    
    // If we have sections, render them
    if (sections.length > 0) {
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
          
          {/* Render dynamic sections */}
          <div className="container mx-auto px-4 py-8">
            {sections.map((section) => (
              <RegionSectionRenderer 
                key={section.key || section.type || Math.random()} 
                section={section} 
              />
            ))}
          </div>
        </div>
      );
    }
    
    // Default rendering when no dynamic sections
    console.log('Rendering default region page');
    
    // Get agencies for this region
    let agencies = [];
    try {
      agencies = await getAgenciesByRegion(region);
      console.log('Agencies loaded:', agencies.length);
    } catch (agencyError) {
      console.error('Error loading agencies:', agencyError);
      agencies = [];
    }
    
    // Get cities for this region
    let cities = [];
    try {
      cities = await getCitiesByRegion(country, region);
      console.log('Cities loaded:', cities.length);
    } catch (cityError) {
      console.error('Error loading cities:', cityError);
      cities = [];
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
                {content?.meta_description || `Find accredited foster agencies in ${regionName}, ${countryName}. Connect with caring services in your local community.`}
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

        {/* Cities Grid Section */}
        <CitiesGridSection 
          country={country} 
          region={region} 
          cities={cities} 
        />

        {/* Top Agencies Section */}
        <TopAgenciesSection 
          locationType="region"
          locationName={region}
          agencies={agencies}
        />
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