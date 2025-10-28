'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Star, Heart, Filter, ArrowRight } from 'lucide-react';

export default function AgenciesPage() {
  const [agencies, setAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get('search');
    if (searchParam) {
      setSearchQuery(searchParam);
    }
    fetchAgencies(searchParam || '');
  }, []);

  const fetchAgencies = async (search = searchQuery) => {
    setLoading(true);
    try {
      let url = '/api/agencies?limit=50';
      if (search) url += `&search=${encodeURIComponent(search)}`;
      if (typeFilter && typeFilter !== 'all') url += `&type=${typeFilter}`;

      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        let agencyList = data.agencies || [];

        // Sort agencies
        if (sortBy === 'rating') {
          agencyList.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        } else if (sortBy === 'name') {
          agencyList.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === 'reviews') {
          agencyList.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0));
        }

        setAgencies(agencyList);
      }
    } catch (error) {
      console.error('Error fetching agencies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchAgencies();
  };

  const handleFilterChange = (value, type) => {
    if (type === 'type') {
      setTypeFilter(value);
    } else if (type === 'sort') {
      setSortBy(value);
    }
    setTimeout(() => fetchAgencies(), 100);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'fill-yellow-400 text-yellow-400'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E9E2] to-white">
      {/* Header */}
      <div className="relative py-12 md:py-16 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#773344]/10 rounded-full blur-3xl float-animation" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#E3B5A4]/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Heart className="w-4 h-4 text-[#773344]" />
              <span className="text-sm font-medium text-[#2C2C2C]">UK's Leading Fostering Directory</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#2C2C2C] mb-4 font-poppins text-center gradient-text">
              Browse Fostering Agencies
            </h1>
            <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover trusted fostering agencies across the UK. Filter by location, type, and rating to find the perfect match.
            </p>
          </div>

          {/* Modern Search Bar */}
          <div className="glass-strong rounded-3xl p-6 max-w-3xl mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by location, city, or postcode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-base border-2 border-white/30 bg-white/50 backdrop-blur-sm focus:border-[#773344] rounded-2xl"
                />
              </div>
              <Button 
                type="submit"
                size="lg"
                className="h-12 px-8 btn-futuristic text-base font-semibold rounded-2xl"
              >
                Search Agencies
              </Button>
            </form>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filters:</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Select value={typeFilter} onValueChange={(value) => handleFilterChange(value, 'type')}>
              <SelectTrigger className="w-full sm:w-[200px] glass rounded-2xl">
                <SelectValue placeholder="Agency Type" />
              </SelectTrigger>
              <SelectContent className="glass rounded-2xl border-0">
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Private">Private</SelectItem>
                <SelectItem value="Charity">Charity</SelectItem>
                <SelectItem value="Local Authority">Local Authority</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value) => handleFilterChange(value, 'sort')}>
              <SelectTrigger className="w-full sm:w-[200px] glass rounded-2xl">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent className="glass rounded-2xl border-0">
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviewed</SelectItem>
                <SelectItem value="name">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-[#2C2C2C]">{agencies.length}</span> agencies
          </p>
        </div>

        {/* Agency Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-3xl animate-pulse glass" />
            ))}
          </div>
        ) : agencies.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agencies.map((agency) => (
              <Card key={agency.id} className="glass-strong rounded-3xl group hover-lift cursor-pointer">
                <Link href={`/agency/${agency.id}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#773344]/20 to-[#E3B5A4]/20 flex items-center justify-center">
                        {agency.logo ? (
                          <Image src={agency.logo} alt={agency.name} width={48} height={48} className="rounded" />
                        ) : (
                          <Heart className="w-8 h-8 text-[#773344]" />
                        )}
                      </div>
                      {agency.featured && (
                        <Badge className="bg-gradient-to-r from-[#773344] to-[#E3B5A4] text-white border-0">
                          Featured
                        </Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl group-hover:text-[#773344] transition-colors">
                      {agency.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-2">
                      <MapPin className="w-4 h-4" />
                      {agency.city || 'UK'}{agency.region && `, ${agency.region}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                      {agency.description || 'Dedicated to providing exceptional foster care services.'}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        {renderStars(agency.rating || 0)}
                        <span className="text-sm text-gray-600 ml-2">
                          ({agency.review_count || 0})
                        </span>
                      </div>
                      <Badge variant="outline" className="glass border-2">
                        {agency.type}
                      </Badge>
                    </div>
                    {agency.recruiting && (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 glass">
                        Currently Recruiting
                      </Badge>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button 
                      variant="ghost" 
                      className="w-full group-hover:bg-[#773344]/10 group-hover:text-[#773344] rounded-xl"
                    >
                      View Profile <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="glass-strong rounded-3xl p-12 text-center">
            <CardContent>
              <p className="text-lg text-gray-600 mb-4">No agencies found matching your criteria.</p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setTypeFilter('all');
                  fetchAgencies('');
                }}
                className="btn-futuristic rounded-xl"
              >
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}