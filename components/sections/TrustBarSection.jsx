'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

export default function TrustBarSection({ items, title }) {
  // Provide default values to prevent destructuring errors
  const safeTitle = title || 'Regulated & Trusted by UK Authorities';
  const safeItems = Array.isArray(items) ? items : [];
  
  if (safeItems.length === 0) {
    return null; // Don't render if there's no content
  }
  
  return (
    <section className="py-16 md:py-24 section-highlight">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <Shield className="w-4 h-4 text-primary-green" />
            <span className="text-sm font-medium text-text-charcoal font-inter">{safeTitle}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {safeItems.map((item, index) => (
              <Card key={index} className="section-card rounded-modern-xl p-6">
                <h3 className="text-lg font-bold text-text-charcoal mb-2 font-poppins">{item?.name || 'Authority'}</h3>
                <p className="text-gray-600 font-inter">{item?.description || 'Regulatory information'}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}