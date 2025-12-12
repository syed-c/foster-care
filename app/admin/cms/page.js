'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Save, Trash2, Eye, RefreshCw } from 'lucide-react';

export default function CMSAdminPage() {
  const [pages, setPages] = useState([]);
  const [sections, setSections] = useState([]);
  const [fields, setFields] = useState([]);
  const [selectedPage, setSelectedPage] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('pages');
  const [fieldValues, setFieldValues] = useState({});
  const [newPageForm, setNewPageForm] = useState({
    name: '',
    slug: '',
    type: 'general',
    description: ''
  });
  const [showNewPageForm, setShowNewPageForm] = useState(false);

  // Fetch all CMS pages
  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await fetch('/api/cms/pages');
      const data = await response.json();
      setPages(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pages:', error);
      setLoading(false);
    }
  };

  const fetchSections = async (pageId) => {
    try {
      const response = await fetch(`/api/cms/sections?pageId=${pageId}`);
      const data = await response.json();
      setSections(data);
    } catch (error) {
      console.error('Error fetching sections:', error);
    }
  };

  const fetchFields = async (sectionId) => {
    try {
      const response = await fetch(`/api/cms/fields?sectionId=${sectionId}`);
      const data = await response.json();
      setFields(data);
      
      // Initialize field values
      const initialValues = {};
      data.forEach(field => {
        initialValues[field.id] = field.field_value || '';
      });
      setFieldValues(initialValues);
    } catch (error) {
      console.error('Error fetching fields:', error);
    }
  };

  const handlePageSelect = (page) => {
    setSelectedPage(page);
    setSelectedSection(null);
    fetchSections(page.id);
    setActiveTab('sections');
  };

  const handleSectionSelect = (section) => {
    setSelectedSection(section);
    fetchFields(section.id);
    setActiveTab('fields');
  };

  const handleCreatePage = async () => {
    if (!newPageForm.name || !newPageForm.slug) {
      alert('Please fill in name and slug');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/cms/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPageForm),
      });

      const data = await response.json();
      if (data.id) {
        setPages([...pages, data]);
        setSelectedPage(data);
        setSections([]);
        setActiveTab('sections');
        setShowNewPageForm(false);
        setNewPageForm({
          name: '',
          slug: '',
          type: 'general',
          description: ''
        });
      }
    } catch (error) {
      console.error('Error creating page:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateField = async (fieldId, newValue) => {
    setSaving(true);
    try {
      const response = await fetch(`/api/cms/fields/${fieldId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ field_value: newValue }),
      });

      const data = await response.json();
      if (data.id) {
        // Update the field in state
        setFields(fields.map(field => 
          field.id === fieldId ? { ...field, field_value: newValue } : field
        ));
        
        // Update field values
        setFieldValues(prev => ({
          ...prev,
          [fieldId]: newValue
        }));
      }
    } catch (error) {
      console.error('Error updating field:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteField = async (fieldId) => {
    if (!confirm('Are you sure you want to delete this field?')) return;
    
    setSaving(true);
    try {
      const response = await fetch(`/api/cms/fields/${fieldId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFields(fields.filter(field => field.id !== fieldId));
        setFieldValues(prev => {
          const newValues = { ...prev };
          delete newValues[fieldId];
          return newValues;
        });
      }
    } catch (error) {
      console.error('Error deleting field:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateSection = async () => {
    if (!selectedPage) return;
    
    const newSection = {
      page_id: selectedPage.id,
      section_key: `section_${Date.now()}`,
      section_type: 'text',
      title: 'New Section',
      content: {},
      sort_order: sections.length
    };

    setSaving(true);
    try {
      const response = await fetch('/api/cms/sections', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSection),
      });

      const data = await response.json();
      if (data.id) {
        setSections([...sections, data]);
      }
    } catch (error) {
      console.error('Error creating section:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSection = async (sectionId) => {
    if (!confirm('Are you sure you want to delete this section? All fields in this section will be deleted.')) return;
    
    setSaving(true);
    try {
      const response = await fetch(`/api/cms/sections/${sectionId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setSections(sections.filter(section => section.id !== sectionId));
        if (selectedSection && selectedSection.id === sectionId) {
          setSelectedSection(null);
          setFields([]);
        }
      }
    } catch (error) {
      console.error('Error deleting section:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePage = async (pageId) => {
    if (!confirm('Are you sure you want to delete this page? All sections and fields will be deleted.')) return;
    
    setSaving(true);
    try {
      const response = await fetch(`/api/cms/pages/${pageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setPages(pages.filter(page => page.id !== pageId));
        if (selectedPage && selectedPage.id === pageId) {
          setSelectedPage(null);
          setSelectedSection(null);
          setSections([]);
          setFields([]);
          setActiveTab('pages');
        }
      }
    } catch (error) {
      console.error('Error deleting page:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleFieldChange = (fieldId, value) => {
    setFieldValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const refreshData = () => {
    if (selectedPage) {
      fetchSections(selectedPage.id);
      if (selectedSection) {
        fetchFields(selectedSection.id);
      }
    } else {
      fetchPages();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading CMS...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Content Management System</h1>
            <p className="text-muted-foreground">Manage your website content</p>
          </div>
          <Button onClick={refreshData} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="sections" disabled={!selectedPage}>Sections</TabsTrigger>
          <TabsTrigger value="fields" disabled={!selectedSection}>Text Elements</TabsTrigger>
        </TabsList>

        <TabsContent value="pages" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold">Pages</h2>
              <p className="text-muted-foreground">Manage your website pages</p>
            </div>
            <Button onClick={() => setShowNewPageForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Create Page
            </Button>
          </div>

          {showNewPageForm && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Create New Page</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="page-name">Page Name</Label>
                    <Input
                      id="page-name"
                      value={newPageForm.name}
                      onChange={(e) => setNewPageForm({...newPageForm, name: e.target.value})}
                      placeholder="Enter page name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="page-slug">Page Slug</Label>
                    <Input
                      id="page-slug"
                      value={newPageForm.slug}
                      onChange={(e) => setNewPageForm({...newPageForm, slug: e.target.value})}
                      placeholder="enter-page-slug"
                    />
                  </div>
                  <div>
                    <Label htmlFor="page-type">Page Type</Label>
                    <Select value={newPageForm.type} onValueChange={(value) => setNewPageForm({...newPageForm, type: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select page type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="location">Location</SelectItem>
                        <SelectItem value="blog">Blog</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="page-description">Description</Label>
                    <Input
                      id="page-description"
                      value={newPageForm.description}
                      onChange={(e) => setNewPageForm({...newPageForm, description: e.target.value})}
                      placeholder="Brief description"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setShowNewPageForm(false)}>Cancel</Button>
                  <Button onClick={handleCreatePage} disabled={saving}>
                    {saving ? 'Creating...' : 'Create Page'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pages.map((page) => (
              <Card 
                key={page.id} 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handlePageSelect(page)}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{page.name}</CardTitle>
                      <CardDescription>{page.slug}</CardDescription>
                    </div>
                    <Badge variant="secondary">{page.type}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{page.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">
                      Created: {new Date(page.created_at).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeletePage(page.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sections" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold">
                {selectedPage ? `Sections for ${selectedPage.name}` : 'Sections'}
              </h2>
              <p className="text-muted-foreground">Organize content into sections</p>
            </div>
            <Button onClick={handleCreateSection} disabled={!selectedPage || saving}>
              <Plus className="mr-2 h-4 w-4" />
              Add Section
            </Button>
          </div>

          {selectedPage ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((section) => (
                <Card 
                  key={section.id} 
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleSectionSelect(section)}
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{section.title}</CardTitle>
                        <CardDescription>Key: {section.section_key}</CardDescription>
                      </div>
                      <Badge>{section.section_type}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <Badge variant={section.is_active ? "default" : "secondary"}>
                        {section.is_active ? "Active" : "Inactive"}
                      </Badge>
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteSection(section.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Select a page to view its sections</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="fields" className="mt-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-semibold">
                {selectedSection ? `Text Elements for ${selectedSection.title}` : 'Text Elements'}
              </h2>
              <p className="text-muted-foreground">Edit individual content fields</p>
            </div>
          </div>

          {selectedSection ? (
            <div className="space-y-6">
              {fields.map((field) => (
                <Card key={field.id}>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      {field.field_label}
                      <Badge variant="outline">{field.field_type}</Badge>
                    </CardTitle>
                    <CardDescription>Key: {field.field_key}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        {field.field_type === 'string' && (
                          <div className="space-y-2">
                            <Label htmlFor={`field-${field.id}`}>
                              Value
                            </Label>
                            <Input
                              id={`field-${field.id}`}
                              value={fieldValues[field.id] || ''}
                              onChange={(e) => handleFieldChange(field.id, e.target.value)}
                              onBlur={() => handleUpdateField(field.id, fieldValues[field.id])}
                              className="mt-2"
                            />
                          </div>
                        )}
                        {field.field_type === 'text' && (
                          <div className="space-y-2">
                            <Label htmlFor={`field-${field.id}`}>
                              Value
                            </Label>
                            <Textarea
                              id={`field-${field.id}`}
                              value={fieldValues[field.id] || ''}
                              onChange={(e) => handleFieldChange(field.id, e.target.value)}
                              onBlur={() => handleUpdateField(field.id, fieldValues[field.id])}
                              className="mt-2"
                              rows={4}
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          {field.is_required && (
                            <Badge variant="destructive">Required</Badge>
                          )}
                          <span className="text-xs text-muted-foreground">
                            Order: {field.sort_order}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleUpdateField(field.id, fieldValues[field.id])}
                            disabled={saving}
                          >
                            <Save className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteField(field.id)}
                            disabled={saving}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {fields.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No fields found for this section</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Select a section to view its text elements</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}