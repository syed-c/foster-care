'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Heart, 
  ArrowRight, 
  Shield, 
  Users, 
  Star, 
  BookOpen, 
  Award, 
  FileText,
  Search,
  Home,
  Building2,
  GraduationCap,
  HandHeart,
  Scale,
  CheckCircle2,
  PoundSterling,
  Clock
} from 'lucide-react';
import MapSection from '@/components/MapSection';

// Mock data for featured agencies
const featuredAgencies = [
  {
    id: 1,
    name: "Bright Futures Fostering",
    location: { city: "London" },
    description: "Specialist in caring for teenagers and sibling groups with dedicated support teams.",
    rating: 4.8,
    reviewCount: 42,
    type: "Private",
    featured: true,
    logo: null
  },
  {
    id: 2,
    name: "Scottish Family Care",
    location: { city: "Edinburgh" },
    description: "Providing compassionate care for children across Scotland for over 25 years.",
    rating: 4.9,
    reviewCount: 38,
    type: "Local Authority",
    featured: true,
    logo: null
  },
  {
    id: 3,
    name: "Welsh Hearts Together",
    location: { city: "Cardiff" },
    description: "Welsh-speaking fostering service with specialized support for cultural needs.",
    rating: 4.7,
    reviewCount: 29,
    type: "Independent",
    featured: true,
    logo: null
  }
];

// Mock data for testimonials
const testimonials = [
  {
    name: "Sarah & James",
    location: "Manchester",
    quote: "Finding the right agency was overwhelming until we discovered this directory. The reviews and detailed profiles helped us make the perfect choice.",
    rating: 5,
  },
  {
    name: "Emma Thompson",
    location: "London",
    quote: "As a single foster carer, I needed an agency that understood my situation. This platform made it so easy to find and connect with the right support.",
    rating: 5,
  },
  {
    name: "David & Claire",
    location: "Birmingham",
    quote: "The transparency and genuine reviews gave us confidence. We're now fostering two wonderful children and couldn't be happier with our agency.",
    rating: 5,
  }
];

// Mock data for resources
const resources = [
  {
    title: 'Getting Started with Fostering',
    category: 'Guides',
    excerpt: 'Everything you need to know about beginning your fostering journey in the UK.',
    slug: 'getting-started',
    image: 'https://images.unsplash.com/photo-1758273240331-745ccab011a2',
  },
  {
    title: 'Legal Requirements for Foster Carers',
    category: 'Legal',
    excerpt: 'Understanding the legal framework and requirements for becoming a foster carer.',
    slug: 'legal-requirements',
    image: 'https://images.unsplash.com/photo-1758687126445-98edd4b15ba6',
  },
  {
    title: 'Our Family\'s Fostering Story',
    category: 'Family Stories',
    excerpt: 'Read about the Thompson family\'s journey and the joy of fostering.',
    slug: 'thompson-family-story',
    image: 'https://images.unsplash.com/photo-1761030293423-130d4c937ead',
  }
];

// Mock data for regions
const popularRegions = [
  { name: "Greater London", slug: "greater-london", country: "england" },
  { name: "West Midlands", slug: "west-midlands", country: "england" },
  { name: "Greater Manchester", slug: "greater-manchester", country: "england" },
  { name: "West Yorkshire", slug: "west-yorkshire", country: "england" },
];

// FAQ data
const faqs = [
  {
    question: "How much are foster carers paid?",
    answer: "Foster carers receive a fostering allowance to cover the costs of caring for a child. This varies by agency and the age of the child, typically ranging from £400-£600 per week."
  },
  {
    question: "Who regulates fostering in the UK?",
    answer: "Fostering services are regulated by Ofsted in England, Care Inspectorate in Scotland, and CIW (Care Inspectorate Wales). Each has specific standards and inspection processes."
  },
  {
    question: "How long is the approval process?",
    answer: "The fostering approval process typically takes 4-6 months and includes application, assessments, training, and panel review."
  },
  {
    question: "Can I foster if I work full-time?",
    answer: "Yes, many foster carers work full-time. Some agencies offer specialized support for working foster carers."
  },
  {
    question: "What are the age requirements to become a foster carer?",
    answer: "You must be at least 21 years old to apply to become a foster carer in the UK."
  },
  {
    question: "Can single people foster?",
    answer: "Absolutely. Single people can be excellent foster carers. Your relationship status does not affect your eligibility."
  },
  {
    question: "Do I need a spare room to foster?",
    answer: "Yes, you typically need a spare room to foster a child. This ensures the child has their own private space."
  },
  {
    question: "What support is available for foster carers?",
    answer: "Foster carers receive ongoing support including supervision, training, 24/7 helplines, and access to support groups."
  }
];

export default function FosterAgencyMainPageClient({ countriesToDisplay }) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-16 md:py-24 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4">
              <Heart className="w-4 h-4 text-brand-accent" />
              <span className="text-sm font-medium text-brand-dark">
                UK Foster Care Directory
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-brand-dark mb-6">
              Find Your Perfect{" "}
              <span className="text-brand-accent">
                Fostering Agency
              </span>
            </h1>
            <p className="text-xl text-neutral-700 mb-8 max-w-3xl mx-auto">
              Connecting caring hearts with fostering opportunities across the UK. Browse verified agencies by location, read reviews, and start your fostering journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-brand-accent text-white hover:bg-emerald-700 px-8 py-6 rounded-full">
                Browse Agencies <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" className="border-brand-main text-brand-main hover:bg-brand-main/5 px-8 py-6 rounded-full">
                Learn About Fostering
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats / Feature Row */}
      <section className="py-12 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 text-center"
            >
              <Users className="w-8 h-8 text-brand-accent mx-auto mb-3" />
              <div className="text-2xl font-bold text-brand-dark mb-1">500+</div>
              <div className="text-sm text-neutral-700">Fostering Agencies</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 text-center"
            >
              <MapPin className="w-8 h-8 text-brand-accent mx-auto mb-3" />
              <div className="text-2xl font-bold text-brand-dark mb-1">120+</div>
              <div className="text-sm text-neutral-700">Regions Covered</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 text-center"
            >
              <Clock className="w-8 h-8 text-brand-accent mx-auto mb-3" />
              <div className="text-2xl font-bold text-brand-dark mb-1">30 days</div>
              <div className="text-sm text-neutral-700">Avg. Approval Time</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-6 text-center"
            >
              <Shield className="w-8 h-8 text-brand-accent mx-auto mb-3" />
              <div className="text-2xl font-bold text-brand-dark mb-1">100%</div>
              <div className="text-sm text-neutral-700">Ofsted Compliant</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* "Browse by Country" Quick Selection */}
      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4">
              <Shield className="w-4 h-4 text-brand-accent" />
              <span className="text-sm font-medium text-brand-dark">
                Browse by Country
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
              Explore Fostering Agencies by Location
            </h2>
            <p className="text-xl text-neutral-700 max-w-2xl mx-auto">
              Find trusted foster agencies across England, Scotland, Wales, and Northern Ireland
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {countriesToDisplay.map((country, index) => (
              <motion.div
                key={country.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Link href={`/foster-agency/${country.slug}`}>
                  <Card className="rounded-2xl border border-neutral-200 hover:shadow-md transition-all cursor-pointer group">
                    <CardHeader>
                      <div className="w-16 h-16 rounded-xl bg-brand-accentSoft flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                        <MapPin className="w-8 h-8 text-brand-accent" />
                      </div>
                      <CardTitle className="text-center text-xl group-hover:text-brand-accent transition-colors">
                        {country.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-center text-base mb-4">
                        View foster agencies in {country.name}
                      </CardDescription>
                      <div className="flex items-center justify-center text-brand-accent font-medium group-hover:translate-x-1 transition-transform">
                        Explore <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* UK Map Interactive Navigation */}
      <section className="py-16 bg-brand-accentSoft w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4">
              <MapPin className="w-4 h-4 text-brand-accent" />
              <span className="text-sm font-medium text-brand-dark">
                Interactive Map
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
              Explore Agencies Across the UK
            </h2>
            <p className="text-xl text-brand-dark/80 max-w-2xl mx-auto">
              Click on regions to discover fostering opportunities near you
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="rounded-2xl overflow-hidden">
              <CardContent className="p-0 md:p-6">
                <MapSection countries={countriesToDisplay} />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Featured Top Foster Agencies */}
      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4">
              <Award className="w-4 h-4 text-brand-accent" />
              <span className="text-sm font-medium text-brand-dark">
                Top Rated Agencies
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
              Featured Fostering Agencies
            </h2>
            <p className="text-xl text-neutral-700 max-w-2xl mx-auto">
              Discover our highest-rated agencies with proven track records
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredAgencies.map((agency, index) => (
              <motion.div
                key={agency.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="rounded-2xl border border-neutral-200 hover:shadow-md transition-all cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-16 h-16 rounded-lg bg-brand-accentSoft flex items-center justify-center">
                        {agency.logo ? (
                          <Image
                            src={agency.logo}
                            alt={agency.name}
                            width={48}
                            height={48}
                            className="rounded"
                          />
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
                      {agency.location?.city || "UK"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-neutral-700 line-clamp-2 mb-4">
                      {agency.description ||
                        "Dedicated to providing exceptional foster care services."}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(agency.rating)
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-neutral-700 ml-2">
                          ({agency.reviewCount})
                        </span>
                      </div>
                      <Badge variant="outline" className="rounded-full">{agency.type}</Badge>
                    </div>
                  </CardContent>
                  <CardContent>
                    <Button
                      variant="outline"
                      className="w-full text-brand-main border-brand-main hover:bg-brand-main/5 rounded-full"
                      asChild
                    >
                      <Link href={`/agencies/${agency.slug}`}>
                        View Profile <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Button variant="outline" className="border-brand-main text-brand-main hover:bg-brand-main/5 rounded-full px-8 py-6" asChild>
              <Link href="/agencies">
                View All Agencies <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* About Our Directory */}
      <section className="py-16 bg-brand-main w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="rounded-2xl p-8 md:p-12 max-w-4xl mx-auto bg-brand-dark border border-white/10">
              <CardHeader>
                <CardTitle className="text-2xl md:text-3xl font-semibold text-white mb-4 text-center">
                  About Our Directory
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 text-lg leading-relaxed text-center mb-6">
                  Our comprehensive directory helps you find foster agencies across the
                  United Kingdom. Whether you're looking to become a foster carer or
                  seeking support, we connect you with trusted agencies in your local
                  area. Browse by country, region, or city to find the perfect match
                  for your fostering journey.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-brand-accent" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-white">Verified Agencies</h3>
                    <p className="text-sm text-white/80">All agencies are verified and trusted</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center mx-auto mb-3">
                      <MapPin className="w-6 h-6 text-brand-accent" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-white">Location-Based</h3>
                    <p className="text-sm text-white/80">Find agencies near you</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center mx-auto mb-3">
                      <Heart className="w-6 h-6 text-brand-accent" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2 text-white">Comprehensive</h3>
                    <p className="text-sm text-white/80">Coverage across all UK regions</p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* How Fostering Works in the UK */}
      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4">
              <GraduationCap className="w-4 h-4 text-brand-accent" />
              <span className="text-sm font-medium text-brand-dark">
                Fostering Process
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
              How Fostering Works in the UK
            </h2>
            <p className="text-xl text-neutral-700 max-w-2xl mx-auto">
              Understanding the journey to becoming a foster carer
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="rounded-2xl border border-neutral-200">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center mb-4">
                      <HandHeart className="w-6 h-6 text-brand-accent" />
                    </div>
                    <CardTitle className="text-xl">The Application Process</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-brand-accent flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                          <span className="text-white text-xs font-bold">1</span>
                        </div>
                        <span>Initial enquiry and information session</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-brand-accent flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                          <span className="text-white text-xs font-bold">2</span>
                        </div>
                        <span>Formal application and documentation</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-brand-accent flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                          <span className="text-white text-xs font-bold">3</span>
                        </div>
                        <span>Home study and assessment</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-brand-accent flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                          <span className="text-white text-xs font-bold">4</span>
                        </div>
                        <span>Training and preparation programs</span>
                      </li>
                      <li className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-brand-accent flex items-center justify-center mt-1 mr-4 flex-shrink-0">
                          <span className="text-white text-xs font-bold">5</span>
                        </div>
                        <span>Panel approval and matching</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="rounded-2xl border border-neutral-200">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center mb-4">
                      <Scale className="w-6 h-6 text-brand-accent" />
                    </div>
                    <CardTitle className="text-xl">Legal Framework</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-brand-accent mr-3 mt-0.5 flex-shrink-0" />
                        <span>Regulated by Ofsted (England), Care Inspectorate (Scotland), and CIW (Wales)</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-brand-accent mr-3 mt-0.5 flex-shrink-0" />
                        <span>Legal fostering agreements and contracts</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-brand-accent mr-3 mt-0.5 flex-shrink-0" />
                        <span>Child welfare as the paramount consideration</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-brand-accent mr-3 mt-0.5 flex-shrink-0" />
                        <span>Ongoing supervision and support</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-brand-accent mr-3 mt-0.5 flex-shrink-0" />
                        <span>Regular reviews and assessments</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Fostering Benefits for Carers & Children */}
      <section className="py-16 bg-brand-accentSoft w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4">
              <Heart className="w-4 h-4 text-brand-accent" />
              <span className="text-sm font-medium text-brand-dark">
                Benefits
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
              Fostering Benefits for Carers & Children
            </h2>
            <p className="text-xl text-brand-dark/80 max-w-2xl mx-auto">
              Making a positive impact while receiving comprehensive support
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="rounded-2xl border border-neutral-200">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Users className="w-6 h-6 text-brand-accent mr-2" />
                    For Foster Carers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <PoundSterling className="w-5 h-5 text-brand-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Financial Support</h3>
                        <p className="text-neutral-700 text-sm">Fostering allowance to cover costs of caring for a child</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <GraduationCap className="w-5 h-5 text-brand-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Training & Development</h3>
                        <p className="text-neutral-700 text-sm">Ongoing professional development and specialist training</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <Shield className="w-5 h-5 text-brand-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold">24/7 Support</h3>
                        <p className="text-neutral-700 text-sm">Round-the-clock helpline and dedicated social worker support</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <Heart className="w-5 h-5 text-brand-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Personal Fulfillment</h3>
                        <p className="text-neutral-700 text-sm">Making a meaningful difference in a child's life</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="rounded-2xl border border-neutral-200">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center">
                    <Home className="w-6 h-6 text-brand-accent mr-2" />
                    For Children
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <Heart className="w-5 h-5 text-brand-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Safe & Stable Environment</h3>
                        <p className="text-neutral-700 text-sm">Secure home environment with committed carers</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <Users className="w-5 h-5 text-brand-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Individual Attention</h3>
                        <p className="text-neutral-700 text-sm">Personalized care tailored to each child's needs</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <GraduationCap className="w-5 h-5 text-brand-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Educational Support</h3>
                        <p className="text-neutral-700 text-sm">Help with schooling and educational development</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-brand-accent/10 flex items-center justify-center mr-4 flex-shrink-0">
                        <HandHeart className="w-5 h-5 text-brand-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Emotional Healing</h3>
                        <p className="text-neutral-700 text-sm">Therapeutic support and emotional stability</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Links to Largest Regions */}
      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4">
              <MapPin className="w-4 h-4 text-brand-accent" />
              <span className="text-sm font-medium text-brand-dark">
                Popular Regions
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
              Explore Major Regions
            </h2>
            <p className="text-xl text-neutral-700 max-w-2xl mx-auto">
              Find agencies in the UK's largest metropolitan areas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {popularRegions.map((region, index) => (
              <motion.div
                key={region.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Link 
                  href={`/foster-agency/${region.country}/${region.slug}`}
                  className="p-6 rounded-2xl border border-neutral-200 hover:shadow-md transition-all flex items-center gap-3"
                >
                  <Building2 className="w-6 h-6 text-brand-accent" />
                  <span className="font-medium">{region.name}</span>
                  <ArrowRight className="w-4 h-4 text-brand-accent ml-auto" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Guides and Resources */}
      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4">
              <BookOpen className="w-4 h-4 text-brand-accent" />
              <span className="text-sm font-medium text-brand-dark">
                Resources
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
              Latest Guides and Resources
            </h2>
            <p className="text-xl text-neutral-700 max-w-2xl mx-auto">
              Educational content to support your fostering journey
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {resources.map((resource, index) => (
              <motion.div
                key={resource.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="rounded-2xl border border-neutral-200 hover:shadow-md transition-all hover:-translate-y-1">
                  <div className="relative h-48 overflow-hidden rounded-t-2xl">
                    <Image
                      src={resource.image}
                      alt={resource.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="text-xs font-semibold text-brand-accent mb-2">
                      {resource.category}
                    </div>
                    <CardTitle className="text-xl group-hover:text-brand-accent transition-colors">
                      {resource.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {resource.excerpt}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full text-brand-main border-brand-main hover:bg-brand-main/5 rounded-full" asChild>
                      <Link href={`/resources/${resource.slug}`}>
                        Read More <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mt-12"
          >
            <Button variant="outline" className="border-brand-main text-brand-main hover:bg-brand-main/5 rounded-full px-8 py-6" asChild>
              <Link href="/resources">
                View All Resources <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Testimonials / Success Stories */}
      <section className="py-16 bg-brand-accentSoft w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4">
              <Star className="w-4 h-4 text-brand-accent" />
              <span className="text-sm font-medium text-brand-dark">
                Success Stories
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
              Testimonials & Success Stories
            </h2>
            <p className="text-xl text-brand-dark/80 max-w-2xl mx-auto">
              Hear from families who found their perfect match through our directory
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <Card className="rounded-2xl border border-neutral-200 hover:shadow-md">
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
                      <Badge className="bg-brand-accent text-white rounded-full">
                        <Star className="w-3 h-3 mr-1 fill-white" />
                        {testimonial.rating}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <p className="pt-4">{testimonial.quote}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4">
              <FileText className="w-4 h-4 text-brand-accent" />
              <span className="text-sm font-medium text-brand-dark">
                Frequently Asked Questions
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-brand-dark mb-4">
              Your Fostering Questions Answered
            </h2>
            <p className="text-xl text-neutral-700 max-w-2xl mx-auto">
              Everything you need to know about fostering in the UK
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <Card className="rounded-2xl border border-neutral-200">
                    <CardHeader>
                      <CardTitle className="text-lg">{faq.question}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-neutral-700">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="text-center mt-12"
            >
              <Button variant="outline" className="border-brand-main text-brand-main hover:bg-brand-main/5 rounded-full px-8 py-6" asChild>
                <Link href="/resources">
                  View All FAQs <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Regulatory & Safety Trust Bar */}
      <section className="py-12 bg-brand-accentSoft w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h3 className="text-xl font-semibold text-brand-dark">
              Regulated & Trusted by UK Authorities
            </h3>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap justify-center items-center gap-8 md:gap-12"
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-8 h-8 text-brand-accent" />
              <span className="font-medium">Ofsted</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-brand-accent" />
              <span className="font-medium">CIW</span>
            </div>
            <div className="flex items-center gap-2">
              <Scale className="w-8 h-8 text-brand-accent" />
              <span className="font-medium">Care Inspectorate</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-8 h-8 text-brand-accent" />
              <span className="font-medium">Government Guidance</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Band */}
      <section className="py-16 bg-brand-main w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
              Find Agencies Near You
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Start your fostering journey today by exploring agencies in your area
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-brand-accent text-white hover:bg-emerald-700 rounded-full px-8 py-6 text-lg font-medium"
                asChild
              >
                <Link href="/agencies">
                  Browse Agencies <Search className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="bg-white text-brand-main hover:bg-white/90 rounded-full px-8 py-6 text-lg font-medium"
                asChild
              >
                <Link href="/foster-agency">
                  Explore by Location <MapPin className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}