'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  BookOpen, 
  ArrowRight, 
  FileText, 
  Users, 
  Heart, 
  Clock, 
  Search,
  TrendingUp,
  Star,
  User,
  MapPin,
  Calendar,
  Filter,
  ChevronDown,
  ChevronRight,
  Lightbulb,
  Target,
  GraduationCap,
  Award,
  HelpCircle,
  Mail,
  CheckCircle
} from 'lucide-react';

export default function ResourcesPage() {
  // TODO: Integrate with Sanity CMS
  // For now, showing placeholder content
  const placeholderResources = [
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
    },
    {
      title: 'Training and Support for Foster Carers',
      category: 'Guides',
      excerpt: 'Comprehensive overview of the training programs and ongoing support available to foster carers.',
      slug: 'training-and-support',
      image: 'https://images.unsplash.com/photo-1758273240331-745ccab011a2',
    },
    {
      title: 'Allowance and Payments Explained',
      category: 'Legal',
      excerpt: 'Detailed information about foster carer allowances, tax implications, and financial support.',
      slug: 'allowance-and-payments',
      image: 'https://images.unsplash.com/photo-1758687126445-98edd4b15ba6',
    },
    {
      title: 'Frequently Asked Questions',
      category: 'Guides',
      excerpt: 'Answers to the most common questions about fostering, agencies, and the application process.',
      slug: 'faq',
      image: 'https://images.unsplash.com/photo-1761030293423-130d4c937ead',
    }
  ];

  const resourceCategories = [
    {
      icon: BookOpen,
      title: "Guides",
      description: "Step-by-step instructions and how-to guides",
      link: "/resources/getting-started"
    },
    {
      icon: FileText,
      title: "Legal",
      description: "Legal requirements and regulations",
      link: "/resources/training-and-support"
    },
    {
      icon: Heart,
      title: "Allowances & Money",
      description: "Financial support and payment information",
      link: "/resources/allowance-and-payments"
    },
    {
      icon: Users,
      title: "Success Stories",
      description: "Real experiences from foster families",
      link: "/resources/faq"
    },
    {
      icon: MapPin,
      title: "Local Info by Region",
      description: "Location-specific fostering information",
      link: "/foster-agency"
    },
    {
      icon: GraduationCap,
      title: "Training & Support",
      description: "Professional development and ongoing support",
      link: "/resources/training-and-support"
    },
    {
      icon: CheckCircle,
      title: "Tools & Checklists",
      description: "Practical resources and planning tools",
      link: "/resources/faq"
    },
    {
      icon: Award,
      title: "For Agencies",
      description: "Resources for fostering professionals",
      link: "/resources/getting-started"
    }
  ];
  
  // Featured Guides / Editor's Picks
  const featuredGuides = [
    {
      title: 'How to Become a Foster Carer',
      excerpt: 'Complete step-by-step guide to starting your fostering journey',
      slug: 'how-to-become-a-foster-carer',
      category: 'Guides',
      image: 'https://images.unsplash.com/photo-1758273240331-745ccab011a2',
    },
    {
      title: 'Foster Allowance Guide 2025',
      excerpt: 'Understanding payments, tax implications, and financial support',
      slug: 'foster-allowance-guide-2025',
      category: 'Legal',
      image: 'https://images.unsplash.com/photo-1758687126445-98edd4b15ba6',
    },
    {
      title: 'Local Authority vs. Independent Agencies',
      excerpt: 'Key differences and how to choose the right agency for you',
      slug: 'local-authority-vs-independent-agencies',
      category: 'Guides',
      image: 'https://images.unsplash.com/photo-1761030293423-130d4c937ead',
    },
    {
      title: 'Foster Carer Requirements UK',
      excerpt: 'Who can foster and what qualifications are needed',
      slug: 'foster-carer-requirements-uk',
      category: 'Guides',
      image: 'https://images.unsplash.com/photo-1758273240331-745ccab011a2',
    }
  ];
  
  // Most Popular / Trending Topics
  const popularTopics = [
    { title: 'Fostering Allowances', count: 124 },
    { title: 'Becoming a Foster Carer', count: 98 },
    { title: 'Agency Types', count: 87 },
    { title: 'Legal Requirements', count: 76 },
    { title: 'Training Programs', count: 65 },
    { title: 'Support Services', count: 54 }
  ];
  
  // Browse by User Goal
  const userGoals = [
    {
      title: 'I want to become a foster carer',
      description: 'Start your journey with our comprehensive guides',
      icon: Target,
      link: '/resources/getting-started'
    },
    {
      title: 'I want to compare agencies',
      description: 'Find the right agency for your situation',
      icon: Award,
      link: '/agencies'
    },
    {
      title: 'I want allowance information',
      description: 'Understand financial support and payments',
      icon: Heart,
      link: '/resources/allowance-and-payments'
    },
    {
      title: 'I want real stories',
      description: 'Read experiences from other foster carers',
      icon: Users,
      link: '/resources/stories'
    }
  ];
  
  // Learning Path / Step-By-Step Roadmap
  const learningPath = [
    { step: 1, title: 'Overview of Fostering', slug: 'overview-of-fostering' },
    { step: 2, title: 'Requirements', slug: 'foster-carer-requirements' },
    { step: 3, title: 'Payments & Support', slug: 'payments-and-support' },
    { step: 4, title: 'Choosing an Agency', slug: 'choosing-an-agency' },
    { step: 5, title: 'Assessment Process', slug: 'assessment-process' },
    { step: 6, title: 'Approval & Training', slug: 'approval-and-training' },
    { step: 7, title: 'First Placement Experience', slug: 'first-placement-experience' }
  ];
  
  // FAQ Section
  const faqs = [
    {
      question: 'How do I become a foster carer?',
      answer: 'The process begins with contacting a fostering agency to express your interest. You\'ll then complete an application, attend an initial interview, and begin the assessment process which includes background checks, training, and home visits.'
    },
    {
      question: 'Do foster carers get paid?',
      answer: 'Foster carers receive a fostering allowance to cover the costs of caring for a child. This is not a salary but a reimbursement for expenses. Amounts vary by agency and the child\'s needs.'
    },
    {
      question: 'What is the approval process?',
      answer: 'The assessment process typically takes 4-6 months and includes background checks, health assessments, personal references, and training. You\'ll work with a social worker throughout this process.'
    },
    {
      question: 'Can single people foster?',
      answer: 'Yes, single people can foster. You must be over 21 years old, have a spare room, and be physically and mentally fit to care for children.'
    },
    {
      question: 'How long does fostering approval take?',
      answer: 'The assessment process typically takes 4-6 months. This includes background checks, training, and home visits to ensure you\'re prepared for fostering.'
    },
    {
      question: 'Can I choose the age group of children I foster?',
      answer: 'Yes, during your assessment you can discuss your preferences. Agencies will match you with children whose needs align with your experience and comfort level.'
    }
  ];

  return (
    <div className="min-h-screen bg-background-offwhite">
      {/* Header */}
      <div className="section-hero py-16 md:py-24 relative overflow-hidden">
        {/* Animated Background Elements */}
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
        <div className="container mx-auto px-4 text-center relative z-10">
          <BookOpen className="w-16 h-16 mx-auto mb-6 text-primary-green" />
          <h1 className="text-4xl md:text-5xl font-bold text-text-charcoal mb-4 font-poppins">
            Resources & Guides
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter mb-8">
            Everything you need to know about fostering in the UK. Explore our guides, legal information, and inspiring family stories.
          </p>
          
          {/* Enhanced Search Bar */}
          <form className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search guides by topic, location or question..."
                className="pl-12 h-14 text-base rounded-xl border-2 focus:border-primary-green font-inter shadow-lg"
              />
              <Button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 px-6 bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 rounded-lg font-inter"
              >
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Note about CMS Integration */}
        <Card className="mb-8 bg-blue-50 border-blue-200 section-card">
          <CardContent className="py-4">
            <p className="text-sm text-blue-800 font-inter">
              <strong>Note:</strong> This page will be powered by Sanity CMS. Blog posts and resources will be managed through the Sanity Studio. 
              The integration is ready - just add your content!
            </p>
          </CardContent>
        </Card>

        {/* About the Knowledge Hub */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in hover:scale-105 transition-all duration-300">
            <Lightbulb className="w-4 h-4 text-primary-green" />
            <span className="text-sm font-medium text-text-charcoal font-inter">
              About Our Knowledge Hub
            </span>
          </div>
          <h2 className="text-3xl font-bold text-text-charcoal mb-6 font-poppins">
            Your Trusted Source for Fostering Information
          </h2>
          <div className="prose prose-lg max-w-none section-card-alt p-8 rounded-modern-xl">
            <p className="text-gray-700 mb-4 font-inter">
              The Foster Care UK Knowledge Hub is your comprehensive resource for all things fostering in the United Kingdom. 
              Whether you're just beginning to explore fostering or are already an approved carer, our expert-curated content 
              provides authoritative, up-to-date information to support your journey.
            </p>
            
            <h3 className="text-xl font-bold mb-3 font-poppins text-text-charcoal">Purpose of the Hub</h3>
            <p className="text-gray-700 mb-4 font-inter">
              We've created this hub to demystify the fostering process and provide clear, accurate information to help 
              prospective and current foster carers make informed decisions. Our content is regularly reviewed by fostering 
              professionals and updated to reflect current legislation and best practices.
            </p>
            
            <h3 className="text-xl font-bold mb-3 font-poppins text-text-charcoal">How Content is Reviewed</h3>
            <p className="text-gray-700 mb-4 font-inter">
              All articles and guides undergo a rigorous review process by qualified fostering professionals, including 
              social workers, agency directors, and experienced foster carers. We ensure all content aligns with current 
              UK fostering standards and regulations.
            </p>
            
            <h3 className="text-xl font-bold mb-3 font-poppins text-text-charcoal">Who It Helps</h3>
            <p className="text-gray-700 mb-4 font-inter">
              Our resources support a wide range of readers, from individuals considering fostering to approved carers 
              seeking ongoing guidance. We also provide specialized content for fostering agencies and professionals.
            </p>
            
            <h3 className="text-xl font-bold mb-3 font-poppins text-text-charcoal">Who Writes It</h3>
            <p className="text-gray-700 mb-6 font-inter">
              Our content is created by a team of experienced fostering professionals, including social workers, agency 
              directors, and foster carers with decades of combined experience. We also collaborate with regulatory 
              bodies to ensure accuracy and compliance.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="border-primary-green text-primary-green hover:bg-primary-green/5 font-inter" asChild>
                <Link href="/about">
                  Learn About Our Mission
                </Link>
              </Button>
              <Button variant="outline" className="border-secondary-blue text-secondary-blue hover:bg-secondary-blue/5 font-inter" asChild>
                <Link href="/contact">
                  Contact Our Team
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Category Navigation */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in hover:scale-105 transition-all duration-300">
            <Filter className="w-4 h-4 text-primary-green" />
            <span className="text-sm font-medium text-text-charcoal font-inter">
              Browse by Category
            </span>
          </div>
          <h2 className="text-3xl font-bold text-text-charcoal mb-6 font-poppins">
            Explore Our Resources
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resourceCategories.map((category, index) => {
              const IconComponent = category.icon;
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
                    <CardTitle className="text-lg font-poppins">
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 font-inter mb-4">
                      {category.description}
                    </p>
                    <Button variant="link" size="sm" className="p-0 h-auto font-inter text-primary-green" asChild>
                      <Link href={category.link}>
                        Explore <ChevronRight className="ml-1 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Featured Guides / Editor's Picks */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in hover:scale-105 transition-all duration-300">
            <Star className="w-4 h-4 text-primary-green" />
            <span className="text-sm font-medium text-text-charcoal font-inter">
              Editor's Picks
            </span>
          </div>
          <h2 className="text-3xl font-bold text-text-charcoal mb-6 font-poppins">
            Featured Guides
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredGuides.map((guide, index) => (
              <Card 
                key={index} 
                className="section-card hover-lift transition-all card-3d hover:scale-105"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-40 overflow-hidden rounded-t-xl">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="text-xs font-semibold text-primary-green mb-2 font-inter">
                    {guide.category}
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary-green transition-colors font-poppins">
                    {guide.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4 font-inter">
                    {guide.excerpt}
                  </p>
                  <Button variant="ghost" className="w-full group-hover:bg-primary-green/10 group-hover:text-primary-green font-inter" asChild>
                    <Link href={`/resources/${guide.slug}`}>
                      Read Guide <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Most Popular / Trending Topics */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in hover:scale-105 transition-all duration-300">
            <TrendingUp className="w-4 h-4 text-primary-green" />
            <span className="text-sm font-medium text-text-charcoal font-inter">
              Trending Topics
            </span>
          </div>
          <h2 className="text-3xl font-bold text-text-charcoal mb-6 font-poppins">
            Most Popular Resources
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTopics.map((topic, index) => (
              <Card 
                key={index} 
                className="section-card hover-lift transition-all card-3d hover:scale-105"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-poppins">
                      {topic.title}
                    </CardTitle>
                    <span className="text-sm text-gray-500 font-inter">
                      {topic.count} reads
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary-green to-secondary-blue h-2 rounded-full" 
                      style={{ width: `${Math.min(100, (topic.count / 150) * 100)}%` }}
                    ></div>
                  </div>
                  <Button variant="link" size="sm" className="p-0 h-auto mt-4 font-inter text-primary-green" asChild>
                    <Link href={`/resources?search=${encodeURIComponent(topic.title)}`}>
                      Explore Topic <ChevronRight className="ml-1 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Browse by User Goal */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in hover:scale-105 transition-all duration-300">
            <Target className="w-4 h-4 text-primary-green" />
            <span className="text-sm font-medium text-text-charcoal font-inter">
              Find What You Need
            </span>
          </div>
          <h2 className="text-3xl font-bold text-text-charcoal mb-6 font-poppins">
            Browse by Your Goal
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userGoals.map((goal, index) => {
              const IconComponent = goal.icon;
              return (
                <Card 
                  key={index} 
                  className="section-card hover-lift transition-all card-3d hover:scale-105"
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-primary-green/20 to-secondary-blue/20 mr-4">
                        <IconComponent className="w-6 h-6 text-primary-green" />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-poppins">
                          {goal.title}
                        </CardTitle>
                        <p className="text-gray-600 mt-2 font-inter">
                          {goal.description}
                        </p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 font-inter" asChild>
                      <Link href={goal.link}>
                        Get Started <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Learning Path / Step-By-Step Roadmap */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in hover:scale-105 transition-all duration-300">
            <GraduationCap className="w-4 h-4 text-primary-green" />
            <span className="text-sm font-medium text-text-charcoal font-inter">
              Learning Path
            </span>
          </div>
          <h2 className="text-3xl font-bold text-text-charcoal mb-6 font-poppins">
            Your Fostering Journey Roadmap
          </h2>
          <Card className="section-card-alt p-8 rounded-modern-xl">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-primary-green/20"></div>
              
              <div className="space-y-8">
                {learningPath.map((step, index) => (
                  <div key={index} className="relative flex items-start">
                    <div className="absolute left-0 w-12 h-12 rounded-full bg-primary-green border-4 border-white shadow-lg flex items-center justify-center z-10">
                      <span className="text-white font-bold">{step.step}</span>
                    </div>
                    <div className="ml-20 w-full">
                      <Card className="section-card hover-lift transition-all flex items-center justify-between p-4">
                        <CardHeader className="p-0 mr-4">
                          <CardTitle className="text-lg font-poppins">
                            {step.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <Button variant="link" size="sm" className="p-0 h-auto font-inter text-primary-green" asChild>
                            <Link href={`/resources/${step.slug}`}>
                              Learn More <ChevronRight className="ml-1 w-4 h-4" />
                            </Link>
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Enhanced Resources Introduction */}
        <div className="max-w-4xl mx-auto mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in hover:scale-105 transition-all duration-300">
            <Clock className="w-4 h-4 text-primary-green" />
            <span className="text-sm font-medium text-text-charcoal font-inter">
              Latest Resources
            </span>
          </div>
          <h2 className="text-3xl font-bold text-text-charcoal mb-6 font-poppins">
            Recent Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {resourceCategories.slice(0, 4).map((category, index) => {
              const IconComponent = category.icon;
              return (
                <div key={index} className="section-card-alt p-6 hover-lift card-3d hover:scale-105 transition-all duration-300 text-left">
                  <IconComponent className="w-8 h-8 text-primary-green mb-3 transition-all duration-300 hover:scale-110" />
                  <h3 className="font-semibold text-lg mb-2 font-poppins">{category.title}</h3>
                  <p className="text-sm text-gray-600 font-inter mb-4">{category.description}</p>
                  <Button variant="outline" size="sm" className="border-primary-green text-primary-green hover:bg-primary-green/5 font-inter" asChild>
                    <Link href={category.link}>
                      Learn More
                    </Link>
                  </Button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderResources.map((resource) => (
            <Card key={resource.slug} className="section-card hover-lift transition-all hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden rounded-t-xl">
                <Image
                  src={resource.image}
                  alt={resource.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="text-xs font-semibold text-primary-green mb-2 font-inter">
                  {resource.category}
                </div>
                <CardTitle className="text-xl group-hover:text-primary-green transition-colors font-poppins">
                  {resource.title}
                </CardTitle>
                <CardDescription className="mt-2 font-inter">
                  {resource.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full group-hover:bg-primary-green/10 group-hover:text-primary-green font-inter" asChild>
                  <Link href={`/resources/${resource.slug}`}>
                    Read More <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="my-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in hover:scale-105 transition-all duration-300">
            <HelpCircle className="w-4 h-4 text-primary-green" />
            <span className="text-sm font-medium text-text-charcoal font-inter">
              Frequently Asked Questions
            </span>
          </div>
          <h2 className="text-3xl font-bold text-text-charcoal mb-6 font-poppins">
            Fostering Guides FAQ
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="section-card rounded-modern-xl">
                  <CardHeader>
                    <CardTitle className="text-lg font-poppins flex items-center justify-between">
                      {faq.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-inter text-gray-600">
                      {faq.answer}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="my-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in hover:scale-105 transition-all duration-300">
            <Mail className="w-4 h-4 text-primary-green" />
            <span className="text-sm font-medium text-text-charcoal font-inter">
              Stay Updated
            </span>
          </div>
          <h2 className="text-3xl font-bold text-text-charcoal mb-6 font-poppins">
            Get Monthly Fostering Insights
          </h2>
          <Card className="section-card-alt max-w-3xl mx-auto rounded-modern-xl">
            <CardContent className="p-8 text-center">
              <p className="text-lg text-gray-600 mb-6 font-inter">
                Subscribe to our newsletter for the latest fostering news, agency updates, and resources delivered straight to your inbox.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
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
                  className="h-12 px-6 bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 rounded-xl font-inter"
                >
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-gray-500 mt-3 font-inter">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA Section */}
        <Card className="section-card-contrast border-0 text-text-charcoal rounded-modern-xl">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4 font-poppins">Ready to Start Your Fostering Journey?</h2>
            <p className="text-lg mb-6 text-gray-700 max-w-2xl mx-auto font-inter">
              Browse our directory of verified fostering agencies and find the perfect match for your family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 hover:scale-105 transition-all shadow-md font-inter" asChild>
                <Link href="/agencies">
                  Browse Agencies <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-primary-green text-primary-green hover:bg-primary-green/5 hover:scale-105 transition-all font-inter" asChild>
                <Link href="/contact">
                  Speak to Advisor
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}