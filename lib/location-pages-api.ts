'use server';

import { supabaseAdmin } from '@/lib/supabase-server';
import { 
  LocationPage, 
  PageType, 
  LocationPageJson,
  CountryPageContent,
  RegionPageContent,
  CityPageContent
} from '@/lib/types/locationPageContent';

const supabase = supabaseAdmin;

/**
 * Load all location pages
 */
export async function loadAllPages(): Promise<LocationPage[]> {
  try {
    const { data, error } = await supabase
      .from('location_content')
      .select('*')
      .order('canonical_slug', { ascending: true });

    if (error) {
      console.error('Error fetching location pages:', error);
      return [];
    }

    return data as LocationPage[];
  } catch (error) {
    console.error('Error in loadAllPages:', error);
    return [];
  }
}

/**
 * Load a single location page by canonical slug
 */
export async function loadPage(canonicalSlug: string): Promise<LocationPage | null> {
  try {
    const { data, error } = await supabase
      .from('location_content')
      .select('*')
      .eq('canonical_slug', canonicalSlug)
      .single();

    if (error) {
      console.error('Error fetching location page:', error);
      return null;
    }

    return data as LocationPage;
  } catch (error) {
    console.error('Error in loadPage:', error);
    return null;
  }
}

/**
 * Save a location page
 */
export async function savePage(
  slug: string, 
  template: PageType, 
  content: LocationPageJson
) {
  return supabase
    .from("location_content")
    .upsert({
      canonical_slug: slug,
      template_type: template,
      content_json: content,
      updated_at: new Date().toISOString()
    })
    .select();
}

/**
 * Create a new location page
 */
export async function createPage(
  canonicalSlug: string,
  templateType: PageType
): Promise<LocationPage | null> {
  try {
    // Create empty content based on template type
    let emptyContent: LocationPageJson;
    
    switch (templateType) {
      case 'country':
        emptyContent = {
          title: '',
          meta_title: '',
          meta_description: '',
          hero: {
            heading: '',
            subheading: '',
            body: '',
            cta_primary_text: '',
            cta_primary_href: '',
            cta_secondary_text: '',
            cta_secondary_href: '',
            image_url: ''
          },
          overview: {
            body: ''
          }
        } as CountryPageContent;
        break;
      case 'region':
        emptyContent = {
          title: '',
          meta_title: '',
          meta_description: '',
          hero: {
            heading: '',
            subheading: '',
            body: '',
            cta_primary_text: '',
            cta_primary_href: '',
            cta_secondary_text: '',
            cta_secondary_href: '',
            image_url: ''
          },
          about_region: {
            body: ''
          }
        } as RegionPageContent;
        break;
      case 'city':
        emptyContent = {
          title: '',
          meta_title: '',
          meta_description: '',
          hero: {
            heading: '',
            subheading: '',
            body: '',
            cta_primary_text: '',
            cta_primary_href: '',
            cta_secondary_text: '',
            cta_secondary_href: '',
            image_url: ''
          },
          overview: {
            body: ''
          }
        } as CityPageContent;
        break;
      default:
        throw new Error('Invalid template type');
    }

    const { data, error } = await supabase
      .from('location_content')
      .insert([
        {
          canonical_slug: canonicalSlug,
          template_type: templateType,
          content_json: emptyContent
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating location page:', error);
      return null;
    }

    return data as LocationPage;
  } catch (error) {
    console.error('Error in createPage:', error);
    return null;
  }
}

/**
 * Delete a location page
 */
export async function deletePage(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('location_content')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting location page:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in deletePage:', error);
    return false;
  }
}

/**
 * Get all countries
 */
export async function getCountries() {
  try {
    const { data, error } = await supabase
      .from('countries')
      .select('id, name, slug')
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching countries:', error);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error in getCountries:', error);
    return [];
  }
}

/**
 * Get regions by country
 */
export async function getRegionsByCountry(countrySlug: string) {
  try {
    const { data, error } = await supabase
      .from('regions')
      .select('id, name, slug')
      .eq('country_slug', countrySlug)
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching regions:', error);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error in getRegionsByCountry:', error);
    return [];
  }
}

/**
 * Get cities by region
 */
export async function getCitiesByRegion(regionSlug: string) {
  try {
    const { data, error } = await supabase
      .from('cities')
      .select('id, name, slug')
      .eq('region_slug', regionSlug)
      .order('name', { ascending: true });

    if (error) {
      console.error('Error fetching cities:', error);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error in getCitiesByRegion:', error);
    return [];
  }
}

/**
 * Upload an image to Supabase storage
 */
export async function uploadImage(file: File): Promise<string | null> {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from('uploads')
      .upload(`images/${fileName}`, file);

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    // Get public URL
    const { data: { publicUrl } } = supabase.storage
      .from('uploads')
      .getPublicUrl(`images/${fileName}`);

    return publicUrl;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    return null;
  }
}

/**
 * Save a content version for history
 */
export async function saveContentVersion(
  canonicalSlug: string,
  content: LocationPageJson,
  editorEmail: string
): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('content_versions')
      .insert([
        {
          canonical_slug: canonicalSlug,
          snapshot: content,
          editor: editorEmail
        }
      ]);

    if (error) {
      console.error('Error saving content version:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in saveContentVersion:', error);
    return false;
  }
}

/**
 * Get content versions for a page
 */
export async function getContentVersions(canonicalSlug: string) {
  try {
    const { data, error } = await supabase
      .from('content_versions')
      .select('*')
      .eq('canonical_slug', canonicalSlug)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching content versions:', error);
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error in getContentVersions:', error);
    return [];
  }
}

/**
 * Restore a content version
 */
export async function restoreContentVersion(
  canonicalSlug: string,
  snapshot: LocationPageJson
) {
  try {
    const { error } = await supabase
      .from('location_content')
      .update({
        content_json: snapshot,
        updated_at: new Date().toISOString()
      })
      .eq('canonical_slug', canonicalSlug);

    if (error) {
      console.error('Error restoring content version:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in restoreContentVersion:', error);
    return false;
  }
}