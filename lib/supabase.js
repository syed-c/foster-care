import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Validate Supabase configuration
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables');
  console.error('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl);
  console.error('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseAnonKey ? 'SET' : 'NOT SET');
  throw new Error('Missing Supabase environment variables. Check .env.local file.');
}

if (supabaseUrl.includes('your-project') || supabaseAnonKey.includes('your-')) {
  console.warn('WARNING: Using placeholder Supabase credentials. Please update .env.local with real credentials.');
}

// Client for browser/client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  db: {
    schema: 'public'
  }
});

// Admin client for server-side operations (uses service role key)
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const supabaseAdmin = createClient(
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

// Log if we're using the service role key or falling back
if (!serviceRoleKey) {
  console.warn('WARNING: Using anon key instead of service role key for admin operations');
} else if (serviceRoleKey.includes('your-')) {
  console.warn('WARNING: Using placeholder service role key. Please update .env.local with real credentials.');
} else {
  console.log('Using service role key for admin operations');
}

// Helper function to handle Supabase errors
export function handleSupabaseError(error) {
  console.error('Supabase Error:', error);
  return {
    success: false,
    error: error.message || 'An error occurred',
    details: error
  };
}

// Helper function for successful responses
export function handleSupabaseSuccess(data, message = 'Success') {
  return {
    success: true,
    data,
    message
  };
}