// Simple script to check if there are agencies in the database
import { supabaseAdmin } from './lib/supabase.js';

async function checkAgencies() {
  try {
    console.log('Checking for agencies in the database...');
    
    // Fetch agencies
    const { data, error, count } = await supabaseAdmin
      .from('agencies')
      .select('*', { count: 'exact' })
      .limit(5);
      
    if (error) {
      console.error('Error fetching agencies:', error);
      return;
    }
    
    console.log(`Found ${count} agencies in total`);
    console.log('First few agencies:', data);
  } catch (error) {
    console.error('Test error:', error);
  }
}

checkAgencies();