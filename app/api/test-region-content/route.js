import { supabaseAdmin } from '@/lib/supabase-server';

export async function GET(request) {
  try {
    console.log('=== Test Region Content API Called ===');
    
    // Test 1: Check if there are any location_content records
    const { data: contents, error: contentsError } = await supabaseAdmin
      .from('location_content')
      .select('*')
      .limit(10);

    console.log('Contents query result:', contents?.length || 0, contentsError?.message || 'No error');
    
    if (contentsError) {
      console.error('Error fetching location_content:', contentsError);
      return new Response(JSON.stringify({ error: contentsError.message }), { status: 500 });
    }

    // Test 2: Check for specific region content
    const testSlug = '/foster-agency/england/greater-london';
    console.log('Checking for content with slug:', testSlug);
    
    const { data: regionContent, error: regionError } = await supabaseAdmin
      .from('location_content')
      .select('content_json, canonical_slug')
      .eq('canonical_slug', testSlug)
      .maybeSingle();

    console.log('Region content query result:', regionContent, regionError?.message || 'No error');

    // Test 3: Check all location_content with canonical_slug
    const { data: allContent, error: allError } = await supabaseAdmin
      .from('location_content')
      .select('canonical_slug, content_json')
      .limit(20);

    console.log('All content query result:', allContent?.length || 0, allError?.message || 'No error');

    // Test 4: Check locations table
    const { data: locations, error: locationsError } = await supabaseAdmin
      .from('locations')
      .select('*')
      .limit(10);

    console.log('Locations query result:', locations?.length || 0, locationsError?.message || 'No error');

    return new Response(JSON.stringify({
      contents: contents || [],
      regionContent: regionContent || null,
      regionError: regionError?.message || null,
      allContent: allContent || [],
      allError: allError?.message || null,
      locations: locations || [],
      locationsError: locationsError?.message || null
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error in test-region-content API:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}