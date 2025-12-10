// Script to run the country system migration
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Running country system migration...');

// Path to the migration SQL file
const migrationPath = path.join(__dirname, '..', 'migrations', '20251210143500_add_country_system.sql');

// Check if the migration file exists
if (!fs.existsSync(migrationPath)) {
  console.error(`❌ Migration file not found: ${migrationPath}`);
  console.log('\nPlease ensure you are running this script from the project root directory.');
  console.log('The migration file should be located at: migrations/20251210143500_add_country_system.sql');
  process.exit(1);
}

console.log(`✅ Found migration file: ${migrationPath}`);

// Command to run the migration using Supabase CLI
// Note: This assumes you have the Supabase CLI installed and configured
const command = `supabase sql -f "${migrationPath}"`;

console.log('\nExecuting migration command...');
console.log(`Command: ${command}`);

exec(command, (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Error running migration: ${error.message}`);
    if (stderr) {
      console.error(`stderr: ${stderr}`);
    }
    console.log('\nTroubleshooting tips:');
    console.log('1. Ensure Supabase CLI is installed: npm install -g supabase');
    console.log('2. Ensure you\'re logged in to Supabase: supabase login');
    console.log('3. Check your Supabase project link: supabase link');
    console.log('4. Alternatively, manually copy the SQL from the migration file to your Supabase SQL Editor');
    process.exit(1);
  }
  
  if (stderr) {
    console.warn(`⚠️  stderr: ${stderr}`);
  }
  
  console.log(`✅ Migration output: ${stdout}`);
  console.log('\n🎉 Country system migration completed successfully!');
  console.log('\nNext steps:');
  console.log('1. Run the seed script: node scripts/seed-country-data.js');
  console.log('2. Test the setup: node scripts/test-country-setup.js');
  console.log('3. Visit /foster-agency/england to see the country page');
});