// lib/api/getRegionData.js
import { getLocationContentByCanonicalSlug } from '@/services/locationService';

/**
 * Get region data by country and region slugs
 * @param {Object} params - The parameters
 * @param {string} params.country - The country slug
 * @param {string} params.region - The region slug
 * @returns {Promise<Object|null>} The region data with sections and meta
 */
export async function getRegionData({ country, region }) {
  try {
    // Build the canonical slug
    const canonicalSlug = `/foster-agency/${country}/${region}`;
    console.log('Fetching region data for canonical slug:', canonicalSlug);
    
    // Try to get content from the location content system using canonical slug
    const rawContent = await getLocationContentByCanonicalSlug(canonicalSlug);
    
    if (!rawContent) {
      console.log('No content found for canonical slug:', canonicalSlug);
      return null;
    }
    
    console.log('Raw content fetched:', JSON.stringify(rawContent, null, 2));
    
    // Extract sections and meta data
    let sections = [];
    
    // Handle different content structures
    if (rawContent.sections && Array.isArray(rawContent.sections)) {
      sections = rawContent.sections;
    } else if (rawContent.content?.sections && Array.isArray(rawContent.content.sections)) {
      sections = rawContent.content.sections;
    } else if (rawContent.content_json?.sections && Array.isArray(rawContent.content_json.sections)) {
      sections = rawContent.content_json.sections;
    }
    
    // Extract meta data
    const meta = {
      title: rawContent.meta_title || rawContent.title || `Foster Agencies in ${region}, ${country}`,
      description: rawContent.meta_description || rawContent.description || `Find foster agencies in ${region}, ${country}`
    };
    
    console.log('Extracted sections:', sections.length);
    console.log('Extracted meta:', meta);
    
    return {
      sections,
      meta,
      content: rawContent
    };
  } catch (error) {
    console.error('Error fetching region data:', error);
    return null;
  }
}