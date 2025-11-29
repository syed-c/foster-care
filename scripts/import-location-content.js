#!/usr/bin/env node

// Script to import location content into the database
const { supabaseAdmin } = require('../lib/supabase-server');
const fs = require('fs');
const path = require('path');

async function importLocationContent() {
  try {
    // Check if Supabase is configured
    if (!supabaseAdmin) {
      console.log('Supabase not configured. Generating SQL import file instead...');
      generateSQLImport();
      return;
    }

    console.log('Starting location content import...');
    
    // Read the mock content file
    const mockContentPath = path.join(__dirname, '..', 'data', 'mock-location-content.json');
    if (!fs.existsSync(mockContentPath)) {
      console.error('Mock content file not found. Run populate-location-content-mock.js first.');
      return;
    }
    
    const contentData = JSON.parse(fs.readFileSync(mockContentPath, 'utf8'));
    console.log(`Found ${contentData.length} location content entries`);
    
    // Import each content entry
    for (const content of contentData) {
      try {
        const { error } = await supabaseAdmin
          .from('location_content')
          .upsert(content, {
            onConflict: 'location_id'
          });
        
        if (error) {
          console.error(`Error importing content for ${content.id}:`, error);
        } else {
          console.log(`Successfully imported content for ${content.id}`);
        }
      } catch (error) {
        console.error(`Exception importing content for ${content.id}:`, error);
      }
    }
    
    console.log('Location content import completed!');
  } catch (error) {
    console.error('Error in importLocationContent:', error);
  }
}

// Generate SQL file for manual import when Supabase is not available
function generateSQLImport() {
  const mockContentPath = path.join(__dirname, '..', 'data', 'mock-location-content.json');
  if (!fs.existsSync(mockContentPath)) {
    console.error('Mock content file not found. Run populate-location-content-mock.js first.');
    return;
  }
  
  const contentData = JSON.parse(fs.readFileSync(mockContentPath, 'utf8'));
  
  let sql = `-- Location Content Import SQL
-- Generated on ${new Date().toISOString()}

`;
  
  for (const content of contentData) {
    sql += `INSERT INTO location_content (
  id,
  location_id,
  country_id,
  region_id,
  city_id,
  template_type,
  canonical_slug,
  content_json,
  hierarchy_path
) VALUES (
  '${content.id}',
  '${content.location_id}',
  ${content.country_id ? `'${content.country_id}'` : 'NULL'},
  ${content.region_id ? `'${content.region_id}'` : 'NULL'},
  ${content.city_id ? `'${content.city_id}'` : 'NULL'},
  '${content.template_type}',
  '${content.canonical_slug}',
  '${JSON.stringify(content.content_json).replace(/'/g, "''")}'::jsonb,
  '${content.hierarchy_path}'
) ON CONFLICT (location_id) DO UPDATE SET
  country_id = EXCLUDED.country_id,
  region_id = EXCLUDED.region_id,
  city_id = EXCLUDED.city_id,
  template_type = EXCLUDED.template_type,
  canonical_slug = EXCLUDED.canonical_slug,
  content_json = EXCLUDED.content_json,
  hierarchy_path = EXCLUDED.hierarchy_path;

`;
  }
  
  const outputPath = path.join(__dirname, '..', 'data', 'import-location-content.sql');
  fs.writeFileSync(outputPath, sql);
  console.log(`SQL import file generated at ${outputPath}`);
}

// Run the script if called directly
if (require.main === module) {
  importLocationContent()
    .then(() => process.exit(0))
    .catch(error => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}

module.exports = { importLocationContent };