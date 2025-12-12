// This script creates the necessary database tables for the CMS system
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createCMSSchema() {
  console.log('Creating CMS database schema...');
  
  try {
    // Create cms_pages table for general pages
    const { error: pagesError } = await supabase.rpc('create_cms_pages_table');
    
    if (pagesError) {
      console.log('cms_pages table may already exist or RPC not available, creating manually...');
      
      // Manual table creation query
      const pagesTableQuery = `
        CREATE TABLE IF NOT EXISTS cms_pages (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          slug VARCHAR(255) UNIQUE NOT NULL,
          type VARCHAR(50) NOT NULL,
          description TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `;
      
      // We'll need to run this through Supabase SQL editor, so let's just log it
      console.log('Run this SQL to create cms_pages table:');
      console.log(pagesTableQuery);
    } else {
      console.log('cms_pages table created successfully');
    }
    
    // Create cms_page_sections table for page sections
    const sectionsTableQuery = `
      CREATE TABLE IF NOT EXISTS cms_page_sections (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        page_id UUID REFERENCES cms_pages(id) ON DELETE CASCADE,
        section_key VARCHAR(100) NOT NULL,
        section_type VARCHAR(100) NOT NULL,
        title VARCHAR(255),
        content JSONB,
        sort_order INTEGER DEFAULT 0,
        is_active BOOLEAN DEFAULT true,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    
    console.log('\nRun this SQL to create cms_page_sections table:');
    console.log(sectionsTableQuery);
    
    // Create cms_section_fields table for individual text elements within sections
    const fieldsTableQuery = `
      CREATE TABLE IF NOT EXISTS cms_section_fields (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        section_id UUID REFERENCES cms_page_sections(id) ON DELETE CASCADE,
        field_key VARCHAR(100) NOT NULL,
        field_type VARCHAR(50) NOT NULL,
        field_label VARCHAR(255) NOT NULL,
        field_value TEXT,
        sort_order INTEGER DEFAULT 0,
        is_required BOOLEAN DEFAULT false,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `;
    
    console.log('\nRun this SQL to create cms_section_fields table:');
    console.log(fieldsTableQuery);
    
    // Create indexes for better performance
    const indexesQuery = `
      CREATE INDEX IF NOT EXISTS idx_cms_pages_slug ON cms_pages(slug);
      CREATE INDEX IF NOT EXISTS idx_cms_pages_type ON cms_pages(type);
      CREATE INDEX IF NOT EXISTS idx_cms_page_sections_page_id ON cms_page_sections(page_id);
      CREATE INDEX IF NOT EXISTS idx_cms_page_sections_section_key ON cms_page_sections(section_key);
      CREATE INDEX IF NOT EXISTS idx_cms_section_fields_section_id ON cms_section_fields(section_id);
      CREATE INDEX IF NOT EXISTS idx_cms_section_fields_field_key ON cms_section_fields(field_key);
    `;
    
    console.log('\nRun this SQL to create indexes:');
    console.log(indexesQuery);
    
    console.log('\nCMS schema creation instructions completed.');
    console.log('Please run the above SQL queries in your Supabase SQL editor.');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating CMS schema:', error);
    process.exit(1);
  }
}

createCMSSchema().catch(console.error);