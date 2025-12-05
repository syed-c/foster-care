'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

export default function SectionEditor({ section, onDataChange }) {
  // State for section data
  const [sectionData, setSectionData] = useState(section.data || {});

  // Update parent when data changes
  useEffect(() => {
    if (onDataChange) {
      onDataChange(section.id, sectionData);
    }
  }, [sectionData, onDataChange, section.id]);

  // Initialize with section data
  useEffect(() => {
    setSectionData(section.data || {});
  }, [section.data]);

  // Handle simple field changes
  const handleFieldChange = (field, value) => {
    setSectionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle nested field changes
  const handleNestedFieldChange = (parentField, field, value) => {
    setSectionData(prev => ({
      ...prev,
      [parentField]: {
        ...prev[parentField],
        [field]: value
      }
    }));
  };

  // Handle array item changes
  const handleArrayItemChange = (arrayName, index, field, value) => {
    setSectionData(prev => {
      const newArray = [...(prev[arrayName] || [])];
      newArray[index] = {
        ...newArray[index],
        [field]: value
      };
      return {
        ...prev,
        [arrayName]: newArray
      };
    });
  };

  // Add new item to array
  const addArrayItem = (arrayName, defaultItem = {}) => {
    setSectionData(prev => {
      const newArray = [...(prev[arrayName] || []), defaultItem];
      return {
        ...prev,
        [arrayName]: newArray
      };
    });
  };

  // Remove item from array
  const removeArrayItem = (arrayName, index) => {
    setSectionData(prev => {
      const newArray = [...(prev[arrayName] || [])];
      newArray.splice(index, 1);
      return {
        ...prev,
        [arrayName]: newArray
      };
    });
  };

  const renderSectionEditor = () => {
    switch (section.type) {
      case 'hero':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hero-title">Title</Label>
              <Input 
                id="hero-title" 
                placeholder="Enter hero title" 
                value={sectionData.title || ''}
                onChange={(e) => handleFieldChange('title', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-subtitle">Subtitle</Label>
              <Input 
                id="hero-subtitle" 
                placeholder="Enter hero subtitle" 
                value={sectionData.subtitle || ''}
                onChange={(e) => handleFieldChange('subtitle', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hero-cta-text">CTA Text</Label>
                <Input 
                  id="hero-cta-text" 
                  placeholder="Enter CTA text" 
                  value={sectionData.cta_text || ''}
                  onChange={(e) => handleFieldChange('cta_text', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-cta-link">CTA Link</Label>
                <Input 
                  id="hero-cta-link" 
                  placeholder="Enter CTA link" 
                  value={sectionData.cta_link || ''}
                  onChange={(e) => handleFieldChange('cta_link', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-search-placeholder">Search Placeholder</Label>
              <Input 
                id="hero-search-placeholder" 
                placeholder="Enter search placeholder" 
                value={sectionData.search_placeholder || ''}
                onChange={(e) => handleFieldChange('search_placeholder', e.target.value)}
              />
            </div>
          </div>
        );

      case 'overview':
      case 'system':
        return (
          <div className="space-y-2">
            <Label htmlFor={`${section.type}-content`}>Content</Label>
            <Textarea 
              id={`${section.type}-content`} 
              placeholder="Enter section content" 
              rows={6}
              value={sectionData.content || ''}
              onChange={(e) => handleFieldChange('content', e.target.value)}
            />
          </div>
        );

      case 'reasons':
      case 'featuredAreas':
        const items = sectionData.items || [];
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Items</Label>
              {items.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <Input 
                    placeholder="Item title" 
                    value={item.title || ''}
                    onChange={(e) => handleArrayItemChange('items', index, 'title', e.target.value)}
                  />
                  <Input 
                    placeholder="Item description" 
                    value={item.description || ''}
                    onChange={(e) => handleArrayItemChange('items', index, 'description', e.target.value)}
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => removeArrayItem('items', index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              onClick={() => addArrayItem('items', { title: '', description: '' })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </div>
        );

      case 'faqs':
        const faqs = sectionData.items || [];
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>FAQs</Label>
              {faqs.map((faq, index) => (
                <div key={index} className="space-y-2 p-3 border rounded">
                  <Input 
                    placeholder="Question" 
                    value={faq.question || ''}
                    onChange={(e) => handleArrayItemChange('items', index, 'question', e.target.value)}
                  />
                  <Textarea 
                    placeholder="Answer" 
                    rows={3}
                    value={faq.answer || ''}
                    onChange={(e) => handleArrayItemChange('items', index, 'answer', e.target.value)}
                  />
                  <div className="flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeArrayItem('items', index)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              onClick={() => addArrayItem('items', { question: '', answer: '' })}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add FAQ
            </Button>
          </div>
        );

      case 'finalcta':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="finalcta-title">Title</Label>
              <Input 
                id="finalcta-title" 
                placeholder="Enter CTA title" 
                value={sectionData.title || ''}
                onChange={(e) => handleFieldChange('title', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="finalcta-subtitle">Subtitle</Label>
              <Input 
                id="finalcta-subtitle" 
                placeholder="Enter CTA subtitle" 
                value={sectionData.subtitle || ''}
                onChange={(e) => handleFieldChange('subtitle', e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="finalcta-cta-text">CTA Text</Label>
                <Input 
                  id="finalcta-cta-text" 
                  placeholder="Enter CTA text" 
                  value={sectionData.cta_text || ''}
                  onChange={(e) => handleFieldChange('cta_text', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="finalcta-cta-link">CTA Link</Label>
                <Input 
                  id="finalcta-cta-link" 
                  placeholder="Enter CTA link" 
                  value={sectionData.cta_link || ''}
                  onChange={(e) => handleFieldChange('cta_link', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-2">
            <Label htmlFor="default-content">Content</Label>
            <Textarea 
              id="default-content" 
              placeholder="Enter content" 
              rows={4}
              value={sectionData.content || ''}
              onChange={(e) => handleFieldChange('content', e.target.value)}
            />
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {renderSectionEditor()}
    </div>
  );
}