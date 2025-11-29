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

export default function LocationEditor({ params }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [locationContent, setLocationContent] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationFormData, setLocationFormData] = useState({});
  const [previewMode, setPreviewMode] = useState(false);
  const [jsonPreview, setJsonPreview] = useState(false);
  const [locationId, setLocationId] = useState(null);

  useEffect(() => {
    // Get the location ID from params
    const fetchParams = async () => {
      const resolvedParams = await params;
      setLocationId(resolvedParams.id);
    };
    
    fetchParams();
  }, [params]);

  useEffect(() => {
    if (locationId) {
      // TEMPORARILY DISABLED ADMIN CHECK FOR TESTING
      setIsAdmin(true);
      fetchLocationContent();
      loadLocationDetails(locationId);
    }
  }, [locationId]);

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

  const loadLocationDetails = async (id) => {
    try {
      const response = await fetch(`/api/admin/locations/${id}`);
      if (response.ok) {
        const data = await response.json();
        setSelectedLocation(data.location);
        // Load content for this location
        loadLocationContentById(id);
      }
    } catch (error) {
      console.error('Error loading location details:', error);
    }
  };

  // Enhanced load function with better error handling
  const loadLocationContentById = async (locationId) => {
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
        type: selectedLocation.type || selectedLocation.template_type
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
      loadLocationContentById(content.id);
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
    loadLocationContentById(selectedLocation.id);
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

  // Render the appropriate template based on location type
  const renderTemplateSections = () => {
    if (!selectedLocation) return null;
    
    const templateType = selectedLocation.template_type || selectedLocation.type;
    
    switch (templateType) {
      case 'country':
        return (
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
        );
        
      case 'region':
        return (
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
                      placeholder="Explore Cities"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero-secondary-href">Secondary CTA Link</Label>
                    <Input
                      id="hero-secondary-href"
                      value={locationFormData.hero?.cta_secondary?.link || ''}
                      onChange={(e) => updateNestedField('hero', 'cta_secondary', 'link', e.target.value)}
                      placeholder="#cities"
                    />
                  </div>
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

            {/* ABOUT FOSTERING IN REGION */}
            <AccordionItem value="about" className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">3. About Fostering in Region</span>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={locationFormData.about?.enabled !== false}
                      onCheckedChange={(checked) => updateField('about', 'enabled', checked)}
                    />
                    <span className="text-sm text-muted-foreground">Visible</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="about-heading">Heading</Label>
                  <Input
                    id="about-heading"
                    value={locationFormData.about?.title || ''}
                    onChange={(e) => updateField('about', 'title', e.target.value)}
                    placeholder="About Fostering in [Region]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="about-content">Content (Rich Text) *</Label>
                  <Textarea
                    id="about-content"
                    value={locationFormData.about?.body || ''}
                    onChange={(e) => updateField('about', 'body', e.target.value)}
                    placeholder="Enter content (350-600 words)"
                    rows={10}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    350-600 words required for comprehensive overview
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* BENEFITS & SUPPORT */}
            <AccordionItem value="benefits" className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">4. Benefits & Support</span>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={locationFormData.benefits?.enabled !== false}
                      onCheckedChange={(checked) => updateField('benefits', 'enabled', checked)}
                    />
                    <span className="text-sm text-muted-foreground">Visible</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="benefits-heading">Heading</Label>
                  <Input
                    id="benefits-heading"
                    value={locationFormData.benefits?.title || ''}
                    onChange={(e) => updateField('benefits', 'title', e.target.value)}
                    placeholder="Benefits of Fostering Locally in [Region]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="benefits-description">Description</Label>
                  <Textarea
                    id="benefits-description"
                    value={locationFormData.benefits?.description || ''}
                    onChange={(e) => updateField('benefits', 'description', e.target.value)}
                    placeholder="Discover the advantages of becoming a foster carer in your local community"
                    rows={3}
                  />
                </div>
                
                {renderArrayEditor(
                  'benefits',
                  'items',
                  [
                    { name: 'title', label: 'Title', placeholder: 'Community Connection' },
                    { name: 'description', label: 'Description', placeholder: 'Build strong relationships within your local community.', type: 'textarea' }
                  ],
                  { title: '', description: '' },
                  'Benefits'
                )}
              </AccordionContent>
            </AccordionItem>

            {/* POPULAR CITIES */}
            <AccordionItem value="popular-cities" className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">5. Popular Cities</span>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={locationFormData.popularCities?.enabled !== false}
                      onCheckedChange={(checked) => updateField('popularCities', 'enabled', checked)}
                    />
                    <span className="text-sm text-muted-foreground">Visible</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="popular-cities-heading">Heading</Label>
                  <Input
                    id="popular-cities-heading"
                    value={locationFormData.popularCities?.title || ''}
                    onChange={(e) => updateField('popularCities', 'title', e.target.value)}
                    placeholder="Popular Cities in [Region]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="popular-cities-description">Description</Label>
                  <Textarea
                    id="popular-cities-description"
                    value={locationFormData.popularCities?.description || ''}
                    onChange={(e) => updateField('popularCities', 'description', e.target.value)}
                    placeholder="Explore fostering opportunities in key cities across [Region]"
                    rows={3}
                  />
                </div>
                
                {renderArrayEditor(
                  'popularCities',
                  'cities',
                  [
                    { name: 'name', label: 'City Name', placeholder: 'Central [Region]' },
                    { name: 'link', label: 'Link', placeholder: '#' },
                    { name: 'population', label: 'Population', placeholder: 'Varies' },
                    { name: 'reason', label: 'Reason', placeholder: 'The heart of [Region] with excellent fostering opportunities...', type: 'textarea' }
                  ],
                  { name: '', link: '', population: '', reason: '' },
                  'Cities'
                )}
              </AccordionContent>
            </AccordionItem>

            {/* ALLOWANCES & SUPPORT */}
            <AccordionItem value="allowances" className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">6. Allowances & Support</span>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={locationFormData.allowances?.enabled !== false}
                      onCheckedChange={(checked) => updateField('allowances', 'enabled', checked)}
                    />
                    <span className="text-sm text-muted-foreground">Visible</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="allowances-heading">Heading</Label>
                  <Input
                    id="allowances-heading"
                    value={locationFormData.allowances?.title || ''}
                    onChange={(e) => updateField('allowances', 'title', e.target.value)}
                    placeholder="Foster Care Allowances & Support in [Region]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="allowances-description">Description</Label>
                  <Textarea
                    id="allowances-description"
                    value={locationFormData.allowances?.description || ''}
                    onChange={(e) => updateField('allowances', 'description', e.target.value)}
                    placeholder="Comprehensive support system for foster carers in [Region]"
                    rows={3}
                  />
                </div>
                
                {renderArrayEditor(
                  'allowances',
                  'allowances',
                  [
                    { name: 'title', label: 'Title', placeholder: 'Weekly fostering allowances to cover child care costs' },
                    { name: 'description', label: 'Description', placeholder: 'Receive weekly fostering allowances to cover the costs of caring for a child.', type: 'textarea' }
                  ],
                  { title: '', description: '' },
                  'Allowances'
                )}
              </AccordionContent>
            </AccordionItem>

            {/* TESTIMONIALS */}
            <AccordionItem value="testimonials" className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">7. Testimonials</span>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={locationFormData.testimonials?.enabled !== false}
                      onCheckedChange={(checked) => updateField('testimonials', 'enabled', checked)}
                    />
                    <span className="text-sm text-muted-foreground">Visible</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="testimonials-heading">Heading</Label>
                  <Input
                    id="testimonials-heading"
                    value={locationFormData.testimonials?.title || ''}
                    onChange={(e) => updateField('testimonials', 'title', e.target.value)}
                    placeholder="Hear From Foster Carers in [Region]"
                  />
                </div>
                
                {renderArrayEditor(
                  'testimonials',
                  'testimonials',
                  [
                    { name: 'name', label: 'Name', placeholder: 'Sarah Johnson' },
                    { name: 'location', label: 'Location', placeholder: 'Manchester' },
                    { name: 'quote', label: 'Quote', placeholder: 'Finding the right agency was overwhelming until we discovered this directory...', type: 'textarea' },
                    { name: 'rating', label: 'Rating (1-5)', placeholder: '5' }
                  ],
                  { name: '', location: '', quote: '', rating: '5' },
                  'Testimonials'
                )}
              </AccordionContent>
            </AccordionItem>

            {/* FAQ SECTION */}
            <AccordionItem value="faqs" className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <span className="font-medium">8. FAQs</span>
                    <Badge variant="secondary" className="ml-2">Schema Enabled</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={locationFormData.faq?.enabled !== false}
                      onCheckedChange={(checked) => updateField('faq', 'enabled', checked)}
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
                    value={locationFormData.faq?.title || ''}
                    onChange={(e) => updateField('faq', 'title', e.target.value)}
                    placeholder="Region-Specific FAQs About Fostering in [Region]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="faqs-description">Description</Label>
                  <Textarea
                    id="faqs-description"
                    value={locationFormData.faq?.description || ''}
                    onChange={(e) => updateField('faq', 'description', e.target.value)}
                    placeholder="Get answers to common questions about becoming a foster carer in [Region]"
                    rows={3}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="faq-schema"
                    checked={locationFormData.faq?.enableFaqSchema || false}
                    onCheckedChange={(checked) => updateField('faq', 'enableFaqSchema', checked)}
                  />
                  <Label htmlFor="faq-schema">Enable FAQ Schema</Label>
                </div>
                
                {renderArrayEditor(
                  'faq',
                  'faqs',
                  [
                    { name: 'question', label: 'Question', placeholder: 'How many foster families are needed in [Region]?' },
                    { name: 'answer', label: 'Answer', placeholder: '[Region] has a continuous need for foster families...', type: 'textarea', rows: 4 }
                  ],
                  { question: '', answer: '' },
                  'FAQ Items'
                )}
              </AccordionContent>
            </AccordionItem>

            {/* TRUST & REGULATION BAR */}
            <AccordionItem value="trust-bar" className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">9. Trust & Regulation Bar</span>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={locationFormData.trustBar?.enabled !== false}
                      onCheckedChange={(checked) => updateField('trustBar', 'enabled', checked)}
                    />
                    <span className="text-sm text-muted-foreground">Visible</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="trust-bar-heading">Heading</Label>
                  <Input
                    id="trust-bar-heading"
                    value={locationFormData.trustBar?.title || ''}
                    onChange={(e) => updateField('trustBar', 'title', e.target.value)}
                    placeholder="Local Authority & Regulation Trust Bar"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="trust-bar-authority">Authority Name</Label>
                    <Input
                      id="trust-bar-authority"
                      value={locationFormData.trustBar?.authorityName || ''}
                      onChange={(e) => updateField('trustBar', 'authorityName', e.target.value)}
                      placeholder="Ofsted"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trust-bar-url">Authority URL</Label>
                    <Input
                      id="trust-bar-url"
                      value={locationFormData.trustBar?.authorityUrl || ''}
                      onChange={(e) => updateField('trustBar', 'authorityUrl', e.target.value)}
                      placeholder="https://www.ofsted.gov.uk"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="trust-bar-ofsted">Ofsted/Regulation Note</Label>
                  <Textarea
                    id="trust-bar-ofsted"
                    value={locationFormData.trustBar?.ofstedNote || ''}
                    onChange={(e) => updateField('trustBar', 'ofstedNote', e.target.value)}
                    placeholder="All agencies meet strict regulatory standards"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="trust-bar-safeguarding">Safeguarding Note (optional)</Label>
                  <Textarea
                    id="trust-bar-safeguarding"
                    value={locationFormData.trustBar?.safeguardingNote || ''}
                    onChange={(e) => updateField('trustBar', 'safeguardingNote', e.target.value)}
                    placeholder="Comprehensive safeguarding policies in place"
                    rows={3}
                  />
                </div>
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
                  <Label htmlFor="final-cta-subtitle">Subtitle</Label>
                  <Textarea
                    id="final-cta-subtitle"
                    value={locationFormData.finalCta?.subtitle || ''}
                    onChange={(e) => updateField('finalCta', 'subtitle', e.target.value)}
                    placeholder="Take the first step towards making a difference in a child's life in [Region]"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="final-cta-primary-label">Primary Button Label</Label>
                    <Input
                      id="final-cta-primary-label"
                      value={locationFormData.finalCta?.primaryCta?.label || ''}
                      onChange={(e) => updateNestedField('finalCta', 'primaryCta', 'label', e.target.value)}
                      placeholder="Talk to a Foster Advisor"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="final-cta-primary-href">Primary Button Link</Label>
                    <Input
                      id="final-cta-primary-href"
                      value={locationFormData.finalCta?.primaryCta?.href || ''}
                      onChange={(e) => updateNestedField('finalCta', 'primaryCta', 'href', e.target.value)}
                      placeholder="/contact"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="final-cta-secondary-label">Secondary Button Label</Label>
                    <Input
                      id="final-cta-secondary-label"
                      value={locationFormData.finalCta?.secondaryCta?.label || ''}
                      onChange={(e) => updateNestedField('finalCta', 'secondaryCta', 'label', e.target.value)}
                      placeholder="Download Information Pack"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="final-cta-secondary-href">Secondary Button Link</Label>
                    <Input
                      id="final-cta-secondary-href"
                      value={locationFormData.finalCta?.secondaryCta?.href || ''}
                      onChange={(e) => updateNestedField('finalCta', 'secondaryCta', 'href', e.target.value)}
                      placeholder="#"
                    />
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        );
        
      case 'city':
        return (
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
                      placeholder="Talk to a Foster Advisor"
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
                      placeholder="View Agencies"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero-secondary-href">Secondary CTA Link</Label>
                    <Input
                      id="hero-secondary-href"
                      value={locationFormData.hero?.cta_secondary?.link || ''}
                      onChange={(e) => updateNestedField('hero', 'cta_secondary', 'link', e.target.value)}
                      placeholder="#agencies"
                    />
                  </div>
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

            {/* OVERVIEW */}
            <AccordionItem value="overview" className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">3. Overview (400–500 words)</span>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={locationFormData.about?.enabled !== false}
                      onCheckedChange={(checked) => updateField('about', 'enabled', checked)}
                    />
                    <span className="text-sm text-muted-foreground">Visible</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="overview-heading">Heading</Label>
                  <Input
                    id="overview-heading"
                    value={locationFormData.about?.title || ''}
                    onChange={(e) => updateField('about', 'title', e.target.value)}
                    placeholder="About Fostering in [City]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="overview-content">Content (Rich Text) *</Label>
                  <Textarea
                    id="overview-content"
                    value={locationFormData.about?.body || ''}
                    onChange={(e) => updateField('about', 'body', e.target.value)}
                    placeholder="Enter content (400-500 words)"
                    rows={10}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    400-500 words required for comprehensive overview
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* TYPES OF FOSTERING */}
            <AccordionItem value="types" className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">4. Types of Fostering</span>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={locationFormData.types?.enabled !== false}
                      onCheckedChange={(checked) => updateField('types', 'enabled', checked)}
                    />
                    <span className="text-sm text-muted-foreground">Visible</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="types-heading">Heading</Label>
                  <Input
                    id="types-heading"
                    value={locationFormData.types?.title || ''}
                    onChange={(e) => updateField('types', 'title', e.target.value)}
                    placeholder="Types of Fostering Available in [City]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="types-description">Description</Label>
                  <Textarea
                    id="types-description"
                    value={locationFormData.types?.description || ''}
                    onChange={(e) => updateField('types', 'description', e.target.value)}
                    placeholder="Various fostering opportunities are available to suit different circumstances and preferences"
                    rows={3}
                  />
                </div>
                
                {renderArrayEditor(
                  'types',
                  'items',
                  [
                    { name: 'name', label: 'Type Name', placeholder: 'Short-term Fostering' },
                    { name: 'description', label: 'Description', placeholder: 'Providing temporary care for children while plans are made for their future...', type: 'textarea' }
                  ],
                  { name: '', description: '' },
                  'Fostering Types'
                )}
              </AccordionContent>
            </AccordionItem>

            {/* TOP AGENCIES */}
            <AccordionItem value="top-agencies" className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">5. Top Agencies (AUTO FILTER BY location_id)</span>
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
                        This section is automatically populated with agencies filtered by city_id.
                        No manual fields are required.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mt-4">
                  <Label htmlFor="top-agencies-heading">Heading</Label>
                  <Input
                    id="top-agencies-heading"
                    value={locationFormData.topAgencies?.title || ''}
                    onChange={(e) => updateField('topAgencies', 'title', e.target.value)}
                    placeholder="Top Foster Agencies in [City]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="top-agencies-description">Description</Label>
                  <Textarea
                    id="top-agencies-description"
                    value={locationFormData.topAgencies?.description || ''}
                    onChange={(e) => updateField('topAgencies', 'description', e.target.value)}
                    placeholder="Connect with trusted fostering services in your local area"
                    rows={3}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* WHY FOSTER IN CITY */}
            <AccordionItem value="why-foster" className="border rounded-lg">
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex items-center justify-between w-full">
                  <span className="font-medium">6. Why Foster in City</span>
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
