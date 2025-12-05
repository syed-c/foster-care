// scripts/fix_location_content.js
// One-time migration script to fix stringified JSON and add canonical slugs

const { supabaseAdmin } = require('../lib/supabase-server');

// Utility function to slugify text
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Function to build canonical slug by traversing parent chain
async function buildCanonicalSlug(locationId, locationType) {
  try {
    const parts = [];
    let currentId = locationId;
    let currentType = locationType;
    
    // Traverse up the hierarchy
    while (currentId) {
      let node;
      
      if (currentType === 'city') {
        const { data, error } = await supabaseAdmin
          .from('locations')
          .select('id, name, slug, parent_id')
          .eq('id', currentId)
          .single();
        
        if (error || !data) break;
        node = data;
        currentId = node.parent_id;
        currentType = 'region';
      } else if (currentType === 'region') {
        const { data, error } = await supabaseAdmin
          .from('locations')
          .select('id, name, slug, parent_id')
          .eq('id', currentId)
          .single();
        
        if (error || !data) break;
        node = data;
        currentId = node.parent_id;
        currentType = 'country';
      } else if (currentType === 'country') {
        const { data, error } = await supabaseAdmin
          .from('locations')
          .select('id, name, slug')
          .eq('id', currentId)
          .single();
        
        if (error || !data) break;
        node = data;
        currentId = null; // End of chain
      } else {
        break;
      }
      
      // Use slug or generate from name if not available
      const slug = (node.slug && node.slug.trim() !== '') 
        ? node.slug 
        : slugify(node.name);
      
      parts.unshift(slug);
    }
    
    return '/foster-agency/' + parts.join('/');
  } catch (error) {
    console.error('Error building canonical slug:', error);
    return null;
  }
}

async function fixStringifiedJSON() {
  try {
    console.log('Fixing stringified JSON...');
    
    // Convert stringified JSON to proper JSONB
    const { data, error } = await supabaseAdmin
      .from('location_content')
      .select('id, content_json')
      .limit(1000); // Process in batches if needed
      
    if (error) {
      console.error('Error fetching location_content:', error);
      return;
    }
    
    let fixedCount = 0;
    for (const row of data) {
      // Check if content_json is stringified JSON
      if (typeof row.content_json === 'string') {
        try {
          const parsed = JSON.parse(row.content_json);
          const { error: updateError } = await supabaseAdmin
            .from('location_content')
            .update({ content_json: parsed })
            .eq('id', row.id);
            
          if (updateError) {
            console.error(`Error updating row ${row.id}:`, updateError);
          } else {
            fixedCount++;
            console.log(`Fixed stringified JSON for location_content ID: ${row.id}`);
          }
        } catch (parseError) {
          console.error(`Error parsing JSON for row ${row.id}:`, parseError);
        }
      }
    }
    
    console.log(`Fixed ${fixedCount} stringified JSON rows`);
  } catch (error) {
    console.error('Error in fixStringifiedJSON:', error);
  }
}

async function addCanonicalSlugs() {
  try {
    console.log('Adding canonical slugs...');
    
    // Get all locations without canonical_slug
    const { data: locations, error } = await supabaseAdmin
      .from('locations')
      .select('id, name, slug, type, parent_id')
      .is('canonical_slug', null)
      .limit(1000);
      
    if (error) {
      console.error('Error fetching locations:', error);
      return;
    }
    
    let updatedCount = 0;
    for (const location of locations) {
      try {
        const canonicalSlug = await buildCanonicalSlug(location.id, location.type);
        if (canonicalSlug) {
          const { error: updateError } = await supabaseAdmin
            .from('locations')
            .update({ canonical_slug: canonicalSlug })
            .eq('id', location.id);
            
          if (updateError) {
            console.error(`Error updating canonical_slug for location ${location.id}:`, updateError);
          } else {
            updatedCount++;
            console.log(`Updated canonical_slug for location ID: ${location.id} to ${canonicalSlug}`);
          }
        }
      } catch (error) {
        console.error(`Error processing location ${location.id}:`, error);
      }
    }
    
    console.log(`Updated canonical_slug for ${updatedCount} locations`);
  } catch (error) {
    console.error('Error in addCanonicalSlugs:', error);
  }
}

async function runMigration() {
  console.log('Starting location content migration...');
  
  await fixStringifiedJSON();
  await addCanonicalSlugs();
  
  console.log('Migration complete!');
}

// Run if called directly
if (require.main === module) {
  runMigration().then(() => {
    process.exit(0);
  }).catch((error) => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
}

module.exports = {
  fixStringifiedJSON,
  addCanonicalSlugs,
  runMigration
};