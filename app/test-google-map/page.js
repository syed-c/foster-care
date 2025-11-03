'use client';

import MapSection from '@/components/MapSection';

export default function TestGoogleMapPage() {
  const mockCountries = [
    { slug: 'england', name: 'England', lat: 52.3555, lng: -1.1743 },
    { slug: 'scotland', name: 'Scotland', lat: 56.4907, lng: -4.2026 },
    { slug: 'wales', name: 'Wales', lat: 52.1307, lng: -3.7837 },
    { slug: 'northern-ireland', name: 'Northern Ireland', lat: 54.7855, lng: -6.4923 }
  ];

  return (
    <div className="min-h-screen bg-background-offwhite p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-text-charcoal mb-6">Interactive Google Maps Test</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Interactive Map Test</h2>
          
          <div className="mb-4">
            <h3 className="font-medium mb-2">Test Map:</h3>
            <div className="border rounded-lg overflow-hidden">
              <MapSection countries={mockCountries} />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Interactive map with clickable regions</li>
            <li>User location detection</li>
            <li>Nearby regions panel</li>
            <li>Responsive design</li>
          </ul>
        </div>
      </div>
    </div>
  );
}