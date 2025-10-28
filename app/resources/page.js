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
    <div className="min-h-screen bg-gradient-to-br from-[#F5E9E2] to-white">
      {/* Modern Hero Header with Glassmorphism */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 gradient-mesh opacity-40" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-[#773344]/10 rounded-full blur-3xl float-animation" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#E3B5A4]/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '2s' }} />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <BookOpen className="w-4 h-4 text-[#773344]" />
            <span className="text-sm font-medium text-[#2C2C2C]">Resources</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] mb-4 font-poppins gradient-text">
            Resources & Guides
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about fostering in the UK. Explore our guides, legal information, and inspiring family stories.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Note about CMS Integration */}
        <Card className="glass-strong rounded-3xl mb-8 bg-blue-50/30 border-blue-200">
          <CardContent className="py-4">
            <p className="text-sm text-blue-800">
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
              className={`${category === 'All' ? 'bg-gradient-to-r from-[#773344] to-[#E3B5A4] text-white' : 'glass border-2'} rounded-2xl`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderResources.map((resource) => (
            <Card key={resource.slug} className="glass-strong rounded-3xl group hover-lift cursor-pointer">
              <div className="relative h-48 overflow-hidden rounded-t-3xl">
                <Image
                  src={resource.image}
                  alt={resource.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardHeader>
                <div className="text-xs font-semibold text-[#773344] mb-2">
                  {resource.category}
                </div>
                <CardTitle className="text-xl group-hover:text-[#773344] transition-colors">
                  {resource.title}
                </CardTitle>
                <CardDescription className="mt-2">
                  {resource.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="ghost" className="w-full group-hover:bg-[#773344]/10 group-hover:text-[#773344] rounded-xl" asChild>
                  <Link href={`/resources/${resource.slug}`}>
                    Read More <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="glass-strong rounded-3xl mt-12 bg-gradient-to-br from-[#773344] to-[#E3B5A4] border-0 text-white">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4 font-poppins">Ready to Start Your Fostering Journey?</h2>
            <p className="text-lg mb-6 text-white/90 max-w-2xl mx-auto">
              Browse our directory of verified fostering agencies and find the perfect match for your family.
            </p>
            <Button size="lg" className="bg-white text-[#773344] hover:bg-gray-100 btn-futuristic rounded-2xl" asChild>
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