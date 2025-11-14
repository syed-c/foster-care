const { supabaseAdmin } = require('./supabase-server');

// Utility function to format slugs back to readable titles
function formatSlugToTitle(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace(/ And /g, ' and ')
    .replace(/ Of /g, ' of ')
    .replace(/ In /g, ' in ')
    .replace(/ The /g, ' the ')
    .replace(/ Uk /g, ' UK ')
    .replace(/Nhs/g, 'NHS')
    .trim();
}

// Load all countries from Supabase
async function loadCountries() {
  try {
    // Check if Supabase is configured
    if (!supabaseAdmin) {
      console.warn('Supabase not configured. Returning empty countries list.');
      return [];
    }

    console.log('Attempting to load countries from Supabase...');
    
    const { data, error } = await supabaseAdmin
      .from('countries')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error loading countries from Supabase:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      return [];
    }

    console.log('Successfully loaded countries from Supabase:', data?.length || 0);
    return data || [];
  } catch (error) {
    console.error('Exception while loading countries:', error);
    console.error('Error stack:', error.stack);
    return [];
  }
}

// Load regions for a country
async function loadRegionsForCountry(countrySlug) {
  try {
    // Check if Supabase is configured
    if (!supabaseAdmin) {
      console.warn('Supabase not configured. Returning empty regions list.');
      return [];
    }

    console.log('Loading regions for country:', countrySlug);
    
    const { data: country, error: countryError } = await supabaseAdmin
      .from('countries')
      .select('id')
      .eq('slug', countrySlug)
      .single();

    if (countryError || !country) {
      console.warn('Country not found or Supabase error:', countryError);
      if (countryError) {
        console.error('Country error details:', {
          message: countryError.message,
          code: countryError.code,
          details: countryError.details,
          hint: countryError.hint
        });
      }
      return [];
    }

    const { data, error } = await supabaseAdmin
      .from('regions')
      .select('*')
      .eq('country_id', country.id)
      .order('name');

    if (error) {
      console.error('Error loading regions:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      return [];
    }

    console.log('Successfully loaded regions:', data?.length || 0);
    return data || [];
  } catch (error) {
    console.error('Exception while loading regions:', error);
    console.error('Error stack:', error.stack);
    return [];
  }
}

// Load cities for a region
async function loadCitiesForRegion(countrySlug, regionSlug) {
  try {
    // Check if Supabase is configured
    if (!supabaseAdmin) {
      console.warn('Supabase not configured. Returning empty cities list.');
      return [];
    }

    console.log('Loading cities for region:', countrySlug, regionSlug);
    
    const { data: country, error: countryError } = await supabaseAdmin
      .from('countries')
      .select('id')
      .eq('slug', countrySlug)
      .single();

    if (countryError || !country) {
      console.warn('Country not found or Supabase error:', countryError);
      if (countryError) {
        console.error('Country error details:', {
          message: countryError.message,
          code: countryError.code,
          details: countryError.details,
          hint: countryError.hint
        });
      }
      return [];
    }

    const { data: region, error: regionError } = await supabaseAdmin
      .from('regions')
      .select('id')
      .eq('slug', regionSlug)
      .eq('country_id', country.id)
      .single();

    if (regionError || !region) {
      console.warn('Region not found or Supabase error:', regionError);
      if (regionError) {
        console.error('Region error details:', {
          message: regionError.message,
          code: regionError.code,
          details: regionError.details,
          hint: regionError.hint
        });
      }
      return [];
    }

    const { data, error } = await supabaseAdmin
      .from('cities')
      .select('*')
      .eq('region_id', region.id)
      .order('name');

    if (error) {
      console.error('Error loading cities:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint
      });
      return [];
    }

    console.log('Successfully loaded cities:', data?.length || 0);
    return data || [];
  } catch (error) {
    console.error('Exception while loading cities:', error);
    console.error('Error stack:', error.stack);
    return [];
  }
}

// Optimized function to load all locations (countries, regions, and cities) in a single query
async function loadAllLocations() {
  try {
    // Check if Supabase is configured
    if (!supabaseAdmin) {
      console.warn('Supabase not configured. Returning empty locations list.');
      return {};
    }

    console.log('Loading all locations from Supabase...');
    
    // Load countries
    const { data: countries, error: countriesError } = await supabaseAdmin
      .from('countries')
      .select('id, name, slug')
      .order('name');

    if (countriesError) {
      console.error('Error loading countries:', countriesError);
      console.error('Error details:', {
        message: countriesError.message,
        code: countriesError.code,
        details: countriesError.details,
        hint: countriesError.hint
      });
      return {};
    }

    // Load all regions with their country information
    const { data: regions, error: regionsError } = await supabaseAdmin
      .from('regions')
      .select('id, name, slug, country_id')
      .order('name');

    if (regionsError) {
      console.error('Error loading regions:', regionsError);
      console.error('Error details:', {
        message: regionsError.message,
        code: regionsError.code,
        details: regionsError.details,
        hint: regionsError.hint
      });
      return {};
    }

    // Load all cities with their region and country information
    const { data: cities, error: citiesError } = await supabaseAdmin
      .from('cities')
      .select('id, name, slug, region_id')
      .order('name');

    if (citiesError) {
      console.error('Error loading cities:', citiesError);
      console.error('Error details:', {
        message: citiesError.message,
        code: citiesError.code,
        details: citiesError.details,
        hint: citiesError.hint
      });
      return {};
    }

    // Build the hierarchical structure
    const structure = {};
    
    // First, add all countries
    countries.forEach(country => {
      structure[country.slug] = {
        id: country.id,
        name: country.name,
        regions: {}
      };
    });

    // Then, add all regions to their respective countries
    regions.forEach(region => {
      const country = countries.find(c => c.id === region.country_id);
      if (country && structure[country.slug]) {
        structure[country.slug].regions[region.slug] = {
          id: region.id,
          name: region.name,
          cities: {}
        };
      }
    });

    // Finally, add all cities to their respective regions
    cities.forEach(city => {
      // Find the region this city belongs to
      const region = regions.find(r => r.id === city.region_id);
      if (region) {
        // Find the country this region belongs to
        const country = countries.find(c => c.id === region.country_id);
        if (country && structure[country.slug] && structure[country.slug].regions[region.slug]) {
          structure[country.slug].regions[region.slug].cities[city.slug] = {
            id: city.id,
            name: city.name
          };
        }
      }
    });

    console.log('Successfully loaded all locations structure');
    return structure;
  } catch (error) {
    console.error('Exception while loading all locations:', error);
    console.error('Error stack:', error.stack);
    return {};
  }
}

// Get all countries (synchronous wrapper for client components)
function getCountries() {
  // This is used in client components, so we need to handle it differently
  // Return empty array and let the component fetch data
  return [];
}

// Build location structure (optimized version)
async function buildLocationStructure() {
  console.log('Building optimized location structure...');
  // Use the optimized function instead of making multiple individual calls
  const structure = await loadAllLocations();
  console.log('Location structure built with', Object.keys(structure).length, 'countries');
  return structure;
}

// Get regions for a country (for backwards compatibility)
function getRegionsForCountry(structure, countrySlug) {
  if (!structure[countrySlug]) return [];
  
  return Object.entries(structure[countrySlug].regions).map(([slug, region]) => ({
    slug,
    name: region.name
  }));
}

// Get cities for a region (for backwards compatibility)
function getCitiesForRegion(structure, countrySlug, regionSlug) {
  if (!structure[countrySlug] || !structure[countrySlug].regions[regionSlug]) return [];
  
  return Object.entries(structure[countrySlug].regions[regionSlug].cities).map(([slug, city]) => ({
    slug,
    name: city.name
  }));
}

// Generate static paths for all countries
async function generateCountryPaths() {
  const countries = await loadCountries();
  
  // For development and production, only generate a few pages to avoid memory issues
  // This prevents the build from running out of memory when generating 500+ pages
  if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
    return countries.slice(0, 3).map(country => ({
      country: country.slug
    }));
  }
  
  return countries.map(country => ({
    country: country.slug
  }));
}

// Generate static paths for all regions
async function generateRegionPaths() {
  const countries = await loadCountries();
  const paths = [];

  for (const country of countries) {
    const regions = await loadRegionsForCountry(country.slug);
    
    // For development and production, only generate a few pages to avoid memory issues
    // This prevents the build from running out of memory when generating 500+ pages
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
      const limitedRegions = regions.slice(0, 2);
      for (const region of limitedRegions) {
        paths.push({
          country: country.slug,
          region: region.slug
        });
      }
      // Only process first country in development
      break;
    } else {
      for (const region of regions) {
        paths.push({
          country: country.slug,
          region: region.slug
        });
      }
    }
  }

  return paths;
}

// Generate static paths for all cities
async function generateCityPaths() {
  const countries = await loadCountries();
  const paths = [];

  for (const country of countries) {
    const regions = await loadRegionsForCountry(country.slug);
    
    // For development and production, only generate a few pages to avoid memory issues
    // This prevents the build from running out of memory when generating 500+ pages
    if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'production') {
      // Only process first country and first region in development
      if (regions.length > 0) {
        const cities = await loadCitiesForRegion(country.slug, regions[0].slug);
        const limitedCities = cities.slice(0, 3);
        for (const city of limitedCities) {
          paths.push({
            country: country.slug,
            region: regions[0].slug,
            city: city.slug
          });
        }
      }
      // Only process first country in development
      break;
    } else {
      for (const region of regions) {
        const cities = await loadCitiesForRegion(country.slug, region.slug);
        for (const city of cities) {
          paths.push({
            country: country.slug,
            region: region.slug,
            city: city.slug
          });
        }
      }
    }
  }

  return paths;
}

// Load location data (deprecated - kept for compatibility)
function loadLocationData() {
  // No longer used - data comes from Supabase
  return [];
}

// Slugify function (for backwards compatibility)
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

module.exports = {
  slugify,
  formatSlugToTitle,
  loadLocationData,
  buildLocationStructure,
  getCountries,
  getRegionsForCountry,
  getCitiesForRegion,
  generateCountryPaths,
  generateRegionPaths,
  generateCityPaths,
  // New Supabase functions
  loadCountries,
  loadRegionsForCountry,
  loadCitiesForRegion,
  // Optimized function
  loadAllLocations
};