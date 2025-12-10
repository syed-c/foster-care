#!/usr/bin/env node

// Script to output the migration SQL to the terminal for easy copying
const fs = require('fs');
const path = require('path');

console.log('=== COUNTRY SYSTEM MIGRATION SQL ===\n');
console.log('Copy the SQL below and paste it into your Supabase SQL Editor:\n');
console.log('=' .repeat(50));

const migrationPath = path.join(__dirname, '..', 'migrations', '20251210143500_add_country_system.sql');

try {
  const sqlContent = fs.readFileSync(migrationPath, 'utf8');
  console.log(sqlContent);
  
  console.log('\n' + '=' .repeat(50));
  console.log('End of SQL migration script');
  console.log('\nInstructions:');
  console.log('1. Copy everything between the === lines above');
  console.log('2. Go to your Supabase Dashboard');
  console.log('3. Navigate to SQL Editor');
  console.log('4. Paste the SQL and click RUN');
} catch (error) {
  console.error('Error reading migration file:', error.message);
  console.log('Please ensure the migration file exists at:', migrationPath);
  process.exit(1);
}