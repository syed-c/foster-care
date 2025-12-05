const { supabaseAdmin } = require('./lib/supabase-server');

async function verifyCanonicalSlugs() {
  try {
    console.log('Verifying canonical slugs in database...');
    
    // Check countries
    console.log('\n=== Countries ===');
    const { data: countries, error: countriesError } = await supabaseAdmin
      .from('countries')
      .select('id, name, slug, canonical_slug')
      .order('name');
    
    if (countriesError) {
      console.error('Error fetching countries:', countriesError);
    } else {
      countries.forEach(country => {
        console.log(`${country.name}: ${country.canonical_slug || 'NOT SET'}`);
      });
    }
    
    // Check regions
    console.log('\n=== Regions ===');
    const { data: regions, error: regionsError } = await supabaseAdmin
      .from('regions')
      .select('id, name, slug, canonical_slug, country_id')
      .order('name')
      .limit(10); // Limit to 10 for brevity
    
    if (regionsError) {
      console.error('Error fetching regions:', regionsError);
    } else {
      regions.forEach(region => {
        console.log(`${region.name}: ${region.canonical_slug || 'NOT SET'}`);
      });
    }
    
    // Check cities
    console.log('\n=== Cities ===');
    const { data: cities, error: citiesError } = await supabaseAdmin
      .from('cities')
      .select('id, name, slug, canonical_slug, region_id')
      .order('name')
      .limit(10); // Limit to 10 for brevity
    
    if (citiesError) {
      console.error('Error fetching cities:', citiesError);
    } else {
      cities.forEach(city => {
        console.log(`${city.name}: ${city.canonical_slug || 'NOT SET'}`);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error verifying canonical slugs:', error);
    process.exit(1);
  }
}

verifyCanonicalSlugs();