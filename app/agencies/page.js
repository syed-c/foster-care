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

  const fetchAgencies = async (search) => {
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
    fetchAgencies(searchQuery);
  };

  const handleFilterChange = (value, type) => {
    if (type === 'type') {
      setTypeFilter(value);
    } else if (type === 'sort') {
      setSortBy(value);
    }
    setTimeout(() => fetchAgencies(searchQuery), 100);
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
    <div className="min-h-screen bg-background-offwhite">
      {/* Header */}
      <div className="bg-gradient-to-r from-background-offwhite to-secondary-blue/20 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-text-charcoal mb-4 font-poppins text-center">
            Browse Fostering Agencies
          </h1>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto font-inter">
            Discover trusted fostering agencies across the UK. Filter by location, type, and rating to find the perfect match.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by location, city, or postcode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base border-2 focus:border-primary-green font-inter"
                />
              </div>
              <Button 
                type="submit"
                size="lg"
                className="h-12 px-8 bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 font-inter"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
          <div className="flex items-center gap-2 text-gray-600 font-inter">
            <Filter className="w-5 h-5" />
            <span className="font-medium">Filters:</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <Select value={typeFilter} onValueChange={(value) => handleFilterChange(value, 'type')}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Agency Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Private">Private</SelectItem>
                <SelectItem value="Charity">Charity</SelectItem>
                <SelectItem value="Local Authority">Local Authority</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value) => handleFilterChange(value, 'sort')}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviewed</SelectItem>
                <SelectItem value="name">A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 font-inter">
            Showing <span className="font-semibold text-text-charcoal">{agencies.length}</span> agencies
          </p>
        </div>

        {/* Agency Grid */}
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-modern animate-pulse" />
            ))}
          </div>
        ) : agencies.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agencies.map((agency) => (
              <Card key={agency.id} className="glass-card group hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer rounded-modern">
                <Link href={`/agency/${agency.id}`}>
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 flex items-center justify-center">
                        {agency.logo ? (
                          <Image src={agency.logo} alt={agency.name} width={48} height={48} className="rounded" />
                        ) : (
                          <Heart className="w-8 h-8 text-primary-green" />
                        )}
                      </div>
                      {agency.featured && (
                        <Badge className="bg-accent-peach font-inter">Featured</Badge>
                      )}
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary-green transition-colors font-poppins">
                      {agency.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-1 mt-2 font-inter">
                      <MapPin className="w-4 h-4" />
                      {agency.city || 'UK'}{agency.region && `, ${agency.region}`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4 font-inter">
                      {agency.description || 'Dedicated to providing exceptional foster care services.'}
                    </p>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1">
                        {renderStars(agency.rating || 0)}
                        <span className="text-sm text-gray-600 ml-2 font-inter">
                          ({agency.review_count || 0})
                        </span>
                      </div>
                      <Badge variant="outline" className="font-inter">{agency.type}</Badge>
                    </div>
                    {agency.recruiting && (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200 font-inter">
                        Currently Recruiting
                      </Badge>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full group-hover:bg-primary-green/10 group-hover:text-primary-green font-inter">
                      View Profile <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Link>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="glass-card p-12 text-center rounded-modern">
            <CardContent>
              <p className="text-lg text-gray-600 mb-4 font-inter">No agencies found matching your criteria.</p>
              <Button onClick={() => {
                setSearchQuery('');
                setTypeFilter('all');
                fetchAgencies('');
              }} className="font-inter">
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}