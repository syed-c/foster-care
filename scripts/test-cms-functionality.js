// Test script to verify CMS functionality
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });
// Create Supabase client with service role key for admin access
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testCMSFunctionality() {
  console.log('Testing CMS functionality...');
  
  try {
    // Test 1: Create a test page
    console.log('\n1. Creating a test page...');
    const { data: testPage, error: pageError } = await supabase
      .from('cms_pages')
      .insert({
        name: 'Test Page',
        slug: 'test-page',
        type: 'general',
        description: 'Test page for CMS functionality verification'
      })
      .select()
      .single();
    
    if (pageError) {
      console.error('❌ Failed to create test page:', pageError.message);
      return;
    }
    
    console.log('✅ Created test page:', testPage.name);
    
    // Test 2: Create a test section
    console.log('\n2. Creating a test section...');
    const { data: testSection, error: sectionError } = await supabase
      .from('cms_page_sections')
      .insert({
        page_id: testPage.id,
        section_key: 'hero',
        section_type: 'hero',
        title: 'Hero Section',
        content: {
          heading: 'Welcome to Our Test Page',
          subheading: 'This is a test section to verify CMS functionality',
          cta_text: 'Learn More',
          cta_link: '/about'
        },
        sort_order: 0
      })
      .select()
      .single();
    
    if (sectionError) {
      console.error('❌ Failed to create test section:', sectionError.message);
      return;
    }
    
    console.log('✅ Created test section:', testSection.title);
    
    // Test 3: Create test fields
    console.log('\n3. Creating test fields...');
    const testFields = [
      {
        section_id: testSection.id,
        field_key: 'heading',
        field_type: 'string',
        field_label: 'Heading',
        field_value: 'Welcome to Our Test Page',
        sort_order: 0
      },
      {
        section_id: testSection.id,
        field_key: 'subheading',
        field_type: 'text',
        field_label: 'Subheading',
        field_value: 'This is a test section to verify CMS functionality',
        sort_order: 1
      },
      {
        section_id: testSection.id,
        field_key: 'cta_text',
        field_type: 'string',
        field_label: 'CTA Text',
        field_value: 'Learn More',
        sort_order: 2
      }
    ];
    
    const { data: fieldsData, error: fieldsError } = await supabase
      .from('cms_section_fields')
      .insert(testFields)
      .select();
    
    if (fieldsError) {
      console.error('❌ Failed to create test fields:', fieldsError.message);
      return;
    }
    
    console.log('✅ Created', fieldsData.length, 'test fields');
    
    // Test 4: Fetch page with sections and fields
    console.log('\n4. Fetching page content...');
    const { data: pageContent, error: fetchError } = await supabase
      .from('cms_pages')
      .select(`
        *,
        cms_page_sections(
          *,
          cms_section_fields(*)
        )
      `)
      .eq('id', testPage.id)
      .single();
    
    if (fetchError) {
      console.error('❌ Failed to fetch page content:', fetchError.message);
      return;
    }
    
    console.log('✅ Fetched page content successfully');
    console.log('   Page:', pageContent.name);
    console.log('   Sections:', pageContent.cms_page_sections.length);
    console.log('   Fields in first section:', pageContent.cms_page_sections[0].cms_section_fields.length);
    
    // Test 5: Update a field
    console.log('\n5. Updating a field...');
    const fieldToUpdate = pageContent.cms_page_sections[0].cms_section_fields[0];
    const { data: updatedField, error: updateError } = await supabase
      .from('cms_section_fields')
      .update({ field_value: 'Updated Welcome Message' })
      .eq('id', fieldToUpdate.id)
      .select()
      .single();
    
    if (updateError) {
      console.error('❌ Failed to update field:', updateError.message);
      return;
    }
    
    console.log('✅ Updated field:', updatedField.field_key, 'to:', updatedField.field_value);
    
    // Test 6: Clean up test data
    console.log('\n6. Cleaning up test data...');
    const { error: cleanupError } = await supabase
      .from('cms_pages')
      .delete()
      .eq('id', testPage.id);
    
    if (cleanupError) {
      console.error('❌ Failed to clean up test data:', cleanupError.message);
      return;
    }
    
    console.log('✅ Cleaned up test data successfully');
    
    console.log('\n🎉 All CMS functionality tests passed!');
    console.log('\n✅ Your CMS is working correctly!');
    
  } catch (error) {
    console.error('Error testing CMS functionality:', error);
    process.exit(1);
  }
}

// Run the test
testCMSFunctionality();