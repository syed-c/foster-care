import { supabaseAdmin } from '@/lib/supabase-server';
import { verify } from 'jsonwebtoken';

export async function GET(request) {
  try {
    // TEMPORARILY DISABLED AUTHENTICATION FOR TESTING
    // Allow all access for now in development
    const isDevelopment = process.env.NODE_ENV === 'development';
    
    if (!isDevelopment) {
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
    }

    // Check if Supabase is available
    if (!supabaseAdmin) {
      // Return mock data in development when Supabase is not configured
      if (isDevelopment) {
        console.log('Supabase not configured, returning mock data');
        const mockUsers = [
          {
            id: '1',
            name: 'John Smith',
            email: 'john@example.com',
            role: 'user',
            email_verified: true,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          },
          {
            id: '2',
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin',
            email_verified: true,
            created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
            updated_at: new Date(Date.now() - 86400000).toISOString()
          },
          {
            id: '3',
            name: 'Jane Doe',
            email: 'jane@example.com',
            role: 'agency',
            email_verified: false,
            created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
            updated_at: new Date(Date.now() - 172800000).toISOString()
          }
        ];

        // Apply filters
        const { searchParams } = new URL(request.url);
        const role = searchParams.get('role');
        const search = searchParams.get('search');
        
        let filteredUsers = mockUsers;
        
        if (role && role !== 'all') {
          filteredUsers = filteredUsers.filter(user => user.role === role);
        }
        
        if (search) {
          filteredUsers = filteredUsers.filter(user => 
            user.name.toLowerCase().includes(search.toLowerCase()) || 
            user.email.toLowerCase().includes(search.toLowerCase())
          );
        }

        // Pagination
        const page = parseInt(searchParams.get('page')) || 1;
        const limit = parseInt(searchParams.get('limit')) || 10;
        const offset = (page - 1) * limit;
        const paginatedUsers = filteredUsers.slice(offset, offset + limit);
        const totalPages = Math.ceil(filteredUsers.length / limit);

        return new Response(
          JSON.stringify({ 
            users: paginatedUsers, 
            totalPages,
            currentPage: page
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