import { supabaseAdmin } from '@/lib/supabase';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../../auth/[...nextauth]/route';

export async function POST(request, { params }) {
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

    const { id } = params;
    
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