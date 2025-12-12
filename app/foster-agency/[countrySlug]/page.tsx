import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import CountryPageClient from './CountryPageClient.tsx';
import { normalizeLocation } from '@/lib/normalizeLocation';

// Use Node.js runtime instead of Edge Runtime for environment variable access and Supabase client
export const runtime = 'nodejs';

// Create Supabase client directly in the route
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    },
    db: {
      schema: 'public'
    }
  }
);

// Helper function to fetch region content
async function fetchRegionContent(countrySlug: string, regions: any[]) {
  try {
    // Create a mapping of region slug to content
    const regionContent: Record<string, any> = {};
    
    // For each region, try to fetch its content
    for (const region of regions) {
      // Try different approaches to fetch content
      // Approach 1: Try with canonical slug
      const canonicalSlug = `/foster-agency/${countrySlug}/${region.slug}`;
      
      let contentData = null;
      
      // Try fetching from location_content table with canonical_slug
      const { data: contentByCanonical, error: canonicalError } = await supabaseAdmin
        .from('location_content')
        .select('content_json')
        .eq('canonical_slug', canonicalSlug)
        .maybeSingle();
      
      if (contentByCanonical && contentByCanonical.content_json) {
        contentData = contentByCanonical.content_json;
      } else {
        // Approach 2: Try fetching from location_content table with location_id
        // First check if there's a corresponding location entry
        const { data: locationEntry, error: locationError } = await supabaseAdmin
          .from('locations')
          .select('id')
          .eq('name', region.title)
          .eq('type', 'region')
          .maybeSingle();
        
        if (locationEntry) {
          const { data: contentByLocation, error: locationContentError } = await supabaseAdmin
            .from('location_content')
            .select('content_json')
            .eq('location_id', locationEntry.id)
            .maybeSingle();
          
          if (contentByLocation && contentByLocation.content_json) {
            contentData = contentByLocation.content_json;
          }
        }
      }
      
      // Normalize the content data using the normalizeLocation function
      if (contentData) {
        const normalizedContent = normalizeLocation(contentData);
        regionContent[region.slug] = normalizedContent;
      }
    }
    
    return regionContent;
  } catch (error) {
    console.error('Error fetching region content:', error);
    return {};
  }
}

export async function generateMetadata({ params }: { params: Promise<{ countrySlug: string }> }) {
  const resolvedParams = await params;
  
  return {
    title: `Foster Care in ${resolvedParams.countrySlug}`,
    description: `Find accredited foster agencies in ${resolvedParams.countrySlug}`
  };
}

export default async function CountryPage({ params }: { params: Promise<{ countrySlug: string }> }) {
  const resolvedParams = await params;
  
  // Fetch country data server-side
  const { data: country, error: countryError } = await supabaseAdmin
    .from('countries')
    .select('*')
    .eq('slug', resolvedParams.countrySlug)
    .single();

  if (countryError || !country) {
    notFound();
  }

  // Fetch regions
  let { data: regions, error: regionsError } = await supabaseAdmin
    .from('regions')
    .select('*')
    .eq('country_id', country.id)
    .order('order', { ascending: true });

  if (regionsError) {
    console.error('Error fetching regions:', regionsError);
    regions = [];
  }

  // Fetch counties
  let { data: counties, error: countiesError } = await supabaseAdmin
    .from('counties')
    .select('*')
    .eq('country_id', country.id)
    .order('order', { ascending: true });

  if (countiesError) {
    console.error('Error fetching counties:', countiesError);
    counties = [];
  }

  // Fetch blocks
  let { data: blocks, error: blocksError } = await supabaseAdmin
    .from('country_page_blocks')
    .select('*')
    .eq('country_id', country.id)
    .order('order', { ascending: true });

  if (blocksError) {
    console.error('Error fetching blocks:', blocksError);
    blocks = [];
  }

  // Fetch region content
  const regionContent = await fetchRegionContent(resolvedParams.countrySlug, regions || []);

  // Combine all data
  const countryData = {
    ...country,
    regions: regions || [],
    counties: counties || [],
    blocks: blocks || [],
    regionContent: regionContent || {}
  };

  return <CountryPageClient countryData={countryData} />;
}