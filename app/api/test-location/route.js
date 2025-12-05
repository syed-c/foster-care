import { loadAllLocations } from '@/lib/locationData';
import { getLocationContentByCanonicalSlug } from '@/services/locationService';

export async function GET() {
  try {
    console.log('Testing location data loading...');
    
    // Test loading all locations
    const structure = await loadAllLocations();
    console.log('Location structure loaded:', Object.keys(structure).length);
    
    // Test loading content for England
    const canonicalSlug = '/foster-agency/england';
    console.log('Testing content loading for:', canonicalSlug);
    
    const content = await getLocationContentByCanonicalSlug(canonicalSlug);
    console.log('Content loaded:', !!content);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        structure: Object.keys(structure).length,
        content: !!content
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in location test:', error);
    return new Response(
      JSON.stringify({ error: 'Location test failed', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}