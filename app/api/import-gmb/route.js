import { supabaseAdmin } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';

// Helper function to create slugs
export function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Helper function to fetch photo URL from Google Places Photo API
async function fetchPhotoUrl(photoReference, apiKey) {
  try {
    const photoResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`
    );
    
    if (photoResponse.ok) {
      return photoResponse.url;
    }
    return null;
  } catch (error) {
    console.error('Error fetching photo:', error);
    return null;
  }
}

export async function POST(request) {
  try {
    // Authenticate user using cookies
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });
    const { data: { session }, error: authError } = await supabase.auth.getSession();
    
    if (authError || !session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Check if user is admin
    const { data: adminData, error: adminError } = await supabaseAdmin
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();
      
    if (adminError || adminData?.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    
    const body = await request.json();
    const {
      apiKey,
      keyword,
      country,
      region,
      city,
      importMode,
      limit,
      avoidDuplicates,
      markAsVerified,
      markAsFeatured
    } = body;
    
    // Validate required fields
    if (!apiKey || !keyword) {
      return NextResponse.json({ error: 'API key and keyword are required' }, { status: 400 });
    }
    
    // Test API key with a sample request
    const testResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(keyword)}&key=${apiKey}&radius=5000`
    );
    
    if (!testResponse.ok) {
      return NextResponse.json({ error: 'Invalid API key or network error' }, { status: 400 });
    }
    
    const testData = await testResponse.json();
    if (testData.status === 'REQUEST_DENIED') {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 400 });
    }
    
    // Fetch places based on parameters with pagination support
    let searchQuery = keyword;
    if (importMode === 'city' && city) {
      searchQuery += ` in ${city}`;
    } else if (importMode === 'region' && region) {
      searchQuery += ` in ${region}`;
    } else if (importMode === 'country' && country) {
      searchQuery += ` in ${country}`;
    }
    
    // Collect all places with pagination
    let allPlaces = [];
    let nextPageToken = undefined;
    let pagesFetched = 0;
    const maxPages = Math.ceil((limit || 10) / 20); // Google Places API returns max 20 results per page
    
    do {
      let url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&key=${apiKey}&radius=5000`;
      if (nextPageToken) {
        url += `&pagetoken=${nextPageToken}`;
      }
      
      const searchResponse = await fetch(url);
      
      if (!searchResponse.ok) {
        if (allPlaces.length > 0) {
          // If we already have some results, continue with what we have
          break;
        }
        return NextResponse.json({ error: 'Failed to fetch places' }, { status: 500 });
      }
      
      const searchData = await searchResponse.json();
      
      if (searchData.results && searchData.results.length > 0) {
        allPlaces = [...allPlaces, ...searchData.results];
      }
      
      // Check if we have enough results or if there are more pages
      nextPageToken = searchData.next_page_token;
      pagesFetched++;
      
      // Limit the number of pages we fetch based on the requested limit
      if (allPlaces.length >= (limit || 10) || pagesFetched >= maxPages) {
        break;
      }
      
      // Google Places API requires a short delay between page requests
      if (nextPageToken) {
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    } while (nextPageToken && pagesFetched < 5); // Max 5 pages to prevent infinite loops
    
    // Limit to the requested number of places
    const places = allPlaces.slice(0, limit || 10);
    
    let processed = 0;
    let inserted = 0;
    let skipped = 0;
    const errors = [];
    
    // Get existing agencies for duplicate checking if needed
    let existingAgencies = [];
    if (avoidDuplicates) {
      const { data, error: fetchError } = await supabaseAdmin
        .from('agencies')
        .select('name, slug, address');
        
      if (!fetchError && data) {
        existingAgencies = data;
      }
    }
    
    // Process each place
    for (const place of places) {
      try {
        processed++;
        
        // Create slug from name
        const slug = createSlug(place.name);
        
        // Check for duplicates if needed using enhanced logic
        if (avoidDuplicates) {
          const isDuplicate = existingAgencies.some(existing => {
            // Check if name matches (case insensitive)
            if (existing.name && place.name && 
                existing.name.toLowerCase() === place.name.toLowerCase()) {
              return true;
            }
            
            // Check if slug matches
            if (existing.slug && slug && existing.slug === slug) {
              return true;
            }
            
            // Check if address matches
            if (existing.address && place.formatted_address && 
                existing.address.toLowerCase() === place.formatted_address.toLowerCase()) {
              return true;
            }
            
            return false;
          });
          
          if (isDuplicate) {
            skipped++;
            continue;
          }
        }
        
        // Fetch photo URL if available
        let photoUrl = null;
        if (place.photos && place.photos.length > 0) {
          photoUrl = await fetchPhotoUrl(place.photos[0].photo_reference, apiKey);
        }
        
        // Prepare agency data
        const agencyData = {
          name: place.name,
          slug: slug,
          address: place.formatted_address,
          latitude: place.geometry?.location?.lat || null,
          longitude: place.geometry?.location?.lng || null,
          rating: place.rating || null,
          review_count: place.user_ratings_total || null,
          website: place.website || null,
          contact_phone: place.international_phone_number || null,
          photo_url: photoUrl,
          city: city || null,
          region: region || null,
          country: country || null,
          featured: markAsFeatured || false,
          verified: markAsVerified || false,
          // Add any other required fields with default values
          description: '',
          email: null,
          contact_name: null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        // Insert into Supabase
        const { error: insertError } = await supabaseAdmin
          .from('agencies')
          .insert(agencyData);
          
        if (insertError) {
          errors.push(`Failed to insert ${place.name}: ${insertError.message}`);
        } else {
          inserted++;
          // Add to existing agencies array to prevent duplicates in same import batch
          if (avoidDuplicates) {
            existingAgencies.push({
              name: place.name,
              slug: slug,
              address: place.formatted_address
            });
          }
        }
      } catch (error) {
        errors.push(`Error processing ${place.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
    
    return NextResponse.json({
      processed,
      inserted,
      skipped,
      errors
    });
    
  } catch (error) {
    console.error('GMB Import Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}