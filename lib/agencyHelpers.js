import { supabaseAdmin } from '@/lib/supabase-server';
import { v4 as uuidv4 } from 'uuid';

// Helper function to create slugs
export function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

// Helper function to create unique slugs
export async function createUniqueSlug(name) {
  const baseSlug = createSlug(name);
  let slug = baseSlug;
  let counter = 1;
  
  // Check if slug exists, if so, append a counter
  while (true) {
    const { data: existing } = await supabaseAdmin
      .from('agencies')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();
      
    if (!existing) {
      break; // Slug is unique
    }
    
    // If slug exists, append counter
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
  
  return slug;
}

// Helper function to fetch photo URL from Google Places Photo API
export async function fetchPhotoUrl(photoReference, apiKey) {
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

// Helper function to fetch detailed place information
export async function fetchPlaceDetails(placeId, apiKey) {
  try {
    const detailsResponse = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}&fields=name,formatted_address,geometry,rating,user_ratings_total,website,international_phone_number,editorial_summary,vicinity,address_components`
    );
    
    if (detailsResponse.ok) {
      const detailsData = await detailsResponse.json();
      if (detailsData.result) {
        return detailsData.result;
      }
    }
    return null;
  } catch (error) {
    console.error('Error fetching place details:', error);
    return null;
  }
}

// Helper function to extract postcode from address components
export function extractPostcode(addressComponents) {
  if (!addressComponents || !Array.isArray(addressComponents)) {
    return null;
  }
  
  const postcodeComponent = addressComponents.find(component => 
    component.types.includes('postal_code')
  );
  
  return postcodeComponent ? postcodeComponent.long_name : null;
}

// Helper function to create a user for an agency
export async function createAgencyUser(agencyName, contactPhone) {
  try {
    // Generate a unique email for the agency user
    const email = `agency-${uuidv4()}@fostercare.uk`;
    const name = `${agencyName} Admin`;
    
    // Create the user record
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .insert({
        name: name,
        email: email,
        role: 'agency',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();
    
    if (userError) {
      console.error('Error creating user:', userError);
      return null;
    }
    
    return userData.id;
  } catch (error) {
    console.error('Error creating agency user:', error);
    return null;
  }
}