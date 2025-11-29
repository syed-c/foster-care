#!/usr/bin/env node

// Script to update canonical slugs for all locations
const { supabaseAdmin } = require('../lib/supabase-server');

async function updateCanonicalSlugs() {
  try {
    console.log('Starting canonical slug update...');
    
    // Get all cities with their regions and countries
    const { data: cities, error: citiesError } = await supabaseAdmin
      .from('cities')
      .select(`
        id,
        slug,
        regions (
          id,
          slug,
          countries (
            id,
            slug
          )
        )
      `);
    
    if (citiesError) {
      console.error('Error fetching cities:', citiesError);
      return;
    }
    
    console.log(`Found ${cities.length} cities`);
    
    // Update canonical slugs for cities
    for (const city of cities) {
      if (city.regions && city.regions.countries) {
        const canonicalSlug = `/foster-agency/${city.regions.countries.slug}/${city.regions.slug}/${city.slug}`;
        
        const { error: updateError } = await supabaseAdmin
          .from('cities')
          .update({ canonical_slug: canonicalSlug })
          .eq('id', city.id);
        
        if (updateError) {
          console.error(`Error updating canonical slug for city ${city.slug}:`, updateError);
        } else {
          console.log(`Updated canonical slug for city ${city.slug}: ${canonicalSlug}`);
        }
      }
    }
    
    // Get all regions with their countries
    const { data: regions, error: regionsError } = await supabaseAdmin
      .from('regions')
      .select(`
        id,
        slug,
        countries (
          id,
          slug
        )
      `);
    
    if (regionsError) {
      console.error('Error fetching regions:', regionsError);
      return;
    }
    
    console.log(`Found ${regions.length} regions`);
    
    // Update canonical slugs for regions
    for (const region of regions) {
      if (region.countries) {
        const canonicalSlug = `/foster-agency/${region.countries.slug}/${region.slug}`;
        
        const { error: updateError } = await supabaseAdmin
          .from('regions')
          .update({ canonical_slug: canonicalSlug })
          .eq('id', region.id);
        
        if (updateError) {
          console.error(`Error updating canonical slug for region ${region.slug}:`, updateError);
        } else {
          console.log(`Updated canonical slug for region ${region.slug}: ${canonicalSlug}`);
        }
      }
    }
    
    // Get all countries
    const { data: countries, error: countriesError } = await supabaseAdmin
      .from('countries')
      .select('id, slug');
    
    if (countriesError) {
      console.error('Error fetching countries:', countriesError);
      return;
    }
    
    console.log(`Found ${countries.length} countries`);
    
    // Update canonical slugs for countries
    for (const country of countries) {
      const canonicalSlug = `/foster-agency/${country.slug}`;
      
      const { error: updateError } = await supabaseAdmin
        .from('countries')
        .update({ canonical_slug: canonicalSlug })
        .eq('id', country.id);
      
      if (updateError) {
        console.error(`Error updating canonical slug for country ${country.slug}:`, updateError);
      } else {
        console.log(`Updated canonical slug for country ${country.slug}: ${canonicalSlug}`);
      }
    }
    
    console.log('Canonical slug update completed!');
  } catch (error) {
    console.error('Error in updateCanonicalSlugs:', error);
  }
}

// Run the script if called directly
if (require.main === module) {
  updateCanonicalSlugs()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { updateCanonicalSlugs };