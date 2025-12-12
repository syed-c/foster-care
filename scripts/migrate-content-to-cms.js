// Script to migrate existing content to the new CMS system
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function migrateContentToCMS() {
  console.log('Migrating existing content to CMS...');
  
  try {
    // First, let's get all existing location content
    const { data: locationContents, error: contentError } = await supabase
      .from('location_content')
      .select('*');
    
    if (contentError) {
      console.error('Error fetching location content:', contentError.message);
      process.exit(1);
    }
    
    console.log(`Found ${locationContents.length} location content entries to migrate.`);
    
    // For each location content, we'll create corresponding CMS entries
    for (const content of locationContents) {
      try {
        // Get the location details
        const { data: location, error: locationError } = await supabase
          .from('locations')
          .select('*')
          .eq('id', content.location_id)
          .single();
        
        if (locationError) {
          console.warn(`Could not find location for content ${content.id}:`, locationError.message);
          continue;
        }
        
        // Create a CMS page entry
        const pageName = location.name;
        const pageSlug = location.canonical_slug.replace('/foster-agency/', '');
        const pageType = location.type;
        
        const { data: cmsPage, error: pageError } = await supabase
          .from('cms_pages')
          .upsert({
            name: pageName,
            slug: pageSlug,
            type: pageType,
            description: `CMS page for ${pageName}`
          }, { onConflict: 'slug' })
          .select()
          .single();
        
        if (pageError) {
          console.error(`Error creating CMS page for ${pageName}:`, pageError.message);
          continue;
        }
        
        console.log(`Created/updated CMS page: ${pageName}`);
        
        // Process sections
        if (content.content_json && content.content_json.sections) {
          for (const [index, section] of content.content_json.sections.entries()) {
            // Create CMS section
            const { data: cmsSection, error: sectionError } = await supabase
              .from('cms_page_sections')
              .upsert({
                page_id: cmsPage.id,
                section_key: section.type || `section_${index}`,
                section_type: section.type || 'unknown',
                title: section.data?.title || section.type,
                content: section.data,
                sort_order: index
              }, { onConflict: 'page_id,section_key' })
              .select()
              .single();
            
            if (sectionError) {
              console.error(`Error creating section for ${pageName}:`, sectionError.message);
              continue;
            }
            
            console.log(`  Created section: ${section.type}`);
            
            // Create fields for this section
            if (section.data) {
              let fieldIndex = 0;
              for (const [fieldKey, fieldValue] of Object.entries(section.data)) {
                // Skip complex objects for now, handle them separately
                if (typeof fieldValue === 'object' && fieldValue !== null) {
                  continue;
                }
                
                const { error: fieldError } = await supabase
                  .from('cms_section_fields')
                  .upsert({
                    section_id: cmsSection.id,
                    field_key: fieldKey,
                    field_type: typeof fieldValue,
                    field_label: fieldKey.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                    field_value: String(fieldValue),
                    sort_order: fieldIndex++
                  }, { onConflict: 'section_id,field_key' });
                
                if (fieldError) {
                  console.error(`Error creating field ${fieldKey}:`, fieldError.message);
                } else {
                  console.log(`    Created field: ${fieldKey}`);
                }
              }
            }
          }
        }
      } catch (err) {
        console.error(`Error processing content ${content.id}:`, err.message);
      }
    }
    
    console.log('Content migration completed.');
    process.exit(0);
  } catch (error) {
    console.error('Error during migration:', error);
    process.exit(1);
  }
}

migrateContentToCMS().catch(console.error);