import { supabaseAdmin } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const countrySlug = searchParams.get('country');
    const limit = parseInt(searchParams.get('limit')) || 12;

    if (!countrySlug) {
      return NextResponse.json({ error: 'Country slug is required' }, { status: 400 });
    }

    // First get the country ID
    const { data: country, error: countryError } = await supabaseAdmin
      .from('countries')
      .select('id')
      .eq('slug', countrySlug)
      .single();

    if (countryError || !country) {
      return NextResponse.json({ error: 'Country not found' }, { status: 404 });
    }

    // Then get agencies for that country through regions
    const { data: agencies, error: agenciesError } = await supabaseAdmin
      .from('agencies')
      .select('*')
      .eq('country_id', country.id)
      .limit(limit);

    if (agenciesError) {
      console.error('Error fetching agencies by country:', agenciesError);
      return NextResponse.json({ error: 'Failed to fetch agencies' }, { status: 500 });
    }

    return NextResponse.json({ agencies: agencies || [] });
  } catch (error) {
    console.error('Error fetching agencies by country:', error);
    return NextResponse.json({ error: 'Failed to fetch agencies' }, { status: 500 });
  }
}