// Test file for location pages
const fs = require('fs');
const path = require('path');

// Test that the location page files exist
describe('Location Page Files', () => {
  test('Region page file exists', () => {
    const regionPagePath = path.join(__dirname, '..', 'app', 'foster-agency', '[country]', '[region]', 'page.js');
    expect(fs.existsSync(regionPagePath)).toBe(true);
  });

  test('City page file exists', () => {
    const cityPagePath = path.join(__dirname, '..', 'app', 'foster-agency', '[country]', '[region]', '[city]', 'page.js');
    expect(fs.existsSync(cityPagePath)).toBe(true);
  });

  test('Location content migration file exists', () => {
    const migrationPath = path.join(__dirname, '..', 'migrations', 'add-location-content-hierarchy.sql');
    expect(fs.existsSync(migrationPath)).toBe(true);
  });

  test('Mock location content file exists', () => {
    const mockContentPath = path.join(__dirname, '..', 'data', 'mock-location-content.json');
    expect(fs.existsSync(mockContentPath)).toBe(true);
  });

  test('SQL import file exists', () => {
    const sqlImportPath = path.join(__dirname, '..', 'data', 'import-location-content.sql');
    expect(fs.existsSync(sqlImportPath)).toBe(true);
  });
});

// Test the structure of the mock location content
describe('Mock Location Content', () => {
  let mockContent;
  
  beforeAll(() => {
    const mockContentPath = path.join(__dirname, '..', 'data', 'mock-location-content.json');
    mockContent = JSON.parse(fs.readFileSync(mockContentPath, 'utf8'));
  });

  test('Mock content contains expected number of entries', () => {
    expect(mockContent.length).toBe(14);
  });

  test('Mock content includes country entries', () => {
    const countryEntries = mockContent.filter(entry => entry.template_type === 'country');
    expect(countryEntries.length).toBe(4);
  });

  test('Mock content includes region entries', () => {
    const regionEntries = mockContent.filter(entry => entry.template_type === 'region');
    expect(regionEntries.length).toBe(5);
  });

  test('Mock content includes city entries', () => {
    const cityEntries = mockContent.filter(entry => entry.template_type === 'city');
    expect(cityEntries.length).toBe(5);
  });

  test('All entries have required fields', () => {
    mockContent.forEach(entry => {
      expect(entry).toHaveProperty('id');
      expect(entry).toHaveProperty('location_id');
      expect(entry).toHaveProperty('template_type');
      expect(entry).toHaveProperty('canonical_slug');
      expect(entry).toHaveProperty('content_json');
      expect(entry).toHaveProperty('hierarchy_path');
    });
  });

  test('Country entries have correct structure', () => {
    const countryEntries = mockContent.filter(entry => entry.template_type === 'country');
    countryEntries.forEach(entry => {
      expect(entry.country_id).toBe(entry.location_id);
      expect(entry.region_id).toBeUndefined();
      expect(entry.city_id).toBeUndefined();
      expect(entry.hierarchy_path).toMatch(/^\/[^/]+$/);
    });
  });

  test('Region entries have correct structure', () => {
    const regionEntries = mockContent.filter(entry => entry.template_type === 'region');
    regionEntries.forEach(entry => {
      expect(entry.country_id).toBeDefined();
      expect(entry.region_id).toBe(entry.location_id);
      expect(entry.city_id).toBeUndefined();
      expect(entry.hierarchy_path).toMatch(/^\/[^/]+\/[^/]+$/);
    });
  });

  test('City entries have correct structure', () => {
    const cityEntries = mockContent.filter(entry => entry.template_type === 'city');
    cityEntries.forEach(entry => {
      expect(entry.country_id).toBeDefined();
      expect(entry.region_id).toBeDefined();
      expect(entry.city_id).toBe(entry.location_id);
      expect(entry.hierarchy_path).toMatch(/^\/[^/]+\/[^/]+\/[^/]+$/);
    });
  });
});