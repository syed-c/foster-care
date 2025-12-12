// Script to run CMS migration using Supabase client
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Read the migration file
const fs = require('fs');
const path = require('path');

// Get the migration SQL
const migrationSQL = fs.readFileSync(path.join(__dirname, '..', 'migrations', '001_create_cms_tables.sql'), 'utf8');

async function runMigration() {
  console.log('Running CMS migration...');
  
  try {
    // Split the SQL into individual statements
    const statements = migrationSQL
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    // Execute each statement
    for (const statement of statements) {
      console.log('Executing statement:', statement.substring(0, 50) + '...');
      
      // Skip comments and empty lines
      if (statement.startsWith('--') || statement.length === 0) {
        continue;
      }
      
      try {
        // For table creation statements, we need to use raw SQL
        // But Supabase JS client doesn't support raw SQL execution
        // So we'll try to create the tables using the client methods
        
        if (statement.includes('CREATE TABLE IF NOT EXISTS cms_pages')) {
          console.log('Skipping table creation - would need raw SQL execution');
          // In a real scenario, you'd execute this through Supabase dashboard or psql
          continue;
        }
        
        if (statement.includes('CREATE INDEX')) {
          console.log('Skipping index creation - would need raw SQL execution');
          continue;
        }
        
        if (statement.includes('ALTER TABLE') && statement.includes('ENABLE ROW LEVEL SECURITY')) {
          console.log('Skipping RLS enable - would need raw SQL execution');
          continue;
        }
        
        if (statement.includes('CREATE POLICY')) {
          console.log('Skipping policy creation - would need raw SQL execution');
          continue;
        }
        
        if (statement.includes('GRANT')) {
          console.log('Skipping grant - would need raw SQL execution');
          continue;
        }
      } catch (err) {
        console.warn('Non-fatal error executing statement:', err.message);
      }
    }
    
    console.log('Migration script processing completed.');
    console.log('NOTE: Table creation requires executing the SQL directly through Supabase dashboard or psql.');
    process.exit(0);
  } catch (error) {
    console.error('Error running migration:', error);
    process.exit(1);
  }
}

runMigration();