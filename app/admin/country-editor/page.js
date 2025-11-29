'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Save,
  Eye,
  Upload,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  AlertCircle,
  FileJson
} from 'lucide-react';
import { toast, Toaster } from 'sonner';
import LocationSidebar from '@/components/admin/LocationSidebar';
import { formatSlugToTitle } from '@/lib/locationData';

export default function CountryEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [locationContent, setLocationContent] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationFormData, setLocationFormData] = useState({});
  const [previewMode, setPreviewMode] = useState(false);
  const [jsonPreview, setJsonPreview] = useState(false);

  useEffect(() => {
    // TEMPORARILY DISABLED ADMIN CHECK FOR TESTING
    setIsAdmin(true);
    fetchLocationContent();
  }, []);

  const fetchLocationContent = async () => {
    try {
      setLoading(true);
      console.log('Fetching location tree data...');
      
      // Use the new tree API instead of the old CMS API
      const response = await fetch('/api/admin/locations/tree?includeContent=true');
      console.log('Tree API Response Status:', response.status);
      
      if (response.ok) {
        const rawData = await response.json();
        console.log('Tree API Response:', rawData);
        
        // Handle different response structures
        const treeData = rawData.data || rawData || [];
        console.log('Parsed treeData:', treeData);
        
        // Set the tree data directly instead of converting to flat list
        setLocationContent(treeData);
      } else {
        console.error('Failed to fetch location tree:', response.status, response.statusText);
        // Fallback to empty array
        setLocationContent([]);
      }
    } catch (error) {
      console.error('Error fetching location content:', error);
      setLocationContent([]);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced load function with better error handling
  const loadLocationContent = async (locationId) => {
    try {
      const res = await fetch(`/api/admin/locations/${locationId}/content`);
      const json = await res.json();
      if (!json.success) {
        console.warn('loadLocationContent failed', json.error);
        setLocationFormData({}); // or keep previous
        return;
      }
      const content = json.content || {};
      // If the API returns nested content_json as string for old rows, handle fallback:
      setLocationFormData(content);
    } catch (err) {
      console.error('loadLocationContent error', err);
      setLocationFormData({});
    }
  };

  // Enhanced save function with better error handling
  const handleSave = async () => {
    if (!selectedLocation?.id) return;
    
    try {
      console.log('Saving', selectedLocation.id, locationFormData);
      
      // Prepare the data to send including the canonical slug
      // Remove location-specific fields from the content data
      const { 
        id, name, slug, type, children, editable, canonical_slug, 
        template_type, updated_at, content_json, ...cleanContent 
      } = locationFormData;
      
      const saveData = {
        ...cleanContent,
        canonical_slug: selectedLocation.canonical_slug || `/foster-agency/${selectedLocation.slug || selectedLocation.id}`,
        id: selectedLocation.id,
        type: selectedLocation.type || 'country'
      };
      
      const res = await fetch(`/api/admin/locations/${selectedLocation.id}/content`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(saveData)
      });
      
      const json = await res.json();
      console.log('Server saved response', json);
      
      if (!json.success) {
        console.error('Save failed', json.error);
        toast.error('Save failed: ' + (json.error || 'unknown'));
        return;
      }
      
      // Prefer returned saved object for hydration (and for new created rows)
      if (json.saved?.content_json) {
        setLocationFormData(json.saved.content_json);
      } else {
        // fallback re-fetch
        const reload = await fetch(`/api/admin/locations/${selectedLocation.id}/content`);
        const reloadJson = await reload.json();
        setLocationFormData(reloadJson.content || {});
      }
      
      // Persist local autosave draft optionally to localStorage
      localStorage.removeItem('cms-draft:' + selectedLocation.id);
      
      toast.success('Location content saved successfully!');
    } catch (error) {
      console.error('handleSave err', error);
      toast.error('Error saving location content: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  // Enhanced location save handler
  const handleLocationSave = async (e) => {
    e.preventDefault();
    if (!selectedLocation) return;
    
    // Save draft to localStorage before attempting to save
    localStorage.setItem('cms-draft:' + selectedLocation.id, JSON.stringify(locationFormData));
    
    setSaving(true);
    await handleSave();
  };

  // Enhanced location edit handler
  const handleLocationEdit = (content) => {
    try {
      setSelectedLocation(content);
      // Load the actual content from the API instead of using node data directly
      loadLocationContent(content.id);
    } catch (error) {
      console.error('Error handling location edit:', error);
    }
  };

  // Enhanced reload tree handler
  const handleReloadTree = async () => {
    try {
      await fetchLocationContent();
    } catch (error) {
      console.error('Error reloading tree:', error);
    }
  };

  // Enhanced useEffect to load content when selectedLocation changes
  useEffect(() => {
    if (!selectedLocation?.id) return;
    loadLocationContent(selectedLocation.id);
  }, [selectedLocation?.id]);

  // Field update handlers
  const updateField = (section, field, value) => {
    setLocationFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const updateNestedField = (section, nestedSection, field, value) => {
    setLocationFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [nestedSection]: {
          ...prev[section]?.[nestedSection],
          [field]: value
        }
      }
    }));
  };

  // Array handlers
  const addArrayItem = (section, field, defaultItem) => {
    const newArray = Array.isArray(locationFormData[section]?.[field]) 
      ? [...locationFormData[section][field]] 
      : [];
    newArray.push(defaultItem);
    setLocationFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: newArray
      }
    }));
  };

  const removeArrayItem = (section, field, index) => {
    const newArray = Array.isArray(locationFormData[section]?.[field]) 
      ? [...locationFormData[section][field]] 
      : [];
    newArray.splice(index, 1);
    setLocationFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: newArray
      }
    }));
  };

  const updateArrayItem = (section, field, index, updates) => {
    const newArray = Array.isArray(locationFormData[section]?.[field]) 
      ? [...locationFormData[section][field]] 
      : [];
    newArray[index] = { ...newArray[index], ...updates };
    setLocationFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: newArray
      }
    }));
  };

  const moveArrayItem = (section, field, fromIndex, toIndex) => {
    const newArray = Array.isArray(locationFormData[section]?.[field]) 
      ? [...locationFormData[section][field]] 
      : [];
    const [movedItem] = newArray.splice(fromIndex, 1);
    newArray.splice(toIndex, 0, movedItem);
    setLocationFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: newArray
      }
    }));
  };

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You don't have permission to access this page.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push('/')} className="w-full">
              Go Back Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Render array editor for sortable lists
  const renderArrayEditor = (section, field, itemFields, defaultItem, label) => {
    const items = locationFormData[section]?.[field] || [];
    
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>{label}</Label>
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={() => addArrayItem(section, field, defaultItem)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
        
        {items.length === 0 ? (
          <div className="text-center py-4 text-muted-foreground">
            No items added yet
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => (
              <Card key={index} className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <span className="font-medium">Item #{index + 1}</span>
                  <div className="flex space-x-2">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={() => moveArrayItem(section, field, index, index - 1)}
                      disabled={index === 0}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={() => moveArrayItem(section, field, index, index + 1)}
                      disabled={index === items.length - 1}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </Button>
                    <Button 
                      type="button" 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => removeArrayItem(section, field, index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {itemFields.map(fieldConfig => (
                    <div key={fieldConfig.name} className="space-y-2">
                      <Label htmlFor={`${section}-${field}-${index}-${fieldConfig.name}`}>
                        {fieldConfig.label}
                      </Label>
                      {fieldConfig.type === 'textarea' ? (
                        <Textarea
                          id={`${section}-${field}-${index}-${fieldConfig.name}`}
                          value={item[fieldConfig.name] || ''}
                          onChange={(e) => updateArrayItem(section, field, index, { [fieldConfig.name]: e.target.value })}
                          placeholder={fieldConfig.placeholder}
                          rows={fieldConfig.rows || 3}
                        />
                      ) : (
                        <Input
                          id={`${section}-${field}-${index}-${fieldConfig.name}`}
                          value={item[fieldConfig.name] || ''}
                          onChange={(e) => updateArrayItem(section, field, index, { [fieldConfig.name]: e.target.value })}
                          placeholder={fieldConfig.placeholder}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background-offwhite">
      <Toaster position="top-right" />
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => router.push('/admin')} className="font-inter">
                ←
              </Button>
              <div>
                <h1 className="text-2xl font-bold font-inter">Country Page Editor</h1>
                <p className="text-sm text-muted-foreground font-inter">Edit country page content with strict section ordering</p>
              </div>
            </div>
            <Badge variant="secondary" className="font-inter">Admin</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Location Tree */}
          <div className="lg:col-span-1">
            <LocationSidebar 
              locations={locationContent} 
              onSelect={handleLocationEdit}
              onReload={handleReloadTree}
              selectedLocationId={selectedLocation?.id}
              filterType="country"
            />
          </div>

          {/* Location Editor */}
          <div className="lg:col-span-3">
            {selectedLocation ? (
              <form onSubmit={handleLocationSave}>
                <Card className="glass-card rounded-modern">
                  <CardHeader>
                    <CardTitle>Edit {selectedLocation.name} ({selectedLocation.type})</CardTitle>
                    <CardDescription>Modify content for {selectedLocation.name} with strict section ordering</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Save and Preview Buttons */}
                    <div className="flex justify-end space-x-2">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setJsonPreview(true)}
                      >
                        <FileJson className="w-4 h-4 mr-2" />
                        JSON Preview
                      </Button>
                      <Button 
                        type="button" 
                        variant={previewMode ? "default" : "outline"} 
                        onClick={() => setPreviewMode(!previewMode)}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button type="submit" disabled={saving}>
                        {saving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Content
                          </>
                        )}
                      </Button>
                    </div>

                    {previewMode ? (
                      <div className="border rounded-lg p-4 bg-gray-50">
                        <h3 className="text-lg font-medium mb-2">Page Preview</h3>
                        <p className="text-gray-500 mb-4">Previewing: {locationFormData.canonical_slug || 'Not set'}</p>
                        <iframe 
                          src={locationFormData.canonical_slug || '/'} 
                          className="w-full h-96 border rounded"
                          title="Page Preview"
                          onError={(e) => {
                            e.target.src = '/';
                            console.log('Preview not available for this page');
                          }}
                        />
                      </div>
                    ) : (
                      <Accordion type="multiple" className="space-y-4">
                        {/* BREADCRUMB SECTION */}
                        <AccordionItem value="breadcrumb" className="border rounded-lg">
                          <AccordionTrigger className="px-4 hover:no-underline">
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center">
                                <span className="font-medium">1. Breadcrumb</span>
                                <Badge variant="secondary" className="ml-2">Schema Enhanced</Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={locationFormData.breadcrumb?.enable !== false}
                                  onCheckedChange={(checked) => updateField('breadcrumb', 'enable', checked)}
                                />
                                <span className="text-sm text-muted-foreground">Visible</span>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="breadcrumb-title">Breadcrumb Title</Label>
                                <Input
                                  id="breadcrumb-title"
                                  value={locationFormData.breadcrumb?.breadcrumbTitle || ''}
                                  onChange={(e) => updateField('breadcrumb', 'breadcrumbTitle', e.target.value)}
                                  placeholder="Enter breadcrumb title"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="breadcrumb-schema">Schema Enabled</Label>
                                <div className="flex items-center space-x-2">
                                  <Switch
                                    id="breadcrumb-schema"
                                    checked={locationFormData.breadcrumb?.breadcrumbSchemaEnabled || false}
                                    onCheckedChange={(checked) => updateField('breadcrumb', 'breadcrumbSchemaEnabled', checked)}
                                  />
                                  <span className="text-sm">Enable Schema Markup</span>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* HERO SECTION */}
                        <AccordionItem value="hero" className="border rounded-lg">
                          <AccordionTrigger className="px-4 hover:no-underline">
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center">
                                <span className="font-medium">2. Hero Section</span>
                                <Badge variant="secondary" className="ml-2">Required</Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={true}
                                  disabled
                                />
                                <span className="text-sm text-muted-foreground">Always Visible</span>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="hero-title">H1 Title *</Label>
                                <Input
                                  id="hero-title"
                                  value={locationFormData.hero?.heading || ''}
                                  onChange={(e) => updateField('hero', 'heading', e.target.value)}
                                  placeholder="Enter hero title"
                                  required
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="hero-subtitle">Subtitle</Label>
                                <Input
                                  id="hero-subtitle"
                                  value={locationFormData.hero?.subheading || ''}
                                  onChange={(e) => updateField('hero', 'subheading', e.target.value)}
                                  placeholder="Enter subtitle"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="hero-meta-description">Meta Description</Label>
                              <Textarea
                                id="hero-meta-description"
                                value={locationFormData.meta_description || ''}
                                onChange={(e) => setLocationFormData(prev => ({ ...prev, meta_description: e.target.value }))}
                                placeholder="Enter meta description for SEO"
                                rows={3}
                              />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="hero-primary-label">Primary CTA Label</Label>
                                <Input
                                  id="hero-primary-label"
                                  value={locationFormData.hero?.cta_primary?.text || ''}
                                  onChange={(e) => updateNestedField('hero', 'cta_primary', 'text', e.target.value)}
                                  placeholder="Get Foster Agency Support"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="hero-primary-href">Primary CTA Link</Label>
                                <Input
                                  id="hero-primary-href"
                                  value={locationFormData.hero?.cta_primary?.link || ''}
                                  onChange={(e) => updateNestedField('hero', 'cta_primary', 'link', e.target.value)}
                                  placeholder="/contact"
                                />
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="hero-secondary-label">Secondary CTA Label</Label>
                                <Input
                                  id="hero-secondary-label"
                                  value={locationFormData.hero?.cta_secondary?.text || ''}
                                  onChange={(e) => updateNestedField('hero', 'cta_secondary', 'text', e.target.value)}
                                  placeholder="Explore Regions"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="hero-secondary-href">Secondary CTA Link</Label>
                                <Input
                                  id="hero-secondary-href"
                                  value={locationFormData.hero?.cta_secondary?.link || ''}
                                  onChange={(e) => updateNestedField('hero', 'cta_secondary', 'link', e.target.value)}
                                  placeholder="#regions"
                                />
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="hero-search-placeholder">Search Placeholder</Label>
                              <Input
                                id="hero-search-placeholder"
                                value={locationFormData.hero?.search_placeholder || ''}
                                onChange={(e) => updateField('hero', 'search_placeholder', e.target.value)}
                                placeholder="Search for agencies in England..."
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="hero-image">Hero Image</Label>
                              <div className="flex items-center space-x-2">
                                <Input
                                  id="hero-image"
                                  value={locationFormData.hero?.image || ''}
                                  onChange={(e) => updateField('hero', 'image', e.target.value)}
                                  placeholder="Upload hero image"
                                />
                                <Button type="button" variant="outline">
                                  <Upload className="w-4 h-4 mr-2" />
                                  Upload
                                </Button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* ENGLAND OVERVIEW SECTION */}
                        <AccordionItem value="overview" className="border rounded-lg">
                          <AccordionTrigger className="px-4 hover:no-underline">
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center">
                                <span className="font-medium">3. England Overview Content Block</span>
                                <Badge variant="secondary" className="ml-2">Required</Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={true}
                                  disabled
                                />
                                <span className="text-sm text-muted-foreground">Always Visible</span>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4 space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="overview-heading">Heading *</Label>
                              <Input
                                id="overview-heading"
                                value={locationFormData.overview?.title || ''}
                                onChange={(e) => updateField('overview', 'title', e.target.value)}
                                placeholder="About Fostering in England"
                                required
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="overview-content">Content (Rich Text) *</Label>
                              <Textarea
                                id="overview-content"
                                value={locationFormData.overview?.body || ''}
                                onChange={(e) => updateField('overview', 'body', e.target.value)}
                                placeholder="Enter long-form content (min 500 words)"
                                rows={10}
                                required
                              />
                              <p className="text-xs text-muted-foreground">
                                Minimum 500 words required for comprehensive overview
                              </p>
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="overview-image">Supporting Image (Optional)</Label>
                              <div className="flex items-center space-x-2">
                                <Input
                                  id="overview-image"
                                  value={locationFormData.overview?.image || ''}
                                  onChange={(e) => updateField('overview', 'image', e.target.value)}
                                  placeholder="Upload supporting image"
                                />
                                <Button type="button" variant="outline">
                                  <Upload className="w-4 h-4 mr-2" />
                                  Upload
                                </Button>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* FOSTER SYSTEM SECTION */}
                        <AccordionItem value="foster-system" className="border rounded-lg">
                          <AccordionTrigger className="px-4 hover:no-underline">
                            <div className="flex items-center justify-between w-full">
                              <span className="font-medium">4. Foster System in England Info Section</span>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={locationFormData.fosterSystem?.enabled !== false}
                                  onCheckedChange={(checked) => updateField('fosterSystem', 'enabled', checked)}
                                />
                                <span className="text-sm text-muted-foreground">Visible</span>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4 space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="foster-system-heading">Heading</Label>
                              <Input
                                id="foster-system-heading"
                                value={locationFormData.fosterSystem?.title || ''}
                                onChange={(e) => updateField('fosterSystem', 'title', e.target.value)}
                                placeholder="What is the Foster Care System Like in England?"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="foster-system-subheading">Subheading</Label>
                              <Input
                                id="foster-system-subheading"
                                value={locationFormData.fosterSystem?.description || ''}
                                onChange={(e) => updateField('fosterSystem', 'description', e.target.value)}
                                placeholder="Learn about the regulatory framework and key organizations"
                              />
                            </div>
                            
                            {renderArrayEditor(
                              'fosterSystem',
                              'items',
                              [
                                { name: 'title', label: 'Title', placeholder: 'Allowances & Support' },
                                { name: 'description', label: 'Description', placeholder: 'Weekly fostering allowances to cover child care costs', type: 'textarea' }
                              ],
                              { title: '', description: '' },
                              'System Sections'
                            )}
                          </AccordionContent>
                        </AccordionItem>

                        {/* REASONS TO FOSTER SECTION */}
                        <AccordionItem value="why-foster" className="border rounded-lg">
                          <AccordionTrigger className="px-4 hover:no-underline">
                            <div className="flex items-center justify-between w-full">
                              <span className="font-medium">5. Reasons to Foster in England</span>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={locationFormData.whyFoster?.enabled !== false}
                                  onCheckedChange={(checked) => updateField('whyFoster', 'enabled', checked)}
                                />
                                <span className="text-sm text-muted-foreground">Visible</span>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4 space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="why-foster-heading">Heading</Label>
                              <Input
                                id="why-foster-heading"
                                value={locationFormData.whyFoster?.title || ''}
                                onChange={(e) => updateField('whyFoster', 'title', e.target.value)}
                                placeholder="Why Choose to Foster in England?"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="why-foster-subheading">Subheading</Label>
                              <Input
                                id="why-foster-subheading"
                                value={locationFormData.whyFoster?.description || ''}
                                onChange={(e) => updateField('whyFoster', 'description', e.target.value)}
                                placeholder="Make a meaningful difference in the lives of children in your community"
                              />
                            </div>
                            
                            {renderArrayEditor(
                              'whyFoster',
                              'points',
                              [
                                { name: 'text', label: 'Title', placeholder: 'Help Children Locally' },
                                { name: 'description', label: 'Description', placeholder: 'Provide stable, loving homes for children in your own community who need care and support.', type: 'textarea' }
                              ],
                              { text: '', description: '' },
                              'Reasons to Foster'
                            )}
                          </AccordionContent>
                        </AccordionItem>

                        {/* FEATURED POPULAR AREAS SECTION */}
                        <AccordionItem value="popular-areas" className="border rounded-lg">
                          <AccordionTrigger className="px-4 hover:no-underline">
                            <div className="flex items-center justify-between w-full">
                              <span className="font-medium">6. Featured Popular Areas</span>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={locationFormData.popularLocations?.enabled !== false}
                                  onCheckedChange={(checked) => updateField('popularLocations', 'enabled', checked)}
                                />
                                <span className="text-sm text-muted-foreground">Visible</span>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4 space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="popular-areas-heading">Heading</Label>
                              <Input
                                id="popular-areas-heading"
                                value={locationFormData.popularLocations?.title || ''}
                                onChange={(e) => updateField('popularLocations', 'title', e.target.value)}
                                placeholder="Featured Popular Locations in England"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="popular-areas-subheading">Subheading</Label>
                              <Input
                                id="popular-areas-subheading"
                                value={locationFormData.popularLocations?.description || ''}
                                onChange={(e) => updateField('popularLocations', 'description', e.target.value)}
                                placeholder="Discover top cities and towns in England with high demand for foster carers"
                              />
                            </div>
                            
                            {renderArrayEditor(
                              'popularLocations',
                              'locations',
                              [
                                { name: 'name', label: 'Location Name', placeholder: 'London' },
                                { name: 'link', label: 'Link', placeholder: '/foster-agency/england/london' }
                              ],
                              { name: '', link: '' },
                              'Popular Locations'
                            )}
                          </AccordionContent>
                        </AccordionItem>

                        {/* FULL REGIONS GRID SECTION */}
                        <AccordionItem value="regions-grid" className="border rounded-lg">
                          <AccordionTrigger className="px-4 hover:no-underline">
                            <div className="flex items-center justify-between w-full">
                              <span className="font-medium">7. Full Regions List Grid</span>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={true}
                                  disabled
                                />
                                <span className="text-sm text-muted-foreground">Always Visible</span>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4">
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <div className="flex items-start">
                                <AlertCircle className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                                <div>
                                  <h4 className="font-medium text-blue-800">Auto-Loaded Content</h4>
                                  <p className="text-sm text-blue-700 mt-1">
                                    This section is automatically populated with regions from the database based on the country location_id.
                                    No manual fields are required.
                                  </p>
                                </div>
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>

                        {/* FAQ SECTION */}
                        <AccordionItem value="faqs" className="border rounded-lg">
                          <AccordionTrigger className="px-4 hover:no-underline">
                            <div className="flex items-center justify-between w-full">
                              <div className="flex items-center">
                                <span className="font-medium">8. FAQs About Fostering in England</span>
                                <Badge variant="secondary" className="ml-2">Schema Enabled</Badge>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={locationFormData.faqs?.enabled !== false}
                                  onCheckedChange={(checked) => updateField('faqs', 'enabled', checked)}
                                />
                                <span className="text-sm text-muted-foreground">Visible</span>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4 space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="faqs-heading">Heading</Label>
                              <Input
                                id="faqs-heading"
                                value={locationFormData.faqs?.title || ''}
                                onChange={(e) => updateField('faqs', 'title', e.target.value)}
                                placeholder="FAQs About Fostering in England"
                              />
                            </div>
                            
                            {renderArrayEditor(
                              'faqs',
                              'items',
                              [
                                { name: 'question', label: 'Question', placeholder: 'Do you get paid to foster in England?' },
                                { name: 'answer', label: 'Answer', placeholder: 'Yes, foster carers in England receive a fostering allowance...', type: 'textarea', rows: 4 }
                              ],
                              { question: '', answer: '' },
                              'FAQ Items'
                            )}
                          </AccordionContent>
                        </AccordionItem>

                        {/* REGULATORY & TRUST BAR SECTION */}
                        <AccordionItem value="regulated" className="border rounded-lg">
                          <AccordionTrigger className="px-4 hover:no-underline">
                            <div className="flex items-center justify-between w-full">
                              <span className="font-medium">9. Regulatory & Trust Bar</span>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={locationFormData.regulated?.enabled !== false}
                                  onCheckedChange={(checked) => updateField('regulated', 'enabled', checked)}
                                />
                                <span className="text-sm text-muted-foreground">Visible</span>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4 space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="regulated-heading">Heading</Label>
                              <Input
                                id="regulated-heading"
                                value={locationFormData.regulated?.title || ''}
                                onChange={(e) => updateField('regulated', 'title', e.target.value)}
                                placeholder="Regulated & Trusted by UK Authorities"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="regulated-description">Description</Label>
                              <Textarea
                                id="regulated-description"
                                value={locationFormData.regulated?.description || ''}
                                onChange={(e) => updateField('regulated', 'description', e.target.value)}
                                placeholder="All agencies meet strict regulatory standards"
                                rows={3}
                              />
                            </div>
                            
                            {renderArrayEditor(
                              'regulated',
                              'trustBadges',
                              [
                                { name: 'icon', label: 'Icon', placeholder: 'Shield' },
                                { name: 'label', label: 'Label', placeholder: 'Ofsted Registered' }
                              ],
                              { icon: '', label: '' },
                              'Trust Badges'
                            )}
                          </AccordionContent>
                        </AccordionItem>

                        {/* FINAL CTA SECTION */}
                        <AccordionItem value="final-cta" className="border rounded-lg">
                          <AccordionTrigger className="px-4 hover:no-underline">
                            <div className="flex items-center justify-between w-full">
                              <span className="font-medium">10. Final CTA Section</span>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={locationFormData.finalCta?.enabled !== false}
                                  onCheckedChange={(checked) => updateField('finalCta', 'enabled', checked)}
                                />
                                <span className="text-sm text-muted-foreground">Visible</span>
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="px-4 pb-4 space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="final-cta-heading">Heading</Label>
                              <Input
                                id="final-cta-heading"
                                value={locationFormData.finalCta?.title || ''}
                                onChange={(e) => updateField('finalCta', 'title', e.target.value)}
                                placeholder="Ready to Start Your Fostering Journey?"
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="final-cta-subheading">Subheading</Label>
                              <Input
                                id="final-cta-subheading"
                                value={locationFormData.finalCta?.description || ''}
                                onChange={(e) => updateField('finalCta', 'description', e.target.value)}
                                placeholder="Take the first step towards making a difference in a child's life in England"
                              />
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="final-cta-button-label">Button Label</Label>
                                <Input
                                  id="final-cta-button-label"
                                  value={locationFormData.finalCta?.cta_primary?.label || ''}
                                  onChange={(e) => updateNestedField('finalCta', 'cta_primary', 'label', e.target.value)}
                                  placeholder="Talk to a Foster Advisor"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="final-cta-button-href">Button Link</Label>
                                <Input
                                  id="final-cta-button-href"
                                  value={locationFormData.finalCta?.cta_primary?.href || ''}
                                  onChange={(e) => updateNestedField('finalCta', 'cta_primary', 'href', e.target.value)}
                                  placeholder="/contact"
                                />
                              </div>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    )}

                    {/* Save Button at Bottom */}
                    <div className="flex justify-end pt-4 border-t">
                      <Button type="submit" disabled={saving} size="lg">
                        {saving ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            Saving Content...
                          </>
                        ) : (
                          <>
                            <Save className="w-4 h-4 mr-2" />
                            Save Country Content
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            ) : (
              <Card className="glass-card rounded-modern">
                <CardContent className="py-12">
                  <div className="text-center mb-8">
                    <div className="w-12 h-12 text-gray-400 mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium mb-2">Select a Country to Edit</h3>
                    <p className="text-gray-500">Choose a country from the sidebar to start editing its content</p>
                  </div>
                  
                  <div className="max-w-2xl mx-auto bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-800 mb-2">Editor Guidelines</h4>
                    <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
                      <li>Content follows strict section ordering (non-reorderable)</li>
                      <li>Hero and Overview sections are required and always visible</li>
                      <li>All other sections can be toggled on/off</li>
                      <li>Sortable lists only available for array fields (FAQs, reasons, locations, etc.)</li>
                      <li>Auto-formatted JSON with validation on save</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* JSON Preview Modal */}
      {jsonPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center border-b p-4">
              <h3 className="text-lg font-medium">JSON Preview</h3>
              <Button variant="ghost" onClick={() => setJsonPreview(false)}>
                ×
              </Button>
            </div>
            <div className="p-4 overflow-auto max-h-[calc(90vh-4rem)]">
              <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto">
                {JSON.stringify(locationFormData, null, 2)}
              </pre>
            </div>
            <div className="border-t p-4 flex justify-end">
              <Button onClick={() => setJsonPreview(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}