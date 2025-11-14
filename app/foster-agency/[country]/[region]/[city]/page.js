import { generateCityPaths, formatSlugToTitle, loadAllLocations } from '@/lib/locationData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getLocationContentByCanonicalSlug } from '@/services/locationService';
import SectionRenderer from '@/components/sections/SectionRenderer';

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

  if (!content) {
    return notFound();
  }

  let sections = [];

  if (content?.sections && Array.isArray(content.sections)) {
    sections = content.sections;
  } else if (content?.content_json?.sections && Array.isArray(content.content_json.sections)) {
    sections = content.content_json.sections;
  } else if (content?.content_json && typeof content.content_json === 'object') {
    sections = Object.keys(content.content_json)
      .filter(key => typeof content.content_json[key] === 'object' && content.content_json[key] !== null)
      .map(key => ({
        type: key,
        key,
        data: content.content_json[key]
      }));
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
      }));
  }

  if (!sections.length) {
    return notFound();
  }

  return (
    <div className="min-h-screen bg-background-offwhite">
      {sections.map((section, i) => (
        <SectionRenderer
          key={section.id || section.key || section.type || i}
          section={section}
        />
      ))}
    </div>
  );
}
