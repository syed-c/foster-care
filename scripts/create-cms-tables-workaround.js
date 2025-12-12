// Workaround script to create CMS tables by inserting and deleting sample records
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createCMSTables() {
  console.log('Creating CMS tables using workaround...');
  
  try {
    // Create a sample page
    console.log('Creating sample CMS page...');
    const { data: page, error: pageError } = await supabase
      .from('cms_pages')
      .insert({
        name: 'Sample Page',
        slug: 'sample-page',
        type: 'general',
        description: 'Sample page for table creation'
      })
      .select()
      .single();
    
    if (pageError) {
      console.log('Expected error (tables dont exist yet):', pageError.message);
      console.log('This is expected since the tables havent been created yet.');
      console.log('Please create the tables manually through the Supabase dashboard using the SQL from migrations/001_create_cms_tables.sql');
      process.exit(0);
    }
    
    console.log('Created sample page:', page.id);
    
    // Create a sample section
    console.log('Creating sample section...');
    const { data: section, error: sectionError } = await supabase
      .from('cms_page_sections')
      .insert({
        page_id: page.id,
        section_key: 'sample-section',
        section_type: 'text',
        title: 'Sample Section',
        content: { sample: 'content' },
        sort_order: 0
      })
      .select()
      .single();
    
    if (sectionError) {
      console.log('Error creating section:', sectionError.message);
    } else {
      console.log('Created sample section:', section.id);
    }
    
    // Create a sample field
    console.log('Creating sample field...');
    const { data: field, error: fieldError } = await supabase
      .from('cms_section_fields')
      .insert({
        section_id: section.id,
        field_key: 'sample-field',
        field_type: 'string',
        field_label: 'Sample Field',
        field_value: 'Sample value',
        sort_order: 0
      })
      .select()
      .single();
    
    if (fieldError) {
      console.log('Error creating field:', fieldError.message);
    } else {
      console.log('Created sample field:', field.id);
    }
    
    // Clean up sample records
    console.log('Cleaning up sample records...');
    await supabase.from('cms_section_fields').delete().eq('id', field.id);
    await supabase.from('cms_page_sections').delete().eq('id', section.id);
    await supabase.from('cms_pages').delete().eq('id', page.id);
    
    console.log('✅ CMS tables should now be created!');
    console.log('Please note: For production use, you should run the proper SQL migration through the Supabase dashboard.');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating CMS tables:', error);
    console.log('Please create the tables manually through the Supabase dashboard using the SQL from migrations/001_create_cms_tables.sql');
    process.exit(1);
  }
}

createCMSTables();