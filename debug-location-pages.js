const { supabaseAdmin } = require('./lib/supabase-server');

async function debugLocationPages() {
  try {
    console.log('Debugging location pages...');
    
    // Check if Supabase is configured
    if (!supabaseAdmin) {
      console.log('Supabase is not configured. Using mock data.');
      return;
    }
    
    // Check if location_content table exists and has data
    console.log('Checking location_content table...');
    const { data: contentData, error: contentError } = await supabaseAdmin
      .from('location_content')
      .select('*')
      .limit(5);
    
    if (contentError) {
      console.error('Error fetching location_content:', contentError);
    } else {
      console.log(`Found ${contentData?.length || 0} location content entries`);
      if (contentData && contentData.length > 0) {
        console.log('Sample content entry:', JSON.stringify(contentData[0], null, 2));
      }
    }
    
    // Check if countries table exists and has data
    console.log('Checking countries table...');
    const { data: countriesData, error: countriesError } = await supabaseAdmin
      .from('countries')
      .select('*')
      .limit(5);
    
    if (countriesError) {
      console.error('Error fetching countries:', countriesError);
    } else {
      console.log(`Found ${countriesData?.length || 0} countries`);
      if (countriesData && countriesData.length > 0) {
        console.log('Sample country:', JSON.stringify(countriesData[0], null, 2));
      }
    }
    
    // Check if regions table exists and has data
    console.log('Checking regions table...');
    const { data: regionsData, error: regionsError } = await supabaseAdmin
      .from('regions')
      .select('*')
      .limit(5);
    
    if (regionsError) {
      console.error('Error fetching regions:', regionsError);
    } else {
      console.log(`Found ${regionsData?.length || 0} regions`);
      if (regionsData && regionsData.length > 0) {
        console.log('Sample region:', JSON.stringify(regionsData[0], null, 2));
      }
    }
    
    // Check if cities table exists and has data
    console.log('Checking cities table...');
    const { data: citiesData, error: citiesError } = await supabaseAdmin
      .from('cities')
      .select('*')
      .limit(5);
    
    if (citiesError) {
      console.error('Error fetching cities:', citiesError);
    } else {
      console.log(`Found ${citiesData?.length || 0} cities`);
      if (citiesData && citiesData.length > 0) {
        console.log('Sample city:', JSON.stringify(citiesData[0], null, 2));
      }
    }
    
    // Test a specific canonical slug
    console.log('Testing canonical slug lookup...');
    const testSlug = '/foster-agency/england';
    const { data: slugData, error: slugError } = await supabaseAdmin
      .from('location_content')
      .select('*')
      .eq('canonical_slug', testSlug)
      .single();
    
    if (slugError) {
      console.error(`Error fetching content for ${testSlug}:`, slugError);
    } else if (slugData) {
      console.log(`Found content for ${testSlug}:`, JSON.stringify(slugData, null, 2));
    } else {
      console.log(`No content found for ${testSlug}`);
    }
    
  } catch (error) {
    console.error('Error in debugLocationPages:', error);
  }
}

// Run the debug function
debugLocationPages();