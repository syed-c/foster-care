import { supabaseAdmin } from '@/lib/supabase-server';

export async function GET() {
  try {
    console.log('Testing Supabase connection...');
    
    // Check if Supabase admin client is initialized
    if (!supabaseAdmin) {
      console.error('Supabase admin client is not initialized');
      return new Response(
        JSON.stringify({ error: 'Supabase admin client is not initialized' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Try a simple query to test the connection
    const { data, error } = await supabaseAdmin
      .from('countries')
      .select('id, name, slug')
      .limit(1);
    
    if (error) {
      console.error('Supabase query error:', error);
      return new Response(
        JSON.stringify({ error: 'Supabase query failed', details: error.message }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    console.log('Supabase query successful:', data);
    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
  } catch (error) {
    console.error('Unexpected error in Supabase test:', error);
    return new Response(
      JSON.stringify({ error: 'Unexpected error', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}