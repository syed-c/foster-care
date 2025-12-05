const { createClient } = require('@supabase/supabase-js');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('Supabase URL:', supabaseUrl);
console.log('Supabase Anon Key exists:', !!supabaseAnonKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
  try {
    console.log('Testing Supabase connection...');
    
    // Test the connection by querying a simple table
    const { data, error } = await supabase
      .from('countries')
      .select('id, name, slug')
      .limit(1);

    if (error) {
      console.error('Supabase query error:', error);
      return;
    }

    console.log('Supabase query successful:', data);
    console.log('Connection test passed!');
  } catch (error) {
    console.error('Supabase test error:', error);
  }
}

testConnection();