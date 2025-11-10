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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  FileText, 
  MapPin, 
  Search, 
  Folder, 
  FolderOpen, 
  Globe,
  Edit,
  Eye,
  Save,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  RefreshCw,
  Info
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatSlugToTitle } from '@/lib/locationData';
import FAQEditor from '@/components/FAQEditor';
import ResourceEditor from '@/components/ResourceEditor';
import LocationTree from '@/components/LocationTree';
import DynamicSectionEditor from '@/components/DynamicSectionEditor';
import { locationSchemas, getDefaultContent } from '@/lib/locationSchemas';
import TemplateGuide from '@/components/TemplateGuide';

export default function PageEditor() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [pages, setPages] = useState([]);
  const [selectedPage, setSelectedPage] = useState('');
  const [pageSections, setPageSections] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    meta_description: '',
    slug: ''
  });
  
  const [previewMode, setPreviewMode] = useState(false);
  const [activeTab, setActiveTab] = useState('pages');
  const [locationContent, setLocationContent] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationFormData, setLocationFormData] = useState({});
  const [locationSearchQuery, setLocationSearchQuery] = useState('');
  const [expandedCountries, setExpandedCountries] = useState({});
  const [expandedRegions, setExpandedRegions] = useState({});

  useEffect(() => {
    // TEMPORARILY DISABLED ADMIN CHECK FOR TESTING
    setIsAdmin(true);
    fetchPages();
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

  const handleLocationSearch = async (e) => {
    e.preventDefault();
    if (!locationSearchQuery.trim()) {
      fetchLocationContent();
      return;
    }
    
    try {
      const response = await fetch(`/api/admin/cms?q=${encodeURIComponent(locationSearchQuery)}`);
      if (response.ok) {
        const results = await response.json();
        setLocationContent(results);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  // Organize locations by country > region > city with proper section handling
  const organizeLocations = () => {
    // If we have the new tree structure, use it directly
    if (Array.isArray(locationContent) && locationContent.length > 0 && locationContent[0].children) {
      // Convert tree structure to organized object for rendering
      const organized = {};
      
      locationContent.forEach(country => {
        organized[country.id] = {
          country: country,
          regions: {}
        };
        
        if (country.children && Array.isArray(country.children)) {
          country.children.forEach(region => {
            organized[country.id].regions[region.id] = {
              region: region,
              cities: []
            };
            
            if (region.children && Array.isArray(region.children)) {
              region.children.forEach(city => {
                organized[country.id].regions[region.id].cities.push(city);
              });
            }
          });
        }
      });
      
      return organized;
    }
    
    // Fallback to old flat structure handling
    const organized = {};
    locationContent.forEach(content => {
      const parts = content.slug.split('/');
      
      // Handle different slug structures
      if (parts.length === 1) {
        // Country level content (e.g., "england")
        if (!organized[parts[0]]) {
          organized[parts[0]] = { country: content, regions: {} };
        } else {
          // If country already exists but doesn't have content, update it
          if (!organized[parts[0]].country) {
            organized[parts[0]].country = content;
          }
        }
      } else if (parts.length === 2) {
        // Region level content (e.g., "england/greater-london")
        const [country, region] = parts;
        if (!organized[country]) {
          organized[country] = { country: null, regions: {} };
        }
        if (!organized[country].regions[region]) {
          organized[country].regions[region] = { region: content, cities: [] };
        } else {
          // If region already exists but doesn't have content, update it
          if (!organized[country].regions[region].region) {
            organized[country].regions[region].region = content;
          }
        }
      } else if (parts.length === 3) {
        // City level content (e.g., "england/greater-london/london")
        const [country, region, city] = parts;
        if (!organized[country]) {
          organized[country] = { country: null, regions: {} };
        }
        if (!organized[country].regions[region]) {
          organized[country].regions[region] = { region: null, cities: [] };
        }
        // Only add city if it's not already in the list
        if (!organized[country].regions[region].cities.some(c => c.slug === content.slug)) {
          organized[country].regions[region].cities.push(content);
        }
      } else if (parts.length >= 4) {
        // Handle deeper nested content (e.g., "foster-agency/england/greater-london/london")
        // This is the proper structure for frontend pages
        const [prefix, country, region, city] = parts;
        if (prefix === 'foster-agency') {
          if (!organized[country]) {
            organized[country] = { country: null, regions: {} };
          }
          if (!organized[country].regions[region]) {
            organized[country].regions[region] = { region: null, cities: [] };
          }
          // Only add city if it's not already in the list
          const fullSlug = `${prefix}/${country}/${region}/${city}`;
          if (!organized[country].regions[region].cities.some(c => c.slug === fullSlug)) {
            organized[country].regions[region].cities.push({
              ...content,
              slug: fullSlug
            });
          }
        }
      }
    });
    return organized;
  };

  const handleLocationEdit = (content) => {
    setSelectedLocation(content);
    // Load the actual content from the API instead of using node data directly
    loadLocationContent(content.id);
  };

  // Add useEffect to load content when selectedLocation changes
  useEffect(() => {
    if (!selectedLocation?.id) return;
    loadLocationContent(selectedLocation.id);
  }, [selectedLocation?.id]);

  async function loadLocationContent(locationId) {
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
  }

  async function handleSave() {
    if (!selectedLocation?.id) return;
    
    try {
      console.log('Saving', selectedLocation.id, locationFormData);
      
      // Prepare the data to send including the canonical slug
      const saveData = {
        ...locationFormData,
        canonical_slug: selectedLocation.canonical_slug || `/foster-agency/${selectedLocation.slug || selectedLocation.id}`,
        id: selectedLocation.id,
        type: selectedLocation.type || 'city'
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
        alert('Save failed: ' + (json.error || 'unknown'));
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
      
      alert('Location content saved successfully!');
    } catch (error) {
      console.error('handleSave err', error);
      alert('Error saving location content: ' + error.message);
    }
  }

  const handleLocationSave = async (e) => {
    e.preventDefault();
    if (!selectedLocation) return;
    
    // Save draft to localStorage before attempting to save
    localStorage.setItem('cms-draft:' + selectedLocation.id, JSON.stringify(locationFormData));
    
    await handleSave();
  };

  const handleLocationSelect = async (node) => {
    if (!node.editable) return;
    
    try {
      setLoading(true);
      // Use the new endpoint to fetch location content
      const response = await fetch(`/api/admin/locations/${node.id}/content`);
      if (response.ok) {
        const data = await response.json();
        // Ensure the node data includes the canonical_slug for saving
        const locationWithSlug = {
          ...node,
          canonical_slug: node.canonical_slug || data.canonical_slug || `/foster-agency/${node.slug || node.id}`
        };
        setSelectedLocation(locationWithSlug);
        setLocationFormData(data.content || {});
      } else {
        console.error('Failed to fetch location content:', response.status);
        // Fallback to node data with default content based on location type
        // Ensure the node data includes the canonical_slug for saving
        const locationWithSlug = {
          ...node,
          canonical_slug: node.canonical_slug || `/foster-agency/${node.slug || node.id}`
        };
        setSelectedLocation(locationWithSlug);
        setLocationFormData({
          ...getDefaultContent(locationWithSlug),
          ...locationWithSlug
        });
      }
    } catch (error) {
      console.error('Error fetching location content:', error);
      // Fallback to node data with default content based on location type
      // Ensure the node data includes the canonical_slug for saving
      const locationWithSlug = {
        ...node,
        canonical_slug: node.canonical_slug || `/foster-agency/${node.slug || node.id}`
      };
      setSelectedLocation(locationWithSlug);
      setLocationFormData({
        ...getDefaultContent(locationWithSlug),
        ...locationWithSlug
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCountryEdit = (countryContent) => {
    if (countryContent) {
      handleLocationEdit(countryContent);
    }
  };

  const handleRegionEdit = (regionContent) => {
    if (regionContent) {
      handleLocationEdit(regionContent);
    }
  };

  const fetchPages = async () => {
    try {
      setLoading(true);
      
      // Fetch real pages from Sanity API
      const response = await fetch('/api/admin/pages');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Ensure we have a proper structure for all pages
          const formattedPages = (data.pages || []).map(page => ({
            _id: page._id,
            title: page.title,
            slug: page.slug?.current ? page.slug : { current: page.slug || '' }
          }));
          setPages(formattedPages);
        } else {
          // Fallback to comprehensive mock data if API fails
          const mockData = [
            { _id: 'home', title: 'Home Page', slug: { current: 'home' } },
            { _id: 'about', title: 'About Us', slug: { current: 'about' } },
            { _id: 'contact', title: 'Contact', slug: { current: 'contact' } },
            { _id: 'becoming-a-foster-carer', title: 'Becoming a Foster Carer', slug: { current: 'becoming-a-foster-carer' } },
            { _id: 'types-of-fostering', title: 'Types of Fostering', slug: { current: 'types-of-fostering' } },
            { _id: 'support-services', title: 'Support Services', slug: { current: 'support-services' } },
            { _id: 'resources', title: 'Resources', slug: { current: 'resources' } },
            { _id: 'faq', title: 'FAQ', slug: { current: 'faq' } },
            { _id: 'blog', title: 'Blog', slug: { current: 'blog' } }
          ];
          setPages(mockData);
        }
      } else {
        // Fallback to comprehensive mock data if API fails
        const mockData = [
          { _id: 'home', title: 'Home Page', slug: { current: 'home' } },
          { _id: 'about', title: 'About Us', slug: { current: 'about' } },
          { _id: 'contact', title: 'Contact', slug: { current: 'contact' } },
          { _id: 'becoming-a-foster-carer', title: 'Becoming a Foster Carer', slug: { current: 'becoming-a-foster-carer' } },
          { _id: 'types-of-fostering', title: 'Types of Fostering', slug: { current: 'types-of-fostering' } },
          { _id: 'support-services', title: 'Support Services', slug: { current: 'support-services' } },
          { _id: 'resources', title: 'Resources', slug: { current: 'resources' } },
          { _id: 'faq', title: 'FAQ', slug: { current: 'faq' } },
          { _id: 'blog', title: 'Blog', slug: { current: 'blog' } }
        ];
        setPages(mockData);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching pages:', error);
      // Fallback to comprehensive mock data on error
      const mockData = [
        { _id: 'home', title: 'Home Page', slug: { current: 'home' } },
        { _id: 'about', title: 'About Us', slug: { current: 'about' } },
        { _id: 'contact', title: 'Contact', slug: { current: 'contact' } },
        { _id: 'becoming-a-foster-carer', title: 'Becoming a Foster Carer', slug: { current: 'becoming-a-foster-carer' } },
        { _id: 'types-of-fostering', title: 'Types of Fostering', slug: { current: 'types-of-fostering' } },
        { _id: 'support-services', title: 'Support Services', slug: { current: 'support-services' } },
        { _id: 'resources', title: 'Resources', slug: { current: 'resources' } },
        { _id: 'faq', title: 'FAQ', slug: { current: 'faq' } },
        { _id: 'blog', title: 'Blog', slug: { current: 'blog' } }
      ];
      setPages(mockData);
      setLoading(false);
    }
  };

  const fetchPageSections = async (pageId) => {
    try {
      setLoading(true);
      
      // Try to load from localStorage first (for custom edits)
      const storageKey = `foster_care_page_sections_${pageId}`;
      const savedSections = localStorage.getItem(storageKey);
      
      if (savedSections) {
        try {
          const parsedSections = JSON.parse(savedSections);
          if (Array.isArray(parsedSections) && parsedSections.length > 0) {
            setPageSections(parsedSections);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error('Error parsing saved sections:', e);
        }
      }
      
      // If no localStorage data, fetch from Sanity CMS
      const response = await fetch(`/api/admin/pages/${pageId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.page) {
          // Transform Sanity page content into editable sections
          const sections = [];
          
          // Hero section
          if (data.page.hero) {
            sections.push({
              id: 1,
              page_id: pageId,
              title: 'Hero Section',
              heading: data.page.hero.heading || '',
              subheading: data.page.hero.subheading || '',
              content: data.page.hero.content || '',
              heading_type: 'h1',
              order: 1,
              type: 'hero',
              image: data.page.hero.image || null
            });
          }
          
          // Add other sections from page content array
          if (data.page.content && Array.isArray(data.page.content)) {
            data.page.content.forEach((content, index) => {
              sections.push({
                id: index + 2,
                page_id: pageId,
                title: content.title || `Section ${index + 2}`,
                heading: content.heading || '',
                content: content.text || content.content || '',
                heading_type: content.heading_type || 'h2',
                order: index + 2,
                type: content._type || 'default',
                ...content
              });
            });
          }
          
          // If no sections found, use default mock data
          if (sections.length === 0) {
            sections.push(...getDefaultSectionsForPage(pageId));
          }
          
          setPageSections(sections);
        } else {
          // Fallback to default sections if API fails
          setPageSections(getDefaultSectionsForPage(pageId));
        }
      } else {
        // Fallback to default sections if API fails
        setPageSections(getDefaultSectionsForPage(pageId));
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching page sections:', error);
      setPageSections(getDefaultSectionsForPage(pageId));
      setLoading(false);
    }
  };

  // Helper function to get default sections for different page types
  const getDefaultSectionsForPage = (pageId) => {
    // Home page defaults
    if (pageId === 'home' || pageId === 'page-1') {
      return [
        { 
          "id": 1, 
          "page_id": pageId,
          "title": "Hero Section", 
          "heading": "Find Your Perfect Fostering Agency", 
          "content": "Connecting caring hearts with fostering opportunities across the UK. Browse verified agencies, read reviews, and start your fostering journey today.", 
          "heading_type": "h1",
          "order": 1,
          "type": "hero",
          "subtitle": "Foster Care Directory",
          "subheading": "Fostering Agency",
          "primary_button_text": "Find Agencies",
          "primary_button_link": "/agencies",
          "secondary_button_text": "Learn More",
          "secondary_button_link": "/resources"
        },
        { 
          "id": 2, 
          "page_id": pageId,
          "title": "How It Works Section", 
          "heading": "How It Works", 
          "content": "Finding the right fostering agency is easy with our simple three-step process", 
          "heading_type": "h2",
          "order": 2,
          "type": "how_it_works",
          "subtitle": "Simple Process",
          "cards": JSON.stringify([
            {
              "title": "Search & Discover",
              "description": "Browse through verified fostering agencies in your area with detailed profiles and reviews.",
              "icon": "Search"
            },
            {
              "title": "Compare & Learn",
              "description": "Read real reviews, compare services, and learn about each agency's approach to fostering.",
              "icon": "Users"
            },
            {
              "title": "Connect & Start",
              "description": "Contact agencies directly, ask questions, and begin your rewarding fostering journey.",
              "icon": "Heart"
            }
          ])
        },
        { 
          "id": 3, 
          "page_id": pageId,
          "title": "Featured Agencies Section", 
          "heading": "Featured Agencies", 
          "content": "Trusted fostering agencies across the UK", 
          "heading_type": "h2",
          "order": 3,
          "type": "featured_agencies",
          "subtitle": "Verified Agencies",
          "button_text": "View All Agencies",
          "button_link": "/agencies"
        },
        { 
          "id": 4, 
          "page_id": pageId,
          "title": "Testimonials Section", 
          "heading": "Success Stories", 
          "content": "Hear from families who found their perfect match through our directory", 
          "heading_type": "h2",
          "order": 4,
          "type": "testimonials",
          "subtitle": "Testimonials",
          "testimonials": JSON.stringify([
            {
              "name": "Sarah & James",
              "location": "Manchester",
              "quote": "Finding the right agency was overwhelming until we discovered this directory. The reviews and detailed profiles helped us make the perfect choice.",
              "rating": 5
            },
            {
              "name": "Emma Thompson",
              "location": "London",
              "quote": "As a single foster carer, I needed an agency that understood my situation. This platform made it so easy to find and connect with the right support.",
              "rating": 5
            },
            {
              "name": "Michael Davies",
              "location": "Birmingham",
              "quote": "The process was straightforward and the support from both the platform and the agency was exceptional. We're now fostering two amazing children.",
              "rating": 5
            }
          ])
        },
        { 
          "id": 5, 
          "page_id": pageId,
          "title": "Resources Section", 
          "heading": "Resources & Guides", 
          "content": "Everything you need to know about fostering in the UK. From legal requirements to heartwarming success stories, we've got you covered.", 
          "heading_type": "h2",
          "order": 5,
          "type": "resources",
          "subtitle": "Knowledge Hub",
          "subheading": "Helpful Guides",
          "button_text": "View All Resources",
          "button_link": "/resources",
          "secondary_button_text": "Getting Started Guide",
          "secondary_button_link": "/resources/getting-started",
          "highlights": JSON.stringify([
            {
              "title": "Getting Started",
              "description": "Essential information for those beginning their fostering journey",
              "icon": "BookOpen"
            },
            {
              "title": "Legal Requirements",
              "description": "Understanding the legal aspects of becoming a foster carer",
              "icon": "FileText"
            }
          ])
        },
        { 
          "id": 6, 
          "page_id": pageId,
          "title": "CTA Section", 
          "heading": "Are You a Fostering Agency?", 
          "content": "Join our trusted directory and connect with families looking for the perfect fostering partnership. Get started with a free basic listing today.", 
          "heading_type": "h2",
          "order": 6,
          "type": "cta",
          "primary_button_text": "Register Your Agency",
          "primary_button_link": "/auth/signup",
          "secondary_button_text": "Learn More",
          "secondary_button_link": "/contact"
        }
      ];
    }
    
    // About page defaults
    else if (pageId === 'about' || pageId === 'page-2') {
      return [
        { 
          "id": 1, 
          "page_id": pageId,
          "title": "Hero Section", 
          "heading": "About Foster Care UK", 
          "content": "Connecting families with caring hearts since 2010", 
          "heading_type": "h1",
          "order": 1,
          "type": "hero",
          "subtitle": "Our Mission",
          "subheading": "Making a Difference",
          "primary_button_text": "Learn More",
          "primary_button_link": "/contact",
          "secondary_button_text": "View Agencies",
          "secondary_button_link": "/agencies"
        },
        { 
          "id": 2, 
          "page_id": pageId,
          "title": "Our Story Section", 
          "heading": "Our Story", 
          "content": "Founded in 2010, Foster Care UK began with a simple mission: to connect caring hearts with children in need. What started as a small initiative has grown into one of the UK's most trusted fostering directories.", 
          "heading_type": "h2",
          "order": 2,
          "type": "story",
          "subtitle": "The Beginning"
        },
        { 
          "id": 3, 
          "page_id": pageId,
          "title": "Our Mission Section", 
          "heading": "Our Mission", 
          "content": "Our mission is to simplify the fostering journey by providing a comprehensive, trustworthy platform that connects prospective foster carers with verified agencies.", 
          "heading_type": "h2",
          "order": 3,
          "type": "mission",
          "subtitle": "Core Values"
        }
      ];
    }
    
    // Contact page defaults
    else if (pageId === 'contact' || pageId === 'page-3') {
      return [
        { 
          "id": 1, 
          "page_id": pageId,
          "title": "Hero Section", 
          "heading": "Get in Touch", 
          "content": "We're here to help you start your fostering journey", 
          "heading_type": "h1",
          "order": 1,
          "type": "hero",
          "subtitle": "Contact Us",
          "subheading": "Reach Out Today",
          "primary_button_text": "Call Us",
          "primary_button_link": "tel:+441234567890",
          "secondary_button_text": "Email Us",
          "secondary_button_link": "mailto:info@fostercareuk.org"
        },
        { 
          "id": 2, 
          "page_id": pageId,
          "title": "Contact Information", 
          "heading": "Contact Information", 
          "content": "Find all the ways to reach our team", 
          "heading_type": "h2",
          "order": 2,
          "type": "contact_info",
          "subtitle": "Get In Touch"
        }
      ];
    }
    
    // Default sections for other pages
    else {
      return [
        { 
          "id": 1, 
          "page_id": pageId,
          "title": "Hero Section", 
          "heading": "Welcome", 
          "content": "Page content goes here", 
          "heading_type": "h1",
          "order": 1,
          "type": "hero"
        },
        { 
          "id": 2, 
          "page_id": pageId,
          "title": "Main Content", 
          "heading": "Main Content", 
          "content": "Add your content here", 
          "heading_type": "h2",
          "order": 2,
          "type": "content"
        }
      ];
    }
  };

  const handleAddSection = () => {
    const newSection = {
      id: Date.now(),
      page_id: selectedPage,
      title: 'New Section',
      heading: '',
      content: '',
      heading_type: 'paragraph',
      order: pageSections.length + 1,
      type: 'default'
    };
    setPageSections([...pageSections, newSection]);
  };

  const handleSectionChange = (sectionId, field, value) => {
    setPageSections(prevSections => 
      prevSections.map(section => 
        section.id === sectionId ? { ...section, [field]: value } : section
      )
    );
  };

  const handleDeleteSection = (sectionId) => {
    setPageSections(prevSections => 
      prevSections.filter(section => section.id !== sectionId)
    );
  };

  const handleMoveSectionUp = (sectionId) => {
    const index = pageSections.findIndex(s => s.id === sectionId);
    if (index > 0) {
      const newSections = [...pageSections];
      [newSections[index-1], newSections[index]] = [newSections[index], newSections[index-1]];
      setPageSections(newSections);
    }
  };

  const handleMoveSectionDown = (sectionId) => {
    const index = pageSections.findIndex(s => s.id === sectionId);
    if (index < pageSections.length - 1) {
      const newSections = [...pageSections];
      [newSections[index], newSections[index+1]] = [newSections[index+1], newSections[index]];
      setPageSections(newSections);
    }
  };

  const handleSaveSections = async () => {
    if (!selectedPage) return;
    
    setSaving(true);
    
    try {
      // Save sections to localStorage
      const storageKey = `foster_care_page_sections_${selectedPage}`;
      localStorage.setItem(storageKey, JSON.stringify(pageSections));
      alert('Sections saved successfully!');
    } catch (error) {
      console.error('Error saving sections:', error);
      alert('Error saving sections');
    }
    
    setSaving(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPage) return;
    
    setSaving(true);
    
    try {
      // Update page in Sanity
      const response = await fetch(`/api/admin/pages/${selectedPage}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.title,
          seo: {
            title: formData.meta_title || formData.seo?.title || `${formData.title} | Foster Care UK`,
            description: formData.meta_description || formData.seo?.description || ''
          },
          slug: {
            current: formData.slug?.current || formData.slug || ''
          }
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          // Update pages list
          const updatedPages = pages.map(page => 
            page._id === selectedPage 
              ? { 
                  ...page, 
                  title: formData.title,
                  slug: {
                    current: formData.slug?.current || formData.slug || ''
                  }
                }
              : page
          );
          setPages(updatedPages);
          alert('Page saved successfully!');
        } else {
          alert('Error saving page: ' + data.error);
        }
      } else {
        alert('Error saving page');
      }
    } catch (error) {
      console.error('Error saving page:', error);
      alert('Error saving page');
    }
    
    setSaving(false);
  };

  const handlePageSelect = async (pageId) => {
    setSelectedPage(pageId);
    
    // Find the selected page
    const selected = pages.find(page => page._id === pageId);
    if (selected) {
      setFormData({
        title: selected.title || '',
        slug: selected.slug || { current: '' },
        meta_title: selected.seo?.title || '',
        meta_description: selected.seo?.description || ''
      });
      
      // Fetch sections for this page
      await fetchPageSections(pageId);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const findFirstEditable = (nodes) => {
    for (const n of nodes) {
      if (n.editable) return n;
      const child = findFirstEditable(n.children || []);
      if (child) return child;
    }
    return null;
  };

  const handleSelectFirstPage = () => {
    const firstEditable = findFirstEditable(locationContent);
    if (firstEditable) {
      handleLocationSelect(firstEditable);
    }
  };

  const handleReloadTree = () => {
    fetchLocationContent();
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
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-offwhite">
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={() => router.push('/admin')} className="font-inter">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold font-inter">CMS Editor</h1>
                <p className="text-sm text-muted-foreground font-inter">Manage pages and location content</p>
              </div>
            </div>
            <Badge variant="secondary" className="font-inter">Admin</Badge>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="glass-card rounded-modern">
            <TabsTrigger value="pages" className="font-inter">
              <FileText className="w-4 h-4 mr-2" />
              Pages
            </TabsTrigger>
            <TabsTrigger value="locations" className="font-inter">
              <MapPin className="w-4 h-4 mr-2" />
              Location Content
            </TabsTrigger>
          </TabsList>

          {/* Pages Tab Content */}
          <TabsContent value="pages">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Page List */}
              <div className="lg:col-span-1">
                <Card className="glass-card rounded-modern">
                  <CardHeader>
                    <CardTitle>Pages</CardTitle>
                    <CardDescription>Select a page to edit</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {pages.map((page) => (
                        <Button
                          key={page._id}
                          variant={selectedPage === page._id ? "default" : "outline"}
                          className="w-full justify-start"
                          onClick={() => handlePageSelect(page._id)}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          {page.title}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Editor */}
              <div className="lg:col-span-3">
                {selectedPage ? (
                  <form onSubmit={handleSubmit}>
                    <Card className="glass-card rounded-modern">
                      <CardHeader>
                        <CardTitle>Edit Page</CardTitle>
                        <CardDescription>Modify the content for {pages.find(p => p._id === selectedPage)?.title}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="title">Page Title</Label>
                          <Input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter page title"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="slug">URL Slug</Label>
                          <Input
                            id="slug"
                            name="slug"
                            value={formData.slug?.current || formData.slug || ''}
                            onChange={(e) => setFormData({ ...formData, slug: { current: e.target.value } })}
                            placeholder="page-url-slug"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="meta_description">Meta Description</Label>
                          <Textarea
                            id="meta_description"
                            name="meta_description"
                            value={formData.meta_description || formData.seo?.description || ''}
                            onChange={(e) => setFormData({ ...formData, meta_description: e.target.value, seo: { ...formData.seo, description: e.target.value } })}
                            placeholder="Enter meta description for SEO"
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between items-center mb-4">
                            <Label className="text-lg font-semibold">Page Sections</Label>
                            <div className="flex space-x-2">
                              <Button 
                                variant={!previewMode ? "default" : "outline"} 
                                size="sm" 
                                onClick={() => setPreviewMode(false)}
                                type="button"
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </Button>
                              <Button 
                                variant={previewMode ? "default" : "outline"} 
                                size="sm" 
                                onClick={() => setPreviewMode(true)}
                                type="button"
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Preview
                              </Button>
                            </div>
                          </div>
                          
                          {pageSections.map((section) => (
                            <div key={section.id} className="mb-6 border rounded-lg p-4">
                              <div className="flex justify-between items-center mb-2">
                                <Input
                                  value={section.title}
                                  onChange={(e) => handleSectionChange(section.id, 'title', e.target.value)}
                                  className="font-medium text-md"
                                  placeholder="Section Title"
                                />
                                <div className="flex space-x-1">
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => handleMoveSectionUp(section.id)}
                                    disabled={section.order === 1}
                                  >
                                    <ArrowUp className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => handleMoveSectionDown(section.id)}
                                    disabled={section.order === pageSections.length}
                                  >
                                    <ArrowDown className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => handleDeleteSection(section.id)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                  <Label htmlFor={`section-heading-${section.id}`}>Heading</Label>
                                  <Input
                                    id={`section-heading-${section.id}`}
                                    value={section.heading || ''}
                                    onChange={(e) => handleSectionChange(section.id, 'heading', e.target.value)}
                                    placeholder="Section heading"
                                  />
                                </div>
                                <div>
                                  <Label htmlFor={`section-heading-type-${section.id}`}>Heading Type</Label>
                                  <Select 
                                    value={section.heading_type || "paragraph"}
                                    onValueChange={(value) => handleSectionChange(section.id, 'heading_type', value)}
                                  >
                                    <SelectTrigger id={`section-heading-type-${section.id}`}>
                                      <SelectValue placeholder="Paragraph" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="paragraph">Paragraph</SelectItem>
                                      <SelectItem value="h1">Heading 1</SelectItem>
                                      <SelectItem value="h2">Heading 2</SelectItem>
                                      <SelectItem value="h3">Heading 3</SelectItem>
                                      <SelectItem value="h4">Heading 4</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                              
                              <div className="mb-4">
                                <Label htmlFor={`section-content-${section.id}`}>Content</Label>
                                <Textarea
                                  id={`section-content-${section.id}`}
                                  value={section.content || ''}
                                  onChange={(e) => handleSectionChange(section.id, 'content', e.target.value)}
                                  placeholder="Section content"
                                  rows={4}
                                />
                              </div>
                              
                              {/* Conditional fields based on section type */}
                              {section.type === 'hero' && (
                                <>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                      <Label htmlFor={`section-subheading-${section.id}`}>Subheading</Label>
                                      <Input
                                        id={`section-subheading-${section.id}`}
                                        value={section.subheading || ''}
                                        onChange={(e) => handleSectionChange(section.id, 'subheading', e.target.value)}
                                        placeholder="Section subheading"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor={`section-subtitle-${section.id}`}>Subtitle</Label>
                                      <Input
                                        id={`section-subtitle-${section.id}`}
                                        value={section.subtitle || ''}
                                        onChange={(e) => handleSectionChange(section.id, 'subtitle', e.target.value)}
                                        placeholder="Section subtitle"
                                      />
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                      <Label htmlFor={`section-primary-button-text-${section.id}`}>Primary Button Text</Label>
                                      <Input
                                        id={`section-primary-button-text-${section.id}`}
                                        value={section.primary_button_text || ''}
                                        onChange={(e) => handleSectionChange(section.id, 'primary_button_text', e.target.value)}
                                        placeholder="Button text"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor={`section-primary-button-link-${section.id}`}>Primary Button Link</Label>
                                      <Input
                                        id={`section-primary-button-link-${section.id}`}
                                        value={section.primary_button_link || ''}
                                        onChange={(e) => handleSectionChange(section.id, 'primary_button_link', e.target.value)}
                                        placeholder="Button link"
                                      />
                                    </div>
                                  </div>
                                  
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor={`section-secondary-button-text-${section.id}`}>Secondary Button Text</Label>
                                      <Input
                                        id={`section-secondary-button-text-${section.id}`}
                                        value={section.secondary_button_text || ''}
                                        onChange={(e) => handleSectionChange(section.id, 'secondary_button_text', e.target.value)}
                                        placeholder="Button text"
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor={`section-secondary-button-link-${section.id}`}>Secondary Button Link</Label>
                                      <Input
                                        id={`section-secondary-button-link-${section.id}`}
                                        value={section.secondary_button_link || ''}
                                        onChange={(e) => handleSectionChange(section.id, 'secondary_button_link', e.target.value)}
                                        placeholder="Button link"
                                      />
                                    </div>
                                  </div>
                                </>
                              )}
                              
                              {section.type === 'how_it_works' && section.cards && (
                                <div className="mb-4">
                                  <Label htmlFor={`section-cards-${section.id}`}>Cards (JSON)</Label>
                                  <Textarea
                                    id={`section-cards-${section.id}`}
                                    value={typeof section.cards === 'string' ? section.cards : JSON.stringify(section.cards, null, 2)}
                                    onChange={(e) => handleSectionChange(section.id, 'cards', e.target.value)}
                                    placeholder='[{"title": "Card Title", "description": "Card description", "icon": "IconName"}]'
                                    rows={4}
                                    className="font-mono text-sm"
                                  />
                                  <p className="text-xs text-gray-500 mt-1">Format: JSON array of {`{title, description, icon}`} objects</p>
                                </div>
                              )}
                              
                              {section.type === 'testimonials' && section.testimonials && (
                                <div className="mb-4">
                                  <Label htmlFor={`section-testimonials-${section.id}`}>Testimonials (JSON)</Label>
                                  <Textarea
                                    id={`section-testimonials-${section.id}`}
                                    value={typeof section.testimonials === 'string' ? section.testimonials : JSON.stringify(section.testimonials, null, 2)}
                                    onChange={(e) => handleSectionChange(section.id, 'testimonials', e.target.value)}
                                    placeholder='[{"name": "John Doe", "location": "City", "quote": "Testimonial quote", "rating": 5}]'
                                    rows={4}
                                    className="font-mono text-sm"
                                  />
                                  <p className="text-xs text-gray-500 mt-1">Format: JSON array of {`{name, location, quote, rating}`} objects</p>
                                </div>
                              )}
                              
                              {section.type === 'resources' && section.highlights && (
                                <div className="mb-4">
                                  <Label htmlFor={`section-highlights-${section.id}`}>Highlights (JSON)</Label>
                                  <Textarea
                                    id={`section-highlights-${section.id}`}
                                    value={typeof section.highlights === 'string' ? section.highlights : JSON.stringify(section.highlights, null, 2)}
                                    onChange={(e) => handleSectionChange(section.id, 'highlights', e.target.value)}
                                    placeholder='[{"title": "Highlight Title", "description": "Highlight description", "icon": "IconName"}]'
                                    rows={4}
                                    className="font-mono text-sm"
                                  />
                                  <p className="text-xs text-gray-500 mt-1">Format: JSON array of {`{title, description, icon}`} objects</p>
                                </div>
                              )}
                              
                              {/* Common button fields for various section types */}
                              {(section.type === 'featured_agencies' || section.type === 'resources' || section.type === 'cta') && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                  <div>
                                    <Label htmlFor={`section-button-text-${section.id}`}>Button Text</Label>
                                    <Input
                                      id={`section-button-text-${section.id}`}
                                      value={section.button_text || ''}
                                      onChange={(e) => handleSectionChange(section.id, 'button_text', e.target.value)}
                                      placeholder="Button text"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`section-button-link-${section.id}`}>Button Link</Label>
                                    <Input
                                      id={`section-button-link-${section.id}`}
                                      value={section.button_link || ''}
                                      onChange={(e) => handleSectionChange(section.id, 'button_link', e.target.value)}
                                      placeholder="Button link"
                                    />
                                  </div>
                                </div>
                              )}
                              
                              {/* Secondary button for resources section */}
                              {section.type === 'resources' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <Label htmlFor={`section-secondary-button-text-${section.id}`}>Secondary Button Text</Label>
                                    <Input
                                      id={`section-secondary-button-text-${section.id}`}
                                      value={section.secondary_button_text || ''}
                                      onChange={(e) => handleSectionChange(section.id, 'secondary_button_text', e.target.value)}
                                      placeholder="Button text"
                                    />
                                  </div>
                                  <div>
                                    <Label htmlFor={`section-secondary-button-link-${section.id}`}>Secondary Button Link</Label>
                                    <Input
                                      id={`section-secondary-button-link-${section.id}`}
                                      value={section.secondary_button_link || ''}
                                      onChange={(e) => handleSectionChange(section.id, 'secondary_button_link', e.target.value)}
                                      placeholder="Button link"
                                    />
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}

                          <div className="flex justify-end space-x-2">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={handleAddSection}
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Add Section
                            </Button>
                            <Button type="submit" disabled={saving}>
                              {saving ? 'Saving...' : 'Save Page'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </form>
                ) : (
                  <Card className="glass-card rounded-modern">
                    <CardContent className="py-12 text-center">
                      <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">No Page Selected</h3>
                      <p className="text-gray-500 mb-4">Select a page from the list to start editing</p>
                      <Button onClick={() => handlePageSelect(pages[0]?._id)}>
                        Select First Page
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Locations Tab Content */}
          <TabsContent value="locations">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Location Tree */}
              <div className="lg:col-span-1">
                <Card className="glass-card rounded-modern mb-4">
                  <CardHeader>
                    <CardTitle>Locations</CardTitle>
                    <CardDescription>Browse and edit location content</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleLocationSearch} className="mb-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          type="text"
                          placeholder="Search locations..."
                          value={locationSearchQuery}
                          onChange={(e) => setLocationSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </form>
                    
                    <div className="max-h-96 overflow-y-auto">
                      {locationContent && Array.isArray(locationContent) && locationContent.length > 0 && locationContent[0].children ? (
                        // Render new tree structure
                        <LocationTree 
                          nodes={locationContent} 
                          onSelect={handleLocationEdit}
                          expandedCountries={expandedCountries}
                          setExpandedCountries={setExpandedCountries}
                          expandedRegions={expandedRegions}
                          setExpandedRegions={setExpandedRegions}
                        />
                      ) : (
                        // Fallback to old rendering if needed
                        Object.entries(organizeLocations()).map(([countryId, data]) => (
                          <Accordion key={countryId} type="single" collapsible className="w-full">
                            <AccordionItem value={countryId} className="border-b-0">
                              <AccordionTrigger 
                                className="py-2 hover:no-underline"
                                onClick={() => setExpandedCountries(prev => ({ ...prev, [countryId]: !prev[countryId] }))}
                              >
                                <div className="flex items-center justify-between w-full">
                                  <div className="flex items-center">
                                    {expandedCountries[countryId] ? <FolderOpen className="w-4 h-4 mr-2" /> : <Folder className="w-4 h-4 mr-2" />}
                                    <span className="font-medium">{data.country?.name || formatSlugToTitle(countryId)}</span>
                                  </div>
                                  <div className="flex items-center">
                                    {data.country && data.country.editable && (
                                      <span
                                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-6 px-2 text-xs cursor-pointer mr-2"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleCountryEdit(data.country);
                                        }}
                                      >
                                        Edit
                                      </span>
                                    )}
                                    {data.country && (
                                      <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                                        {data.country.canonical_slug || `/foster-agency/${countryId}`}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </AccordionTrigger>
                              <AccordionContent>
                                {Object.entries(data.regions).map(([regionId, regionData]) => (
                                  <Accordion key={regionId} type="single" collapsible className="w-full ml-4">
                                    <AccordionItem value={regionId} className="border-b-0">
                                      <AccordionTrigger 
                                        className="py-2 hover:no-underline text-sm"
                                        onClick={() => setExpandedRegions(prev => ({ ...prev, [regionId]: !prev[regionId] }))}
                                      >
                                        <div className="flex items-center justify-between w-full">
                                          <div className="flex items-center">
                                            {expandedRegions[regionId] ? <FolderOpen className="w-4 h-4 mr-2" /> : <Folder className="w-4 h-4 mr-2" />}
                                            <span>{regionData.region?.name || formatSlugToTitle(regionId)}</span>
                                          </div>
                                          <div className="flex items-center">
                                            {regionData.region && regionData.region.editable && (
                                              <span
                                                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-6 px-2 text-xs cursor-pointer mr-2"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  handleRegionEdit(regionData.region);
                                                }}
                                              >
                                                Edit
                                              </span>
                                            )}
                                            {regionData.region && (
                                              <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                                                {regionData.region.canonical_slug || `/foster-agency/${countryId}/${regionId}`}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </AccordionTrigger>
                                      <AccordionContent>
                                        <div className="ml-4 space-y-1">
                                          {regionData.cities.map((city) => (
                                            <div
                                              key={city.slug || city.id}
                                              className="w-full justify-between text-sm inline-flex items-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-8 px-2 cursor-pointer"
                                              onClick={() => {
                                                if (city.editable) {
                                                  handleLocationEdit(city);
                                                }
                                              }}
                                            >
                                              <div className="flex items-center">
                                                <Globe className="w-3 h-3 mr-2" />
                                                <span>{city.name || formatSlugToTitle(city.slug?.split('/').pop() || city.id)}</span>
                                              </div>
                                              <div className="flex items-center">
                                                {city.editable && (
                                                  <span className="text-xs bg-primary text-primary-foreground px-1.5 py-0.5 rounded mr-2">Editable</span>
                                                )}
                                                <span className="text-xs text-muted-foreground">{city.canonical_slug}</span>
                                              </div>
                                            </div>
                                          ))}
                                        </div>
                                      </AccordionContent>
                                    </AccordionItem>
                                  </Accordion>
                                ))}
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        ))
                      )}
                      {(!locationContent || locationContent.length === 0) && (
                        <div className="text-center py-8 text-muted-foreground">
                          No locations found. Check if canonical_slug migration ran successfully.
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
                <div className="flex justify-between">
                  <Button onClick={handleSelectFirstPage}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Select First Location
                  </Button>
                  <Button onClick={handleReloadTree}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Reload Tree
                  </Button>
                </div>
              </div>

              {/* Location Editor */}
              <div className="lg:col-span-3">
                {selectedLocation ? (
                  <form onSubmit={handleLocationSave}>
                    <Card className="glass-card rounded-modern">
                      <CardHeader>
                        <CardTitle>Edit {selectedLocation.name} ({selectedLocation.type})</CardTitle>
                        <CardDescription>Modify content for {selectedLocation.name}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="location-title">Title</Label>
                          <Input
                            id="location-title"
                            value={locationFormData.title || ''}
                            onChange={(e) => setLocationFormData({ ...locationFormData, title: e.target.value })}
                            placeholder="Enter location title"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location-canonical-slug">Canonical Slug</Label>
                          <div className="text-sm text-muted-foreground mb-1">
                            Full path: {locationFormData.canonical_slug || 'Not set'}
                          </div>
                          <Input
                            id="location-canonical-slug"
                            value={locationFormData.canonical_slug || ''}
                            readOnly
                            className="bg-muted"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location-meta_title">Meta Title</Label>
                          <Input
                            id="location-meta_title"
                            value={locationFormData.meta_title || locationFormData.seo?.title || ''}
                            onChange={(e) => setLocationFormData({ ...locationFormData, meta_title: e.target.value, seo: { ...locationFormData.seo, title: e.target.value } })}
                            placeholder="Enter meta title for SEO"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="location-meta_description">Meta Description</Label>
                          <Textarea
                            id="location-meta_description"
                            value={locationFormData.meta_description || locationFormData.seo?.description || ''}
                            onChange={(e) => setLocationFormData({ ...locationFormData, meta_description: e.target.value, seo: { ...locationFormData.seo, description: e.target.value } })}
                            placeholder="Enter meta description for SEO"
                            rows={3}
                          />
                        </div>

                        {/* Dynamic Sections Editor based on location type */}
                        {selectedLocation && (
                          <DynamicSectionEditor 
                            locationType={selectedLocation.type}
                            content={locationFormData}
                            onChange={(updatedContent) => setLocationFormData(updatedContent)}
                          />
                        )}

                        {selectedLocation && (
                          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                            <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                              <Info className="w-4 h-4 mr-2" />
                              Template Information
                            </h3>
                            <p className="text-sm text-blue-700 mb-2">
                              Editing content for {selectedLocation.name} ({selectedLocation.type} template)
                            </p>
                            <p className="text-xs text-blue-600">
                              This location uses the {locationSchemas[selectedLocation.type]?.label || 'default'} template which includes the following sections:
                            </p>
                            <ul className="mt-2 text-xs text-blue-600 list-disc list-inside space-y-1">
                              {locationSchemas[selectedLocation.type]?.sections?.map((section) => (
                                <li key={section.key}>
                                  <strong>{section.label}</strong> - {section.description}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <FAQEditor 
                          faqs={locationFormData.faqs?.items || locationFormData.faqs || []}
                          onChange={(faqs) => setLocationFormData({ ...locationFormData, faqs: { items: faqs } })}
                        />

                        <div className="flex justify-end">
                          <Button type="submit">Save Location Content</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </form>
                ) : (
                  <Card className="glass-card rounded-modern">
                    <CardContent className="py-12">
                      <div className="text-center mb-8">
                        <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">No Location Selected</h3>
                        <p className="text-gray-500">Select a location from the tree to start editing</p>
                      </div>
                      
                      <div className="max-w-2xl mx-auto">
                        <TemplateGuide />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}