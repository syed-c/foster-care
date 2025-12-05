import { loadCountries } from '@/lib/locationData';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Heart, 
  ArrowRight, 
  Shield, 
  Users, 
  Star, 
  BookOpen, 
  Award, 
  FileText,
  Search,
  Home,
  Building2,
  GraduationCap,
  HandHeart,
  Scale,
  CheckCircle2,
  PoundSterling
} from 'lucide-react';
import MapSection from '@/components/MapSection';

export const metadata = {
  title: 'UK Foster Agency Directory | Find Foster Care Services',
  description: 'Find foster agencies across England, Scotland, Wales, and Northern Ireland. Browse by location to discover trusted fostering services in your area.',
};

// Mock data for featured agencies
const featuredAgencies = [
  {
    id: 1,
    name: "Bright Futures Fostering",
    location: { city: "London" },
    description: "Specialist in caring for teenagers and sibling groups with dedicated support teams.",
    rating: 4.8,
    reviewCount: 42,
    type: "Private",
    featured: true,
    logo: null
  },
  {
    id: 2,
    name: "Scottish Family Care",
    location: { city: "Edinburgh" },
    description: "Providing compassionate care for children across Scotland for over 25 years.",
    rating: 4.9,
    reviewCount: 38,
    type: "Local Authority",
    featured: true,
    logo: null
  },
  {
    id: 3,
    name: "Welsh Hearts Together",
    location: { city: "Cardiff" },
    description: "Welsh-speaking fostering service with specialized support for cultural needs.",
    rating: 4.7,
    reviewCount: 29,
    type: "Independent",
    featured: true,
    logo: null
  }
];

// Mock data for testimonials
const testimonials = [
  {
    name: "Sarah & James",
    location: "Manchester",
    quote: "Finding the right agency was overwhelming until we discovered this directory. The reviews and detailed profiles helped us make the perfect choice.",
    rating: 5,
  },
  {
    name: "Emma Thompson",
    location: "London",
    quote: "As a single foster carer, I needed an agency that understood my situation. This platform made it so easy to find and connect with the right support.",
    rating: 5,
  },
  {
    name: "David & Claire",
    location: "Birmingham",
    quote: "The transparency and genuine reviews gave us confidence. We're now fostering two wonderful children and couldn't be happier with our agency.",
    rating: 5,
  }
];

// Mock data for resources
const resources = [
  {
    title: 'Getting Started with Fostering',
    category: 'Guides',
    excerpt: 'Everything you need to know about beginning your fostering journey in the UK.',
    slug: 'getting-started',
    image: 'https://images.unsplash.com/photo-1758273240331-745ccab011a2',
  },
  {
    title: 'Legal Requirements for Foster Carers',
    category: 'Legal',
    excerpt: 'Understanding the legal framework and requirements for becoming a foster carer.',
    slug: 'legal-requirements',
    image: 'https://images.unsplash.com/photo-1758687126445-98edd4b15ba6',
  },
  {
    title: 'Our Family\'s Fostering Story',
    category: 'Family Stories',
    excerpt: 'Read about the Thompson family\'s journey and the joy of fostering.',
    slug: 'thompson-family-story',
    image: 'https://images.unsplash.com/photo-1761030293423-130d4c937ead',
  }
];

// Mock data for regions
const popularRegions = [
  { name: "Greater London", slug: "greater-london", country: "england" },
  { name: "West Midlands", slug: "west-midlands", country: "england" },
  { name: "Greater Manchester", slug: "greater-manchester", country: "england" },
  { name: "West Yorkshire", slug: "west-yorkshire", country: "england" },
];

// FAQ data
const faqs = [
  {
    question: "How much are foster carers paid?",
    answer: "Foster carers receive a fostering allowance to cover the costs of caring for a child. This varies by agency and the age of the child, typically ranging from £400-£600 per week."
  },
  {
    question: "Who regulates fostering in the UK?",
    answer: "Fostering services are regulated by Ofsted in England, Care Inspectorate in Scotland, and CIW (Care Inspectorate Wales). Each has specific standards and inspection processes."
  },
  {
    question: "How long is the approval process?",
    answer: "The fostering approval process typically takes 4-6 months and includes application, assessments, training, and panel review."
  },
  {
    question: "Can I foster if I work full-time?",
    answer: "Yes, many foster carers work full-time. Some agencies offer specialized support for working foster carers."
  },
  {
    question: "What are the age requirements to become a foster carer?",
    answer: "You must be at least 21 years old to apply to become a foster carer in the UK."
  },
  {
    question: "Can single people foster?",
    answer: "Absolutely. Single people can be excellent foster carers. Your relationship status does not affect your eligibility."
  },
  {
    question: "Do I need a spare room to foster?",
    answer: "Yes, you typically need a spare room to foster a child. This ensures the child has their own private space."
  },
  {
    question: "What support is available for foster carers?",
    answer: "Foster carers receive ongoing support including supervision, training, 24/7 helplines, and access to support groups."
  }
];

export default async function FosterAgencyMainPage() {
  console.log('Loading countries from Supabase...');
  const countries = await loadCountries();
  console.log('Countries loaded:', countries?.length || 0);
  
  // Fallback data if Supabase is not configured
  const fallbackCountries = [
    { slug: 'england', name: 'England', lat: 52.3555, lng: -1.1743 },
    { slug: 'scotland', name: 'Scotland', lat: 56.4907, lng: -4.2026 },
    { slug: 'wales', name: 'Wales', lat: 52.1307, lng: -3.7837 },
    { slug: 'northern-ireland', name: 'Northern Ireland', lat: 54.7855, lng: -6.4923 }
  ];

  // Use fallback data if countries couldn't be loaded
  const countriesToDisplay = countries && countries.length > 0 ? countries : fallbackCountries;
  console.log('Countries to display:', countriesToDisplay.length);

  return (
    <div className="min-h-screen bg-background-offwhite">
      {/* 1️⃣ Hero Section */}
      <section className="relative py-20 md:py-28 overflow-hidden section-hero">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary-green/15 rounded-full blur-3xl float-animation" />
          <div
            className="absolute bottom-10 right-10 w-80 h-80 bg-secondary-blue/15 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Heart className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">
                UK Foster Care Directory
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-text-charcoal mb-6 font-poppins">
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent">
                Fostering Agency
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 font-inter">
              Connecting caring hearts with fostering opportunities across the UK. Browse verified agencies by location, read reviews, and start your fostering journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 font-inter px-8 py-6">
                Browse Agencies <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="glass font-inter px-8 py-6">
                Learn About Fostering
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2️⃣ “Browse by Country” Quick Selection */}
      <section className="py-16 md:py-24 relative overflow-hidden section-alt">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl float-animation" />
          <div
            className="absolute bottom-1/4 left-10 w-72 h-72 bg-secondary-blue/5 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Shield className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">
                Browse by Country
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
              Explore Fostering Agencies by Location
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter">
              Find trusted foster agencies across England, Scotland, Wales, and Northern Ireland
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {countriesToDisplay.map((country) => (
              <Link key={country.slug} href={`/foster-agency/${country.slug}`}>
                <Card className="section-card rounded-modern-xl hover-lift transition-all cursor-pointer group">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                      <MapPin className="w-8 h-8 text-primary-green" />
                    </div>
                    <CardTitle className="text-center text-xl font-poppins group-hover:text-primary-green transition-colors">
                      {country.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base font-inter mb-4">
                      View foster agencies in {country.name}
                    </CardDescription>
                    <div className="flex items-center justify-center text-primary-green font-medium group-hover:translate-x-1 transition-transform">
                      Explore <ArrowRight className="ml-2 w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3️⃣ UK Map Interactive Navigation */}
      <section className="py-12 md:py-16 section-highlight">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-3 md:mb-4">
              <MapPin className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">
                Interactive Map
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-text-charcoal mb-3 md:mb-4 font-poppins">
              Explore Agencies Across the UK
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base font-inter">
              Click on regions to discover fostering opportunities near you
            </p>
          </div>

          <Card className="section-card rounded-modern-xl overflow-hidden">
            <CardContent className="p-0 md:p-6">
              <MapSection countries={countriesToDisplay} />
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 4️⃣ Featured Top Foster Agencies */}
      <section className="py-12 md:py-16 relative overflow-hidden section-contrast">
        <div className="absolute inset-0 gradient-mesh opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Award className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">
                Top Rated Agencies
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
              Featured Fostering Agencies
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter">
              Discover our highest-rated agencies with proven track records
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAgencies.map((agency) => (
              <Card key={agency.id} className="section-card rounded-modern-xl hover-lift transition-all cursor-pointer">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 rounded-lg glass-icon flex items-center justify-center">
                      {agency.logo ? (
                        <Image
                          src={agency.logo}
                          alt={agency.name}
                          width={48}
                          height={48}
                          className="rounded"
                        />
                      ) : (
                        <Heart className="w-8 h-8 text-primary-green" />
                      )}
                    </div>
                    {agency.featured && (
                      <Badge className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal border-0 font-inter">
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary-green transition-colors font-poppins">
                    {agency.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-1 mt-2 font-inter">
                    <MapPin className="w-4 h-4" />
                    {agency.location?.city || "UK"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-4 font-inter">
                    {agency.description ||
                      "Dedicated to providing exceptional foster care services."}
                  </p>
                  <div className="flex items-center justify-between">
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
                        ({agency.reviewCount})
                      </span>
                    </div>
                    <Badge variant="outline" className="font-inter">{agency.type}</Badge>
                  </div>
                </CardContent>
                <CardContent>
                  <Button
                    variant="ghost"
                    className="w-full group-hover:bg-primary-green/10 group-hover:text-primary-green font-inter"
                    asChild
                  >
                    <Link href={`/agencies/${agency.slug}`}>
                      View Profile <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="glass font-inter px-8 py-6" asChild>
              <Link href="/agencies">
                View All Agencies <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 5️⃣ About Our Directory */}
      <section className="py-16 md:py-24 relative overflow-hidden section-alt">
        <div className="absolute inset-0 gradient-mesh opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <Card className="section-card-contrast rounded-modern-xl p-8 md:p-12 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl md:text-3xl font-bold text-text-charcoal mb-4 font-poppins text-center">
                About Our Directory
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-lg leading-relaxed font-inter text-center mb-6">
                Our comprehensive directory helps you find foster agencies across the
                United Kingdom. Whether you're looking to become a foster carer or
                seeking support, we connect you with trusted agencies in your local
                area. Browse by country, region, or city to find the perfect match
                for your fostering journey.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-primary-green" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 font-poppins">Verified Agencies</h3>
                  <p className="text-sm text-gray-600 font-inter">All agencies are verified and trusted</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-6 h-6 text-primary-green" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 font-poppins">Location-Based</h3>
                  <p className="text-sm text-gray-600 font-inter">Find agencies near you</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-6 h-6 text-primary-green" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 font-poppins">Comprehensive</h3>
                  <p className="text-sm text-gray-600 font-inter">Coverage across all UK regions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 6️⃣ How Fostering Works in the UK */}
      <section className="py-16 md:py-24 section-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <GraduationCap className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">
                Fostering Process
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
              How Fostering Works in the UK
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter">
              Understanding the journey to becoming a foster carer
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="section-card">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center mb-4">
                    <HandHeart className="w-6 h-6 text-primary-green" />
                  </div>
                  <CardTitle className="text-xl font-poppins">The Application Process</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 font-inter">
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-primary-green text-xs font-bold">1</span>
                      </div>
                      <span>Initial enquiry and information session</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-primary-green text-xs font-bold">2</span>
                      </div>
                      <span>Formal application and documentation</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-primary-green text-xs font-bold">3</span>
                      </div>
                      <span>Home study and assessment</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-primary-green text-xs font-bold">4</span>
                      </div>
                      <span>Training and preparation programs</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-primary-green text-xs font-bold">5</span>
                      </div>
                      <span>Panel approval and matching</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="section-card">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center mb-4">
                    <Scale className="w-6 h-6 text-primary-green" />
                  </div>
                  <CardTitle className="text-xl font-poppins">Legal Framework</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 font-inter">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-primary-green mr-3 mt-0.5 flex-shrink-0" />
                      <span>Regulated by Ofsted (England), Care Inspectorate (Scotland), and CIW (Wales)</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-primary-green mr-3 mt-0.5 flex-shrink-0" />
                      <span>Legal fostering agreements and contracts</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-primary-green mr-3 mt-0.5 flex-shrink-0" />
                      <span>Child welfare as the paramount consideration</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-primary-green mr-3 mt-0.5 flex-shrink-0" />
                      <span>Ongoing supervision and support</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-primary-green mr-3 mt-0.5 flex-shrink-0" />
                      <span>Regular reviews and assessments</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 7️⃣ Fostering Benefits for Carers & Children */}
      <section className="py-16 md:py-24 relative overflow-hidden section-highlight">
        <div className="absolute inset-0 gradient-mesh opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Heart className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">
                Benefits
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
              Fostering Benefits for Carers & Children
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter">
              Making a positive impact while receiving comprehensive support
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <Card className="section-card">
              <CardHeader>
                <CardTitle className="text-2xl font-poppins flex items-center">
                  <Users className="w-6 h-6 text-primary-green mr-2" />
                  For Foster Carers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary-green/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <PoundSterling className="w-5 h-5 text-primary-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold font-poppins">Financial Support</h3>
                      <p className="text-gray-600 text-sm font-inter">Fostering allowance to cover costs of caring for a child</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary-green/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-primary-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold font-poppins">Training & Development</h3>
                      <p className="text-gray-600 text-sm font-inter">Ongoing professional development and specialist training</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary-green/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Shield className="w-5 h-5 text-primary-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold font-poppins">24/7 Support</h3>
                      <p className="text-gray-600 text-sm font-inter">Round-the-clock helpline and dedicated social worker support</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary-green/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Heart className="w-5 h-5 text-primary-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold font-poppins">Personal Fulfillment</h3>
                      <p className="text-gray-600 text-sm font-inter">Making a meaningful difference in a child's life</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="section-card">
              <CardHeader>
                <CardTitle className="text-2xl font-poppins flex items-center">
                  <Home className="w-6 h-6 text-primary-green mr-2" />
                  For Children
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary-green/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Heart className="w-5 h-5 text-primary-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold font-poppins">Safe & Stable Environment</h3>
                      <p className="text-gray-600 text-sm font-inter">Secure home environment with committed carers</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary-green/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <Users className="w-5 h-5 text-primary-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold font-poppins">Individual Attention</h3>
                      <p className="text-gray-600 text-sm font-inter">Personalized care tailored to each child's needs</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary-green/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-primary-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold font-poppins">Educational Support</h3>
                      <p className="text-gray-600 text-sm font-inter">Help with schooling and educational development</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary-green/10 flex items-center justify-center mr-4 flex-shrink-0">
                      <HandHeart className="w-5 h-5 text-primary-green" />
                    </div>
                    <div>
                      <h3 className="font-semibold font-poppins">Emotional Healing</h3>
                      <p className="text-gray-600 text-sm font-inter">Therapeutic support and emotional stability</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 8️⃣ Quick Links to Largest Regions */}
      <section className="py-16 md:py-24 section-alt">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <MapPin className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">
                Popular Regions
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
              Explore Major Regions
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter">
              Find agencies in the UK's largest metropolitan areas
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {popularRegions.map((region) => (
              <Link 
                key={region.slug} 
                href={`/foster-agency/${region.country}/${region.slug}`}
                className="section-card-alt p-6 hover-lift transition-all flex items-center gap-3"
              >
                <Building2 className="w-6 h-6 text-primary-green" />
                <span className="font-inter font-medium">{region.name}</span>
                <ArrowRight className="w-4 h-4 text-primary-green ml-auto" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 9️⃣ Latest Guides and Resources */}
      <section className="py-16 md:py-24 relative overflow-hidden section-contrast">
        <div className="absolute inset-0 gradient-mesh opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <BookOpen className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">
                Resources
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
              Latest Guides and Resources
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter">
              Educational content to support your fostering journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {resources.map((resource) => (
              <Card key={resource.slug} className="section-card hover-lift transition-all hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  <Image
                    src={resource.image}
                    alt={resource.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="text-xs font-semibold text-primary-green mb-2 font-inter">
                    {resource.category}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary-green transition-colors font-poppins">
                    {resource.title}
                  </CardTitle>
                  <CardDescription className="mt-2 font-inter">
                    {resource.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="ghost" className="w-full group-hover:bg-primary-green/10 group-hover:text-primary-green font-inter" asChild>
                    <Link href={`/resources/${resource.slug}`}>
                      Read More <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="glass font-inter px-8 py-6" asChild>
              <Link href="/resources">
                View All Resources <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 🔟 Testimonials / Success Stories */}
      <section className="py-16 md:py-24 section-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Star className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">
                Success Stories
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
              Testimonials & Success Stories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter">
              Hear from families who found their perfect match through our directory
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="section-card rounded-modern-xl hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <CardTitle className="text-lg font-poppins">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1 font-inter">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </CardDescription>
                    </div>
                    <Badge className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal border-0 font-inter">
                      <Star className="w-3 h-3 mr-1 fill-white" />
                      {testimonial.rating}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <p className="pt-4 font-inter">{testimonial.quote}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 1️⃣1️⃣ FAQ Section */}
      <section className="py-16 md:py-24 relative overflow-hidden section-alt">
        <div className="absolute inset-0 gradient-mesh opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <FileText className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">
                Frequently Asked Questions
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
              Your Fostering Questions Answered
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter">
              Everything you need to know about fostering in the UK
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="section-card">
                  <CardHeader>
                    <CardTitle className="text-lg font-poppins">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 font-inter">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <Button size="lg" variant="outline" className="glass font-inter px-8 py-6" asChild>
                <Link href="/resources">
                  View All FAQs <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 1️⃣2️⃣ Regulatory & Safety Trust Bar */}
      <section className="py-12 bg-gradient-to-r from-primary-green/10 to-secondary-blue/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-xl font-bold text-text-charcoal font-poppins">
              Regulated & Trusted by UK Authorities
            </h3>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-primary-green" />
              <span className="font-inter font-medium">Ofsted</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-primary-green" />
              <span className="font-inter font-medium">CIW</span>
            </div>
            <div className="flex items-center gap-2">
              <Scale className="w-8 h-8 text-primary-green" />
              <span className="font-inter font-medium">Care Inspectorate</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-primary-green" />
              <span className="font-inter font-medium">Government Guidance</span>
            </div>
          </div>
        </div>
      </section>

      {/* 1️⃣3️⃣ CTA Block */}
      <section className="py-16 md:py-24 relative overflow-hidden section-hero">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-green/40 to-secondary-blue/40" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-green/30 rounded-full blur-3xl float-animation-slow" />
          <div
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary-blue/30 rounded-full blur-3xl float-animation-slow"
            style={{ animationDelay: "4s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Card className="section-card-contrast border-0 text-text-charcoal rounded-modern-xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-green/90 to-secondary-blue/80 z-0" />
            <CardContent className="p-8 md:p-12 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 font-poppins text-white drop-shadow-md">
                  Find Agencies Near You
                </h2>
                <p className="text-lg md:text-xl mb-8 text-white/90 font-inter">
                  Start your fostering journey today by exploring agencies in your area
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-text-charcoal hover:bg-white/90 hover:scale-105 transition-all shadow-lg border-2 border-white/20 px-8 py-6 text-lg font-semibold font-inter"
                    asChild
                  >
                    <Link href="/agencies">
                      Browse Agencies <Search className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 hover:scale-105 transition-all shadow-md px-8 py-6 text-lg font-semibold font-inter"
                    asChild
                  >
                    <Link href="/foster-agency">
                      Explore by Location <MapPin className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}