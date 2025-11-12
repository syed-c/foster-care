const { supabaseAdmin } = require('./lib/supabase-server');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

async function testLocationContent() {
  try {
    console.log('Testing location content structure...');
    
    // Get a sample location ID
    const { data: locations, error: locationsError } = await supabaseAdmin
      .from('locations')
      .select('id, name, type')
      .limit(5);
    
    if (locationsError) {
      console.error('Error fetching locations:', locationsError);
      return;
    }
    
    console.log('Sample locations:', locations);
    
    // Get content for the first location
    if (locations && locations.length > 0) {
      const locationId = locations[0].id;
      console.log(`\nFetching content for location ID: ${locationId}`);
      
      const { data: content, error: contentError } = await supabaseAdmin
        .from('location_content')
        .select('content_json, template_type, canonical_slug')
        .eq('location_id', locationId)
        .maybeSingle();
      
      if (contentError) {
        console.error('Error fetching content:', contentError);
        return;
      }
      
      console.log('Content structure:');
      console.log(JSON.stringify(content, null, 2));
      
      // Check if content_json is properly structured
      if (content && content.content_json) {
        console.log('\nContent JSON keys:', Object.keys(content.content_json));
        
        // Check for specific sections
        if (content.content_json.overview) {
          console.log('Overview section exists');
        }
        if (content.content_json.about) {
          console.log('About section exists');
        }
        if (content.content_json.faqs) {
          console.log('FAQs section exists');
          console.log('FAQs structure:', typeof content.content_json.faqs);
          if (content.content_json.faqs.items) {
            console.log('FAQs items array exists with', content.content_json.faqs.items.length, 'items');
          }
        }
      }
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error testing location content:', error);
    process.exit(1);
  }
}

testLocationContent();