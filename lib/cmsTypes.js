// CMS Schema Types and Validation

/**
 * @typedef {Object} Button
 * @property {string} text - Button text
 * @property {string} link - Button link URL
 */

/**
 * @typedef {Object} Section
 * @property {string} id - Unique identifier for the section
 * @property {string} title - Section title for CMS
 * @property {string} heading - H1 Title for display on page
 * @property {string} headingType - Heading type (h1, h2, h3, h4, paragraph)
 * @property {string} content - Main content text
 * @property {string} subheading - Subheading text
 * @property {string} [description] - Description for CMS
 * @property {string} [type] - Section type identifier
 * @property {number} order - Display order
 * @property {Button[]} [buttons] - Array of buttons
 */

/**
 * @typedef {Object} LocationContent
 * @property {string} title - Page title
 * @property {string} meta_title - SEO meta title
 * @property {string} h1_title - H1 Title for display on page
 * @property {string} meta_description - SEO meta description
 * @property {string} canonical_slug - Canonical URL slug
 * @property {Section[]} sections - Array of content sections
 */

/**
 * @typedef {Object} PageContent
 * @property {string} title - Page title
 * @property {string} meta_title - SEO meta title
 * @property {string} h1_title - H1 Title for display on page
 * @property {string} meta_description - SEO meta description
 * @property {string} slug - Page slug
 * @property {Section[]} sections - Array of content sections
 */

// Default section structure
export const DEFAULT_SECTION = {
  id: '',
  title: '',
  heading: '',
  headingType: 'h2',
  content: '',
  subheading: '',
  buttons: []
};

// Default location content structure
export const DEFAULT_LOCATION_CONTENT = {
  title: '',
  meta_title: '',
  h1_title: '',
  meta_description: '',
  canonical_slug: '',
  sections: []
};

// Default page content structure
export const DEFAULT_PAGE_CONTENT = {
  title: '',
  meta_title: '',
  h1_title: '',
  meta_description: '',
  slug: '',
  sections: []
};

// Validation functions
export const validateSection = (section) => {
  const errors = {};
  
  if (!section.title?.trim()) {
    errors.title = 'Section title is required';
  }
  
  if (section.headingType && !['h1', 'h2', 'h3', 'h4', 'paragraph'].includes(section.headingType)) {
    errors.headingType = 'Invalid heading type';
  }
  
  // Validate buttons if they exist
  if (section.buttons && Array.isArray(section.buttons)) {
    section.buttons.forEach((button, index) => {
      if (button.text && !button.link) {
        errors[`button_${index}_link`] = 'Button link is required when text is provided';
      }
      if (button.link && !button.text) {
        errors[`button_${index}_text`] = 'Button text is required when link is provided';
      }
    });
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateLocationContent = (content) => {
  const errors = {};
  
  if (!content.title?.trim()) {
    errors.title = 'Title is required';
  }
  
  if (content.meta_title && content.meta_title.length > 60) {
    errors.meta_title = 'Meta title should be less than 60 characters';
  }
  
  if (content.meta_description && content.meta_description.length > 160) {
    errors.meta_description = 'Meta description should be less than 160 characters';
  }
  
  // Validate sections if they exist
  if (content.sections && Array.isArray(content.sections)) {
    content.sections.forEach((section, index) => {
      const sectionValidation = validateSection(section);
      if (!sectionValidation.isValid) {
        errors[`section_${index}`] = sectionValidation.errors;
      }
    });
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validatePageContent = (content) => {
  const errors = {};
  
  if (!content.title?.trim()) {
    errors.title = 'Title is required';
  }
  
  if (!content.slug?.trim()) {
    errors.slug = 'Slug is required';
  }
  
  if (content.meta_title && content.meta_title.length > 60) {
    errors.meta_title = 'Meta title should be less than 60 characters';
  }
  
  if (content.meta_description && content.meta_description.length > 160) {
    errors.meta_description = 'Meta description should be less than 160 characters';
  }
  
  // Validate sections if they exist
  if (content.sections && Array.isArray(content.sections)) {
    content.sections.forEach((section, index) => {
      const sectionValidation = validateSection(section);
      if (!sectionValidation.isValid) {
        errors[`section_${index}`] = sectionValidation.errors;
      }
    });
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// Helper function to format validation errors for display
export const formatValidationErrors = (errors) => {
  const formattedErrors = [];
  
  Object.keys(errors).forEach(key => {
    if (typeof errors[key] === 'object' && errors[key] !== null) {
      // Nested errors (like section errors)
      Object.keys(errors[key]).forEach(subKey => {
        formattedErrors.push(`${key}: ${errors[key][subKey]}`);
      });
    } else {
      // Top-level errors
      formattedErrors.push(`${key}: ${errors[key]}`);
    }
  });
  
  return formattedErrors;
};