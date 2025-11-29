'use client';

import { useState } from 'react';
import { SectionCard } from '@/components/admin/cms-editor/SectionCard';

interface Section {
  id: string;
  type: string;
  data: any;
}

interface SectionListProps {
  sections: Section[];
  onChange: (sections: Section[]) => void;
}

const SECTION_TYPES = [
  { value: 'breadcrumb', label: 'Breadcrumb' },
  { value: 'hero', label: 'Hero' },
  { value: 'overview', label: 'Overview' },
  { value: 'systemInfo', label: 'System Info' },
  { value: 'reasons', label: 'Reasons to Foster' },
  { value: 'featuredAreas', label: 'Featured Areas' },
  { value: 'regionsGrid', label: 'Regions Grid' },
  { value: 'faq', label: 'FAQ' },
  { value: 'trustBar', label: 'Trust Bar' },
  { value: 'finalCta', label: 'Final CTA' }
];

export function SectionList({ sections, onChange }: SectionListProps) {
  const [newSectionType, setNewSectionType] = useState('');

  const handleAddSection = () => {
    if (!newSectionType) return;
    
    const newSection: Section = {
      id: `section_${Date.now()}`,
      type: newSectionType,
      data: {}
    };
    
    onChange([...sections, newSection]);
    setNewSectionType('');
  };

  const handleRemoveSection = (id: string) => {
    onChange(sections.filter(section => section.id !== id));
  };

  const handleSectionChange = (id: string, data: any) => {
    onChange(sections.map(section => 
      section.id === id ? { ...section, data } : section
    ));
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    const newSections = [...sections];
    if (direction === 'up' && index > 0) {
      [newSections[index - 1], newSections[index]] = [newSections[index], newSections[index - 1]];
    } else if (direction === 'down' && index < newSections.length - 1) {
      [newSections[index], newSections[index + 1]] = [newSections[index + 1], newSections[index]];
    }
    onChange(newSections);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <select 
          value={newSectionType} 
          onChange={(e) => setNewSectionType(e.target.value)}
          style={{ padding: '0.5rem', borderRadius: '0.25rem', border: '1px solid #d1d5db' }}
        >
          <option value="">Select section type</option>
          {SECTION_TYPES.map(type => (
            <option key={type.value} value={type.value}>
              {type.label}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddSection}
          disabled={!newSectionType}
          style={{ 
            padding: '0.5rem 1rem', 
            backgroundColor: newSectionType ? '#3b82f6' : '#9ca3af', 
            color: 'white', 
            border: 'none', 
            borderRadius: '0.25rem', 
            cursor: newSectionType ? 'pointer' : 'not-allowed' 
          }}
        >
          + Add Section
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {sections.map((section, index) => (
          <div key={section.id} style={{ border: '1px solid #d1d5db', borderRadius: '0.5rem', backgroundColor: 'white' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between', 
              padding: '0.75rem', 
              borderBottom: '1px solid #d1d5db' 
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>≡</span>
                <span style={{ fontWeight: '500' }}>
                  {SECTION_TYPES.find(t => t.value === section.type)?.label || section.type}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => moveSection(index, 'up')}
                  disabled={index === 0}
                  style={{ 
                    padding: '0.25rem 0.5rem', 
                    backgroundColor: index === 0 ? '#e5e7eb' : '#f3f4f6', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '0.25rem', 
                    cursor: index === 0 ? 'not-allowed' : 'pointer' 
                  }}
                >
                  ↑
                </button>
                <button
                  onClick={() => moveSection(index, 'down')}
                  disabled={index === sections.length - 1}
                  style={{ 
                    padding: '0.25rem 0.5rem', 
                    backgroundColor: index === sections.length - 1 ? '#e5e7eb' : '#f3f4f6', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '0.25rem', 
                    cursor: index === sections.length - 1 ? 'not-allowed' : 'pointer' 
                  }}
                >
                  ↓
                </button>
                <button
                  onClick={() => handleRemoveSection(section.id)}
                  style={{ 
                    padding: '0.25rem 0.5rem', 
                    backgroundColor: '#ef4444', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '0.25rem', 
                    cursor: 'pointer' 
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
            <div style={{ padding: '1rem' }}>
              <SectionCard 
                type={section.type}
                data={section.data}
                onChange={(data) => handleSectionChange(section.id, data)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}