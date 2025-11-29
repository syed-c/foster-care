'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  PlusCircle, 
  Trash2, 
  Eye, 
  Save, 
  AlertCircle, 
  CheckCircle2,
  ExternalLink,
  Upload
} from 'lucide-react';

export default function LocationPageEditor() {
  // State for page type and location selection
  const [pageType, setPageType] = useState('country');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  
  // State for canonical slug
  const [canonicalSlug, setCanonicalSlug] = useState('');
  
  // State for SEO fields
  const [title, setTitle] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  
  // State for sections
  const [heroSection, setHeroSection] = useState({
    heading: '',
    subheading: '',
    content: '',
    backgroundImage: '',
    ctaText: '',
    ctaLink: ''
  });
  
  const [overviewContent, setOverviewContent] = useState('');
  
  const [fosterSystemInfo, setFosterSystemInfo] = useState({
    heading: '',
    subheading: '',
    description: '',
    items: [{ title: '', description: '' }]
  });
  
  const [reasonsToFoster, setReasonsToFoster] = useState({
    heading: '',
    subheading: '',
    items: [{ icon: '', title: '', description: '' }]
  });
  
  const [featuredAreas, setFeaturedAreas] = useState([{ name: '', slug: '', link: '' }]);
  
  const [regionsGrid, setRegionsGrid] = useState({
    visible: true,
    regions: []
  });
  
  const [faqs, setFaqs] = useState([{ question: '', answer: '' }]);
  
  const [regulatoryBar, setRegulatoryBar] = useState([{ logo: '', name: '' }]);
  
  const [finalCta, setFinalCta] = useState({
    heading: '',
    subheading: '',
    ctaText: '',
    ctaLink: ''
  });

  // Generate canonical slug based on selections
  useEffect(() => {
    let slug = '/foster-agency';
    
    if (selectedCountry) {
      slug += `/${selectedCountry}`;
      
      if (pageType === 'region' && selectedRegion) {
        slug += `/${selectedRegion}`;
      } else if (pageType === 'city' && selectedRegion && selectedCity) {
        slug += `/${selectedRegion}/${selectedCity}`;
      }
    }
    
    setCanonicalSlug(slug);
  }, [pageType, selectedCountry, selectedRegion, selectedCity]);

  // Section completeness indicators
  const isSectionComplete = (sectionData) => {
    if (!sectionData) return false;
    
    if (typeof sectionData === 'string') {
      return sectionData.trim().length > 0;
    }
    
    if (typeof sectionData === 'object') {
      // Check if it's an array
      if (Array.isArray(sectionData)) {
        return sectionData.length > 0 && sectionData.every(item => 
          Object.values(item).some(val => val && val.toString().trim().length > 0)
        );
      }
      
      // Check if it's an object
      return Object.values(sectionData).some(val => 
        val && (typeof val === 'string' ? val.trim().length > 0 : true)
      );
    }
    
    return false;
  };

  // Handle adding new items to repeatable sections
  const addItem = (section, setter) => {
    setter(prev => [...prev, {}]);
  };

  // Handle removing items from repeatable sections
  const removeItem = (index, setter) => {
    setter(prev => prev.filter((_, i) => i !== index));
  };

  // Handle input changes for nested objects
  const handleNestedChange = (sectionSetter, field, value, index = null, subField = null) => {
    sectionSetter(prev => {
      if (index !== null && subField !== null) {
        // Handle array of objects
        const newArray = [...prev];
        newArray[index] = { ...newArray[index], [subField]: value };
        return newArray;
      } else if (index !== null) {
        // Handle array of simple values
        const newArray = [...prev];
        newArray[index] = value;
        return newArray;
      } else {
        // Handle simple object
        return { ...prev, [field]: value };
      }
    });
  };

  // Save page data
  const savePage = async () => {
    // In a real implementation, this would save to Supabase
    console.log('Saving page data:', {
      pageType,
      canonicalSlug,
      title,
      metaTitle,
      metaDescription,
      sections: {
        heroSection,
        overviewContent,
        fosterSystemInfo,
        reasonsToFoster,
        featuredAreas,
        regionsGrid,
        faqs,
        regulatoryBar,
        finalCta
      }
    });
    
    // Show success message
    alert('Page saved successfully!');
  };

  // Get sections based on page type
  const getSectionsForPageType = () => {
    switch (pageType) {
      case 'country':
        return [
          { id: 'hero', title: 'Hero Section', component: renderHeroSection() },
          { id: 'overview', title: 'Overview Content', component: renderOverviewContent() },
          { id: 'fosterSystem', title: 'Foster System Info', component: renderFosterSystemInfo() },
          { id: 'reasons', title: 'Reasons to Foster', component: renderReasonsToFoster() },
          { id: 'featuredAreas', title: 'Featured Popular Areas', component: renderFeaturedAreas() },
          { id: 'regionsGrid', title: 'Regions Grid', component: renderRegionsGrid() },
          { id: 'faqs', title: 'FAQs', component: renderFaqs() },
          { id: 'regulatory', title: 'Regulatory & Trust Bar', component: renderRegulatoryBar() },
          { id: 'finalCta', title: 'Final CTA Section', component: renderFinalCta() }
        ];
      case 'region':
        return [
          { id: 'hero', title: 'Hero Section', component: renderHeroSection() },
          { id: 'overview', title: 'About Fostering in Region', component: renderOverviewContent() },
          { id: 'benefits', title: 'Benefits & Support', component: renderFosterSystemInfo() },
          { id: 'popularCities', title: 'Popular Cities in Region', component: renderFeaturedAreas() },
          { id: 'allowances', title: 'Allowances & Support Info', component: renderOverviewContent() },
          { id: 'testimonials', title: 'Testimonials', component: renderReasonsToFoster() },
          { id: 'faqs', title: 'Region FAQs', component: renderFaqs() },
          { id: 'trust', title: 'Trust Bar', component: renderRegulatoryBar() },
          { id: 'finalCta', title: 'Final CTA', component: renderFinalCta() }
        ];
      case 'city':
        return [
          { id: 'hero', title: 'Hero Section', component: renderHeroSection() },
          { id: 'overview', title: 'City Overview Content', component: renderOverviewContent() },
          { id: 'types', title: 'Types of Fostering', component: renderReasonsToFoster() },
          { id: 'agencies', title: 'Top Agencies', component: renderFeaturedAreas() },
          { id: 'reasons', title: 'Reasons to Foster in City', component: renderFosterSystemInfo() },
          { id: 'allowances', title: 'Allowances & Support in City', component: renderOverviewContent() },
          { id: 'resources', title: 'Local Support Resources', component: renderFosterSystemInfo() },
          { id: 'faqs', title: 'FAQ Section', component: renderFaqs() },
          { id: 'regulation', title: 'Regulation / Trust Bar', component: renderRegulatoryBar() },
          { id: 'finalCta', title: 'Final CTA', component: renderFinalCta() }
        ];
      default:
        return [];
    }
  };

  // Render Hero Section
  const renderHeroSection = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="hero-heading">Heading</Label>
        <Input
          id="hero-heading"
          value={heroSection.heading}
          onChange={(e) => setHeroSection({...heroSection, heading: e.target.value})}
          placeholder="Enter hero heading"
        />
      </div>
      <div>
        <Label htmlFor="hero-subheading">Subheading</Label>
        <Input
          id="hero-subheading"
          value={heroSection.subheading}
          onChange={(e) => setHeroSection({...heroSection, subheading: e.target.value})}
          placeholder="Enter hero subheading"
        />
      </div>
      <div>
        <Label htmlFor="hero-content">Content</Label>
        <Textarea
          id="hero-content"
          value={heroSection.content}
          onChange={(e) => setHeroSection({...heroSection, content: e.target.value})}
          placeholder="Enter hero content"
          rows={4}
        />
      </div>
      <div>
        <Label htmlFor="hero-bg-image">Background Image URL</Label>
        <div className="flex gap-2">
          <Input
            id="hero-bg-image"
            value={heroSection.backgroundImage}
            onChange={(e) => setHeroSection({...heroSection, backgroundImage: e.target.value})}
            placeholder="Enter background image URL"
          />
          <Button variant="outline" size="icon">
            <Upload className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="hero-cta-text">CTA Text</Label>
          <Input
            id="hero-cta-text"
            value={heroSection.ctaText}
            onChange={(e) => setHeroSection({...heroSection, ctaText: e.target.value})}
            placeholder="Enter CTA text"
          />
        </div>
        <div>
          <Label htmlFor="hero-cta-link">CTA Link</Label>
          <Input
            id="hero-cta-link"
            value={heroSection.ctaLink}
            onChange={(e) => setHeroSection({...heroSection, ctaLink: e.target.value})}
            placeholder="Enter CTA link"
          />
        </div>
      </div>
    </div>
  );

  // Render Overview Content
  const renderOverviewContent = () => (
    <div>
      <Label htmlFor="overview-content">Content (500-700 words)</Label>
      <Textarea
        id="overview-content"
        value={overviewContent}
        onChange={(e) => setOverviewContent(e.target.value)}
        placeholder="Enter overview content"
        rows={10}
      />
      <div className="text-right text-sm text-gray-500 mt-1">
        {overviewContent.length} characters
      </div>
    </div>
  );

  // Render Foster System Info
  const renderFosterSystemInfo = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="foster-heading">Heading</Label>
        <Input
          id="foster-heading"
          value={fosterSystemInfo.heading}
          onChange={(e) => setFosterSystemInfo({...fosterSystemInfo, heading: e.target.value})}
          placeholder="Enter heading"
        />
      </div>
      <div>
        <Label htmlFor="foster-subheading">Subheading</Label>
        <Input
          id="foster-subheading"
          value={fosterSystemInfo.subheading}
          onChange={(e) => setFosterSystemInfo({...fosterSystemInfo, subheading: e.target.value})}
          placeholder="Enter subheading"
        />
      </div>
      <div>
        <Label htmlFor="foster-description">Description</Label>
        <Textarea
          id="foster-description"
          value={fosterSystemInfo.description}
          onChange={(e) => setFosterSystemInfo({...fosterSystemInfo, description: e.target.value})}
          placeholder="Enter description"
          rows={4}
        />
      </div>
      <div>
        <Label>Items</Label>
        {fosterSystemInfo.items.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 mt-2 p-4 border rounded-lg">
            <div>
              <Label htmlFor={`item-title-${index}`}>Title</Label>
              <Input
                id={`item-title-${index}`}
                value={item.title}
                onChange={(e) => handleNestedChange(
                  (prev) => ({...prev, items: prev.items.map((item, i) => i === index ? {...item, title: e.target.value} : item)}),
                  'items',
                  e.target.value,
                  index,
                  'title'
                )}
                placeholder="Enter title"
              />
            </div>
            <div>
              <Label htmlFor={`item-desc-${index}`}>Description</Label>
              <Input
                id={`item-desc-${index}`}
                value={item.description}
                onChange={(e) => handleNestedChange(
                  (prev) => ({...prev, items: prev.items.map((item, i) => i === index ? {...item, description: e.target.value} : item)}),
                  'items',
                  e.target.value,
                  index,
                  'description'
                )}
                placeholder="Enter description"
              />
            </div>
            <div className="col-span-2 flex justify-end">
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => setFosterSystemInfo({
                  ...fosterSystemInfo,
                  items: fosterSystemInfo.items.filter((_, i) => i !== index)
                })}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <Button 
          variant="outline" 
          className="w-full mt-2" 
          onClick={() => setFosterSystemInfo({
            ...fosterSystemInfo,
            items: [...fosterSystemInfo.items, { title: '', description: '' }]
          })}
        >
          <PlusCircle className="h-4 w-4 mr-2" /> Add Item
        </Button>
      </div>
    </div>
  );

  // Render Reasons to Foster
  const renderReasonsToFoster = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="reasons-heading">Heading</Label>
        <Input
          id="reasons-heading"
          value={reasonsToFoster.heading}
          onChange={(e) => setReasonsToFoster({...reasonsToFoster, heading: e.target.value})}
          placeholder="Enter heading"
        />
      </div>
      <div>
        <Label htmlFor="reasons-subheading">Subheading</Label>
        <Input
          id="reasons-subheading"
          value={reasonsToFoster.subheading}
          onChange={(e) => setReasonsToFoster({...reasonsToFoster, subheading: e.target.value})}
          placeholder="Enter subheading"
        />
      </div>
      <div>
        <Label>Items</Label>
        {reasonsToFoster.items.map((item, index) => (
          <div key={index} className="grid grid-cols-3 gap-4 mt-2 p-4 border rounded-lg">
            <div>
              <Label htmlFor={`reason-icon-${index}`}>Icon</Label>
              <Input
                id={`reason-icon-${index}`}
                value={item.icon}
                onChange={(e) => handleNestedChange(
                  (prev) => ({...prev, items: prev.items.map((item, i) => i === index ? {...item, icon: e.target.value} : item)}),
                  'items',
                  e.target.value,
                  index,
                  'icon'
                )}
                placeholder="Enter icon name"
              />
            </div>
            <div>
              <Label htmlFor={`reason-title-${index}`}>Title</Label>
              <Input
                id={`reason-title-${index}`}
                value={item.title}
                onChange={(e) => handleNestedChange(
                  (prev) => ({...prev, items: prev.items.map((item, i) => i === index ? {...item, title: e.target.value} : item)}),
                  'items',
                  e.target.value,
                  index,
                  'title'
                )}
                placeholder="Enter title"
              />
            </div>
            <div>
              <Label htmlFor={`reason-desc-${index}`}>Description</Label>
              <Input
                id={`reason-desc-${index}`}
                value={item.description}
                onChange={(e) => handleNestedChange(
                  (prev) => ({...prev, items: prev.items.map((item, i) => i === index ? {...item, description: e.target.value} : item)}),
                  'items',
                  e.target.value,
                  index,
                  'description'
                )}
                placeholder="Enter description"
              />
            </div>
            <div className="col-span-3 flex justify-end">
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => setReasonsToFoster({
                  ...reasonsToFoster,
                  items: reasonsToFoster.items.filter((_, i) => i !== index)
                })}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        <Button 
          variant="outline" 
          className="w-full mt-2" 
          onClick={() => setReasonsToFoster({
            ...reasonsToFoster,
            items: [...reasonsToFoster.items, { icon: '', title: '', description: '' }]
          })}
        >
          <PlusCircle className="h-4 w-4 mr-2" /> Add Item
        </Button>
      </div>
    </div>
  );

  // Render Featured Areas
  const renderFeaturedAreas = () => (
    <div>
      <Label>Locations</Label>
      {featuredAreas.map((area, index) => (
        <div key={index} className="grid grid-cols-3 gap-4 mt-2 p-4 border rounded-lg">
          <div>
            <Label htmlFor={`area-name-${index}`}>Name</Label>
            <Input
              id={`area-name-${index}`}
              value={area.name}
              onChange={(e) => handleNestedChange(
                (prev) => prev.map((item, i) => i === index ? {...item, name: e.target.value} : item),
                null,
                e.target.value,
                index,
                'name'
              )}
              placeholder="Enter name"
            />
          </div>
          <div>
            <Label htmlFor={`area-slug-${index}`}>Slug</Label>
            <Input
              id={`area-slug-${index}`}
              value={area.slug}
              onChange={(e) => handleNestedChange(
                (prev) => prev.map((item, i) => i === index ? {...item, slug: e.target.value} : item),
                null,
                e.target.value,
                index,
                'slug'
              )}
              placeholder="Enter slug"
            />
          </div>
          <div>
            <Label htmlFor={`area-link-${index}`}>Link</Label>
            <Input
              id={`area-link-${index}`}
              value={area.link}
              onChange={(e) => handleNestedChange(
                (prev) => prev.map((item, i) => i === index ? {...item, link: e.target.value} : item),
                null,
                e.target.value,
                index,
                'link'
              )}
              placeholder="Enter link"
            />
          </div>
          <div className="col-span-3 flex justify-end">
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => setFeaturedAreas(
                featuredAreas.filter((_, i) => i !== index)
              )}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <Button 
        variant="outline" 
        className="w-full mt-2" 
        onClick={() => setFeaturedAreas([...featuredAreas, { name: '', slug: '', link: '' }])}
      >
        <PlusCircle className="h-4 w-4 mr-2" /> Add Location
      </Button>
    </div>
  );

  // Render Regions Grid
  const renderRegionsGrid = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="regions-visible">Visible</Label>
        <Switch
          id="regions-visible"
          checked={regionsGrid.visible}
          onCheckedChange={(checked) => setRegionsGrid({...regionsGrid, visible: checked})}
        />
      </div>
      <div>
        <Label>Regions</Label>
        <div className="text-sm text-gray-500 mt-1">
          Regions will be dynamically fetched from the Supabase locations table
        </div>
      </div>
    </div>
  );

  // Render FAQs
  const renderFaqs = () => (
    <div>
      <Label>FAQs</Label>
      {faqs.map((faq, index) => (
        <div key={index} className="grid grid-cols-1 gap-4 mt-2 p-4 border rounded-lg">
          <div>
            <Label htmlFor={`faq-question-${index}`}>Question</Label>
            <Input
              id={`faq-question-${index}`}
              value={faq.question}
              onChange={(e) => handleNestedChange(
                (prev) => prev.map((item, i) => i === index ? {...item, question: e.target.value} : item),
                null,
                e.target.value,
                index,
                'question'
              )}
              placeholder="Enter question"
            />
          </div>
          <div>
            <Label htmlFor={`faq-answer-${index}`}>Answer</Label>
            <Textarea
              id={`faq-answer-${index}`}
              value={faq.answer}
              onChange={(e) => handleNestedChange(
                (prev) => prev.map((item, i) => i === index ? {...item, answer: e.target.value} : item),
                null,
                e.target.value,
                index,
                'answer'
              )}
              placeholder="Enter answer"
              rows={3}
            />
          </div>
          <div className="flex justify-end">
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => setFaqs(
                faqs.filter((_, i) => i !== index)
              )}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <Button 
        variant="outline" 
        className="w-full mt-2" 
        onClick={() => setFaqs([...faqs, { question: '', answer: '' }])}
      >
        <PlusCircle className="h-4 w-4 mr-2" /> Add FAQ
      </Button>
    </div>
  );

  // Render Regulatory Bar
  const renderRegulatoryBar = () => (
    <div>
      <Label>Regulators</Label>
      {regulatoryBar.map((regulator, index) => (
        <div key={index} className="grid grid-cols-2 gap-4 mt-2 p-4 border rounded-lg">
          <div>
            <Label htmlFor={`regulator-logo-${index}`}>Logo URL</Label>
            <div className="flex gap-2">
              <Input
                id={`regulator-logo-${index}`}
                value={regulator.logo}
                onChange={(e) => handleNestedChange(
                  (prev) => prev.map((item, i) => i === index ? {...item, logo: e.target.value} : item),
                  null,
                  e.target.value,
                  index,
                  'logo'
                )}
                placeholder="Enter logo URL"
              />
              <Button variant="outline" size="icon">
                <Upload className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div>
            <Label htmlFor={`regulator-name-${index}`}>Name</Label>
            <Input
              id={`regulator-name-${index}`}
              value={regulator.name}
              onChange={(e) => handleNestedChange(
                (prev) => prev.map((item, i) => i === index ? {...item, name: e.target.value} : item),
                null,
                e.target.value,
                index,
                'name'
              )}
              placeholder="Enter name"
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => setRegulatoryBar(
                regulatoryBar.filter((_, i) => i !== index)
              )}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
      <Button 
        variant="outline" 
        className="w-full mt-2" 
        onClick={() => setRegulatoryBar([...regulatoryBar, { logo: '', name: '' }])}
      >
        <PlusCircle className="h-4 w-4 mr-2" /> Add Regulator
      </Button>
    </div>
  );

  // Render Final CTA
  const renderFinalCta = () => (
    <div className="space-y-4">
      <div>
        <Label htmlFor="cta-heading">Heading</Label>
        <Input
          id="cta-heading"
          value={finalCta.heading}
          onChange={(e) => setFinalCta({...finalCta, heading: e.target.value})}
          placeholder="Enter heading"
        />
      </div>
      <div>
        <Label htmlFor="cta-subheading">Subheading</Label>
        <Input
          id="cta-subheading"
          value={finalCta.subheading}
          onChange={(e) => setFinalCta({...finalCta, subheading: e.target.value})}
          placeholder="Enter subheading"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="cta-text">CTA Text</Label>
          <Input
            id="cta-text"
            value={finalCta.ctaText}
            onChange={(e) => setFinalCta({...finalCta, ctaText: e.target.value})}
            placeholder="Enter CTA text"
          />
        </div>
        <div>
          <Label htmlFor="cta-link">CTA Link</Label>
          <Input
            id="cta-link"
            value={finalCta.ctaLink}
            onChange={(e) => setFinalCta({...finalCta, ctaLink: e.target.value})}
            placeholder="Enter CTA link"
          />
        </div>
      </div>
    </div>
  );

  const sections = getSectionsForPageType();

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Location Page Editor</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => window.open(canonicalSlug, '_blank')}>
            <Eye className="h-4 w-4 mr-2" /> Preview
          </Button>
          <Button onClick={savePage}>
            <Save className="h-4 w-4 mr-2" /> Save Page
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Page Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="page-type">Page Type</Label>
                  <Select value={pageType} onValueChange={setPageType}>
                    <SelectTrigger id="page-type">
                      <SelectValue placeholder="Select page type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="country">Country</SelectItem>
                      <SelectItem value="region">Region</SelectItem>
                      <SelectItem value="city">City</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="england">England</SelectItem>
                      <SelectItem value="scotland">Scotland</SelectItem>
                      <SelectItem value="wales">Wales</SelectItem>
                      <SelectItem value="northern-ireland">Northern Ireland</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {pageType !== 'country' && (
                  <div>
                    <Label htmlFor="region">Region</Label>
                    <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                      <SelectTrigger id="region">
                        <SelectValue placeholder="Select region" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="greater-london">Greater London</SelectItem>
                        <SelectItem value="west-midlands">West Midlands</SelectItem>
                        <SelectItem value="south-west">South West</SelectItem>
                        <SelectItem value="north-west">North West</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                {pageType === 'city' && (
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger id="city">
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="london">London</SelectItem>
                        <SelectItem value="manchester">Manchester</SelectItem>
                        <SelectItem value="birmingham">Birmingham</SelectItem>
                        <SelectItem value="bristol">Bristol</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
              
              <div>
                <Label htmlFor="canonical-slug">Canonical Slug</Label>
                <div className="flex">
                  <Input
                    id="canonical-slug"
                    value={canonicalSlug}
                    readOnly
                    className="rounded-r-none"
                  />
                  <Button 
                    variant="outline" 
                    className="rounded-l-none border-l-0"
                    onClick={() => navigator.clipboard.writeText(canonicalSlug)}
                  >
                    Copy
                  </Button>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Page Title</Label>
                  <Input
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter page title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="meta-title">Meta Title</Label>
                  <Input
                    id="meta-title"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    placeholder="Enter meta title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="meta-description">Meta Description</Label>
                  <Textarea
                    id="meta-description"
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Enter meta description"
                    rows={3}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Content Sections</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="space-y-4">
                {sections.map((section) => (
                  <AccordionItem key={section.id} value={section.id}>
                    <AccordionTrigger className="flex items-center justify-between">
                      <div className="flex items-center">
                        {section.title}
                        {isSectionComplete(section.component) ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500 ml-2" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-yellow-500 ml-2" />
                        )}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="p-4">
                      {section.component}
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm">
                          <Save className="h-4 w-4 mr-2" /> Save Section
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
        
        {/* Preview Panel */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Live Preview</span>
                <Button variant="outline" size="sm" onClick={() => window.open(canonicalSlug, '_blank')}>
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 rounded-lg p-4 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Live preview will appear here</p>
                  <p className="text-sm text-gray-400 mt-2">Changes update in real-time</p>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium mb-2">Page Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">SEO Fields</span>
                    {title && metaTitle && metaDescription ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">
                        Complete
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                        Incomplete
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">Content Sections</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                      {sections.filter(s => isSectionComplete(s.component)).length}/{sections.length} Complete
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}