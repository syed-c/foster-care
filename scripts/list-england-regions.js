const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function listRegions() {
  try {
    // First, find England country
    const { data: england, error: englandError } = await supabase
      .from('countries')
      .select('id')
      .eq('slug', 'england')
      .single();
    
    if (englandError) {
      console.error('Error finding England:', englandError.message);
      return;
    }
    
    // Find all regions for England
    const { data: regions, error: regionsError } = await supabase
      .from('regions')
      .select('id, slug, title')
      .eq('country_id', england.id)
      .order('title');
    
    if (regionsError) {
      console.error('Error finding regions:', regionsError.message);
      return;
    }
    
    console.log('England regions:');
    regions.forEach(region => {
      console.log('- ' + region.title + ' (' + region.slug + ')');
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

listRegions();