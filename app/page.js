'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, MapPin, Star, ArrowRight, CheckCircle2, Heart, Users, Shield, BookOpen } from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [featuredAgencies, setFeaturedAgencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedAgencies();
  }, []);

  const fetchFeaturedAgencies = async () => {
    try {
      const response = await fetch('/api/agencies?featured=true&limit=6');
      if (response.ok) {
        const data = await response.json();
        setFeaturedAgencies(data.agencies || []);
      }
    } catch (error) {
      console.error('Error fetching featured agencies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/agencies?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#7CE2A7]/10 via-[#7DC3EB]/10 to-[#F9CBA2]/10 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1759060413464-cb0c965d82f8"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-[#2C2C2C] mb-6 font-poppins">
              Find Your Perfect{' '}
              <span className="bg-gradient-to-r from-[#7CE2A7] to-[#7DC3EB] bg-clip-text text-transparent">
                Fostering Agency
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Connecting caring hearts with fostering opportunities across the UK. 
              Browse verified agencies, read reviews, and start your fostering journey today.
            </p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by location, city, or postcode..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base border-2 focus:border-[#7CE2A7]"
                />
              </div>
              <Button 
                type="submit"
                size="lg"
                className="h-12 px-8 bg-gradient-to-r from-[#7CE2A7] to-[#7DC3EB] text-white hover:opacity-90"
              >
                Search
              </Button>
            </form>

            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="text-gray-600">Popular:</span>
              {['London', 'Manchester', 'Birmingham', 'Glasgow'].map((city) => (
                <Link 
                  key={city}
                  href={`/agencies?search=${city}`}
                  className="px-3 py-1 rounded-full bg-white hover:bg-[#7CE2A7]/20 transition-colors border border-gray-200"
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4 font-poppins">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Finding the right fostering agency is easy with our simple three-step process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Search,
                title: 'Search & Discover',
                description: 'Browse through verified fostering agencies in your area with detailed profiles and reviews.',
                color: '#7CE2A7',
              },
              {
                icon: Users,
                title: 'Compare & Learn',
                description: 'Read real reviews, compare services, and learn about each agency\'s approach to fostering.',
                color: '#7DC3EB',
              },
              {
                icon: Heart,
                title: 'Connect & Start',
                description: 'Contact agencies directly, ask questions, and begin your rewarding fostering journey.',
                color: '#F9CBA2',
              },
            ].map((step, index) => (
              <Card key={index} className="relative border-2 hover:border-[#7CE2A7] transition-all hover:shadow-lg">
                <CardHeader>
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4 mx-auto"
                    style={{ backgroundColor: `${step.color}20` }}
                  >
                    <step.icon className="w-8 h-8" style={{ color: step.color }} />
                  </div>
                  <CardTitle className="text-center text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">
                    {step.description}
                  </CardDescription>
                </CardContent>
                <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-gradient-to-br from-[#7CE2A7] to-[#7DC3EB] flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Agencies */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-white to-[#7CE2A7]/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-2 font-poppins">
                Featured Agencies
              </h2>
              <p className="text-gray-600">Trusted fostering agencies across the UK</p>
            </div>
            <Button variant="outline" asChild className="hidden md:flex">
              <Link href="/agencies">
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : featuredAgencies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAgencies.map((agency) => (
                <AgencyCard key={agency.id} agency={agency} />
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <CardDescription>
                No featured agencies available yet. Check back soon!
              </CardDescription>
            </Card>
          )}

          <div className="mt-8 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link href="/agencies">
                View All Agencies <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 relative">
        <div className="absolute inset-0 opacity-5">
          <Image
            src="https://images.unsplash.com/photo-1761030293423-130d4c937ead"
            alt="Testimonial background"
            fill
            className="object-cover"
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4 font-poppins">
              Success Stories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from families who found their perfect match through our directory
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: 'Sarah & James',
                location: 'Manchester',
                quote: 'Finding the right agency was overwhelming until we discovered this directory. The reviews and detailed profiles helped us make the perfect choice.',
                rating: 5,
              },
              {
                name: 'Emma Thompson',
                location: 'London',
                quote: 'As a single foster carer, I needed an agency that understood my situation. This platform made it so easy to find and connect with the right support.',
                rating: 5,
              },
              {
                name: 'David & Claire',
                location: 'Birmingham',
                quote: 'The transparency and genuine reviews gave us confidence. We\'re now fostering two wonderful children and couldn\'t be happier with our agency.',
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="border-2">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </CardDescription>
                    </div>
                    <Badge className="bg-[#7CE2A7]">
                      <Star className="w-3 h-3 mr-1 fill-white" />
                      {testimonial.rating}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Highlight */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#7DC3EB]/10 to-[#F9CBA2]/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <BookOpen className="w-16 h-16 mx-auto mb-6 text-[#7DC3EB]" />
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4 font-poppins">
              Resources & Guides
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Everything you need to know about fostering in the UK. From legal requirements 
              to heartwarming success stories, we've got you covered.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild className="bg-gradient-to-r from-[#7DC3EB] to-[#7CE2A7]">
                <Link href="/resources">
                  Browse Resources <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/resources/getting-started">
                  Getting Started Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-[#7CE2A7] to-[#7DC3EB] border-0 text-white">
            <CardContent className="p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <Shield className="w-16 h-16 mx-auto mb-6" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">
                  Are You a Fostering Agency?
                </h2>
                <p className="text-lg mb-8 text-white/90">
                  Join our trusted directory and connect with families looking for the perfect fostering partnership. 
                  Get started with a free basic listing today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-white text-[#7CE2A7] hover:bg-gray-100">
                    Register Your Agency
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Learn More
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

function AgencyCard({ agency }) {
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
    <Card className="group hover:shadow-xl transition-all hover:-translate-y-1 cursor-pointer">
      <Link href={`/agency/${agency.id}`}>
        <CardHeader>
          <div className="flex items-start justify-between mb-4">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#7CE2A7]/20 to-[#7DC3EB]/20 flex items-center justify-center">
              {agency.logo ? (
                <Image src={agency.logo} alt={agency.name} width={48} height={48} className="rounded" />
              ) : (
                <Heart className="w-8 h-8 text-[#7CE2A7]" />
              )}
            </div>
            {agency.featured && (
              <Badge className="bg-[#F9CBA2]">Featured</Badge>
            )}
          </div>
          <CardTitle className="text-xl group-hover:text-[#7CE2A7] transition-colors">
            {agency.name}
          </CardTitle>
          <CardDescription className="flex items-center gap-1 mt-2">
            <MapPin className="w-4 h-4" />
            {agency.location?.city || 'UK'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {agency.description || 'Dedicated to providing exceptional foster care services.'}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {renderStars(agency.rating || 0)}
              <span className="text-sm text-gray-600 ml-2">
                ({agency.reviewCount || 0})
              </span>
            </div>
            <Badge variant="outline">{agency.type}</Badge>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="ghost" className="w-full group-hover:bg-[#7CE2A7]/10 group-hover:text-[#7CE2A7]">
            View Profile <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}