import { supabaseAdmin } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    
    // Fetch agency details by slug
    const { data: agency, error } = await supabaseAdmin
      .from('agencies')
      .select(`
        *,
        services:agency_services(service_name)
      `)
      .eq('slug', slug)
      .single();
      
    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to fetch agency' }, { status: 500 });
    }
    
    if (!agency) {
      return NextResponse.json({ error: 'Agency not found' }, { status: 404 });
    }

    // Format services array
    const agencyWithServices = {
      ...agency,
      services: agency.services ? agency.services.map(s => s.service_name) : []
    };

    return NextResponse.json({ agency: agencyWithServices });
  } catch (error) {
    console.error('Error fetching agency:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}