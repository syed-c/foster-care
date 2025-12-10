'use client';

import { useEffect } from 'react';

export default function useDisableScroll(disable: boolean) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (disable) {
      // Store the original overflow value to restore it later
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [disable]);
}