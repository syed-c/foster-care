import { supabaseAdmin } from '@/lib/supabase-server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(request) {
  try {
    // TEMPORARILY DISABLED AUTHENTICATION FOR TESTING
    // Allow all access for now in development
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (!isDevelopment) {
      // Get the session
      const session = await getServerSession(authOptions);
      
      // Check if user is admin
      if (!session || session.user.role !== 'admin') {
        return new Response(
          JSON.stringify({ error: 'Unauthorized' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Check if Supabase is available
    if (!supabaseAdmin) {
      // Return mock data in development when Supabase is not configured
      if (isDevelopment) {
        console.log('Supabase not configured, returning mock data');
        const mockLeads = [
          {
            id: '1',
            name: 'John Doe',
            email: 'john@example.com',
            message: 'I am interested in fostering',
            status: 'new',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            message: 'Looking for more information about fostering',
            status: 'replied',
            created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            updated_at: new Date(Date.now() - 86400000).toISOString()
          }
        ];

        return new Response(
          JSON.stringify({ 
            leads: mockLeads, 
            totalPages: 1,
            currentPage: 1
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      } else {
        return new Response(
          JSON.stringify({ error: 'Database connection failed' }),
          { status: 500, headers: { 'Content-Type': 'application/json' } }
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
    
    // Build query
    let query = supabaseAdmin
      .from('contact_inquiries')
      .select(`
        *,
        agency:agencies(name)
      `, { count: 'exact' })
      .range(offset, offset + limit - 1);
      
    // Apply filters
    if (status) {
      query = query.eq('status', status);
    }
    
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
    }
    
    // Order by creation date
    query = query.order('created_at', { ascending: false });
    
    // Execute query
    const { data: leads, count, error } = await query;
    
    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch leads' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const totalPages = Math.ceil(count / limit);

    return new Response(
      JSON.stringify({ 
        leads, 
        totalPages,
        currentPage: page
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching leads:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}