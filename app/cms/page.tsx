'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CMSPage() {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countries, setCountries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // In a real implementation, you would fetch available countries from your database
  useEffect(() => {
    // Mock data for demonstration
    const mockCountries = [
      { id: '1', slug: 'england', title: 'England' },
      { id: '2', slug: 'scotland', title: 'Scotland' },
      { id: '3', slug: 'wales', title: 'Wales' },
      { id: '4', slug: 'northern-ireland', title: 'Northern Ireland' }
    ];
    
    setCountries(mockCountries);
    setLoading(false);
  }, []);

  const handleCountrySelect = () => {
    if (selectedCountry) {
      router.push(`/cms/edit/${selectedCountry}`);
    }
  };

  return (
    <div className="min-h-screen bg-background-offwhite p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-text-charcoal mb-8">CMS Dashboard</h1>
        
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-semibold text-text-charcoal mb-4">Select Country to Edit</h2>
          
          {loading ? (
            <p>Loading countries...</p>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                >
                  <option value="">Choose a country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.slug}>
                      {country.title}
                    </option>
                  ))}
                </select>
                
                <button
                  onClick={handleCountrySelect}
                  disabled={!selectedCountry}
                  className="bg-primary-green text-white px-6 py-3 rounded-lg hover:bg-primary-green/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Edit Content
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-text-charcoal mb-3">Manage Countries</h3>
            <p className="text-gray-600 mb-4">Add or edit country information and content blocks.</p>
            <button className="text-primary-green hover:text-primary-green/80 font-medium">
              Manage Countries →
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-text-charcoal mb-3">Manage Regions</h3>
            <p className="text-gray-600 mb-4">Edit regional content and organize counties.</p>
            <button className="text-primary-green hover:text-primary-green/80 font-medium">
              Manage Regions →
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-text-charcoal mb-3">Manage Counties</h3>
            <p className="text-gray-600 mb-4">Edit county-specific information and FAQs.</p>
            <button className="text-primary-green hover:text-primary-green/80 font-medium">
              Manage Counties →
            </button>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-text-charcoal mb-3">User Management</h3>
            <p className="text-gray-600 mb-4">Manage CMS users and permissions.</p>
            <button className="text-primary-green hover:text-primary-green/80 font-medium">
              Manage Users →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}