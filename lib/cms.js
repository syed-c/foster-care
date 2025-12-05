const fs = require('fs');
const path = require('path');
const { formatSlugToTitle } = require('./locationData');
const { getDefaultContent, locationSchemas } = require('./locationSchemas');

const CONTENT_FILE_PATH = path.join(process.cwd(), 'data', 'content.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Load all content from the CMS
function loadAllContent() {
  ensureDataDir();
  
  if (!fs.existsSync(CONTENT_FILE_PATH)) {
    return {};
  }
  
  try {
    const content = fs.readFileSync(CONTENT_FILE_PATH, 'utf8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading content.json:', error);
    return {};
  }
}

// Save all content to the CMS
function saveAllContent(content) {
  ensureDataDir();
  fs.writeFileSync(CONTENT_FILE_PATH, JSON.stringify(content, null, 2));
}

// Get content by slug
function getContentBySlug(slug) {
  const allContent = loadAllContent();
  return allContent[slug] || null;
}

// Save content for a specific location
function saveContent(content) {
  const allContent = loadAllContent();
  allContent[content.slug] = {
    ...content,
    last_updated: new Date().toISOString(),
    template_type: content.template_type || 'city'
  };
  saveAllContent(allContent);
}

// Ensure content exists for a slug, creating default content if needed
function ensureContentExists(slug, location = null) {
  const existingContent = getContentBySlug(slug);
  
  if (existingContent) {
    return existingContent;
  }
  
  // If we have location info, use the appropriate default content
  if (location) {
    const defaultContent = {
      ...getDefaultContent(location),
      slug: slug,
      template_type: location.type || 'city'
    };
    saveContent(defaultContent);
    return defaultContent;
  }
  
  // Fallback to generic content
  const locationName = formatSlugToTitle(slug.split('/').pop());
  const defaultContent = {
    slug,
    title: `Foster Agencies in ${locationName}`,
    meta_title: `Foster Agencies in ${locationName} | UK Foster Care Directory`,
    meta_description: `Find accredited foster agencies in ${locationName}. Expert support and guidance for prospective foster carers.`,
    last_updated: new Date().toISOString(),
    template_type: 'city' // default
  };
  
  saveContent(defaultContent);
  return defaultContent;
}

// Update content for a specific location
function updateContent(slug, updates) {
  const existingContent = getContentBySlug(slug) || ensureContentExists(slug);
  const updatedContent = { ...existingContent, ...updates, slug };
  saveContent(updatedContent);
  return updatedContent;
}

// Search content by title or description
function searchContent(query) {
  const allContent = loadAllContent();
  const lowerQuery = query.toLowerCase();
  
  return Object.values(allContent).filter(content => 
    (content.title && content.title.toLowerCase().includes(lowerQuery)) ||
    (content.description && content.description.toLowerCase().includes(lowerQuery)) ||
    (content.h1 && content.h1.toLowerCase().includes(lowerQuery))
  );
}

module.exports = {
  loadAllContent,
  saveAllContent,
  getContentBySlug,
  saveContent,
  ensureContentExists,
  updateContent,
  searchContent
};