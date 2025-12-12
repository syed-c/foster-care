'use client';

// CountryPageClient.tsx
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Map, List, Grid3X3 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { fetchLocationContent } from '@/lib/cmsFetcher';
import RegionSectionRenderer from '@/components/sections/RegionSectionRenderer';
import CountryView from '@/components/CountryPage/CountryView.jsx';

interface CountryData {
  id: string;
  slug: string;
  title: string;
  description: string;
  regions: any[];
  counties: any[];
  blocks: any[];
  regionContent: Record<string, any>;
}

interface CountryPageClientProps {
  countryData: CountryData;
}

export default function CountryPageClient({
  countryData
}: CountryPageClientProps) {
  const {
    id,
    slug,
    title,
    description,
    regions,
    counties,
    blocks,
    regionContent
  } = countryData;
  
  const [currentView, setCurrentView] = useState<'map' | 'list' | 'grid'>('map');
  const [selectedRegion, setSelectedRegion] = useState<any>(null);
  const [selectedRegionContent, setSelectedRegionContent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const hash = typeof window !== 'undefined' ? window.location.hash.substring(1) : '';

  // Handle view changes from URL hash
  useEffect(() => {
    const viewParam = searchParams.get('view');
    if (viewParam && ['map', 'list', 'grid'].includes(viewParam)) {
      setCurrentView(viewParam as 'map' | 'list' | 'grid');
    }
    
    // Handle hash navigation for regions
    if (hash) {
      const regionSlug = hash;
      const region = regions.find(r => r.slug === regionSlug);
      if (region) {
        setSelectedRegion(region);
        loadRegionContent(region);
      }
    }
  }, [searchParams, hash, regions]);

  const loadRegionContent = async (region: any) => {
    setLoading(true);
    try {
      // Try to fetch content from CMS first
      const cmsContent = await fetchLocationContent(`/foster-agency/${slug}/${region.slug}`);
      
      if (cmsContent && cmsContent.sections) {
        setSelectedRegionContent(cmsContent);
      } else if (regionContent[region.slug]) {
        // Fallback to existing content system
        setSelectedRegionContent(regionContent[region.slug]);
      } else {
        // Minimal fallback content
        setSelectedRegionContent({
          title: region.title || region.name,
          sections: []
        });
      }
    } catch (error) {
      console.error('Error loading region content:', error);
      // Fallback to existing content system
      setSelectedRegionContent(regionContent[region.slug] || {
        title: region.title || region.name,
        sections: []
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegionSelect = (region: any) => {
    setSelectedRegion(region);
    loadRegionContent(region);
    
    // Update URL hash
    if (typeof window !== 'undefined') {
      window.location.hash = region.slug;
    }
  };

  const handleBackToCountry = () => {
    setSelectedRegion(null);
    setSelectedRegionContent(null);
    
    // Clear URL hash
    if (typeof window !== 'undefined') {
      history.pushState(null, '', window.location.pathname);
    }
  };

  // Show region detail view when a region is selected
  if (selectedRegion) {
    return (
      <div className="min-h-screen bg-background">
        {/* Back button */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
          <div className="container mx-auto px-4 py-4">
            <button 
              onClick={handleBackToCountry}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 gap-2"
            >
              ← Back to {title}
            </button>
          </div>
        </div>

        {/* Region content */}
        <div className="container mx-auto px-4 py-8">
          {loading ? (
            <div className="space-y-8">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          ) : selectedRegionContent?.sections && selectedRegionContent.sections.length > 0 ? (
            // Render dynamic sections using RegionSectionRenderer
            <div>
              {selectedRegionContent.sections.map((section: any) => (
                <RegionSectionRenderer 
                  key={section.id || section.key || section.type} 
                  section={section} 
                  regionSlug={selectedRegion.slug}
                />
              ))}
            </div>
          ) : (
            // Fallback to original static rendering if no dynamic sections
            <div className="text-center py-12">
              <h1 className="text-3xl font-bold mb-4">{selectedRegion.title || selectedRegion.name}</h1>
              <p className="text-muted-foreground">Content coming soon for this region.</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show country view when no region is selected
  return (
    <div className="min-h-screen bg-background">
      {/* Header with view controls */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-muted-foreground">Explore fostering opportunities</p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 ${
                  currentView === 'map' 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                }`}
                onClick={() => setCurrentView('map')}
              >
                <Map className="h-4 w-4 mr-2" />
                Map
              </button>
              <button
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 ${
                  currentView === 'list' 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                }`}
                onClick={() => setCurrentView('list')}
              >
                <List className="h-4 w-4 mr-2" />
                List
              </button>
              <button
                className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 px-3 ${
                  currentView === 'grid' 
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                    : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                }`}
                onClick={() => setCurrentView('grid')}
              >
                <Grid3X3 className="h-4 w-4 mr-2" />
                Grid
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* View content */}
      <div className="container mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <CountryView 
              countryData={{
                ...countryData
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}