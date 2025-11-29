import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { 
  getLocationPageByCanonicalSlug, 
  saveLocationPage, 
  deleteLocationPage 
} from '@/services/locationPageService';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// GET - Fetch location page data by canonical slug
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const canonicalSlug = searchParams.get('canonicalSlug');

    if (!canonicalSlug) {
      return NextResponse.json(
        { error: 'Canonical slug is required' },
        { status: 400 }
      );
    }

    const data = await getLocationPageByCanonicalSlug(canonicalSlug);

    return NextResponse.json(data || {});
  } catch (error) {
    console.error('Error in GET /api/admin/locations-editor:', error);
    return NextResponse.json(
      { error: 'Failed to fetch location page data' },
      { status: 500 }
    );
  }
}

// POST - Create or update location page data
export async function POST(request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.canonical_slug) {
      return NextResponse.json(
        { error: 'Canonical slug is required' },
        { status: 400 }
      );
    }

    const result = await saveLocationPage(body);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in POST /api/admin/locations-editor:', error);
    return NextResponse.json(
      { error: 'Failed to save location page data' },
      { status: 500 }
    );
  }
}

// DELETE - Delete location page by canonical slug
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const canonicalSlug = searchParams.get('canonicalSlug');

    if (!canonicalSlug) {
      return NextResponse.json(
        { error: 'Canonical slug is required' },
        { status: 400 }
      );
    }

    await deleteLocationPage(canonicalSlug);

    return NextResponse.json({ message: 'Page deleted successfully' });
  } catch (error) {
    console.error('Error in DELETE /api/admin/locations-editor:', error);
    return NextResponse.json(
      { error: 'Failed to delete location page' },
      { status: 500 }
    );
  }
}
