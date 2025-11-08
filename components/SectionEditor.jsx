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
  ArrowDown 
} from 'lucide-react';

export default function SectionEditor({ sections, onChange }) {
  const updateSection = (sectionName, updates) => {
    onChange({
      ...sections,
      [sectionName]: { ...sections[sectionName], ...updates }
    });
  };

  const updateArraySection = (sectionName, index, updates) => {
    const newArray = [...sections[sectionName]];
    newArray[index] = { ...newArray[index], ...updates };
    onChange({
      ...sections,
      [sectionName]: newArray
    });
  };

  const addArrayItem = (sectionName, defaultItem) => {
    const newArray = sections[sectionName] ? [...sections[sectionName]] : [];
    newArray.push(defaultItem);
    onChange({
      ...sections,
      [sectionName]: newArray
    });
  };

  const removeArrayItem = (sectionName, index) => {
    const newArray = [...sections[sectionName]];
    newArray.splice(index, 1);
    onChange({
      ...sections,
      [sectionName]: newArray
    });
  };

  const moveArrayItem = (sectionName, fromIndex, toIndex) => {
    const newArray = [...sections[sectionName]];
    const [movedItem] = newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, movedItem);
    onChange({
      ...sections,
      [sectionName]: newArray
    });
  };

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card>
        <CardHeader>
          <CardTitle>Hero Section</CardTitle>
          <CardDescription>Edit the main hero section content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="hero-heading">Heading</Label>
            <Input
              id="hero-heading"
              value={sections?.hero?.heading || ''}
              onChange={(e) => updateSection('hero', { heading: e.target.value })}
              placeholder="Enter hero heading"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hero-subheading">Subheading</Label>
            <Textarea
              id="hero-subheading"
              value={sections?.hero?.subheading || ''}
              onChange={(e) => updateSection('hero', { subheading: e.target.value })}
              placeholder="Enter hero subheading"
              rows={2}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hero-cta-primary-text">Primary CTA Text</Label>
              <Input
                id="hero-cta-primary-text"
                value={sections?.hero?.cta_primary?.text || ''}
                onChange={(e) => updateSection('hero', { 
                  cta_primary: { ...sections?.hero?.cta_primary, text: e.target.value } 
                })}
                placeholder="Enter primary CTA text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-cta-primary-link">Primary CTA Link</Label>
              <Input
                id="hero-cta-primary-link"
                value={sections?.hero?.cta_primary?.link || ''}
                onChange={(e) => updateSection('hero', { 
                  cta_primary: { ...sections?.hero?.cta_primary, link: e.target.value } 
                })}
                placeholder="Enter primary CTA link"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hero-cta-secondary-text">Secondary CTA Text</Label>
              <Input
                id="hero-cta-secondary-text"
                value={sections?.hero?.cta_secondary?.text || ''}
                onChange={(e) => updateSection('hero', { 
                  cta_secondary: { ...sections?.hero?.cta_secondary, text: e.target.value } 
                })}
                placeholder="Enter secondary CTA text"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-cta-secondary-link">Secondary CTA Link</Label>
              <Input
                id="hero-cta-secondary-link"
                value={sections?.hero?.cta_secondary?.link || ''}
                onChange={(e) => updateSection('hero', { 
                  cta_secondary: { ...sections?.hero?.cta_secondary, link: e.target.value } 
                })}
                placeholder="Enter secondary CTA link"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card>
        <CardHeader>
          <CardTitle>About Section</CardTitle>
          <CardDescription>Edit the about section content</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="about-title">Title</Label>
            <Input
              id="about-title"
              value={sections?.about?.title || ''}
              onChange={(e) => updateSection('about', { title: e.target.value })}
              placeholder="Enter about section title"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="about-body">Body Content</Label>
            <Textarea
              id="about-body"
              value={sections?.about?.body || ''}
              onChange={(e) => updateSection('about', { body: e.target.value })}
              placeholder="Enter about section body content"
              rows={6}
            />
          </div>
        </CardContent>
      </Card>

      {/* Types of Fostering Section */}
      <Card>
        <CardHeader>
          <CardTitle>Types of Fostering</CardTitle>
          <CardDescription>Manage the types of fostering available</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(sections?.types_of_fostering || []).map((type, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Type #{index + 1}</h4>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveArrayItem('types_of_fostering', index, index - 1)}
                    disabled={index === 0}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveArrayItem('types_of_fostering', index, index + 1)}
                    disabled={index === sections?.types_of_fostering?.length - 1}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('types_of_fostering', index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`type-name-${index}`}>Name</Label>
                <Input
                  id={`type-name-${index}`}
                  value={type.name || ''}
                  onChange={(e) => updateArraySection('types_of_fostering', index, { name: e.target.value })}
                  placeholder="Enter type name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`type-description-${index}`}>Description</Label>
                <Textarea
                  id={`type-description-${index}`}
                  value={type.description || ''}
                  onChange={(e) => updateArraySection('types_of_fostering', index, { description: e.target.value })}
                  placeholder="Enter type description"
                  rows={3}
                />
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => addArrayItem('types_of_fostering', {
              name: '',
              description: ''
            })}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Type
          </Button>
        </CardContent>
      </Card>

      {/* Top Agencies Section */}
      <Card>
        <CardHeader>
          <CardTitle>Top Agencies</CardTitle>
          <CardDescription>Manage the featured agencies</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(sections?.top_agencies || []).map((agency, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Agency #{index + 1}</h4>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveArrayItem('top_agencies', index, index - 1)}
                    disabled={index === 0}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveArrayItem('top_agencies', index, index + 1)}
                    disabled={index === sections?.top_agencies?.length - 1}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('top_agencies', index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`agency-name-${index}`}>Name</Label>
                <Input
                  id={`agency-name-${index}`}
                  value={agency.name || ''}
                  onChange={(e) => updateArraySection('top_agencies', index, { name: e.target.value })}
                  placeholder="Enter agency name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`agency-summary-${index}`}>Summary</Label>
                <Textarea
                  id={`agency-summary-${index}`}
                  value={agency.summary || ''}
                  onChange={(e) => updateArraySection('top_agencies', index, { summary: e.target.value })}
                  placeholder="Enter agency summary"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`agency-link-${index}`}>Link</Label>
                <Input
                  id={`agency-link-${index}`}
                  value={agency.link || ''}
                  onChange={(e) => updateArraySection('top_agencies', index, { link: e.target.value })}
                  placeholder="Enter agency link"
                />
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => addArrayItem('top_agencies', {
              name: '',
              summary: '',
              link: ''
            })}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Agency
          </Button>
        </CardContent>
      </Card>

      {/* Why Foster Section */}
      <Card>
        <CardHeader>
          <CardTitle>Why Foster</CardTitle>
          <CardDescription>Edit the reasons to foster</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Key Points</Label>
            {(sections?.why_foster?.points || []).map((point, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  value={point || ''}
                  onChange={(e) => {
                    const newPoints = [...(sections?.why_foster?.points || [])];
                    newPoints[index] = e.target.value;
                    updateSection('why_foster', { points: newPoints });
                  }}
                  placeholder="Enter reason to foster"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const newPoints = [...(sections?.why_foster?.points || [])];
                    newPoints.splice(index, 1);
                    updateSection('why_foster', { points: newPoints });
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              onClick={() => {
                const newPoints = [...(sections?.why_foster?.points || []), ''];
                updateSection('why_foster', { points: newPoints });
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Point
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Allowances and Support Section */}
      <Card>
        <CardHeader>
          <CardTitle>Allowances and Support</CardTitle>
          <CardDescription>Manage the allowances and support information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(sections?.allowances_and_support || []).map((item, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Item #{index + 1}</h4>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveArrayItem('allowances_and_support', index, index - 1)}
                    disabled={index === 0}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveArrayItem('allowances_and_support', index, index + 1)}
                    disabled={index === sections?.allowances_and_support?.length - 1}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('allowances_and_support', index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`allowance-title-${index}`}>Title</Label>
                <Input
                  id={`allowance-title-${index}`}
                  value={item.title || ''}
                  onChange={(e) => updateArraySection('allowances_and_support', index, { title: e.target.value })}
                  placeholder="Enter allowance title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`allowance-details-${index}`}>Details</Label>
                <Textarea
                  id={`allowance-details-${index}`}
                  value={item.details || ''}
                  onChange={(e) => updateArraySection('allowances_and_support', index, { details: e.target.value })}
                  placeholder="Enter allowance details"
                  rows={3}
                />
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => addArrayItem('allowances_and_support', {
              title: '',
              details: ''
            })}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </CardContent>
      </Card>

      {/* Local Resources Section */}
      <Card>
        <CardHeader>
          <CardTitle>Local Resources</CardTitle>
          <CardDescription>Manage the local resources</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(sections?.local_resources || []).map((resource, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Resource #{index + 1}</h4>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveArrayItem('local_resources', index, index - 1)}
                    disabled={index === 0}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => moveArrayItem('local_resources', index, index + 1)}
                    disabled={index === sections?.local_resources?.length - 1}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => removeArrayItem('local_resources', index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`resource-title-${index}`}>Title</Label>
                <Input
                  id={`resource-title-${index}`}
                  value={resource.title || ''}
                  onChange={(e) => updateArraySection('local_resources', index, { title: e.target.value })}
                  placeholder="Enter resource title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`resource-description-${index}`}>Description</Label>
                <Textarea
                  id={`resource-description-${index}`}
                  value={resource.description || ''}
                  onChange={(e) => updateArraySection('local_resources', index, { description: e.target.value })}
                  placeholder="Enter resource description"
                  rows={2}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`resource-link-${index}`}>Link</Label>
                <Input
                  id={`resource-link-${index}`}
                  value={resource.link || ''}
                  onChange={(e) => updateArraySection('local_resources', index, { link: e.target.value })}
                  placeholder="Enter resource link"
                />
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => addArrayItem('local_resources', {
              title: '',
              description: '',
              link: ''
            })}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Resource
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}