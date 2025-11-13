const { supabaseAdmin } = require('../lib/supabase-server');
const { supabase } = require('../lib/supabase');
const { ensureContentExists } = require('../lib/cms');

// Utility function to slugify text
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Build canonical slug by traversing parent chain
 * @param {string} locationId - The ID of the location
 * @param {string} locationType - The type of location (country, region, city)
 * @returns {Promise<string>} The canonical slug path
 */
async function buildCanonicalSlug(locationId, locationType) {
  try {
    const parts = [];
    let currentId = locationId;
    let currentType = locationType;
    
    // Traverse up the hierarchy
    while (currentId) {
      let node;
      
      if (currentType === 'city') {
        const { data, error } = await supabaseAdmin
          .from('cities')
          .select('id, name, slug, region_id')
          .eq('id', currentId)
          .single();
        
        if (error || !data) {
          console.warn('Error fetching city data:', error?.message || 'No data returned');
          // Try to use the slug from the data we have
          if (data && data.slug) {
            parts.unshift(data.slug);
          }
          break;
        }
        node = data;
        currentId = node.region_id;
        currentType = 'region';
      } else if (currentType === 'region') {
        const { data, error } = await supabaseAdmin
          .from('regions')
          .select('id, name, slug, country_id')
          .eq('id', currentId)
          .single();
        
        if (error || !data) {
          console.warn('Error fetching region data:', error?.message || 'No data returned');
          // Try to use the slug from the data we have
          if (data && data.slug) {
            parts.unshift(data.slug);
          }
          break;
        }
        node = data;
        currentId = node.country_id;
        currentType = 'country';
      } else if (currentType === 'country') {
        const { data, error } = await supabaseAdmin
          .from('countries')
          .select('id, name, slug')
          .eq('id', currentId)
          .single();
        
        if (error || !data) {
          console.warn('Error fetching country data:', error?.message || 'No data returned');
          // Try to use the slug from the data we have
          if (data && data.slug) {
            parts.unshift(data.slug);
          }
          break;
        }
        node = data;
        currentId = null; // End of chain
      } else {
        break;
      }
      
      // Use slug or generate from name if not available
      const slug = (node.slug && node.slug.trim() !== '') 
        ? node.slug 
        : slugify(node.name);
      
      parts.unshift(slug);
    }
    
    // Make sure we have at least one part
    if (parts.length === 0) {
      // Fallback to using the locationId as the slug
      parts.unshift(locationId);
    }
    
    return '/foster-agency/' + parts.join('/');
  } catch (error) {
    console.error('Error building canonical slug, using fallback:', error);
    // Fallback to a basic canonical slug
    return `/foster-agency/${locationId}`;
  }
}

/**
 * Update canonical slug for a location
 * @param {string} locationId - The ID of the location
 * @param {string} locationType - The type of location (country, region, city)
 * @returns {Promise<string>} The updated canonical slug
 */
async function updateCanonicalSlug(locationId, locationType) {
  try {
    const canonicalSlug = await buildCanonicalSlug(locationId, locationType);
    
    let table;
    switch (locationType) {
      case 'country':
        table = 'countries';
        break;
      case 'region':
        table = 'regions';
        break;
      case 'city':
        table = 'cities';
        break;
      default:
        throw new Error(`Invalid location type: ${locationType}`);
    }
    
    const { error } = await supabaseAdmin
      .from(table)
      .update({ canonical_slug: canonicalSlug })
      .eq('id', locationId);
    
    if (error) {
      throw error;
    }
    
    return canonicalSlug;
  } catch (error) {
    console.error('Error updating canonical slug:', error);
    throw error;
  }
}

/**
 * Check if a column exists in a table
 * @param {string} tableName - The name of the table
 * @param {string} columnName - The name of the column
 * @returns {Promise<boolean>} Whether the column exists
 */
async function columnExists(tableName, columnName) {
  try {
    // Try to select the column - if it fails, the column doesn't exist
    const { error } = await supabaseAdmin
      .from(tableName)
      .select(columnName)
      .limit(1);
    
    // If there's an error about the column not existing, return false
    if (error && error.message.includes(`column "${columnName}" does not exist`)) {
      return false;
    }
    
    // If there's any other error (like connection issues), assume column exists
    // to avoid breaking the application
    if (error) {
      console.warn(`Connection error when checking column ${columnName} in ${tableName}, assuming it exists:`, error.message);
      return true;
    }
    
    // If no error, the column exists
    return true;
  } catch (error) {
    // If the error is about the column not existing, return false
    if (error.message && error.message.includes(`column "${columnName}" does not exist`)) {
      return false;
    }
    // For other errors (like connection issues), assume column exists
    console.warn(`Error checking column ${columnName} in ${tableName}, assuming it exists:`, error.message);
    return true;
  }
}

/**
 * Get location tree with canonical slugs and editable flags
 * @param {boolean} includeContent - Whether to include content editable flags
 * @returns {Promise<Array>} The location tree
 */
async function getLocationTree(includeContent = false) {
  try {
    let countries, regions, cities;
    let hasCanonicalSlug = true;
    
    // Check if canonical_slug column exists in countries table
    try {
      hasCanonicalSlug = await columnExists('countries', 'canonical_slug');
    } catch (error) {
      console.warn('Error checking for canonical_slug column, assuming it exists:', error.message);
      hasCanonicalSlug = true; // Assume it exists to avoid breaking the app
    }
    
    if (hasCanonicalSlug) {
      try {
        // Load all countries with canonical_slug
        const { data: countryData, error: countriesError } = await supabaseAdmin
          .from('countries')
          .select('id, name, slug, canonical_slug')
          .order('name');
        
        if (countriesError) {
          console.warn('Error loading countries, falling back to slug-based canonical slugs:', countriesError.message);
          throw countriesError; // This will trigger the fallback
        }
        countries = countryData;
        
        // Load all regions with canonical_slug
        const { data: regionData, error: regionsError } = await supabaseAdmin
          .from('regions')
          .select('id, name, slug, canonical_slug, country_id')
          .order('name');
        
        if (regionsError) {
          console.warn('Error loading regions, falling back to slug-based canonical slugs:', regionsError.message);
          throw regionsError; // This will trigger the fallback
        }
        regions = regionData;
        
        // Load all cities with canonical_slug
        const { data: cityData, error: citiesError } = await supabaseAdmin
          .from('cities')
          .select('id, name, slug, canonical_slug, region_id')
          .order('name');
        
        if (citiesError) {
          console.warn('Error loading cities, falling back to slug-based canonical slugs:', citiesError.message);
          throw citiesError; // This will trigger the fallback
        }
        cities = cityData;
      } catch (error) {
        // If any query fails, fall back to the slug-based approach
        console.warn('Falling back to slug-based canonical slugs due to query errors');
        hasCanonicalSlug = false;
      }
    }
    
    if (!hasCanonicalSlug) {
      console.warn('canonical_slug column not found or query failed, falling back to slug-based canonical slugs');
      
      // Load all countries without canonical_slug
      const { data: countryData, error: countriesError } = await supabaseAdmin
        .from('countries')
        .select('id, name, slug')
        .order('name');
      
      if (countriesError) {
        console.error('Critical error loading countries:', countriesError);
        throw countriesError;
      }
      countries = countryData.map(country => ({
        ...country,
        canonical_slug: `/foster-agency/${country.slug}`
      }));
      
      // Load all regions without canonical_slug
      const { data: regionData, error: regionsError } = await supabaseAdmin
        .from('regions')
        .select('id, name, slug, country_id')
        .order('name');
      
      if (regionsError) {
        console.error('Critical error loading regions:', regionsError);
        throw regionsError;
      }
      
      // We need to join with countries to get the country slug for building canonical_slug
      const { data: countryResult, error: countryError } = await supabaseAdmin
        .from('countries')
        .select('id, slug')
        .order('name');
      
      if (countryError) {
        console.error('Critical error loading countries for region mapping:', countryError);
        throw countryError;
      }
      
      const countryMap = {};
      countryResult.forEach(country => {
        countryMap[country.id] = country.slug;
      });
      
      regions = regionData.map(region => ({
        ...region,
        canonical_slug: `/foster-agency/${countryMap[region.country_id] || 'unknown'}/${region.slug}`
      }));
      
      // Load all cities without canonical_slug
      const { data: cityData, error: citiesError } = await supabaseAdmin
        .from('cities')
        .select('id, name, slug, region_id')
        .order('name');
      
      if (citiesError) {
        console.error('Critical error loading cities:', citiesError);
        throw citiesError;
      }
      
      // We need to join with regions and countries to get the slugs for building canonical_slug
      const { data: regionResult, error: regionError } = await supabaseAdmin
        .from('regions')
        .select('id, slug, country_id');
      
      if (regionError) {
        console.error('Critical error loading regions for city mapping:', regionError);
        throw regionError;
      }
      
      const { data: countryResult2, error: countryError2 } = await supabaseAdmin
        .from('countries')
        .select('id, slug');
      
      if (countryError2) {
        console.error('Critical error loading countries for city mapping:', countryError2);
        throw countryError2;
      }
      
      const regionMap = {};
      regionResult.forEach(region => {
        regionMap[region.id] = {
          slug: region.slug,
          country_id: region.country_id
        };
      });
      
      const countryMap2 = {};
      countryResult2.forEach(country => {
        countryMap2[country.id] = country.slug;
      });
      
      cities = cityData.map(city => {
        const region = regionMap[city.region_id];
        const countrySlug = region ? countryMap2[region.country_id] : 'unknown';
        const regionSlug = region ? region.slug : 'unknown';
        
        return {
          ...city,
          canonical_slug: `/foster-agency/${countrySlug}/${regionSlug}/${city.slug}`
        };
      });
    }
    
    // Build the hierarchical structure
    const tree = [];
    
    // First, add all countries
    countries.forEach(country => {
      tree.push({
        id: country.id,
        name: country.name,
        slug: country.slug,
        canonical_slug: country.canonical_slug || `/foster-agency/${country.slug}`,
        type: 'country',
        editable: true, // Make all countries editable
        children: []
      });
    });
    
    // Then, add all regions to their respective countries
    regions.forEach(region => {
      const country = tree.find(c => c.id === region.country_id);
      if (country) {
        country.children.push({
          id: region.id,
          name: region.name,
          slug: region.slug,
          canonical_slug: region.canonical_slug || `/foster-agency/${country.slug}/${region.slug}`,
          type: 'region',
          editable: true, // Make all regions editable
          children: []
        });
      }
    });
    
    // Finally, add all cities to their respective regions
    cities.forEach(city => {
      // Find the country that contains the region this city belongs to
      let targetCountry = null;
      let targetRegion = null;
      
      // Look for the region in all countries
      for (const country of tree) {
        const region = country.children.find(r => r.id === city.region_id);
        if (region) {
          targetCountry = country;
          targetRegion = region;
          break;
        }
      }
      
      if (targetCountry && targetRegion) {
        targetRegion.children.push({
          id: city.id,
          name: city.name,
          slug: city.slug,
          canonical_slug: city.canonical_slug || `/foster-agency/${targetCountry.slug}/${targetRegion.slug}/${city.slug}`,
          type: 'city',
          editable: true, // Make all cities editable
          children: []
        });
      } else {
        // Handle orphaned cities (cities with invalid region_id)
        console.warn(`Orphaned city found: ${city.name} (ID: ${city.id}) with region_id: ${city.region_id}`);
      }
    });
    
    return tree;
  } catch (error) {
    console.error('Error getting location tree:', error);
    // Return an empty tree as a fallback
    return [];
  }
}

/**
 * Get location content by slug
 * @param {string} slug - The slug of the location
 * @returns {Promise<Object|null>} The location content
 */
async function getLocationContentBySlug(slug) {
  try {
    const { data, error } = await supabaseAdmin
      .from("location_content")
      .select("content_json, locations(name, slug, type)")
      .eq("locations.slug", slug)
      .maybeSingle();

    if (error) {
      console.error("Error fetching location content by slug:", error);
      return null;
    }

    return data?.content_json || null;
  } catch (error) {
    console.error("Error getting location content by slug:", error);
    return null;
  }
}

/**
 * Get location content by canonical slug
 * @param {string} canonicalSlug - The canonical slug of the location
 * @returns {Promise<Object|null>} The location content
 */
async function getLocationContentByCanonicalSlug(canonicalSlug) {
  try {
    console.log('=== getLocationContentByCanonicalSlug called with:', canonicalSlug);
    
    // Validate that we have a canonical slug
    if (!canonicalSlug) {
      console.warn('No canonical slug provided');
      return null;
    }
    
    // Ensure the canonical slug starts with /foster-agency/
    let formattedCanonicalSlug = canonicalSlug;
    if (!canonicalSlug.startsWith('/foster-agency/')) {
      formattedCanonicalSlug = `/foster-agency/${canonicalSlug.replace(/^\/+/, '')}`;
      console.log('Formatted canonical slug:', formattedCanonicalSlug);
    }
    
    // First, try to query location_content directly using the canonical_slug column
    const { data: directData, error: directError } = await supabaseAdmin
      .from('location_content')
      .select('content_json')
      .eq('canonical_slug', formattedCanonicalSlug)
      .maybeSingle();

    if (directData && !directError) {
      console.log('Data fetched directly for canonical slug:', formattedCanonicalSlug, directData);
      // Ensure we return a proper object structure
      const content = directData?.content_json || null;
      console.log('Returning content:', !!content);
      return content;
    }
    
    if (directError) {
      console.log('Direct query error:', directError);
    }
    
    console.log('No direct data found, trying join approach');

    // If direct query fails or returns no data, try the join approach
    // This is similar to how getLocationContentBySlug works
    const { data, error } = await supabaseAdmin
      .from('location_content')
      .select('content_json, locations!inner(canonical_slug)')
      .eq('locations.canonical_slug', formattedCanonicalSlug)
      .maybeSingle();

    if (error) {
      console.error('Error fetching location content by canonical slug:', error);
      // If we get a PostgREST error about locations not being embedded, 
      // it means we're trying to access a relationship incorrectly
      if (error.code === 'PGRST108') {
        console.log('PostgREST embedded resource error, trying alternative approach');
        
        // Try to get the location first, then get its content
        const { data: locationData, error: locationError } = await supabaseAdmin
          .from('locations')
          .select('id')
          .eq('canonical_slug', formattedCanonicalSlug)
          .maybeSingle();

        if (locationError) {
          console.error('Error finding location by canonical slug:', locationError);
          return null;
        }

        if (!locationData) {
          console.log('No location found for canonical slug:', formattedCanonicalSlug);
          return null;
        }

        // Now get the content using the location_id
        const { data: contentData, error: contentError } = await supabaseAdmin
          .from('location_content')
          .select('content_json')
          .eq('location_id', locationData.id)
          .maybeSingle();

        if (contentError) {
          console.error('Error fetching location content by location_id:', contentError);
          return null;
        }

        console.log('Content fetched by location_id:', contentData);
        // Ensure we return a proper object structure
        const content = contentData?.content_json || null;
        console.log('Returning content:', !!content);
        return content;
      }
      
      return null;
    }

    console.log('Data fetched for canonical slug:', formattedCanonicalSlug, data);
    // Ensure we return a proper object structure
    const content = data?.content_json || null;
    console.log('Returning content:', !!content);
    return content;
  } catch (error) {
    console.error('Error getting location content by canonical slug:', error);
    return null;
  }
}

// Helper function to get agencies by region
async function getAgenciesByRegion(regionSlug, limit = 10, filters = {}) {
  try {
    let query = supabaseAdmin
      .from('agencies')
      .select('*')
      .eq('region_slug', regionSlug)
      .limit(limit);

    // Apply filters if provided
    if (filters.featured) {
      query = query.eq('featured', true);
    }

    if (filters.type) {
      query = query.eq('type', filters.type);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching agencies by region:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error getting agencies by region:', error);
    return [];
  }
}

// Helper function to get cities by region
async function getCitiesByRegion(regionSlug, limit = 10) {
  try {
    const { data, error } = await supabaseAdmin
      .from('cities')
      .select('*')
      .eq('region_slug', regionSlug)
      .limit(limit);

    if (error) {
      console.error('Error fetching cities by region:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error getting cities by region:', error);
    return [];
  }
}

module.exports = {
  buildCanonicalSlug,
  updateCanonicalSlug,
  getLocationTree,
  getLocationContentBySlug,
  getLocationContentByCanonicalSlug,
  getAgenciesByRegion,
  getCitiesByRegion
};