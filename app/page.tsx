'use client';

import { useState } from 'react';
import { PremiumHero } from '@/components/sections/PremiumHero';
import { InteractiveCoverageMap } from '@/components/sections/InteractiveCoverageMap';
import { EmotionalStorySplit } from '@/components/sections/EmotionalStorySplit';
import { AgencyComparisonPreview } from '@/components/sections/AgencyComparisonPreview';
import { AuthorityTrustBlock } from '@/components/sections/AuthorityTrustBlock';
import { FinalEmotionalCTA } from '@/components/sections/FinalEmotionalCTA';
import { ThreeJsBackground } from '@/components/ThreeJsBackground';
import { Footer } from '@/components/sections/Footer';
import { TrustedDirectorySection } from '@/components/sections/TrustedDirectorySection';
import { RegionsCoverageSection } from '@/components/sections/RegionsCoverageSection';
import { PlatformProcessSection } from '@/components/sections/PlatformProcessSection';
import { SupportSection } from '@/components/sections/SupportSection';
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUsSection';
import { AgencyTypesSection } from '@/components/sections/AgencyTypesSection';
import { ResourcesSection } from '@/components/sections/ResourcesSection';
import { ForAgenciesSection } from '@/components/sections/ForAgenciesSection';
import { SafeguardingSection } from '@/components/sections/SafeguardingSection';
import { NoteForCarersSection } from '@/components/sections/NoteForCarersSection';
import { HomePageFaqSection } from '@/components/sections/HomePageFaqSection';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // In a real app, this would trigger a search or navigation
    console.log('Searching for:', query);
  };

  return (
    <main className="relative min-h-screen bg-brand-white">
      <ThreeJsBackground />
      <PremiumHero onSearch={handleSearch} />
      <TrustedDirectorySection />
      <RegionsCoverageSection />
      <PlatformProcessSection />
      <SupportSection />
      <WhyChooseUsSection />
      <AgencyTypesSection />
      <ResourcesSection />
      <ForAgenciesSection />
      <SafeguardingSection />
      <NoteForCarersSection />
      <HomePageFaqSection />
      <InteractiveCoverageMap />
      <EmotionalStorySplit />
      <AgencyComparisonPreview />
      <AuthorityTrustBlock />
      <FinalEmotionalCTA />
      <Footer />
    </main>
  );
}