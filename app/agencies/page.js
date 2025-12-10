'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Star, Heart, Filter, Users, Clock, Shield } from 'lucide-react';

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
    const newUrl = new URL(window.location);
    if (searchQuery) {
      newUrl.searchParams.set('search', searchQuery);
    } else {
      newUrl.searchParams.delete('search');
    }
    window.history.replaceState({}, '', newUrl);
    fetchAgencies(searchQuery);
  };

  const filteredAgencies = agencies.filter(agency => {
    const matchesSearch = agency.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agency.location?.city?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         agency.location?.region?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || agency.type === typeFilter;
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="w-full">
        <section className="py-16 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-brand-dark mb-4">Loading Agencies...</h1>
              <p className="text-neutral-600">Fetching the latest fostering agencies for you</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-brand-main to-blue-900 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-6">
              Find Your Perfect Fostering Agency
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              Browse verified fostering agencies across the UK. Filter by location, type, and ratings to find the best match for your needs.
            </p>
            
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search by agency name, city, or region..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 py-6 text-base rounded-full"
                  />
                </div>
                <Button type="submit" className="bg-brand-accent text-white px-8 py-6 rounded-full hover:bg-emerald-700">
                  Search
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Stats and Filters */}
      <section className="py-8 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-accent" />
                <span className="font-medium">{filteredAgencies.length} Agencies</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-accent" />
                <span className="font-medium">30-day Avg. Approval</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-40">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Agency Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="local">Local Authority</SelectItem>
                  <SelectItem value="independent">Independent</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="voluntary">Voluntary</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort By" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="name">Name A-Z</SelectItem>
                  <SelectItem value="reviews">Most Reviewed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Agencies Grid */}
      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredAgencies.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-brand-dark mb-4">No Agencies Found</h2>
              <p className="text-neutral-600 mb-6">Try adjusting your search or filters</p>
              <Button 
                onClick={() => {
                  setSearchQuery('');
                  setTypeFilter('all');
                  setSortBy('rating');
                }}
                variant="outline"
                className="border-brand-main text-brand-main hover:bg-brand-main/5"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAgencies.map((agency, index) => (
                  <motion.div
                    key={agency.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <Card className="rounded-2xl border border-neutral-200 hover:shadow-md transition-all h-full flex flex-col">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-16 h-16 rounded-lg bg-brand-accentSoft flex items-center justify-center">
                            {agency.logo ? (
                              <img src={agency.logo} alt={agency.name} className="w-10 h-10 object-contain" />
                            ) : (
                              <Heart className="w-8 h-8 text-brand-accent" />
                            )}
                          </div>
                          {agency.featured && (
                            <Badge className="bg-brand-accent text-white rounded-full">
                              Featured
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl group-hover:text-brand-accent transition-colors">
                          {agency.name}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-2">
                          <MapPin className="w-4 h-4" />
                          {agency.location?.city || "UK"}, {agency.location?.region || "Nationwide"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-neutral-700 line-clamp-3 mb-4">
                          {agency.description || "Dedicated to providing exceptional foster care services."}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }, (_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(agency.rating || 0)
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                            <span className="text-sm text-neutral-700 ml-2">
                              ({agency.reviewCount || 0})
                            </span>
                          </div>
                          <Badge variant="outline" className="rounded-full">
                            {agency.type || "Independent"}
                          </Badge>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button
                          variant="outline"
                          className="w-full text-brand-main border-brand-main hover:bg-brand-main/5 rounded-full"
                          asChild
                        >
                          <Link href={`/agencies/${agency.slug}`}>
                            View Profile
                          </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-brand-accentSoft w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-brand-dark/80 mb-8">
              Our team can help you find the perfect fostering agency for your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-brand-accent text-white px-8 py-4 rounded-full hover:bg-emerald-700">
                Contact Our Team
              </Button>
              <Button variant="outline" className="border-brand-main text-brand-main hover:bg-brand-main/5 rounded-full">
                Learn About Fostering
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}