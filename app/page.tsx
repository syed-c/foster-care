'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { EmotionalHero } from '@/components/sections/EmotionalHero';
import { MissionStatement } from '@/components/sections/MissionStatement';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { RegionsMap } from '@/components/sections/RegionsMap';
import { FeaturedAgenciesCarousel } from '@/components/sections/FeaturedAgenciesCarousel';
import { EmotionalSplitImage } from '@/components/sections/EmotionalSplitImage';
import { Testimonials } from '@/components/sections/Testimonials';
import { ResourcesGuides } from '@/components/sections/ResourcesGuides';
import { TrustBadges } from '@/components/sections/TrustBadges';
import { StrongCTA } from '@/components/sections/StrongCTA';
import { SoftFooter } from '@/components/sections/SoftFooter';
import { FosteringPathTimeline } from '@/components/sections/FosteringPathTimeline';
import { SpeakToAdvisor } from '@/components/sections/SpeakToAdvisor';
import { LiveLocationDiscovery } from '@/components/sections/LiveLocationDiscovery';
import { SocialProofMarquee } from '@/components/sections/SocialProofMarquee';
import { StickyCTA } from '@/components/sections/StickyCTA';
import { FAQMicroBlock } from '@/components/sections/FAQMicroBlock';
import { InternalLinksBlock } from '@/components/sections/InternalLinksBlock';
import { generateOrganizationSchema } from '@/lib/seo/schemaGenerators';

export default function HomePage() {
  // Generate SEO schema
  const organizationSchema = generateOrganizationSchema({
    name: 'Foster Care Directory UK',
    url: 'https://fostercare.co.uk',
    logo: 'https://fostercare.co.uk/images/logo.png',
    description: 'The UK\'s most trusted fostering directory. Find verified fostering agencies, read reviews, and connect with caring opportunities across the United Kingdom.',
    foundingDate: '2023',
    address: {
      streetAddress: '123 Care Street',
      addressLocality: 'London',
      addressRegion: 'Greater London',
      postalCode: 'SW1A 1AA',
      addressCountry: 'United Kingdom'
    },
    contactPoint: {
      telephone: '+44 800 123 4567',
      contactType: 'customer service'
    }
  });

  const handleSearch = (query: string) => {
    if (query.trim()) {
      window.location.href = `/fostering-agencies-uk?search=${encodeURIComponent(query)}`;
    }
  };

  return (
    <>
      {/* SEO Schema */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} 
      />

      <div className="min-h-screen bg-gradient-to-b from-background-soft to-white">
        <EmotionalHero onSearch={handleSearch} />
        <MissionStatement />
        <HowItWorks />
        <LiveLocationDiscovery />
        <FosteringPathTimeline />
        <RegionsMap />
        <FeaturedAgenciesCarousel />
        <EmotionalSplitImage />
        <Testimonials />
        <SocialProofMarquee />
        <ResourcesGuides />
        <TrustBadges />
        <SpeakToAdvisor />
        <FAQMicroBlock />
        <InternalLinksBlock />
        <StrongCTA />
        <SoftFooter />
        <StickyCTA />
      </div>
    </>
  );
}