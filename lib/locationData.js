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
    const { data, error } = await supabaseAdmin
      .from('countries')
      .select('*')
      .order('name');

    if (error) {
      console.error('Error loading countries:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error loading countries:', error);
    return [];
  }
}

// Load regions for a country
async function loadRegionsForCountry(countrySlug) {
  try {
    const { data: country, error: countryError } = await supabaseAdmin
      .from('countries')
      .select('id')
      .eq('slug', countrySlug)
      .single();

    if (countryError || !country) {
      return [];
    }

    const { data, error } = await supabaseAdmin
      .from('regions')
      .select('*')
      .eq('country_id', country.id)
      .order('name');

    if (error) {
      console.error('Error loading regions:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error loading regions:', error);
    return [];
  }
}

// Load cities for a region
async function loadCitiesForRegion(countrySlug, regionSlug) {
  try {
    const { data: country, error: countryError } = await supabaseAdmin
      .from('countries')
      .select('id')
      .eq('slug', countrySlug)
      .single();

    if (countryError || !country) {
      return [];
    }

    const { data: region, error: regionError } = await supabaseAdmin
      .from('regions')
      .select('id')
      .eq('slug', regionSlug)
      .eq('country_id', country.id)
      .single();

    if (regionError || !region) {
      return [];
    }

    const { data, error } = await supabaseAdmin
      .from('cities')
      .select('*')
      .eq('region_id', region.id)
      .order('name');

    if (error) {
      console.error('Error loading cities:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error loading cities:', error);
    return [];
  }
}

// Get all countries (synchronous wrapper for client components)
function getCountries() {
  // This is used in client components, so we need to handle it differently
  // Return empty array and let the component fetch data
  return [];
}

// Build location structure (for backwards compatibility)
async function buildLocationStructure() {
  const countries = await loadCountries();
  const structure = {};

  for (const country of countries) {
    const regions = await loadRegionsForCountry(country.slug);
    structure[country.slug] = {
      name: country.name,
      regions: {}
    };

    for (const region of regions) {
      const cities = await loadCitiesForRegion(country.slug, region.slug);
      structure[country.slug].regions[region.slug] = {
        name: region.name,
        cities: {}
      };

      for (const city of cities) {
        structure[country.slug].regions[region.slug].cities[city.slug] = {
          name: city.name,
          url: city.url
        };
      }
    }
  }

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
    name: city.name,
    url: city.url
  }));
}

// Generate static paths for all countries
async function generateCountryPaths() {
  const countries = await loadCountries();
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
    for (const region of regions) {
      paths.push({
        country: country.slug,
        region: region.slug
      });
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
  loadCitiesForRegion
};
