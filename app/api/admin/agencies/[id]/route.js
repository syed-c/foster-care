import { supabaseAdmin } from '@/lib/supabase';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/authOptions';

export async function GET(request, { params }) {
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
    
    // Fetch agency details
    const { data: agency, error } = await supabaseAdmin
      .from('agencies')
      .select(`
        *,
        services:agency_services(service_name)
      `)
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch agency' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    if (!agency) {
      return new Response(
        JSON.stringify({ error: 'Agency not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Format services array
    const agencyWithServices = {
      ...agency,
      services: agency.services ? agency.services.map(s => s.service_name) : []
    };

    return new Response(
      JSON.stringify({ agency: agencyWithServices }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error fetching agency:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}

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
    const { action } = await request.json();
    
    let updateData = {};
    
    switch (action) {
      case 'approve':
        updateData = { status: 'approved', verified: true };
        break;
      case 'reject':
        updateData = { status: 'rejected' };
        break;
      case 'feature':
        // Toggle featured status
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
        
        updateData = { featured: !currentAgency.featured };
        break;
      default:
        return new Response(
          JSON.stringify({ error: 'Invalid action' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }
    
    // Update agency
    const { data, error } = await supabaseAdmin
      .from('agencies')
      .update(updateData)
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
    console.error('Error updating agency:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}