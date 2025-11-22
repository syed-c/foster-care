import { generateRegionPaths, formatSlugToTitle } from '@/lib/locationData';
import { 
  getLocationContentByCanonicalSlug, 
  getAgenciesByRegion, 
  getCitiesByRegion 
} from '@/services/locationService';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import RegionSectionRenderer from '@/components/sections/RegionSectionRenderer';
import CitiesGridSection from '@/components/locations/CitiesGridSection';
import TopAgenciesSection from '@/components/locations/TopAgenciesSection';

// Make sure pages run on dynamic rendering mode
export const dynamic = "force-dynamic";
export const revalidate = 60;

export async function generateStaticParams() {
  const paths = await generateRegionPaths();
  return paths;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { country, region } = resolvedParams;
  const countryName = formatSlugToTitle(country);
  const regionName = formatSlugToTitle(region);
  const canonicalSlug = `/foster-agency/${country}/${region}`;
  
  // Try to get content from the new location content system using canonical slug
  const content = await getLocationContentByCanonicalSlug(canonicalSlug) || {};

  return {
    title: content?.meta_title || `Foster Agencies in ${regionName}, ${countryName} | UK Directory`,
    description: content?.meta_description || `Find foster agencies in ${regionName}, ${countryName}. Browse cities and discover fostering services in your area.`,
  };
}

export default async function RegionPage({ params }) {
  const resolvedParams = await params;
  const { country, region } = resolvedParams;
  
  // Build the canonical slug
  const canonicalSlug = `/foster-agency/${country}/${region}`;
  
  // Fetch content from Supabase using canonical slug
  const content = await getLocationContentByCanonicalSlug(canonicalSlug);
  
  // RegionPage should NEVER return early when content is empty
  // Always render default layout + dynamic sections below
  
  // Extract sections from content - handle both flat content and sections array
  let sections = [];

  // Check if content has a sections array directly
  if (content?.sections && Array.isArray(content.sections)) {
    sections = content.sections;
  } 
  // Check if content has content_json with a sections array
  else if (content?.content_json?.sections && Array.isArray(content.content_json.sections)) {
    sections = content.content_json.sections;
  } 
  // Check if content.content_json is an object with section-like properties
  else if (content?.content_json && typeof content.content_json === "object" && !Array.isArray(content.content_json)) {
    const contentKeys = Object.keys(content.content_json);
    
    // If we have section-like properties, create sections array
    if (contentKeys.length > 0) {
      sections = contentKeys
        .filter(key => typeof content.content_json[key] === "object" && content.content_json[key] !== null)
        .map(key => ({
          type: key,
          key: key,
          data: content.content_json[key]
        }));
    }
  }
  // Check if content directly has section-like properties (flat structure)
  else if (content && typeof content === "object" && !Array.isArray(content)) {
    const contentKeys = Object.keys(content);
    
    // If we have section-like properties, create sections array
    if (contentKeys.length > 0) {
      sections = contentKeys
        .filter(key => typeof content[key] === "object" && content[key] !== null && key !== 'meta_title' && key !== 'meta_description' && key !== 'title')
        .map(key => ({
          type: key,
          key: key,
          data: content[key]
        }));
    }
  }
  
  // Fetch agencies and cities for dynamic lists (with error handling)
  let agencies = [];
  let cities = [];
  
  try {
    agencies = await getAgenciesByRegion(region, 12);
  } catch (error) {
    console.log('Error fetching agencies:', error.message);
  }
  
  try {
    cities = await getCitiesByRegion(region, 12);
  } catch (error) {
    console.log('Error fetching cities:', error.message);
  }
  
  // Render sections
  return (
    <div className="min-h-screen bg-background-offwhite">
      {sections.map((section, i) => (
        <RegionSectionRenderer
          key={section.id || section.key || section.type || i}
          section={section}
          regionSlug={region}
          agencies={agencies}
          cities={cities}
        />
      ))}
      
      {/* Cities Grid Section */}
      <CitiesGridSection 
        country={country}
        region={region}
        cities={cities}
      />
      
      {/* Top Agencies Section */}
      <TopAgenciesSection 
        locationType="region"
        locationName={region}
        agencies={agencies}
      />
    </div>
  );
}