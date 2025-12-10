import { NextResponse } from 'next/server';

// Use Node.js runtime instead of Edge Runtime for environment variable access
export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? '[SET]' : '[NOT SET]',
  });
}