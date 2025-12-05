const { supabaseAdmin } = require('./lib/supabase-server');

async function checkColumns() {
  try {
    console.log('Checking if canonical_slug columns exist...');
    
    // Check countries table
    const { error: countriesError } = await supabaseAdmin
      .from('countries')
      .select('canonical_slug')
      .limit(1);
    
    if (countriesError && countriesError.message.includes('column')) {
      console.log('❌ canonical_slug column does not exist in countries table');
    } else {
      console.log('✅ canonical_slug column exists in countries table');
    }
    
    // Check regions table
    const { error: regionsError } = await supabaseAdmin
      .from('regions')
      .select('canonical_slug')
      .limit(1);
    
    if (regionsError && regionsError.message.includes('column')) {
      console.log('❌ canonical_slug column does not exist in regions table');
    } else {
      console.log('✅ canonical_slug column exists in regions table');
    }
    
    // Check cities table
    const { error: citiesError } = await supabaseAdmin
      .from('cities')
      .select('canonical_slug')
      .limit(1);
    
    if (citiesError && citiesError.message.includes('column')) {
      console.log('❌ canonical_slug column does not exist in cities table');
    } else {
      console.log('✅ canonical_slug column exists in cities table');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error checking columns:', error);
    process.exit(1);
  }
}

checkColumns();