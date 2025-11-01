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
    const role = searchParams.get('role');
    const search = searchParams.get('search');
    
    // Calculate offset
    const offset = (page - 1) * limit;
    
    // Build query
    let query = supabaseAdmin
      .from('users')
      .select(`
        *,
        agency:agencies(name)
      `, { count: 'exact' })
      .range(offset, offset + limit - 1);
      
    // Apply filters
    if (role) {
      query = query.eq('role', role);
    }
    
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
    }
    
    // Order by creation date
    query = query.order('created_at', { ascending: false });
    
    // Execute query
    const { data: users, count, error } = await query;
    
    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch users' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const totalPages = Math.ceil(count / limit);

    return new Response(
      JSON.stringify({ 
        users, 
        totalPages,
        currentPage: page
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}