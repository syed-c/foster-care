import { supabaseAdmin } from '@/lib/supabase';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request) {
  try {
    // Get the session
    const session = await getServerSession(authOptions);
    
    // Check if user is admin
    if (!session || session.user.role !== 'admin') {
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Fetch stats from Supabase
    const { count: totalAgencies, error: agenciesError } = await supabaseAdmin
      .from('agencies')
      .select('*', { count: 'exact', head: true });
      
    const { count: pendingAgencies, error: pendingAgenciesError } = await supabaseAdmin
      .from('agencies')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');
      
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