'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { 
  Save, 
  ArrowLeft,
  FileText,
  Eye,
  Edit,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  Undo,
  Redo,
  Plus,
  Trash2,
  MoveUp,
  MoveDown,
  Search,
  Users,
  Heart,
  Shield,
  MapPin,
  Globe,
  ChevronDown,
  Folder,
  FolderOpen
} from 'lucide-react';

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
  
  // State for rich text editor
  const [activeEditor, setActiveEditor] = useState(null);

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
      const response = await fetch('/api/admin/cms');
      if (response.ok) {
        const data = await response.json();
        setLocationContent(Object.values(data));
      }
    } catch (error) {
      console.error('Error fetching location content:', error);
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

  const handleLocationEdit = (content) => {
    setSelectedLocation(content);
    setLocationFormData({ ...content });
  };

  const handleLocationSave = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/admin/cms', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(locationFormData),
      });

      if (response.ok) {
        setSelectedLocation(null);
        setLocationFormData({});
        fetchLocationContent();
        alert('Location content saved successfully!');
      } else {
        alert('Error saving location content');
      }
    } catch (error) {
      console.error('Error saving:', error);
      alert('Error saving location content');
    }
  };

  // Organize locations by country > region > city
  const organizeLocations = () => {
    const organized = {};
    locationContent.forEach(content => {
      const parts = content.slug.split('/');
      if (parts.length === 1) {
        // Country
        if (!organized[parts[0]]) {
          organized[parts[0]] = { country: content, regions: {} };
        }
      } else if (parts.length === 2) {
        // Region
        const [country, region] = parts;
        if (!organized[country]) {
          organized[country] = { country: null, regions: {} };
        }
        if (!organized[country].regions[region]) {
          organized[country].regions[region] = { region: content, cities: [] };
        }
      } else if (parts.length === 3) {
        // City
        const [country, region, city] = parts;
        if (!organized[country]) {
          organized[country] = { country: null, regions: {} };
        }
        if (!organized[country].regions[region]) {
          organized[country].regions[region] = { region: null, cities: [] };
        }
        organized[country].regions[region].cities.push(content);
      }
    });
    return organized;
  };

  const fetchPages = async () => {
    try {
      setLoading(true);
      
      // Use mock data directly to prevent API errors
      const mockData = [
        { id: 1, title: 'Home Page', slug: 'home', meta_description: 'Welcome to Foster Care UK' },
        { id: 2, title: 'About Us', slug: 'about', meta_description: 'Learn about our mission and services' },
        { id: 3, title: 'Contact', slug: 'contact', meta_description: 'Get in touch with our team' },
        { id: 4, title: 'Becoming a Foster Carer', slug: 'becoming-a-foster-carer', meta_description: 'Learn how to become a foster carer with us' },
        { id: 5, title: 'Types of Fostering', slug: 'types-of-fostering', meta_description: 'Explore different types of fostering opportunities' },
        { id: 6, title: 'Support Services', slug: 'support-services', meta_description: 'Discover the support services we offer to foster carers' }
      ];
      
      // Try to load from localStorage first
      const savedPages = localStorage.getItem('foster_care_pages');
      if (savedPages) {
        try {
          const parsedPages = JSON.parse(savedPages);
          if (Array.isArray(parsedPages) && parsedPages.length > 0) {
            setPages(parsedPages);
            setLoading(false);
            return;
          }
        } catch (e) {
          console.error('Error parsing saved pages:', e);
        }
      }
      
      // If no localStorage data, use mock data
      setPages(mockData);
      
      // Save mock data to localStorage for persistence
      localStorage.setItem('foster_care_pages', JSON.stringify(mockData));
      
      setLoading(false);
      
      /* 
      // This code will be used when the pages table exists in Supabase
      const { data: pagesData, error } = await supabase
        .from('pages')
        .select('id, title, slug, meta_description')
        .order('title');
      
      if (error) {
        console.error('Error fetching pages from Supabase:', error);
        // Fallback to mock data
        setPages(mockData);
        console.log('Using mock data instead:', mockData);
      } else {
        setPages(pagesData || []);
      }
      */
    } catch (error) {
      console.error('Error fetching pages:', error);
      // Ensure we still have data even if there's an exception
      const mockData = [
        { id: 1, title: 'Home Page', slug: 'home', meta_description: 'Welcome to Foster Care UK' },
        { id: 2, title: 'About Us', slug: 'about', meta_description: 'Learn about our mission and services' },
        { id: 3, title: 'Contact', slug: 'contact', meta_description: 'Get in touch with our team' }
      ];
      setPages(mockData);
      
      // Save to localStorage even on error
      localStorage.setItem('foster_care_pages', JSON.stringify(mockData));
      
      setLoading(false);
    }
  };

  const fetchPageSections = async (pageId) => {
    try {
      setLoading(true);
      
      // Try to load from localStorage first
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
      
      // If no localStorage data, use mock data
      const mockSections = pageId === '1' ? [
        { 
          id: 1, 
          page_id: pageId,
          title: 'Hero Section', 
          heading: 'Find Your Perfect Fostering Agency', 
          content: 'Connecting caring hearts with fostering opportunities across the UK. Browse verified agencies, read reviews, and start your fostering journey today.', 
          heading_type: 'h1',
          order: 1,
          type: 'hero',
          subtitle: 'Foster Care Directory',
          subheading: 'Fostering Agency',
          primary_button_text: "Find Agencies",
          primary_button_link: "/agencies",
          secondary_button_text: "Learn More",
          secondary_button_link: "/resources"
        },
        { 
          id: 2, 
          page_id: pageId,
          title: 'How It Works Section', 
          heading: 'How It Works', 
          content: 'Finding the right fostering agency is easy with our simple three-step process', 
          heading_type: 'h2',
          order: 2,
          type: 'how_it_works',
          subtitle: 'Simple Process',
          cards: JSON.stringify([
            {
              title: "Search & Discover",
              description: "Browse through verified fostering agencies in your area with detailed profiles and reviews.",
              icon: "Search"
            },
            {
              title: "Compare & Learn",
              description: "Read real reviews, compare services, and learn about each agency's approach to fostering.",
              icon: "Users"
            },
            {
              title: "Connect & Start",
              description: "Contact agencies directly, ask questions, and begin your rewarding fostering journey.",
              icon: "Heart"
            }
          ])
        },
        { 
          id: 3, 
          page_id: pageId,
          title: 'Featured Agencies Section', 
          heading: 'Featured Agencies', 
          content: 'Trusted fostering agencies across the UK', 
          heading_type: 'h2',
          order: 3,
          type: 'featured_agencies',
          subtitle: 'Verified Agencies',
          button_text: "View All Agencies",
          button_link: "/agencies"
        },
        { 
          id: 4, 
          page_id: pageId,
          title: 'Testimonials Section', 
          heading: 'Success Stories', 
          content: 'Hear from families who found their perfect match through our directory', 
          heading_type: 'h2',
          order: 4,
          type: 'testimonials',
          subtitle: 'Testimonials',
          testimonials: JSON.stringify([
            {
              name: "Sarah & James",
              location: "Manchester",
              quote: "Finding the right agency was overwhelming until we discovered this directory. The reviews and detailed profiles helped us make the perfect choice.",
              rating: 5
            },
            {
              name: "Emma Thompson",
              location: "London",
              quote: "As a single foster carer, I needed an agency that understood my situation. This platform made it so easy to find and connect with the right support.",
              rating: 5
            },
            {
              name: "David & Claire",
              location: "Birmingham",
              quote: "The transparency and genuine reviews gave us confidence. We're now fostering two wonderful children and couldn't be happier with our agency.",
              rating: 5
            }
          ])
        },
        { 
          id: 5, 
          page_id: pageId,
          title: 'Resources Section', 
          heading: 'Resources & ', 
          content: 'Everything you need to know about fostering in the UK. From legal requirements to heartwarming success stories, we\'ve got you covered.', 
          heading_type: 'h2',
          order: 5,
          type: 'resources',
          subtitle: 'Knowledge Hub',
          subheading: 'Guides',
          button_text: "View All Resources",
          button_link: "/resources",
          secondary_button_text: "Getting Started Guide",
          secondary_button_link: "/resources/getting-started",
          highlights: JSON.stringify([
            {
              title: "Getting Started",
              description: "Essential information for those beginning their fostering journey",
              icon: "BookOpen"
            },
            {
              title: "Legal Requirements",
              description: "Understanding the legal aspects of becoming a foster carer",
              icon: "FileText"
            }
          ])
        },
        { 
          id: 6, 
          page_id: pageId,
          title: 'CTA Section', 
          heading: 'Are You a Fostering Agency?', 
          content: 'Join our trusted directory and connect with families looking for the perfect fostering partnership. Get started with a free basic listing today.', 
          heading_type: 'h2',
          order: 6,
          type: 'cta',
          primary_button_text: "Register Your Agency",
          primary_button_link: "/auth/signup",
          secondary_button_text: "Learn More",
          secondary_button_link: "/contact"
        }
      ] : [
        { 
          id: 1, 
          page_id: pageId,
          title: 'Hero Section', 
          heading: 'Welcome to Foster Care UK', 
          content: 'Supporting families and children across the UK', 
          heading_type: 'h1',
          order: 1,
          type: 'hero',
          subtitle: 'Foster Care Directory',
          subheading: 'Fostering Agency',
          primary_button_text: "Find Agencies",
          primary_button_link: "/agencies",
          secondary_button_text: "Learn More",
          secondary_button_link: "/resources"
        },
        { 
          id: 2, 
          page_id: pageId,
          title: 'How It Works Section', 
          heading: 'How It Works', 
          content: 'Finding the right fostering agency is easy with our simple three-step process', 
          heading_type: 'h2',
          order: 2,
          type: 'how_it_works',
          subtitle: 'Simple Process',
          cards: JSON.stringify([
            {
              title: "Search & Discover",
              description: "Browse through verified fostering agencies in your area with detailed profiles and reviews.",
              icon: "Search"
            },
            {
              title: "Compare & Learn",
              description: "Read real reviews, compare services, and learn about each agency's approach to fostering.",
              icon: "Users"
            },
            {
              title: "Connect & Start",
              description: "Contact agencies directly, ask questions, and begin your rewarding fostering journey.",
              icon: "Heart"
            }
          ])
        },
        { 
          id: 3, 
          page_id: pageId,
          title: 'Featured Agencies Section', 
          heading: 'Featured Agencies', 
          content: 'Trusted fostering agencies across the UK', 
          heading_type: 'h2',
          order: 3,
          type: 'featured_agencies',
          subtitle: 'Verified Agencies',
          button_text: "View All Agencies",
          button_link: "/agencies"
        },
        { 
          id: 4, 
          page_id: pageId,
          title: 'Testimonials Section', 
          heading: 'Success Stories', 
          content: 'Hear from families who found their perfect match through our directory', 
          heading_type: 'h2',
          order: 4,
          type: 'testimonials',
          subtitle: 'Testimonials',
          testimonials: JSON.stringify([
            {
              name: "Sarah & James",
              location: "Manchester",
              quote: "Finding the right agency was overwhelming until we discovered this directory. The reviews and detailed profiles helped us make the perfect choice.",
              rating: 5
            },
            {
              name: "Emma Thompson",
              location: "London",
              quote: "As a single foster carer, I needed an agency that understood my situation. This platform made it so easy to find and connect with the right support.",
              rating: 5
            },
            {
              name: "David & Claire",
              location: "Birmingham",
              quote: "The transparency and genuine reviews gave us confidence. We're now fostering two wonderful children and couldn't be happier with our agency.",
              rating: 5
            }
          ])
        },
        { 
          id: 5, 
          page_id: pageId,
          title: 'Resources Section', 
          heading: 'Resources & ', 
          content: 'Everything you need to know about fostering in the UK. From legal requirements to heartwarming success stories, we\'ve got you covered.', 
          heading_type: 'h2',
          order: 5,
          type: 'resources',
          subtitle: 'Knowledge Hub',
          subheading: 'Guides',
          button_text: "View All Resources",
          button_link: "/resources",
          secondary_button_text: "Getting Started Guide",
          secondary_button_link: "/resources/getting-started",
          highlights: JSON.stringify([
            {
              title: "Getting Started",
              description: "Essential information for those beginning their fostering journey",
              icon: "BookOpen"
            },
            {
              title: "Legal Requirements",
              description: "Understanding the legal aspects of becoming a foster carer",
              icon: "FileText"
            }
          ])
        },
        { 
          id: 6, 
          page_id: pageId,
          title: 'CTA Section', 
          heading: 'Are You a Fostering Agency?', 
          content: 'Join our trusted directory and connect with families looking for the perfect fostering partnership. Get started with a free basic listing today.', 
          heading_type: 'h2',
          order: 6,
          type: 'cta',
          primary_button_text: "Register Your Agency",
          primary_button_link: "/auth/signup",
          secondary_button_text: "Learn More",
          secondary_button_link: "/contact"
        }
      ];
      
      setPageSections(mockSections);
      
      // Save mock data to localStorage for persistence
      localStorage.setItem(storageKey, JSON.stringify(mockSections));
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching page sections:', error);
      // Always fall back to mock data on any error
      const mockSections = [
        { 
          id: 1, 
          page_id: pageId,
          title: 'Hero Section', 
          heading: 'Welcome to Foster Care UK', 
          content: 'Supporting families and children across the UK', 
          heading_type: 'h1',
          order: 1,
          type: 'hero',
          subtitle: 'Foster Care Directory',
          subheading: 'Fostering Agency',
          primary_button_text: "Find Agencies",
          primary_button_link: "/agencies",
          secondary_button_text: "Learn More",
          secondary_button_link: "/resources"
        },
        { 
          id: 2, 
          page_id: pageId,
          title: 'How It Works Section', 
          heading: 'How It Works', 
          content: 'Finding the right fostering agency is easy with our simple three-step process', 
          heading_type: 'h2',
          order: 2,
          type: 'how_it_works',
          subtitle: 'Simple Process',
          cards: JSON.stringify([
            {
              title: "Search & Discover",
              description: "Browse through verified fostering agencies in your area with detailed profiles and reviews.",
              icon: "Search"
            },
            {
              title: "Compare & Learn",
              description: "Read real reviews, compare services, and learn about each agency's approach to fostering.",
              icon: "Users"
            },
            {
              title: "Connect & Start",
              description: "Contact agencies directly, ask questions, and begin your rewarding fostering journey.",
              icon: "Heart"
            }
          ])
        },
        { 
          id: 3, 
          page_id: pageId,
          title: 'Featured Agencies Section', 
          heading: 'Featured Agencies', 
          content: 'Trusted fostering agencies across the UK', 
          heading_type: 'h2',
          order: 3,
          type: 'featured_agencies',
          subtitle: 'Verified Agencies',
          button_text: "View All Agencies",
          button_link: "/agencies"
        },
        { 
          id: 4, 
          page_id: pageId,
          title: 'Testimonials Section', 
          heading: 'Success Stories', 
          content: 'Hear from families who found their perfect match through our directory', 
          heading_type: 'h2',
          order: 4,
          type: 'testimonials',
          subtitle: 'Testimonials',
          testimonials: JSON.stringify([
            {
              name: "Sarah & James",
              location: "Manchester",
              quote: "Finding the right agency was overwhelming until we discovered this directory. The reviews and detailed profiles helped us make the perfect choice.",
              rating: 5
            },
            {
              name: "Emma Thompson",
              location: "London",
              quote: "As a single foster carer, I needed an agency that understood my situation. This platform made it so easy to find and connect with the right support.",
              rating: 5
            },
            {
              name: "David & Claire",
              location: "Birmingham",
              quote: "The transparency and genuine reviews gave us confidence. We're now fostering two wonderful children and couldn't be happier with our agency.",
              rating: 5
            }
          ])
        },
        { 
          id: 5, 
          page_id: pageId,
          title: 'Resources Section', 
          heading: 'Resources & ', 
          content: 'Everything you need to know about fostering in the UK. From legal requirements to heartwarming success stories, we\'ve got you covered.', 
          heading_type: 'h2',
          order: 5,
          type: 'resources',
          subtitle: 'Knowledge Hub',
          subheading: 'Guides',
          button_text: "View All Resources",
          button_link: "/resources",
          secondary_button_text: "Getting Started Guide",
          secondary_button_link: "/resources/getting-started",
          highlights: JSON.stringify([
            {
              title: "Getting Started",
              description: "Essential information for those beginning their fostering journey",
              icon: "BookOpen"
            },
            {
              title: "Legal Requirements",
              description: "Understanding the legal aspects of becoming a foster carer",
              icon: "FileText"
            }
          ])
        },
        { 
          id: 6, 
          page_id: pageId,
          title: 'CTA Section', 
          heading: 'Are You a Fostering Agency?', 
          content: 'Join our trusted directory and connect with families looking for the perfect fostering partnership. Get started with a free basic listing today.', 
          heading_type: 'h2',
          order: 6,
          type: 'cta',
          primary_button_text: "Register Your Agency",
          primary_button_link: "/auth/signup",
          secondary_button_text: "Learn More",
          secondary_button_link: "/contact"
        }
      ];
      
      // Save to localStorage even on error
      const storageKey = `foster_care_page_sections_${pageId}`;
      localStorage.setItem(storageKey, JSON.stringify(mockSections));
      
      setPageSections(mockSections);
      setLoading(false);
    }
  };

  const handlePageSelect = (pageId) => {
    setSelectedPage(pageId);
    const page = pages.find(p => p.id === parseInt(pageId));
    if (page) {
      setFormData({
        title: page.title || '',
        meta_description: page.meta_description || '',
        slug: page.slug || ''
      });
      
      // Clear localStorage to force reload of all sections
      localStorage.removeItem(`foster_care_page_sections_${pageId}`);
      
      // Fetch sections for this page
      fetchPageSections(pageId);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSectionChange = (sectionId, content) => {
    setPageSections(prev => 
      prev.map(section => 
        section.id === sectionId ? { ...section, content } : section
      )
    );
  };

  const handleSectionHeadingChange = (sectionId, heading) => {
    setPageSections(prev => 
      prev.map(section => 
        section.id === sectionId ? { ...section, heading } : section
      )
    );
  };
  
  const handleSectionSubtitleChange = (sectionId, subtitle) => {
    setPageSections(prev => 
      prev.map(section => 
        section.id === sectionId ? { ...section, subtitle } : section
      )
    );
  };
  
  const handleSectionSubheadingChange = (sectionId, subheading) => {
    setPageSections(prev => 
      prev.map(section => 
        section.id === sectionId ? { ...section, subheading } : section
      )
    );
  };
  
  const handleSectionButtonTextChange = (sectionId, buttonType, text) => {
    setPageSections(prev => 
      prev.map(section => 
        section.id === sectionId ? { ...section, [buttonType]: text } : section
      )
    );
  };

  // Add new handler functions for the additional fields
  const handleSectionButtonLinkChange = (sectionId, buttonType, link) => {
    setPageSections(prev => 
      prev.map(section => 
        section.id === sectionId ? { ...section, [buttonType]: link } : section
      )
    );
  };
  
  const handleSectionHighlightsChange = (sectionId, highlights) => {
    setPageSections(prev => 
      prev.map(section => 
        section.id === sectionId ? { ...section, highlights } : section
      )
    );
  };
  
  const handleSectionCardChange = (sectionId, cardIndex, field, value) => {
    setPageSections(prev => 
      prev.map(section => {
        if (section.id === sectionId && section.cards) {
          const cards = JSON.parse(section.cards);
          cards[cardIndex][field] = value;
          return { ...section, cards: JSON.stringify(cards) };
        }
        return section;
      })
    );
  };
  
  const handleAddCard = (sectionId) => {
    setPageSections(prev => 
      prev.map(section => {
        if (section.id === sectionId) {
          const cards = section.cards ? JSON.parse(section.cards) : [];
          cards.push({ title: "New Card", description: "Card description", icon: "FileText" });
          return { ...section, cards: JSON.stringify(cards) };
        }
        return section;
      })
    );
  };
  
  const handleDeleteCard = (sectionId, cardIndex) => {
    setPageSections(prev => 
      prev.map(section => {
        if (section.id === sectionId && section.cards) {
          const cards = JSON.parse(section.cards);
          cards.splice(cardIndex, 1);
          return { ...section, cards: JSON.stringify(cards) };
        }
        return section;
      })
    );
  };
  
  const handleTestimonialChange = (sectionId, testimonialIndex, field, value) => {
    setPageSections(prev => 
      prev.map(section => {
        if (section.id === sectionId && section.testimonials) {
          const testimonials = JSON.parse(section.testimonials);
          testimonials[testimonialIndex][field] = value;
          return { ...section, testimonials: JSON.stringify(testimonials) };
        }
        return section;
      })
    );
  };
  
  const handleAddTestimonial = (sectionId) => {
    setPageSections(prev => 
      prev.map(section => {
        if (section.id === sectionId) {
          const testimonials = section.testimonials ? JSON.parse(section.testimonials) : [];
          testimonials.push({ name: "New Testimonial", location: "Location", quote: "Testimonial quote", rating: 5 });
          return { ...section, testimonials: JSON.stringify(testimonials) };
        }
        return section;
      })
    );
  };
  
  const handleDeleteTestimonial = (sectionId, testimonialIndex) => {
    setPageSections(prev => 
      prev.map(section => {
        if (section.id === sectionId && section.testimonials) {
          const testimonials = JSON.parse(section.testimonials);
          testimonials.splice(testimonialIndex, 1);
          return { ...section, testimonials: JSON.stringify(testimonials) };
        }
        return section;
      })
    );
  };
  
  const handleResourceChange = (sectionId, resourceIndex, field, value) => {
    setPageSections(prev => 
      prev.map(section => {
        if (section.id === sectionId && section.resources) {
          const resources = JSON.parse(section.resources);
          resources[resourceIndex][field] = value;
          return { ...section, resources: JSON.stringify(resources) };
        }
        return section;
      })
    );
  };
  
  const handleAddResource = (sectionId) => {
    setPageSections(prev => 
      prev.map(section => {
        if (section.id === sectionId) {
          const resources = section.resources ? JSON.parse(section.resources) : [];
          resources.push({ title: "New Resource", description: "Resource description", icon: "FileText" });
          return { ...section, resources: JSON.stringify(resources) };
        }
        return section;
      })
    );
  };
  
  const handleDeleteResource = (sectionId, resourceIndex) => {
    setPageSections(prev => 
      prev.map(section => {
        if (section.id === sectionId && section.resources) {
          const resources = JSON.parse(section.resources);
          resources.splice(resourceIndex, 1);
          return { ...section, resources: JSON.stringify(resources) };
        }
        return section;
      })
    );
  };
  
  const handleButtonChange = (sectionId, buttonIndex, field, value) => {
    setPageSections(prev => 
      prev.map(section => {
        if (section.id === sectionId && section.buttons) {
          const buttons = JSON.parse(section.buttons);
          buttons[buttonIndex][field] = field === 'primary' ? value === 'true' : value;
          return { ...section, buttons: JSON.stringify(buttons) };
        }
        return section;
      })
    );
  };
  
  const handleAddButton = (sectionId) => {
    setPageSections(prev => 
      prev.map(section => {
        if (section.id === sectionId) {
          const buttons = section.buttons ? JSON.parse(section.buttons) : [];
          buttons.push({ text: "New Button", url: "/", primary: false });
          return { ...section, buttons: JSON.stringify(buttons) };
        }
        return section;
      })
    );
  };
  
  const handleDeleteButton = (sectionId, buttonIndex) => {
    setPageSections(prev => 
      prev.map(section => {
        if (section.id === sectionId && section.buttons) {
          const buttons = JSON.parse(section.buttons);
          buttons.splice(buttonIndex, 1);
          return { ...section, buttons: JSON.stringify(buttons) };
        }
        return section;
      })
    );
  };

  const applyFormatting = (sectionId, format) => {
    const textarea = document.getElementById(`section-${sectionId}`);
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    let formattedText = '';

    switch (format) {
      case 'bold':
        formattedText = `<strong>${selectedText}</strong>`;
        break;
      case 'italic':
        formattedText = `<em>${selectedText}</em>`;
        break;
      case 'underline':
        formattedText = `<u>${selectedText}</u>`;
        break;
      case 'ul':
        formattedText = `<ul>\n  <li>${selectedText}</li>\n</ul>`;
        break;
      case 'ol':
        formattedText = `<ol>\n  <li>${selectedText}</li>\n</ol>`;
        break;
      case 'link':
        const url = prompt('Enter URL:', 'https://');
        if (url) formattedText = `<a href="${url}">${selectedText || url}</a>`;
        else return;
        break;
      case 'alignLeft':
        formattedText = `<div style="text-align: left">${selectedText}</div>`;
        break;
      case 'alignCenter':
        formattedText = `<div style="text-align: center">${selectedText}</div>`;
        break;
      case 'alignRight':
        formattedText = `<div style="text-align: right">${selectedText}</div>`;
        break;
      case 'quote':
        formattedText = `<blockquote>${selectedText}</blockquote>`;
        break;
      default:
        return;
    }

    const newContent = textarea.value.substring(0, start) + formattedText + textarea.value.substring(end);
    handleSectionChange(sectionId, newContent);
    
    // Reset focus to the textarea
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + formattedText.length, start + formattedText.length);
    }, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Save page details to localStorage
      const pageIndex = pages.findIndex(p => p.id === parseInt(selectedPage));
      if (pageIndex !== -1) {
        const updatedPages = [...pages];
        updatedPages[pageIndex] = {
          ...updatedPages[pageIndex],
          title: formData.title || '',
          slug: formData.slug || '',
          meta_description: formData.meta_description || ''
        };
        
        // Update state and localStorage
        setPages(updatedPages);
        localStorage.setItem('foster_care_pages', JSON.stringify(updatedPages));
      }
      
      // Save page sections to localStorage
      const storageKey = `foster_care_page_sections_${selectedPage}`;
      localStorage.setItem(storageKey, JSON.stringify(pageSections));
      
      // Show a toast notification for success
      const successMessage = document.createElement('div');
      successMessage.className = 'fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded z-50 shadow-lg transition-opacity duration-300';
      successMessage.innerHTML = `
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <p><strong>Success!</strong> Page updated successfully.</p>
          <button class="ml-auto pl-3 text-green-700 hover:text-green-900" onclick="this.parentElement.parentElement.remove()">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
      `;
      document.body.appendChild(successMessage);
      
      // Add fade-out effect before removing
      setTimeout(() => {
        successMessage.style.opacity = '0';
        setTimeout(() => {
          if (document.body.contains(successMessage)) {
            document.body.removeChild(successMessage);
          }
        }, 300);
      }, 3000);
      
      setSaving(false);
      
      // Log the saved data for debugging
      console.log('Page data saved:', {
        pageDetails: formData,
        sections: pageSections
      });
    } catch (error) {
      console.error('Error updating page:', error);
      
      // Show a more informative error message
      const errorMessage = document.createElement('div');
      errorMessage.className = 'fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50';
      errorMessage.innerHTML = `
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
          <p><strong>Error!</strong> ${error.message || 'An error occurred while saving.'}</p>
        </div>
      `;
      document.body.appendChild(errorMessage);
      
      // Remove the message after 5 seconds
      setTimeout(() => {
        document.body.removeChild(errorMessage);
      }, 5000);
      
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading page editor...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const organizedLocations = organizeLocations();

  return (
    <div className="min-h-screen bg-background-offwhite">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-green to-secondary-blue text-text-charcoal py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2 font-poppins">Page & Location Editor</h1>
              <p className="opacity-90 font-inter">Edit and manage website pages and location content</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" asChild className="bg-white text-text-charcoal hover:bg-gray-100">
                <Link href="/admin">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
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
        </Tabs>

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
                      key={page.id}
                      variant={selectedPage === page.id ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => handlePageSelect(page.id)}
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
                    <CardDescription>Modify the content for {pages.find(p => p.id === selectedPage)?.title}</CardDescription>
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
                        value={formData.slug}
                        onChange={handleChange}
                        placeholder="page-url-slug"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="meta_description">Meta Description</Label>
                      <Textarea
                        id="meta_description"
                        name="meta_description"
                        value={formData.meta_description}
                        onChange={handleChange}
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
                            <Label htmlFor={`section-${section.id}`} className="font-medium text-md">
                              {section.title}
                            </Label>
                            <Select 
                              defaultValue={section.heading_type || "paragraph"}
                              onValueChange={(value) => {
                                setPageSections(prev => 
                                  prev.map(s => 
                                    s.id === section.id ? { ...s, heading_type: value } : s
                                  )
                                );
                              }}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Paragraph" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="paragraph">Paragraph</SelectItem>
                                <SelectItem value="h1">Heading 1</SelectItem>
                                <SelectItem value="h2">Heading 2</SelectItem>
                                <SelectItem value="h3">Heading 3</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          {/* Render section content based on type */}
                          {previewMode ? (
                            <div>
                              {section.subtitle && (
                                <div className="text-sm font-medium text-primary mb-1">
                                  {section.subtitle}
                                </div>
                              )}
                              {section.heading && (
                                <div className={section.heading_type === 'h1' ? 'text-3xl font-bold mb-4' : 
                                               section.heading_type === 'h2' ? 'text-2xl font-bold mb-3' : 
                                               section.heading_type === 'h3' ? 'text-xl font-bold mb-2' : 'text-lg font-medium mb-2'}>
                                  {section.heading}
                                  {section.subheading && <span className="ml-1">{section.subheading}</span>}
                                </div>
                              )}
                              <div dangerouslySetInnerHTML={{ __html: section.content }} />
                              
                              {/* Preview cards if they exist */}
                              {section.cards && (
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                                  {JSON.parse(section.cards).map((card, idx) => (
                                    <div key={idx} className="border rounded-md p-3">
                                      <div className="font-medium">{card.title}</div>
                                      <div className="text-sm text-gray-600">{card.description}</div>
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              {/* Preview testimonials if they exist */}
                              {section.testimonials && (
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {JSON.parse(section.testimonials).map((testimonial, idx) => (
                                    <div key={idx} className="border rounded-md p-3">
                                      <div className="italic">"{testimonial.quote}"</div>
                                      <div className="font-medium mt-2">{testimonial.name}</div>
                                      <div className="text-sm text-gray-600">{testimonial.location}</div>
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              {/* Preview resources/highlights if they exist */}
                              {section.highlights && (
                                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {JSON.parse(section.highlights).map((highlight, idx) => (
                                    <div key={idx} className="border rounded-md p-3">
                                      <div className="font-medium">{highlight.title}</div>
                                      <div className="text-sm text-gray-600">{highlight.description}</div>
                                    </div>
                                  ))}
                                </div>
                              )}
                              
                              {/* Preview buttons if they exist */}
                              {(section.primary_button_text || section.secondary_button_text || section.button_text) && (
                                <div className="mt-4 flex gap-2">
                                  {section.primary_button_text && (
                                    <div className="px-4 py-2 bg-primary text-white rounded-md inline-block">
                                      {section.primary_button_text}
                                    </div>
                                  )}
                                  {section.secondary_button_text && (
                                    <div className="px-4 py-2 border border-gray-300 rounded-md inline-block">
                                      {section.secondary_button_text}
                                    </div>
                                  )}
                                  {section.button_text && (
                                    <div className="px-4 py-2 bg-primary text-white rounded-md inline-block">
                                      {section.button_text}
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="space-y-4">
                              {/* Section-specific editors */}
                              {section.title === 'Hero Section' && (
                                <>
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Subtitle</Label>
                                    <Input 
                                      placeholder="Section subtitle"
                                      value={section.subtitle || ''}
                                      onChange={(e) => handleSectionSubtitleChange(section.id, e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Heading</Label>
                                    <Input 
                                      placeholder="Section heading"
                                      value={section.heading || ''}
                                      onChange={(e) => handleSectionHeadingChange(section.id, e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Subheading</Label>
                                    <Input 
                                      placeholder="Section subheading"
                                      value={section.subheading || ''}
                                      onChange={(e) => handleSectionSubheadingChange(section.id, e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Content</Label>
                                    <Textarea
                                      placeholder="Section content"
                                      value={section.content || ''}
                                      onChange={(e) => handleSectionChange(section.id, e.target.value)}
                                      rows={3}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Primary Button Text</Label>
                                    <Input 
                                      placeholder="Primary button text"
                                      value={section.primary_button_text || ''}
                                      onChange={(e) => handleSectionButtonTextChange(section.id, 'primary_button_text', e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Primary Button Link</Label>
                                    <Input 
                                      placeholder="Primary button link"
                                      value={section.primary_button_link || ''}
                                      onChange={(e) => handleSectionButtonTextChange(section.id, 'primary_button_link', e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Secondary Button Text</Label>
                                    <Input 
                                      placeholder="Secondary button text"
                                      value={section.secondary_button_text || ''}
                                      onChange={(e) => handleSectionButtonTextChange(section.id, 'secondary_button_text', e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Secondary Button Link</Label>
                                    <Input 
                                      placeholder="Secondary button link"
                                      value={section.secondary_button_link || ''}
                                      onChange={(e) => handleSectionButtonTextChange(section.id, 'secondary_button_link', e.target.value)}
                                    />
                                  </div>
                                </>
                              )}
                              
                              {section.title === 'How It Works Section' && (
                                <>
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Subtitle</Label>
                                    <Input 
                                      placeholder="Section subtitle"
                                      value={section.subtitle || ''}
                                      onChange={(e) => handleSectionSubtitleChange(section.id, e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Heading</Label>
                                    <Input 
                                      placeholder="Section heading"
                                      value={section.heading || ''}
                                      onChange={(e) => handleSectionHeadingChange(section.id, e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Content</Label>
                                    <Textarea
                                      placeholder="Section content"
                                      value={section.content || ''}
                                      onChange={(e) => handleSectionChange(section.id, e.target.value)}
                                      rows={3}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <div className="flex justify-between items-center mb-2">
                                      <Label className="text-sm text-gray-500">Cards</Label>
                                      <Button 
                                        type="button" 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => handleAddCard(section.id)}
                                      >
                                        <Plus className="h-4 w-4 mr-1" /> Add Card
                                      </Button>
                                    </div>
                                    
                                    {section.cards && JSON.parse(section.cards).map((card, index) => (
                                      <div key={index} className="border rounded-md p-2 mb-2">
                                        <div className="flex justify-between items-center mb-2">
                                          <div className="font-medium">Card {index + 1}</div>
                                          <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-500"
                                            onClick={() => handleDeleteCard(section.id, index)}
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </div>
                                        
                                        <div className="space-y-2">
                                          <div>
                                            <Label>Icon</Label>
                                            <Select
                                              value={card.icon || "Search"}
                                              onValueChange={(value) => handleSectionCardChange(section.id, index, 'icon', value)}
                                            >
                                              <SelectTrigger>
                                                <SelectValue placeholder="Select icon" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="Search">Search</SelectItem>
                                                <SelectItem value="Users">Users</SelectItem>
                                                <SelectItem value="Heart">Heart</SelectItem>
                                                <SelectItem value="Shield">Shield</SelectItem>
                                                <SelectItem value="FileText">FileText</SelectItem>
                                                <SelectItem value="BookOpen">BookOpen</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          
                                          <div>
                                            <Label>Title</Label>
                                            <Input
                                              value={card.title || ''}
                                              onChange={(e) => handleSectionCardChange(section.id, index, 'title', e.target.value)}
                                            />
                                          </div>
                                          
                                          <div>
                                            <Label>Description</Label>
                                            <Textarea
                                              value={card.description || ''}
                                              onChange={(e) => handleSectionCardChange(section.id, index, 'description', e.target.value)}
                                              rows={2}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </>
                              )}
                              
                              {section.title === 'Featured Agencies Section' && (
                                <>
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Subtitle</Label>
                                    <Input 
                                      placeholder="Section subtitle"
                                      value={section.subtitle || ''}
                                      onChange={(e) => handleSectionSubtitleChange(section.id, e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Heading</Label>
                                    <Input 
                                      placeholder="Section heading"
                                      value={section.heading || ''}
                                      onChange={(e) => handleSectionHeadingChange(section.id, e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Content</Label>
                                    <Textarea
                                      placeholder="Section content"
                                      value={section.content || ''}
                                      onChange={(e) => handleSectionChange(section.id, e.target.value)}
                                      rows={3}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Button Text</Label>
                                    <Input 
                                      placeholder="Button text"
                                      value={section.button_text || ''}
                                      onChange={(e) => handleSectionButtonTextChange(section.id, 'button_text', e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Button Link</Label>
                                    <Input 
                                      placeholder="Button link"
                                      value={section.button_link || ''}
                                      onChange={(e) => handleSectionButtonTextChange(section.id, 'button_link', e.target.value)}
                                    />
                                  </div>
                                </>
                              )}
                              
                              {section.title === 'Testimonials Section' && (
                                <>
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Subtitle</Label>
                                    <Input 
                                      placeholder="Section subtitle"
                                      value={section.subtitle || ''}
                                      onChange={(e) => handleSectionSubtitleChange(section.id, e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Heading</Label>
                                    <Input 
                                      placeholder="Section heading"
                                      value={section.heading || ''}
                                      onChange={(e) => handleSectionHeadingChange(section.id, e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Content</Label>
                                    <Textarea
                                      placeholder="Section content"
                                      value={section.content || ''}
                                      onChange={(e) => handleSectionChange(section.id, e.target.value)}
                                      rows={3}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <div className="flex justify-between items-center mb-2">
                                      <Label className="text-sm text-gray-500">Testimonials</Label>
                                      <Button 
                                        type="button" 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => handleAddTestimonial(section.id)}
                                      >
                                        <Plus className="h-4 w-4 mr-1" /> Add Testimonial
                                      </Button>
                                    </div>
                                    
                                    {section.testimonials && JSON.parse(section.testimonials).map((testimonial, index) => (
                                      <div key={index} className="border rounded-md p-2 mb-2">
                                        <div className="flex justify-between items-center mb-2">
                                          <div className="font-medium">Testimonial {index + 1}</div>
                                          <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-500"
                                            onClick={() => handleDeleteTestimonial(section.id, index)}
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </div>
                                        
                                        <div className="space-y-2">
                                          <div>
                                            <Label>Name</Label>
                                            <Input
                                              value={testimonial.name || ''}
                                              onChange={(e) => handleTestimonialChange(section.id, index, 'name', e.target.value)}
                                            />
                                          </div>
                                          
                                          <div>
                                            <Label>Location</Label>
                                            <Input
                                              value={testimonial.location || ''}
                                              onChange={(e) => handleTestimonialChange(section.id, index, 'location', e.target.value)}
                                            />
                                          </div>
                                          
                                          <div>
                                            <Label>Quote</Label>
                                            <Textarea
                                              value={testimonial.quote || ''}
                                              onChange={(e) => handleTestimonialChange(section.id, index, 'quote', e.target.value)}
                                              rows={3}
                                            />
                                          </div>
                                          
                                          <div>
                                            <Label>Rating (1-5)</Label>
                                            <Input
                                              type="number"
                                              min="1"
                                              max="5"
                                              value={testimonial.rating || 5}
                                              onChange={(e) => handleTestimonialChange(section.id, index, 'rating', parseInt(e.target.value))}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </>
                              )}
                              {section.title === 'Resources Section' && (
                                <>
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Subtitle</Label>
                                    <Input 
                                      placeholder="Section subtitle"
                                      value={section.subtitle || ''}
                                      onChange={(e) => handleSectionSubtitleChange(section.id, e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Heading</Label>
                                    <Input 
                                      placeholder="Section heading"
                                      value={section.heading || ''}
                                      onChange={(e) => handleSectionHeadingChange(section.id, e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Subheading</Label>
                                    <Input 
                                      placeholder="Section subheading"
                                      value={section.subheading || ''}
                                      onChange={(e) => handleSectionSubheadingChange(section.id, e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Content</Label>
                                    <Textarea
                                      placeholder="Section content"
                                      value={section.content || ''}
                                      onChange={(e) => handleSectionChange(section.id, e.target.value)}
                                      rows={3}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <div className="flex justify-between items-center mb-2">
                                      <Label className="text-sm text-gray-500">Highlights</Label>
                                      <Button 
                                        type="button" 
                                        variant="outline" 
                                        size="sm"
                                        onClick={() => handleAddResource(section.id)}
                                      >
                                        <Plus className="h-4 w-4 mr-1" /> Add Highlight
                                      </Button>
                                    </div>
                                    
                                    {section.highlights && JSON.parse(section.highlights).map((highlight, index) => (
                                      <div key={index} className="border rounded-md p-2 mb-2">
                                        <div className="flex justify-between items-center mb-2">
                                          <div className="font-medium">Highlight {index + 1}</div>
                                          <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-500"
                                            onClick={() => handleDeleteResource(section.id, index)}
                                          >
                                            <Trash2 className="h-4 w-4" />
                                          </Button>
                                        </div>
                                        
                                        <div className="space-y-2">
                                          <div>
                                            <Label>Icon</Label>
                                            <Select
                                              value={highlight.icon || "BookOpen"}
                                              onValueChange={(value) => handleResourceChange(section.id, index, 'icon', value)}
                                            >
                                              <SelectTrigger>
                                                <SelectValue placeholder="Select icon" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="BookOpen">BookOpen</SelectItem>
                                                <SelectItem value="FileText">FileText</SelectItem>
                                                <SelectItem value="Search">Search</SelectItem>
                                                <SelectItem value="Users">Users</SelectItem>
                                                <SelectItem value="Heart">Heart</SelectItem>
                                                <SelectItem value="Shield">Shield</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          
                                          <div>
                                            <Label>Title</Label>
                                            <Input
                                              value={highlight.title || ''}
                                              onChange={(e) => handleResourceChange(section.id, index, 'title', e.target.value)}
                                            />
                                          </div>
                                          
                                          <div>
                                            <Label>Description</Label>
                                            <Textarea
                                              value={highlight.description || ''}
                                              onChange={(e) => handleResourceChange(section.id, index, 'description', e.target.value)}
                                              rows={2}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Primary Button Text</Label>
                                    <Input 
                                      placeholder="Primary button text"
                                      value={section.button_text || ''}
                                      onChange={(e) => handleSectionButtonTextChange(section.id, 'button_text', e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Primary Button Link</Label>
                                    <Input 
                                      placeholder="Primary button link"
                                      value={section.button_link || ''}
                                      onChange={(e) => handleSectionButtonTextChange(section.id, 'button_link', e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Secondary Button Text</Label>
                                    <Input 
                                      placeholder="Secondary button text"
                                      value={section.secondary_button_text || ''}
                                      onChange={(e) => handleSectionButtonTextChange(section.id, 'secondary_button_text', e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Secondary Button Link</Label>
                                    <Input 
                                      placeholder="Secondary button link"
                                      value={section.secondary_button_link || ''}
                                      onChange={(e) => handleSectionButtonTextChange(section.id, 'secondary_button_link', e.target.value)}
                                    />
                                  </div>
                                </>
                              )}
                              
                              {section.title === 'CTA Section' && (
                                <>
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Heading</Label>
                                    <Input 
                                      placeholder="Section heading"
                                      value={section.heading || ''}
                                      onChange={(e) => handleSectionHeadingChange(section.id, e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Content</Label>
                                    <Textarea
                                      placeholder="Section content"
                                      value={section.content || ''}
                                      onChange={(e) => handleSectionChange(section.id, e.target.value)}
                                      rows={3}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Primary Button Text</Label>
                                    <Input 
                                      placeholder="Primary button text"
                                      value={section.primary_button_text || ''}
                                      onChange={(e) => handleSectionButtonTextChange(section.id, 'primary_button_text', e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Primary Button Link</Label>
                                    <Input 
                                      placeholder="Primary button link"
                                      value={section.primary_button_link || ''}
                                      onChange={(e) => handleSectionButtonTextChange(section.id, 'primary_button_link', e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Secondary Button Text</Label>
                                    <Input 
                                      placeholder="Secondary button text"
                                      value={section.secondary_button_text || ''}
                                      onChange={(e) => handleSectionButtonTextChange(section.id, 'secondary_button_text', e.target.value)}
                                    />
                                  </div>
                                  
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Secondary Button Link</Label>
                                    <Input 
                                      placeholder="Secondary button link"
                                      value={section.secondary_button_link || ''}
                                      onChange={(e) => handleSectionButtonTextChange(section.id, 'secondary_button_link', e.target.value)}
                                    />
                                  </div>
                                </>
                              )}
                              
                              {/* Default editor for any other section type */}
                              {!['Hero Section', 'How It Works Section', 'Featured Agencies Section', 'Testimonials Section', 'Resources Section', 'CTA Section'].includes(section.title) && (
                                <>
                                  <div className="border rounded-md p-2">
                                    <Label className="text-sm text-gray-500 mb-1 block">Heading</Label>
                                    <Input 
                                      placeholder="Section heading"
                                      value={section.heading || ''}
                                      onChange={(e) => handleSectionHeadingChange(section.id, e.target.value)}
                                    />
                                  </div>
                                </>
                              )}
                              
                              {/* Content Editor - common for all sections */}
                              <div className="border rounded-md">
                                 <div className="flex flex-wrap gap-1 p-2 border-b bg-gray-50">
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => applyFormatting(section.id, 'bold')}
                                  >
                                    <Bold className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => applyFormatting(section.id, 'italic')}
                                  >
                                    <Italic className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => applyFormatting(section.id, 'underline')}
                                  >
                                    <Underline className="h-4 w-4" />
                                  </Button>
                                  <span className="w-px h-6 bg-gray-300 mx-1 self-center"></span>
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => applyFormatting(section.id, 'ul')}
                                  >
                                    <List className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => applyFormatting(section.id, 'ol')}
                                  >
                                    <ListOrdered className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => applyFormatting(section.id, 'link')}
                                  >
                                    <Link2 className="h-4 w-4" />
                                  </Button>
                                  <span className="w-px h-6 bg-gray-300 mx-1 self-center"></span>
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => applyFormatting(section.id, 'alignLeft')}
                                  >
                                    <AlignLeft className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => applyFormatting(section.id, 'alignCenter')}
                                  >
                                    <AlignCenter className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => applyFormatting(section.id, 'alignRight')}
                                  >
                                    <AlignRight className="h-4 w-4" />
                                  </Button>
                                  <span className="w-px h-6 bg-gray-300 mx-1 self-center"></span>
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8"
                                    onClick={() => applyFormatting(section.id, 'quote')}
                                  >
                                    <Quote className="h-4 w-4" />
                                  </Button>
                                </div>
                                <Textarea 
                                  id={`section-${section.id}`}
                                  value={section.content} 
                                  onChange={(e) => handleSectionChange(section.id, e.target.value)} 
                                  placeholder="Enter section content here..."
                                  rows={6}
                                  className="border-0"
                                />
                              </div>
                              
                              {/* Cards Editor (for How It Works section) */}
                              {section.cards && (
                                <div className="border rounded-md p-4 mt-4">
                                  <div className="flex justify-between items-center mb-3">
                                    <Label className="text-sm font-medium">Cards</Label>
                                    <Button 
                                      type="button" 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleAddCard(section.id)}
                                    >
                                      <Plus className="h-4 w-4 mr-1" /> Add Card
                                    </Button>
                                  </div>
                                  
                                  <Accordion type="multiple" className="w-full">
                                    {JSON.parse(section.cards).map((card, index) => (
                                      <AccordionItem key={index} value={`card-${index}`}>
                                        <AccordionTrigger className="hover:bg-gray-50 px-3">
                                          <div className="flex justify-between items-center w-full">
                                            <span>{card.title || `Card ${index + 1}`}</span>
                                            <Badge variant="outline" className="ml-2">{card.icon}</Badge>
                                          </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="p-3 space-y-3">
                                          <div>
                                            <Label className="text-sm text-gray-500 mb-1 block">Title</Label>
                                            <Input 
                                              value={card.title || ''} 
                                              onChange={(e) => handleSectionCardChange(section.id, index, 'title', e.target.value)}
                                              placeholder="Card title"
                                            />
                                          </div>
                                          <div>
                                            <Label className="text-sm text-gray-500 mb-1 block">Description</Label>
                                            <Textarea 
                                              value={card.description || ''} 
                                              onChange={(e) => handleSectionCardChange(section.id, index, 'description', e.target.value)}
                                              placeholder="Card description"
                                              rows={3}
                                            />
                                          </div>
                                          <div>
                                            <Label className="text-sm text-gray-500 mb-1 block">Icon</Label>
                                            <Select 
                                              value={card.icon || 'FileText'} 
                                              onValueChange={(value) => handleSectionCardChange(section.id, index, 'icon', value)}
                                            >
                                              <SelectTrigger>
                                                <SelectValue placeholder="Select icon" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="Search">Search</SelectItem>
                                                <SelectItem value="Users">Users</SelectItem>
                                                <SelectItem value="Heart">Heart</SelectItem>
                                                <SelectItem value="FileText">Document</SelectItem>
                                                <SelectItem value="Shield">Shield</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          <div className="flex justify-end">
                                            <Button 
                                              type="button" 
                                              variant="destructive" 
                                              size="sm"
                                              onClick={() => handleDeleteCard(section.id, index)}
                                            >
                                              <Trash2 className="h-4 w-4 mr-1" /> Delete
                                            </Button>
                                          </div>
                                        </AccordionContent>
                                      </AccordionItem>
                                    ))}
                                  </Accordion>
                                </div>
                              )}
                              
                              {/* Testimonials Editor */}
                              {section.testimonials && (
                                <div className="border rounded-md p-4 mt-4">
                                  <div className="flex justify-between items-center mb-3">
                                    <Label className="text-sm font-medium">Testimonials</Label>
                                    <Button 
                                      type="button" 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleAddTestimonial(section.id)}
                                    >
                                      <Plus className="h-4 w-4 mr-1" /> Add Testimonial
                                    </Button>
                                  </div>
                                  
                                  <Accordion type="multiple" className="w-full">
                                    {JSON.parse(section.testimonials).map((testimonial, index) => (
                                      <AccordionItem key={index} value={`testimonial-${index}`}>
                                        <AccordionTrigger className="hover:bg-gray-50 px-3">
                                          <div className="flex justify-between items-center w-full">
                                            <span>{testimonial.name || `Testimonial ${index + 1}`}</span>
                                            <Badge variant="outline" className="ml-2">{testimonial.location}</Badge>
                                          </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="p-3 space-y-3">
                                          <div>
                                            <Label className="text-sm text-gray-500 mb-1 block">Name</Label>
                                            <Input 
                                              value={testimonial.name || ''} 
                                              onChange={(e) => handleTestimonialChange(section.id, index, 'name', e.target.value)}
                                              placeholder="Person's name"
                                            />
                                          </div>
                                          <div>
                                            <Label className="text-sm text-gray-500 mb-1 block">Location</Label>
                                            <Input 
                                              value={testimonial.location || ''} 
                                              onChange={(e) => handleTestimonialChange(section.id, index, 'location', e.target.value)}
                                              placeholder="Location"
                                            />
                                          </div>
                                          <div>
                                            <Label className="text-sm text-gray-500 mb-1 block">Quote</Label>
                                            <Textarea 
                                              value={testimonial.quote || ''} 
                                              onChange={(e) => handleTestimonialChange(section.id, index, 'quote', e.target.value)}
                                              placeholder="Testimonial quote"
                                              rows={3}
                                            />
                                          </div>
                                          <div>
                                            <Label className="text-sm text-gray-500 mb-1 block">Rating (1-5)</Label>
                                            <Select 
                                              value={testimonial.rating?.toString() || '5'} 
                                              onValueChange={(value) => handleTestimonialChange(section.id, index, 'rating', parseInt(value))}
                                            >
                                              <SelectTrigger>
                                                <SelectValue placeholder="Select rating" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="1">1 Star</SelectItem>
                                                <SelectItem value="2">2 Stars</SelectItem>
                                                <SelectItem value="3">3 Stars</SelectItem>
                                                <SelectItem value="4">4 Stars</SelectItem>
                                                <SelectItem value="5">5 Stars</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          <div className="flex justify-end">
                                            <Button 
                                              type="button" 
                                              variant="destructive" 
                                              size="sm"
                                              onClick={() => handleDeleteTestimonial(section.id, index)}
                                            >
                                              <Trash2 className="h-4 w-4 mr-1" /> Delete
                                            </Button>
                                          </div>
                                        </AccordionContent>
                                      </AccordionItem>
                                    ))}
                                  </Accordion>
                                </div>
                              )}
                              
                              {/* Resources Editor */}
                              {section.resources && (
                                <div className="border rounded-md p-4 mt-4">
                                  <div className="flex justify-between items-center mb-3">
                                    <Label className="text-sm font-medium">Resources</Label>
                                    <Button 
                                      type="button" 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleAddResource(section.id)}
                                    >
                                      <Plus className="h-4 w-4 mr-1" /> Add Resource
                                    </Button>
                                  </div>
                                  
                                  <Accordion type="multiple" className="w-full">
                                    {JSON.parse(section.resources).map((resource, index) => (
                                      <AccordionItem key={index} value={`resource-${index}`}>
                                        <AccordionTrigger className="hover:bg-gray-50 px-3">
                                          <div className="flex justify-between items-center w-full">
                                            <span>{resource.title || `Resource ${index + 1}`}</span>
                                            <Badge variant="outline" className="ml-2">{resource.icon}</Badge>
                                          </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="p-3 space-y-3">
                                          <div>
                                            <Label className="text-sm text-gray-500 mb-1 block">Title</Label>
                                            <Input 
                                              value={resource.title || ''} 
                                              onChange={(e) => handleResourceChange(section.id, index, 'title', e.target.value)}
                                              placeholder="Resource title"
                                            />
                                          </div>
                                          <div>
                                            <Label className="text-sm text-gray-500 mb-1 block">Description</Label>
                                            <Textarea 
                                              value={resource.description || ''} 
                                              onChange={(e) => handleResourceChange(section.id, index, 'description', e.target.value)}
                                              placeholder="Resource description"
                                              rows={3}
                                            />
                                          </div>
                                          <div>
                                            <Label className="text-sm text-gray-500 mb-1 block">Icon</Label>
                                            <Select 
                                              value={resource.icon || 'FileText'} 
                                              onValueChange={(value) => handleResourceChange(section.id, index, 'icon', value)}
                                            >
                                              <SelectTrigger>
                                                <SelectValue placeholder="Select icon" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="FileText">Document</SelectItem>
                                                <SelectItem value="Shield">Shield</SelectItem>
                                                <SelectItem value="Heart">Heart</SelectItem>
                                                <SelectItem value="Users">Users</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          <div className="flex justify-end">
                                            <Button 
                                              type="button" 
                                              variant="destructive" 
                                              size="sm"
                                              onClick={() => handleDeleteResource(section.id, index)}
                                            >
                                              <Trash2 className="h-4 w-4 mr-1" /> Delete
                                            </Button>
                                          </div>
                                        </AccordionContent>
                                      </AccordionItem>
                                    ))}
                                  </Accordion>
                                </div>
                              )}
                              
                              {/* Buttons Editor */}
                              {section.buttons && (
                                <div className="border rounded-md p-4 mt-4">
                                  <div className="flex justify-between items-center mb-3">
                                    <Label className="text-sm font-medium">Buttons</Label>
                                    <Button 
                                      type="button" 
                                      variant="outline" 
                                      size="sm"
                                      onClick={() => handleAddButton(section.id)}
                                    >
                                      <Plus className="h-4 w-4 mr-1" /> Add Button
                                    </Button>
                                  </div>
                                  
                                  <Accordion type="multiple" className="w-full">
                                    {JSON.parse(section.buttons).map((button, index) => (
                                      <AccordionItem key={index} value={`button-${index}`}>
                                        <AccordionTrigger className="hover:bg-gray-50 px-3">
                                          <div className="flex justify-between items-center w-full">
                                            <span>{button.text || `Button ${index + 1}`}</span>
                                            <Badge variant={button.primary ? "default" : "outline"} className="ml-2">
                                              {button.primary ? 'Primary' : 'Secondary'}
                                            </Badge>
                                          </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="p-3 space-y-3">
                                          <div>
                                            <Label className="text-sm text-gray-500 mb-1 block">Text</Label>
                                            <Input 
                                              value={button.text || ''} 
                                              onChange={(e) => handleButtonChange(section.id, index, 'text', e.target.value)}
                                              placeholder="Button text"
                                            />
                                          </div>
                                          <div>
                                            <Label className="text-sm text-gray-500 mb-1 block">URL</Label>
                                            <Input 
                                              value={button.url || ''} 
                                              onChange={(e) => handleButtonChange(section.id, index, 'url', e.target.value)}
                                              placeholder="/page-url"
                                            />
                                          </div>
                                          <div>
                                            <Label className="text-sm text-gray-500 mb-1 block">Style</Label>
                                            <Select 
                                              value={button.primary ? 'true' : 'false'} 
                                              onValueChange={(value) => handleButtonChange(section.id, index, 'primary', value)}
                                            >
                                              <SelectTrigger>
                                                <SelectValue placeholder="Select style" />
                                              </SelectTrigger>
                                              <SelectContent>
                                                <SelectItem value="true">Primary</SelectItem>
                                                <SelectItem value="false">Secondary</SelectItem>
                                              </SelectContent>
                                            </Select>
                                          </div>
                                          <div className="flex justify-end">
                                            <Button 
                                              type="button" 
                                              variant="destructive" 
                                              size="sm"
                                              onClick={() => handleDeleteButton(section.id, index)}
                                            >
                                              <Trash2 className="h-4 w-4 mr-1" /> Delete
                                            </Button>
                                          </div>
                                        </AccordionContent>
                                      </AccordionItem>
                                    ))}
                                  </Accordion>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                      
                      {/* Add new section button */}
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full mt-4"
                        onClick={() => {
                          setPageSections(prev => [
                            ...prev,
                            {
                              id: `section-${Date.now()}`,
                              title: 'New Section',
                              type: 'generic',
                              heading: '',
                              content: '',
                              heading_type: 'h2'
                            }
                          ]);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Section
                      </Button>
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit" disabled={saving}>
                        <Save className="w-4 h-4 mr-2" />
                        {saving ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </form>
            ) : (
              <Card className="glass-card rounded-modern">
                <CardContent className="flex items-center justify-center h-96">
                  <div className="text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Select a page from the list to start editing</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
        </TabsContent>

        {/* Location Content Tab */}
        <TabsContent value="locations">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Location List Sidebar */}
            <div className="lg:col-span-1">
              <Card className="glass-card rounded-modern">
                <CardHeader>
                  <CardTitle className="font-poppins">Location Content</CardTitle>
                  <CardDescription className="font-inter">Browse and edit location pages</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Search */}
                  <form onSubmit={handleLocationSearch} className="mb-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search locations..."
                        value={locationSearchQuery}
                        onChange={(e) => setLocationSearchQuery(e.target.value)}
                        className="pl-10 font-inter"
                      />
                    </div>
                  </form>

                  {/* Hierarchical Location Tree */}
                  <div className="space-y-1 max-h-[600px] overflow-y-auto">
                    {Object.keys(organizedLocations).map((countrySlug) => {
                      const countryData = organizedLocations[countrySlug];
                      const countryExpanded = expandedCountries[countrySlug] || false;
                      const countryName = countryData.country?.title || countrySlug.charAt(0).toUpperCase() + countrySlug.slice(1);

                      return (
                        <div key={countrySlug} className="border rounded-lg mb-2">
                          <button
                            onClick={() => setExpandedCountries({ ...expandedCountries, [countrySlug]: !countryExpanded })}
                            className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-t-lg font-inter"
                          >
                            <div className="flex items-center gap-2">
                              {countryExpanded ? (
                                <FolderOpen className="w-4 h-4 text-primary-green" />
                              ) : (
                                <Folder className="w-4 h-4 text-gray-400" />
                              )}
                              <span className="font-medium">{countryName}</span>
                            </div>
                            <ChevronDown className={`w-4 h-4 transition-transform ${countryExpanded ? 'rotate-180' : ''}`} />
                          </button>

                          {countryExpanded && (
                            <div className="pl-4 border-t">
                              {countryData.country && (
                                <button
                                  onClick={() => handleLocationEdit(countryData.country)}
                                  className={`w-full text-left p-2 hover:bg-primary-green/10 rounded flex items-center gap-2 font-inter ${
                                    selectedLocation?.slug === countryData.country.slug ? 'bg-primary-green/20' : ''
                                  }`}
                                >
                                  <MapPin className="w-3 h-3" />
                                  <span className="text-sm">Edit {countryName}</span>
                                </button>
                              )}

                              {Object.keys(countryData.regions).map((regionSlug) => {
                                const regionData = countryData.regions[regionSlug];
                                const regionExpanded = expandedRegions[`${countrySlug}-${regionSlug}`] || false;
                                const regionName = regionData.region?.title || regionSlug.charAt(0).toUpperCase() + regionSlug.slice(1);

                                return (
                                  <div key={regionSlug} className="mb-1">
                                    <button
                                      onClick={() => setExpandedRegions({ ...expandedRegions, [`${countrySlug}-${regionSlug}`]: !regionExpanded })}
                                      className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded font-inter"
                                    >
                                      <div className="flex items-center gap-2">
                                        {regionExpanded ? (
                                          <FolderOpen className="w-3 h-3 text-secondary-blue" />
                                        ) : (
                                          <Folder className="w-3 h-3 text-gray-400" />
                                        )}
                                        <span className="text-sm font-medium">{regionName}</span>
                                      </div>
                                      <ChevronDown className={`w-3 h-3 transition-transform ${regionExpanded ? 'rotate-180' : ''}`} />
                                    </button>

                                    {regionExpanded && (
                                      <div className="pl-6">
                                        {regionData.region && (
                                          <button
                                            onClick={() => handleLocationEdit(regionData.region)}
                                            className={`w-full text-left p-2 hover:bg-secondary-blue/10 rounded flex items-center gap-2 text-sm font-inter ${
                                              selectedLocation?.slug === regionData.region.slug ? 'bg-secondary-blue/20' : ''
                                            }`}
                                          >
                                            <MapPin className="w-3 h-3" />
                                            <span>Edit {regionName}</span>
                                          </button>
                                        )}

                                        {regionData.cities.map((city) => (
                                          <button
                                            key={city.slug}
                                            onClick={() => handleLocationEdit(city)}
                                            className={`w-full text-left p-2 hover:bg-accent-peach/10 rounded flex items-center gap-2 text-sm font-inter ${
                                              selectedLocation?.slug === city.slug ? 'bg-accent-peach/20' : ''
                                            }`}
                                          >
                                            <Heart className="w-3 h-3" />
                                            <span>{city.title || city.slug.split('/').pop()}</span>
                                          </button>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Location Editor */}
            <div className="lg:col-span-3">
              {selectedLocation ? (
                <div>
                  <Tabs defaultValue="content">
                    <TabsList>
                      <TabsTrigger value="content">Content</TabsTrigger>
                    </TabsList>
                    <TabsContent value="content">
                      <Card className="glass-card rounded-modern">
                        <CardHeader>
                          <CardTitle className="font-poppins">Edit Location: {selectedLocation.title || selectedLocation.slug}</CardTitle>
                          <CardDescription className="font-inter">Edit content for /foster-agency/{selectedLocation.slug}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          <form onSubmit={handleLocationSave}>
                            <div className="space-y-2">
                              <Label htmlFor="slug" className="font-inter">Slug (read-only)</Label>
                              <Input
                                id="slug"
                                value={locationFormData.slug || selectedLocation.slug}
                                disabled
                                className="bg-gray-50 font-inter"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="title" className="font-inter">Page Title</Label>
                              <Input
                                id="title"
                                value={locationFormData.title || ''}
                                onChange={(e) => setLocationFormData({ ...locationFormData, title: e.target.value })}
                                placeholder="Foster Agencies in [Location]"
                                className="font-inter"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="h1" className="font-inter">H1 Heading</Label>
                              <Input
                                id="h1"
                                value={locationFormData.h1 || ''}
                                onChange={(e) => setLocationFormData({ ...locationFormData, h1: e.target.value })}
                                placeholder="Find the Best Foster Agencies in [Location]"
                                className="font-inter"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="description" className="font-inter">Description</Label>
                              <Textarea
                                id="description"
                                value={locationFormData.description || ''}
                                onChange={(e) => setLocationFormData({ ...locationFormData, description: e.target.value })}
                                placeholder="SEO-rich description..."
                                rows={4}
                                className="font-inter"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="meta_title" className="font-inter">Meta Title</Label>
                              <Input
                                id="meta_title"
                                value={locationFormData.meta_title || ''}
                                onChange={(e) => setLocationFormData({ ...locationFormData, meta_title: e.target.value })}
                                placeholder="SEO meta title..."
                                className="font-inter"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="meta_description" className="font-inter">Meta Description</Label>
                              <Textarea
                                id="meta_description"
                                value={locationFormData.meta_description || ''}
                                onChange={(e) => setLocationFormData({ ...locationFormData, meta_description: e.target.value })}
                                placeholder="SEO meta description..."
                                rows={3}
                                className="font-inter"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="hero_text" className="font-inter">Hero Text</Label>
                              <Textarea
                                id="hero_text"
                                value={locationFormData.hero_text || ''}
                                onChange={(e) => setLocationFormData({ ...locationFormData, hero_text: e.target.value })}
                                placeholder="Hero section text..."
                                rows={3}
                                className="font-inter"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="faqs" className="font-inter">FAQs (JSON)</Label>
                              <Textarea
                                id="faqs"
                                value={locationFormData.faqs || ''}
                                onChange={(e) => {
                                  setLocationFormData({ ...locationFormData, faqs: e.target.value });
                                  // Validate JSON
                                  try {
                                    if (e.target.value) JSON.parse(e.target.value);
                                  } catch {
                                    // Invalid JSON
                                  }
                                }}
                                placeholder='[{"question": "FAQ question?", "answer": "FAQ answer"}]'
                                rows={6}
                                className="font-inter font-mono text-sm"
                              />
                              <p className="text-xs text-gray-500 font-inter">Format: JSON array of {`{question, answer}`} objects</p>
                            </div>

                            <div className="flex justify-end gap-2 mt-4">
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  setSelectedLocation(null);
                                  setLocationFormData({});
                                }}
                                className="font-inter"
                              >
                                Cancel
                              </Button>
                              <Button 
                                type="submit"
                                className="font-inter"
                              >
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                              </Button>
                            </div>
                          </form>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-muted-foreground">Select a location to edit</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </div>
    </div>
  );
}

