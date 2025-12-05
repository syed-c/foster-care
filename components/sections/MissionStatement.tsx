'use client';

import { Heart } from 'lucide-react';

export const MissionStatement = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 mb-4">
            <Heart className="w-4 h-4 text-teal-600" />
            <span className="text-xs font-medium text-teal-700 font-body">Our Mission</span>
          </div>
          
          <h2 className="text-xl md:text-2xl font-bold text-text-charcoal mb-3 font-heading">
            Creating Stable Homes Where Children Thrive
          </h2>
          
          <p className="text-sm text-gray-600 font-body">
            We connect compassionate foster families with dedicated agencies to build lasting bonds that transform lives. 
            Every child deserves a stable, nurturing environment where they can grow.
          </p>
        </div>
      </div>
    </section>
  );
};