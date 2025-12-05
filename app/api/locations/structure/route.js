import { loadAllLocations } from '@/lib/locationData';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const structure = await loadAllLocations();
    return NextResponse.json(structure);
  } catch (error) {
    console.error('Error loading location structure:', error);
    return NextResponse.json({ error: 'Failed to load location structure' }, { status: 500 });
  }
}