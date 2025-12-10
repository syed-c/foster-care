import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Simple proxy to test if we can fetch from the backend
    const response = await fetch('http://localhost:3002/api/foster-agency/england');
    const data = await response.json();
    
    return NextResponse.json({
      success: true,
      data: data,
      proxied: true
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
      proxied: true
    }, { status: 500 });
  }
}