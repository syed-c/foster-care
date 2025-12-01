'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export default function OverviewSection({ content, title }) {
  // Provide default values to prevent destructuring errors
  const safeTitle = title || 'About Fostering in This Location';
  const safeContent = content || '';
  
  if (!safeContent) {
    return null; // Don't render if there's no content
  }
  
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
              {safeTitle}
            </h2>
          </div>
          
          <Card className="section-card rounded-modern-xl p-6 md:p-8">
            <div className="prose max-w-none text-gray-600 font-inter">
              {typeof safeContent === 'string' ? (
                <div dangerouslySetInnerHTML={{ __html: safeContent }} />
              ) : (
                <p>{JSON.stringify(safeContent)}</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}