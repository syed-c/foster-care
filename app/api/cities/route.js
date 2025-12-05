import { getCitiesByRegion } from '@/services/locationService';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const regionSlug = searchParams.get('region');
    
    if (!regionSlug) {
      return NextResponse.json({ error: 'Region slug is required' }, { status: 400 });
    }
    
    const cities = await getCitiesByRegion(regionSlug);
    
    return NextResponse.json(cities);
  } catch (error) {
    console.error('Error fetching cities:', error);
    return NextResponse.json({ error: 'Failed to fetch cities' }, { status: 500 });
  }
}