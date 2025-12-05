# Component Architecture

## Overview
This document outlines the component architecture for the Foster Care Directory UK platform, focusing on the UI system requirements including soft glassmorphism, pastel gradients, rounded cards, emotional whitespace, and micro-animations.

## UI System Requirements Implementation

### 1. Design Tokens
```scss
// Color Palette
:root {
  // Primary Colors
  --primary-mint: #7CE2A7;
  --primary-sky: #7DC3EB;
  --primary-ivory: #FAF9F6;
  
  // Pastel Gradients
  --gradient-mint-sky: linear-gradient(135deg, #7CE2A7, #7DC3EB);
  --gradient-sky-ivory: linear-gradient(135deg, #7DC3EB, #FAF9F6);
  --gradient-ivory-mint: linear-gradient(135deg, #FAF9F6, #7CE2A7);
  
  // Soft Glassmorphism
  --glass-bg: rgba(255, 255, 255, 0.7);
  --glass-border: rgba(255, 255, 255, 0.1);
  --glass-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
  
  // Typography
  --font-heading: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  // Spacing
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-xxl: 3rem;
  
  // Border Radius
  --radius-sm: 0.5rem;
  --radius-md: 1rem;
  --radius-lg: 1.5rem;
  --radius-xl: 2rem;
  --radius-xxl: 2.5rem;
}
```

### 2. Base Components

#### Layout Components
```
components/
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Navigation.tsx
│   ├── Breadcrumbs.tsx
│   └── MainLayout.tsx
```

#### UI Components
```
components/
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   ├── Textarea.tsx
│   ├── Select.tsx
│   ├── Badge.tsx
│   ├── Accordion.tsx
│   ├── Tabs.tsx
│   ├── Modal.tsx
│   ├── Skeleton.tsx
│   └── Tooltip.tsx
```

### 3. Section Components

#### Hero Sections
```
components/
├── sections/
│   ├── HeroSection.tsx
│   ├── LocationHeroSection.tsx
│   ├── AgencyHeroSection.tsx
│   └── BlogHeroSection.tsx
```

#### Content Sections
```
components/
├── sections/
│   ├── AgencyFinder.tsx
│   ├── BenefitsSection.tsx
│   ├── FAQSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── CTASection.tsx
│   ├── TrustBarSection.tsx
│   ├── PopularCitiesSection.tsx
│   ├── TopAgenciesSection.tsx
│   └── RelatedContentSection.tsx
```

### 4. Card Components

#### Entity Cards
```
components/
├── cards/
│   ├── AgencyCard.tsx
│   ├── LocationCard.tsx
│   ├── BlogCard.tsx
│   ├── ReviewCard.tsx
│   └── TeamMemberCard.tsx
```

### 5. Form Components

#### Interactive Forms
```
components/
├── forms/
│   ├── ContactForm.tsx
│   ├── SearchForm.tsx
│   ├── AgencyRegistrationForm.tsx
│   ├── ReviewForm.tsx
│   └── LeadCaptureForm.tsx
```

### 6. SEO Components

#### Metadata Generators
```
components/
├── seo/
│   ├── JsonLdSchema.tsx
│   ├── MetaTags.tsx
│   ├── OpenGraphTags.tsx
│   └── StructuredData.tsx
```

### 7. Animation Components

#### Micro-interactions
```
components/
├── animations/
│   ├── FadeIn.tsx
│   ├── SlideIn.tsx
│   ├── Float.tsx
│   ├── Pulse.tsx
│   └── HoverScale.tsx
```

## Component Hierarchy

### Homepage Component Structure
```
Homepage.tsx
├── Header.tsx
│   ├── Navigation.tsx
│   └── UserMenu.tsx
├── HeroSection.tsx
├── AgencyFinder.tsx
├── BenefitsSection.tsx
├── PopularCitiesSection.tsx
│   └── LocationCard.tsx (multiple)
├── TestimonialsSection.tsx
│   └── ReviewCard.tsx (multiple)
├── BlogPreviewSection.tsx
│   └── BlogCard.tsx (multiple)
├── CTASection.tsx
├── Footer.tsx
│   ├── SocialLinks.tsx
│   └── LegalLinks.tsx
└── TrustBarSection.tsx
```

### Agency Profile Component Structure
```
AgencyProfilePage.tsx
├── Header.tsx
├── Breadcrumbs.tsx
├── AgencyHeroSection.tsx
├── AgencyDetailsSection.tsx
├── ServicesSection.tsx
├── GallerySection.tsx
├── ReviewsSection.tsx
│   ├── ReviewCard.tsx (multiple)
│   └── ReviewForm.tsx
├── ContactSection.tsx
│   └── ContactForm.tsx
├── TeamSection.tsx
│   └── TeamMemberCard.tsx (multiple)
├── RelatedAgenciesSection.tsx
│   └── AgencyCard.tsx (multiple)
└── Footer.tsx
```

### Location Page Component Structure
```
LocationPage.tsx
├── Header.tsx
├── Breadcrumbs.tsx
├── LocationHeroSection.tsx
├── LocationStatsSection.tsx
├── TopAgenciesSection.tsx
│   └── AgencyCard.tsx (multiple)
├── PopularAreasSection.tsx
│   └── LocationCard.tsx (multiple)
├── FAQSection.tsx
├── TestimonialsSection.tsx
│   └── ReviewCard.tsx (multiple)
├── CTASection.tsx
└── Footer.tsx
```

## Reusable Component Patterns

### 1. Glass Card Pattern
```tsx
// GlassCard.tsx
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div className={`
      bg-glass-bg
      border border-glass-border
      backdrop-blur-md
      rounded-radius-lg
      shadow-glass-shadow
      transition-all duration-300
      hover:shadow-lg
      ${className}
    `}>
      {children}
    </div>
  );
};
```

### 2. Gradient Button Pattern
```tsx
// GradientButton.tsx
import React from 'react';

interface GradientButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const GradientButton: React.FC<GradientButtonProps> = ({ 
  children, 
  onClick,
  className = '' 
}) => {
  return (
    <button
      onClick={onClick}
      className={`
        bg-gradient-mint-sky
        text-text-charcoal
        font-body font-medium
        py-spacing-md
        px-spacing-lg
        rounded-radius-lg
        transition-all duration-300
        hover:opacity-90
        hover:scale-105
        active:scale-95
        ${className}
      `}
    >
      {children}
    </button>
  );
};
```

### 3. Animated Section Pattern
```tsx
// AnimatedSection.tsx
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className = '',
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
```

## Conversion Feature Components

### 1. Sticky Enquiry CTA
```tsx
// StickyEnquiryCTA.tsx
import React, { useState, useEffect } from 'react';

export const StickyEnquiryCTA: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    isVisible && (
      <div className="fixed bottom-6 right-6 z-50">
        <button className="
          bg-gradient-mint-sky
          text-text-charcoal
          font-body font-bold
          py-3 px-6
          rounded-full
          shadow-lg
          hover:scale-105
          transition-transform
          flex items-center
        ">
          Enquire Now
        </button>
      </div>
    )
  );
};
```

### 2. Exit Intent Modal
```tsx
// ExitIntentModal.tsx
import React, { useState, useEffect } from 'react';

export const ExitIntentModal: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setShowModal(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-radius-xl p-6 max-w-md w-full">
        <h3 className="font-heading text-xl font-bold mb-2">Don't Miss Out!</h3>
        <p className="font-body text-gray-600 mb-4">
          Get a free consultation with one of our fostering experts.
        </p>
        <div className="flex gap-2">
          <button className="flex-1 bg-gradient-mint-sky py-2 rounded-radius-md">
            Get Free Consultation
          </button>
          <button 
            onClick={() => setShowModal(false)}
            className="flex-1 border border-gray-300 py-2 rounded-radius-md"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  );
};
```

## Accessibility Compliance

All components will follow WCAG 2.1 AA standards:
1. Proper semantic HTML structure
2. ARIA labels for interactive elements
3. Keyboard navigation support
4. Sufficient color contrast ratios
5. Focus indicators for interactive elements
6. Screen reader compatibility

## Performance Optimization

1. Code splitting at component level
2. Lazy loading for non-critical components
3. Image optimization with next/image
4. Skeleton loaders for data-fetching components
5. Memoization for expensive calculations
6. Bundle size monitoring