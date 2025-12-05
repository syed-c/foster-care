'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';

export const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show sticky CTA after scrolling 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white border-t border-gray-200 shadow-lg">
      <div className="container mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg gradient-bg flex items-center justify-center text-white">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-text-charcoal font-heading">Ready to Make a Difference?</h3>
              <p className="text-sm text-gray-600 font-body">Join 2,500+ families who found their perfect match</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <GradientButton size="sm" className="rounded-lg px-4 py-2 text-sm font-medium">
              Find Agencies
            </GradientButton>
            <button 
              onClick={handleClose}
              className="p-2 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Adding missing Heart icon
const Heart = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);