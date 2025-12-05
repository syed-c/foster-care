import { supabaseAdmin } from '@/lib/supabase';
import { verify } from 'jsonwebtoken';

export async function GET(request) {
  try {
    // Special case for auth@syedrayyan.com
    const specialAccess = request.cookies.get('special_super_admin_access')?.value;
    if (specialAccess !== 'auth@syedrayyan.com') {
      // Check for admin token
      const token = request.cookies.get("admin_token")?.value;
      
      if (!token) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      try {
        // Verify the token
        const decoded = verify(token, process.env.NEXTAUTH_SECRET);
        
        // Check if it's an admin
        if (decoded.role !== "admin") {
          return new Response(
            JSON.stringify({ error: 'Unauthorized' }),
            { status: 401, headers: { 'Content-Type': 'application/json' } }
          );
        }
      } catch (error) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Fetch stats from Supabase
    const { count: totalAgencies, error: agenciesError } = await supabaseAdmin
      .from('agencies')
      .select('*', { count: 'exact', head: true });
      
    const { count: pendingAgencies, error: pendingAgenciesError } = await supabaseAdmin
      .from('agencies')
      .select('*', { count: 'exact', head: true })
      .eq('verified', false); // Use verified=false instead of status=pending
      
    const { count: totalUsers, error: usersError } = await supabaseAdmin
      .from('users')
      .select('*', { count: 'exact', head: true });
      
    const { count: totalLeads, error: leadsError } = await supabaseAdmin
      .from('contact_inquiries')
      .select('*', { count: 'exact', head: true });
      
    const { count: totalReviews, error: reviewsError } = await supabaseAdmin
      .from('reviews')
      .select('*', { count: 'exact', head: true });
      
    const { count: featuredAgencies, error: featuredAgenciesError } = await supabaseAdmin
      .from('agencies')
      .select('*', { count: 'exact', head: true })
      .eq('featured', true);

    if (agenciesError || pendingAgenciesError || usersError || leadsError || reviewsError || featuredAgenciesError) {
      console.error('Database errors:', {
        agenciesError,
        pendingAgenciesError,
        usersError,
        leadsError,
        reviewsError,
        featuredAgenciesError
      });
      
      return new Response(
        JSON.stringify({ error: 'Failed to fetch stats' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const stats = {
      totalAgencies: totalAgencies || 0,
      pendingAgencies: pendingAgencies || 0,
      totalUsers: totalUsers || 0,
      totalLeads: totalLeads || 0,
      totalReviews: totalReviews || 0,
      featuredAgencies: featuredAgencies || 0
    };

    return new Response(
      JSON.stringify(stats),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}