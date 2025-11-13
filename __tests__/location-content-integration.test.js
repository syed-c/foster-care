import { locationSchemas, getDefaultContent } from '../lib/locationSchemas';

describe('Location Content Integration', () => {
  test('Country template has all required sections', () => {
    const countrySchema = locationSchemas.country;
    expect(countrySchema).toBeDefined();
    
    const requiredSections = [
      'hero', 'overview', 'agencyFinder', 'popularLocations', 
      'topAgencies', 'fosterSystem', 'whyFoster', 'faqs', 
      'regulated', 'findAgencies'
    ];
    
    requiredSections.forEach(sectionKey => {
      const section = countrySchema.sections.find(s => s.key === sectionKey);
      expect(section).toBeDefined();
      expect(section.label).toBeDefined();
      expect(section.description).toBeDefined();
    });
  });

  test('Region template has all required sections', () => {
    const regionSchema = locationSchemas.county;
    expect(regionSchema).toBeDefined();
    
    const requiredSections = [
      'hero', 'about', 'benefits', 'support', 'training',
      'popularCities', 'topAgencies', 'faqs', 'cta'
    ];
    
    requiredSections.forEach(sectionKey => {
      const section = regionSchema.sections.find(s => s.key === sectionKey);
      expect(section).toBeDefined();
      expect(section.label).toBeDefined();
      expect(section.description).toBeDefined();
    });
  });

  test('City template has all required sections', () => {
    const citySchema = locationSchemas.city;
    expect(citySchema).toBeDefined();
    
    const requiredSections = [
      'hero', 'about', 'types', 'topAgencies', 'whyFoster',
      'allowances', 'resources', 'faqs', 'regulated', 'cta'
    ];
    
    requiredSections.forEach(sectionKey => {
      const section = citySchema.sections.find(s => s.key === sectionKey);
      expect(section).toBeDefined();
      expect(section.label).toBeDefined();
      expect(section.description).toBeDefined();
    });
  });

  test('Default content generation works for all location types', () => {
    const countryLocation = { type: 'country', name: 'England', slug: 'england' };
    const regionLocation = { type: 'region', name: 'Greater London', slug: 'greater-london' };
    const cityLocation = { type: 'city', name: 'London', slug: 'london' };
    
    const countryContent = getDefaultContent(countryLocation);
    const regionContent = getDefaultContent(regionLocation);
    const cityContent = getDefaultContent(cityLocation);
    
    // Check that all required sections are present in generated content
    expect(countryContent.hero).toBeDefined();
    expect(countryContent.overview).toBeDefined();
    expect(countryContent.agencyFinder).toBeDefined();
    expect(countryContent.popularLocations).toBeDefined();
    expect(countryContent.topAgencies).toBeDefined();
    expect(countryContent.fosterSystem).toBeDefined();
    expect(countryContent.whyFoster).toBeDefined();
    expect(countryContent.faqs).toBeDefined();
    expect(countryContent.regulated).toBeDefined();
    expect(countryContent.findAgencies).toBeDefined();
    
    expect(regionContent.hero).toBeDefined();
    expect(regionContent.about).toBeDefined();
    expect(regionContent.benefits).toBeDefined();
    expect(regionContent.support).toBeDefined();
    expect(regionContent.training).toBeDefined();
    expect(regionContent.popularCities).toBeDefined();
    expect(regionContent.topAgencies).toBeDefined();
    expect(regionContent.faqs).toBeDefined();
    expect(regionContent.cta).toBeDefined();
    
    expect(cityContent.hero).toBeDefined();
    expect(cityContent.about).toBeDefined();
    expect(cityContent.types).toBeDefined();
    expect(cityContent.topAgencies).toBeDefined();
    expect(cityContent.whyFoster).toBeDefined();
    expect(cityContent.allowances).toBeDefined();
    expect(cityContent.resources).toBeDefined();
    expect(cityContent.faqs).toBeDefined();
    expect(cityContent.regulated).toBeDefined();
    expect(cityContent.cta).toBeDefined();
  });
});