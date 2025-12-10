#!/usr/bin/env node

// Diagnostic script to check current database schema
const { supabaseAdmin } = require('../lib/supabase');

async function checkSchema() {
  console.log('🔍 Checking current database schema...\n');
  
  try {
    // Check if countries table exists and what columns it has
    const { data: countriesColumns, error: countriesError } = await supabaseAdmin
      .rpc('get_columns', { table_name: 'countries' });
      
    if (countriesError && countriesError.message.includes('function get_columns does not exist')) {
      console.log('ℹ️  Cannot use get_columns function, checking with direct query...\n');
      
      // Alternative approach - check if the table exists by querying it
      try {
        const { data, error } = await supabaseAdmin
          .from('countries')
          .select('*')
          .limit(1);
          
        if (error) {
          console.log('✅ countries table does not exist yet (this is OK)');
        } else {
          console.log('⚠️  countries table exists with data:');
          console.log(JSON.stringify(data, null, 2));
        }
      } catch (e) {
        console.log('✅ countries table does not exist yet (this is OK)');
      }
      
      // Check what tables exist
      const { data: tables, error: tablesError } = await supabaseAdmin
        .from('information_schema.tables')
        .select('table_name')
        .eq('table_schema', 'public');
        
      if (!tablesError) {
        console.log('\n📋 Existing tables in public schema:');
        tables.forEach(table => console.log(`  - ${table.table_name}`));
      }
    } else if (countriesError) {
      console.error('❌ Error checking countries table:', countriesError.message);
    } else {
      console.log('📊 countries table columns:');
      countriesColumns.forEach(col => {
        console.log(`  - ${col.column_name} (${col.data_type})`);
      });
    }
    
    console.log('\n🔧 Recommended next steps:');
    console.log('1. If you see conflicting table structures, drop existing tables first:');
    console.log('   DROP TABLE IF EXISTS counties CASCADE;');
    console.log('   DROP TABLE IF EXISTS regions CASCADE;');
    console.log('   DROP TABLE IF EXISTS countries CASCADE;');
    console.log('   DROP TABLE IF EXISTS country_page_blocks CASCADE;');
    console.log('   DROP TABLE IF EXISTS admin_users CASCADE;');
    console.log('\n2. Then run the full migration again');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
  }
}

checkSchema();