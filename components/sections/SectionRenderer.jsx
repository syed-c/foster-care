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
  hero: dynamic(() => import('./HeroSection'), { ssr: false, loading: () => <div>Loading hero section...</div> }),
  overview: dynamic(() => import('./OverviewSection'), { ssr: false, loading: () => <div>Loading overview section...</div> }),
  benefits: dynamic(() => import('./BenefitsSection'), { ssr: false, loading: () => <div>Loading benefits section...</div> }),
  popularCities: dynamic(() => import('./PopularCitiesDynamic'), { ssr: false, loading: () => <div>Loading popular cities section...</div> }),
  faqs: dynamic(() => import('./FaqSection'), { ssr: false, loading: () => <div>Loading FAQ section...</div> }),
  topAgencies: dynamic(() => import('./TopAgenciesDynamic'), { ssr: false, loading: () => <div>Loading top agencies section...</div> }),
  agencyFinder: dynamic(() => import('./AgencyFinder'), { ssr: false, loading: () => <div>Loading agency finder section...</div> }),
  popularLocations: dynamic(() => import('./PopularCitiesDynamic'), { ssr: false, loading: () => <div>Loading popular locations section...</div> }),
  fosterSystem: dynamic(() => import('./BenefitsSection'), { ssr: false, loading: () => <div>Loading foster system section...</div> }),
  whyFoster: dynamic(() => import('./BenefitsSection'), { ssr: false, loading: () => <div>Loading why foster section...</div> }),
  regulated: dynamic(() => import('./OverviewSection'), { ssr: false, loading: () => <div>Loading regulated section...</div> }),
  findAgencies: dynamic(() => import('./AgencyFinder'), { ssr: false, loading: () => <div>Loading find agencies section...</div> }),
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

// Specific section components for new structure
function HeroSectionComponent({ data }) {
  const { heading, subheading, body, image, ctaText, ctaLink } = data || {};
  
  return (
    <section className="relative py-16 md:py-24 overflow-hidden section-hero">
      <div className="absolute inset-0 gradient-mesh opacity-50" />
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary-green/15 rounded-full blur-3xl float-animation" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary-blue/15 rounded-full blur-3xl float-animation" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
            <MapPin className="w-4 h-4 text-primary-green" />
            <span className="text-sm font-medium text-text-charcoal font-inter">Location</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-text-charcoal mb-6 font-poppins">
            {heading || 'Untitled'}
          </h1>
          {subheading && (
            <p className="text-xl text-gray-600 mb-8 font-inter">
              {subheading}
            </p>
          )}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            {ctaText && ctaLink && (
              <Button
                size="lg"
                className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal hover:opacity-90 px-8 py-6 text-lg font-semibold rounded-xl btn-futuristic"
                asChild
              >
                <Link href={ctaLink}>{ctaText}</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function OverviewSectionComponent({ data }) {
  const { body } = data || {};
  
  return (
    <section className="py-16 section-alt">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <BookOpen className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">About Fostering</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
              Overview
            </h2>
          </div>
          
          <Card className="section-card rounded-modern-xl p-6 md:p-8">
            <div className="prose max-w-none text-gray-600 font-inter">
              {body ? (
                <div dangerouslySetInnerHTML={{ __html: body }} />
              ) : (
                <p>No content available</p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

function ReasonsSectionComponent({ data }) {
  const { heading, subheading, items } = data || {};
  const safeItems = Array.isArray(items) ? items : [];
  
  return (
    <section className="py-16 md:py-24 section-highlight">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Heart className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">Reasons to Foster</span>
            </div>
            {heading && (
              <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-gray-600 max-w-2xl mx-auto font-inter">
                {subheading}
              </p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {safeItems.map((item, index) => (
              <Card key={index} className="section-card rounded-modern-xl p-6">
                <h3 className="text-xl font-bold text-text-charcoal mb-4 font-poppins flex items-center">
                  <Heart className="w-5 h-5 text-primary-green mr-2" />
                  {item.title || 'Reason'}
                </h3>
                <p className="text-gray-600 font-inter">
                  {item.description || 'Description'}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FaqSectionComponent({ data }) {
  const { heading, items } = data || {};
  const safeItems = Array.isArray(items) ? items : [];
  
  return (
    <section className="py-16 md:py-24 section-alt">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-4">
              <Users className="w-4 h-4 text-primary-green" />
              <span className="text-sm font-medium text-text-charcoal font-inter">FAQs</span>
            </div>
            {heading && (
              <h2 className="text-3xl md:text-4xl font-bold text-text-charcoal mb-4 font-poppins">
                {heading}
              </h2>
            )}
          </div>
          
          <Accordion type="single" collapsible className="space-y-4">
            {safeItems.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="section-card rounded-modern-lg border border-gray-200">
                <AccordionTrigger className="px-6 py-4 text-left font-poppins text-lg font-medium text-text-charcoal hover:bg-gray-50 rounded-t-modern-lg">
                  {faq.question || 'Question'}
                </AccordionTrigger>
                <AccordionContent className="px-6 py-4 text-gray-600 font-inter bg-white rounded-b-modern-lg">
                  {faq.answer || 'Answer'}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

export default function SectionRenderer({ section, regionSlug }) {
  // Safety check for section
  if (!section || typeof section !== 'object') {
    return <GenericBlock section={{ title: 'Invalid Section', content: 'This section could not be loaded properly.' }} />;
  }
  
  // Handle new section structure (type + data)
  if (section.type) {
    // Map new section types to components
    switch (section.type) {
      case 'hero':
        return <HeroSectionComponent data={section.data} />;
      case 'overview':
        return <OverviewSectionComponent data={section.data} />;
      case 'reasons':
        return <ReasonsSectionComponent data={section.data} />;
      case 'faq':
        return <FaqSectionComponent data={section.data} />;
      default:
        // Fall back to dynamic components if available
        if (map[section.type]) {
          const Component = map[section.type];
          const sectionData = section.data && typeof section.data === 'object' ? section.data : {};
          try {
            return (
              <ErrorBoundary>
                <Component key={section.id} {...sectionData} regionSlug={regionSlug} />
              </ErrorBoundary>
            );
          } catch (error) {
            console.error('Error rendering component:', error);
            return <GenericBlock section={{ title: 'Component Error', content: `Failed to render ${section.type} component` }} />;
          }
        }
        // Otherwise, use a generic block
        return <GenericBlock section={section} />;
    }
  }
  
  // If section has a key that matches a known type, use the mapped component
  if (section.key && map[section.key]) {
    const Component = map[section.key];
    try {
      // Wrap in error boundary to catch runtime errors
      // Add safety check for auth-related properties
      const safeProps = {
        ...section,
        regionSlug: regionSlug
      };
      
      // Ensure auth-related properties are handled safely
      if (section.auth && typeof section.auth === 'object') {
        safeProps.auth = section.auth;
      } else {
        safeProps.auth = null;
      }
      
      return (
        <ErrorBoundary>
          <Component key={section.id} {...safeProps} />
        </ErrorBoundary>
      );
    } catch (error) {
      console.error('Error rendering component:', error);
      return <GenericBlock section={{ title: 'Component Error', content: `Failed to render ${section.key} component` }} />;
    }
  }
  
  // Otherwise, use a generic block
  return <GenericBlock section={section} />;
}