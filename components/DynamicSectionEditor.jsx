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

export default function DynamicSectionEditor({ locationType, content, onChange }) {
  // Get the schema for this location type
  const schema = locationSchemas[locationType] || locationSchemas.city;
  
  const updateField = (sectionKey, fieldName, value) => {
    onChange({
      ...content,
      [sectionKey]: {
        ...content[sectionKey],
        [fieldName]: value
      }
    });
  };

  const updateNestedField = (sectionKey, fieldName, nestedField, value) => {
    onChange({
      ...content,
      [sectionKey]: {
        ...content[sectionKey],
        [fieldName]: {
          ...content[sectionKey][fieldName],
          [nestedField]: value
        }
      }
    });
  };

  const updateArrayField = (sectionKey, fieldName, index, updates) => {
    const newArray = [...(content[sectionKey][fieldName] || [])];
    newArray[index] = { ...newArray[index], ...updates };
    onChange({
      ...content,
      [sectionKey]: {
        ...content[sectionKey],
        [fieldName]: newArray
      }
    });
  };

  const updateArrayItemField = (sectionKey, fieldName, index, itemIndex, field, value) => {
    const newArray = [...(content[sectionKey][fieldName] || [])];
    newArray[index] = {
      ...newArray[index],
      [field]: value
    };
    onChange({
      ...content,
      [sectionKey]: {
        ...content[sectionKey],
        [fieldName]: newArray
      }
    });
  };

  const addArrayItem = (sectionKey, fieldName, defaultItem) => {
    const newArray = content[sectionKey] && content[sectionKey][fieldName] ? [...content[sectionKey][fieldName]] : [];
    newArray.push(defaultItem);
    onChange({
      ...content,
      [sectionKey]: {
        ...content[sectionKey],
        [fieldName]: newArray
      }
    });
  };

  const removeArrayItem = (sectionKey, fieldName, index) => {
    const newArray = [...(content[sectionKey][fieldName] || [])];
    newArray.splice(index, 1);
    onChange({
      ...content,
      [sectionKey]: {
        ...content[sectionKey],
        [fieldName]: newArray
      }
    });
  };

  const moveArrayItem = (sectionKey, fieldName, fromIndex, toIndex) => {
    const newArray = [...(content[sectionKey][fieldName] || [])];
    const [movedItem] = newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, movedItem);
    onChange({
      ...content,
      [sectionKey]: {
        ...content[sectionKey],
        [fieldName]: newArray
      }
    });
  };

  const renderField = (sectionKey, field, value) => {
    if (field.type === 'textarea') {
      return (
        <div className="space-y-2">
          <Label htmlFor={`${sectionKey}-${field.name}`}>{field.label}</Label>
          {field.placeholder && (
            <div className="text-xs text-muted-foreground">{field.placeholder}</div>
          )}
          <Textarea
            id={`${sectionKey}-${field.name}`}
            value={value || ''}
            onChange={(e) => updateField(sectionKey, field.name, e.target.value)}
            placeholder={field.placeholder}
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
              <Input
                id={`${sectionKey}-${field.name}-${nestedField.name}`}
                value={value?.[nestedField.name] || ''}
                onChange={(e) => updateNestedField(sectionKey, field.name, nestedField.name, e.target.value)}
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
          {(value || []).map((item, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
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
                  {itemField.type === 'textarea' ? (
                    <Textarea
                      id={`${sectionKey}-${field.name}-${index}-${itemField.name}`}
                      value={item[itemField.name] || ''}
                      onChange={(e) => updateArrayItemField(sectionKey, field.name, index, itemField.name, e.target.value)}
                      placeholder={itemField.placeholder}
                      rows={itemField.rows || 3}
                    />
                  ) : (
                    <Input
                      id={`${sectionKey}-${field.name}-${index}-${itemField.name}`}
                      value={item[itemField.name] || ''}
                      onChange={(e) => updateArrayItemField(sectionKey, field.name, index, itemField.name, e.target.value)}
                      placeholder={itemField.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
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
    } else {
      return (
        <div className="space-y-2">
          <Label htmlFor={`${sectionKey}-${field.name}`}>{field.label}</Label>
          {field.placeholder && (
            <div className="text-xs text-muted-foreground">{field.placeholder}</div>
          )}
          <Input
            id={`${sectionKey}-${field.name}`}
            value={value || ''}
            onChange={(e) => updateField(sectionKey, field.name, e.target.value)}
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
        <Card key={section.key}>
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