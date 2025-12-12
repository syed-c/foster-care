const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkCMSTables() {
  try {
    // List all tables in the database
    console.log('Checking for existing CMS-related tables...');
    
    // Try to get table names using a different approach
    const { data, error } = await supabase
      .from('locations')
      .select('id')
      .limit(1);
    
    if (!error) {
      console.log('Database connection successful.');
      console.log('Current tables in use: locations, location_content');
    } else {
      console.log('Database connection error:', error.message);
    }
    
    // Check if there's already a cms_pages table
    try {
      const { data: cmsData, error: cmsError } = await supabase
        .from('cms_pages')
        .select('id')
        .limit(1);
      
      if (!cmsError) {
        console.log('cms_pages table already exists.');
      } else {
        console.log('cms_pages table does not exist yet.');
      }
    } catch (e) {
      console.log('cms_pages table does not exist yet.');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

checkCMSTables().catch(console.error);