import { getAgenciesByRegion } from '@/services/locationService';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const regionSlug = searchParams.get('region');
    const featured = searchParams.get('featured') === 'true';
    const limit = parseInt(searchParams.get('limit')) || 10;
    
    if (!regionSlug) {
      return NextResponse.json({ error: 'Region slug is required' }, { status: 400 });
    }
    
    const agencies = await getAgenciesByRegion(regionSlug, limit, { featured });
    
    return NextResponse.json(agencies);
  } catch (error) {
    console.error('Error fetching agencies:', error);
    return NextResponse.json({ error: 'Failed to fetch agencies' }, { status: 500 });
  }
}