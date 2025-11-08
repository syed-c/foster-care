const { supabaseAdmin } = require('./lib/supabase-server');

async function testAgencies() {
  try {
    console.log('Testing agencies fetch...');
    
    // Fetch agencies
    const { data, error } = await supabaseAdmin
      .from('agencies')
      .select('*')
      .limit(5);
      
    if (error) {
      console.error('Error fetching agencies:', error);
      return;
    }
    
    console.log('Found agencies:', data.length);
    console.log('First agency:', data[0]);
  } catch (error) {
    console.error('Test error:', error);
  }
}

testAgencies();