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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
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
  Calendar,
  Award,
  TrendingUp,
  Mail,
  Clock,
  Home,
  UserCheck,
  Globe,
  HelpCircle,
  Download,
  Phone,
  Verified,
  Building,
  Users2,
  CalendarCheck,
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
            {/* USP Added */}
            <p className="text-xl text-gray-700 mb-4 font-inter animate-slide-up-delay">
              Connecting compassionate foster carers with trusted UK agencies since 2010.
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-8 font-inter animate-slide-up-delay">
              {pageSections?.find(s => s.title === 'Hero Section')?.content || 
                'Browse verified agencies, read authentic reviews, and start your fostering journey with confidence.'}
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

            {/* Trust Logos */}
            <div className="mb-8">
              <p className="text-sm text-gray-500 mb-3 font-inter">Trusted by leading UK fostering organizations:</p>
              <div className="flex flex-wrap justify-center gap-6 items-center">
                <div className="flex items-center gap-2">
                  <Verified className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700 font-inter">Ofsted</span>
                </div>
                <div className="flex items-center gap-2">
                  <Verified className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700 font-inter">Care Inspectorate</span>
                </div>
                <div className="flex items-center gap-2">
                  <Verified className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-gray-700 font-inter">CIW</span>
                </div>
              </div>
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
                    "Browse through trusted foster agencies across the UK, each verified and rated to help you make the right choice. Filter by location, agency type, and specializations to find the perfect match for your family.",
                  color: "primary-green",
                  detailed: "Our comprehensive directory makes it easy to find fostering agencies in your area. With advanced search filters, you can narrow down options based on your specific requirements, whether you're interested in short-term respite care, long-term placements, or specialized fostering for children with additional needs."
                },
                {
                  icon: Users,
                  title: "Compare & Learn",
                  description:
                    "Read real reviews from other foster carers, compare services and support offerings, and learn about each agency's approach to fostering. Access detailed profiles with information about training, allowances, and specialization areas.",
                  color: "secondary-blue",
                  detailed: "Every agency profile includes verified reviews from real foster carers who have worked with them. Compare key metrics like approval timelines, ongoing support quality, and allowance structures. Learn about each agency's philosophy, specializations, and the types of children they typically place."
                },
                {
                  icon: Heart,
                  title: "Connect & Start",
                  description:
                    "Contact agencies directly through our platform, ask questions about their processes, and begin your rewarding fostering journey with confidence. Get matched with agencies that align with your values and fostering goals.",
                  color: "accent-peach",
                  detailed: "Once you've identified agencies of interest, our streamlined communication system allows you to reach out directly. Many agencies offer informal chats to help you understand their approach before formal application. Our platform also provides resources to prepare you for initial inquiries and the assessment process."
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
                    <p className="text-sm text-gray-600 mt-3 font-inter">
                      {step.detailed}
                    </p>
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

      {/* Why Choose Our Directory */}
      <section className="py-16 md:py-24 relative overflow-hidden section-highlight">
        <div className="absolute inset-0 gradient-mesh opacity-20" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-10 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl float-animation" />
          <div
            className="absolute bottom-1/3 right-10 w-72 h-72 bg-secondary-blue/5 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 animate-fade-in hover:scale-105 transition-all duration-300">
              <Award className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">
                Why Choose Us
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins animate-slide-up">
              Why Choose Our Directory
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter animate-slide-up-delay">
              We're the UK's most trusted platform for connecting foster carers with verified agencies.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: Verified,
                title: "Verified Agencies Only",
                description: "Every agency in our directory undergoes rigorous verification to ensure they meet national standards."
              },
              {
                icon: Users2,
                title: "Reviewed by Carers",
                description: "Authentic reviews from real foster carers help you make informed decisions about your fostering journey."
              },
              {
                icon: Heart,
                title: "Free and Easy to Use",
                description: "Our platform is completely free for foster carers to use, with intuitive search and filtering tools."
              },
              {
                icon: CalendarCheck,
                title: "Updated Weekly",
                description: "We regularly review and update agency information to ensure you always have access to current data."
              }
            ].map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={index} 
                  className="section-card hover-lift transition-all card-3d hover:scale-105 text-center"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 transition-all duration-300 hover:scale-110">
                      <IconComponent className="w-8 h-8 text-primary-green transition-all duration-300 hover:scale-110" />
                    </div>
                    <CardTitle className="text-xl font-poppins">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="font-inter">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* About Fostering in the UK */}
      <section className="py-16 md:py-24 relative overflow-hidden section-contrast">
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-green/10 rounded-full blur-3xl float-animation" />
          <div
            className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary-blue/10 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 animate-fade-in hover:scale-105 transition-all duration-300">
                <BookOpen className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-medium text-text-charcoal font-inter">
                  Educational Guide
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins animate-slide-up">
                About Fostering in the UK
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto font-inter animate-slide-up-delay">
                Everything you need to know about becoming a foster carer in the United Kingdom
              </p>
            </div>

            <div className="prose prose-lg max-w-none section-card-alt p-8 rounded-modern-xl">
              <p className="text-gray-700 mb-6 font-inter">
                Fostering is a vital part of the UK's child protection and care system, providing temporary or permanent homes for children who cannot live with their birth families. With over 70,000 children in foster care across the UK, foster carers play a crucial role in offering stability, love, and support during challenging times in a child's life.
              </p>

              <h3 className="text-xl font-bold mb-3 font-poppins text-text-charcoal">How Fostering Works</h3>
              <p className="text-gray-700 mb-6 font-inter">
                The fostering process begins when a child is referred to a local authority or private fostering agency. Social workers assess the child's needs and match them with a suitable foster family. This process involves careful consideration of the child's background, requirements, and the foster family's circumstances to ensure the best possible placement.
              </p>

              <h3 className="text-xl font-bold mb-3 font-poppins text-text-charcoal">Who Can Foster</h3>
              <p className="text-gray-700 mb-6 font-inter">
                Fostering is open to a wide range of people regardless of marital status, sexual orientation, or whether you have children of your own. You must be over 21 years old, have a spare room, and be physically and mentally fit to care for children. Single people, couples, and retirees are all welcome to apply. The most important qualities are patience, compassion, and a commitment to supporting vulnerable children.
              </p>

              <h3 className="text-xl font-bold mb-3 font-poppins text-text-charcoal">Agency Support for Carers</h3>
              <p className="text-gray-700 mb-6 font-inter">
                Reputable fostering agencies provide comprehensive support throughout your fostering journey. This includes initial training, ongoing professional development, 24/7 emergency support, regular supervision, and access to peer support groups. Financial support is also provided in the form of fostering allowances to cover the costs of caring for a child.
              </p>

              <h3 className="text-xl font-bold mb-3 font-poppins text-text-charcoal">Children in Need of Homes</h3>
              <p className="text-gray-700 mb-6 font-inter">
                At any given time, thousands of children across England, Scotland, Wales, and Northern Ireland need the stability and love that foster families provide. These children range from babies to teenagers, and their needs vary from short-term respite care to long-term placements. Some may have siblings who need to stay together, while others may have specific medical or emotional needs requiring specialized care.
              </p>

              <div className="mt-8">
                <Button asChild className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 font-inter">
                  <Link href="/resources">
                    Explore Our Fostering Resources <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Fostering Process in the UK */}
      <section className="py-16 md:py-24 relative overflow-hidden section-muted">
        <div className="absolute inset-0 gradient-mesh opacity-20" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-10 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl float-animation" />
          <div
            className="absolute bottom-1/3 right-10 w-72 h-72 bg-secondary-blue/5 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 animate-fade-in hover:scale-105 transition-all duration-300">
              <Calendar className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">
                Fostering Journey
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins animate-slide-up">
              The Fostering Process in the UK
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter animate-slide-up-delay">
              A step-by-step guide to becoming an approved foster carer in the United Kingdom
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-green/20 transform md:-translate-x-1/2"></div>
              
              {/* Timeline items */}
              {[
                {
                  title: "Enquire",
                  description: "Contact a fostering agency to express your interest in becoming a foster carer. Initial discussions will help determine if fostering is right for you."
                },
                {
                  title: "Assessment",
                  description: "Begin the formal assessment process, which includes background checks, health assessments, and personal references. This typically takes 4-6 months."
                },
                {
                  title: "Training",
                  description: "Complete mandatory training programs such as Skills to Foster, which prepares you for the challenges and rewards of fostering."
                },
                {
                  title: "Approval",
                  description: "Your application is reviewed by the agency's fostering panel. If approved, you'll receive your fostering license valid for up to 3 years."
                },
                {
                  title: "Matching",
                  description: "Work with social workers to find the right placement for your family, considering the needs of both the child and your household."
                },
                {
                  title: "Placement & Support",
                  description: "Welcome a child into your home with ongoing support from your agency, including regular supervision visits and access to peer support groups."
                }
              ].map((step, index) => (
                <div key={index} className={`relative mb-12 flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                  {/* Timeline dot */}
                  <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full bg-primary-green border-4 border-white shadow-lg transform md:-translate-x-1/2 flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{index + 1}</span>
                  </div>
                  
                  {/* Content */}
                  <div className={`ml-12 md:ml-0 md:w-5/12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                    <Card className="section-card hover-lift transition-all">
                      <CardHeader>
                        <CardTitle className="text-xl font-poppins">{step.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="font-inter">{step.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
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
            {/* Authoritative subtext added */}
            <p className="text-gray-600 max-w-2xl mx-auto font-inter animate-slide-up-delay">
              Real carers who found their perfect match through Foster Care UK.
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter animate-slide-up-delay mt-2">
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
                    {/* Read more link added */}
                    <div className="mt-4">
                      <Button variant="link" className="p-0 h-auto font-inter text-primary-green">
                        Read more <ArrowRight className="ml-1 w-4 h-4" />
                      </Button>
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
                  {/* Read more link added */}
                  <div className="mt-4">
                    <Button variant="link" className="p-0 h-auto font-inter text-primary-green">
                      Read more <ArrowRight className="ml-1 w-4 h-4" />
                    </Button>
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
            {/* Expanded intro copy */}
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-inter animate-slide-up-delay">
              Whether you're just beginning your journey or already approved, our fostering guides cover every stage of the fostering process. From legal requirements to heartwarming success stories, we've got you covered with authoritative, up-to-date information.
            </p>
            
            {/* Expanded resource highlights */}
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-8">
              {[
                {
                  icon: BookOpen,
                  title: "How to Become a Foster Carer",
                  description: "Step-by-step guide to starting your fostering journey",
                  link: "/resources/getting-started"
                },
                {
                  icon: FileText,
                  title: "Training and Support",
                  description: "Comprehensive overview of training programs and ongoing support",
                  link: "/resources/training-and-support"
                },
                {
                  icon: Heart,
                  title: "Allowance and Payments Explained",
                  description: "Detailed information about financial support for foster carers",
                  link: "/resources/allowance-and-payments"
                },
                {
                  icon: HelpCircle,
                  title: "FAQs About Fostering",
                  description: "Answers to common questions about the fostering process",
                  link: "/resources/faq"
                }
              ].map((highlight, index) => {
                const IconComponent = highlight.icon;
                return (
                  <div key={index} className="section-card-alt p-6 hover-lift card-3d hover:scale-105 transition-all duration-300 text-left">
                    <IconComponent className="w-8 h-8 text-primary-green mb-3 transition-all duration-300 hover:scale-110" />
                    <h3 className="font-semibold text-lg mb-2 font-poppins">{highlight.title}</h3>
                    <p className="text-sm text-gray-600 font-inter mb-4">{highlight.description}</p>
                    <Button variant="link" size="sm" className="p-0 h-auto font-inter text-primary-green" asChild>
                      <Link href={highlight.link}>
                        Learn More <ArrowRight className="ml-1 w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                );
              })}
            </div>
            
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-delay">
              <Button
                size="lg"
                asChild
                className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 hover:scale-105 transition-all shadow-md font-inter btn-3d"
              >
                <Link href="/resources">
                  {pageSections?.find(s => s.title === 'Resources Section')?.primaryButtonText || 'Browse All Resources'} <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
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

      {/* Statistics & Impact Section */}
      <section className="py-16 md:py-24 relative overflow-hidden section-contrast">
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
              <TrendingUp className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">
                Our Impact
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins animate-slide-up">
              Statistics & Impact
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter animate-slide-up-delay">
              Making a difference in the lives of children and families across the UK
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: Users,
                value: "50,000+",
                label: "Children needing foster homes annually",
                description: "Across England, Scotland, Wales, and Northern Ireland"
              },
              {
                icon: Building,
                value: "200+",
                label: "Fostering agencies listed",
                description: "Verified and regularly reviewed for quality assurance"
              },
              {
                icon: Heart,
                value: "5,000+",
                label: "Successful placements facilitated",
                description: "Helping children find loving, stable homes"
              }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <Card key={index} className="section-card text-center hover-lift transition-all card-3d hover:scale-105">
                  <CardHeader>
                    <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 mx-auto bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 transition-all duration-300 hover:scale-110">
                      <IconComponent className="w-8 h-8 text-primary-green transition-all duration-300 hover:scale-110" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-text-charcoal font-poppins">{stat.value}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-lg mb-2 font-poppins">{stat.label}</p>
                    <p className="text-sm text-gray-600 font-inter">{stat.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Serving all UK regions */}
          <div className="mt-12 max-w-3xl mx-auto">
            <Card className="section-card-alt p-8 text-center">
              <CardHeader>
                <CardTitle className="text-2xl font-poppins">Serving All UK Regions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6 font-inter">
                  Our directory connects foster carers with agencies across England, Wales, Scotland, and Northern Ireland, ensuring comprehensive coverage regardless of your location.
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {["England", "Wales", "Scotland", "Northern Ireland"].map((region, index) => (
                    <Badge key={index} className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal font-inter px-4 py-2">
                      {region}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Regional Quick Links */}
      <section className="py-16 md:py-24 relative overflow-hidden section-alt">
        <div className="absolute inset-0 gradient-mesh opacity-20" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-10 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl float-animation" />
          <div
            className="absolute bottom-1/3 right-10 w-72 h-72 bg-secondary-blue/5 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 animate-fade-in hover:scale-105 transition-all duration-300">
              <MapPin className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">
                Regional Guides
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins animate-slide-up">
              Explore Fostering by Region
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter animate-slide-up-delay">
              Find fostering opportunities in major UK cities and regions
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: "Fostering in London", link: "/foster-agency/england" },
              { name: "Fostering in Manchester", link: "/foster-agency/england/greater-manchester" },
              { name: "Fostering in Birmingham", link: "/foster-agency/england/west-midlands" },
              { name: "Fostering in Glasgow", link: "/foster-agency/scotland" },
              { name: "Fostering in Cardiff", link: "/foster-agency/wales" },
              { name: "Fostering in Leeds", link: "/foster-agency/england/west-yorkshire" },
              { name: "Fostering in Edinburgh", link: "/foster-agency/scotland" },
              { name: "Fostering in Belfast", link: "/foster-agency/northern-ireland" }
            ].map((region, index) => (
              <Card key={index} className="section-card hover-lift transition-all card-3d hover:scale-105">
                <CardHeader>
                  <CardTitle className="text-lg font-poppins flex items-center">
                    <MapPin className="w-4 h-4 text-primary-green mr-2" />
                    {region.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="p-0 h-auto font-inter text-primary-green" asChild>
                    <Link href={region.link}>
                      Learn more <ArrowRight className="ml-1 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 relative overflow-hidden section-muted">
        <div className="absolute inset-0 gradient-mesh opacity-20" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-10 w-64 h-64 bg-primary-green/5 rounded-full blur-3xl float-animation" />
          <div
            className="absolute bottom-1/3 right-10 w-72 h-72 bg-secondary-blue/5 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "1.5s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 animate-fade-in hover:scale-105 transition-all duration-300">
              <HelpCircle className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">
                Frequently Asked Questions
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins animate-slide-up">
              Fostering FAQs
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter animate-slide-up-delay">
              Answers to common questions about fostering in the UK
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "How do I find a foster agency near me?",
                  answer: "Use our search tool to find verified fostering agencies in your area. You can filter by location, agency type, and specializations to find the best match for your family."
                },
                {
                  question: "What's the difference between local authority and independent agencies?",
                  answer: "Local authority agencies are run by councils, while independent agencies are privately operated. Both must meet the same regulatory standards, but may differ in approach and support offered."
                },
                {
                  question: "Do foster carers get paid?",
                  answer: "Foster carers receive a fostering allowance to cover the costs of caring for a child. This is not a salary but a reimbursement for expenses. Amounts vary by agency and the child's needs."
                },
                {
                  question: "Can I work and be a foster carer?",
                  answer: "Many foster carers work outside the home, though flexibility is important. Some types of fostering, particularly for younger children, may require more availability."
                },
                {
                  question: "How long does the approval process take?",
                  answer: "The assessment process typically takes 4-6 months. This includes background checks, training, and home visits to ensure you're prepared for fostering."
                },
                {
                  question: "Can I choose the age group of children I foster?",
                  answer: "Yes, during your assessment you can discuss your preferences. Agencies will match you with children whose needs align with your experience and comfort level."
                }
              ].map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="section-card rounded-modern-xl">
                  <AccordionTrigger className="px-6 py-4 text-left font-poppins hover:text-primary-green transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 font-inter text-gray-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Schema markup for FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I find a foster agency near me?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Use our search tool to find verified fostering agencies in your area. You can filter by location, agency type, and specializations to find the best match for your family."
                }
              },
              {
                "@type": "Question",
                "name": "What's the difference between local authority and independent agencies?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Local authority agencies are run by councils, while independent agencies are privately operated. Both must meet the same regulatory standards, but may differ in approach and support offered."
                }
              },
              {
                "@type": "Question",
                "name": "Do foster carers get paid?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Foster carers receive a fostering allowance to cover the costs of caring for a child. This is not a salary but a reimbursement for expenses. Amounts vary by agency and the child's needs."
                }
              },
              {
                "@type": "Question",
                "name": "Can I work and be a foster carer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Many foster carers work outside the home, though flexibility is important. Some types of fostering, particularly for younger children, may require more availability."
                }
              },
              {
                "@type": "Question",
                "name": "How long does the approval process take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The assessment process typically takes 4-6 months. This includes background checks, training, and home visits to ensure you're prepared for fostering."
                }
              },
              {
                "@type": "Question",
                "name": "Can I choose the age group of children I foster?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, during your assessment you can discuss your preferences. Agencies will match you with children whose needs align with your experience and comfort level."
                }
              }
            ]
          })
        }}
      />

      {/* Register Your Agency CTA */}
      <section className="py-16 md:py-24 relative overflow-hidden section-highlight">
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
                  Register Your Agency
                </h2>
                <p className="text-lg md:text-xl mb-8 text-white/90 font-inter animate-slide-up-delay">
                  Join our trusted directory and connect with families looking for the perfect fostering partnership. Get started with a free basic listing today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay">
                  <Button
                    size="lg"
                    className="bg-white text-text-charcoal hover:bg-white/90 hover:scale-105 transition-all shadow-lg border-2 border-white/20 px-8 py-6 text-lg font-semibold font-inter btn-3d"
                    asChild
                  >
                    <Link href="/auth/signup">
                      For Foster Carers
                    </Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 hover:scale-105 transition-all shadow-md px-8 py-6 text-lg font-semibold font-inter btn-3d"
                    asChild
                  >
                    <Link href="/contact">
                      For Agencies
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Final CTA with Newsletter */}
      <section className="py-16 md:py-24 relative overflow-hidden section-contrast">
        <div className="absolute inset-0 gradient-mesh opacity-30" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary-green/10 rounded-full blur-3xl float-animation" />
          <div
            className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-secondary-blue/10 rounded-full blur-3xl float-animation"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Card className="section-card-alt max-w-3xl mx-auto rounded-modern-xl">
            <CardContent className="p-8 md:p-12 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4 animate-fade-in hover:scale-105 transition-all duration-300 mx-auto">
                <Mail className="w-4 h-4 text-primary-green" />
                <span className="text-sm font-medium text-text-charcoal font-inter">
                  Stay Updated
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins animate-slide-up">
                Stay Updated with Fostering Opportunities
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto font-inter animate-slide-up-delay">
                Subscribe to our newsletter for the latest fostering news, agency updates, and resources delivered straight to your inbox.
              </p>
              
              <div className="max-w-md mx-auto">
                <form className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10 h-12 text-base rounded-xl border-2 focus:border-primary-green font-inter"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 px-6 bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 rounded-xl btn-3d font-inter transition-all duration-300 hover:from-primary-green/90 hover:to-secondary-blue/90"
                  >
                    Subscribe
                  </Button>
                </form>
                <p className="text-xs text-gray-500 mt-3 font-inter">
                  We respect your privacy. Unsubscribe at any time.
                </p>
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

  // Schema markup for the agency
  const agencySchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": agency.name,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": agency.location?.city || "UK"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": agency.rating || 0,
      "reviewCount": agency.reviewCount || 0
    }
  };

  return (
    <Card className="section-card rounded-modern hover-lift transition-all cursor-pointer card-3d hover:scale-105" itemScope itemType="https://schema.org/LocalBusiness">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(agencySchema) }}
      />
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
          <CardTitle className="text-xl group-hover:text-primary-green transition-colors font-poppins transition-all duration-300 hover:text-primary-green" itemProp="name">
            {agency.name}
          </CardTitle>
          <CardDescription className="flex items-center gap-1 mt-2 font-inter" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <MapPin className="w-4 h-4 transition-all duration-300 hover:scale-110" />
            <span itemProp="addressLocality">{agency.location?.city || "UK"}</span>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 line-clamp-2 mb-4 font-inter" itemProp="description">
            {agency.description ||
              "Dedicated to providing exceptional foster care services."}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
              {renderStars(agency.rating || 0)}
              <span className="text-sm text-gray-600 ml-2 font-inter">
                (<span itemProp="reviewCount">{agency.reviewCount || 0}</span>)
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