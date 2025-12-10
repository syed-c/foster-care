'use client';

import { useState, useCallback } from 'react';

export default function useCountyTransition() {
  const [selectedCounty, setSelectedCounty] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const enterCounty = useCallback((county) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setSelectedCounty(county);
    
    // Animation duration should match the Framer Motion transition
    setTimeout(() => {
      setIsAnimating(false);
    }, 300);
  }, [isAnimating]);

  const exitCounty = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    
    // Animation duration should match the Framer Motion transition
    setTimeout(() => {
      setSelectedCounty(null);
      setIsAnimating(false);
    }, 300);
  }, [isAnimating]);

  return {
    selectedCounty,
    enterCounty,
    exitCounty,
    isAnimating
  };
}