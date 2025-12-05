'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';

export default function BenefitsSection({ content, items, title }) {
  // Provide default values to prevent destructuring errors
  const safeTitle = title || 'Benefits & Support';
  const safeContent = content || '';
  const safeItems = Array.isArray(items) ? items : [];
  
  if (!safeContent && safeItems.length === 0) {
    return null; // Don't render if there's no content
  }
  
  return (
    <section className="py-16 md:py-24 section-highlight">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Heart className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">Benefits & Support</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
              {safeTitle}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {safeItems.length > 0 && (
              <Card className="section-card rounded-modern-xl p-6">
                <h3 className="text-xl font-bold text-text-charcoal mb-4 font-poppins flex items-center">
                  <Heart className="w-5 h-5 text-primary-green mr-2" />
                  Benefits
                </h3>
                <ul className="space-y-3">
                  {safeItems.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                        <span className="text-primary-green text-xs">✓</span>
                      </div>
                      <span>{item?.title || item?.description || item || 'Benefit item'}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}
            
            {safeContent && (
              <Card className="section-card rounded-modern-xl p-6">
                <div className="prose max-w-none text-gray-600 font-inter">
                  {typeof safeContent === 'string' ? (
                    <div dangerouslySetInnerHTML={{ __html: safeContent }} />
                  ) : (
                    <p>{JSON.stringify(safeContent)}</p>
                  )}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}