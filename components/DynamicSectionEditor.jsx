'use client';

import { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown,
  Info
} from 'lucide-react';
import { locationSchemas } from '@/lib/locationSchemas';
import HeadingTypeSelector from '@/components/HeadingTypeSelector';
import CMSInput from '@/components/CMSInput';
import { updateNested } from '@/lib/updateNested';

export default function DynamicSectionEditor({ locationType, content, onChange }) {
  // Get the schema for this location type
  const schema = locationSchemas[locationType] || locationSchemas.city;
  
  const updateField = (sectionKey, fieldName, value) => {
    // Use the updateNested utility for proper nested updates
    const path = `${sectionKey}.${fieldName}`;
    const updatedContent = updateNested(content, path, value);
    onChange(updatedContent);
  };

  const updateNestedField = (sectionKey, fieldName, nestedField, value) => {
    // Use the updateNested utility for proper nested updates
    const path = `${sectionKey}.${fieldName}.${nestedField}`;
    const updatedContent = updateNested(content, path, value);
    onChange(updatedContent);
  };

  const updateArrayField = (sectionKey, fieldName, index, updates) => {
    // Use the updateNested utility for proper nested updates
    const path = `${sectionKey}.${fieldName}.${index}`;
    const updatedContent = updateNested(content, path, { ...content[sectionKey]?.[fieldName]?.[index], ...updates });
    onChange(updatedContent);
  };

  const updateArrayItemField = (sectionKey, fieldName, index, itemField, value) => {
    // Use the updateNested utility for proper nested updates
    const path = `${sectionKey}.${fieldName}.${index}.${itemField}`;
    const updatedContent = updateNested(content, path, value);
    onChange(updatedContent);
  };

  const addArrayItem = (sectionKey, fieldName, defaultItem) => {
    // Use the updateNested utility for proper nested updates
    const newArray = Array.isArray(content[sectionKey]?.[fieldName]) 
      ? [...content[sectionKey][fieldName]] 
      : [];
    newArray.push(defaultItem);
    const path = `${sectionKey}.${fieldName}`;
    const updatedContent = updateNested(content, path, newArray);
    onChange(updatedContent);
  };

  const removeArrayItem = (sectionKey, fieldName, index) => {
    // Use the updateNested utility for proper nested updates
    const newArray = Array.isArray(content[sectionKey]?.[fieldName]) 
      ? [...content[sectionKey][fieldName]] 
      : [];
    newArray.splice(index, 1);
    const path = `${sectionKey}.${fieldName}`;
    const updatedContent = updateNested(content, path, newArray);
    onChange(updatedContent);
  };

  const moveArrayItem = (sectionKey, fieldName, fromIndex, toIndex) => {
    // Use the updateNested utility for proper nested updates
    const newArray = Array.isArray(content[sectionKey]?.[fieldName]) 
      ? [...content[sectionKey][fieldName]] 
      : [];
    const [movedItem] = newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, movedItem);
    const path = `${sectionKey}.${fieldName}`;
    const updatedContent = updateNested(content, path, newArray);
    onChange(updatedContent);
  };

  const renderField = (sectionKey, field, value) => {
    if (field.type === 'textarea') {
      return (
        <div className="space-y-2">
          <Label htmlFor={`${sectionKey}-${field.name}`}>{field.label}</Label>
          {field.placeholder && (
            <div className="text-xs text-muted-foreground">{field.placeholder}</div>
          )}
          <CMSInput
            id={`${sectionKey}-${field.name}`}
            value={value || ''}
            onChange={(newValue) => updateField(sectionKey, field.name, newValue)}
            placeholder={field.placeholder}
            type="textarea"
            rows={field.rows || 4}
          />
        </div>
      );
    } else if (field.type === 'object') {
      return (
        <div className="space-y-3">
          <Label>{field.label}</Label>
          {field.fields.map((nestedField) => (
            <div key={nestedField.name} className="space-y-2">
              <Label htmlFor={`${sectionKey}-${field.name}-${nestedField.name}`}>{nestedField.label}</Label>
              {nestedField.placeholder && (
                <div className="text-xs text-muted-foreground">{nestedField.placeholder}</div>
              )}
              <CMSInput
                id={`${sectionKey}-${field.name}-${nestedField.name}`}
                value={value?.[nestedField.name] || ''}
                onChange={(newValue) => updateNestedField(sectionKey, field.name, nestedField.name, newValue)}
                placeholder={nestedField.placeholder}
              />
            </div>
          ))}
        </div>
      );
    } else if (field.type === 'array') {
      return (
        <div className="space-y-4">
          <Label>{field.label}</Label>
          {Array.isArray(value) && value.map((item, index) => (
            <Card key={`${sectionKey}-${field.name}-${index}`} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">{field.label.replace(/s$/, '').replace(/\[\]$/, '')} #{index + 1}</h4>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveArrayItem(sectionKey, field.name, index, index - 1)}
                    disabled={index === 0}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveArrayItem(sectionKey, field.name, index, index + 1)}
                    disabled={index === (value || []).length - 1}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem(sectionKey, field.name, index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              {field.itemFields.map((itemField) => (
                <div key={itemField.name} className="space-y-2">
                  <Label htmlFor={`${sectionKey}-${field.name}-${index}-${itemField.name}`}>{itemField.label}</Label>
                  {itemField.placeholder && (
                    <div className="text-xs text-muted-foreground">{itemField.placeholder}</div>
                  )}
                  <CMSInput
                    id={`${sectionKey}-${field.name}-${index}-${itemField.name}`}
                    value={item[itemField.name] || ''}
                    onChange={(newValue) => updateArrayItemField(sectionKey, field.name, index, itemField.name, newValue)}
                    placeholder={itemField.placeholder}
                    type={itemField.type === 'textarea' ? 'textarea' : 'text'}
                    rows={itemField.rows || 3}
                  />
                </div>
              ))}
            </Card>
          ))}
          <Button
            variant="outline"
            onClick={() => {
              const defaultItem = {};
              field.itemFields.forEach(itemField => {
                defaultItem[itemField.name] = '';
              });
              addArrayItem(sectionKey, field.name, defaultItem);
            }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add {field.label.replace(/s$/, '').replace(/\[\]$/, '')}
          </Button>
        </div>
      );
    } else if (field.type === 'boolean') {
      return (
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id={`${sectionKey}-${field.name}`}
              checked={value || false}
              onChange={(e) => updateField(sectionKey, field.name, e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <Label htmlFor={`${sectionKey}-${field.name}`}>{field.label}</Label>
          </div>
          {field.placeholder && (
            <div className="text-xs text-muted-foreground">{field.placeholder}</div>
          )}
        </div>
      );
    } else if (field.type === 'number') {
      return (
        <div className="space-y-2">
          <Label htmlFor={`${sectionKey}-${field.name}`}>{field.label}</Label>
          {field.placeholder && (
            <div className="text-xs text-muted-foreground">{field.placeholder}</div>
          )}
          <CMSInput
            id={`${sectionKey}-${field.name}`}
            type="number"
            value={value || ''}
            onChange={(newValue) => updateField(sectionKey, field.name, newValue)}
            placeholder={field.placeholder}
          />
        </div>
      );
    } else {
      return (
        <div className="space-y-2">
          <Label htmlFor={`${sectionKey}-${field.name}`}>{field.label}</Label>
          {field.placeholder && (
            <div className="text-xs text-muted-foreground">{field.placeholder}</div>
          )}
          <CMSInput
            id={`${sectionKey}-${field.name}`}
            value={value || ''}
            onChange={(newValue) => updateField(sectionKey, field.name, newValue)}
            placeholder={field.placeholder}
          />
        </div>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        Editing content for {schema.label}
        {schema.description && (
          <div className="mt-1 text-xs">{schema.description}</div>
        )}
      </div>
      
      {schema.sections.map((section) => (
        <Card key={section.key} className="collapsible-section">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center">
                  {section.label}
                  {section.description && (
                    <span className="ml-2 cursor-help" title={section.description}>
                      <Info className="w-4 h-4 text-muted-foreground" />
                    </span>
                  )}
                </CardTitle>
                {section.description && (
                  <CardDescription>{section.description}</CardDescription>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {section.contentGuidance && (
              <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
                <div className="flex items-center text-sm font-medium text-blue-800 mb-1">
                  <Info className="w-4 h-4 mr-1" />
                  Content Guidance
                </div>
                <p className="text-xs text-blue-700">{section.contentGuidance}</p>
              </div>
            )}
            
            {/* Standardized section fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor={`${section.key}-heading`}>H1 Title</Label>
                <CMSInput
                  id={`${section.key}-heading`}
                  value={content?.[section.key]?.heading || content?.[section.key]?.title || ''}
                  onChange={(newValue) => updateField(section.key, 'heading', newValue)}
                  placeholder="Enter section heading"
                />
              </div>
              
              <HeadingTypeSelector
                id={`${section.key}-heading-type`}
                value={content?.[section.key]?.headingType || 'h2'}
                onValueChange={(value) => updateField(section.key, 'headingType', value)}
                label="Heading Type"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`${section.key}-subheading`}>Subheading</Label>
              <CMSInput
                id={`${section.key}-subheading`}
                value={content?.[section.key]?.subheading || ''}
                onChange={(newValue) => updateField(section.key, 'subheading', newValue)}
                placeholder="Enter section subheading"
                type="textarea"
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`${section.key}-description`}>Description</Label>
              <CMSInput
                id={`${section.key}-description`}
                value={content?.[section.key]?.description || ''}
                onChange={(newValue) => updateField(section.key, 'description', newValue)}
                placeholder="Enter section description"
                type="textarea"
                rows={4}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor={`${section.key}-content`}>Content</Label>
              <CMSInput
                id={`${section.key}-content`}
                value={content?.[section.key]?.content || content?.[section.key]?.body || ''}
                onChange={(newValue) => updateField(section.key, 'content', newValue)}
                placeholder="Enter section content"
                type="textarea"
                rows={4}
              />
            </div>
            
            {/* Custom fields from schema */}
            {section.fields.map((field) => (
              <div key={field.name}>
                {renderField(section.key, field, content?.[section.key]?.[field.name] || content?.[section.key]?.[field.name.replace('[]', '')])}
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}