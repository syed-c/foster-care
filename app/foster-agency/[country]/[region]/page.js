import { generateRegionPaths, loadCitiesForRegion, formatSlugToTitle, loadAllLocations } from '@/lib/locationData';
import { ensureContentExists } from '@/lib/cms';
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
  const slug = `${country}/${region}`;
  const content = ensureContentExists(slug);

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
  const slug = `${country}/${region}`;
  const content = ensureContentExists(slug);

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
  const faqs = content?.faqs || [
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
              {content?.h1 || `Foster Agencies in ${regionName}`}
            </h1>
            <p className="text-xl text-gray-600 mb-8 font-inter">
              {content?.hero_text || `Find accredited foster agencies in ${regionName}, ${countryName}`}
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
                About Fostering in {regionName}
              </h2>
            </div>
            
            <Card className="section-card rounded-modern-xl p-6 md:p-8">
              <div className="prose max-w-none text-gray-600 font-inter">
                {content?.intro_text ? (
                  <div dangerouslySetInnerHTML={{ __html: content.intro_text }} />
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
                Benefits and Support for Foster Carers in {regionName}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-inter">
                Comprehensive support system for foster carers in {regionName}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="section-card rounded-modern-xl p-6">
                <h3 className="text-xl font-bold text-text-charcoal mb-4 font-poppins flex items-center">
                  <Heart className="w-5 h-5 text-primary-green mr-2" />
                  Financial Support
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-primary-green text-xs">✓</span>
                    </div>
                    <span>Weekly fostering allowances to cover child care costs</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-primary-green text-xs">✓</span>
                    </div>
                    <span>Additional payments for special circumstances</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-primary-green text-xs">✓</span>
                    </div>
                    <span>Birthday and holiday gift allowances</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-primary-green text-xs">✓</span>
                    </div>
                    <span>Clothing and activity allowances</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="section-card rounded-modern-xl p-6">
                <h3 className="text-xl font-bold text-text-charcoal mb-4 font-poppins flex items-center">
                  <Shield className="w-5 h-5 text-primary-green mr-2" />
                  Professional Support
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-primary-green text-xs">✓</span>
                    </div>
                    <span>24/7 support helpline for emergency assistance</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-primary-green text-xs">✓</span>
                    </div>
                    <span>Regular supervision and mentoring</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-primary-green text-xs">✓</span>
                    </div>
                    <span>Access to training and professional development</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-primary-green text-xs">✓</span>
                    </div>
                    <span>Respite care when needed</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="section-card rounded-modern-xl p-6 md:col-span-2">
                <h3 className="text-xl font-bold text-text-charcoal mb-4 font-poppins flex items-center">
                  <Award className="w-5 h-5 text-primary-green mr-2" />
                  Training and Development
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 rounded-full bg-primary-green/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary-green font-bold">1</span>
                    </div>
                    <h4 className="font-bold mb-2">Pre-approval Training</h4>
                    <p className="text-sm text-gray-600">Initial preparation courses before approval</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 rounded-full bg-primary-green/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary-green font-bold">2</span>
                    </div>
                    <h4 className="font-bold mb-2">Induction Program</h4>
                    <p className="text-sm text-gray-600">Post-approval training for new carers</p>
                  </div>
                  <div className="text-center p-4">
                    <div className="w-12 h-12 rounded-full bg-primary-green/10 flex items-center justify-center mx-auto mb-3">
                      <span className="text-primary-green font-bold">3</span>
                    </div>
                    <h4 className="font-bold mb-2">Continuing Education</h4>
                    <p className="text-sm text-gray-600">Ongoing professional development</p>
                  </div>
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
              Popular Cities in {regionName}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter">
              Explore fostering opportunities in key cities across {regionName}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {popularCities.map((city, index) => (
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
            
            {/* Actual cities from data */}
            {citiesToShow.slice(0, 3).map((city) => (
              <Link key={city.slug} href={`/foster-agency/${country}/${region}/${city.slug}`}>
                <Card className="section-card rounded-modern-xl hover-lift transition-all cursor-pointer group">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <MapPin className="w-7 h-7 text-primary-green" />
                    </div>
                    <CardTitle className="text-lg font-poppins group-hover:text-primary-green transition-colors">
                      {city.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="font-inter mb-4">
                      View foster agencies in this city
                    </CardDescription>
                    <div className="flex items-center text-primary-green font-medium group-hover:translate-x-1 transition-transform">
                      Explore Agencies <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Trust Signals */}
      <section className="py-16 section-alt">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <Heart className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-medium text-text-charcoal font-inter">Local Voices</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                Testimonials from {regionName} Foster Carers
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="section-card rounded-modern-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-green/10 flex items-center justify-center mr-4">
                    <span className="text-primary-green font-bold">S</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-text-charcoal">Sarah T.</h3>
                    <p className="text-sm text-gray-600">Foster Carer for 3 years</p>
                  </div>
                </div>
                <p className="text-gray-600 italic font-inter">
                  "Fostering in {regionName} has been one of the most rewarding experiences of my life. 
                  The support from the local authority and my fostering agency has been exceptional."
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </Card>
              
              <Card className="section-card rounded-modern-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-primary-green/10 flex items-center justify-center mr-4">
                    <span className="text-primary-green font-bold">M</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-text-charcoal">Michael R.</h3>
                    <p className="text-sm text-gray-600">Foster Carer for 5 years</p>
                  </div>
                </div>
                <p className="text-gray-600 italic font-inter">
                  "The training and ongoing support I've received as a foster carer in {regionName} 
                  has helped me make a real difference in the lives of vulnerable children."
                </p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Top Agencies in Region */}
      <section id="agencies" className="py-16 md:py-24 relative overflow-hidden section-muted">
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
              Top Foster Agencies in {regionName}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter">
              Connect with trusted fostering services in your local area
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {featuredAgencies.map((agency) => (
              <Card key={agency.id} className="section-card rounded-modern-xl hover-lift transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-lg glass-icon flex items-center justify-center">
                      <Heart className="w-8 h-8 text-primary-green" />
                    </div>
                    {agency.featured && (
                      <Badge className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal border-0 font-inter">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl font-poppins">{agency.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-2 font-inter">
                    <MapPin className="w-4 h-4" />
                    {agency.location.region}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4 font-inter">
                    {agency.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(agency.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2 font-inter">
                        {agency.rating} ({agency.reviewCount} reviews)
                      </span>
                    </div>
                    <Badge variant="outline" className="font-inter">{agency.type}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <a 
                      href={`tel:${agency.phone}`} 
                      className="text-primary-green text-sm font-medium hover:underline flex items-center"
                    >
                      <span className="mr-1">📞</span> Call
                    </a>
                    <a 
                      href={`mailto:${agency.email}`} 
                      className="text-primary-green text-sm font-medium hover:underline flex items-center"
                    >
                      <span className="mr-1">✉️</span> Email
                    </a>
                    <a 
                      href={agency.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-green text-sm font-medium hover:underline flex items-center"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" /> Website
                    </a>
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

      {/* Region-Specific FAQs */}
      <section className="py-16 md:py-24 section-highlight">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <BookOpen className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-medium text-text-charcoal font-inter">FAQs</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                FAQs About Fostering in {regionName}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-inter">
                Common questions about becoming a foster carer in {regionName}
              </p>
            </div>
            
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="section-card rounded-modern-xl px-6">
                  <AccordionTrigger className="text-left text-text-charcoal font-poppins hover:no-underline py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 font-inter pb-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Local Authorities & Regulation Trust Bar */}
      <section className="py-12 bg-gradient-to-r from-primary-green to-secondary-blue">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-2 font-poppins">Regulated by {currentRegionData.regulator}</h3>
                <p className="text-white/90 text-sm font-inter">
                  All agencies meet strict regulatory standards
                </p>
              </div>
              <div className="flex justify-center space-x-8">
                <div className="text-center">
                  <Shield className="w-10 h-10 text-white mx-auto mb-2" />
                  <span className="text-white text-sm font-inter">Safeguarding</span>
                </div>
                <div className="text-center">
                  <Award className="w-10 h-10 text-white mx-auto mb-2" />
                  <span className="text-white text-sm font-inter">Accredited</span>
                </div>
              </div>
              <div className="text-center md:text-right">
                <Link 
                  href={`https://www.gov.uk/fostering-${country}`}
                  className="text-white font-medium hover:underline font-inter"
                >
                  Official Government Guidance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 section-contrast">
        <div className="container mx-auto px-4">
          <Card className="section-card-contrast rounded-modern-xl p-8 md:p-12 max-w-4xl mx-auto text-center">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-text-charcoal mb-4 font-poppins">
                Ready to Start Fostering in {regionName}?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-lg mb-8 font-inter">
                Speak with a foster care advisor today to learn more about opportunities in {regionName}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 px-8 py-6 text-lg font-semibold rounded-xl btn-futuristic"
                  asChild
                >
                  <Link href="/contact">Talk to a Foster Support Advisor</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="glass font-inter px-8 py-6 text-lg"
                  asChild
                >
                  <Link href="#cities">Find Agencies Near You</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}