import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Use Node.js runtime instead of Edge Runtime for environment variable access and Supabase client
export const runtime = 'nodejs';

// Create Supabase client directly in the route
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    db: {
      schema: 'public'
    }
  }
);

export async function GET(
  request: Request,
  { params }: { params: Promise<{ countrySlug: string }> }
) {
  try {
    const resolvedParams = await params;
    
    // Fetch country data
    const { data: country, error: countryError } = await supabaseAdmin
      .from('countries')
      .select('*')
      .eq('slug', resolvedParams.countrySlug)
      .single();

    if (countryError || !country) {
      return NextResponse.json(
        { error: 'Country not found' },
        { status: 404 }
      );
    }

    // Fetch regions
    let { data: regions, error: regionsError } = await supabaseAdmin
      .from('regions')
      .select('*')
      .eq('country_id', country.id)
      .order('order', { ascending: true });

    if (regionsError) {
      console.error('Error fetching regions:', regionsError);
      regions = [];
    }

    // Fetch counties
    let { data: counties, error: countiesError } = await supabaseAdmin
      .from('counties')
      .select('*')
      .eq('country_id', country.id)
      .order('order', { ascending: true });

    if (countiesError) {
      console.error('Error fetching counties:', countiesError);
      counties = [];
    }

    // Fetch blocks
    let { data: blocks, error: blocksError } = await supabaseAdmin
      .from('country_page_blocks')
      .select('*')
      .eq('country_id', country.id)
      .order('order', { ascending: true });

    if (blocksError) {
      console.error('Error fetching blocks:', blocksError);
      blocks = [];
    }

    // Combine all data
    const countryData = {
      ...country,
      regions: regions || [],
      counties: counties || [],
      blocks: blocks || []
    };

    // Create response with CORS headers
    const response = NextResponse.json(countryData);
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
  } catch (error) {
    console.error('Error fetching country data:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  return response;
}