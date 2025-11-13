export function normalizeLocation(raw = {}) {
  return {
    id: raw.id || raw._id || raw.slug,
    slug: raw.slug || raw.path,
    title: raw.h1 || raw.title || raw.meta?.title || 'Untitled',
    metaTitle: raw.metaTitle || raw.meta?.title || '',
    sections: raw.pageSections ?? raw.sections ?? raw.content?.sections ?? [],
    raw,
  };
}