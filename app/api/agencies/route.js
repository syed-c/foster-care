import { getAgenciesByRegion } from '@/services/locationService';
import { supabaseAdmin } from '@/lib/supabase.js';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const regionSlug = searchParams.get('region');
    const featured = searchParams.get('featured') === 'true';
    const limit = parseInt(searchParams.get('limit')) || 50;
    const search = searchParams.get('search');
    const type = searchParams.get('type');
    
    // If no region is specified, fetch all agencies
    if (!regionSlug) {
      let query = supabaseAdmin
        .from('agencies')
        .select('*')
        .limit(limit);

      // Apply featured filter if specified
      if (featured) {
        query = query.eq('featured', true);
      }

      // Apply type filter if specified
      if (type && type !== 'all') {
        query = query.eq('type', type);
      }

      // Apply search filter if specified
      if (search) {
        query = query.or(`name.ilike.%${search}%,city.ilike.%${search}%,region.ilike.%${search}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching agencies:', error);
        return NextResponse.json({ error: 'Failed to fetch agencies' }, { status: 500 });
      }

      return NextResponse.json({ agencies: data || [] });
    }
    
    // If region is specified, use the existing function
    const agencies = await getAgenciesByRegion(regionSlug, limit, { featured, type });
    
    return NextResponse.json({ agencies });
  } catch (error) {
    console.error('Error fetching agencies:', error);
    return NextResponse.json({ error: 'Failed to fetch agencies' }, { status: 500 });
  }
}