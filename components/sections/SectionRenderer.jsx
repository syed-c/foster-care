'use client';

import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Heart, 
  Users, 
  BookOpen, 
  Award, 
  Shield, 
  Star, 
  ExternalLink, 
  ArrowRight,
  Search
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import TopAgenciesSection from '@/components/sections/TopAgenciesSection';

// Error boundary component to catch rendering errors
function ErrorBoundary({ children }) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (hasError) {
      // Reset error state after a short delay
      const timer = setTimeout(() => setHasError(false), 100);
      return () => clearTimeout(timer);
    }
  }, [hasError]);

  if (hasError) {
    return <div className="p-4 bg-red-100 border border-red-400 rounded text-red-700">Component failed to render</div>;
  }

  try {
    return children;
  } catch (error) {
    console.error('ErrorBoundary caught an error:', error);
    setHasError(true);
    return <div className="p-4 bg-red-100 border border-red-400 rounded text-red-700">Component failed to render</div>;
  }
}

// Dynamic imports for section components with error handling
const map = {
  // Hero section is handled directly in the page
  overview: dynamic(() => import('./OverviewSection'), { ssr: false, loading: () => <div>Loading overview section...</div> }),
  system: dynamic(() => import('./BenefitsSection'), { ssr: false, loading: () => <div>Loading foster system section...</div> }),
  reasons: dynamic(() => import('./BenefitsSection'), { ssr: false, loading: () => <div>Loading reasons section...</div> }),
  benefitsSupport: dynamic(() => import('./BenefitsSection'), { ssr: false, loading: () => <div>Loading benefits & support section...</div> }),
  featuredAreas: dynamic(() => import('./PopularCitiesSection'), { ssr: false, loading: () => <div>Loading featured areas section...</div> }),
  faqs: dynamic(() => import('./FaqSection'), { ssr: false, loading: () => <div>Loading FAQ section...</div> }),
  trustbar: dynamic(() => import('./TrustBarSection'), { ssr: false, loading: () => <div>Loading trust bar section...</div> }),
  finalcta: dynamic(() => import('./FinalCtaSection'), { ssr: false, loading: () => <div>Loading final CTA section...</div> }),
  // fallback to GenericBlock
};

// Generic block component for unknown section types
function GenericBlock({ section }) {
  // Provide default values to prevent destructuring errors
  const safeSection = section && typeof section === 'object' ? section : {};
  const safeTitle = safeSection.title || safeSection.heading || 'Untitled Section';
  const safeContent = safeSection.content;
  const safeDescription = safeSection.description;
  
  return (
    <Card className="section-card rounded-modern-xl p-6">
      <CardHeader>
        <CardTitle className="text-2xl font-poppins">
          {safeTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {safeContent && (
          <div className="prose max-w-none text-gray-600 font-inter">
            {typeof safeContent === 'string' ? (
              <div dangerouslySetInnerHTML={{ __html: safeContent }} />
            ) : (
              <p>{JSON.stringify(safeContent)}</p>
            )}
          </div>
        )}
        {safeDescription && (
          <p className="text-gray-600 mt-2 font-inter">
            {safeDescription}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export default function SectionRenderer({ type, content }) {
  // Safety check for content
  if (!content || typeof content !== 'object') {
    return null; // Don't render anything if there's no content
  }
  
  // If type is specified and we have a mapped component, use it
  if (type && map[type]) {
    const Component = map[type];
    try {
      // Wrap in error boundary to catch runtime errors
      return (
        <ErrorBoundary>
          <Component {...content} />
        </ErrorBoundary>
      );
    } catch (error) {
      console.error('Error rendering component:', error);
      return <GenericBlock section={{ title: 'Component Error', content: `Failed to render ${type} component` }} />;
    }
  }
  
  // Otherwise, use a generic block
  return <GenericBlock section={content} />;
}