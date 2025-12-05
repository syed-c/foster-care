import { supabaseAdmin } from '@/lib/supabase';
import { verify } from 'jsonwebtoken';

export async function GET(request) {
  try {
    // Special case for auth@syedrayyan.com
    const specialAccess = request.cookies.get('special_super_admin_access')?.value;
    if (specialAccess === 'auth@syedrayyan.com') {
      // User is authenticated as special admin
    } else {
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

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    
    // Calculate offset
    const offset = (page - 1) * limit;
    
    // Build base query
    let query = supabaseAdmin
      .from('agencies')
      .select('*', { count: 'exact' })
      .range(offset, offset + limit - 1);
      
    // Apply filters based on status
    if (status === 'approved') {
      query = query.eq('verified', true);
    } else if (status === 'pending') {
      query = query.eq('verified', false);
    } else if (status === 'rejected') {
      // For now, we'll treat non-verified agencies as pending
      // In the future, you might want to add a rejected field to the schema
      query = query.eq('verified', false);
    }
    // For 'all' status, we don't apply any filter, showing all agencies
    
    if (search) {
      query = query.ilike('name', `%${search}%`);
    }
    
    // Order by creation date
    query = query.order('created_at', { ascending: false });
    
    // Execute query
    const { data: agencies, count, error } = await query;
    
    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch agencies' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Map agencies to include status field for frontend
    const mappedAgencies = agencies.map(agency => ({
      ...agency,
      status: agency.verified ? 'approved' : 'pending'
    }));

    const totalPages = Math.ceil(count / limit);

    return new Response(
      JSON.stringify({ 
        agencies: mappedAgencies, 
        totalPages,
        total: count,
        currentPage: page
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching agencies:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}