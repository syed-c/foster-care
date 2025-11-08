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
        
        if (error || !data) break;
        node = data;
        currentId = node.region_id;
        currentType = 'region';
      } else if (currentType === 'region') {
        const { data, error } = await supabaseAdmin
          .from('regions')
          .select('id, name, slug, country_id')
          .eq('id', currentId)
          .single();
        
        if (error || !data) break;
        node = data;
        currentId = node.country_id;
        currentType = 'country';
      } else if (currentType === 'country') {
        const { data, error } = await supabaseAdmin
          .from('countries')
          .select('id, name, slug')
          .eq('id', currentId)
          .single();
        
        if (error || !data) break;
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
    
    return '/foster-agency/' + parts.join('/');
  } catch (error) {
    console.error('Error building canonical slug:', error);
    throw error;
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
    
    // If there's any other error, re-throw it
    if (error) {
      throw error;
    }
    
    // If no error, the column exists
    return true;
  } catch (error) {
    // If the error is about the column not existing, return false
    if (error.message && error.message.includes(`column "${columnName}" does not exist`)) {
      return false;
    }
    // Re-throw any other errors
    throw error;
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
      console.warn('Error checking for canonical_slug column:', error);
      hasCanonicalSlug = false;
    }
    
    if (hasCanonicalSlug) {
      // Load all countries with canonical_slug
      const { data: countryData, error: countriesError } = await supabaseAdmin
        .from('countries')
        .select('id, name, slug, canonical_slug')
        .order('name');
      
      if (countriesError) throw countriesError;
      countries = countryData;
      
      // Load all regions with canonical_slug
      const { data: regionData, error: regionsError } = await supabaseAdmin
        .from('regions')
        .select('id, name, slug, canonical_slug, country_id')
        .order('name');
      
      if (regionsError) throw regionsError;
      regions = regionData;
      
      // Load all cities with canonical_slug
      const { data: cityData, error: citiesError } = await supabaseAdmin
        .from('cities')
        .select('id, name, slug, canonical_slug, region_id')
        .order('name');
      
      if (citiesError) throw citiesError;
      cities = cityData;
    } else {
      console.warn('canonical_slug column not found, falling back to slug-based canonical slugs');
      
      // Load all countries without canonical_slug
      const { data: countryData, error: countriesError } = await supabaseAdmin
        .from('countries')
        .select('id, name, slug')
        .order('name');
      
      if (countriesError) throw countriesError;
      countries = countryData.map(country => ({
        ...country,
        canonical_slug: `/foster-agency/${country.slug}`
      }));
      
      // Load all regions without canonical_slug
      const { data: regionData, error: regionsError } = await supabaseAdmin
        .from('regions')
        .select('id, name, slug, country_id')
        .order('name');
      
      if (regionsError) throw regionsError;
      
      // We need to join with countries to get the country slug for building canonical_slug
      const { data: countryResult, error: countryError } = await supabaseAdmin
        .from('countries')
        .select('id, slug')
        .order('name');
      
      if (countryError) throw countryError;
      
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
      
      if (citiesError) throw citiesError;
      
      // We need to join with regions and countries to get the slugs for building canonical_slug
      const { data: regionResult, error: regionError } = await supabaseAdmin
        .from('regions')
        .select('id, slug, country_id');
      
      if (regionError) throw regionError;
      
      const { data: countryResult2, error: countryError2 } = await supabaseAdmin
        .from('countries')
        .select('id, slug');
      
      if (countryError2) throw countryError2;
      
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
    throw error;
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
    // First try to get content directly from location_content table using canonical_slug
    const { data: directData, error: directError } = await supabaseAdmin
      .from('location_content')
      .select('content_json')
      .eq('canonical_slug', canonicalSlug)
      .maybeSingle();

    if (!directError && directData) {
      return directData.content_json || null;
    }

    // If that fails, try joining with locations table
    const { data, error } = await supabaseAdmin
      .from('location_content')
      .select('content_json')
      .eq('locations.canonical_slug', canonicalSlug)
      .maybeSingle();

    if (error) {
      console.error('Error fetching location content by canonical slug:', error);
      return null;
    }

    return data?.content_json || null;
  } catch (error) {
    console.error('Error getting location content by canonical slug:', error);
    return null;
  }
}

module.exports = {
  buildCanonicalSlug,
  updateCanonicalSlug,
  getLocationTree,
  getLocationContentBySlug,
  getLocationContentByCanonicalSlug
};