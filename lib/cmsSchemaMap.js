// CMS Schema Map - Mapping between old CMS structure and new frontend structure
export const cmsToFrontendMap = {
  // Country pages
  country: {
    // Hero section
    'hero.heading': 'hero.heading',
    'hero.subheading': 'hero.subheading',
    'hero.cta_primary.text': 'hero.cta_primary.text',
    'hero.cta_primary.link': 'hero.cta_primary.link',
    'hero.cta_secondary.text': 'hero.cta_secondary.text',
    'hero.cta_secondary.link': 'hero.cta_secondary.link',
    
    // Overview section
    'overview.title': 'overview.title',
    'overview.body': 'overview.body',
    
    // Agency Finder section
    'agencyFinder.title': 'agencyFinder.title',
    'agencyFinder.intro': 'agencyFinder.intro',
    'agencyFinder.ctaText': 'agencyFinder.ctaText',
    
    // Popular Locations section
    'popularLocations.title': 'popularLocations.title',
    'popularLocations.description': 'popularLocations.description',
    'popularLocations.locations': 'popularLocations.locations',
    
    // Top Agencies section
    'topAgencies.title': 'topAgencies.title',
    'topAgencies.description': 'topAgencies.description',
    'topAgencies.items': 'topAgencies.items',
    
    // Foster System section
    'fosterSystem.title': 'fosterSystem.title',
    'fosterSystem.sections': 'fosterSystem.sections',
    
    // Why Foster section
    'whyFoster.title': 'whyFoster.title',
    'whyFoster.description': 'whyFoster.description',
    'whyFoster.points': 'whyFoster.points',
    
    // FAQs section
    'faqs.title': 'faqs.title',
    'faqs.description': 'faqs.description',
    'faqs.items': 'faqs.items',
    
    // Regulated section
    'regulated.regulator': 'regulated.regulator',
    'regulated.description': 'regulated.description',
    
    // Find Agencies section
    'findAgencies.title': 'findAgencies.title',
    'findAgencies.description': 'findAgencies.description'
  },
  
  // Region pages
  region: {
    // Hero section
    'hero.heading': 'hero.heading',
    'hero.subheading': 'hero.subheading',
    'hero.cta_primary.text': 'hero.cta_primary.text',
    'hero.cta_primary.link': 'hero.cta_primary.link',
    'hero.cta_secondary.text': 'hero.cta_secondary.text',
    'hero.cta_secondary.link': 'hero.cta_secondary.link',
    
    // About section
    'about.title': 'about.title',
    'about.body': 'about.body',
    
    // Benefits section
    'benefits.title': 'benefits.title',
    'benefits.description': 'benefits.description',
    'benefits.items': 'benefits.items',
    
    // Support section
    'support.title': 'support.title',
    'support.items': 'support.items',
    
    // Training section
    'training.title': 'training.title',
    'training.programs': 'training.programs',
    
    // Popular Cities section
    'popularCities.title': 'popularCities.title',
    'popularCities.description': 'popularCities.description',
    'popularCities.cities': 'popularCities.cities',
    
    // Top Agencies section
    'topAgencies.title': 'topAgencies.title',
    'topAgencies.description': 'topAgencies.description',
    'topAgencies.items': 'topAgencies.items',
    
    // FAQs section
    'faqs.title': 'faqs.title',
    'faqs.description': 'faqs.description',
    'faqs.items': 'faqs.items',
    
    // CTA section
    'cta.title': 'cta.title',
    'cta.description': 'cta.description',
    'cta.cta_primary.text': 'cta.cta_primary.text',
    'cta.cta_primary.link': 'cta.cta_primary.link',
    'cta.cta_secondary.text': 'cta.cta_secondary.text',
    'cta.cta_secondary.link': 'cta.cta_secondary.link'
  },
  
  // City pages
  city: {
    // Hero section
    'hero.heading': 'hero.heading',
    'hero.subheading': 'hero.subheading',
    'hero.cta_primary.text': 'hero.cta_primary.text',
    'hero.cta_primary.link': 'hero.cta_primary.link',
    'hero.cta_secondary.text': 'hero.cta_secondary.text',
    'hero.cta_secondary.link': 'hero.cta_secondary.link',
    
    // About section
    'about.title': 'about.title',
    'about.body': 'about.body',
    
    // Types section
    'types.title': 'types.title',
    'types.description': 'types.description',
    'types.items': 'types.items',
    
    // Top Agencies section
    'topAgencies.title': 'topAgencies.title',
    'topAgencies.description': 'topAgencies.description',
    'topAgencies.items': 'topAgencies.items',
    
    // Why Foster section
    'whyFoster.title': 'whyFoster.title',
    'whyFoster.description': 'whyFoster.description',
    'whyFoster.points': 'whyFoster.points',
    
    // Allowances section
    'allowances.title': 'allowances.title',
    'allowances.description': 'allowances.description',
    'allowances.items': 'allowances.items',
    
    // Resources section
    'resources.title': 'resources.title',
    'resources.description': 'resources.description',
    'resources.items': 'resources.items',
    
    // FAQs section
    'faqs.title': 'faqs.title',
    'faqs.description': 'faqs.description',
    'faqs.items': 'faqs.items',
    
    // Regulated section
    'regulated.regulator': 'regulated.regulator',
    'regulated.description': 'regulated.description',
    
    // CTA section
    'cta.title': 'cta.title',
    'cta.description': 'cta.description',
    'cta.cta_primary.text': 'cta.cta_primary.text',
    'cta.cta_primary.link': 'cta.cta_primary.link',
    'cta.cta_secondary.text': 'cta.cta_secondary.text',
    'cta.cta_secondary.link': 'cta.cta_secondary.link'
  }
};

// Reverse mapping from frontend to CMS
export const frontendToCmsMap = {};
Object.keys(cmsToFrontendMap).forEach(type => {
  frontendToCmsMap[type] = {};
  Object.keys(cmsToFrontendMap[type]).forEach(frontendKey => {
    const cmsKey = cmsToFrontendMap[type][frontendKey];
    frontendToCmsMap[type][cmsKey] = frontendKey;
  });
});