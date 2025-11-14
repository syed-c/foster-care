import { generateCityPaths, formatSlugToTitle, loadAllLocations } from '@/lib/locationData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { MapPin, ArrowRight, ChevronRight, Heart, Shield, Users, Star, ExternalLink, BookOpen, Award } from 'lucide-react';
import { getLocationContentByCanonicalSlug } from '@/services/locationService';
import SectionRenderer from '@/components/sections/SectionRenderer';
import { normalizeLocation } from '@/lib/normalizeLocation';

export async function generateStaticParams() {
  const paths = await generateCityPaths();
  return paths;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { country, region, city } = resolvedParams;
  const countryName = formatSlugToTitle(country);
  const regionName = formatSlugToTitle(region);
  const cityName = formatSlugToTitle(city);
  const canonicalSlug = `/foster-agency/${country}/${region}/${city}`;
  
  // Try to get content from the new location content system using canonical slug
  const rawContent = await getLocationContentByCanonicalSlug(canonicalSlug) || {};

  return {
    title: rawContent?.meta_title || `Foster Agencies in ${cityName}, ${regionName} | UK Directory`,
    description: rawContent?.meta_description || `Find foster agencies in ${cityName}, ${regionName}, ${countryName}. Browse listings and connect with trusted fostering services.`,
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
  const canonicalSlug = `/foster-agency/${country}/${region}/${city}`;
  console.log('Canonical slug:', canonicalSlug);
  
  // Try to get content from the new location content system using canonical slug
  const rawContent = await getLocationContentByCanonicalSlug(canonicalSlug) || {};
  console.log('Raw content loaded:', rawContent);
  
  // Normalize the content
  const normalizedContent = normalizeLocation(rawContent);
  console.log('Normalized content:', normalizedContent);
  
  // Check if we have any content
  const hasContent = rawContent && Object.keys(rawContent).length > 0;
  console.log('Has content:', hasContent);
  
  // If we have normalized sections, use them; otherwise, fall back to the existing displayContent
  if (normalizedContent.sections && normalizedContent.sections.length > 0) {
    console.log('Rendering dynamic sections');
    return (
      <div className="min-h-screen bg-background-offwhite">
        {/* Breadcrumb with JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateBreadcrumbSchema(cityName, regionName, countryName)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateSchemaMarkup(cityName, regionName, countryName)),
          }}
        />
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

        {/* Render dynamic sections */}
        {normalizedContent.sections.map((section) => (
          <SectionRenderer key={section.id || section.key || section.type || Math.random()} section={section} />
        ))}
      </div>
    );
  }
  
  // Fallback to existing implementation if no normalized sections
  console.log('Falling back to static content');
  
  // Ensure we have all required sections with proper structure
  const displayContent = {
    // Hero section
    hero: {
      heading: rawContent?.hero?.heading || `Foster Agencies in ${cityName}`,
      subheading: rawContent?.hero?.subheading || `Find accredited foster agencies in ${cityName}, ${regionName}`,
      cta_primary: {
        text: rawContent?.hero?.cta_primary?.text || "Talk to a Foster Advisor",
        link: rawContent?.hero?.cta_primary?.link || "/contact"
      },
      cta_secondary: {
        text: rawContent?.hero?.cta_secondary?.text || "View Agencies",
        link: rawContent?.hero?.cta_secondary?.link || "#agencies"
      }
    },
    
    // About section
    about: {
      title: rawContent?.about?.title || `About Fostering in ${cityName}`,
      body: rawContent?.about?.body || `<p>Welcome to our directory of foster agencies in ${cityName}. We've compiled a list of accredited and trusted agencies to help you start your fostering journey.</p>`
    },
    
    // Types section
    types: rawContent?.types || {
      title: `Types of Fostering Available in ${cityName}`,
      description: `Various fostering opportunities are available to suit different circumstances and preferences`,
      items: [
        {
          name: "Short-term Fostering",
          description: "Providing temporary care for children while plans are made for their future. This could last from a few days to several months."
        },
        {
          name: "Long-term Fostering",
          description: "Providing stable, long-term care for children who cannot return to their birth families. This often lasts until the child reaches adulthood."
        },
        {
          name: "Specialist Fostering",
          description: "Caring for children with specific needs, including disabilities, behavioral challenges, or those requiring therapeutic support."
        }
      ]
    },
    
    // Top Agencies section
    topAgencies: rawContent?.topAgencies || {
      title: `Top Foster Agencies in ${cityName}`,
      description: `Connect with trusted fostering services in your local area`,
      items: [
        {
          name: `${cityName} Family Care`,
          description: `Dedicated fostering service providing compassionate care for children in ${cityName}.`,
          link: "#",
          featured: true,
          type: "Local Authority",
          rating: 4.8,
          reviewCount: 42,
          phone: "+44 123 456 7890",
          email: `info@${cityName.toLowerCase().replace(/\s+/g, '')}familycare.co.uk`,
          website: `https://${cityName.toLowerCase().replace(/\s+/g, '')}familycare.co.uk`
        }
      ]
    },
    
    // Why Foster section
    whyFoster: rawContent?.whyFoster || {
      title: `Why Foster in ${cityName}?`,
      description: `Make a meaningful difference in the lives of children in your community`,
      points: [
        { 
          text: "Community Support", 
          description: `Access local support networks and resources specific to ${cityName}` 
        },
        { 
          text: "Professional Training", 
          description: `Receive specialized training from ${getRegulatorForCountry(country)} approved programs` 
        },
        { 
          text: "Lasting Impact", 
          description: `Contribute to positive outcomes for vulnerable children in ${cityName}` 
        }
      ]
    },
    
    // Allowances section
    allowances: rawContent?.allowances || {
      title: `Foster Allowances & Support in ${cityName}`,
      description: `Comprehensive support system for foster carers in ${cityName}`,
      items: [
        {
          title: "Weekly fostering allowances to cover child care costs",
          description: "Receive weekly fostering allowances to cover the costs of caring for a child."
        },
        {
          title: "Additional payments for special circumstances",
          description: "Additional payments for special circumstances."
        }
      ]
    },
    
    // Resources section
    resources: rawContent?.resources || {
      title: `Local Support & Resources in ${cityName}`,
      description: `Access community resources and support networks in ${cityName}`,
      items: [
        {
          title: `${regionName} ${getLocalAuthority(country)}`,
          link: "#",
          description: `The local authority provides additional resources and support for foster carers in ${cityName}.`
        }
      ]
    },
    
    // FAQs section
    faqs: rawContent?.faqs || {
      title: `FAQs About Fostering in ${cityName}`,
      description: `Common questions about becoming a foster carer in ${cityName}`,
      items: [
        {
          question: `How do I find foster agencies in ${cityName}?`,
          answer: `There are several ways to find foster agencies in ${cityName}. You can browse our directory above, contact your local authority (${getRegulatorForCountry(country)}) for recommendations, or search online for local fostering services. Most agencies offer initial consultations to discuss your interest in fostering.`
        },
        {
          question: `Who can foster a child in ${cityName}?`,
          answer: `To foster in ${cityName}, you must be over 21, have a spare room, pass background checks, and complete training. You can be single, married, in a relationship, working, or retired. ${getRegulatorForCountry(country)} sets the standards for approval.`
        }
      ]
    },
    
    // Regulated section
    regulated: rawContent?.regulated || {
      regulator: getRegulatorForCountry(country),
      description: "All agencies meet strict regulatory standards"
    },
    
    // CTA section
    cta: rawContent?.cta || {
      title: `Ready to Start Fostering in ${cityName}?`,
      description: `Speak with a foster care advisor today to learn more about opportunities in ${cityName}`,
      cta_primary: {
        text: "Talk to a Foster Advisor",
        link: "/contact"
      },
      cta_secondary: {
        text: `View Agencies in ${cityName}`,
        link: "#agencies"
      }
    }
  };

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
  const faqs = displayContent?.faqs?.items || [
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
      {/* Breadcrumb with JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateBreadcrumbSchema(cityName, regionName, countryName)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateSchemaMarkup(cityName, regionName, countryName)),
        }}
      />
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
      {displayContent?.hero && (
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
                {displayContent.hero.heading}
              </h1>
              <p className="text-xl text-gray-600 mb-8 font-inter">
                {displayContent.hero.subheading}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 px-8 py-6 text-lg font-semibold rounded-xl btn-futuristic"
                  asChild
                >
                  <Link href={displayContent.hero.cta_primary.link}>{displayContent.hero.cta_primary.text}</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="glass font-inter px-8 py-6 text-lg"
                  asChild
                >
                  <Link href={displayContent.hero.cta_secondary.link}>{displayContent.hero.cta_secondary.text}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* City Overview Content */}
      {displayContent?.about && (
        <section className="py-16 section-alt">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                  <BookOpen className="w-4 h-4 text-primary-green" />
                  <span className="text-sm font-medium text-text-charcoal font-inter">About Fostering</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                  {displayContent.about.title}
                </h2>
              </div>
              
              <Card className="section-card rounded-modern-xl p-6 md:p-8">
                <div className="prose max-w-none text-gray-600 font-inter">
                  {displayContent.about.body ? (
                    <div dangerouslySetInnerHTML={{ __html: displayContent.about.body }} />
                  ) : (
                    <div className="space-y-4">
                      <p>
                        Welcome to our directory of foster agencies in {cityName}. We've compiled a list of accredited and trusted agencies 
                        to help you start your fostering journey. Fostering in {cityName} offers a rewarding opportunity to make a positive 
                        impact on a child's life while being part of a supportive community.
                      </p>
                      
                      <h3 className="text-xl font-bold text-text-charcoal mt-6">Local Support and Resources</h3>
                      <p>
                        {cityName} is supported by the local {getLocalAuthority(country)}, which provides additional resources and 
                        support for foster carers. The authority works closely with fostering agencies to ensure children receive 
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
                        {cityName} has a continuous need for foster families to provide care for children and young people. 
                        The demand varies throughout the year, but there is always a need for dedicated carers who can provide 
                        stable, loving homes. Local agencies work with the authority to match children with suitable 
                        foster families.
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Types of Fostering in City */}
      {displayContent?.types && (
        <section className="py-16 md:py-24 section-highlight">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                  <Heart className="w-4 h-4 text-primary-green" />
                  <span className="text-sm font-medium text-text-charcoal font-inter">Fostering Types</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                  {displayContent.types.title}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto font-inter">
                  {displayContent.types.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(displayContent.types.items || []).map((type, index) => (
                  <Card key={index} className="section-card rounded-modern-xl p-6 hover-lift transition-all">
                    <h3 className="text-lg font-bold text-text-charcoal mb-3 font-poppins">{type.name}</h3>
                    <p className="text-gray-600 text-sm font-inter">{type.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Top Agencies in City */}
      {displayContent?.topAgencies && (
        <section id="agencies" className="py-16 md:py-24 relative overflow-hidden section-contrast">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl float-animation" />
            <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-secondary-blue/5 rounded-full blur-3xl float-animation" style={{ animationDelay: "1.5s" }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <Star className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-medium text-text-charcoal font-inter">Top Agencies</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                {displayContent.topAgencies.title}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-inter">
                {displayContent.topAgencies.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {(displayContent.topAgencies.items || featuredAgencies).map((agency, index) => (
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
                    {agency.description}
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
          </div>
        </section>
      )}

      {/* Why Foster in City */}
      {displayContent?.whyFoster && (
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary-green to-secondary-blue text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <Heart className="w-4 h-4 text-white" />
                <span className="text-sm font-medium font-inter">Why Foster</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">
                {displayContent.whyFoster.title}
              </h2>
              <p className="text-xl font-inter text-white/90">
                {displayContent.whyFoster.description}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {(displayContent.whyFoster.points || []).map((point, index) => (
                <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 rounded-modern-xl p-6 hover-lift transition-all">
                  <h3 className="text-xl font-bold mb-3 font-poppins">{point.text}</h3>
                  <p className="text-white/80 font-inter">{point.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Foster Allowances & Support in City */}
      {displayContent?.allowances && (
        <section className="py-16 md:py-24 section-alt">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                  <Award className="w-4 h-4 text-primary-green" />
                  <span className="text-sm font-medium text-text-charcoal font-inter">Allowances & Support</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                  {displayContent.allowances.title}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto font-inter">
                  {displayContent.allowances.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(displayContent.allowances.items || []).map((item, index) => (
                  <Card key={index} className="section-card rounded-modern-xl p-6">
                    <h3 className="text-lg font-bold text-text-charcoal mb-2 font-poppins">{item.title}</h3>
                    <p className="text-gray-600 font-inter">{item.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Local Support & Resources */}
      {displayContent?.resources && (
        <section className="py-16 md:py-24 section-highlight">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                  <Shield className="w-4 h-4 text-primary-green" />
                  <span className="text-sm font-medium text-text-charcoal font-inter">Local Resources</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                  {displayContent.resources.title}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto font-inter">
                  {displayContent.resources.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(displayContent.resources.items || []).map((resource, index) => (
                  <Card key={index} className="section-card rounded-modern-xl p-6 hover-lift transition-all">
                    <h3 className="text-lg font-bold text-text-charcoal mb-2 font-poppins">{resource.title}</h3>
                    <p className="text-gray-600 mb-4 font-inter">{resource.description}</p>
                    <Button size="sm" variant="outline" className="font-inter" asChild>
                      <Link href={resource.link || "#"}>
                        Learn More
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {displayContent?.faqs && (
        <section className="py-16 md:py-24 section-alt">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                  <Users className="w-4 h-4 text-primary-green" />
                  <span className="text-sm font-medium text-text-charcoal font-inter">FAQs</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                  {displayContent.faqs.title}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto font-inter">
                  {displayContent.faqs.description}
                </p>
              </div>
              
              <Accordion type="single" collapsible className="space-y-4">
                {(displayContent.faqs.items || faqs).map((faq, index) => (
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
      )}

      {/* Trust Assurance / Regulation Bar */}
      {displayContent?.regulated && (
        <section className="py-8 bg-gray-50 border-t border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <Shield className="w-6 h-6 text-primary-green mr-3" />
                <span className="font-medium text-text-charcoal font-inter">
                  Regulated by {displayContent.regulated.regulator}
                </span>
              </div>
              <p className="text-gray-600 text-sm font-inter">
                {displayContent.regulated.description}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      {displayContent?.cta && (
        <section className="py-16 md:py-24 bg-gradient-to-r from-secondary-blue to-primary-green text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-1/3 h-full bg-gradient-to-r from-white/10 to-transparent" />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-poppins">
                {displayContent.cta.title}
              </h2>
              <p className="text-xl mb-8 font-inter text-white/90">
                {displayContent.cta.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="bg-white text-text-charcoal hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-xl font-inter" asChild>
                  <Link href={displayContent.cta.cta_primary.link}>
                    {displayContent.cta.cta_primary.text}
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="glass text-white border-white hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-xl font-inter" asChild>
                  <Link href={displayContent.cta.cta_secondary.link}>
                    {displayContent.cta.cta_secondary.text}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}