import { supabaseAdmin } from '@/lib/supabase-server';

export async function GET(request) {
  try {
    console.log('=== Test DB API Called ===');
    
    // Test 1: Check what tables exist
    const { data: tables, error: tablesError } = await supabaseAdmin
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_name', ['locations', 'location_content', 'countries', 'regions', 'cities']);

    console.log('Tables query result:', tables, tablesError?.message || 'No error');
    
    // Test 2: Check structure of location_content table
    const { data: contentColumns, error: contentColumnsError } = await supabaseAdmin
      .from('information_schema.columns')
      .select('column_name, data_type, is_nullable')
      .eq('table_name', 'location_content')
      .eq('table_schema', 'public')
      .order('ordinal_position');

    console.log('Content columns:', contentColumns?.length || 0, contentColumnsError?.message || 'No error');
    
    // Test 3: Check if there are any location_content records
    const { data: contents, error: contentsError } = await supabaseAdmin
      .from('location_content')
      .select('id, location_id, template_type, canonical_slug, content_json')
      .limit(5);

    console.log('Contents query result:', contents?.length || 0, contentsError?.message || 'No error');
    
    // Test 4: Check locations table
    const { data: locations, error: locationsError } = await supabaseAdmin
      .from('locations')
      .select('id, name, slug, type, parent_id')
      .limit(5);

    console.log('Locations query result:', locations?.length || 0, locationsError?.message || 'No error');
    
    // Test 5: Check countries table
    const { data: countries, error: countriesError } = await supabaseAdmin
      .from('countries')
      .select('id, name, slug, canonical_slug')
      .limit(5);

    console.log('Countries query result:', countries?.length || 0, countriesError?.message || 'No error');
    
    // Test 6: Check regions table
    const { data: regions, error: regionsError } = await supabaseAdmin
      .from('regions')
      .select('id, name, slug, country_id, canonical_slug')
      .limit(5);

    console.log('Regions query result:', regions?.length || 0, regionsError?.message || 'No error');

    return new Response(JSON.stringify({
      tables: tables || [],
      tablesError: tablesError?.message || null,
      contentColumns: contentColumns || [],
      contentColumnsError: contentColumnsError?.message || null,
      contents: contents || [],
      contentsError: contentsError?.message || null,
      locations: locations || [],
      locationsError: locationsError?.message || null,
      countries: countries || [],
      countriesError: countriesError?.message || null,
      regions: regions || [],
      regionsError: regionsError?.message || null
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error in test-db API:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}