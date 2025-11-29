'use client';

import { useState, useEffect } from 'react';
import { SectionList } from '@/components/admin/cms-editor/SectionList';
import { supabaseAdmin } from '@/lib/supabase-server';

interface Section {
  id: string;
  type: string;
  data: any;
}

export default function CMSEditorPage() {
  const [slug, setSlug] = useState('/foster-agency/england');
  const [sections, setSections] = useState<Section[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load content when slug changes
  useEffect(() => {
    const loadContent = async () => {
      if (!slug) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabaseAdmin
          .from('location_content')
          .select('sections')
          .eq('canonical_slug', slug)
          .single();

        if (error) {
          console.error('Error loading content:', error);
          setSections([]);
          return;
        }

        setSections(data?.sections || []);
      } catch (error) {
        console.error('Error loading content:', error);
        setSections([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [slug]);

  const handleSave = async () => {
    if (!slug) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabaseAdmin
        .from('location_content')
        .upsert({
          canonical_slug: slug,
          sections: sections,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'canonical_slug'
        });

      if (error) {
        console.error('Error saving content:', error);
        alert('Failed to save content');
        return;
      }

      alert('Content saved successfully!');
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save content');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
        CMS Editor
      </h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <label>Page Slug</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', borderRadius: '0.25rem', border: '1px solid #d1d5db' }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button
            onClick={handleSave}
            disabled={isSaving}
            style={{ 
              padding: '0.5rem 1rem', 
              backgroundColor: isSaving ? '#9ca3af' : '#10b981', 
              color: 'white', 
              border: 'none', 
              borderRadius: '0.25rem', 
              cursor: isSaving ? 'not-allowed' : 'pointer' 
            }}
          >
            {isSaving ? 'Saving...' : 'Save Content'}
          </button>
        </div>
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
              Sections
            </h2>
            <SectionList 
              sections={sections} 
              onChange={setSections} 
            />
          </div>
          
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1rem' }}>
              Preview
            </h2>
            <div style={{ border: '1px solid #d1d5db', borderRadius: '0.5rem', padding: '1rem', minHeight: '400px' }}>
              <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                {JSON.stringify(sections, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}