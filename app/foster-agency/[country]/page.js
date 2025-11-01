import { generateCountryPaths, loadRegionsForCountry, formatSlugToTitle, buildLocationStructure, getRegionsForCountry } from '@/lib/locationData';
import { ensureContentExists } from '@/lib/cms';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, ChevronRight, Heart } from 'lucide-react';

export async function generateStaticParams() {
  const paths = await generateCountryPaths();
  return paths;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const country = resolvedParams.country;
  const countryName = formatSlugToTitle(country);
  const content = ensureContentExists(country);

  return {
    title: content?.meta_title || `Foster Agencies in ${countryName} | UK Directory`,
    description: content?.meta_description || `Find foster agencies in ${countryName}. Browse regions and cities to discover fostering services near you.`,
  };
}

export default async function CountryPage({ params }) {
  const resolvedParams = await params;
  const country = resolvedParams.country;
  
  const regionsData = await loadRegionsForCountry(country);
  const countryName = formatSlugToTitle(country);
  const content = ensureContentExists(country);

  // Build structure for backwards compatibility
  const structure = await buildLocationStructure();
  const regions = getRegionsForCountry(structure, country);

  if (regions.length === 0 && regionsData.length === 0) {
    notFound();
  }

  // Use regionsData if available, otherwise fall back to structure
  const regionsToShow = regionsData.length > 0 
    ? regionsData.map(r => ({ slug: r.slug, name: r.name }))
    : regions;

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
      <section className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-primary-green/10 to-secondary-blue/10">
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
              {content?.h1 || `Foster Agencies in ${countryName}`}
            </h1>
            <p className="text-xl text-gray-600 mb-8 font-inter">
              {content?.hero_text || `Find accredited foster agencies in ${countryName}`}
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 px-8 py-6 text-lg font-semibold rounded-xl btn-futuristic"
              asChild
            >
              <Link href="/contact">Get Foster Agency Support</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Intro Text */}
      {content?.intro_text && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Card className="glass-card rounded-modern-xl p-8 max-w-4xl mx-auto">
              <div className="prose max-w-none text-gray-600 font-inter" dangerouslySetInnerHTML={{ __html: content.intro_text }} />
            </Card>
          </div>
        </section>
      )}

      {/* Regions Grid */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl float-animation" />
          <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-secondary-blue/5 rounded-full blur-3xl float-animation" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
              Regions in {countryName}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter">
              Browse foster agencies by region
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {regionsToShow.map((region) => (
              <Link key={region.slug} href={`/foster-agency/${country}/${region.slug}`}>
                <Card className="glass-card rounded-modern-xl hover-lift transition-all cursor-pointer group">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <MapPin className="w-7 h-7 text-primary-green" />
                    </div>
                    <CardTitle className="text-lg font-poppins group-hover:text-primary-green transition-colors">
                      {region.name}
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
    </div>
  );
}
