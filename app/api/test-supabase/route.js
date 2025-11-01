import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
  try {
    // Log the Supabase configuration for debugging
    console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('Supabase Anon Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'SET' : 'NOT SET');
    console.log('Supabase Service Role Key:', process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT SET');
    
    // Check if URL is valid
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid Supabase URL. Please update NEXT_PUBLIC_SUPABASE_URL in .env.local',
          details: 'Current URL: ' + process.env.NEXT_PUBLIC_SUPABASE_URL
        },
        { status: 500 }
      );
    }
    
    // Check if keys are set
    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('your-')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid Supabase Anon Key. Please update NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local'
        },
        { status: 500 }
      );
    }

    // Test the Supabase connection by querying a simple table
    const { data, error, count } = await supabaseAdmin
      .from('users')
      .select('*', { count: 'exact', head: true });

    if (error) {
      console.error('Supabase connection test failed:', error);
      return NextResponse.json(
        { 
          success: false, 
          error: 'Supabase connection failed: ' + error.message,
          details: error
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Supabase connection successful',
        data: { count: count }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Unexpected error testing Supabase connection:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Unexpected error: ' + error.message,
        stack: error.stack
      },
      { status: 500 }
    );
  }
}