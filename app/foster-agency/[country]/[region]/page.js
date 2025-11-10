import { generateRegionPaths, loadCitiesForRegion, formatSlugToTitle, loadAllLocations } from '@/lib/locationData';
import { getLocationContentByCanonicalSlug } from '@/services/locationService';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, ChevronRight, Heart, Users, BookOpen, Award, Shield, Star, ExternalLink } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';

export async function generateStaticParams() {
  const paths = await generateRegionPaths();
  return paths;
}

export async function generateMetadata({ params }) {
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
}

export default async function RegionPage({ params }) {
  const resolvedParams = await params;
  const { country, region } = resolvedParams;
  
  // Use the optimized data loading function
  const structure = await loadAllLocations();
  
  // Get cities for this region from the structure
  const cities = structure[country] && structure[country].regions[region] ? 
    Object.entries(structure[country].regions[region].cities).map(([slug, city]) => ({
      slug,
      name: city.name
    })) : [];
  
  const countryName = formatSlugToTitle(country);
  const regionName = formatSlugToTitle(region);
  const canonicalSlug = `/foster-agency/${country}/${region}`;
  
  // Try to get content from the new location content system using canonical slug
  const content = await getLocationContentByCanonicalSlug(canonicalSlug) || {};

  if (cities.length === 0) {
    // Fallback to individual loading if structure is empty
    const citiesData = await loadCitiesForRegion(country, region);
    if (citiesData.length === 0) {
      notFound();
    }
    // Use citiesData if available
    var citiesToShow = citiesData.map(c => ({ slug: c.slug, name: c.name, url: c.url }));
  } else {
    // Use cities from structure
    var citiesToShow = cities;
  }

  // Get region-specific data
  const regionData = {
    england: {
      regulator: "Ofsted",
      council: "County Council",
      description: `${regionName} offers diverse fostering opportunities with strong community support networks. The region has a significant need for dedicated foster carers to provide stable, loving homes for children in care.`
    },
    scotland: {
      regulator: "Care Inspectorate",
      council: "Local Authority",
      description: `${regionName} provides unique fostering opportunities with a strong emphasis on community-based care. The region values the contribution of foster carers in supporting vulnerable children.`
    },
    wales: {
      regulator: "CSSIW",
      council: "County Council",
      description: `${regionName} offers bilingual fostering services and close-knit community support networks. The region is committed to providing the best possible care for children in need.`
    },
    'northern-ireland': {
      regulator: "NICCY",
      council: "Health and Social Care Trust",
      description: `${regionName} offers personalized fostering experiences with strong local authority support. The region focuses on creating positive outcomes for children and families.`
    }
  };

  const currentRegionData = regionData[country] || regionData.england;

  // Popular cities for each region (generic examples)
  const popularCities = [
    { 
      name: `Central ${regionName}`, 
      population: "Varies", 
      reason: `The heart of ${regionName} with excellent fostering opportunities and strong community support.`
    },
    { 
      name: `Northern ${regionName}`, 
      population: "Varies", 
      reason: `Growing area with increasing demand for foster carers to support local children.`
    },
    { 
      name: `Southern ${regionName}`, 
      population: "Varies", 
      reason: `Established fostering community with comprehensive support services for carers.`
    }
  ];

  // FAQs for each region
  const faqs = content?.faqs?.items || [
    {
      question: `How many foster families are needed in ${regionName}?`,
      answer: `${regionName} has a continuous need for foster families to provide care for children and young people. The exact number varies based on local demand, but there is always a need for dedicated carers who can provide stable, loving homes.`
    },
    {
      question: `Who can foster a child in ${regionName}?`,
      answer: `To foster in ${regionName}, you must be over 21, have a spare room, pass background checks, and complete training. You can be single, married, in a relationship, working, or retired. ${currentRegionData.regulator} sets the standards for approval.`
    },
    {
      question: `Can single people foster in ${regionName}?`,
      answer: `Yes, single people can foster in ${regionName}. What matters most is your ability to provide a stable, loving home for a child in need. All applicants go through the same assessment and approval process regardless of marital status.`
    },
    {
      question: `What support is available for foster carers in ${regionName}?`,
      answer: `Foster carers in ${regionName} receive ongoing support including 24/7 helplines, regular supervision, training opportunities, and access to support groups. Agencies also provide financial allowances and respite care.`
    }
  ];

  // Mock agencies data - in a real app, this would come from an API
  const featuredAgencies = [
    {
      id: 1,
      name: `${regionName} Family Care`,
      location: { region: regionName },
      description: `Dedicated fostering service providing compassionate care for children in ${regionName}.`,
      rating: 4.8,
      reviewCount: 42,
      type: "Local Authority",
      featured: true,
      phone: "+44 123 456 7890",
      email: `info@${regionName.toLowerCase().replace(/\s+/g, '')}familycare.co.uk`,
      website: `https://${regionName.toLowerCase().replace(/\s+/g, '')}familycare.co.uk`
    },
    {
      id: 2,
      name: `Bright Futures ${regionName}`,
      location: { region: regionName },
      description: `Specialist in caring for teenagers and sibling groups in the ${regionName} area.`,
      rating: 4.6,
      reviewCount: 38,
      type: "Private",
      featured: false,
      phone: "+44 123 456 7891",
      email: `contact@brightfutures${regionName.toLowerCase().replace(/\s+/g, '')}.co.uk`,
      website: `https://brightfutures${regionName.toLowerCase().replace(/\s+/g, '')}.co.uk`
    },
    {
      id: 3,
      name: `${regionName} Community Fostering`,
      location: { region: regionName },
      description: `Community-focused fostering service with personalized support for carers and children.`,
      rating: 4.9,
      reviewCount: 27,
      type: "Independent",
      featured: true,
      phone: "+44 123 456 7892",
      email: `hello@${regionName.toLowerCase().replace(/\s+/g, '')}communityfostering.org`,
      website: `https://${regionName.toLowerCase().replace(/\s+/g, '')}communityfostering.org`
    }
  ];

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
              <span className="text-sm font-medium text-text-charcoal font-inter">{regionName}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-charcoal mb-6 font-poppins">
              {content?.title || `Foster Agencies in ${regionName}`}
            </h1>
            <p className="text-xl text-gray-600 mb-8 font-inter">
              {content?.meta_description || `Find accredited foster agencies in ${regionName}, ${countryName}`}
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
                <Link href="#cities">Explore Cities</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* About Fostering in Region */}
      <section className="py-16 section-alt">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <BookOpen className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-medium text-text-charcoal font-inter">About Fostering</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                {content?.about?.title || `About Fostering in ${regionName}`}
              </h2>
            </div>
            
            <Card className="section-card rounded-modern-xl p-6 md:p-8">
              <div className="prose max-w-none text-gray-600 font-inter">
                {content?.about?.body ? (
                  <div dangerouslySetInnerHTML={{ __html: content.about.body }} />
                ) : (
                  <div className="space-y-4">
                    <p>
                      {currentRegionData.description} Fostering in {regionName} is regulated by {currentRegionData.regulator}, 
                      which ensures all foster agencies meet strict standards for safety, quality, and care. {currentRegionData.regulator} 
                      conducts regular inspections and provides guidance to maintain the highest standards.
                    </p>
                    
                    <h3 className="text-xl font-bold text-text-charcoal mt-6">Local Support and Resources</h3>
                    <p>
                      {regionName} is supported by the local {currentRegionData.council}, which provides additional resources and 
                      support for foster carers. The council works closely with fostering agencies to ensure children receive 
                      the best possible care within their local communities.
                    </p>
                    
                    <h3 className="text-xl font-bold text-text-charcoal mt-6">Types of Placements Needed</h3>
                    <ul className="list-disc pl-6 space-y-2">
                      <li>Short-term emergency care for children in immediate need</li>
                      <li>Long-term placements for children who cannot return home</li>
                      <li>Respite care to support birth families during difficult times</li>
                      <li>Parent and baby placements for young mothers</li>
                      <li>Teenage-focused fostering for older children</li>
                      <li>Specialist care for children with additional needs</li>
                    </ul>
                    
                    <h3 className="text-xl font-bold text-text-charcoal mt-6">Local Demand Statistics</h3>
                    <p>
                      {regionName} has a continuous need for foster families to provide care for children and young people. 
                      The demand varies throughout the year, but there is always a need for dedicated carers who can provide 
                      stable, loving homes. The local authority works with multiple agencies to match children with suitable 
                      foster families.
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits and Support for Foster Carers */}
      <section className="py-16 md:py-24 section-highlight">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <Heart className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-medium text-text-charcoal font-inter">Benefits & Support</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                {content?.benefits?.title || `Benefits and Support for Foster Carers in ${regionName}`}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-inter">
                {content?.benefits?.description || `Comprehensive support system for foster carers in ${regionName}`}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="section-card rounded-modern-xl p-6">
                <h3 className="text-xl font-bold text-text-charcoal mb-4 font-poppins flex items-center">
                  <Heart className="w-5 h-5 text-primary-green mr-2" />
                  {content?.benefits?.title || "Financial Support"}
                </h3>
                <ul className="space-y-3">
                  {content?.benefits?.items || [
                    { title: "Weekly fostering allowances to cover child care costs" },
                    { title: "Additional payments for special circumstances" },
                    { title: "Birthday and holiday gift allowances" },
                    { title: "Clothing and activity allowances" }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-primary-green text-xs">✓</span>
                      </div>
                      <span>{item.title || item.description}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              
              <Card className="section-card rounded-modern-xl p-6">
                <h3 className="text-xl font-bold text-text-charcoal mb-4 font-poppins flex items-center">
                  <Shield className="w-5 h-5 text-primary-green mr-2" />
                  {content?.support?.title || "Professional Support"}
                </h3>
                <ul className="space-y-3">
                  {content?.support?.items || [
                    { title: "24/7 support helpline for emergency assistance" },
                    { title: "Regular supervision and mentoring" },
                    { title: "Access to training and professional development" },
                    { title: "Respite care when needed" }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-primary-green text-xs">✓</span>
                      </div>
                      <span>{item.title || item.description}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              
              <Card className="section-card rounded-modern-xl p-6 md:col-span-2">
                <h3 className="text-xl font-bold text-text-charcoal mb-4 font-poppins flex items-center">
                  <Award className="w-5 h-5 text-primary-green mr-2" />
                  {content?.training?.title || "Training and Development"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {content?.training?.programs || [
                    { name: "Pre-approval Training", description: "Initial preparation courses before approval" },
                    { name: "Induction Program", description: "Post-approval training for new carers" },
                    { name: "Continuing Education", description: "Ongoing professional development" }
                  ].map((program, index) => (
                    <div key={index} className="text-center p-4">
                      <div className="w-12 h-12 rounded-full bg-primary-green/10 flex items-center justify-center mx-auto mb-3">
                        <span className="text-primary-green font-bold">{index + 1}</span>
                      </div>
                      <h4 className="font-bold mb-2">{program.name || program.title}</h4>
                      <p className="text-sm text-gray-600">{program.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Cities in Region */}
      <section id="cities" className="py-16 md:py-24 relative overflow-hidden section-contrast">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl float-animation" />
          <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-secondary-blue/5 rounded-full blur-3xl float-animation" style={{ animationDelay: "1.5s" }} />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <MapPin className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">Popular Cities</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
              {content?.popularCities?.title || `Popular Cities in ${regionName}`}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter">
              {content?.popularCities?.description || `Explore fostering opportunities in key cities across ${regionName}`}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {content?.popularCities?.cities || popularCities.map((city, index) => (
              <Card key={index} className="section-card rounded-modern-xl p-6 hover-lift transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-text-charcoal font-poppins">{city.name}</h3>
                  <span className="bg-primary-green/10 text-primary-green text-xs px-2 py-1 rounded-full">
                    {city.population}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4 font-inter">
                  {city.reason}
                </p>
                <Link 
                  href="#"
                  className="text-primary-green font-medium hover:underline flex items-center"
                >
                  Explore Opportunities <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 section-alt">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <Users className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-medium text-text-charcoal font-inter">FAQs</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                {content?.faqs?.title || `Frequently Asked Questions About Fostering in ${regionName}`}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-inter">
                {content?.faqs?.description || `Get answers to common questions about becoming a foster carer in ${regionName}`}
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="section-card rounded-modern-lg border border-gray-200">
                  <AccordionTrigger className="px-6 py-4 text-left font-poppins text-lg font-medium text-text-charcoal hover:bg-gray-50 rounded-t-modern-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 text-gray-600 font-inter bg-white rounded-b-modern-lg">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Featured Agencies */}
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
              {content?.topAgencies?.title || `Top Foster Agencies in ${regionName}`}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter">
              {content?.topAgencies?.description || `Discover the leading foster agencies in ${regionName} with excellent ratings and comprehensive support`}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {(content?.topAgencies?.items || featuredAgencies).map((agency, index) => (
              <Card key={index} className="section-card rounded-modern-xl p-6 hover-lift transition-all h-full flex flex-col">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-text-charcoal font-poppins">{agency.name}</h3>
                  {agency.featured && (
                    <Badge variant="secondary" className="bg-primary-green/10 text-primary-green border-0">
                      Featured
                    </Badge>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4 flex-grow font-inter">
                  {agency.summary || agency.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm font-medium">{agency.rating || "N/A"}</span>
                    <span className="mx-1 text-gray-400">•</span>
                    <span className="text-sm text-gray-500">{agency.reviewCount || 0} reviews</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {agency.type || "Agency"}
                  </Badge>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-grow font-inter" asChild>
                    <Link href={agency.website || "#"}>
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
          
          <div className="text-center mt-12">
            <Button size="lg" className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 px-8 py-6 text-lg font-semibold rounded-xl btn-futuristic" asChild>
              <Link href="/contact">
                Find More Agencies in {regionName}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary-green to-secondary-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/10 to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/10 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 font-poppins">
              {content?.cta?.title || "Ready to Start Your Fostering Journey?"}
            </h2>
            <p className="text-xl mb-8 font-inter text-white/90">
              {content?.cta?.description || `Take the first step towards making a difference in a child's life in ${regionName}`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-text-charcoal hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-xl font-inter" asChild>
                <Link href="/contact">
                  {content?.cta?.primaryButtonText || "Talk to a Foster Advisor"}
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="glass text-white border-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-xl font-inter" asChild>
                <Link href="#">
                  {content?.cta?.secondaryButtonText || "Download Information Pack"}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}