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
      <InteractiveCoverageMap />
      <EmotionalStorySplit />
      <AgencyComparisonPreview />
      <AuthorityTrustBlock />
      <FinalEmotionalCTA />
      <Footer />
    </main>
  );
}