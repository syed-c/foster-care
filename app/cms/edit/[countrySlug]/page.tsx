'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Country {
  id: string;
  slug: string;
  title: string;
  metaTitle?: string;
  metaDescription?: string;
  introHtml?: string;
  heroImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface CountryPageBlock {
  id: string;
  countryId: string;
  type: string;
  contentJson: any;
  order?: number;
  createdAt: Date;
  updatedAt: Date;
}

export default function EditCountryPage({ params }: { params: Promise<{ countrySlug: string }> }) {
  const router = useRouter();
  const [resolvedParams, setResolvedParams] = useState<{ countrySlug: string } | null>(null);
  const [country, setCountry] = useState<Country | null>(null);
  const [blocks, setBlocks] = useState<CountryPageBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setResolvedParams(resolved);
      
      // In a real implementation, you would fetch the country data from your API
      // For now, we'll use mock data
      
      // Mock country data
      const mockCountry: Country = {
        id: '1',
        slug: resolved.countrySlug,
        title: resolved.countrySlug.charAt(0).toUpperCase() + resolved.countrySlug.slice(1),
        metaTitle: `Foster Care in ${resolved.countrySlug.charAt(0).toUpperCase() + resolved.countrySlug.slice(1)} | UK Foster Care Directory`,
        metaDescription: `Find accredited foster agencies in ${resolved.countrySlug.charAt(0).toUpperCase() + resolved.countrySlug.slice(1)}.`,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      
      // Mock blocks data
      const mockBlocks: CountryPageBlock[] = [
        {
          id: '1',
          countryId: '1',
          type: 'hero',
          contentJson: {
            title: `Foster Care in ${resolved.countrySlug.charAt(0).toUpperCase() + resolved.countrySlug.slice(1)}`,
            subtitle: 'Make a difference in a child\'s life by becoming a foster carer',
            ctaText: 'Start Your Journey Today',
            ctaLink: '/contact'
          },
          order: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '2',
          countryId: '1',
          type: 'intro',
          contentJson: {
            html: `<p>${resolved.countrySlug.charAt(0).toUpperCase() + resolved.countrySlug.slice(1)} has a robust fostering system. Our directory connects you with accredited agencies across all regions.</p>`
          },
          order: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ];
      
      setCountry(mockCountry);
      setBlocks(mockBlocks);
      setLoading(false);
    };
    
    resolveParams();
  }, [params]);

  const handleSave = async () => {
    if (!country) return;
    
    setSaving(true);
    
    try {
      // In a real implementation, you would save the data to your API
      // For now, we'll just simulate a save operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Changes saved successfully!');
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Error saving changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const updateBlockContent = (blockId: string, content: any) => {
    setBlocks(prev => prev.map(block => 
      block.id === blockId ? { ...block, contentJson: content } : block
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background-offwhite flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!country || !resolvedParams) {
    return (
      <div className="min-h-screen bg-background-offwhite flex items-center justify-center">
        <p>Country not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-offwhite p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <button 
              onClick={() => router.back()}
              className="text-primary-green hover:text-primary-green/80 mb-2 flex items-center"
            >
              ← Back to CMS
            </button>
            <h1 className="text-3xl font-bold text-text-charcoal">Edit {country.title}</h1>
          </div>
          
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-primary-green text-white px-6 py-3 rounded-lg hover:bg-primary-green/90 disabled:opacity-50 transition-colors flex items-center"
          >
            {saving ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </>
            ) : 'Save Changes'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {blocks.map((block) => (
              <div key={block.id} className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold text-text-charcoal mb-4 capitalize">
                  {block.type.replace(/([A-Z])/g, ' $1').trim()}
                </h2>
                
                {block.type === 'hero' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                      <input
                        type="text"
                        value={block.contentJson.title || ''}
                        onChange={(e) => updateBlockContent(block.id, { ...block.contentJson, title: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                      <textarea
                        value={block.contentJson.subtitle || ''}
                        onChange={(e) => updateBlockContent(block.id, { ...block.contentJson, subtitle: e.target.value })}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                        rows={3}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CTA Text</label>
                        <input
                          type="text"
                          value={block.contentJson.ctaText || ''}
                          onChange={(e) => updateBlockContent(block.id, { ...block.contentJson, ctaText: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
                        <input
                          type="text"
                          value={block.contentJson.ctaLink || ''}
                          onChange={(e) => updateBlockContent(block.id, { ...block.contentJson, ctaLink: e.target.value })}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                )}
                
                {block.type === 'intro' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Introduction Content</label>
                    <textarea
                      value={block.contentJson.html || ''}
                      onChange={(e) => updateBlockContent(block.id, { ...block.contentJson, html: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                      rows={6}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-text-charcoal mb-4">Page Settings</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Title</label>
                  <input
                    type="text"
                    value={country.metaTitle || ''}
                    onChange={(e) => setCountry(prev => prev ? { ...prev, metaTitle: e.target.value } : null)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description</label>
                  <textarea
                    value={country.metaDescription || ''}
                    onChange={(e) => setCountry(prev => prev ? { ...prev, metaDescription: e.target.value } : null)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-green focus:border-transparent"
                    rows={3}
                  />
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-text-charcoal mb-4">Preview</h2>
              <p className="text-gray-600 text-sm">
                Visit the live page to see your changes:
              </p>
              <a 
                href={`/foster-agency/${resolvedParams.countrySlug}`} 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-green hover:text-primary-green/80 font-medium text-sm flex items-center mt-2"
              >
                View {country.title} Page →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}