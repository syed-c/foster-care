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
      {/* Header */}
      <div className="bg-gradient-to-r from-[#F5E9E2] to-[#E3B5A4]/20 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <BookOpen className="w-16 h-16 mx-auto mb-6 text-[#773344]" />
          <h1 className="text-4xl md:text-5xl font-bold text-[#2C2C2C] mb-4 font-poppins">
            Resources & Guides
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about fostering in the UK. Explore our guides, legal information, and inspiring family stories.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Note about CMS Integration */}
        <Card className="mb-8 bg-blue-50 border-blue-200">
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
              className={category === 'All' ? 'bg-gradient-to-r from-[#773344] to-[#E3B5A4]' : ''}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {placeholderResources.map((resource) => (
            <Card key={resource.slug} className="group hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden rounded-t-xl">
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
                <Button variant="ghost" className="w-full group-hover:bg-[#773344]/10 group-hover:text-[#773344]" asChild>
                  <Link href={`/resources/${resource.slug}`}>
                    Read More <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="mt-12 bg-gradient-to-br from-[#773344] to-[#E3B5A4] border-0 text-white">
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold mb-4 font-poppins">Ready to Start Your Fostering Journey?</h2>
            <p className="text-lg mb-6 text-white/90 max-w-2xl mx-auto">
              Browse our directory of verified fostering agencies and find the perfect match for your family.
            </p>
            <Button size="lg" className="bg-white text-[#773344] hover:bg-gray-100" asChild>
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