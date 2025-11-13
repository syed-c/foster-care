import { supabaseAdmin } from '@/lib/supabase-server';

export async function GET(request) {
  try {
    console.log('=== Test Locations API Called ===');
    
    // Test 1: Get all countries
    const { data: countries, error: countriesError } = await supabaseAdmin
      .from('countries')
      .select('id, name, slug, canonical_slug')
      .order('name');

    console.log('Countries:', countries?.length || 0, countriesError?.message || 'No error');
    
    // Test 2: Get all regions with country info
    const { data: regions, error: regionsError } = await supabaseAdmin
      .from('regions')
      .select('id, name, slug, country_id, canonical_slug')
      .order('name')
      .limit(10);

    console.log('Regions:', regions?.length || 0, regionsError?.message || 'No error');
    
    // Test 3: Get sample cities
    const { data: cities, error: citiesError } = await supabaseAdmin
      .from('cities')
      .select('id, name, slug, region_id, canonical_slug')
      .order('name')
      .limit(10);

    console.log('Cities:', cities?.length || 0, citiesError?.message || 'No error');

    // Test 4: Check a specific region path
    const testCountrySlug = 'england';
    const testRegionSlug = 'greater-london';
    
    console.log('Checking path:', testCountrySlug, testRegionSlug);
    
    // Get country
    const { data: country, error: countryError } = await supabaseAdmin
      .from('countries')
      .select('id, name, slug, canonical_slug')
      .eq('slug', testCountrySlug)
      .maybeSingle();
      
    console.log('Country lookup:', country, countryError?.message || 'No error');
    
    if (country) {
      // Get region
      const { data: region, error: regionError } = await supabaseAdmin
        .from('regions')
        .select('id, name, slug, canonical_slug')
        .eq('slug', testRegionSlug)
        .eq('country_id', country.id)
        .maybeSingle();
        
      console.log('Region lookup:', region, regionError?.message || 'No error');
      
      if (region) {
        // Check if there's content for this region
        const canonicalSlug = `/foster-agency/${testCountrySlug}/${testRegionSlug}`;
        console.log('Looking for content with canonical slug:', canonicalSlug);
        
        const { data: content, error: contentError } = await supabaseAdmin
          .from('location_content')
          .select('content_json, canonical_slug')
          .eq('canonical_slug', canonicalSlug)
          .maybeSingle();
          
        console.log('Content lookup:', content, contentError?.message || 'No error');
      }
    }

    return new Response(JSON.stringify({
      countries: countries || [],
      countriesError: countriesError?.message || null,
      regions: regions || [],
      regionsError: regionsError?.message || null,
      cities: cities || [],
      citiesError: citiesError?.message || null
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error in test-locations API:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}