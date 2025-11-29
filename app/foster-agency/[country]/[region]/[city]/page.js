import { formatSlugToTitle } from '@/lib/locationData';
import { getLocationContentByCanonicalSlug, extractSectionsFromContent } from '@/services/locationService';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, ArrowRight, ChevronRight, Heart, Users, BookOpen, Award, Shield, Search, Star, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import SectionRenderer from '@/components/sections/SectionRenderer';

// Make sure pages run on dynamic rendering mode
export const dynamic = "force-dynamic";
export const revalidate = 0; // No caching for better debugging

export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const { country, region, city } = resolvedParams;
    const cityName = formatSlugToTitle(city);
    const canonicalSlug = `/foster-agency/${country}/${region}/${city}`;
    
    // Try to get content from the new location content system using canonical slug
    const rawContent = await getLocationContentByCanonicalSlug(canonicalSlug) || {};

    return {
      title: rawContent?.meta_title || rawContent?.title || `Foster Agencies in ${cityName} | UK Directory`,
      description: rawContent?.meta_description || `Find foster agencies in ${cityName}. Discover fostering services and opportunities in your local area.`,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    const resolvedParams = await params;
    const { country, region, city } = resolvedParams;
    const cityName = formatSlugToTitle(city);
    return {
      title: `Foster Agencies in ${cityName} | UK Directory`,
      description: `Find foster agencies in ${cityName}. Discover fostering services and opportunities in your local area.`,
    };
  }
}

export default function CityPage({ params }) {
  return <h1>City Page: {params.city}</h1>;
}
