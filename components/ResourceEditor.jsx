'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, Plus, ArrowUp, ArrowDown, Info } from 'lucide-react';

export default function ResourceEditor({ resources = [], onChange }) {
  const [resourcesState, setResourcesState] = useState(resources);

  const updateResources = (newResources) => {
    setResourcesState(newResources);
    onChange(newResources);
  };

  const addResource = () => {
    const newResource = { title: '', url: '', description: '' };
    updateResources([...resourcesState, newResource]);
  };

  const removeResource = (index) => {
    const newResources = [...resourcesState];
    newResources.splice(index, 1);
    updateResources(newResources);
  };

  const moveResourceUp = (index) => {
    if (index <= 0) return;
    const newResources = [...resourcesState];
    [newResources[index - 1], newResources[index]] = [newResources[index], newResources[index - 1]];
    updateResources(newResources);
  };

  const moveResourceDown = (index) => {
    if (index >= resourcesState.length - 1) return;
    const newResources = [...resourcesState];
    [newResources[index], newResources[index + 1]] = [newResources[index + 1], newResources[index]];
    updateResources(newResources);
  };

  const updateResource = (index, field, value) => {
    const newResources = [...resourcesState];
    newResources[index] = { ...newResources[index], [field]: value };
    updateResources(newResources);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Label>Useful Resources</Label>
          <span className="ml-2 cursor-help" title="Local resources and organizations that support foster carers">
            <Info className="w-4 h-4 text-muted-foreground" />
          </span>
        </div>
        <Button type="button" variant="outline" size="sm" onClick={addResource}>
          <Plus className="w-4 h-4 mr-2" />
          Add Resource
        </Button>
      </div>
      
      <div className="space-y-4">
        {resourcesState.map((resource, index) => (
          <Card key={index} className="relative">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-base">Resource #{index + 1}</CardTitle>
                <div className="flex space-x-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => moveResourceUp(index)}
                    disabled={index === 0}
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => moveResourceDown(index)}
                    disabled={index === resourcesState.length - 1}
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeResource(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor={`resource-title-${index}`}>Title</Label>
                <Input
                  id={`resource-title-${index}`}
                  value={resource.title || ''}
                  onChange={(e) => updateResource(index, 'title', e.target.value)}
                  placeholder="Enter resource title"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`resource-url-${index}`}>URL</Label>
                <Input
                  id={`resource-url-${index}`}
                  value={resource.url || ''}
                  onChange={(e) => updateResource(index, 'url', e.target.value)}
                  placeholder="Enter resource URL"
                  type="url"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`resource-description-${index}`}>Description</Label>
                <Textarea
                  id={`resource-description-${index}`}
                  value={resource.description || ''}
                  onChange={(e) => updateResource(index, 'description', e.target.value)}
                  placeholder="Enter resource description"
                  rows={2}
                />
              </div>
            </CardContent>
          </Card>
        ))}
        
        {resourcesState.length === 0 && (
          <div className="text-center py-8 text-muted-foreground bg-blue-50 rounded-lg border border-blue-200 p-4">
            <Info className="w-12 h-12 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No Resources Added</h3>
            <p className="text-sm mb-4">
              Resources help foster carers find local support and information. 
              Consider adding links to local councils, support groups, and training programs.
            </p>
            <Button type="button" variant="outline" onClick={addResource}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Resource
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}