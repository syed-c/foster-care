import { supabaseAdmin } from '@/lib/supabase-server';
import { locationSchemas } from '@/lib/locationSchemas';

export async function GET(request) {
  try {
    console.log('=== Test Schema API Called ===');
    
    // Test 1: Get schema structure
    const schemas = {
      country: locationSchemas.country,
      region: locationSchemas.county, // Note: region schema is called "county"
      city: locationSchemas.city
    };
    
    // Test 2: Check database structure
    const { data: tables, error: tablesError } = await supabaseAdmin
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .in('table_name', ['locations', 'location_content', 'countries', 'regions', 'cities']);

    console.log('Tables query result:', tables, tablesError?.message || 'No error');
    
    // Test 3: Check location_content structure
    const { data: columns, error: columnsError } = await supabaseAdmin
      .from('information_schema.columns')
      .select('column_name, data_type')
      .eq('table_name', 'location_content')
      .eq('table_schema', 'public')
      .order('ordinal_position');

    console.log('Columns query result:', columns?.length || 0, columnsError?.message || 'No error');
    
    // Test 4: Get sample content
    const { data: sampleContent, error: contentError } = await supabaseAdmin
      .from('location_content')
      .select('id, location_id, template_type, content_json, canonical_slug')
      .limit(3);

    console.log('Sample content:', sampleContent?.length || 0, contentError?.message || 'No error');
    
    // Test 5: Check a specific region content
    const testSlug = '/foster-agency/england/greater-london';
    const { data: regionContent, error: regionError } = await supabaseAdmin
      .from('location_content')
      .select('content_json, canonical_slug')
      .eq('canonical_slug', testSlug)
      .maybeSingle();

    console.log('Region content:', regionContent, regionError?.message || 'No error');

    return new Response(JSON.stringify({
      schemas: {
        country: {
          template: schemas.country.template,
          label: schemas.country.label,
          sections: schemas.country.sections.map(s => ({ key: s.key, label: s.label }))
        },
        region: {
          template: schemas.region.template,
          label: schemas.region.label,
          sections: schemas.region.sections.map(s => ({ key: s.key, label: s.label }))
        },
        city: {
          template: schemas.city.template,
          label: schemas.city.label,
          sections: schemas.city.sections.map(s => ({ key: s.key, label: s.label }))
        }
      },
      database: {
        tables: tables || [],
        columns: columns || [],
        sampleContent: sampleContent || [],
        regionContent: regionContent || null,
        regionError: regionError?.message || null
      }
    }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error in test-schema API:', error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}