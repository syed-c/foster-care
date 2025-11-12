const { supabaseAdmin } = require('./lib/supabase-server');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

async function cleanLocationContent() {
  try {
    console.log('Cleaning up location content...');
    
    // Get all location content
    const { data: contents, error: contentsError } = await supabaseAdmin
      .from('location_content')
      .select('location_id, content_json');
    
    if (contentsError) {
      console.error('Error fetching location content:', contentsError);
      return;
    }
    
    console.log(`Found ${contents.length} location content records to clean`);
    
    // Location-specific fields to remove
    const locationSpecificFields = [
      'id', 'name', 'slug', 'type', 'children', 'editable', 
      'canonical_slug', 'template_type', 'updated_at', 'content_json'
    ];
    
    let updatedCount = 0;
    
    for (const content of contents) {
      if (content.content_json && typeof content.content_json === 'object') {
        // Create a clean content object
        const cleanContent = {};
        Object.keys(content.content_json).forEach(key => {
          if (!locationSpecificFields.includes(key)) {
            cleanContent[key] = content.content_json[key];
          }
        });
        
        // Check if we actually need to update
        if (Object.keys(cleanContent).length !== Object.keys(content.content_json).length) {
          // Update the content
          const { error: updateError } = await supabaseAdmin
            .from('location_content')
            .update({ content_json: cleanContent })
            .eq('location_id', content.location_id);
          
          if (updateError) {
            console.error(`Error updating content for location ${content.location_id}:`, updateError);
          } else {
            console.log(`Updated content for location ${content.location_id}`);
            updatedCount++;
          }
        }
      }
    }
    
    console.log(`Cleaned up ${updatedCount} location content records`);
    process.exit(0);
  } catch (error) {
    console.error('Error cleaning location content:', error);
    process.exit(1);
  }
}

cleanLocationContent();