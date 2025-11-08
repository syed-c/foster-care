const { supabaseAdmin } = require('../lib/supabase-server');

async function runMigration() {
  try {
    console.log('Running migration to add canonical_slug columns...');
    
    // Since we can't execute raw SQL directly, we'll use the migration approach
    // by adding the columns one by one using Supabase's table operations
    
    // First, let's check if the columns already exist by trying to select them
    const { data: countryData, error: countryError } = await supabaseAdmin
      .from('countries')
      .select('canonical_slug')
      .limit(1);
    
    if (countryError && countryError.message.includes('column')) {
      console.log('canonical_slug column does not exist in countries, adding it...');
      // We can't directly add columns via the JS client
      // The user will need to run the SQL migration manually
      console.log('Please run the following SQL in your Supabase SQL editor:');
      console.log(`
ALTER TABLE countries ADD COLUMN canonical_slug TEXT UNIQUE;
ALTER TABLE regions ADD COLUMN canonical_slug TEXT UNIQUE;
ALTER TABLE cities ADD COLUMN canonical_slug TEXT UNIQUE;
      `);
      process.exit(1);
    } else {
      console.log('canonical_slug column already exists in countries');
    }
    
    console.log('Migration check completed!');
    process.exit(0);
  } catch (error) {
    console.error('Migration check failed:', error);
    process.exit(1);
  }
}

runMigration();