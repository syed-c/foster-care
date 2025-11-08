import { generateCityPaths, formatSlugToTitle, loadAllLocations } from '@/lib/locationData';
import { ensureContentExists } from '@/lib/cms';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { MapPin, ArrowRight, ChevronRight, Heart, Shield, Users, Star, ExternalLink, BookOpen, Award } from 'lucide-react';

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

  // Get city name from structure
  const structure = await loadAllLocations();
  const cityName = structure[country] && structure[country].regions[region] && structure[country].regions[region].cities[city] ? 
    structure[country].regions[region].cities[city].name : formatSlugToTitle(city);

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

function generateBreadcrumbSchema(cityName, regionName, countryName) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://www.example.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Foster Agencies',
        item: 'https://www.example.com/foster-agency',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: countryName,
        item: `https://www.example.com/foster-agency/${countryName.toLowerCase()}`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: regionName,
        item: `https://www.example.com/foster-agency/${countryName.toLowerCase()}/${regionName.toLowerCase()}`,
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: cityName,
        item: `https://www.example.com/foster-agency/${countryName.toLowerCase()}/${regionName.toLowerCase()}/${cityName.toLowerCase()}`,
      },
    ],
  };
}

export default async function CityPage({ params }) {
  const resolvedParams = await params;
  const { country, region, city } = resolvedParams;
  
  // Get city data from structure
  const structure = await loadAllLocations();
  const cityData = structure[country] && structure[country].regions[region] && structure[country].regions[region].cities[city] ? 
    structure[country].regions[region].cities[city] : null;
  
  const cityName = cityData ? cityData.name : formatSlugToTitle(city);
  const countryName = formatSlugToTitle(country);
  const regionName = formatSlugToTitle(region);
  const slug = `${country}/${region}/${city}`;
  const content = ensureContentExists(slug);

  if (!cityData) {
    notFound();
  }

  // Mock agencies data - in a real app, this would come from an API
  const featuredAgencies = [
    {
      id: 1,
      name: `${cityName} Family Care`,
      location: { city: cityName },
      description: `Dedicated fostering service providing compassionate care for children in ${cityName}.`,
      rating: 4.8,
      reviewCount: 42,
      type: "Local Authority",
      featured: true,
      phone: "+44 123 456 7890",
      email: `info@${cityName.toLowerCase().replace(/\s+/g, '')}familycare.co.uk`,
      website: `https://${cityName.toLowerCase().replace(/\s+/g, '')}familycare.co.uk`
    },
    {
      id: 2,
      name: `Bright Futures ${cityName}`,
      location: { city: cityName },
      description: `Specialist in caring for teenagers and sibling groups in the ${cityName} area.`,
      rating: 4.6,
      reviewCount: 38,
      type: "Private",
      featured: false,
      phone: "+44 123 456 7891",
      email: `contact@brightfutures${cityName.toLowerCase().replace(/\s+/g, '')}.co.uk`,
      website: `https://brightfutures${cityName.toLowerCase().replace(/\s+/g, '')}.co.uk`
    },
    {
      id: 3,
      name: `${cityName} Community Fostering`,
      location: { city: cityName },
      description: `Community-focused fostering service with personalized support for carers and children.`,
      rating: 4.9,
      reviewCount: 27,
      type: "Independent",
      featured: true,
      phone: "+44 123 456 7892",
      email: `hello@${cityName.toLowerCase().replace(/\s+/g, '')}communityfostering.org`,
      website: `https://${cityName.toLowerCase().replace(/\s+/g, '')}communityfostering.org`
    }
  ];

  // Mock FAQs - in a real app, this would come from content management
  const faqs = content?.faqs || [
    {
      question: `How do I find foster agencies in ${cityName}?`,
      answer: `There are several ways to find foster agencies in ${cityName}. You can browse our directory above, contact your local authority (${getRegulatorForCountry(country)}) for recommendations, or search online for local fostering services. Most agencies offer initial consultations to discuss your interest in fostering.`
    },
    {
      question: `Who can foster a child in ${cityName}?`,
      answer: `To foster in ${cityName}, you must be over 21, have a spare room, pass background checks, and complete training. You can be single, married, in a relationship, working, or retired. ${getRegulatorForCountry(country)} sets the standards for approval.`
    },
    {
      question: `Can single people foster in ${cityName}?`,
      answer: `Yes, single people can foster in ${cityName}. What matters most is your ability to provide a stable, loving home for a child in need. All applicants go through the same assessment and approval process regardless of marital status.`
    },
    {
      question: `What support is available for foster carers in ${cityName}?`,
      answer: `Foster carers in ${cityName} receive ongoing support including 24/7 helplines, regular supervision, training opportunities, and access to support groups. Agencies also provide financial allowances and respite care.`
    },
    {
      question: `How much are foster carers paid in ${cityName}?`,
      answer: `Foster carers in ${cityName} receive a fostering allowance to cover the costs of caring for a child. The amount varies depending on the agency and the child's needs. For specific figures, contact agencies directly as allowances can vary.`
    }
  ];

  // Get regulator for the country
  function getRegulatorForCountry(countrySlug) {
    const regulators = {
      'england': 'Ofsted',
      'scotland': 'Care Inspectorate',
      'wales': 'CSSIW',
      'northern-ireland': 'NICCY'
    };
    return regulators[countrySlug] || 'the relevant local authority';
  }

  // Get local authority for the country
  function getLocalAuthority(countrySlug) {
    const authorities = {
      'england': 'County Council',
      'scotland': 'Local Authority',
      'wales': 'County Council',
      'northern-ireland': 'Health and Social Care Trust'
    };
    return authorities[countrySlug] || 'Local Authority';
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
            <Link href={`/foster-agency/${country}/${region}`} className="hover:text-primary-green transition-colors">{regionName}</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-text-charcoal font-medium">{cityName}</span>
          </nav>
        </div>
      </div>

      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateSchemaMarkup(cityName, regionName, countryName)),
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(cityName, regionName, countryName)),
        }}
      />

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
              <span className="text-sm font-medium text-text-charcoal font-inter">{cityName}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-text-charcoal mb-6 font-poppins">
              {content?.h1 || `Foster Agencies in ${cityName}`}
            </h1>
            <p className="text-xl text-gray-600 mb-8 font-inter">
              {content?.hero_text || `Find accredited foster agencies in ${cityName}, ${regionName}`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 px-8 py-6 text-lg font-semibold rounded-xl btn-futuristic"
                asChild
              >
                <Link href="/contact">Talk to a Foster Advisor</Link>
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

      {/* City Overview Content */}
      <section className="py-16 section-alt">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <BookOpen className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-medium text-text-charcoal font-inter">About Fostering</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                About Fostering in {cityName}
              </h2>
            </div>
            
            <Card className="section-card rounded-modern-xl p-6 md:p-8">
              <div className="prose max-w-none text-gray-600 font-inter">
                {content?.intro_text ? (
                  <div dangerouslySetInnerHTML={{ __html: content.intro_text }} />
                ) : (
                  <div className="space-y-4">
                    <p>
                      {cityName} has a growing need for dedicated foster carers to provide stable, loving homes for children and young people. 
                      The local {getLocalAuthority(country)} works closely with fostering agencies to ensure children receive the best possible care 
                      within their local communities.
                    </p>
                    
                    <h3 className="text-xl font-bold text-text-charcoal mt-6">Local Foster Care Demand</h3>
                    <p>
                      {cityName} and the surrounding areas have a continuous demand for foster families across all age groups. 
                      There is a particular need for carers who can provide specialized support for teenagers, sibling groups, 
                      and children with additional needs. The local authority regularly assesses the demand to ensure 
                      sufficient foster placements are available.
                    </p>
                    
                    <h3 className="text-xl font-bold text-text-charcoal mt-6">Local Demographics</h3>
                    <p>
                      {cityName} is a vibrant community with diverse demographics. The city has a mix of urban and suburban areas, 
                      with strong community networks that support both families and children in care. The local authority 
                      recognizes the importance of matching children with foster families who understand the local culture 
                      and can provide culturally appropriate care.
                    </p>
                    
                    <h3 className="text-xl font-bold text-text-charcoal mt-6">Support from {regionName} {getLocalAuthority(country)}</h3>
                    <p>
                      The {regionName} {getLocalAuthority(country)} provides additional resources and support for foster carers in {cityName}. 
                      This includes access to training programs, support groups, and regular check-ins to ensure both carers 
                      and children are thriving in their placements. The council works closely with fostering agencies to 
                      maintain high standards of care.
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Types of Fostering in City */}
      <section className="py-16 md:py-24 section-highlight">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <Users className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-medium text-text-charcoal font-inter">Fostering Types</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                Types of Fostering Available in {cityName}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-inter">
                Various fostering opportunities are available to suit different circumstances and preferences
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="section-card rounded-modern-xl p-6">
                <h3 className="text-xl font-bold text-text-charcoal mb-4 font-poppins flex items-center">
                  <Heart className="w-5 h-5 text-primary-green mr-2" />
                  Short-term Fostering
                </h3>
                <p className="text-gray-600 mb-4 font-inter">
                  Providing temporary care for children while plans are made for their future. 
                  This could last from a few days to several months.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-primary-green/10 flex items-center justify-center mr-2">
                      <span className="text-primary-green text-xs">✓</span>
                    </div>
                    <span>Emergency placements</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-primary-green/10 flex items-center justify-center mr-2">
                      <span className="text-primary-green text-xs">✓</span>
                    </div>
                    <span>Respite care for birth families</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="section-card rounded-modern-xl p-6">
                <h3 className="text-xl font-bold text-text-charcoal mb-4 font-poppins flex items-center">
                  <Shield className="w-5 h-5 text-primary-green mr-2" />
                  Long-term Fostering
                </h3>
                <p className="text-gray-600 mb-4 font-inter">
                  Providing stable, long-term care for children who cannot return to their birth families. 
                  This often lasts until the child reaches adulthood.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-primary-green/10 flex items-center justify-center mr-2">
                      <span className="text-primary-green text-xs">✓</span>
                    </div>
                    <span>Permanent placements</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-primary-green/10 flex items-center justify-center mr-2">
                      <span className="text-primary-green text-xs">✓</span>
                    </div>
                    <span>Support through adolescence</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="section-card rounded-modern-xl p-6">
                <h3 className="text-xl font-bold text-text-charcoal mb-4 font-poppins flex items-center">
                  <Star className="w-5 h-5 text-primary-green mr-2" />
                  Specialist Fostering
                </h3>
                <p className="text-gray-600 mb-4 font-inter">
                  Caring for children with specific needs, including disabilities, behavioral challenges, 
                  or those requiring therapeutic support.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-primary-green/10 flex items-center justify-center mr-2">
                      <span className="text-primary-green text-xs">✓</span>
                    </div>
                    <span>Therapeutic care</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-primary-green/10 flex items-center justify-center mr-2">
                      <span className="text-primary-green text-xs">✓</span>
                    </div>
                    <span>Parent and baby placements</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="section-card rounded-modern-xl p-6">
                <h3 className="text-xl font-bold text-text-charcoal mb-4 font-poppins flex items-center">
                  <Award className="w-5 h-5 text-primary-green mr-2" />
                  Foster-to-Adopt
                </h3>
                <p className="text-gray-600 mb-4 font-inter">
                  Initially fostering a child with the possibility of adoption if the court decides 
                  it's in the child's best interests.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-primary-green/10 flex items-center justify-center mr-2">
                      <span className="text-primary-green text-xs">✓</span>
                    </div>
                    <span>Pathway to adoption</span>
                  </li>
                  <li className="flex items-center">
                    <div className="w-5 h-5 rounded-full bg-primary-green/10 flex items-center justify-center mr-2">
                      <span className="text-primary-green text-xs">✓</span>
                    </div>
                    <span>Legal support throughout process</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Top Agencies in City */}
      <section id="agencies" className="py-16 md:py-24 relative overflow-hidden section-contrast">
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
              Top Foster Agencies in {cityName}
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
                    {agency.location.city}
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

      {/* Why Foster in City */}
      <section className="py-16 section-alt">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Heart className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">Why Foster</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
              Why Foster in {cityName}?
            </h2>
            <p className="text-gray-600 mb-12 font-inter">
              Make a meaningful difference in the lives of children in your community
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-green" />
                </div>
                <h3 className="text-xl font-bold text-text-charcoal mb-3 font-poppins">Community Support</h3>
                <p className="text-gray-600 font-inter">
                  Access local support networks and resources specific to {cityName}
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-primary-green" />
                </div>
                <h3 className="text-xl font-bold text-text-charcoal mb-3 font-poppins">Professional Training</h3>
                <p className="text-gray-600 font-inter">
                  Receive specialized training from {getRegulatorForCountry(country)} approved programs
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-primary-green" />
                </div>
                <h3 className="text-xl font-bold text-text-charcoal mb-3 font-poppins">Lasting Impact</h3>
                <p className="text-gray-600 font-inter">
                  Contribute to positive outcomes for vulnerable children in {cityName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Foster Allowances & Support in City */}
      <section className="py-16 md:py-24 section-highlight">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <Award className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-medium text-text-charcoal font-inter">Allowances & Support</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                Foster Allowances & Support in {cityName}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-inter">
                Comprehensive support system for foster carers in {cityName}
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
            </div>
            
            <Card className="section-card rounded-modern-xl p-6 mt-8">
              <h3 className="text-xl font-bold text-text-charcoal mb-4 font-poppins">
                Who Pays Foster Carers in {cityName}?
              </h3>
              <p className="text-gray-600 font-inter">
                Foster carers in {cityName} are paid by their fostering agency. The fostering allowance is intended to 
                cover the costs of caring for a child, including food, clothing, and personal expenses. The exact amount 
                varies depending on the agency, the child's age, and their specific needs. All payments are subject to 
                income tax and national insurance, but many carers are eligible for tax exemptions.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Local Support & Resources */}
      <section className="py-16 section-contrast">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <MapPin className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-medium text-text-charcoal font-inter">Local Resources</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                Local Support & Resources in {cityName}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-inter">
                Access community resources and support networks in {cityName}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="section-card rounded-modern-xl p-6">
                <h3 className="text-xl font-bold text-text-charcoal mb-4 font-poppins flex items-center">
                  <Shield className="w-5 h-5 text-primary-green mr-2" />
                  {regionName} {getLocalAuthority(country)}
                </h3>
                <p className="text-gray-600 mb-4 font-inter">
                  The local authority provides additional resources and support for foster carers in {cityName}. 
                  This includes access to training programs, support groups, and regular check-ins.
                </p>
                <Button variant="outline" className="font-inter" asChild>
                  <Link href={`https://www.${regionName.toLowerCase().replace(/\s+/g, '')}.gov.uk/fostering`}>
                    Visit Official Website <ExternalLink className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </Card>
              
              <Card className="section-card rounded-modern-xl p-6">
                <h3 className="text-xl font-bold text-text-charcoal mb-4 font-poppins flex items-center">
                  <Users className="w-5 h-5 text-primary-green mr-2" />
                  Foster Carer Communities
                </h3>
                <p className="text-gray-600 mb-4 font-inter">
                  Connect with other foster carers in {cityName} through local support groups and community networks. 
                  These groups provide peer support, shared experiences, and social connections.
                </p>
                <Button variant="outline" className="font-inter" asChild>
                  <Link href="/contact">
                    Find Local Groups <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </Card>
              
              <Card className="section-card rounded-modern-xl p-6">
                <h3 className="text-xl font-bold text-text-charcoal mb-4 font-poppins flex items-center">
                  <BookOpen className="w-5 h-5 text-primary-green mr-2" />
                  Training Centres
                </h3>
                <p className="text-gray-600 mb-4 font-inter">
                  Access specialized training programs and workshops at local training centres in {cityName}. 
                  These facilities offer both initial training for new carers and continuing education.
                </p>
                <Button variant="outline" className="font-inter" asChild>
                  <Link href="/contact">
                    Locate Training Centres <MapPin className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </Card>
              
              <Card className="section-card rounded-modern-xl p-6">
                <h3 className="text-xl font-bold text-text-charcoal mb-4 font-poppins flex items-center">
                  <Heart className="w-5 h-5 text-primary-green mr-2" />
                  Support Networks
                </h3>
                <p className="text-gray-600 mb-4 font-inter">
                  Benefit from comprehensive support networks including 24/7 helplines, regular supervision, 
                  and access to specialist services when needed.
                </p>
                <Button variant="outline" className="font-inter" asChild>
                  <Link href="/contact">
                    Access Support Services <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 section-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <BookOpen className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-medium text-text-charcoal font-inter">FAQs</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                FAQs About Fostering in {cityName}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-inter">
                Common questions about becoming a foster carer in {cityName}
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

      {/* Trust Assurance / Regulation Bar */}
      <section className="py-12 bg-gradient-to-r from-primary-green to-secondary-blue">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="text-center md:text-left">
                <h3 className="text-xl font-bold text-white mb-2 font-poppins">Regulated by {getRegulatorForCountry(country)}</h3>
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
      <section className="py-16 md:py-24 section-alt">
        <div className="container mx-auto px-4">
          <Card className="section-card-contrast rounded-modern-xl p-8 md:p-12 max-w-4xl mx-auto text-center">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-text-charcoal mb-4 font-poppins">
                Ready to Start Fostering in {cityName}?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-lg mb-8 font-inter">
                Speak with a foster care advisor today to learn more about opportunities in {cityName}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 px-8 py-6 text-lg font-semibold rounded-xl btn-futuristic"
                  asChild
                >
                  <Link href="/contact">Talk to a Foster Advisor</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="glass font-inter px-8 py-6 text-lg"
                  asChild
                >
                  <Link href="#agencies">View Agencies in {cityName}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}