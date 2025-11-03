'use client';

import MapSection from '@/components/MapSection';

export default function TestMapSectionPage() {
  const mockCountries = [
    { slug: 'england', name: 'England', lat: 52.3555, lng: -1.1743 },
    { slug: 'scotland', name: 'Scotland', lat: 56.4907, lng: -4.2026 },
    { slug: 'wales', name: 'Wales', lat: 52.1307, lng: -3.7837 },
    { slug: 'northern-ireland', name: 'Northern Ireland', lat: 54.7855, lng: -6.4923 }
  ];

  return (
    <div className="min-h-screen bg-background-offwhite p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-text-charcoal mb-4 md:mb-6">Map Section Test</h1>
        
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">Interactive Map with Agencies Section</h2>
          <p className="text-gray-600 mb-4 text-sm md:text-base">
            Click on any region in the map or list to see agencies in that area below.
          </p>
          
          <div className="border rounded-lg overflow-hidden">
            <MapSection countries={mockCountries} />
          </div>
        </div>
        
        <div className="mt-6 md:mt-8 bg-white rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold mb-3 md:mb-4">How It Works</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm md:text-base">
            <li>Click on any region in the map to see agencies in that area</li>
            <li>Click on region buttons in the sidebar to see agencies</li>
            <li>Agencies section appears below the map when a region is selected</li>
            <li>Clear selection to hide the agencies section</li>
          </ul>
        </div>
      </div>
    </div>
  );
}