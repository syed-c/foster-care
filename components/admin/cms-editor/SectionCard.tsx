'use client';

import { useState } from 'react';

interface SectionCardProps {
  type: string;
  data: any;
  onChange: (data: any) => void;
}

export function SectionCard({ type, data, onChange }: SectionCardProps) {
  const updateField = (field: string, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const updateNestedField = (field: string, index: number, subField: string, value: any) => {
    const items = [...(data[field] || [])];
    items[index] = { ...items[index], [subField]: value };
    onChange({ ...data, [field]: items });
  };

  const addItem = (field: string) => {
    const items = [...(data[field] || []), {}];
    onChange({ ...data, [field]: items });
  };

  const removeItem = (field: string, index: number) => {
    const items = [...(data[field] || [])];
    items.splice(index, 1);
    onChange({ ...data, [field]: items });
  };

  switch (type) {
    case 'hero':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label>Heading</label>
            <input
              type="text"
              value={data.heading || ''}
              onChange={(e) => updateField('heading', e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Subheading</label>
            <input
              type="text"
              value={data.subheading || ''}
              onChange={(e) => updateField('subheading', e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Body</label>
            <textarea
              value={data.body || ''}
              onChange={(e) => updateField('body', e.target.value)}
              rows={4}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Image URL</label>
            <input
              type="text"
              value={data.image || ''}
              onChange={(e) => updateField('image', e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label>CTA Text</label>
              <input
                type="text"
                value={data.ctaText || ''}
                onChange={(e) => updateField('ctaText', e.target.value)}
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
              />
            </div>
            <div>
              <label>CTA Link</label>
              <input
                type="text"
                value={data.ctaLink || ''}
                onChange={(e) => updateField('ctaLink', e.target.value)}
                style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
              />
            </div>
          </div>
        </div>
      );

    case 'overview':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label>Body</label>
            <textarea
              value={data.body || ''}
              onChange={(e) => updateField('body', e.target.value)}
              rows={6}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
        </div>
      );

    case 'reasons':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label>Heading</label>
            <input
              type="text"
              value={data.heading || ''}
              onChange={(e) => updateField('heading', e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Subheading</label>
            <input
              type="text"
              value={data.subheading || ''}
              onChange={(e) => updateField('subheading', e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Reasons</label>
            <div style={{ marginTop: '0.5rem' }}>
              {(data.items || []).map((item: any, index: number) => (
                <div key={index} style={{ border: '1px solid #ddd', borderRadius: '0.5rem', padding: '1rem', marginTop: '0.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label>Title</label>
                      <input
                        type="text"
                        value={item.title || ''}
                        onChange={(e) => updateNestedField('items', index, 'title', e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                      />
                    </div>
                    <div>
                      <label>Description</label>
                      <input
                        type="text"
                        value={item.description || ''}
                        onChange={(e) => updateNestedField('items', index, 'description', e.target.value)}
                        style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                      />
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => removeItem('items', index)}
                      style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '0.25rem', padding: '0.25rem 0.5rem', cursor: 'pointer' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addItem('items')}
                style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem', backgroundColor: '#f3f4f6', border: '1px dashed #d1d5db', borderRadius: '0.25rem', cursor: 'pointer' }}
              >
                + Add Reason
              </button>
            </div>
          </div>
        </div>
      );

    case 'faq':
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label>Heading</label>
            <input
              type="text"
              value={data.heading || ''}
              onChange={(e) => updateField('heading', e.target.value)}
              style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
            />
          </div>
          <div>
            <label>Questions</label>
            <div style={{ marginTop: '0.5rem' }}>
              {(data.items || []).map((item: any, index: number) => (
                <div key={index} style={{ border: '1px solid #ddd', borderRadius: '0.5rem', padding: '1rem', marginTop: '0.5rem' }}>
                  <div>
                    <label>Question</label>
                    <input
                      type="text"
                      value={item.question || ''}
                      onChange={(e) => updateNestedField('items', index, 'question', e.target.value)}
                      style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                    />
                  </div>
                  <div style={{ marginTop: '0.5rem' }}>
                    <label>Answer</label>
                    <textarea
                      value={item.answer || ''}
                      onChange={(e) => updateNestedField('items', index, 'answer', e.target.value)}
                      rows={3}
                      style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => removeItem('items', index)}
                      style={{ backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '0.25rem', padding: '0.25rem 0.5rem', cursor: 'pointer' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addItem('items')}
                style={{ width: '100%', marginTop: '0.5rem', padding: '0.5rem', backgroundColor: '#f3f4f6', border: '1px dashed #d1d5db', borderRadius: '0.25rem', cursor: 'pointer' }}
              >
                + Add Question
              </button>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div style={{ color: '#6b7280' }}>
          No editor configured for section type: {type}
        </div>
      );
  }
}