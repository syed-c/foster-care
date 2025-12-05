import { NextResponse } from 'next/server';
import { getLocationTree } from '@/services/locationService';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const includeContent = searchParams.get('includeContent') === 'true';
    
    const tree = await getLocationTree(includeContent);
    
    return NextResponse.json(tree);
  } catch (error) {
    console.error('Error fetching location tree:', error);
    
    // If the error is about the canonical_slug column not existing, try again with fallback
    if (error.message && error.message.includes('column "canonical_slug" does not exist')) {
      console.warn('canonical_slug column not found, falling back to slug-based canonical slugs');
      try {
        // Try to get the tree with fallback logic
        const tree = await getLocationTree(false); // Try without content first
        return NextResponse.json(tree);
      } catch (fallbackError) {
        console.error('Fallback also failed:', fallbackError);
        return NextResponse.json(
          { error: fallbackError.message || 'Failed to fetch location tree' },
          { status: 500 }
        );
      }
    }
    
    return NextResponse.json(
      { error: error.message || 'Failed to fetch location tree' },
      { status: 500 }
    );
  }
}