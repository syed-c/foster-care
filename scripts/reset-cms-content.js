// Script to reset CMS content (USE WITH CAUTION)
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function resetCMSContent() {
  console.log('⚠️  WARNING: This will delete ALL CMS content!');
  console.log('Are you sure you want to continue? (Type "YES" to confirm)');
  
  // Simple confirmation mechanism
  const readline = require('readline');
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  rl.question('Confirm: ', async (answer) => {
    if (answer !== 'YES') {
      console.log('Operation cancelled.');
      rl.close();
      process.exit(0);
    }
    
    try {
      console.log('Deleting all CMS content...');
      
      // Delete all fields first (due to foreign key constraints)
      const { error: fieldsError } = await supabase
        .from('cms_section_fields')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all records
      
      if (fieldsError) {
        console.error('Error deleting fields:', fieldsError.message);
      } else {
        console.log('✅ Deleted all fields');
      }
      
      // Delete all sections
      const { error: sectionsError } = await supabase
        .from('cms_page_sections')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
      
      if (sectionsError) {
        console.error('Error deleting sections:', sectionsError.message);
      } else {
        console.log('✅ Deleted all sections');
      }
      
      // Delete all pages
      const { error: pagesError } = await supabase
        .from('cms_pages')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000');
      
      if (pagesError) {
        console.error('Error deleting pages:', pagesError.message);
      } else {
        console.log('✅ Deleted all pages');
      }
      
      console.log('✅ CMS content reset completed!');
      rl.close();
      process.exit(0);
    } catch (error) {
      console.error('Error resetting CMS content:', error);
      rl.close();
      process.exit(1);
    }
  });
}

// If running directly
if (require.main === module) {
  resetCMSContent();
}

module.exports = { resetCMSContent };