// Script to seed initial country system data
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Create Supabase client with service role key for admin access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function seedData() {
  console.log('Seeding country system data...');
  
  try {
    // Insert England country
    const { data: england, error: countryError } = await supabase
      .from('countries')
      .insert({
        slug: 'england',
        title: 'England',
        description: 'Foster care services in England',
        intro_html: '<p>Find accredited foster agencies in England offering specialized care for children and young people.</p>',
        meta_title: 'Foster Care Services in England | Accredited Agencies',
        meta_description: 'Discover accredited foster care agencies in England providing specialized care for children and families.',
        order: 1
      })
      .select()
      .single();
      
    if (countryError) {
      console.error('❌ Error inserting country:', countryError.message);
      return;
    }
    
    console.log(`✅ Inserted country: ${england.title}`);
    
    // Insert regions for England
    const regions = [
      { slug: 'north-west', title: 'North West', country_id: england.id, order: 1 },
      { slug: 'north-east', title: 'North East', country_id: england.id, order: 2 },
      { slug: 'yorkshire', title: 'Yorkshire and the Humber', country_id: england.id, order: 3 },
      { slug: 'west-midlands', title: 'West Midlands', country_id: england.id, order: 4 },
      { slug: 'east-midlands', title: 'East Midlands', country_id: england.id, order: 5 },
      { slug: 'south-west', title: 'South West', country_id: england.id, order: 6 },
      { slug: 'south-east', title: 'South East', country_id: england.id, order: 7 },
      { slug: 'london', title: 'London', country_id: england.id, order: 8 },
      { slug: 'east-of-england', title: 'East of England', country_id: england.id, order: 9 }
    ];
    
    const { data: insertedRegions, error: regionsError } = await supabase
      .from('regions')
      .insert(regions)
      .select();
      
    if (regionsError) {
      console.error('❌ Error inserting regions:', regionsError.message);
      return;
    }
    
    console.log(`✅ Inserted ${insertedRegions.length} regions`);
    
    // Insert sample counties for each region
    const counties = [];
    insertedRegions.forEach((region, index) => {
      counties.push(
        { 
          slug: `${region.slug}-county-${index + 1}`, 
          title: `${region.title} County ${index + 1}`, 
          country_id: england.id, 
          region_id: region.id,
          order: 1 
        },
        { 
          slug: `${region.slug}-county-${index + 2}`, 
          title: `${region.title} County ${index + 2}`, 
          country_id: england.id, 
          region_id: region.id,
          order: 2 
        }
      );
    });
    
    const { data: insertedCounties, error: countiesError } = await supabase
      .from('counties')
      .insert(counties)
      .select();
      
    if (countiesError) {
      console.error('❌ Error inserting counties:', countiesError.message);
      return;
    }
    
    console.log(`✅ Inserted ${insertedCounties.length} counties`);
    
    // Insert sample CMS blocks for the country page
    const blocks = [
      {
        type: 'hero',
        country_id: england.id,
        content: JSON.stringify({
          title: 'Foster Care Services in England',
          subtitle: 'Accredited agencies providing specialized care',
          image: '/images/england-hero.jpg'
        }),
        order: 1
      },
      {
        type: 'intro',
        country_id: england.id,
        content: JSON.stringify({
          html: '<p>England offers a comprehensive network of foster care services designed to provide safe, nurturing environments for children and young people in need of temporary or permanent care.</p>'
        }),
        order: 2
      },
      {
        type: 'stats',
        country_id: england.id,
        content: JSON.stringify({
          stats: [
            { value: '12,500+', label: 'Children in Care' },
            { value: '85%', label: 'Placement Success Rate' },
            { value: '450+', label: 'Approved Agencies' }
          ]
        }),
        order: 3
      }
    ];
    
    const { data: insertedBlocks, error: blocksError } = await supabase
      .from('country_page_blocks')
      .insert(blocks)
      .select();
      
    if (blocksError) {
      console.error('❌ Error inserting CMS blocks:', blocksError.message);
      return;
    }
    
    console.log(`✅ Inserted ${insertedBlocks.length} CMS blocks`);
    
    console.log('\n🎉 Country system data seeding completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Test the setup: node scripts/test-country-setup.js');
    console.log('2. Visit /foster-agency/england to see the country page');
    console.log('3. Visit /cms to access the CMS dashboard');
    
  } catch (error) {
    console.error('❌ Seeding failed with unexpected error:', error.message);
    console.error('Full error:', error);
  }
}

seedData();
