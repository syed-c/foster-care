import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight } from 'lucide-react';

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
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            Everything you need to know about fostering in the UK. Explore our guides, legal information, and inspiring family stories.
          </p>
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

        {/* Categories */}
        <div className="flex flex-wrap gap-3 mb-8">
          {['All', 'Guides', 'Legal', 'Family Stories'].map((category) => (
            <Button
              key={category}
              variant={category === 'All' ? 'default' : 'outline'}
              className={`rounded-full font-inter ${category === 'All' ? 'bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90' : 'glass hover:bg-white/50'}`}
            >
              {category}
            </Button>
          ))}
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

        {/* CTA Section */}
        <Card className="mt-12 section-card-contrast border-0 text-text-charcoal">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4 font-poppins">Ready to Start Your Fostering Journey?</h2>
            <p className="text-lg mb-6 text-gray-700 max-w-2xl mx-auto font-inter">
              Browse our directory of verified fostering agencies and find the perfect match for your family.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 hover:scale-105 transition-all shadow-md font-inter" asChild>
              <Link href="/agencies">
                Browse Agencies <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}