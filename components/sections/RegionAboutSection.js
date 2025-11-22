'use client';

// RegionAboutSection.js
import { Card } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export default function RegionAboutSection({ data, regionSlug }) {
  // Default values if no data provided
  const title = data?.title || `About Fostering in This Region`;
  const body = data?.body || `<p>Welcome to our directory of foster agencies in this region. We've compiled a list of accredited and trusted agencies to help you start your fostering journey.</p>`;

  return (
    <section className="py-16 section-alt">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <BookOpen className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">About Fostering</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
              {title}
            </h2>
          </div>
          
          <Card className="section-card rounded-modern-xl p-6 md:p-8">
            <div 
              className="prose max-w-none text-gray-600 font-inter"
              dangerouslySetInnerHTML={{ __html: body }}
            />
          </Card>
        </div>
      </div>
    </section>
  );
}