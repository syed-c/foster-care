// Script to check if CMS tables exist
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkTables() {
  console.log('Checking if CMS tables exist...');
  
  try {
    // Try to access cms_pages table
    const { data: pages, error: pagesError } = await supabase
      .from('cms_pages')
      .select('count')
      .limit(1);
    
    if (pagesError) {
      console.log('❌ cms_pages table does not exist or is not accessible:', pagesError.message);
    } else {
      console.log('✅ cms_pages table exists and is accessible');
    }
    
    // Try to access cms_page_sections table
    const { data: sections, error: sectionsError } = await supabase
      .from('cms_page_sections')
      .select('count')
      .limit(1);
    
    if (sectionsError) {
      console.log('❌ cms_page_sections table does not exist or is not accessible:', sectionsError.message);
    } else {
      console.log('✅ cms_page_sections table exists and is accessible');
    }
    
    // Try to access cms_section_fields table
    const { data: fields, error: fieldsError } = await supabase
      .from('cms_section_fields')
      .select('count')
      .limit(1);
    
    if (fieldsError) {
      console.log('❌ cms_section_fields table does not exist or is not accessible:', fieldsError.message);
    } else {
      console.log('✅ cms_section_fields table exists and is accessible');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error checking tables:', error);
    process.exit(1);
  }
}

checkTables();