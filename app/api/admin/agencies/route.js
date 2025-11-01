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

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    
    console.log('API received status filter:', status);
    
    // Calculate offset
    const offset = (page - 1) * limit;
    
    // Build query
    let query = supabaseAdmin
      .from('agencies')
      .select('*', { count: 'exact' })
      .range(offset, offset + limit - 1);
      
    // Apply filters based on verified status instead of status field
    if (status === 'approved') {
      query = query.eq('verified', true);
    } else if (status === 'pending') {
      query = query.eq('verified', false);
    } else if (status === 'rejected') {
      // For now, we don't have a rejected status, so we'll just return no results
      query = query.eq('id', -1); // This will return no results
    }
    
    if (search) {
      query = query.ilike('name', `%${search}%`);
    }
    
    // Order by creation date
    query = query.order('created_at', { ascending: false });
    
    // Execute query
    const { data: agencies, count, error } = await query;
    
    // Debug output
    console.log('Agencies query result:', { count, error });
    
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