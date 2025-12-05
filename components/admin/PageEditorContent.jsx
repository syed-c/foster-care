'use client';

import { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Save, 
  Eye, 
  Plus, 
  GripVertical,
  MoveUp,
  MoveDown,
  Trash2
} from 'lucide-react';
import SectionEditor from '@/components/admin/SectionEditor';
import SeoFields from '@/components/admin/SeoFields';
import AddSectionModal from '@/components/admin/AddSectionModal';

export default function PageEditorContent({ 
  selectedLocation,
  selectedPage
}) {
  const [activeTab, setActiveTab] = useState('content');
  const [sections, setSections] = useState([
    { id: 'hero', type: 'hero', title: 'Hero', order: 1, data: {} },
    { id: 'overview', type: 'overview', title: 'Overview', order: 2, data: {} },
    { id: 'system', type: 'system', title: 'System', order: 3, data: {} },
    { id: 'reasons', type: 'reasons', title: 'Reasons', order: 4, data: { items: [] } },
    { id: 'featuredAreas', type: 'featuredAreas', title: 'Areas', order: 5, data: { items: [] } },
    { id: 'faqs', type: 'faqs', title: 'FAQs', order: 6, data: { items: [] } },
    { id: 'finalcta', type: 'finalcta', title: 'Final CTA', order: 7, data: {} }
  ]);

  const moveSection = (fromIndex, toIndex) => {
    const newSections = [...sections];
    const [movedItem] = newSections.splice(fromIndex, 1);
    newSections.splice(toIndex, 0, movedItem);
    
    // Update order values
    const updatedSections = newSections.map((item, index) => ({
      ...item,
      order: index + 1
    }));
    
    setSections(updatedSections);
  };

  const removeSection = (sectionId) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };

  const handleSectionDataChange = (sectionId, data) => {
    setSections(prevSections => 
      prevSections.map(section => 
        section.id === sectionId 
          ? { ...section, data } 
          : section
      )
    );
  };

  const handleAddSection = (sectionType) => {
    const newSection = {
      id: `${sectionType.type}-${Date.now()}`,
      type: sectionType.type,
      title: sectionType.title,
      order: sections.length + 1,
      data: sectionType.type === 'reasons' || sectionType.type === 'featuredAreas' || sectionType.type === 'faqs' 
        ? { items: [] } 
        : {}
    };
    
    setSections([...sections, newSection]);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white p-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              {selectedLocation ? selectedLocation.name : selectedPage?.title || 'Edit Page'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {selectedLocation 
                ? `Editing ${selectedLocation.type} content` 
                : 'Editing general page content'
              }
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button>
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="border-b border-gray-200 bg-white px-4">
          <TabsList>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="content" className="h-full m-0">
            <div className="flex flex-col h-full">
              {/* Section Tabs - Horizontal tabs for quick navigation */}
              <div className="border-b border-gray-200 bg-white">
                <div className="flex border-b border-gray-200">
                  {sections.map((section) => (
                    <Button
                      key={section.id}
                      variant="ghost"
                      className="rounded-none border-r border-gray-200 data-[state=active]:bg-gray-100"
                    >
                      {section.title}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Sections List with Drag and Drop */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-4">
                  {sections.map((section, index) => (
                    <Card key={section.id} className="bg-white rounded-lg border border-gray-200">
                      <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="mr-2 cursor-move text-gray-400">
                              <GripVertical className="h-4 w-4" />
                            </div>
                            <CardTitle className="text-lg">{section.title} Section</CardTitle>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => moveSection(index, index - 1)}
                              disabled={index === 0}
                            >
                              <MoveUp className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => moveSection(index, index + 1)}
                              disabled={index === sections.length - 1}
                            >
                              <MoveDown className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => removeSection(section.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <SectionEditor 
                          section={section} 
                          onDataChange={handleSectionDataChange}
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Add Section Button */}
                <div className="mt-4">
                  <AddSectionModal onAddSection={handleAddSection} />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="seo" className="h-full m-0 overflow-y-auto p-4">
            <SeoFields />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}