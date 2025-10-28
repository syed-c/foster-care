'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react';

export default function ResourceDetailPage() {
  const params = useParams();
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch from Sanity CMS
    // For now, showing placeholder
    setResource({
      slug: params.slug,
      title: 'Getting Started with Fostering in the UK',
      category: 'Guides',
      author: 'Foster Care UK Team',
      publishedAt: '2024-01-15',
      readTime: '8 min read',
      image: 'https://images.unsplash.com/photo-1758273240331-745ccab011a2',
      content: `
        <h2>Introduction to Fostering</h2>
        <p>Fostering is one of the most rewarding experiences you can have. This comprehensive guide will walk you through everything you need to know about becoming a foster carer in the UK.</p>
        
        <h3>What is Fostering?</h3>
        <p>Fostering means providing a temporary home and family life to a child or young person who cannot live with their birth family. Foster carers come from all walks of life and backgrounds.</p>
        
        <h3>Types of Fostering</h3>
        <ul>
          <li><strong>Short-term fostering</strong> - A few days to several months</li>
          <li><strong>Long-term fostering</strong> - Until the child becomes an adult</li>
          <li><strong>Respite care</strong> - Short breaks for other foster families</li>
          <li><strong>Emergency fostering</strong> - Immediate placements in crisis</li>
        </ul>
        
        <h3>Requirements</h3>
        <p>To become a foster carer in the UK, you must:</p>
        <ul>
          <li>Be over 21 years old</li>
          <li>Have a spare bedroom</li>
          <li>Have time to care for a child</li>
          <li>Undergo background checks and training</li>
        </ul>
        
        <h3>The Application Process</h3>
        <p>The process typically takes 4-6 months and includes:</p>
        <ol>
          <li>Initial inquiry and information session</li>
          <li>Formal application</li>
          <li>Home assessment</li>
          <li>Training and preparation</li>
          <li>Approval by fostering panel</li>
        </ol>
        
        <h3>Support Available</h3>
        <p>Foster carers receive comprehensive support including:</p>
        <ul>
          <li>Financial allowances</li>
          <li>24/7 support lines</li>
          <li>Ongoing training</li>
          <li>Peer support groups</li>
          <li>Dedicated social workers</li>
        </ul>
        
        <h3>Next Steps</h3>
        <p>Ready to start your fostering journey? Browse our directory of verified fostering agencies to find the right match for you.</p>
      `,
    });
    setLoading(false);
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F5E9E2] to-white">
        <div className="w-16 h-16 border-4 border-[#773344] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!resource) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5E9E2] to-white py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="p-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Resource Not Found</h2>
            <Button asChild>
              <Link href="/resources">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Resources
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F5E9E2] to-white">
      {/* Hero Image */}
      <div className="relative h-96 bg-gradient-to-r from-[#773344]/30 to-[#E3B5A4]/30">
        {resource.image && (
          <Image 
            src={resource.image} 
            alt={resource.title} 
            fill 
            className="object-cover opacity-60"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F5E9E2]" />
      </div>

      <div className="container mx-auto px-4 -mt-32 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Button variant="ghost" className="mb-6" asChild>
            <Link href="/resources">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Resources
            </Link>
          </Button>

          {/* Article Card */}
          <Card className="mb-8">
            <CardHeader>
              <Badge className="bg-[#773344] w-fit mb-4">{resource.category}</Badge>
              <CardTitle className="text-4xl mb-4">{resource.title}</CardTitle>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {resource.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(resource.publishedAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {resource.readTime}
                </div>
              </div>
            </CardHeader>

            <CardContent>
              <div 
                className="prose prose-lg max-w-none"
                style={{
                  color: '#2C2C2C',
                }}
                dangerouslySetInnerHTML={{ __html: resource.content }}
              />

              {/* CTA */}
              <div className="mt-12 pt-8 border-t">
                <Card className="bg-gradient-to-br from-[#773344] to-[#E3B5A4] border-0 text-white p-6">
                  <h3 className="text-2xl font-bold mb-2">Ready to Start Your Fostering Journey?</h3>
                  <p className="mb-4 opacity-90">
                    Browse our directory of verified fostering agencies and find the perfect match.
                  </p>
                  <Button size="lg" className="bg-white text-[#773344] hover:bg-gray-100" asChild>
                    <Link href="/agencies">Browse Agencies</Link>
                  </Button>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          <Card>
            <CardHeader>
              <CardTitle>Related Resources</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: 'Legal Requirements for Foster Carers', category: 'Legal', slug: 'legal-requirements' },
                  { title: 'Financial Support for Foster Families', category: 'Finance', slug: 'financial-support' },
                ].map((related) => (
                  <Link 
                    key={related.slug}
                    href={`/resources/${related.slug}`}
                    className="block p-4 rounded-lg border hover:border-[#773344] transition-colors"
                  >
                    <Badge className="bg-[#E3B5A4] mb-2">{related.category}</Badge>
                    <h4 className="font-semibold">{related.title}</h4>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
