import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Test endpoint to verify agency creation
export async function GET(request) {
  try {
    // Get all agencies for testing
    const { data: agencies, error } = await supabaseAdmin
      .from('agencies')
      .select('*')
      .limit(10);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ agencies });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}