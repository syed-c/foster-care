import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

/**
 * Fetch location page data by canonical slug
 * @param {string} canonicalSlug - The canonical slug of the page
 * @returns {Promise<Object>} The location page data
 */
export async function getLocationPageByCanonicalSlug(canonicalSlug) {
  try {
    if (!canonicalSlug) {
      throw new Error('Canonical slug is required');
    }

    const { data, error } = await supabase
      .from('locations_pages')
      .select('*')
      .eq('canonical_slug', canonicalSlug)
      .single();

    if (error) {
      throw new Error(`Failed to fetch location page: ${error.message}`);
    }

    return data || null;
  } catch (error) {
    console.error('Error fetching location page:', error);
    throw error;
  }
}

/**
 * Save or update location page data
 * @param {Object} pageData - The page data to save
 * @returns {Promise<Object>} The saved page data
 */
export async function saveLocationPage(pageData) {
  try {
    const {
      page_type,
      country_slug,
      region_slug,
      city_slug,
      canonical_slug,
      title,
      meta_title,
      meta_description,
      hero,
      overview,
      foster_system,
      reasons,
      popular_locations,
      regions_grid,
      faqs,
      regulatory,
      final_cta,
      sections
    } = pageData;

    // Validate required fields
    if (!canonical_slug) {
      throw new Error('Canonical slug is required');
    }

    // Check if page already exists
    const { data: existingPage } = await supabase
      .from('locations_pages')
      .select('id')
      .eq('canonical_slug', canonical_slug)
      .single();

    let result;
    let error;

    if (existingPage) {
      // Update existing page
      const { data, error: updateError } = await supabase
        .from('locations_pages')
        .update({
          page_type,
          country_slug,
          region_slug,
          city_slug,
          title,
          meta_title,
          meta_description,
          hero,
          overview,
          foster_system,
          reasons,
          popular_locations,
          regions_grid,
          faqs,
          regulatory,
          final_cta,
          sections,
          updated_at: new Date()
        })
        .eq('id', existingPage.id)
        .select()
        .single();

      result = data;
      error = updateError;
    } else {
      // Create new page
      const { data, error: insertError } = await supabase
        .from('locations_pages')
        .insert([
          {
            page_type,
            country_slug,
            region_slug,
            city_slug,
            canonical_slug,
            title,
            meta_title,
            meta_description,
            hero,
            overview,
            foster_system,
            reasons,
            popular_locations,
            regions_grid,
            faqs,
            regulatory,
            final_cta,
            sections
          }
        ])
        .select()
        .single();

      result = data;
      error = insertError;
    }

    if (error) {
      throw new Error(`Failed to save location page: ${error.message}`);
    }

    return result;
  } catch (error) {
    console.error('Error saving location page:', error);
    throw error;
  }
}

/**
 * Delete location page by canonical slug
 * @param {string} canonicalSlug - The canonical slug of the page to delete
 * @returns {Promise<void>}
 */
export async function deleteLocationPage(canonicalSlug) {
  try {
    if (!canonicalSlug) {
      throw new Error('Canonical slug is required');
    }

    const { error } = await supabase
      .from('locations_pages')
      .delete()
      .eq('canonical_slug', canonicalSlug);

    if (error) {
      throw new Error(`Failed to delete location page: ${error.message}`);
    }
  } catch (error) {
    console.error('Error deleting location page:', error);
    throw error;
  }
}

/**
 * Get all regions for a country
 * @param {string} countrySlug - The slug of the country
 * @returns {Promise<Array>} Array of regions
 */
export async function getRegionsForCountry(countrySlug) {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('name, slug')
      .eq('country_slug', countrySlug)
      .eq('type', 'region');

    if (error) {
      throw new Error(`Failed to fetch regions: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching regions:', error);
    throw error;
  }
}

/**
 * Get all cities for a region
 * @param {string} regionSlug - The slug of the region
 * @returns {Promise<Array>} Array of cities
 */
export async function getCitiesForRegion(regionSlug) {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select('name, slug')
      .eq('region_slug', regionSlug)
      .eq('type', 'city');

    if (error) {
      throw new Error(`Failed to fetch cities: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
}

/**
 * Get all agencies for a location
 * @param {string} locationSlug - The slug of the location (city or region)
 * @returns {Promise<Array>} Array of agencies
 */
export async function getAgenciesForLocation(locationSlug) {
  try {
    const { data, error } = await supabase
      .from('agencies')
      .select('*')
      .or(`city.eq.${locationSlug},region.eq.${locationSlug}`);

    if (error) {
      throw new Error(`Failed to fetch agencies: ${error.message}`);
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching agencies:', error);
    throw error;
  }
}