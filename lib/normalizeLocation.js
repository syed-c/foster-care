export function normalizeLocation(raw = {}) {
  // Handle the new section structure for regions
  let sections = [];
  
  // Check for sections in various possible locations
  if (raw.sections && Array.isArray(raw.sections)) {
    sections = raw.sections;
  } else if (raw.content?.sections && Array.isArray(raw.content.sections)) {
    sections = raw.content.sections;
  } else if (raw.pageSections && Array.isArray(raw.pageSections)) {
    sections = raw.pageSections;
  }
  
  return {
    id: raw.id || raw._id || raw.slug,
    slug: raw.slug || raw.path,
    title: raw.h1 || raw.title || raw.meta?.title || 'Untitled',
    metaTitle: raw.metaTitle || raw.meta?.title || '',
    sections: sections,
    raw,
  };
}