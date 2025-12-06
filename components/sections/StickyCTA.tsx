'use client';

import { useEffect, useState } from 'react';
import { X, Heart } from 'lucide-react';
import { GradientButton } from '@/components/ui/GradientButton';

export const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in-up">
      <div className="glass-card rounded-2xl p-4 shadow-xl border border-brand-cream max-w-xs">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-cream flex items-center justify-center text-brand-black flex-shrink-0">
            <Heart className="w-5 h-5" />
          </div>
          
          <div className="flex-1">
            <h3 className="font-bold text-brand-black font-heading text-base mb-1">
              Ready to Begin?
            </h3>
            <p className="text-text.medium text-sm font-body mb-3">
              Find verified fostering agencies near you
            </p>
            
            <GradientButton size="sm" className="rounded-xl px-4 py-2 text-sm font-medium">
              Find Agencies
            </GradientButton>
          </div>
          
          <button 
            onClick={() => setIsVisible(false)}
            className="text-text.light hover:text-brand-black p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};