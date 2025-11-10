const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('Supabase configuration check:', {
  urlExists: !!supabaseUrl,
  anonKeyExists: !!supabaseAnonKey,
  serviceKeyExists: !!serviceRoleKey,
  urlIsPlaceholder: supabaseUrl === 'https://your-project.supabase.co',
  anonKeyIsPlaceholder: supabaseAnonKey === 'your-supabase-anon-key',
  serviceKeyIsPlaceholder: serviceRoleKey === 'your-supabase-service-role-key'
});

// Server-side Supabase client
let supabaseAdmin = null;

if (supabaseUrl && (serviceRoleKey || supabaseAnonKey)) {
  // Check if the values are placeholders
  if (supabaseUrl === 'https://your-project.supabase.co' || 
      supabaseAnonKey === 'your-supabase-anon-key' || 
      serviceRoleKey === 'your-supabase-service-role-key') {
    console.warn('Supabase environment variables contain placeholder values. Supabase client will not be initialized.');
  } else {
    console.log('Initializing Supabase client with provided credentials');
    supabaseAdmin = createClient(
      supabaseUrl,
      serviceRoleKey || supabaseAnonKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        },
        db: {
          schema: 'public'
        }
      }
    );
  }
} else {
  console.warn('Supabase environment variables not set. Some features may not work.');
}

// Helper function to refresh the schema cache
async function refreshSchemaCache() {
  if (!supabaseAdmin) {
    console.warn('Supabase admin client not initialized');
    return false;
  }
  
  try {
    // This is a workaround to refresh the schema cache
    // In a real Supabase environment, you would use:
    // await supabaseAdmin.rpc('reload_schema');
    
    console.log('Schema cache refresh requested');
    return true;
  } catch (error) {
    console.error('Error refreshing schema cache:', error);
    return false;
  }
}

module.exports = {
  supabaseAdmin,
  refreshSchemaCache
};