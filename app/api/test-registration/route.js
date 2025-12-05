import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Test endpoint to verify registration completion status
export async function GET(request) {
  try {
    // Get user ID from query parameters
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }
    
    // Get agency data
    const { data: agencies, error } = await supabaseAdmin
      .from('agencies')
      .select('*')
      .eq('user_id', userId)
      .limit(1);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!agencies || agencies.length === 0) {
      return NextResponse.json({ message: 'No agency found for this user' });
    }

    const agency = agencies[0];
    return NextResponse.json({ 
      agency: {
        id: agency.id,
        name: agency.name,
        registration_complete: agency.registration_complete,
        created_at: agency.created_at,
        updated_at: agency.updated_at
      }
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}