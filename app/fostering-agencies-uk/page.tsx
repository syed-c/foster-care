'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Search, 
  MapPin, 
  Star, 
  Heart, 
  Filter, 
  ArrowRight,
  Users,
  Building2
} from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { GradientButton } from '@/components/ui/GradientButton';
import { AnimatedSection } from '@/components/animations/AnimatedSection';
import { AgencyCard } from '@/components/cards/AgencyCard';

// Mock data - would be replaced with API calls in production
const mockAgencies = [
  {
    id: '1',
    name: 'Bright Futures Fostering',
    slug: 'bright-futures-fostering',
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
    name: 'Scottish Family Care',
    slug: 'scottish-family-care',
    location: { city: 'Edinburgh', region: 'Lothian' },
    description: 'Providing compassionate care for children across Scotland for over 25 years.',
    rating: 4.9,
    reviewCount: 38,
    type: 'Local Authority',
    featured: true,
    logoUrl: null,
    country: 'scotland',
    recruiting: true
  },
  {
    id: '3',
    name: 'Welsh Hearts Together',
    slug: 'welsh-hearts-together',
    location: { city: 'Cardiff', region: 'South Wales' },
    description: 'Welsh-speaking fostering service with specialized support for cultural needs.',
    rating: 4.7,
    reviewCount: 29,
    type: 'Independent',
    featured: false,
    logoUrl: null,
    country: 'wales',
    recruiting: false
  },
  {
    id: '4',
    name: 'Northern Care Alliance',
    slug: 'northern-care-alliance',
    location: { city: 'Manchester', region: 'Greater Manchester' },
    description: 'Comprehensive fostering services with specialist support for complex needs.',
    rating: 4.6,
    reviewCount: 35,
    type: 'Charity',
    featured: true,
    logoUrl: null,
    country: 'england',
    recruiting: true
  },
  {
    id: '5',
    name: 'Belfast Family Support',
    slug: 'belfast-family-support',
    location: { city: 'Belfast', region: 'County Antrim' },
    description: 'Dedicated to finding loving homes for children in Northern Ireland.',
    rating: 4.5,
    reviewCount: 28,
    type: 'Private',
    featured: false,
    logoUrl: null,
    country: 'northern-ireland',
    recruiting: true
  },
  {
    id: '6',
    name: 'Yorkshire Children First',
    slug: 'yorkshire-children-first',
    location: { city: 'Leeds', region: 'West Yorkshire' },
    description: 'Regional fostering agency with over 20 years of experience.',
    rating: 4.4,
    reviewCount: 31,
    type: 'Local Authority',
    featured: false,
    logoUrl: null,
    country: 'england',
    recruiting: false
  }
];

const agencyTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'Private', label: 'Private' },
  { value: 'Charity', label: 'Charity' },
  { value: 'Local Authority', label: 'Local Authority' }
];

const sortOptions = [
  { value: 'rating', label: 'Highest Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
  { value: 'name', label: 'A-Z' }
];

export default function BrowseAgenciesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [agencies, setAgencies] = useState(mockAgencies);
  const [filteredAgencies, setFilteredAgencies] = useState(mockAgencies);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');
  const [isLoading, setIsLoading] = useState(false);

  // Initialize filters from URL params
  useEffect(() => {
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || 'all';
    const sort = searchParams.get('sort') || 'rating';
    
    setSearchQuery(search);
    setTypeFilter(type);
    setSortBy(sort);
  }, [searchParams]);

  // Apply filters and sorting
  useEffect(() => {
    let result = [...mockAgencies];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(agency => 
        agency.name.toLowerCase().includes(query) ||
        agency.location.city.toLowerCase().includes(query) ||
        agency.location.region.toLowerCase().includes(query) ||
        agency.description.toLowerCase().includes(query)
      );
    }
    
    // Apply type filter
    if (typeFilter !== 'all') {
      result = result.filter(agency => agency.type === typeFilter);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === 'rating') {
        return (b.rating || 0) - (a.rating || 0);
      } else if (sortBy === 'reviews') {
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
    
    setFilteredAgencies(result);
  }, [searchQuery, typeFilter, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateUrlParams();
  };

  const updateUrlParams = () => {
    const params = new URLSearchParams();
    
    if (searchQuery) params.set('search', searchQuery);
    if (typeFilter !== 'all') params.set('type', typeFilter);
    if (sortBy !== 'rating') params.set('sort', sortBy);
    
    router.push(`/fostering-agencies-uk?${params.toString()}`);
  };

  const handleFilterChange = (value: string, filterType: string) => {
    if (filterType === 'type') {
      setTypeFilter(value);
    } else if (filterType === 'sort') {
      setSortBy(value);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setSortBy('rating');
    router.push('/fostering-agencies-uk');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-ivory to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-ivory to-primary-sky/20 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <AnimatedSection>
            <h1 className="text-3xl md:text-5xl font-bold text-text-charcoal mb-4 font-heading text-center">
              Browse Fostering Agencies
            </h1>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto font-body">
              Discover trusted fostering agencies across the UK. Filter by location, type, and rating to find the perfect match.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by location, city, or postcode..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 h-12 text-base border-2 focus:border-primary-mint font-body rounded-xl"
                  />
                </div>
                <GradientButton type="submit" size="lg" className="h-12 px-8">
                  Search
                </GradientButton>
              </div>
            </form>
          </AnimatedSection>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <AnimatedSection>
          <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
            <div className="flex items-center gap-2 text-gray-600 font-body">
              <Filter className="w-5 h-5" />
              <span className="font-medium">Filters:</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <select 
                value={typeFilter}
                onChange={(e) => handleFilterChange(e.target.value, 'type')}
                className="w-full sm:w-[200px] p-2 border rounded-lg font-body"
              >
                {agencyTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>

              <select 
                value={sortBy}
                onChange={(e) => handleFilterChange(e.target.value, 'sort')}
                className="w-full sm:w-[200px] p-2 border rounded-lg font-body"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </AnimatedSection>

        {/* Results Count */}
        <AnimatedSection>
          <div className="mb-6">
            <p className="text-gray-600 font-body">
              Showing <span className="font-semibold text-text-charcoal">{filteredAgencies.length}</span> agencies
              {searchQuery && (
                <span> for "<span className="font-semibold">{searchQuery}</span>"</span>
              )}
            </p>
            
            {(searchQuery || typeFilter !== 'all' || sortBy !== 'rating') && (
              <button 
                onClick={clearFilters}
                className="text-sm text-primary-mint hover:underline mt-1 font-body"
              >
                Clear filters
              </button>
            )}
          </div>
        </AnimatedSection>

        {/* Agency Grid */}
        <AnimatedSection>
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-80 bg-gray-200 rounded-xxl animate-pulse" />
              ))}
            </div>
          ) : filteredAgencies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgencies.map((agency) => (
                <AgencyCard key={agency.id} agency={agency} />
              ))}
            </div>
          ) : (
            <GlassCard className="p-12 text-center rounded-xxl">
              <div className="py-8">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-heading mb-2">No Agencies Found</h3>
                <p className="text-gray-600 mb-6 font-body">
                  No agencies match your current filters. Try adjusting your search criteria.
                </p>
                <GradientButton onClick={clearFilters}>
                  Clear Filters
                </GradientButton>
              </div>
            </GlassCard>
          )}
        </AnimatedSection>

        {/* CTA Section */}
        <AnimatedSection>
          <div className="mt-16">
            <GlassCard className="rounded-xxl p-8 text-center">
              <h2 className="text-2xl font-heading mb-4">Are you a Fostering Agency?</h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto font-body">
                Join our trusted directory and connect with families looking for the perfect fostering partnership.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <GradientButton asChild>
                  <Link href="/auth/register">
                    Register Your Agency
                  </Link>
                </GradientButton>
                <GradientButton asChild variant="outline">
                  <Link href="/contact">
                    Learn More
                  </Link>
                </GradientButton>
              </div>
            </GlassCard>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}