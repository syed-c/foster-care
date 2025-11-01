const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Server-side Supabase client
let supabaseAdmin = null;

if (supabaseUrl && (serviceRoleKey || supabaseAnonKey)) {
  supabaseAdmin = createClient(
    supabaseUrl,
    serviceRoleKey || supabaseAnonKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  );
} else {
  console.warn('Supabase environment variables not set. Some features may not work.');
}

module.exports = {
  supabaseAdmin
};
