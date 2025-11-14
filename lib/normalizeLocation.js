export function normalizeLocation(raw = {}) {
  // Handle the new section structure for regions
  let sections = [];
  
  // Log the raw content for debugging
  console.log('normalizeLocation called with:', JSON.stringify(raw, null, 2));
  
  // Check for sections in various possible locations
  if (raw.sections && Array.isArray(raw.sections)) {
    sections = raw.sections;
  } else if (raw.content?.sections && Array.isArray(raw.content.sections)) {
    sections = raw.content.sections;
  } else if (raw.pageSections && Array.isArray(raw.pageSections)) {
    sections = raw.pageSections;
  } else if (raw.content_json && typeof raw.content_json === 'object' && !Array.isArray(raw.content_json)) {
    // Handle content_json structure
    if (raw.content_json.sections && Array.isArray(raw.content_json.sections)) {
      sections = raw.content_json.sections;
    } else {
      // Check if the content_json has section-like properties
      const contentKeys = Object.keys(raw.content_json);
      console.log('content_json keys:', contentKeys);
      
      // If we have section-like properties, create sections array
      if (contentKeys.length > 0 && !contentKeys.includes('sections')) {
        // Convert flat content structure to sections
        sections = contentKeys
          .filter(key => typeof raw.content_json[key] === 'object' && raw.content_json[key] !== null)
          .map(key => ({
            type: key,
            key: key,
            data: raw.content_json[key]
          }));
      }
    }
  }
  
  console.log('Extracted sections:', JSON.stringify(sections, null, 2));
  
  return {
    id: raw.id || raw._id || raw.slug || raw.canonical_slug,
    slug: raw.slug || raw.path || raw.canonical_slug,
    title: raw.h1 || raw.title || raw.meta?.title || raw.meta_title || 'Untitled',
    metaTitle: raw.metaTitle || raw.meta?.title || raw.meta_title || '',
    sections: sections,
    raw,
  };
}