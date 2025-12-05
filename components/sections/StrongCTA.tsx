'use client';

import { Heart } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';

export const StrongCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-teal-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-100 mb-6">
            <Heart className="w-4 h-4 text-teal-700" />
            <span className="text-xs font-medium text-teal-800 font-body">Ready to Begin?</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-heading">
            Ready to Open Your Heart?
          </h2>
          
          <p className="text-lg text-gray-700 mb-6 font-body">
            Every child deserves a loving family. Our compassionate team is here to support you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <GradientButton size="lg" className="rounded-xl px-8 py-4 text-base font-medium">
              Find Fostering Agencies
            </GradientButton>
            
            <GradientButton 
              variant="outline" 
              size="lg" 
              className="rounded-xl px-8 py-4 text-base font-medium border-2"
            >
              Speak to an Advisor
            </GradientButton>
          </div>
          
          <div className="p-5 bg-white rounded-lg border border-gray-200 max-w-2xl mx-auto">
            <p className="text-gray-700 font-body text-sm">
              Have questions? Call our helpline anytime at <span className="font-semibold">0800 123 4567</span> 
              or email <span className="font-semibold">support@fostercare.co.uk</span>. 
              We're here to help, Monday through Sunday, 8am to 8pm.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};