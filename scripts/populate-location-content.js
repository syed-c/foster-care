#!/usr/bin/env node

// Script to populate location_content table with default CMS content
const { supabaseAdmin } = require('../lib/supabase-server');
const { getDefaultContent } = require('../lib/locationSchemas');

async function populateLocationContent() {
  try {
    console.log('Starting location content population...');
    
    // Get all countries
    const { data: countries, error: countriesError } = await supabaseAdmin
      .from('countries')
      .select('*')
      .order('name');
    
    if (countriesError) {
      console.error('Error fetching countries:', countriesError);
      return;
    }
    
    console.log(`Found ${countries.length} countries`);
    
    // Process each country
    for (const country of countries) {
      console.log(`Processing country: ${country.name}`);
      
      // Create or update country content
      const countryContent = getDefaultContent({
        ...country,
        type: 'country'
      });
      
      const { error: countryContentError } = await supabaseAdmin
        .from('location_content')
        .upsert({
          location_id: country.id,
          country_id: country.id,
          template_type: 'country',
          canonical_slug: country.canonical_slug || `/foster-agency/${country.slug}`,
          content_json: countryContent,
          hierarchy_path: `/${country.id}`
        }, {
          onConflict: 'location_id'
        });
      
      if (countryContentError) {
        console.error(`Error creating content for country ${country.name}:`, countryContentError);
      } else {
        console.log(`Created/updated content for country: ${country.name}`);
      }
      
      // Get all regions for this country
      const { data: regions, error: regionsError } = await supabaseAdmin
        .from('regions')
        .select('*')
        .eq('country_id', country.id)
        .order('name');
      
      if (regionsError) {
        console.error(`Error fetching regions for country ${country.name}:`, regionsError);
        continue;
      }
      
      console.log(`Found ${regions.length} regions in ${country.name}`);
      
      // Process each region
      for (const region of regions) {
        console.log(`Processing region: ${region.name}`);
        
        // Create or update region content
        const regionContent = getDefaultContent({
          ...region,
          type: 'region',
          country: country.name,
          countrySlug: country.slug
        });
        
        const { error: regionContentError } = await supabaseAdmin
          .from('location_content')
          .upsert({
            location_id: region.id,
            country_id: country.id,
            region_id: region.id,
            template_type: 'region',
            canonical_slug: region.canonical_slug || `/foster-agency/${country.slug}/${region.slug}`,
            content_json: regionContent,
            hierarchy_path: `/${country.id}/${region.id}`
          }, {
            onConflict: 'location_id'
          });
        
        if (regionContentError) {
          console.error(`Error creating content for region ${region.name}:`, regionContentError);
        } else {
          console.log(`Created/updated content for region: ${region.name}`);
        }
        
        // Get all cities for this region
        const { data: cities, error: citiesError } = await supabaseAdmin
          .from('cities')
          .select('*')
          .eq('region_id', region.id)
          .order('name');
        
        if (citiesError) {
          console.error(`Error fetching cities for region ${region.name}:`, citiesError);
          continue;
        }
        
        console.log(`Found ${cities.length} cities in ${region.name}`);
        
        // Process each city
        for (const city of cities) {
          console.log(`Processing city: ${city.name}`);
          
          // Create or update city content
          const cityContent = getDefaultContent({
            ...city,
            type: 'city',
            country: country.name,
            countrySlug: country.slug,
            region: region.name,
            regionSlug: region.slug
          });
          
          const { error: cityContentError } = await supabaseAdmin
            .from('location_content')
            .upsert({
              location_id: city.id,
              country_id: country.id,
              region_id: region.id,
              city_id: city.id,
              template_type: 'city',
              canonical_slug: city.canonical_slug || `/foster-agency/${country.slug}/${region.slug}/${city.slug}`,
              content_json: cityContent,
              hierarchy_path: `/${country.id}/${region.id}/${city.id}`
            }, {
              onConflict: 'location_id'
            });
          
          if (cityContentError) {
            console.error(`Error creating content for city ${city.name}:`, cityContentError);
          } else {
            console.log(`Created/updated content for city: ${city.name}`);
          }
        }
      }
    }
    
    console.log('Location content population completed!');
  } catch (error) {
    console.error('Error in populateLocationContent:', error);
  }
}

// Run the script if called directly
if (require.main === module) {
  populateLocationContent()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { populateLocationContent };