import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request) {
  try {
    // Fetch pages from Supabase
    const { data: pages, error } = await supabaseAdmin
      .from('pages')
      .select('*')
      .order('title');

    if (error) {
      throw new Error(error.message);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        pages: pages || []
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching pages:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message,
        pages: []
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}