#!/usr/bin/env node

// Simple diagnostic script to check current database state
const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config();

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkTables() {
  console.log('🔍 Checking current database state...\n');
  
  try {
    // Try to query the countries table directly
    const { data, error } = await supabase
      .from('countries')
      .select('count()', { count: 'exact' });
    
    if (error) {
      console.log('⚠️  countries table does not exist or is inaccessible');
      console.log('Error:', error.message);
      console.log('\n🔧 You need to run the database migration first.');
      console.log('Steps to fix:');
      console.log('1. Run: node scripts/output-migration-sql.js');
      console.log('2. Copy the SQL output and paste it into your Supabase SQL Editor');
      console.log('3. Click RUN in the Supabase SQL Editor');
      console.log('4. Then run: node scripts/seed-country-data.js');
      return;
    }
    
    console.log(`✅ countries table exists with ${data[0].count} records`);
    console.log('\n🎉 Database is set up correctly!');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

checkTables();