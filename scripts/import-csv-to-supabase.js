const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: path.join(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials!');
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Simple CSV parser (no external dependencies)
function parseCSV(csvContent) {
  const lines = csvContent.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  const records = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    // Parse CSV line handling quoted fields
    const values = [];
    let current = '';
    let inQuotes = false;
    
    for (let j = 0; j < lines[i].length; j++) {
      const char = lines[i][j];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        values.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    values.push(current.trim());

    if (values.length === headers.length) {
      const record = {};
      headers.forEach((header, idx) => {
        record[header] = values[idx] || '';
      });
      records.push(record);
    }
  }

  return records;
}

// Slugify function
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');
}

async function importCSVToSupabase() {
  console.log('🚀 Starting CSV import to Supabase...\n');

  // Read CSV file
  const csvPath = path.join(process.cwd(), 'uk-foster-agency-location-urls.csv');
  
  if (!fs.existsSync(csvPath)) {
    console.error(`❌ CSV file not found: ${csvPath}`);
    process.exit(1);
  }

  console.log('📄 Reading CSV file...');
  const csvContent = fs.readFileSync(csvPath, 'utf8');
  const records = parseCSV(csvContent);
  console.log(`✅ Parsed ${records.length} records\n`);

  // Build structure
  const countriesMap = new Map();
  const regionsMap = new Map();
  const cities = [];

  for (const record of records) {
    const countryName = record.country.trim();
    const regionName = record.region_or_county.trim();
    const cityName = record.city_or_district.trim();
    const url = record.url.trim();

    if (!countryName || !regionName || !cityName) continue;

    const countrySlug = slugify(countryName);
    const regionSlug = slugify(regionName);
    const citySlug = slugify(cityName);

    // Track countries
    if (!countriesMap.has(countrySlug)) {
      countriesMap.set(countrySlug, {
        name: countryName,
        slug: countrySlug,
        regions: new Map()
      });
    }

    // Track regions
    const countryKey = countrySlug;
    if (!countriesMap.get(countryKey).regions.has(regionSlug)) {
      countriesMap.get(countryKey).regions.set(regionSlug, {
        name: regionName,
        slug: regionSlug,
        countrySlug: countrySlug
      });
    }

    // Track cities
    cities.push({
      name: cityName,
      slug: citySlug,
      url: url,
      countrySlug: countrySlug,
      regionSlug: regionSlug
    });
  }

  console.log(`📊 Found ${countriesMap.size} countries, ${Array.from(countriesMap.values()).reduce((sum, c) => sum + c.regions.size, 0)} regions, ${cities.length} cities\n`);

  // Import countries
  console.log('🌍 Importing countries...');
  const countriesArray = Array.from(countriesMap.values()).map(c => ({
    name: c.name,
    slug: c.slug
  }));

  const { data: insertedCountries, error: countriesError } = await supabase
    .from('countries')
    .upsert(countriesArray, { onConflict: 'slug', ignoreDuplicates: false })
    .select();

  if (countriesError) {
    console.error('❌ Error importing countries:', countriesError);
    process.exit(1);
  }

  console.log(`✅ Imported ${insertedCountries.length} countries\n`);

  // Create country ID map
  const countryIdMap = new Map();
  for (const country of insertedCountries) {
    countryIdMap.set(country.slug, country.id);
  }

  // Import regions
  console.log('🏛️ Importing regions...');
  const regionsArray = [];
  for (const [countrySlug, country] of countriesMap.entries()) {
    const countryId = countryIdMap.get(countrySlug);
    if (!countryId) continue;

    for (const [regionSlug, region] of country.regions.entries()) {
      regionsArray.push({
        country_id: countryId,
        name: region.name,
        slug: region.slug
      });
    }
  }

  const { data: insertedRegions, error: regionsError } = await supabase
    .from('regions')
    .upsert(regionsArray, { onConflict: 'country_id,slug', ignoreDuplicates: false })
    .select();

  if (regionsError) {
    console.error('❌ Error importing regions:', regionsError);
    process.exit(1);
  }

  console.log(`✅ Imported ${insertedRegions.length} regions\n`);

  // Create region ID map
  const regionIdMap = new Map();
  for (const region of insertedRegions) {
    const key = `${region.country_id}_${region.slug}`;
    regionIdMap.set(key, region.id);
  }

  // Import cities
  console.log('🏙️ Importing cities...');
  const citiesArray = [];
  for (const city of cities) {
    const countryId = countryIdMap.get(city.countrySlug);
    if (!countryId) continue;

    const regionKey = `${countryId}_${city.regionSlug}`;
    const regionId = Array.from(regionIdMap.entries()).find(([key]) => key.includes(city.regionSlug))?.[1];
    if (!regionId) {
      // Find region by slug within country
      const region = insertedRegions.find(r => 
        r.country_id === countryId && r.slug === city.regionSlug
      );
      if (region) {
        citiesArray.push({
          country_id: countryId,
          region_id: region.id,
          name: city.name,
          slug: city.slug,
          url: city.url
        });
      }
    } else {
      citiesArray.push({
        country_id: countryId,
        region_id: regionId,
        name: city.name,
        slug: city.slug,
        url: city.url
      });
    }
  }

  // Batch insert cities (Supabase has limits)
  const batchSize = 1000;
  let importedCities = 0;

  for (let i = 0; i < citiesArray.length; i += batchSize) {
    const batch = citiesArray.slice(i, i + batchSize);
    const { data: inserted, error: citiesError } = await supabase
      .from('cities')
      .upsert(batch, { onConflict: 'region_id,slug', ignoreDuplicates: false })
      .select();

    if (citiesError) {
      console.error(`❌ Error importing cities batch ${Math.floor(i / batchSize) + 1}:`, citiesError);
    } else {
      importedCities += inserted.length;
      console.log(`  ✅ Batch ${Math.floor(i / batchSize) + 1}: Imported ${inserted.length} cities`);
    }
  }

  console.log(`\n✅ Imported ${importedCities} cities`);
  console.log('\n🎉 Import completed successfully!');
}

// Run import
importCSVToSupabase().catch(console.error);

