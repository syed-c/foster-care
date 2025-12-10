import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import CountryPageClient from './CountryPageClient.tsx';

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

  // Combine all data
  const countryData = {
    ...country,
    regions: regions || [],
    counties: counties || [],
    blocks: blocks || []
  };

  return <CountryPageClient countryData={countryData} />;
}