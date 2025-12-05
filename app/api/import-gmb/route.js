import { supabaseAdmin } from '@/lib/supabase-server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { createSlug, createUniqueSlug, fetchPhotoUrl, fetchPlaceDetails, extractPostcode, createAgencyUser } from '@/lib/agencyHelpers';

export async function POST(request) {
  try {
    // Authenticate user using admin token (same logic as other admin API routes)
    const cookieStore = await cookies();
    
    // Check for special super admin access
    const specialAccess = cookieStore.get('special_super_admin_access')?.value;
    if (specialAccess === 'auth@syedrayyan.com') {
      // Allow special admin access
    } else {
      // Check for admin token
      const token = cookieStore.get('admin_token')?.value;
      
      if (!token) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      try {
        // Verify the token
        const decoded = verify(token, process.env.NEXTAUTH_SECRET);
        
        // Check if it's an admin
        if (decoded.role !== 'admin') {
          return new Response(
            JSON.stringify({ error: 'Forbidden' }),
            { status: 403, headers: { 'Content-Type': 'application/json' } }
          );
        }
      } catch (error) {
        return new Response(
          JSON.stringify({ error: 'Invalid token' }),
          { status: 401, headers: { 'Content-Type': 'application/json' } }
        );
      }
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
      return new Response(
        JSON.stringify({ error: 'API key and keyword are required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Test API key with a sample request
    const testResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(keyword)}&key=${apiKey}&radius=5000`
    );
    
    if (!testResponse.ok) {
      return new Response(
        JSON.stringify({ error: 'Invalid API key or network error' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const testData = await testResponse.json();
    if (testData.status === 'REQUEST_DENIED') {
      return new Response(
        JSON.stringify({ error: 'Invalid API key' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Fetch places based on parameters
    let searchQuery = keyword;
    if (importMode === 'city' && city) {
      searchQuery += ` in ${city}`;
    } else if (importMode === 'region' && region) {
      searchQuery += ` in ${region}`;
    } else if (importMode === 'country' && country) {
      searchQuery += ` in ${country}`;
    }
    
    const searchResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(searchQuery)}&key=${apiKey}&radius=5000`
    );
    
    if (!searchResponse.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch places' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    const searchData = await searchResponse.json();
    const places = searchData.results.slice(0, limit || 10);
    
    let processed = 0;
    let inserted = 0;
    let skipped = 0;
    const errors = [];
    
    // Process each place
    for (const place of places) {
      try {
        processed++;
        
        // Create unique slug from name
        const slug = await createUniqueSlug(place.name);
        
        // ALWAYS check for duplicates to prevent constraint violations
        const { data: existing } = await supabaseAdmin
          .from('agencies')
          .select('id')
          .or(`slug.eq.${slug},address.eq.${place.formatted_address}`)
          .maybeSingle();
          
        if (existing) {
          skipped++;
          continue;
        }
        
        // Fetch detailed place information
        let detailedPlace = place;
        if (place.place_id) {
          const fetchedDetails = await fetchPlaceDetails(place.place_id, apiKey);
          if (fetchedDetails) {
            detailedPlace = fetchedDetails;
          }
        }
        
        // Fetch photo URL if available
        let photoUrl = null;
        if (detailedPlace.photos && detailedPlace.photos.length > 0) {
          photoUrl = await fetchPhotoUrl(detailedPlace.photos[0].photo_reference, apiKey);
        }
        
        // Extract postcode from address components if available
        let postcode = null;
        if (detailedPlace.address_components) {
          postcode = extractPostcode(detailedPlace.address_components);
        }
        
        // If no postcode from address components, try to extract from formatted address
        if (!postcode && detailedPlace.formatted_address) {
          // Simple regex to extract UK postcode pattern
          const postcodeMatch = detailedPlace.formatted_address.match(/([A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2})/i);
          if (postcodeMatch) {
            postcode = postcodeMatch[1].toUpperCase();
          }
        }
        
        // Create a user for this agency ONLY if we're going to insert it
        const userId = await createAgencyUser(detailedPlace.name, detailedPlace.international_phone_number);
        
        // Prepare agency data with all available fields
        const agencyData = {
          name: detailedPlace.name,
          slug: slug,
          address: detailedPlace.formatted_address,
          postcode: postcode,
          latitude: detailedPlace.geometry?.location?.lat || null,
          longitude: detailedPlace.geometry?.location?.lng || null,
          rating: detailedPlace.rating || null,
          review_count: detailedPlace.user_ratings_total || null,
          website: detailedPlace.website || null,
          contact_phone: detailedPlace.international_phone_number || null,
          // Use logo field instead of photo_url
          logo: photoUrl,
          city: city || null,
          region: region || null,
          featured: markAsFeatured || false,
          verified: markAsVerified || false,
          // Add all required fields with extracted or default values
          description: detailedPlace.editorial_summary?.overview || detailedPlace.vicinity || '',
          contact_email: null, // Google Places API doesn't provide email
          accreditation: null, // This would need to be added manually or from another source
          // Assign the created user ID
          user_id: userId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        
        // Insert into Supabase
        const { error: insertError } = await supabaseAdmin
          .from('agencies')
          .insert(agencyData);
          
        if (insertError) {
          errors.push(`Failed to insert ${detailedPlace.name}: ${insertError.message}`);
        } else {
          inserted++;
        }
      } catch (error) {
        errors.push(`Error processing ${place.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }
    
    return new Response(
      JSON.stringify({
        processed,
        inserted,
        skipped,
        errors
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('GMB Import Error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}