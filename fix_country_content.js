const { supabaseAdmin } = require('./lib/supabase-server');
const { getDefaultContent } = require('./lib/locationSchemas');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

async function fixCountryContent() {
  try {
    console.log('Fixing country content to include all schema sections...');
    
    // Get all countries
    const { data: countries, error: countriesError } = await supabaseAdmin
      .from('countries')
      .select('id, name, slug, canonical_slug');
    
    if (countriesError) {
      console.error('Error fetching countries:', countriesError);
      return;
    }
    
    console.log(`Found ${countries.length} countries to fix`);
    
    let fixedCount = 0;
    
    for (const country of countries) {
      console.log(`\nProcessing country: ${country.name} (${country.slug})`);
      
      // Get existing content for this country
      const { data: existingContent, error: contentError } = await supabaseAdmin
        .from('location_content')
        .select('content_json, canonical_slug')
        .eq('location_id', country.id)
        .maybeSingle();
      
      if (contentError) {
        console.error(`Error fetching content for ${country.name}:`, contentError);
        continue;
      }
      
      // Generate default content for this country
      const countryLocation = {
        id: country.id,
        name: country.name,
        slug: country.slug,
        type: 'country',
        canonical_slug: country.canonical_slug
      };
      
      const defaultContent = getDefaultContent(countryLocation);
      
      // Merge existing content with default content
      // Keep existing content where it exists, add missing sections from default
      const mergedContent = { ...defaultContent };
      
      if (existingContent && existingContent.content_json) {
        // Merge existing content with default content
        Object.keys(existingContent.content_json).forEach(key => {
          if (existingContent.content_json[key] !== null && existingContent.content_json[key] !== undefined) {
            mergedContent[key] = existingContent.content_json[key];
          }
        });
      }
      
      // Update the content in the database
      const { error: updateError } = await supabaseAdmin
        .from('location_content')
        .update({ 
          content_json: mergedContent,
          canonical_slug: country.canonical_slug
        })
        .eq('location_id', country.id);
      
      if (updateError) {
        console.error(`Error updating content for ${country.name}:`, updateError);
      } else {
        console.log(`Successfully updated content for ${country.name}`);
        fixedCount++;
      }
    }
    
    console.log(`\nFixed content for ${fixedCount} countries`);
    process.exit(0);
  } catch (error) {
    console.error('Error fixing country content:', error);
    process.exit(1);
  }
}

fixCountryContent();