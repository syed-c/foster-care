"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
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
  Quote,
} from "lucide-react";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [featuredAgencies, setFeaturedAgencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageSections, setPageSections] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetchFeaturedAgencies();
    fetchPageSections();
    
    // Track mouse movement for interactive effects
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fetchPageSections = async () => {
    try {
      // First try to get from localStorage
      const storedSections = localStorage.getItem('foster_care_page_sections_1');
      if (storedSections) {
        setPageSections(JSON.parse(storedSections));
        return;
      }
    } catch (error) {
      console.error("Error fetching page sections:", error);
    }
  };

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
    <div className="min-h-screen bg-background-offwhite relative overflow-hidden">
      {/* Floating Particles */}
      <div className="particle particle-1"></div>
      <div className="particle particle-2"></div>
      <div className="particle particle-3"></div>
      <div className="particle particle-4"></div>
      
      {/* Modern Hero Header with Glassmorphism */}
      <section className="relative py-20 md:py-28 overflow-hidden section-hero">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-primary-green/15 rounded-full blur-3xl float-animation" />
          <div
            className="absolute bottom-10 right-10 w-80 h-80 bg-secondary-blue/15 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "2s" }}
          />
          <div
            className="absolute top-1/2 left-1/4 w-40 h-40 bg-accent-peach/10 rounded-full blur-2xl float-animation-slow"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-primary-green/10 rounded-full blur-3xl float-animation-slow"
            style={{ animationDelay: "3s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 animate-fade-in hover:scale-105 transition-all duration-300">
              <Heart className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">
                {pageSections?.find(s => s.title === 'Hero Section')?.subtitle || 'Foster Care Directory'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-text-charcoal mb-6 font-poppins animate-slide-up">
              {pageSections?.find(s => s.title === 'Hero Section')?.heading || 'Find Your Perfect'}{" "}
              <span className="bg-gradient-to-r from-primary-green to-secondary-blue bg-clip-text text-transparent">
                {pageSections?.find(s => s.title === 'Hero Section')?.subheading || 'Fostering Agency'}
              </span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 font-inter animate-slide-up-delay">
              {pageSections?.find(s => s.title === 'Hero Section')?.content || 
                'Connecting caring hearts with fostering opportunities across the UK. Browse verified agencies, read reviews, and start your fostering journey today.'}
            </p>

            {/* Modern Search Bar with Glass Effect */}
            <div className="glass-card rounded-modern-xl p-6 max-w-2xl mx-auto mb-6 tilt-card hover:scale-105 transition-all duration-300">
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
                    className="pl-12 h-12 text-base rounded-xl bg-white/50 border-0 focus-visible:ring-2 focus-visible:ring-primary-green font-inter transition-all duration-300 hover:bg-white/70"
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="h-12 px-8 bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 rounded-xl btn-3d font-inter transition-all duration-300 hover:from-primary-green/90 hover:to-secondary-blue/90"
                >
                  Search
                </Button>
              </form>
            </div>

            <div className="flex flex-wrap justify-center gap-3 text-sm font-inter animate-fade-in-delay">
              <span className="text-gray-600">Popular:</span>
              {["London", "Manchester", "Birmingham", "Glasgow"].map((city, index) => (
                <Link
                  key={city}
                  href={`/agencies?search=${city}`}
                  className="px-4 py-1 rounded-full glass hover:bg-white/50 transition-all duration-300 hover:scale-105 btn-3d"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  {city}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 relative overflow-hidden section-alt">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-10 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl float-animation" />
          <div
            className="absolute bottom-1/4 left-10 w-72 h-72 bg-secondary-blue/5 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 animate-fade-in hover:scale-105 transition-all duration-300">
              <CheckCircle2 className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">
                {pageSections?.find(s => s.title === 'How It Works Section')?.subtitle || 'Simple Process'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins animate-slide-up">
              {pageSections?.find(s => s.title === 'How It Works Section')?.heading || 'How It Works'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter animate-slide-up-delay">
              {pageSections?.find(s => s.title === 'How It Works Section')?.content || 
                'Finding the right fostering agency is easy with our simple three-step process'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pageSections?.find(s => s.title === 'How It Works Section')?.cards ? 
              JSON.parse(pageSections.find(s => s.title === 'How It Works Section').cards).map((card, index) => {
                let IconComponent;
                switch(card.icon) {
                  case 'Search': IconComponent = Search; break;
                  case 'Users': IconComponent = Users; break;
                  case 'Heart': IconComponent = Heart; break;
                  case 'Shield': IconComponent = Shield; break;
                  case 'FileText': IconComponent = FileText; break;
                  default: IconComponent = Search;
                }
                return (
              <Card
                  key={index}
                  className="section-card hover-lift transition-all card-3d hover:scale-105"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto bg-gradient-to-br glow-primary transition-all duration-300 hover:scale-110"
                      style={{
                        backgroundImage: `linear-gradient(to bottom right, var(--${index === 0 ? 'primary-green' : index === 1 ? 'secondary-blue' : 'accent-peach'})/20, var(--${index === 0 ? 'primary-green' : index === 1 ? 'secondary-blue' : 'accent-peach'})/40)`,
                      }}
                    >
                      <IconComponent
                        className="w-8 h-8 transition-all duration-300 hover:scale-110"
                        style={{ color: `var(--${index === 0 ? 'primary-green' : index === 1 ? 'secondary-blue' : 'accent-peach'})` }}
                      />
                    </div>
                    <CardTitle className="text-center text-xl font-poppins">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base font-inter">
                      {card.description}
                    </CardDescription>
                  </CardContent>
                  <div
                    className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary-green to-secondary-blue flex items-center justify-center text-text-charcoal font-bold shadow-lg animate-pulse-slow transition-all duration-300 hover:scale-110"
                    style={{
                      background:
                        index === 0
                          ? "linear-gradient(135deg, #7CE2A7, #7DC3EB)"
                          : index === 1
                            ? "linear-gradient(135deg, #7DC3EB, #F9CBA2)"
                            : "linear-gradient(135deg, #F9CBA2, #7CE2A7)",
                    }}
                  >
                    <span className="text-xl">{index + 1}</span>
                  </div>
                </Card>
              );
              }) : [
                {
                  icon: Search,
                  title: "Search & Discover",
                  description:
                    "Browse through verified fostering agencies in your area with detailed profiles and reviews.",
                  color: "primary-green",
                },
                {
                  icon: Users,
                  title: "Compare & Learn",
                  description:
                    "Read real reviews, compare services, and learn about each agency's approach to fostering.",
                  color: "secondary-blue",
                },
                {
                  icon: Heart,
                  title: "Connect & Start",
                  description:
                    "Contact agencies directly, ask questions, and begin your rewarding fostering journey.",
                  color: "accent-peach",
                },
              ].map((step, index) => (
                <Card
                  key={index}
                  className="section-card hover-lift transition-all card-3d hover:scale-105"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div
                      className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto bg-gradient-to-br glow-primary transition-all duration-300 hover:scale-110"
                      style={{
                        backgroundImage: `linear-gradient(to bottom right, var(--${step.color})/20, var(--${step.color})/40)`,
                      }}
                    >
                      <step.icon
                        className="w-8 h-8 transition-all duration-300 hover:scale-110"
                        style={{ color: `var(--${step.color})` }}
                      />
                    </div>
                    <CardTitle className="text-center text-xl font-poppins">
                      {step.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-base font-inter">
                      {step.description}
                    </CardDescription>
                  </CardContent>
                  <div
                    className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-primary-green to-secondary-blue flex items-center justify-center text-text-charcoal font-bold shadow-lg animate-pulse-slow transition-all duration-300 hover:scale-110"
                    style={{
                      background:
                        index === 0
                          ? "linear-gradient(135deg, #7CE2A7, #7DC3EB)"
                          : index === 1
                            ? "linear-gradient(135deg, #7DC3EB, #F9CBA2)"
                            : "linear-gradient(135deg, #F9CBA2, #7CE2A7)",
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
      <section className="py-16 md:py-24 relative overflow-hidden section-highlight">
        {/* Decorative elements */}
        <div className="absolute inset-0 gradient-mesh opacity-20" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-10 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl float-animation" />
          <div
            className="absolute bottom-1/3 right-10 w-72 h-72 bg-secondary-blue/5 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 animate-fade-in hover:scale-105 transition-all duration-300">
                <Shield className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-medium text-text-charcoal font-inter">
                  {pageSections?.find(s => s.title === 'Featured Agencies Section')?.subtitle || 'Verified Agencies'}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-2 font-poppins animate-slide-up">
                {pageSections?.find(s => s.title === 'Featured Agencies Section')?.heading || 'Featured Agencies'}
              </h2>
              <p className="text-gray-600 font-inter animate-slide-up-delay">
                {pageSections?.find(s => s.title === 'Featured Agencies Section')?.content || 'Trusted fostering agencies across the UK'}
              </p>
            </div>
            <Button
              variant="ghost"
              asChild
              className="hidden md:flex glass rounded-xl hover-lift mt-4 md:mt-0 font-inter btn-3d transition-all duration-300 hover:scale-105"
            >
              <Link href="/agencies">
                View All <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-64 section-card animate-pulse shimmer"
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
            <Card className="section-card p-12 text-center hover:scale-105 transition-all duration-300">
              <CardDescription className="font-inter">
                No featured agencies available yet. Check back soon!
              </CardDescription>
            </Card>
          )}

          <div className="mt-8 text-center md:hidden">
            <Button
              variant="ghost"
              asChild
              className="glass rounded-xl hover-lift font-inter btn-3d transition-all duration-300 hover:scale-105"
            >
              <Link href="/agencies">
                View All Agencies <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 relative overflow-hidden section-contrast">
        {/* Animated Background */}
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-green/10 rounded-full blur-3xl float-animation" />
          <div
            className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary-blue/10 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 animate-fade-in hover:scale-105 transition-all duration-300">
              <Star className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">
                {pageSections?.find(s => s.title === 'Success Stories Section')?.subtitle || 'Testimonials'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins animate-slide-up">
              {pageSections?.find(s => s.title === 'Success Stories Section')?.heading || 'Success Stories'}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter animate-slide-up-delay">
              {pageSections?.find(s => s.title === 'Success Stories Section')?.content || 
                'Hear from families who found their perfect match through our directory'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pageSections?.find(s => s.title === 'Success Stories Section')?.testimonials ? 
              JSON.parse(pageSections.find(s => s.title === 'Success Stories Section').testimonials).map((testimonial, index) => (
                <Card key={index} className="section-card hover-lift card-3d hover:scale-105 transition-all duration-300">
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
                      <Badge className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal border-0 font-inter hover:scale-110 transition-all duration-300">
                        <Star className="w-3 h-3 mr-1 fill-white" />
                        {testimonial.rating}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <Quote className="absolute -top-2 -left-2 w-5 h-5 text-primary-green/30" />
                      <p className="pt-4 font-inter">{testimonial.quote}</p>
                    </div>
                  </CardContent>
                </Card>
              )) : [
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
              <Card key={index} className="section-card hover-lift card-3d hover:scale-105 transition-all duration-300">
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
                    <Badge className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal border-0 font-inter hover:scale-110 transition-all duration-300">
                      <Star className="w-3 h-3 mr-1 fill-white" />
                      {testimonial.rating}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Quote className="absolute -top-2 -left-2 w-5 h-5 text-primary-green/30" />
                    <p className="pt-4 font-inter">{testimonial.quote}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Highlight */}
      <section className="py-16 md:py-24 relative overflow-hidden section-alt">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background-offwhite/70 to-white/70" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-primary-green/10 rounded-full blur-3xl float-animation-slow" />
          <div
            className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-secondary-blue/10 rounded-full blur-3xl float-animation-slow"
            style={{ animationDelay: "3s" }}
          />
          {/* Additional decorative elements */}
          <div
            className="absolute top-20 left-20 w-40 h-40 border border-primary-green/20 rounded-full float-animation-slow"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute bottom-20 right-20 w-60 h-60 border border-secondary-blue/20 rounded-full float-animation-slow"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 animate-fade-in hover:scale-105 transition-all duration-300">
              <BookOpen className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">
                {pageSections?.find(s => s.title === 'Resources Section')?.subtitle || 'Knowledge Hub'}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins animate-slide-up">
              {pageSections?.find(s => s.title === 'Resources Section')?.heading || 'Resources & '}
              <span className="text-primary-green">
                {pageSections?.find(s => s.title === 'Resources Section')?.subheading || 'Guides'}
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-inter animate-slide-up-delay">
              {pageSections?.find(s => s.title === 'Resources Section')?.content || 
                'Everything you need to know about fostering in the UK. From legal requirements to heartwarming success stories, we\'ve got you covered.'}
            </p>
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
              {pageSections?.find(s => s.title === 'Resources Section')?.highlights ? 
                JSON.parse(pageSections.find(s => s.title === 'Resources Section').highlights).map((highlight, index) => {
                  let IconComponent;
                  switch(highlight.icon) {
                    case 'BookOpen': IconComponent = BookOpen; break;
                    case 'FileText': IconComponent = FileText; break;
                    default: IconComponent = BookOpen;
                  }
                  return (
                    <div key={index} className="section-card-alt p-6 hover-lift card-3d hover:scale-105 transition-all duration-300">
                      <IconComponent className="w-8 h-8 text-primary-green mb-3 transition-all duration-300 hover:scale-110" />
                      <h3 className="font-semibold text-lg mb-2 font-poppins">{highlight.title}</h3>
                      <p className="text-sm text-gray-600 font-inter">{highlight.description}</p>
                    </div>
                  );
                }) : [
                  {
                    icon: BookOpen,
                    title: "Getting Started",
                    description: "Essential information for those beginning their fostering journey"
                  },
                  {
                    icon: FileText,
                    title: "Legal Requirements",
                    description: "Understanding the legal aspects of becoming a foster carer"
                  }
                ].map((highlight, index) => (
                  <div key={index} className="section-card-alt p-6 hover-lift card-3d hover:scale-105 transition-all duration-300">
                    <highlight.icon className="w-8 h-8 text-primary-green mb-3 transition-all duration-300 hover:scale-110" />
                    <h3 className="font-semibold text-lg mb-2 font-poppins">{highlight.title}</h3>
                    <p className="text-sm text-gray-600 font-inter">{highlight.description}</p>
                  </div>
                ))
              }
            </div>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-delay">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 hover:scale-105 transition-all shadow-md font-inter btn-3d"
              >
                <Link href="/resources">
                  {pageSections?.find(s => s.title === 'Resources Section')?.primaryButtonText || 'Browse Resources'} <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-primary-green text-primary-green hover:bg-primary-green/5 hover:scale-105 transition-all font-inter btn-3d"
              >
                <Link href="/resources/getting-started">
                  {pageSections?.find(s => s.title === 'Resources Section')?.secondaryButtonText || 'Getting Started Guide'}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 relative overflow-hidden section-muted">
        {/* Enhanced Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-green/40 to-secondary-blue/40" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-green/30 rounded-full blur-3xl float-animation-slow" />
          <div
            className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary-blue/30 rounded-full blur-3xl float-animation-slow"
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
          <Card className="section-card-contrast border-0 text-text-charcoal rounded-modern-xl overflow-hidden shadow-2xl transform hover:scale-[1.01] transition-all duration-300 card-3d">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-green/90 to-secondary-blue/80 z-0" />
            <div className="absolute inset-0 bg-[url('/images/pattern.png')] opacity-15 z-0" />
            <CardContent className="p-8 md:p-12 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 font-poppins text-white drop-shadow-md animate-slide-up">
                  {pageSections?.find(s => s.title === 'CTA Section')?.heading || 'Are You a Fostering Agency?'}
                </h2>
                <p className="text-lg md:text-xl mb-8 text-white/90 font-inter animate-slide-up-delay">
                  {pageSections?.find(s => s.title === 'CTA Section')?.content || 
                    'Join our trusted directory and connect with families looking for the perfect fostering partnership. Get started with a free basic listing today.'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay">
                  <Button
                    size="lg"
                    className="bg-white text-text-charcoal hover:bg-white/90 hover:scale-105 transition-all shadow-lg border-2 border-white/20 px-8 py-6 text-lg font-semibold font-inter btn-3d"
                    asChild
                  >
                    <Link href="/auth/signup">
                      {pageSections?.find(s => s.title === 'CTA Section')?.primaryButtonText || 'Register Your Agency'}
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 hover:scale-105 transition-all shadow-md px-8 py-6 text-lg font-semibold font-inter btn-3d"
                    asChild
                  >
                    <Link href="/contact">
                      {pageSections?.find(s => s.title === 'CTA Section')?.secondaryButtonText || 'Learn More'}
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

function AgencyCard({ agency }) {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 transition-all duration-300 hover:scale-110 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Card className="section-card rounded-modern hover-lift transition-all cursor-pointer card-3d hover:scale-105">
      <Link href={`/agencies/${agency.slug}`}>
        <CardHeader>
          <div className="flex items-start justify-between mb-4">
            <div className="w-16 h-16 rounded-lg glass-icon flex items-center justify-center transition-all duration-300 hover:scale-110">
              {agency.logo ? (
                <Image
                  src={agency.logo}
                  alt={agency.name}
                  width={48}
                  height={48}
                  className="rounded transition-all duration-300 hover:scale-110"
                />
              ) : (
                <Heart className="w-8 h-8 text-primary-green transition-all duration-300 hover:scale-110" />
              )}
            </div>
            {agency.featured && (
              <Badge className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal border-0 font-inter transition-all duration-300 hover:scale-110">
                Featured
              </Badge>
            )}
          </div>
          <CardTitle className="text-xl group-hover:text-primary-green transition-colors font-poppins transition-all duration-300 hover:text-primary-green">
            {agency.name}
          </CardTitle>
          <CardDescription className="flex items-center gap-1 mt-2 font-inter">
            <MapPin className="w-4 h-4 transition-all duration-300 hover:scale-110" />
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
              {renderStars(agency.rating || 0)}
              <span className="text-sm text-gray-600 ml-2 font-inter">
                ({agency.reviewCount || 0})
              </span>
            </div>
            <Badge variant="outline" className="font-inter transition-all duration-300 hover:scale-110">{agency.type}</Badge>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="ghost"
            className="w-full group-hover:bg-primary-green/10 group-hover:text-primary-green font-inter btn-3d transition-all duration-300 hover:scale-105"
          >
            View Profile <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}