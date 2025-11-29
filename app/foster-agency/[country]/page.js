import { notFound } from "next/navigation";
import Link from "next/link";
import { formatSlugToTitle } from "@/lib/locationData";
import { getLocationContentByCanonicalSlug, extractSectionsFromContent } from "@/services/locationService";
import SectionRenderer from "@/components/sections/SectionRenderer";

export default async function CountryPage({ params }) {
  const resolvedParams = await params;
  const { country } = resolvedParams;
  if (!country) return notFound();

  const countryName = formatSlugToTitle(country);
  
  // LOAD CMS CONTENT
  const canonicalSlug = `/foster-agency/${country}`;
  let rawContent = {};
  try {
    rawContent = await getLocationContentByCanonicalSlug(canonicalSlug) || {};
  } catch (e) {
    console.error("CMS load failed:", e);
    rawContent = {};
  }

  const sections = extractSectionsFromContent(rawContent) || [];

  // Map sections by type
  const sectionMap = {};
  for (const section of sections) {
    if (!section?.type) continue;
    if (!sectionMap[section.type]) {
      sectionMap[section.type] = section;
    }
  }

  // SECTION ORDER
  const orderedTypes = [
    'breadcrumb',
    'hero',
    'overview',
    'systemInfo',
    'reasons',
    'featuredAreas',
    'regionsGrid',
    'faq',
    'trustBar',
    'finalCta'
  ];

  return (
    <div className="min-h-screen bg-background-offwhite">
      {/* Render CMS sections */}
      {Array.isArray(sections) && sections.length > 0 ? (
        orderedTypes
          .map(type => sectionMap[type])
          .filter(Boolean)
          .map(section => (
            <SectionRenderer key={section.type} section={section} />
          ))
      ) : (
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">CMS Content Coming Soon</h2>
            <p className="text-gray-600 mb-8">
              This page is under construction. Please check back later or contact the administrator.
            </p>
            <div className="bg-gray-100 border border-gray-300 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Default Content Preview</h3>
              <p className="text-gray-600">
                Welcome to our directory of foster agencies in {countryName}. We're working on adding 
                detailed information about fostering opportunities in this area. In the meantime, 
                you can explore other regions or contact us for more information.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Make sure pages run on dynamic rendering mode
export const dynamic = "force-dynamic";
export const revalidate = 0; // No caching for better debugging

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({ params }) {
  try {
    const resolvedParams = await params;
    const { country } = resolvedParams;
    const countryName = formatSlugToTitle(country);
    const canonicalSlug = `/foster-agency/${country}`;
    
    // Try to get content from the new location content system using canonical slug
    let rawContent = {};
    try {
      rawContent = await getLocationContentByCanonicalSlug(canonicalSlug) || {};
    } catch (e) {
      console.error("Metadata CMS load failed:", e);
      rawContent = {};
    }

    return {
      title: rawContent?.meta_title || rawContent?.title || `Foster Agencies in ${countryName} | UK Directory`,
      description: rawContent?.meta_description || `Find foster agencies in ${countryName}. Browse regions and cities to discover fostering services near you.`,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    const resolvedParams = await params;
    const { country } = resolvedParams;
    const countryName = formatSlugToTitle(country);
    return {
      title: `Foster Agencies in ${countryName} | UK Directory`,
      description: `Find foster agencies in ${countryName}. Browse regions and cities to discover fostering services near you.`,
    };
  }
}