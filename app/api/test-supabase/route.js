import { supabaseAdmin } from '@/lib/supabase-server';

export async function GET() {
  try {
    console.log('Testing Supabase connection...');
    
    if (!supabaseAdmin) {
      return Response.json({
        success: false,
        error: 'Supabase not configured',
        message: 'Supabase admin client is not initialized'
      });
    }

    // Test the connection by querying a simple table
    const { data, error } = await supabaseAdmin
      .from('countries')
      .select('id, name, slug')
      .limit(1);

    if (error) {
      console.error('Supabase query error:', error);
      return Response.json({
        success: false,
        error: 'Query failed',
        message: error.message,
        details: error
      });
    }

    console.log('Supabase query successful:', data);
    return Response.json({
      success: true,
      message: 'Supabase connection successful',
      data: data
    });
  } catch (error) {
    console.error('Supabase test error:', error);
    return Response.json({
      success: false,
      error: 'Exception occurred',
      message: error.message
    });
  }
}