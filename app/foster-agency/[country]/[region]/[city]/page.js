import { generateCityPaths, formatSlugToTitle, loadAllLocations } from '@/lib/locationData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLocationContentByCanonicalSlug } from '@/services/locationService';
import SectionRenderer from '@/components/sections/SectionRenderer';
import DynamicLocationSections from '@/components/DynamicLocationSections';

// Make sure pages run on dynamic rendering mode
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateStaticParams() {
  const paths = await generateCityPaths();
  return paths;
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { country, region, city } = resolvedParams;
  const canonicalSlug = `/foster-agency/${country}/${region}/${city}`;

  const content = await getLocationContentByCanonicalSlug(canonicalSlug) || {};
  const cityName = formatSlugToTitle(city);
  const regionName = formatSlugToTitle(region);
  const countryName = formatSlugToTitle(country);

  return {
    title: content?.meta_title || `Foster Agencies in ${cityName}, ${regionName} | UK Directory`,
    description:
      content?.meta_description ||
      `Find foster agencies in ${cityName}, ${regionName}. Browse trusted fostering services.`
  };
}

export default async function CityPage({ params }) {
  const resolvedParams = await params;
  const { country, region, city } = resolvedParams;
  const canonicalSlug = `/foster-agency/${country}/${region}/${city}`;
  
  const content = await getLocationContentByCanonicalSlug(canonicalSlug);

  // CityPage should NEVER return early when content is empty
  // Always render default layout + dynamic sections below

  let sections = [];

  // Safely process content sections with better error handling
  try {
    if (content?.sections && Array.isArray(content.sections)) {
      sections = content.sections.filter(section => section && typeof section === 'object');
    } else if (content?.content_json?.sections && Array.isArray(content.content_json.sections)) {
      sections = content.content_json.sections.filter(section => section && typeof section === 'object');
    } else if (content?.content_json && typeof content.content_json === 'object') {
      sections = Object.keys(content.content_json)
        .filter(key => 
          typeof content.content_json[key] === 'object' && 
          content.content_json[key] !== null &&
          key !== 'meta_title' && 
          key !== 'meta_description' && 
          key !== 'title'
        )
        .map(key => ({
          type: key,
          key,
          data: content.content_json[key]
        }))
        .filter(section => section && typeof section === 'object');
    } else if (typeof content === 'object') {
      sections = Object.keys(content)
        .filter(
          key =>
            typeof content[key] === 'object' &&
            content[key] !== null &&
            key !== 'meta_title' &&
            key !== 'meta_description' &&
            key !== 'title'
        )
        .map(key => ({
          type: key,
          key,
          data: content[key]
        }))
        .filter(section => section && typeof section === 'object');
    }
  } catch (error) {
    console.error('Error processing content sections:', error);
    // Return notFound if we can't process sections properly
    return notFound();
  }

  // Filter out any invalid sections
  sections = sections.filter(section => 
    section && 
    typeof section === 'object' && 
    (section.type || section.key)
  );

  // CityPage should NEVER return early when sections are empty
  // Always render default layout + dynamic sections below

  return (
    <div className="min-h-screen bg-background-offwhite">
      {sections.map((section, i) => (
        <SectionRenderer
          key={section.id || section.key || section.type || i}
          section={section}
        />
      ))}
      
      {/* Dynamic Location Sections */}
      <DynamicLocationSections 
        country={country}
        region={region}
        city={city}
      />
    </div>
  );
}
