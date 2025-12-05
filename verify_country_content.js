const { supabaseAdmin } = require('./lib/supabase-server');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

async function verifyCountryContent() {
  try {
    console.log('Verifying country content structure...');
    
    // Get a country location
    const { data: countries, error: countriesError } = await supabaseAdmin
      .from('countries')
      .select('id, name, slug, canonical_slug')
      .limit(1);
    
    if (countriesError) {
      console.error('Error fetching countries:', countriesError);
      return;
    }
    
    if (!countries || countries.length === 0) {
      console.log('No countries found');
      return;
    }
    
    const country = countries[0];
    console.log('Country:', country);
    
    // Get content for this country
    const { data: content, error: contentError } = await supabaseAdmin
      .from('location_content')
      .select('content_json, canonical_slug')
      .eq('location_id', country.id)
      .maybeSingle();
    
    if (contentError) {
      console.error('Error fetching content:', contentError);
      return;
    }
    
    console.log('Content structure:');
    if (content && content.content_json) {
      console.log('Content keys:', Object.keys(content.content_json));
      
      // Check for specific sections
      console.log('\nSection availability:');
      console.log('Overview:', !!content.content_json.overview);
      console.log('Agency Finder:', !!content.content_json.agencyFinder);
      console.log('Popular Locations:', !!content.content_json.popularLocations);
      console.log('Foster System:', !!content.content_json.fosterSystem);
      console.log('Why Foster:', !!content.content_json.whyFoster);
      console.log('FAQs:', !!content.content_json.faqs);
      
      // Show sample content
      if (content.content_json.overview) {
        console.log('\nOverview section:');
        console.log(JSON.stringify(content.content_json.overview, null, 2));
      }
    } else {
      console.log('No content found for this country');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error verifying country content:', error);
    process.exit(1);
  }
}

verifyCountryContent();