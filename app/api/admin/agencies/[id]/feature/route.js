import { supabaseAdmin } from '@/lib/supabase';
import { verify } from 'jsonwebtoken';

export async function POST(request, { params }) {
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

    const { id } = await params;
    
    // Get current featured status
    const { data: currentAgency, error: fetchError } = await supabaseAdmin
      .from('agencies')
      .select('featured')
      .eq('id', id)
      .single();
      
    if (fetchError) {
      console.error('Database error:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch agency' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    if (!currentAgency) {
      return new Response(
        JSON.stringify({ error: 'Agency not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Toggle featured status
    const { data, error } = await supabaseAdmin
      .from('agencies')
      .update({ 
        featured: !currentAgency.featured,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();
      
    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to update agency' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ agency: data }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error updating agency featured status:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}