import { generateCityPaths, formatSlugToTitle } from '@/lib/locationData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLocationContentByCanonicalSlug } from '@/services/locationService';
import { Button } from '@/components/ui/button';
import { MapPin, ChevronRight } from 'lucide-react';

// Make sure pages run on dynamic rendering mode
export const dynamic = "force-dynamic";
export const revalidate = 0; // No caching for better debugging

export async function generateStaticParams() {
  try {
    const paths = await generateCityPaths();
    console.log('Generated city paths:', paths.length);
    return paths;
  } catch (error) {
    console.error('Error generating city paths:', error);
    return [];
  }
}

export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const { country, region, city } = resolvedParams;
    const canonicalSlug = `/foster-agency/${country}/${region}/${city}`;

    const content = await getLocationContentByCanonicalSlug(canonicalSlug) || {};
    const cityName = formatSlugToTitle(city);
    const regionName = formatSlugToTitle(region);
    const countryName = formatSlugToTitle(country);

    return {
      title: content?.meta_title || `Foster Agencies in ${cityName}, ${regionName} | UK Directory`,
      description:
        content?.meta_description ||
        `Find foster agencies in ${cityName}, ${regionName}. Browse trusted fostering services.`
    };
  } catch (error) {
    console.error('Error generating city metadata:', error);
    const resolvedParams = await params;
    const { country, region, city } = resolvedParams;
    const cityName = formatSlugToTitle(city);
    const regionName = formatSlugToTitle(region);
    const countryName = formatSlugToTitle(country);
    
    return {
      title: `Foster Agencies in ${cityName}, ${regionName} | UK Directory`,
      description:
        `Find foster agencies in ${cityName}, ${regionName}. Browse trusted fostering services.`
    };
  }
}

export default async function CityPage({ params }) {
  console.log('CITY PAGE LOADED WITH PARAMS:', params);
  
  try {
    const resolvedParams = await params;
    const { country, region, city } = resolvedParams;
    const canonicalSlug = `/foster-agency/${country}/${region}/${city}`;
    
    // Validate parameters
    if (!country || !region || !city) {
      console.error('Missing country, region, or city parameter');
      notFound();
    }
    
    const content = await getLocationContentByCanonicalSlug(canonicalSlug);

    const cityName = formatSlugToTitle(city);
    const regionName = formatSlugToTitle(region);
    const countryName = formatSlugToTitle(country);

    // Default rendering when no dynamic sections
    console.log('Rendering default city page');
    
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
              <Link href={`/foster-agency/${country}/${region}`} className="hover:text-primary-green transition-colors">{regionName}</Link>
              <ChevronRight className="h-4 w-4 text-gray-400" />
              <span className="text-text-charcoal font-medium">{cityName}</span>
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
                <span className="text-sm font-medium text-text-charcoal font-inter">{cityName}, {regionName}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-text-charcoal mb-6 font-poppins">
                {content?.title || `Foster Agencies in ${cityName}`}
              </h1>
              <p className="text-xl text-gray-600 mb-8 font-inter max-w-3xl mx-auto">
                {content?.meta_description || `Find accredited foster agencies in ${cityName}, ${regionName}. Connect with caring services in your local community.`}
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
      </div>
    );
  } catch (error) {
    console.error('Error in CityPage:', error);
    // Return a user-friendly error message
    return (
      <div className="min-h-screen bg-background-offwhite flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-6">
            We're sorry, but we encountered an error while loading the city page. 
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