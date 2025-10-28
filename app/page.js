"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  MapPin,
  Star,
  ArrowRight,
  CheckCircle2,
  Heart,
  Users,
  Shield,
  BookOpen,
  FileText,
} from "lucide-react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredAgencies, setFeaturedAgencies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedAgencies();
  }, []);

  const fetchFeaturedAgencies = async () => {
    try {
      const response = await fetch("/api/agencies?featured=true&limit=6");
      if (response.ok) {
        const data = await response.json();
        setFeaturedAgencies(data.agencies || []);
      }
    } catch (error) {
      console.error("Error fetching featured agencies:", error);
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
    <div className="min-h-screen bg-gradient-to-br from-[#F5E9E2] to-white">
      {/* Modern Hero Header with Glassmorphism */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-[#773344]/10 to-[#E3B5A4]/10 border-b-4 border-[#773344]/20">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-[#773344]/15 rounded-full blur-3xl float-animation" />
          <div
            className="absolute bottom-10 right-10 w-80 h-80 bg-[#E3B5A4]/15 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/4 w-40 h-40 bg-[#FFD700]/10 rounded-full blur-2xl float-animation-slow"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-[#773344]/10 rounded-full blur-3xl float-animation-slow"
            style={{ animationDelay: "3s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Heart className="w-4 h-4 text-[#773344]" />
              <span className="text-sm font-medium text-[#2C2C2C]">
                Foster Care Directory
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-[#2C2C2C] mb-6 font-poppins">
              Find Your Perfect{" "}
              <span className="bg-gradient-to-r from-[#773344] to-[#E3B5A4] bg-clip-text text-transparent">
                Fostering Agency
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Connecting caring hearts with fostering opportunities across the
              UK. Browse verified agencies, read reviews, and start your
              fostering journey today.
            </p>

            {/* Modern Search Bar with Glass Effect */}
            <div className="glass-strong rounded-3xl p-6 max-w-2xl mx-auto mb-6">
              <form
                onSubmit={handleSearch}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by location, city, or postcode..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 text-base rounded-xl bg-white/50 border-0 focus-visible:ring-2 focus-visible:ring-[#773344]"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 px-8 bg-gradient-to-r from-[#773344] to-[#E3B5A4] text-white hover:opacity-90 rounded-xl btn-futuristic"
                >
                  Search
                </Button>
              </form>
            </div>

            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="text-gray-600">Popular:</span>
              {["London", "Manchester", "Birmingham", "Glasgow"].map((city) => (
                <Link
                  key={city}
                  href={`/agencies?search=${city}`}
                  className="px-4 py-1 rounded-full glass hover:bg-white/50 transition-colors hover-lift"
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-10 w-64 h-64 bg-[#773344]/5 rounded-full blur-3xl float-animation" />
          <div
            className="absolute bottom-1/4 left-10 w-72 h-72 bg-[#E3B5A4]/5 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <CheckCircle2 className="w-4 h-4 text-[#773344]" />
              <span className="text-sm font-medium text-[#2C2C2C]">
                Simple Process
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4 font-poppins">
              How It Works
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Finding the right fostering agency is easy with our simple
              three-step process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Search,
                title: "Search & Discover",
                description:
                  "Browse through verified fostering agencies in your area with detailed profiles and reviews.",
                color: "#773344",
              },
              {
                icon: Users,
                title: "Compare & Learn",
                description:
                  "Read real reviews, compare services, and learn about each agency's approach to fostering.",
                color: "#E3B5A4",
              },
              {
                icon: Heart,
                title: "Connect & Start",
                description:
                  "Contact agencies directly, ask questions, and begin your rewarding fostering journey.",
                color: "#773344",
              },
            ].map((step, index) => (
              <Card
                key={index}
                className="glass-strong rounded-3xl hover-lift transition-all"
              >
                <CardHeader>
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto bg-gradient-to-br"
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, ${step.color}20, ${step.color}40)`,
                    }}
                  >
                    <step.icon
                      className="w-8 h-8"
                      style={{ color: step.color }}
                    />
                  </div>
                  <CardTitle className="text-center text-xl">
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base">
                    {step.description}
                  </CardDescription>
                </CardContent>
                <div
                  className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-[#773344] to-[#E3B5A4] flex items-center justify-center text-white font-bold shadow-lg animate-pulse-slow"
                  style={{
                    background:
                      index === 0
                        ? "linear-gradient(135deg, #FF6B6B, #FF8E53)"
                        : index === 1
                          ? "linear-gradient(135deg, #6A11CB, #2575FC)"
                          : "linear-gradient(135deg, #11998E, #38EF7D)",
                  }}
                >
                  <span className="text-xl">{index + 1}</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Agencies */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 gradient-mesh opacity-20" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-10 w-64 h-64 bg-[#773344]/5 rounded-full blur-3xl float-animation" />
          <div
            className="absolute bottom-1/3 right-10 w-72 h-72 bg-[#E3B5A4]/5 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
                <Shield className="w-4 h-4 text-[#773344]" />
                <span className="text-sm font-medium text-[#2C2C2C]">
                  Verified Agencies
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-2 font-poppins">
                Featured Agencies
              </h2>
              <p className="text-gray-600">
                Trusted fostering agencies across the UK
              </p>
            </div>
            <Button
              variant="ghost"
              asChild
              className="hidden md:flex glass rounded-xl hover-lift mt-4 md:mt-0"
            >
              <Link href="/agencies">
                View All <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-64 glass-strong rounded-3xl animate-pulse"
                />
              ))}
            </div>
          ) : featuredAgencies.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredAgencies.map((agency) => (
                <AgencyCard key={agency.id} agency={agency} />
              ))}
            </div>
          ) : (
            <Card className="glass-strong rounded-3xl p-12 text-center">
              <CardDescription>
                No featured agencies available yet. Check back soon!
              </CardDescription>
            </Card>
          )}

          <div className="mt-8 text-center md:hidden">
            <Button
              variant="ghost"
              asChild
              className="glass rounded-xl hover-lift"
            >
              <Link href="/agencies">
                View All Agencies <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#773344]/10 rounded-full blur-3xl float-animation" />
          <div
            className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#E3B5A4]/10 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Star className="w-4 h-4 text-[#773344]" />
              <span className="text-sm font-medium text-[#2C2C2C]">
                Testimonials
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4 font-poppins">
              Success Stories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from families who found their perfect match through our
              directory
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: "Sarah & James",
                location: "Manchester",
                quote:
                  "Finding the right agency was overwhelming until we discovered this directory. The reviews and detailed profiles helped us make the perfect choice.",
                rating: 5,
              },
              {
                name: "Emma Thompson",
                location: "London",
                quote:
                  "As a single foster carer, I needed an agency that understood my situation. This platform made it so easy to find and connect with the right support.",
                rating: 5,
              },
              {
                name: "David & Claire",
                location: "Birmingham",
                quote:
                  "The transparency and genuine reviews gave us confidence. We're now fostering two wonderful children and couldn't be happier with our agency.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <Card key={index} className="glass-strong rounded-3xl hover-lift">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <CardTitle className="text-lg">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {testimonial.location}
                      </CardDescription>
                    </div>
                    <Badge className="bg-gradient-to-r from-[#773344] to-[#E3B5A4] text-white border-0">
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
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#F5E9E2]/70 to-white/70" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-[#773344]/10 rounded-full blur-3xl float-animation-slow" />
          <div
            className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-[#E3B5A4]/10 rounded-full blur-3xl float-animation-slow"
            style={{ animationDelay: "3s" }}
          />
          {/* Additional decorative elements */}
          <div
            className="absolute top-20 left-20 w-40 h-40 border border-[#773344]/20 rounded-full float-animation-slow"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-20 right-20 w-60 h-60 border border-[#E3B5A4]/20 rounded-full float-animation-slow"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <BookOpen className="w-4 h-4 text-[#773344]" />
              <span className="text-sm font-medium text-[#2C2C2C]">
                Knowledge Hub
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#2C2C2C] mb-4 font-poppins">
              Resources & <span className="text-[#773344]">Guides</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Everything you need to know about fostering in the UK. From legal
              requirements to heartwarming success stories, we've got you
              covered.
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
              <div className="glass p-6 rounded-2xl hover-lift">
                <BookOpen className="w-8 h-8 text-[#773344] mb-3" />
                <h3 className="font-semibold text-lg mb-2">Getting Started</h3>
                <p className="text-sm text-gray-600">
                  Essential information for those beginning their fostering
                  journey
                </p>
              </div>
              <div className="glass p-6 rounded-2xl hover-lift">
                <FileText className="w-8 h-8 text-[#773344] mb-3" />
                <h3 className="font-semibold text-lg mb-2">
                  Legal Requirements
                </h3>
                <p className="text-sm text-gray-600">
                  Understanding the legal aspects of becoming a foster carer
                </p>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-[#773344] to-[#E3B5A4] text-white hover:opacity-90 hover:scale-105 transition-all shadow-md"
              >
                <Link href="/resources">
                  Browse Resources <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-[#773344] text-[#773344] hover:bg-[#773344]/5 hover:scale-105 transition-all"
              >
                <Link href="/resources/getting-started">
                  Getting Started Guide
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#773344]/40 to-[#E3B5A4]/40" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#773344]/30 rounded-full blur-3xl float-animation-slow" />
          <div
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-[#E3B5A4]/30 rounded-full blur-3xl float-animation-slow"
            style={{ animationDelay: "4s" }}
          />
          {/* Additional floating elements */}
          <div
            className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/10 rounded-full blur-xl float-animation"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute bottom-1/3 right-1/3 w-32 h-32 bg-white/10 rounded-full blur-xl float-animation"
            style={{ animationDelay: "3s" }}
          />
          <div className="absolute top-1/3 right-1/2 w-16 h-16 border border-white/20 rounded-full float-animation-slow" />
          <div
            className="absolute bottom-1/2 left-1/2 w-20 h-20 border border-white/20 rounded-full float-animation-slow"
            style={{ animationDelay: "2.5s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Card className="glass-card-gradient border-0 text-white rounded-3xl overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-[#773344]/90 to-[#E3B5A4]/80 z-0" />
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-15 z-0" />
            <CardContent className="p-8 md:p-12 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 font-poppins text-white drop-shadow-md">
                  Are You a Fostering Agency?
                </h2>
                <p className="text-lg md:text-xl mb-8 text-white/90">
                  Join our trusted directory and connect with families looking
                  for the perfect fostering partnership. Get started with a free
                  basic listing today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-white text-[#773344] hover:bg-white/90 hover:scale-105 transition-all shadow-lg border-2 border-white/20 px-8 py-6 text-lg font-semibold"
                  >
                    Register Your Agency
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-gradient-to-r from-[#773344] to-[#E3B5A4] text-white hover:opacity-90 hover:scale-105 transition-all shadow-md px-8 py-6 text-lg font-semibold"
                  >
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
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="glass-strong rounded-xl hover-lift transition-all cursor-pointer">
      <Link href={`/agency/${agency.id}`}>
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
            {agency.location?.city || "UK"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
            {agency.description ||
              "Dedicated to providing exceptional foster care services."}
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
          <Button
            variant="ghost"
            className="w-full group-hover:bg-[#773344]/10 group-hover:text-[#773344]"
          >
            View Profile <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
