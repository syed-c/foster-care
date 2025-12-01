require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

async function testContentFetch() {
  try {
    console.log('Testing content fetch...');
    
    // First, let's see what locations exist
    const { data: locations, error: locationsError } = await supabaseAdmin
      .from('locations')
      .select('*')
      .eq('id', 'c7e24886-6ae8-483a-837c-4db61d3310da');
    
    if (locationsError) {
      console.error('Error fetching locations:', locationsError);
      return;
    }
    
    console.log('Location:', locations);
    
    // Now let's see what content exists
    const { data: content, error: contentError } = await supabaseAdmin
      .from('location_content')
      .select('*');
    
    if (contentError) {
      console.error('Error fetching content:', contentError);
      return;
    }
    
    console.log('All content:', content);
    
    // Let's specifically check for content with canonical_slug /foster-agency/england
    const { data: specificContent, error: specificContentError } = await supabaseAdmin
      .from('location_content')
      .select('*')
      .eq('canonical_slug', '/foster-agency/england');
    
    if (specificContentError) {
      console.error('Error fetching specific content:', specificContentError);
      return;
    }
    
    console.log('Specific content:', specificContent);
  } catch (error) {
    console.error('Test error:', error);
  }
}

testContentFetch();