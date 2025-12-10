// Simple test script to verify country system setup
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Create Supabase client with service role key for admin access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testSetup() {
  console.log('Testing country system setup...');
  
  try {
    // Test 1: Check if countries table exists
    const { data: countries, error: countriesError } = await supabase
      .from('countries')
      .select('id, slug, title')
      .limit(5);
      
    if (countriesError) {
      console.error('❌ Error fetching countries:', countriesError.message);
      return;
    }
    
    console.log(`✅ Countries table accessible. Found ${countries.length} countries.`);
    
    if (countries.length > 0) {
      console.log('✅ Sample countries:', countries.map(c => `${c.title} (${c.slug})`));
    }
    
    // Test 2: Check if regions table exists
    const { data: regions, error: regionsError } = await supabase
      .from('regions')
      .select('id, slug, title')
      .limit(5);
      
    if (regionsError) {
      console.error('❌ Error fetching regions:', regionsError.message);
      return;
    }
    
    console.log(`✅ Regions table accessible. Found ${regions.length} regions.`);
    
    if (regions.length > 0) {
      console.log('✅ Sample regions:', regions.map(r => `${r.title} (${r.slug})`));
    }
    
    // Test 3: Check if counties table exists
    const { data: counties, error: countiesError } = await supabase
      .from('counties')
      .select('id, slug, title')
      .limit(5);
      
    if (countiesError) {
      console.error('❌ Error fetching counties:', countiesError.message);
      return;
    }
    
    console.log(`✅ Counties table accessible. Found ${counties.length} counties.`);
    
    if (counties.length > 0) {
      console.log('✅ Sample counties:', counties.map(c => `${c.title} (${c.slug})`));
    }
    
    // Test 4: Check if country_page_blocks table exists
    const { data: blocks, error: blocksError } = await supabase
      .from('country_page_blocks')
      .select('id, type')
      .limit(5);
      
    if (blocksError) {
      console.error('❌ Error fetching country page blocks:', blocksError.message);
      return;
    }
    
    console.log(`✅ Country page blocks table accessible. Found ${blocks.length} blocks.`);
    
    if (blocks.length > 0) {
      console.log('✅ Sample block types:', blocks.map(b => b.type));
    }
    
    // Test 5: Check if England specifically exists
    const { data: england, error: englandError } = await supabase
      .from('countries')
      .select('id, title')
      .eq('slug', 'england')
      .single();
      
    if (englandError) {
      console.log('⚠️  England country record not found (this is OK if you haven\'t seeded data yet)');
    } else {
      console.log(`✅ England country record found: ${england.title}`);
      
      // Test 6: Check if England has regions
      const { data: englandRegions, error: englandRegionsError } = await supabase
        .from('regions')
        .select('title')
        .eq('country_id', england.id)
        .limit(3);
        
      if (englandRegionsError) {
        console.log('⚠️  Error fetching England regions:', englandRegionsError.message);
      } else if (englandRegions.length > 0) {
        console.log(`✅ England has ${englandRegions.length} regions:`, englandRegions.map(r => r.title));
      } else {
        console.log('⚠️  England has no regions yet (this is OK if you haven\'t seeded data yet)');
      }
    }
    
    console.log('\n🎉 All tests completed! The country system tables are properly set up.');
    console.log('\nNext steps:');
    console.log('1. If you haven\'t already, run the seed script: node scripts/seed-country-data.js');
    console.log('2. Visit /foster-agency/england to see the country page');
    console.log('3. Visit /cms to access the CMS dashboard');
    
  } catch (error) {
    console.error('❌ Test failed with unexpected error:', error.message);
    console.error('Full error:', error);
  }
}

testSetup();