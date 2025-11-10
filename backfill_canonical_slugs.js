const { supabaseAdmin } = require('./lib/supabase-server');
const { buildCanonicalSlug } = require('./services/locationService');

async function backfillCanonicalSlugs() {
  try {
    console.log('Starting canonical slug backfill...');
    
    // Backfill countries
    console.log('Backfilling countries...');
    const { data: countries, error: countriesError } = await supabaseAdmin
      .from('countries')
      .select('id');
    
    if (countriesError) {
      console.error('Error fetching countries:', countriesError);
      process.exit(1);
    }
    
    for (const country of countries) {
      try {
        const canonicalSlug = await buildCanonicalSlug(country.id, 'country');
        const { error } = await supabaseAdmin
          .from('countries')
          .update({ canonical_slug: canonicalSlug })
          .eq('id', country.id);
        
        if (error) {
          console.error(`Error updating country ${country.id}:`, error);
        } else {
          console.log(`Updated country ${country.id} with canonical slug: ${canonicalSlug}`);
        }
      } catch (error) {
        console.error(`Error building canonical slug for country ${country.id}:`, error);
      }
    }
    
    // Backfill regions
    console.log('Backfilling regions...');
    const { data: regions, error: regionsError } = await supabaseAdmin
      .from('regions')
      .select('id');
    
    if (regionsError) {
      console.error('Error fetching regions:', regionsError);
      process.exit(1);
    }
    
    for (const region of regions) {
      try {
        const canonicalSlug = await buildCanonicalSlug(region.id, 'region');
        const { error } = await supabaseAdmin
          .from('regions')
          .update({ canonical_slug: canonicalSlug })
          .eq('id', region.id);
        
        if (error) {
          console.error(`Error updating region ${region.id}:`, error);
        } else {
          console.log(`Updated region ${region.id} with canonical slug: ${canonicalSlug}`);
        }
      } catch (error) {
        console.error(`Error building canonical slug for region ${region.id}:`, error);
      }
    }
    
    // Backfill cities
    console.log('Backfilling cities...');
    const { data: cities, error: citiesError } = await supabaseAdmin
      .from('cities')
      .select('id');
    
    if (citiesError) {
      console.error('Error fetching cities:', citiesError);
      process.exit(1);
    }
    
    for (const city of cities) {
      try {
        const canonicalSlug = await buildCanonicalSlug(city.id, 'city');
        const { error } = await supabaseAdmin
          .from('cities')
          .update({ canonical_slug: canonicalSlug })
          .eq('id', city.id);
        
        if (error) {
          console.error(`Error updating city ${city.id}:`, error);
        } else {
          console.log(`Updated city ${city.id} with canonical slug: ${canonicalSlug}`);
        }
      } catch (error) {
        console.error(`Error building canonical slug for city ${city.id}:`, error);
      }
    }
    
    console.log('Canonical slug backfill completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error during backfill:', error);
    process.exit(1);
  }
}

backfillCanonicalSlugs();