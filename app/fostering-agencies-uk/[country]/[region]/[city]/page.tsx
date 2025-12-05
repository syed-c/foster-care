'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  MapPin, 
  Building2, 
  Users, 
  Star, 
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Home,
  Heart,
  Award,
  BookOpen
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { AnimatedSection } from '@/components/animations/AnimatedSection';
import { AgencyCard } from '@/components/cards/AgencyCard';

// Mock data - would be replaced with API calls in production
const mockCity = {
  id: '1',
  name: 'London',
  slug: 'london',
  regionId: '1',
  region: {
    name: 'Greater London',
    slug: 'greater-london'
  },
  country: {
    name: 'England',
    slug: 'england'
  },
  description: 'London offers a vibrant fostering community with diverse opportunities across all boroughs. As the capital city, it has a high demand for foster carers to support children and young people from various backgrounds. With over 40 registered fostering agencies, families can find specialized support for different needs.',
  metaTitle: 'Foster Agencies in London, Greater London | UK Directory',
  metaDescription: 'Find accredited foster agencies in London. Browse trusted fostering services across all London boroughs with expert support.',
  population: '9.5 million',
  boroughCount: 32,
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-12-01T00:00:00Z'
};

const mockAgencies = [
  {
    id: '1',
    name: 'London Family Care',
    slug: 'london-family-care',
    location: { city: 'London', region: 'Greater London' },
    description: 'Specialist in caring for teenagers and sibling groups with dedicated support teams across all London boroughs.',
    rating: 4.8,
    reviewCount: 42,
    type: 'Private',
    featured: true,
    logoUrl: null,
    country: 'england',
    recruiting: true
  },
  {
    id: '2',
    name: 'West London Children First',
    slug: 'west-london-children-first',
    location: { city: 'London', region: 'Greater London' },
    description: 'Providing compassionate care for children across West London for over 15 years with specialized borough services.',
    rating: 4.7,
    reviewCount: 38,
    type: 'Local Authority',
    featured: true,
    logoUrl: null,
    country: 'england',
    recruiting: true
  },
  {
    id: '3',
    name: 'South London Hearts Together',
    slug: 'south-london-hearts-together',
    location: { city: 'London', region: 'Greater London' },
    description: 'Regional fostering service with specialized support for cultural needs and multilingual families.',
    rating: 4.6,
    reviewCount: 29,
    type: 'Independent',
    featured: false,
    logoUrl: null,
    country: 'england',
    recruiting: false
  },
  {
    id: '4',
    name: 'East London Foster Care',
    slug: 'east-london-foster-care',
    location: { city: 'London', region: 'Greater London' },
    description: 'Community-focused fostering service with strong connections to local borough councils and support networks.',
    rating: 4.5,
    reviewCount: 24,
    type: 'Private',
    featured: false,
    logoUrl: null,
    country: 'england',
    recruiting: true
  }
];

const mockFosteringTypes = [
  {
    id: '1',
    name: 'Short-term Fostering',
    description: 'Providing temporary care for children while plans are made for their future. This could last from a few days to several months.'
  },
  {
    id: '2',
    name: 'Long-term Fostering',
    description: 'Providing stable, long-term care for children who cannot return to their birth families. This often lasts until the child reaches adulthood.'
  },
  {
    id: '3',
    name: 'Respite Fostering',
    description: 'Offering short breaks for children with complex needs or disabilities, providing vital support for their permanent carers.'
  },
  {
    id: '4',
    name: 'Emergency Fostering',
    description: 'Immediate placements for children who need urgent care, often at short notice and for varying lengths of time.'
  }
];

const mockFaqs = [
  {
    id: '1',
    question: 'How do I find foster agencies in London?',
    answer: 'There are several ways to find foster agencies in London. You can browse our directory above, contact your local authority (Ofsted) for recommendations, or search online for local fostering services. Most agencies offer initial consultations to discuss your interest in fostering.'
  },
  {
    id: '2',
    question: 'Who can foster a child in London?',
    answer: 'To foster in London, you must be over 21, have a spare room, pass background checks, and complete training. You can be single, married, in a relationship, working, or retired. Ofsted sets the standards for approval.'
  },
  {
    id: '3',
    question: 'What support is available for foster carers in London?',
    answer: 'Foster carers in London receive ongoing support including 24/7 helplines, regular supervision, training opportunities, and access to support groups. Agencies also provide financial allowances and respite care.'
  },
  {
    id: '4',
    question: 'Can I work and foster in London?',
    answer: 'Yes, many foster carers in London work full-time or part-time. However, you\'ll need to consider the flexibility required for meetings, training, and supporting the child\'s needs. Some fostering roles may require more availability than others.'
  }
];

const mockBenefits = [
  {
    id: '1',
    title: 'Community Connection',
    description: 'Build strong relationships within your local London community and borough networks.'
  },
  {
    id: '2',
    title: 'Professional Training',
    description: 'Receive specialized training from Ofsted-approved programs tailored to London\'s diverse needs.'
  },
  {
    id: '3',
    title: 'Cultural Diversity',
    description: 'Experience the richness of London\'s multicultural environment while making a lasting impact.'
  },
  {
    id: '4',
    title: 'Career Flexibility',
    description: 'Many fostering roles accommodate working professionals with flexible scheduling options.'
  }
];

export default function CityPage() {
  const params = useParams();
  const [city, setCity] = useState<any>(null);
  const [agencies, setAgencies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCity(mockCity);
      setAgencies(mockAgencies);
      setLoading(false);
    }, 500);
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-ivory to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-mint border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-body">Loading city details...</p>
        </div>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-ivory to-white">
        <GlassCard className="p-12 text-center rounded-xxl max-w-md">
          <div className="py-8">
            <h2 className="text-2xl font-heading mb-4">City Not Found</h2>
            <p className="text-gray-600 mb-6 font-body">
              The city you're looking for doesn't exist or may have been removed.
            </p>
            <GradientButton asChild>
              <Link href="/fostering-agencies-uk">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Directory
              </Link>
            </GradientButton>
          </div>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-ivory to-white">
      {/* Breadcrumb */}
      <div className="bg-white/50 backdrop-blur-sm border-b border-gray-100 py-4">
        <div className="container mx-auto px-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 font-body">
            <Link href="/" className="hover:text-primary-mint transition-colors flex items-center">
              <Home className="w-4 h-4 mr-1" />
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link href="/fostering-agencies-uk" className="hover:text-primary-mint transition-colors">Foster Agencies</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link href={`/fostering-agencies-uk/${city.country.slug}`} className="hover:text-primary-mint transition-colors">{city.country.name}</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link href={`/fostering-agencies-uk/${city.country.slug}/${city.region.slug}`} className="hover:text-primary-mint transition-colors">{city.region.name}</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-text-charcoal font-medium">{city.name}</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <AnimatedSection>
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-10 left-10 w-72 h-72 bg-primary-mint/15 rounded-full blur-3xl float-animation" />
            <div 
              className="absolute bottom-10 right-10 w-80 h-80 bg-primary-sky/15 rounded-full blur-3xl float-animation"
              style={{ animationDelay: "2s" }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <MapPin className="w-4 h-4 text-primary-mint" />
                <span className="text-sm font-medium text-text-charcoal font-body">
                  {city.name}, {city.region.name}, {city.country.name}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-text-charcoal mb-6 font-heading">
                {city.metaTitle.replace(' | UK Directory', '')}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 font-body">
                {city.metaDescription}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <GradientButton asChild size="lg">
                  <Link href="#agencies">
                    View Agencies
                  </Link>
                </GradientButton>
                <GradientButton asChild size="lg" variant="outline">
                  <Link href="#fostering-types">
                    Fostering Options
                  </Link>
                </GradientButton>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mt-12">
                <GlassCard className="p-4">
                  <div className="flex items-center justify-center mb-2">
                    <Building2 className="w-6 h-6 text-primary-mint" />
                  </div>
                  <p className="text-2xl font-bold font-heading">{agencies.length}</p>
                  <p className="text-sm text-gray-600 font-body">Agencies</p>
                </GlassCard>
                
                <GlassCard className="p-4">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="w-6 h-6 text-primary-sky" />
                  </div>
                  <p className="text-2xl font-bold font-heading">{city.boroughCount}</p>
                  <p className="text-sm text-gray-600 font-body">Boroughs</p>
                </GlassCard>
                
                <GlassCard className="p-4">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-6 h-6 text-accent-peach" />
                  </div>
                  <p className="text-2xl font-bold font-heading">
                    {Math.round(agencies.reduce((acc, agency) => acc + agency.rating, 0) / agencies.length * 10) / 10}
                  </p>
                  <p className="text-sm text-gray-600 font-body">Avg. Rating</p>
                </GlassCard>
                
                <GlassCard className="p-4">
                  <div className="flex items-center justify-center mb-2">
                    <Heart className="w-6 h-6 text-red-400" />
                  </div>
                  <p className="text-2xl font-bold font-heading">
                    {agencies.filter(a => a.recruiting).length}
                  </p>
                  <p className="text-sm text-gray-600 font-body">Recruiting</p>
                </GlassCard>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Overview */}
      <AnimatedSection delay={0.1}>
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary-ivory/70 to-white/70">
          <div className="container mx-auto px-4">
            <GlassCard className="rounded-xxl p-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-heading mb-6 text-center">About Fostering in {city.name}</h2>
                <div className="prose prose-lg max-w-none font-body">
                  <p className="text-gray-700 leading-relaxed">
                    {city.description}
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    {city.name} has a diverse fostering landscape with agencies serving all 32 boroughs, from central Westminster to outer suburbs. 
                    The regulatory framework is overseen by Ofsted, ensuring high standards across all registered agencies. With its multicultural 
                    population, London offers unique opportunities for foster carers to support children from various backgrounds.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
      </AnimatedSection>

      {/* Fostering Types */}
      <AnimatedSection delay={0.2}>
        <section id="fostering-types" className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading mb-4">Types of Fostering in {city.name}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-body">
                Various fostering opportunities are available in {city.name} to suit different circumstances and preferences
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {mockFosteringTypes.map((type) => (
                <GlassCard key={type.id} className="hover-lift transition-all hover:scale-105 rounded-xxl">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-mint/20 to-primary-sky/20 flex items-center justify-center flex-shrink-0">
                        <Heart className="w-6 h-6 text-primary-mint" />
                      </div>
                      <div>
                        <h3 className="text-xl font-heading mb-2">{type.name}</h3>
                        <p className="text-gray-600 text-sm font-body">{type.description}</p>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Benefits */}
      <AnimatedSection delay={0.3}>
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary-sky/5 to-white/70">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading mb-4">Why Foster in {city.name}?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-body">
                Make a meaningful difference in the lives of children in your community
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {mockBenefits.map((benefit) => (
                <GlassCard key={benefit.id} className="hover-lift transition-all rounded-xxl text-center">
                  <div className="p-6">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-mint/20 to-primary-sky/20 flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-primary-mint" />
                    </div>
                    <h3 className="text-lg font-heading mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm font-body">{benefit.description}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Featured Agencies */}
      <AnimatedSection delay={0.4}>
        <section id="agencies" className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading mb-4">Featured Agencies in {city.name}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-body">
                Discover top-rated fostering agencies in {city.name}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {agencies.map((agency) => (
                <AgencyCard key={agency.id} agency={agency} />
              ))}
            </div>
            
            <div className="text-center mt-10">
              <GradientButton asChild>
                <Link href={`/fostering-agencies-uk?city=${city.slug}`}>
                  View All Agencies in {city.name} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </GradientButton>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* FAQs */}
      <AnimatedSection delay={0.5}>
        <section className="py-12 md:py-16 bg-gradient-to-br from-primary-ivory/70 to-white/70">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-heading mb-4">FAQs About Fostering in {city.name}</h2>
                <p className="text-gray-600 font-body">
                  Common questions about becoming a foster carer in {city.name}
                </p>
              </div>
              
              <div className="space-y-4">
                {mockFaqs.map((faq) => (
                   <GlassCard key={faq.id} className="rounded-xxl">
                    <details className="group p-6">
                      <summary className="list-none cursor-pointer flex justify-between items-center font-heading text-lg">
                        <span>{faq.question}</span>
                        <div className="ml-4 flex-shrink-0">
                          <svg className="w-5 h-5 text-primary-mint group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                        </div>
                      </summary>
                      <div className="mt-4 text-gray-600 font-body">
                        <p>{faq.answer}</p>
                      </div>
                    </details>
                  </GlassCard>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection delay={0.6}>
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-mint/40 to-primary-sky/40" />
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-mint/30 rounded-full blur-3xl float-animation-slow" />
            <div 
              className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-primary-sky/30 rounded-full blur-3xl float-animation-slow"
              style={{ animationDelay: "4s" }}
            />
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <GlassCard className="border-0 text-text-charcoal rounded-xxl overflow-hidden shadow-2xl">
              <div className="p-8 md:p-12">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 font-heading text-white drop-shadow-md">
                    Start Your Fostering Journey in {city.name}
                  </h2>
                  <p className="text-lg md:text-xl mb-8 text-white/90 font-body">
                    Join thousands of families who found their perfect fostering match through our trusted directory.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <GradientButton asChild size="lg" className="px-8 py-6 text-lg font-semibold">
                      <Link href="/fostering-agencies-uk">
                        Browse Agencies
                      </Link>
                    </GradientButton>
                    <GradientButton asChild size="lg" variant="outline" className="bg-white text-text-charcoal hover:bg-white/90 px-8 py-6 text-lg font-semibold">
                      <Link href="/resources">
                        <BookOpen className="mr-2 w-5 h-5" />
                        Learn More
                      </Link>
                    </GradientButton>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}