'use client';

// RegionSectionRenderer.js
import { Fragment } from 'react';
import RegionBreadcrumbSection from './RegionBreadcrumbSection';
import RegionHeroSection from './RegionHeroSection';
import RegionAboutSection from './RegionAboutSection';
import RegionBenefitsSection from './RegionBenefitsSection';
import RegionPopularCitiesSection from './RegionPopularCitiesSection';
import RegionAllowancesSection from './RegionAllowancesSection';
import RegionTestimonialsSection from './RegionTestimonialsSection';
import RegionFaqSection from './RegionFaqSection';
import RegionTrustBarSection from './RegionTrustBarSection';
import RegionFinalCtaSection from './RegionFinalCtaSection';

// Map section types to their respective components
const sectionComponents = {
  breadcrumb: RegionBreadcrumbSection,
  hero: RegionHeroSection,
  about: RegionAboutSection,
  benefits: RegionBenefitsSection,
  benefitsSupport: RegionBenefitsSection,
  popularCities: RegionPopularCitiesSection,
  allowances: RegionAllowancesSection,
  testimonials: RegionTestimonialsSection,
  faq: RegionFaqSection,
  trustBar: RegionTrustBarSection,
  finalCta: RegionFinalCtaSection
};

export default function RegionSectionRenderer({ section, regionSlug }) {
  // Get the appropriate component for this section type
  const SectionComponent = sectionComponents[section.type];
  
  // If we don't have a component for this section type, don't render anything
  if (!SectionComponent) {
    console.warn(`No component found for section type: ${section.type}`);
    return null;
  }
  
  // Render the section component with its data
  return (
    <SectionComponent 
      key={section.id || section.key || section.type} 
      data={section.data || {}} 
      regionSlug={regionSlug}
    />
  );
}