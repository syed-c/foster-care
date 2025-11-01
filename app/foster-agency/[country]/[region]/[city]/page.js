import { generateCityPaths, loadCitiesForRegion, formatSlugToTitle } from '@/lib/locationData';
import { ensureContentExists } from '@/lib/cms';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { MapPin, ArrowRight, ChevronRight, Heart, Shield, Users, Star, ExternalLink } from 'lucide-react';

export async function generateStaticParams() {
  const paths = await generateCityPaths();
  return paths;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { country, region, city } = resolvedParams;
  const countryName = formatSlugToTitle(country);
  const regionName = formatSlugToTitle(region);
  const slug = `${country}/${region}/${city}`;
  const content = ensureContentExists(slug);

  // Get city name from database
  const cities = await loadCitiesForRegion(country, region);
  const cityData = cities.find(c => c.slug === city);
  const cityName = cityData?.name || formatSlugToTitle(city);

  return {
    title: content?.meta_title || `Foster Agencies in ${cityName}, ${regionName} | UK Directory`,
    description: content?.meta_description || `Find foster agencies in ${cityName}, ${regionName}, ${countryName}. Browse listings and connect with trusted fostering services.`,
  };
}

function generateSchemaMarkup(cityName, regionName, countryName) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FosterCareService',
    name: `Foster Agencies in ${cityName}`,
    areaServed: {
      '@type': 'City',
      name: cityName,
      containedIn: {
        '@type': 'State',
        name: regionName,
        containedIn: {
          '@type': 'Country',
          name: countryName,
        },
      },
    },
    serviceType: 'Foster Care Services',
  };
}

export default async function CityPage({ params }) {
  const resolvedParams = await params;
  const { country, region, city } = resolvedParams;
  
  const cities = await loadCitiesForRegion(country, region);
  const cityData = cities.find(c => c.slug === city);

  if (!cityData) {
    notFound();
  }

  const countryName = formatSlugToTitle(country);
  const regionName = formatSlugToTitle(region);
  const cityName = cityData.name;
  const slug = `${country}/${region}/${city}`;
  const content = ensureContentExists(slug);

  const schemaMarkup = generateSchemaMarkup(cityName, regionName, countryName);

  return (
    <div className="min-h-screen bg-background-offwhite">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
      />
      
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
              <span className="text-sm font-medium text-text-charcoal font-inter">{cityName}, {regionName}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-charcoal mb-6 font-poppins">
              {content.h1}
            </h1>
            <p className="text-xl text-gray-600 mb-8 font-inter">
              {content.hero_text || `Find the perfect foster agency in ${cityName}`}
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
      {content.intro_text && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <Card className="glass-card rounded-modern-xl p-8 max-w-4xl mx-auto">
              <div className="prose max-w-none text-gray-600 leading-relaxed font-inter" dangerouslySetInnerHTML={{ __html: content.intro_text }} />
            </Card>
          </div>
        </section>
      )}

      {/* Agencies Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl float-animation" />
          <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-secondary-blue/5 rounded-full blur-3xl float-animation" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Shield className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">Verified Agencies</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
              Find Agencies in {cityName}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="glass-card rounded-modern-xl hover-lift transition-all">
                <CardHeader>
                  <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center mb-4">
                    <Heart className="w-8 h-8 text-primary-green" />
                  </div>
                  <CardTitle className="text-xl font-poppins">Local Foster Care Agency {i}</CardTitle>
                  <CardDescription className="font-inter">
                    Providing comprehensive fostering services
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 font-inter">
                    Sample foster agency description for {cityName}
                  </p>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 font-inter">(12 reviews)</span>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-primary-green text-primary-green hover:bg-primary-green/10 font-inter"
                    asChild
                  >
                    <Link href="/contact">Contact Agency</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Foster Care Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <Card className="glass-card-gradient rounded-modern-xl p-8 md:p-12 max-w-6xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-text-charcoal mb-8 font-poppins text-center">
                Why Foster Care Matters
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-primary-green" />
                  </div>
                  <h3 className="text-xl font-bold text-text-charcoal mb-3 font-poppins">Providing Stability</h3>
                  <p className="text-gray-600 font-inter">
                    Foster carers provide a safe, stable, and nurturing home environment
                    for children who cannot live with their birth families. Your support
                    can make a life-changing difference.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary-green" />
                  </div>
                  <h3 className="text-xl font-bold text-text-charcoal mb-3 font-poppins">Support Available</h3>
                  <p className="text-gray-600 font-inter">
                    Foster agencies offer comprehensive training, financial support, and
                    ongoing guidance to help you succeed as a foster carer. You're never
                    alone on this journey.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary-green" />
                  </div>
                  <h3 className="text-xl font-bold text-text-charcoal mb-3 font-poppins">Flexible Options</h3>
                  <p className="text-gray-600 font-inter">
                    From short-term placements to long-term fostering, there are various
                    types of fostering arrangements to suit different situations and
                    preferences.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center mb-4">
                    <Star className="w-6 h-6 text-primary-green" />
                  </div>
                  <h3 className="text-xl font-bold text-text-charcoal mb-3 font-poppins">Make a Difference</h3>
                  <p className="text-gray-600 font-inter">
                    Every child deserves a loving home. By becoming a foster carer, you
                    can help transform a child's life and contribute to their positive
                    future.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Useful Resources */}
      {content.useful_resources && content.useful_resources.length > 0 && (
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                Useful Resources
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {content.useful_resources.map((resource, index) => (
                <Card key={index} className="glass-card rounded-modern-xl hover-lift">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-poppins">{resource.title}</CardTitle>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    {resource.description && (
                      <CardDescription className="mb-4 font-inter">{resource.description}</CardDescription>
                    )}
                    <Link
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-green hover:underline font-medium font-inter flex items-center"
                    >
                      Visit Resource <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {content.faqs && content.faqs.length > 0 && (
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl float-animation" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {content.faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="glass-card rounded-modern mb-4 border-0">
                    <AccordionTrigger className="text-left font-semibold px-6 py-4 font-poppins">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 px-6 pb-4 font-inter">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
