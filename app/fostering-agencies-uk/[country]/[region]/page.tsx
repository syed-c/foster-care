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
  ChevronRight
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { AnimatedSection } from '@/components/animations/AnimatedSection';
import { AgencyCard } from '@/components/cards/AgencyCard';

// Mock data - would be replaced with API calls in production
const mockRegion = {
  id: '1',
  name: 'Greater London',
  slug: 'greater-london',
  countryId: '1',
  country: {
    name: 'England',
    slug: 'england'
  },
  description: 'Greater London is home to a diverse range of fostering agencies serving the capital city and surrounding boroughs. With a population of over 9 million, there are numerous opportunities to make a difference in the lives of children and young people.',
  metaTitle: 'Foster Agencies in Greater London, England | UK Directory',
  metaDescription: 'Find accredited foster agencies in Greater London. Browse trusted fostering services across London boroughs.',
  createdAt: '2023-01-01T00:00:00Z',
  updatedAt: '2023-12-01T00:00:00Z'
};

const mockCities = [
  {
    id: '1',
    name: 'London',
    slug: 'london',
    regionId: '1',
    description: 'The capital city with diverse fostering opportunities',
    agencyCount: 42
  },
  {
    id: '2',
    name: 'Croydon',
    slug: 'croydon',
    regionId: '1',
    description: 'Large south London borough with growing needs',
    agencyCount: 8
  },
  {
    id: '3',
    name: 'Bromley',
    slug: 'bromley',
    regionId: '1',
    description: 'South east London borough with suburban communities',
    agencyCount: 6
  },
  {
    id: '4',
    name: 'Enfield',
    slug: 'enfield',
    regionId: '1',
    description: 'North London borough with mixed urban and suburban areas',
    agencyCount: 7
  }
];

const mockAgencies = [
  {
    id: '1',
    name: 'London Family Care',
    slug: 'london-family-care',
    location: { city: 'London', region: 'Greater London' },
    description: 'Specialist in caring for teenagers and sibling groups with dedicated support teams.',
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
    description: 'Providing compassionate care for children across West London for over 15 years.',
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
    description: 'Regional fostering service with specialized support for cultural needs.',
    rating: 4.6,
    reviewCount: 29,
    type: 'Independent',
    featured: false,
    logoUrl: null,
    country: 'england',
    recruiting: false
  }
];

export default function RegionPage() {
  const params = useParams();
  const [region, setRegion] = useState<any>(null);
  const [cities, setCities] = useState<any[]>([]);
  const [agencies, setAgencies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRegion(mockRegion);
      setCities(mockCities);
      setAgencies(mockAgencies);
      setLoading(false);
    }, 500);
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-ivory to-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-mint border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-body">Loading region details...</p>
        </div>
      </div>
    );
  }

  if (!region) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-ivory to-white">
        <GlassCard className="p-12 text-center rounded-xxl max-w-md">
          <div className="py-8">
            <h2 className="text-2xl font-heading mb-4">Region Not Found</h2>
            <p className="text-gray-600 mb-6 font-body">
              The region you're looking for doesn't exist or may have been removed.
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
            <Link href="/" className="hover:text-primary-mint transition-colors">Home</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link href="/fostering-agencies-uk" className="hover:text-primary-mint transition-colors">Foster Agencies</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Link href={`/fostering-agencies-uk/${region.country.slug}`} className="hover:text-primary-mint transition-colors">{region.country.name}</Link>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <span className="text-text-charcoal font-medium">{region.name}</span>
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
                  {region.name}, {region.country.name}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-text-charcoal mb-6 font-heading">
                {region.metaTitle.replace(' | UK Directory', '')}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 font-body">
                {region.metaDescription}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <GradientButton asChild size="lg">
                  <Link href="#cities">
                    Explore Cities
                  </Link>
                </GradientButton>
                <GradientButton asChild size="lg" variant="outline">
                  <Link href="#agencies">
                    View Agencies
                  </Link>
                </GradientButton>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto mt-12">
                <GlassCard className="p-4">
                  <div className="flex items-center justify-center mb-2">
                    <Building2 className="w-6 h-6 text-primary-mint" />
                  </div>
                  <p className="text-2xl font-bold font-heading">{cities.length}</p>
                  <p className="text-sm text-gray-600 font-body">Cities</p>
                </GlassCard>
                
                <GlassCard className="p-4">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="w-6 h-6 text-primary-sky" />
                  </div>
                  <p className="text-2xl font-bold font-heading">
                    {cities.reduce((acc, city) => acc + city.agencyCount, 0)}
                  </p>
                  <p className="text-sm text-gray-600 font-body">Agencies</p>
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
                <h2 className="text-3xl font-heading mb-6 text-center">About Fostering in {region.name}</h2>
                <div className="prose prose-lg max-w-none font-body">
                  <p className="text-gray-700 leading-relaxed">
                    {region.description}
                  </p>
                  <p className="text-gray-700 leading-relaxed mt-4">
                    {region.name} has a diverse fostering landscape with agencies serving urban centers, suburban communities, 
                    and specialized needs. The regulatory framework is overseen by Ofsted, ensuring high standards across 
                    all registered agencies.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
      </AnimatedSection>

      {/* Cities */}
      <AnimatedSection delay={0.2}>
        <section id="cities" className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading mb-4">Cities in {region.name}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-body">
                Explore fostering opportunities across different cities in {region.name}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {cities.map((city) => (
                <GlassCard key={city.id} className="hover-lift transition-all hover:scale-105 rounded-xxl">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-mint/20 to-primary-sky/20 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-primary-mint" />
                      </div>
                      <span className="text-xs bg-primary-mint/10 text-primary-mint px-2 py-1 rounded-full font-body">
                        {city.agencyCount} agencies
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-heading mb-2">{city.name}</h3>
                    <p className="text-gray-600 text-sm mb-4 font-body">{city.description}</p>
                    
                    <GradientButton asChild variant="outline" size="sm" className="w-full">
                      <Link href={`/fostering-agencies-uk/${region.country.slug}/${region.slug}/${city.slug}`}>
                        Explore <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </GradientButton>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Featured Agencies */}
      <AnimatedSection delay={0.3}>
        <section id="agencies" className="py-12 md:py-16 bg-gradient-to-br from-primary-sky/5 to-white/70">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-heading mb-4">Featured Agencies in {region.name}</h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-body">
                Discover top-rated fostering agencies in {region.name}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {agencies.map((agency) => (
                <AgencyCard key={agency.id} agency={agency} />
              ))}
            </div>
            
            <div className="text-center mt-10">
              <GradientButton asChild>
                <Link href={`/fostering-agencies-uk?region=${region.slug}`}>
                  View All Agencies in {region.name} <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </GradientButton>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA */}
      <AnimatedSection delay={0.4}>
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
                    Start Your Fostering Journey in {region.name}
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