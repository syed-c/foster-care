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
  Info,
  AlertCircle
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { validateSection } from '@/lib/cmsTypes';
import CMSInput from '@/components/CMSInput';

export default function SectionEditor({ 
  section, 
  sectionIndex, 
  onUpdate, 
  onMoveUp, 
  onMoveDown, 
  onDelete,
  isLast,
  isFirst
}) {
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    const updatedSection = { ...section, [field]: value };
    onUpdate(sectionIndex, field, value);
    
    // Validate the section when fields change
    const validation = validateSection(updatedSection);
    setErrors(validation.errors);
  };

  const updateArrayItem = (field, index, updates) => {
    const newArray = [...(section[field] || [])];
    newArray[index] = { ...newArray[index], ...updates };
    onUpdate(sectionIndex, field, newArray);
  };

  const addArrayItem = (field, defaultItem) => {
    const newArray = section[field] ? [...section[field]] : [];
    newArray.push(defaultItem);
    onUpdate(sectionIndex, field, newArray);
  };

  const removeArrayItem = (field, index) => {
    const newArray = [...(section[field] || [])];
    newArray.splice(index, 1);
    onUpdate(sectionIndex, field, newArray);
  };

  const moveArrayItem = (field, fromIndex, toIndex) => {
    const newArray = [...(section[field] || [])];
    const [movedItem] = newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, movedItem);
    onUpdate(sectionIndex, field, newArray);
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="flex items-center gap-2">
              <CMSInput
                value={section.title || ''}
                onChange={(newValue) => updateField('title', newValue)}
                className="font-bold text-lg w-auto"
                placeholder="Section Title"
              />
              {section.type && (
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {section.type}
                </span>
              )}
              {errors.title && (
                <span className="text-red-500 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.title}
                </span>
              )}
            </CardTitle>
            {section.description && (
              <CardDescription>{section.description}</CardDescription>
            )}
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMoveUp(sectionIndex)}
              disabled={isFirst}
            >
              <ArrowUp className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onMoveDown(sectionIndex)}
              disabled={isLast}
            >
              <ArrowDown className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(sectionIndex)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Standardized section fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`section-heading-${sectionIndex}`}>H1 Title</Label>
            <CMSInput
              id={`section-heading-${sectionIndex}`}
              value={section.heading || ''}
              onChange={(newValue) => updateField('heading', newValue)}
              placeholder="Section heading"
            />
            {errors.heading && (
              <p className="text-sm text-red-500">{errors.heading}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`section-heading-type-${sectionIndex}`}>Heading Type</Label>
            <Select 
              value={section.headingType || 'h2'}
              onValueChange={(value) => updateField('headingType', value)}
            >
              <SelectTrigger id={`section-heading-type-${sectionIndex}`}>
                <SelectValue placeholder="Select heading type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="h1">
                  <span className="font-bold">H1</span> - Main page title
                </SelectItem>
                <SelectItem value="h2">
                  <span className="font-semibold">H2</span> - Section heading
                </SelectItem>
                <SelectItem value="h3">
                  <span className="font-medium">H3</span> - Subsection heading
                </SelectItem>
                <SelectItem value="h4">
                  <span>H4</span> - Sub-subsection heading
                </SelectItem>
                <SelectItem value="paragraph">
                  <span>Paragraph</span> - Regular text
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.headingType && (
              <p className="text-sm text-red-500">{errors.headingType}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor={`section-subheading-${sectionIndex}`}>Subheading</Label>
          <CMSInput
            id={`section-subheading-${sectionIndex}`}
            value={section.subheading || ''}
            onChange={(newValue) => updateField('subheading', newValue)}
            placeholder="Section subheading"
            type="textarea"
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor={`section-content-${sectionIndex}`}>Content</Label>
          <CMSInput
            id={`section-content-${sectionIndex}`}
            value={section.content || ''}
            onChange={(newValue) => updateField('content', newValue)}
            placeholder="Section content"
            type="textarea"
            rows={4}
          />
        </div>

        {/* Buttons array */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Buttons</Label>
            <Button 
              type="button" 
              variant="outline" 
              size="sm" 
              onClick={() => addArrayItem('buttons', { text: '', link: '' })}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Button
            </Button>
          </div>
          
          {section.buttons && section.buttons.map((button, index) => (
            <div key={`${section.id || sectionIndex}-button-${index}`} className="flex gap-2 items-end">
              <div className="flex-1">
                <Label htmlFor={`button-text-${sectionIndex}-${index}`}>Button Text</Label>
                <CMSInput
                  id={`button-text-${sectionIndex}-${index}`}
                  value={button.text || ''}
                  onChange={(newValue) => updateArrayItem('buttons', index, { text: newValue })}
                  placeholder="Button text"
                />
                {errors[`button_${index}_text`] && (
                  <p className="text-sm text-red-500">{errors[`button_${index}_text`]}</p>
                )}
              </div>
              <div className="flex-1">
                <Label htmlFor={`button-link-${sectionIndex}-${index}`}>Button Link</Label>
                <CMSInput
                  id={`button-link-${sectionIndex}-${index}`}
                  value={button.link || ''}
                  onChange={(newValue) => updateArrayItem('buttons', index, { link: newValue })}
                  placeholder="Button link"
                />
                {errors[`button_${index}_link`] && (
                  <p className="text-sm text-red-500">{errors[`button_${index}_link`]}</p>
                )}
              </div>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moveArrayItem('buttons', index, index - 1)}
                  disabled={index === 0}
                >
                  <ArrowUp className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moveArrayItem('buttons', index, index + 1)}
                  disabled={index === (section.buttons?.length || 0) - 1}
                >
                  <ArrowDown className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeArrayItem('buttons', index)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}