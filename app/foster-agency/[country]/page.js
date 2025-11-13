import { generateCountryPaths, loadRegionsForCountry, formatSlugToTitle, buildLocationStructure, getRegionsForCountry, loadAllLocations } from '@/lib/locationData';
import { getLocationContentByCanonicalSlug } from '@/services/locationService';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, ChevronRight, Heart, Users, BookOpen, Award, Shield, Search, Star, ExternalLink } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Badge } from '@/components/ui/badge';
import SectionRenderer from '@/components/sections/SectionRenderer';
import { normalizeLocation } from '@/lib/normalizeLocation';

export async function generateStaticParams() {
  const paths = await generateCountryPaths();
  return paths;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const country = resolvedParams.country;
  const countryName = formatSlugToTitle(country);
  const canonicalSlug = `/foster-agency/${country}`;
  
  // Try to get content from the new location content system using canonical slug
  const content = await getLocationContentByCanonicalSlug(canonicalSlug) || {};

  return {
    title: content?.meta_title || content?.title || `Foster Agencies in ${countryName} | UK Directory`,
    description: content?.meta_description || `Find foster agencies in ${countryName}. Browse regions and cities to discover fostering services near you.`,
  };
}

export default async function CountryPage({ params }) {
  console.log('COUNTRY PAGE LOADED WITH PARAMS:', params);
  const resolvedParams = await params;
  const country = resolvedParams.country;
  console.log('Country:', country);
  
  // Use the optimized data loading function
  const structure = await loadAllLocations();
  
  // Get regions for this country from the structure
  const regions = structure[country] ? Object.entries(structure[country].regions).map(([slug, region]) => ({
    slug,
    name: region.name
  })) : [];
  
  const countryName = formatSlugToTitle(country);
  const canonicalSlug = `/foster-agency/${country}`;
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
      heading: content?.hero?.heading || `Foster Agencies in ${countryName}`,
      subheading: content?.hero?.subheading || `Find accredited foster agencies in ${countryName}`,
      cta_primary: {
        text: content?.hero?.cta_primary?.text || "Get Foster Agency Support",
        link: content?.hero?.cta_primary?.link || "/contact"
      },
      cta_secondary: {
        text: content?.hero?.cta_secondary?.text || "Explore Regions",
        link: content?.hero?.cta_secondary?.link || "#regions"
      }
    },
    
    // Overview section
    overview: {
      title: content?.overview?.title || `About Fostering in ${countryName}`,
      body: content?.overview?.body || `<p>Welcome to our directory of foster agencies in ${countryName}. We've compiled a list of accredited and trusted agencies to help you start your fostering journey.</p>`
    },
    
    // Agency Finder section
    agencyFinder: content?.agencyFinder || {
      title: `Foster Agency Finder by Region`,
      intro: `Discover the best foster agencies across ${countryName} by region. Our comprehensive directory helps you find the perfect match for your fostering journey.`,
      ctaText: "Find Agencies by Region"
    },
    
    // Popular Locations section
    popularLocations: content?.popularLocations || {
      title: `Featured Popular Locations in ${countryName}`,
      description: `Discover top cities and towns in ${countryName} with high demand for foster carers`,
      locations: [
        { name: "London", link: "#", demand: "High", agencies: "200+" },
        { name: "Manchester", link: "#", demand: "High", agencies: "75+" },
        { name: "Birmingham", link: "#", demand: "High", agencies: "65+" }
      ]
    },
    
    // Top Agencies section
    topAgencies: content?.topAgencies || {
      title: `Top Foster Agencies in ${countryName}`,
      description: `Connect with trusted fostering services across ${countryName}`,
      items: [
        {
          name: `${countryName} Family Care`,
          summary: `Dedicated fostering service providing compassionate care for children in ${countryName}.`,
          link: "#",
          featured: true,
          type: "National",
          rating: 4.8,
          reviewCount: 42,
          phone: "+44 123 456 7890",
          email: `info@${countryName.toLowerCase().replace(/\s+/g, '')}familycare.co.uk`,
          website: `https://${countryName.toLowerCase().replace(/\s+/g, '')}familycare.co.uk`
        }
      ]
    },
    
    // Foster System section
    fosterSystem: content?.fosterSystem || {
      title: `What is the Foster Care System Like in ${countryName}?`,
      sections: [
        {
          title: "Allowances & Support",
          items: [
            { title: "Weekly fostering allowances to cover child care costs" },
            { title: "24/7 support helpline for emergency assistance" },
            { title: "Regular supervision and mentoring" },
            { title: "Access to training and professional development" }
          ]
        },
        {
          title: "Matching Process",
          items: [
            { title: "Initial enquiry and information session" },
            { title: "Formal application and documentation" },
            { title: "Home study and assessment" },
            { title: "Approval panel review" }
          ]
        }
      ]
    },
    
    // Why Foster section
    whyFoster: content?.whyFoster || {
      title: `Why Choose to Foster in ${countryName}?`,
      description: `Make a meaningful difference in the lives of children in your community`,
      points: [
        { 
          text: "Help Children Locally", 
          description: "Provide stable, loving homes for children in your own community who need care and support." 
        },
        { 
          text: "Professional Support", 
          description: "Access comprehensive training, 24/7 support, and ongoing guidance from experienced professionals." 
        },
        { 
          text: "Make a Lasting Impact", 
          description: "Contribute to positive outcomes for vulnerable children and strengthen your local community." 
        }
      ]
    },
    
    // FAQs section
    faqs: content?.faqs || {
      title: `FAQs About Fostering in ${countryName}`,
      description: `Common questions about becoming a foster carer in ${countryName}`,
      items: [
        {
          question: `Do you get paid to foster in ${countryName}?`,
          answer: `Yes, foster carers in ${countryName} receive a fostering allowance to cover the costs of caring for a child. The amount varies depending on the agency and the child's needs, typically ranging from £400-£600 per week per child.`
        },
        {
          question: `Who can foster in ${countryName}?`,
          answer: `To foster in ${countryName}, you must be over 21, have a spare room, pass background checks, and complete training. You can be single, married, in a relationship, working, or retired. ${currentCountryData.regulator} sets the standards for approval.`
        }
      ]
    },
    
    // Regulated section
    regulated: content?.regulated || {
      regulator: currentCountryData.regulator,
      description: "All agencies meet strict regulatory standards"
    },
    
    // Find Agencies section
    findAgencies: content?.findAgencies || {
      title: "Find Agencies Near You",
      description: `Connect with local fostering services in ${countryName}`
    }
  };

  if (regions.length === 0) {
    // Fallback to individual loading if structure is empty
    const regionsData = await loadRegionsForCountry(country);
    if (regionsData.length === 0) {
      notFound();
    }
    // Use regionsData if available
    var regionsToShow = regionsData.map(r => ({ slug: r.slug, name: r.name }));
  } else {
    // Use regions from structure
    var regionsToShow = regions;
  }

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

  // FAQs for each country
  const faqs = content?.faqs?.items || content?.faqs || [
    {
      question: "Do you get paid to foster in " + countryName + "?",
      answer: "Yes, foster carers in " + countryName + " receive a fostering allowance to cover the costs of caring for a child. The amount varies depending on the agency and the child's needs, typically ranging from £400-£600 per week per child."
    },
    {
      question: "Who can foster in " + countryName + "?",
      answer: "To foster in " + countryName + ", you must be over 21, have a spare room, pass background checks, and complete training. You can be single, married, in a relationship, working, or retired. " + currentCountryData.regulator + " sets the standards for approval."
    },
    {
      question: "How long is the fostering approval process in " + countryName + "?",
      answer: "The fostering approval process in " + countryName + " typically takes 4-6 months. This includes initial enquiry, application, assessments, training, and panel review by " + currentCountryData.regulator + "."
    },
    {
      question: "What support is available for foster carers in " + countryName + "?",
      answer: "Foster carers in " + countryName + " receive ongoing support including 24/7 helplines, regular supervision, training opportunities, and access to support groups. Agencies also provide financial allowances and respite care."
    }
  ];

  // Pagination logic for regions
  const regionsPerPage = 6;
  const totalPages = Math.ceil(regionsToShow.length / regionsPerPage);

  // Mock agencies data - in a real app, this would come from an API
  const featuredAgencies = [
    {
      id: 1,
      name: `${countryName} Family Care`,
      location: { country: countryName },
      description: `Dedicated fostering service providing compassionate care for children in ${countryName}.`,
      rating: 4.8,
      reviewCount: 42,
      type: "National",
      featured: true,
      phone: "+44 123 456 7890",
      email: `info@${countryName.toLowerCase().replace(/\s+/g, '')}familycare.co.uk`,
      website: `https://${countryName.toLowerCase().replace(/\s+/g, '')}familycare.co.uk`
    },
    {
      id: 2,
      name: `Bright Futures ${countryName}`,
      location: { country: countryName },
      description: `Specialist in caring for teenagers and sibling groups across ${countryName}.`,
      rating: 4.6,
      reviewCount: 38,
      type: "Private",
      featured: false,
      phone: "+44 123 456 7891",
      email: `contact@brightfutures${countryName.toLowerCase().replace(/\s+/g, '')}.co.uk`,
      website: `https://brightfutures${countryName.toLowerCase().replace(/\s+/g, '')}.co.uk`
    },
    {
      id: 3,
      name: `${countryName} Community Fostering`,
      location: { country: countryName },
      description: `Community-focused fostering service with personalized support for carers and children across ${countryName}.`,
      rating: 4.9,
      reviewCount: 27,
      type: "Independent",
      featured: true,
      phone: "+44 123 456 7892",
      email: `hello@${countryName.toLowerCase().replace(/\s+/g, '')}communityfostering.org`,
      website: `https://${countryName.toLowerCase().replace(/\s+/g, '')}communityfostering.org`
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
              {content?.title || `Foster Agencies in ${countryName}`}
            </h1>
            <p className="text-xl text-gray-600 mb-8 font-inter">
              {content?.meta_description || `Find accredited foster agencies in ${countryName}`}
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

      {/* Overview of Fostering in Country */}
      {content?.overview && (
        <section className="py-16 section-alt">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                  <BookOpen className="w-4 h-4 text-primary-green" />
                  <span className="text-sm font-medium text-text-charcoal font-inter">About Fostering</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                  {content.overview.title || `About Fostering in ${countryName}`}
                </h2>
              </div>
              
              <Card className="section-card rounded-modern-xl p-6 md:p-8">
                <div className="prose max-w-none text-gray-600 font-inter">
                  {content.overview.body ? (
                    <div dangerouslySetInnerHTML={{ __html: content.overview.body }} />
                  ) : (
                    <div className="space-y-4">
                      <p>
                        {currentCountryData.description} With a population of {currentCountryData.population}, 
                        there is a significant need for dedicated foster carers across the region.
                      </p>
                      
                      <h3 className="text-xl font-bold text-text-charcoal mt-6">Regulation and Oversight</h3>
                      <p>
                        Fostering in {countryName} is regulated by {currentCountryData.regulator}, which ensures 
                        all foster agencies meet strict standards for safety, quality, and care. {currentCountryData.regulator} 
                        conducts regular inspections and provides guidance to maintain the highest standards.
                      </p>
                      
                      <h3 className="text-xl font-bold text-text-charcoal mt-6">Types of Fostering Available</h3>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Short-term emergency care</li>
                        <li>Long-term placements</li>
                        <li>Respite care for families</li>
                        <li>Parent and baby placements</li>
                        <li>Teenage-focused fostering</li>
                        <li>Specialist care for children with additional needs</li>
                      </ul>
                      
                      <h3 className="text-xl font-bold text-text-charcoal mt-6">Requirements to Foster</h3>
                      <p>
                        To become a foster carer in {countryName}, you must:
                      </p>
                      <ul className="list-disc pl-6 space-y-2">
                        <li>Be over 21 years old</li>
                        <li>Have a spare bedroom</li>
                        <li>Pass background checks (DBS)</li>
                        <li>Complete comprehensive training</li>
                        <li>Have good physical and mental health</li>
                        <li>Provide references</li>
                      </ul>
                      
                      <h3 className="text-xl font-bold text-text-charcoal mt-6">Government Initiatives</h3>
                      <p>
                        The government in {countryName} has implemented several initiatives to support foster care, 
                        including increased funding for allowances, specialized training programs, and support services 
                        for both carers and children.
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Foster Agency Finder by Region */}
      {content?.agencyFinder && (
        <section id="regions" className="py-16 md:py-24 relative overflow-hidden section-highlight">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl float-animation" />
            <div className="absolute bottom-1/4 left-10 w-72 h-72 bg-secondary-blue/5 rounded-full blur-3xl float-animation" style={{ animationDelay: "1.5s" }} />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <MapPin className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-medium text-text-charcoal font-inter">Agency Finder</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                {content.agencyFinder.title || `Foster Agency Finder by Region`}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-inter">
                {content.agencyFinder.intro || `Discover the best foster agencies across ${countryName} by region`}
              </p>
            </div>

            {/* Country Stats */}
            <Card className="section-card rounded-modern-xl p-6 mb-12 max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary-green/10 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-8 h-8 text-primary-green" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-charcoal">{currentCountryData.population}</h3>
                  <p className="text-gray-600">Population</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary-green/10 flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-8 h-8 text-primary-green" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-charcoal">{currentCountryData.agencies}</h3>
                  <p className="text-gray-600">Foster Agencies</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary-green/10 flex items-center justify-center mx-auto mb-3">
                    <Award className="w-8 h-8 text-primary-green" />
                  </div>
                  <h3 className="text-2xl font-bold text-text-charcoal">{currentCountryData.demand}</h3>
                  <p className="text-gray-600">Foster Demand</p>
                </div>
              </div>
            </Card>

            {/* All Regions with Pagination */}
            <div className="max-w-6xl mx-auto">
              <h3 className="text-2xl font-bold text-text-charcoal mb-6 font-poppins text-center">
                All Regions in {countryName}
              </h3>
              
              {/* Regions Grid - First Page */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {regionsToShow.slice(0, regionsPerPage).map((region) => (
                  <Link key={region.slug} href={`/foster-agency/${country}/${region.slug}`}>
                    <Card className="section-card rounded-modern-xl hover-lift transition-all cursor-pointer group">
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
      )}

      {/* Featured Popular Locations */}
      {content?.popularLocations && (
        <section className="py-16 section-contrast">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                  <MapPin className="w-4 h-4 text-primary-green" />
                  <span className="text-sm font-medium text-text-charcoal font-inter">Popular Locations</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                  {content.popularLocations.title || `Featured Popular Locations in ${countryName}`}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto font-inter">
                  {content.popularLocations.description || `Discover top cities and towns in ${countryName} with high demand for foster carers`}
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {(content.popularLocations.locations || currentPopularRegions).map((region, index) => (
                  <Card key={index} className="section-card rounded-modern-xl p-6 hover-lift transition-all">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-bold text-text-charcoal font-poppins">
                        {region.name}
                      </h4>
                      {region.demand && (
                        <span className="bg-primary-green/10 text-primary-green text-xs px-2 py-1 rounded-full">
                          {region.demand}
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between mt-4">
                      <span className="text-gray-600 text-sm">
                        {region.agencies ? `Agencies: ${region.agencies}` : ''}
                      </span>
                      <Link 
                        href={region.link || `/foster-agency/${country}/${region.name.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-primary-green text-sm font-medium hover:underline"
                      >
                        View Agencies
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Top Agencies in Country */}
      {content?.topAgencies && (
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
                {content.topAgencies.title || `Top Foster Agencies in ${countryName}`}
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-inter">
                {content.topAgencies.description || `Connect with trusted fostering services across ${countryName}`}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {(content.topAgencies.items || featuredAgencies).map((agency) => (
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
                    <CardTitle className="text-xl font-poppins">
                      {agency.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-2 font-inter">
                      <MapPin className="w-4 h-4" />
                      {agency.location?.country || agency.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 font-inter">
                      {agency.description || agency.summary}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(agency.rating || 4.5)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 ml-2 font-inter">
                          {agency.rating} ({agency.reviewCount} reviews)
                        </span>
                      </div>
                      <Badge variant="outline" className="font-inter">
                        {agency.type}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {agency.phone && (
                        <a 
                          href={`tel:${agency.phone}`} 
                          className="text-primary-green text-sm font-medium hover:underline flex items-center"
                        >
                          <span className="mr-1">📞</span> Call
                        </a>
                      )}
                      {agency.email && (
                        <a 
                          href={`mailto:${agency.email}`} 
                          className="text-primary-green text-sm font-medium hover:underline flex items-center"
                        >
                          <span className="mr-1">✉️</span> Email
                        </a>
                      )}
                      {agency.website && (
                        <a 
                          href={agency.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary-green text-sm font-medium hover:underline flex items-center"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" /> Website
                        </a>
                      )}
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
      )}

      {/* What is the Foster Care System Like */}
      {content?.fosterSystem && (
        <section className="py-16 section-alt">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                  <Shield className="w-4 h-4 text-primary-green" />
                  <span className="text-sm font-medium text-text-charcoal font-inter">Foster Care System</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                  {content.fosterSystem.title || `What is the Foster Care System Like in ${countryName}?`}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {content.fosterSystem.sections?.map((section, index) => (
                  <Card key={index} className="section-card rounded-modern-xl p-6">
                    <h3 className="text-xl font-bold text-text-charcoal mb-4 font-poppins flex items-center">
                      {index === 0 ? <Heart className="w-5 h-5 text-primary-green mr-2" /> : 
                       index === 1 ? <BookOpen className="w-5 h-5 text-primary-green mr-2" /> : 
                       <Award className="w-5 h-5 text-primary-green mr-2" />}
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {Array.isArray(section.items) && section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                            <span className="text-primary-green text-xs">✓</span>
                          </div>
                          <span>{item.title || item.description || item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose to Foster in Country */}
      {content?.whyFoster && (
        <section className="py-16 md:py-24 section-highlight">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <Heart className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-medium text-text-charcoal font-inter">Why Foster</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                {content.whyFoster.title || `Why Choose to Foster in ${countryName}?`}
              </h2>
              <p className="text-gray-600 mb-12 font-inter">
                {content.whyFoster.description || `Make a meaningful difference in the lives of children in your community`}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {(content.whyFoster.points || [
                  { text: "Help Children Locally", description: "Provide stable, loving homes for children in your own community who need care and support." },
                  { text: "Professional Support", description: "Access comprehensive training, 24/7 support, and ongoing guidance from experienced professionals." },
                  { text: "Make a Lasting Impact", description: "Contribute to positive outcomes for vulnerable children and strengthen your local community." }
                ]).map((point, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center mx-auto mb-4">
                      {index === 0 && <Users className="w-8 h-8 text-primary-green" />}
                      {index === 1 && <Shield className="w-8 h-8 text-primary-green" />}
                      {index === 2 && <Heart className="w-8 h-8 text-primary-green" />}
                    </div>
                    <h3 className="text-xl font-bold text-text-charcoal mb-3 font-poppins">
                      {point.text}
                    </h3>
                    <p className="text-gray-600 font-inter">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {content?.faqs && (
        <section className="py-16 md:py-24 section-contrast">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                  <BookOpen className="w-4 h-4 text-primary-green" />
                  <span className="text-sm font-medium text-text-charcoal font-inter">FAQs</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                  {content.faqs.title || `FAQs About Fostering in ${countryName}`}
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto font-inter">
                  {content.faqs.description || `Common questions about becoming a foster carer in ${countryName}`}
                </p>
              </div>
              
              <Accordion type="single" collapsible className="space-y-4">
                {(content.faqs.items || faqs).map((faq, index) => (
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
      )}

      {/* Regulated & Trusted by UK Authorities */}
      {content?.regulated && (
        <section className="py-12 bg-gradient-to-r from-primary-green/10 to-secondary-blue/10">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-text-charcoal mb-2 font-poppins">Regulated by {content.regulated.regulator || currentCountryData.regulator}</h3>
                  <p className="text-text-charcoal/90 text-sm font-inter">
                    {content.regulated.description || "All agencies meet strict regulatory standards"}
                  </p>
                </div>
                <div className="flex justify-center space-x-8">
                  <div className="text-center">
                    <Shield className="w-10 h-10 text-text-charcoal mx-auto mb-2" />
                    <span className="text-text-charcoal text-sm font-inter">Safeguarding</span>
                  </div>
                  <div className="text-center">
                    <Award className="w-10 h-10 text-text-charcoal mx-auto mb-2" />
                    <span className="text-text-charcoal text-sm font-inter">Accredited</span>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <Link 
                    href={`https://www.gov.uk/fostering-${country}`}
                    className="text-text-charcoal font-medium hover:underline font-inter"
                  >
                    Official Government Guidance
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Find Agencies Near You */}
      {content?.findAgencies && (
        <section className="py-16 section-muted">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <MapPin className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-medium text-text-charcoal font-inter">Find Agencies</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                {content.findAgencies.title || "Find Agencies Near You"}
              </h2>
              <p className="text-gray-600 mb-12 font-inter">
                {content.findAgencies.description || `Connect with local fostering services in ${countryName}`}
              </p>
              
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
      )}
    </div>
  );
}