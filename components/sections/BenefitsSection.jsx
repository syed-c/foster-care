'use client';

import { Card } from '@/components/ui/card';
import { Heart } from 'lucide-react';

export default function BenefitsSection({ title, description, items }) {
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
              {title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter">
              {description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="section-card rounded-modern-xl p-6">
              <h3 className="text-xl font-bold text-text-charcoal mb-4 font-poppins flex items-center">
                <Heart className="w-5 h-5 text-primary-green mr-2" />
                Benefits
              </h3>
              <ul className="space-y-3">
                {Array.isArray(items) && items.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <div className="w-6 h-6 rounded-full bg-primary-green/10 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      <span className="text-primary-green text-xs">✓</span>
                    </div>
                    <span>{item.title || item.description || item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}