const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function analyzeTables() {
  try {
    // Check locations table structure
    console.log('Locations table sample data:');
    const { data: locations, error: locationError } = await supabase
      .from('locations')
      .select('*')
      .limit(3);
    
    if (!locationError && locations && locations.length > 0) {
      console.log('Sample location records:');
      locations.forEach(location => {
        console.log('- ' + location.name + ' (' + location.type + ')');
      });
    } else {
      console.log('No location data found or error:', locationError?.message);
    }
    
    // Check location_content table structure
    console.log('\nLocation_content table sample data:');
    const { data: content, error: contentError } = await supabase
      .from('location_content')
      .select('*')
      .limit(1);
    
    if (!contentError && content && content.length > 0) {
      console.log('Sample content record:');
      console.log(JSON.stringify(content[0], null, 2));
    } else {
      console.log('No content data found or error:', contentError?.message);
    }
    
    // Check for different types of pages
    console.log('\nChecking page types:');
    const { data: pageTypes, error: typesError } = await supabase
      .from('locations')
      .select('type')
      .neq('type', null);
    
    if (!typesError && pageTypes) {
      const uniqueTypes = [...new Set(pageTypes.map(item => item.type))];
      console.log('Unique page types found:');
      uniqueTypes.forEach(type => {
        console.log('- ' + type);
      });
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

analyzeTables().catch(console.error);