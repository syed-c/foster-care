import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit') || 10;

  try {
    // Fetch recent activity from multiple tables
    const { data: activity, error } = await supabaseAdmin
      .from('activity_log')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(parseInt(limit));

    if (error) {
      throw new Error(error.message);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        activity: activity || []
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Error fetching activity:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message,
        activity: []
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