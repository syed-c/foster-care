// Test script to verify location pages work with mock data
const { getLocationContentByCanonicalSlug } = require('./services/locationService');

async function testLocationPages() {
  console.log('Testing location pages with mock data...');
  
  // Test country-level content
  console.log('\n--- Testing Country Level ---');
  const countryContent = await getLocationContentByCanonicalSlug('/foster-agency/england');
  console.log('Country content:', JSON.stringify(countryContent, null, 2));
  
  // Test region-level content
  console.log('\n--- Testing Region Level ---');
  const regionContent = await getLocationContentByCanonicalSlug('/foster-agency/england/greater-london');
  console.log('Region content:', JSON.stringify(regionContent, null, 2));
  
  // Test city-level content
  console.log('\n--- Testing City Level ---');
  const cityContent = await getLocationContentByCanonicalSlug('/foster-agency/england/greater-london/london');
  console.log('City content:', JSON.stringify(cityContent, null, 2));
  
  console.log('\nTest completed successfully!');
}

testLocationPages();