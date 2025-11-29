'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  loadAllPages, 
  loadPage, 
  savePage, 
  createPage, 
  deletePage,
  getCountries,
  getRegionsByCountry,
  getCitiesByRegion,
  uploadImage,
  saveContentVersion,
  getContentVersions,
  restoreContentVersion
} from '@/lib/location-pages-api';
import { 
  LocationPage, 
  PageType, 
  LocationPageJson,
  CountryPageContent,
  RegionPageContent,
  CityPageContent,
  HeroSection,
  FaqItem,
  PopularLocationItem,
  ReasonItem,
  FosterSystemItem,
  TrustBarItem,
  CtaSection
} from '@/lib/types/locationPageContent';

interface LocationPagesEditorProps {
  initialPages: LocationPage[];
  userEmail: string;
}

export function LocationPagesEditor({ initialPages, userEmail }: LocationPagesEditorProps) {
  // State for pages and selection
  const [pages, setPages] = useState<LocationPage[]>(initialPages);
  const [selectedPage, setSelectedPage] = useState<LocationPage | null>(null);
  const [selectedTemplateType, setSelectedTemplateType] = useState<PageType>('country');
  const [filteredPages, setFilteredPages] = useState<LocationPage[]>(initialPages);
  
  // State for form data
  const [title, setTitle] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [canonicalSlug, setCanonicalSlug] = useState('');
  
  // State for location selects
  const [countries, setCountries] = useState<{id: string, name: string, slug: string}[]>([]);
  const [regions, setRegions] = useState<{id: string, name: string, slug: string}[]>([]);
  const [cities, setCities] = useState<{id: string, name: string, slug: string}[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  
  // State for sections
  const [heroSection, setHeroSection] = useState<HeroSection>({
    heading: '',
    subheading: '',
    body: '',
    cta_primary_text: '',
    cta_primary_href: '',
    cta_secondary_text: '',
    cta_secondary_href: '',
    image_url: ''
  });
  
  // Country page sections
  const [overview, setOverview] = useState<{heading?: string, subheading?: string, body: string}>({body: ''});
  const [fosterSystem, setFosterSystem] = useState<{heading?: string, subheading?: string, description?: string, items?: FosterSystemItem[]}>({items: []});
  const [reasonsToFoster, setReasonsToFoster] = useState<{heading?: string, subheading?: string, items?: ReasonItem[]}>({items: []});
  const [featuredPopularAreas, setFeaturedPopularAreas] = useState<{heading?: string, subheading?: string, locations?: PopularLocationItem[]}>({locations: []});
  const [faqs, setFaqs] = useState<{heading?: string, items?: FaqItem[]}>({items: []});
  const [regulatoryTrustBar, setRegulatoryTrustBar] = useState<{heading?: string, items?: TrustBarItem[]}>({items: []});
  const [finalCta, setFinalCta] = useState<CtaSection>({heading: '', cta_text: '', cta_href: ''});
  
  // Region page sections
  const [aboutRegion, setAboutRegion] = useState<{heading?: string, subheading?: string, body: string}>({body: ''});
  const [benefitsSupport, setBenefitsSupport] = useState<{heading?: string, subheading?: string, items?: ReasonItem[]}>({items: []});
  const [popularCities, setPopularCities] = useState<{heading?: string, subheading?: string, cities?: PopularLocationItem[]}>({cities: []});
  const [allowancesSupport, setAllowancesSupport] = useState<{heading?: string, subheading?: string, body?: string}>({});
  const [testimonials, setTestimonials] = useState<{heading?: string, items?: {name: string, location?: string, quote: string}[]}>({items: []});
  
  // City page sections
  const [fosteringTypes, setFosteringTypes] = useState<{heading?: string, items?: {title: string, description: string}[]}>({items: []});
  const [topAgencies, setTopAgencies] = useState<{heading?: string, note?: string}>({});
  const [whyFosterCity, setWhyFosterCity] = useState<{heading?: string, subheading?: string, items?: ReasonItem[]}>({items: []});
  const [cityAllowancesSupport, setCityAllowancesSupport] = useState<{heading?: string, body?: string}>({});
  const [localSupportResources, setLocalSupportResources] = useState<{heading?: string, items?: {name: string, description?: string, link?: string}[]}>({items: []});
  
  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [savingStatus, setSavingStatus] = useState<'saved' | 'unsaved' | 'saving'>('saved');
  const [searchQuery, setSearchQuery] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const [contentVersions, setContentVersions] = useState<any[]>([]);
  const [showVersions, setShowVersions] = useState(false);
  
  // Refs
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Router
  const router = useRouter();

  // Filter pages when template type or search query changes
  useEffect(() => {
    let result = pages;
    
    if (selectedTemplateType) {
      result = result.filter(page => page.template_type === selectedTemplateType);
    }
    
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(page => 
        page.canonical_slug.toLowerCase().includes(query) ||
        (page.content_json as any)?.title?.toLowerCase().includes(query)
      );
    }
    
    setFilteredPages(result);
  }, [pages, selectedTemplateType, searchQuery]);

  // Load location data
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const countriesData = await getCountries();
        setCountries(countriesData);
      } catch (error) {
        console.error('Error loading countries:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Load regions when country changes
  useEffect(() => {
    const loadRegions = async () => {
      if (selectedCountry) {
        setIsLoading(true);
        try {
          const regionsData = await getRegionsByCountry(selectedCountry);
          setRegions(regionsData);
        } catch (error) {
          console.error('Error loading regions:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setRegions([]);
        setSelectedRegion('');
      }
    };
    
    loadRegions();
  }, [selectedCountry]);

  // Load cities when region changes
  useEffect(() => {
    const loadCities = async () => {
      if (selectedRegion) {
        setIsLoading(true);
        try {
          const citiesData = await getCitiesByRegion(selectedRegion);
          setCities(citiesData);
        } catch (error) {
          console.error('Error loading cities:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setCities([]);
        setSelectedCity('');
      }
    };
    
    loadCities();
  }, [selectedRegion]);

  // Autosave when content changes
  useEffect(() => {
    if (!selectedPage) return;
    
    // Clear existing timeout
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current);
    }
    
    // Set new timeout
    saveTimeoutRef.current = setTimeout(() => {
      handleSavePage();
    }, 800);
    
    // Cleanup
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [
    title, metaTitle, metaDescription, heroSection, overview, fosterSystem,
    reasonsToFoster, featuredPopularAreas, faqs, regulatoryTrustBar, finalCta,
    aboutRegion, benefitsSupport, popularCities, allowancesSupport, testimonials,
    fosteringTypes, topAgencies, whyFosterCity, cityAllowancesSupport,
    localSupportResources
  ]);

  // Populate form when selected page changes
  useEffect(() => {
    if (selectedPage) {
      const content = selectedPage.content_json as any;
      
      // Set basic fields
      setTitle(content.title || '');
      setMetaTitle(content.meta_title || '');
      setMetaDescription(content.meta_description || '');
      setCanonicalSlug(selectedPage.canonical_slug);
      
      // Set sections based on template type
      switch (selectedPage.template_type) {
        case 'country':
          setHeroSection(content.hero || {});
          setOverview(content.overview || {body: ''});
          setFosterSystem(content.foster_system || {items: []});
          setReasonsToFoster(content.reasons_to_foster || {items: []});
          setFeaturedPopularAreas(content.featured_popular_areas || {locations: []});
          setFaqs(content.faqs || {items: []});
          setRegulatoryTrustBar(content.regulatory_trust_bar || {items: []});
          setFinalCta(content.final_cta || {heading: '', cta_text: '', cta_href: ''});
          break;
          
        case 'region':
          setHeroSection(content.hero || {});
          setAboutRegion(content.about_region || {body: ''});
          setBenefitsSupport(content.benefits_support || {items: []});
          setPopularCities(content.popular_cities || {cities: []});
          setAllowancesSupport(content.allowances_support || {});
          setTestimonials(content.testimonials || {items: []});
          setFaqs(content.faqs || {items: []});
          setRegulatoryTrustBar(content.regulatory_trust_bar || {items: []});
          setFinalCta(content.final_cta || {heading: '', cta_text: '', cta_href: ''});
          break;
          
        case 'city':
          setHeroSection(content.hero || {});
          setOverview(content.overview || {body: ''});
          setFosteringTypes(content.fostering_types || {items: []});
          setTopAgencies(content.top_agencies || {});
          setWhyFosterCity(content.why_foster_city || {items: []});
          setCityAllowancesSupport(content.allowances_support || {});
          setLocalSupportResources(content.local_support_resources || {items: []});
          setFaqs(content.faqs || {items: []});
          setRegulatoryTrustBar(content.regulatory_trust_bar || {items: []});
          setFinalCta(content.final_cta || {heading: '', cta_text: '', cta_href: ''});
          break;
      }
    } else {
      // Reset form
      setTitle('');
      setMetaTitle('');
      setMetaDescription('');
      setCanonicalSlug('');
      
      // Reset sections
      setHeroSection({
        heading: '',
        subheading: '',
        body: '',
        cta_primary_text: '',
        cta_primary_href: '',
        cta_secondary_text: '',
        cta_secondary_href: '',
        image_url: ''
      });
      
      setOverview({body: ''});
      setFosterSystem({items: []});
      setReasonsToFoster({items: []});
      setFeaturedPopularAreas({locations: []});
      setFaqs({items: []});
      setRegulatoryTrustBar({items: []});
      setFinalCta({heading: '', cta_text: '', cta_href: ''});
      
      setAboutRegion({body: ''});
      setBenefitsSupport({items: []});
      setPopularCities({cities: []});
      setAllowancesSupport({});
      setTestimonials({items: []});
      
      setFosteringTypes({items: []});
      setTopAgencies({});
      setWhyFosterCity({items: []});
      setCityAllowancesSupport({});
      setLocalSupportResources({items: []});
    }
  }, [selectedPage]);

  // Handle page selection
  const handleSelectPage = async (page: LocationPage) => {
    setIsLoading(true);
    try {
      const fullPage = await loadPage(page.canonical_slug);
      if (fullPage) {
        setSelectedPage(fullPage);
      }
    } catch (error) {
      console.error('Error loading page:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle creating a new page
  const handleCreateNewPage = async () => {
    // Generate canonical slug based on selections
    let newCanonicalSlug = '/foster-agency';
    
    if (selectedTemplateType === 'country' && selectedCountry) {
      const country = countries.find(c => c.id === selectedCountry);
      if (country) {
        newCanonicalSlug += `/${country.slug}`;
      }
    } else if (selectedTemplateType === 'region' && selectedCountry && selectedRegion) {
      const country = countries.find(c => c.id === selectedCountry);
      const region = regions.find(r => r.id === selectedRegion);
      if (country && region) {
        newCanonicalSlug += `/${country.slug}/${region.slug}`;
      }
    } else if (selectedTemplateType === 'city' && selectedCountry && selectedRegion && selectedCity) {
      const country = countries.find(c => c.id === selectedCountry);
      const region = regions.find(r => r.id === selectedRegion);
      const city = cities.find(c => c.id === selectedCity);
      if (country && region && city) {
        newCanonicalSlug += `/${country.slug}/${region.slug}/${city.slug}`;
      }
    }
    
    if (newCanonicalSlug === '/foster-agency') {
      alert('Please select location values to generate a canonical slug');
      return;
    }
    
    setIsLoading(true);
    try {
      const newPage = await createPage(newCanonicalSlug, selectedTemplateType);
      if (newPage) {
        setPages([...pages, newPage]);
        setSelectedPage(newPage);
      }
    } catch (error) {
      console.error('Error creating page:', error);
      alert('Failed to create page');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle saving the current page
  const handleSavePage = async () => {
    if (!selectedPage) return;
    
    setSavingStatus('saving');
    
    try {
      // Build content object based on template type
      let contentJson: LocationPageJson;
      
      switch (selectedPage.template_type) {
        case 'country':
          contentJson = {
            title,
            meta_title: metaTitle,
            meta_description: metaDescription,
            hero: heroSection,
            overview,
            foster_system: fosterSystem,
            reasons_to_foster: reasonsToFoster,
            featured_popular_areas: featuredPopularAreas,
            faqs,
            regulatory_trust_bar: regulatoryTrustBar,
            final_cta: finalCta
          } as CountryPageContent;
          break;
          
        case 'region':
          contentJson = {
            title,
            meta_title: metaTitle,
            meta_description: metaDescription,
            hero: heroSection,
            about_region: aboutRegion,
            benefits_support: benefitsSupport,
            popular_cities: popularCities,
            allowances_support: allowancesSupport,
            testimonials,
            faqs,
            regulatory_trust_bar: regulatoryTrustBar,
            final_cta: finalCta
          } as RegionPageContent;
          break;
          
        case 'city':
          contentJson = {
            title,
            meta_title: metaTitle,
            meta_description: metaDescription,
            hero: heroSection,
            overview,
            fostering_types: fosteringTypes,
            top_agencies: topAgencies,
            why_foster_city: whyFosterCity,
            allowances_support: cityAllowancesSupport,
            local_support_resources: localSupportResources,
            faqs,
            regulatory_trust_bar: regulatoryTrustBar,
            final_cta: finalCta
          } as CityPageContent;
          break;
          
        default:
          throw new Error('Invalid template type');
      }
      
      // Save to Supabase
      const { data, error } = await savePage(
        selectedPage.canonical_slug,
        selectedPage.template_type,
        contentJson
      );
      
      if (error) {
        console.error('Error saving page:', error);
        setSavingStatus('unsaved');
        alert('Failed to save page');
        return;
      }
      
      // Save content version for history
      await saveContentVersion(
        selectedPage.canonical_slug,
        contentJson,
        userEmail
      );
      
      if (data && data[0]) {
        // Update the pages list
        setPages(pages.map(p => p.id === selectedPage.id ? data[0] : p));
        setSelectedPage(data[0]);
        setSavingStatus('saved');
      }
    } catch (error) {
      console.error('Error saving page:', error);
      setSavingStatus('unsaved');
      alert('Failed to save page');
    }
  };

  // Handle image upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setImageUploading(true);
    try {
      const publicUrl = await uploadImage(file);
      if (publicUrl) {
        setHeroSection({...heroSection, image_url: publicUrl});
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    } finally {
      setImageUploading(false);
    }
  };

  // Trigger file input
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Load content versions
  const handleLoadVersions = async () => {
    if (!selectedPage) return;
    
    setIsLoading(true);
    try {
      const versions = await getContentVersions(selectedPage.canonical_slug);
      setContentVersions(versions);
      setShowVersions(true);
    } catch (error) {
      console.error('Error loading versions:', error);
      alert('Failed to load versions');
    } finally {
      setIsLoading(false);
    }
  };

  // Restore content version
  const handleRestoreVersion = async (version: any) => {
    if (!selectedPage) return;
    
    setIsLoading(true);
    try {
      const success = await restoreContentVersion(
        selectedPage.canonical_slug,
        version.snapshot
      );
      
      if (success) {
        // Reload the page to show restored content
        const updatedPage = await loadPage(selectedPage.canonical_slug);
        if (updatedPage) {
          setSelectedPage(updatedPage);
          setShowVersions(false);
        }
      } else {
        alert('Failed to restore version');
      }
    } catch (error) {
      console.error('Error restoring version:', error);
      alert('Failed to restore version');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Location Pages Editor</h1>
      <p>Connected to Supabase with autosave, image upload, and version history.</p>
    </div>
  );
}
