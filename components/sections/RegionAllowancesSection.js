'use client';

// RegionAllowancesSection.js
import { Card } from '@/components/ui/card';
import { Wallet, Heart } from 'lucide-react';

export default function RegionAllowancesSection({ data, regionSlug }) {
  // Default values if no data provided
  const title = data?.title || `Foster Allowances & Support`;
  const description = data?.description || `Comprehensive support system for foster carers in this region`;
  const allowances = data?.allowances || [
    {
      title: "Weekly Fostering Allowances",
      description: "Receive weekly fostering allowances to cover the costs of caring for a child."
    },
    {
      title: "Additional Payments",
      description: "Additional payments for special circumstances and needs."
    },
    {
      title: "Holiday Pay",
      description: "Extra allowance for holiday periods and special occasions."
    }
  ];

  return (
    <section className="py-16 section-alt">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Wallet className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">Allowances & Support</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
              {title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-inter">
              {description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {allowances.map((allowance, index) => (
              <Card key={index} className="section-card rounded-modern-xl p-6 text-center">
                <div className="w-12 h-12 bg-primary-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-primary-green" />
                </div>
                <h3 className="text-lg font-bold text-text-charcoal mb-2">{allowance.title}</h3>
                <p className="text-gray-600 text-sm">{allowance.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}