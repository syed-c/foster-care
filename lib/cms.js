const fs = require('fs');
const path = require('path');
const { formatSlugToTitle } = require('./locationData');

const CONTENT_FILE_PATH = path.join(process.cwd(), 'data', 'content.json');

// Ensure data directory exists
function ensureDataDir() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Get default FAQs for locations
function getDefaultFAQs() {
  return [
    {
      question: "How do I become a foster carer?",
      answer: "Becoming a foster carer involves several steps including an application, assessments, training, and approval process. Contact your local foster agency to begin your journey."
    },
    {
      question: "What are the requirements to be a foster carer?",
      answer: "Requirements vary by agency but typically include being over 21, having a spare room, passing background checks, and completing training programs."
    },
    {
      question: "How long does the fostering process take?",
      answer: "The process typically takes 4-6 months from initial enquiry to approval, depending on your circumstances and the agency."
    }
  ];
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
    last_updated: new Date().toISOString()
  };
  saveAllContent(allContent);
}

// Ensure content exists for a slug, creating default content if needed
function ensureContentExists(slug, defaults = {}) {
  const existingContent = getContentBySlug(slug);
  
  if (existingContent) {
    return existingContent;
  }
  
  const defaultContent = {
    slug,
    title: defaults.title || `Foster Agencies in ${formatSlugToTitle(slug.split('/').pop())}`,
    h1: defaults.h1 || `Find the Best Foster Agencies in ${formatSlugToTitle(slug.split('/').pop())}`,
    description: defaults.description || `Discover top-rated foster agencies in ${formatSlugToTitle(slug.split('/').pop())}. Get support and guidance for your fostering journey.`,
    meta_title: defaults.meta_title || `Foster Agencies in ${formatSlugToTitle(slug.split('/').pop())} | UK Foster Care Directory`,
    meta_description: defaults.meta_description || `Find accredited foster agencies in ${formatSlugToTitle(slug.split('/').pop())}. Expert support and guidance for prospective foster carers.`,
    hero_text: defaults.hero_text || `Find the perfect foster agency in ${formatSlugToTitle(slug.split('/').pop())}`,
    faqs: defaults.faqs || getDefaultFAQs(),
    useful_resources: defaults.useful_resources || [
      {
        title: 'Gov.uk - Fostering',
        url: 'https://www.gov.uk/fostering',
        description: 'Official government information about fostering'
      },
      {
        title: 'Fostering Network',
        url: 'https://www.thefosteringnetwork.org.uk',
        description: 'Support and resources for foster carers'
      }
    ],
    intro_text: defaults.intro_text || `Welcome to our directory of foster agencies in ${formatSlugToTitle(slug.split('/').pop())}. We've compiled a list of accredited and trusted agencies to help you start your fostering journey.`
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

