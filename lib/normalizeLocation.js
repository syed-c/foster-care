export function normalizeLocation(raw = {}) {
  // Handle the new section structure for regions
  let sections = [];
  
  // Log the raw content for debugging
  console.log('normalizeLocation called with:', JSON.stringify(raw, null, 2));
  
  // Extract meta fields
  const meta_title = raw.meta_title || raw.meta?.title || raw.title;
  const meta_description = raw.meta_description || raw.meta?.description;
  const title = raw.title || raw.h1 || raw.meta?.title || 'Untitled';
  
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
    title: title,
    metaTitle: meta_title,
    metaDescription: meta_description,
    sections: sections,
    raw,
  };
}

// Utility function to extract sections from location content
export function extractSectionsFromContent(content) {
  console.log('extractSectionsFromContent called with:', JSON.stringify(content, null, 2));
  let sections = [];
  
  if (content && typeof content === 'object') {
    // Handle content_json structure (this is the main case for our data)
    if (content.content_json && typeof content.content_json === 'object') {
      const contentJson = content.content_json;
      console.log('Processing content_json:', JSON.stringify(contentJson, null, 2));
      if (Array.isArray(contentJson.sections)) {
        sections = contentJson.sections;
        console.log('Found sections array in content_json:', sections.length);
      } else if (typeof contentJson === 'object' && !Array.isArray(contentJson)) {
        // Convert flat content structure to sections
        sections = Object.keys(contentJson)
          .filter(key => typeof contentJson[key] === 'object' && contentJson[key] !== null)
          .map(key => ({
            type: key,
            key: key,
            data: contentJson[key]
          }));
        console.log('Converted flat content to sections:', sections.length);
      }
    } 
    // Handle case where content itself is the flat structure with sections
    else if (!content.content_json && !content.sections) {
      // Check if content has section-like properties directly
      const contentKeys = Object.keys(content);
      console.log('Processing direct content with keys:', contentKeys);
      
      // Convert flat content structure to sections
      sections = contentKeys
        .filter(key => typeof content[key] === 'object' && content[key] !== null && key !== 'id' && key !== 'canonical_slug' && key !== 'title' && key !== 'meta_title' && key !== 'meta_description')
        .map(key => ({
          type: key,
          key: key,
          data: content[key]
        }));
      console.log('Converted direct content to sections:', sections.length);
    }
    // Handle sections array directly in content
    else if (Array.isArray(content.sections)) {
      sections = content.sections;
      console.log('Found sections array directly in content:', sections.length);
    }
  }
  
  console.log('Returning sections:', JSON.stringify(sections, null, 2));
  return sections;
}
