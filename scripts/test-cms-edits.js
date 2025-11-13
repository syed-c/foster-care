#!/usr/bin/env node

// Script to test CMS edits and verify they reflect on live pages
const { getLocationContentByCanonicalSlug } = require('../services/locationService');
const { normalizeLocation } = require('../lib/normalizeLocation');

async function testCMSEdits() {
  console.log('=== CMS Edit Testing Script ===\n');
  
  // Test location - update this with an actual location in your system
  const testLocation = {
    name: 'Bedford',
    canonicalSlug: '/foster-agency/england/bedford',
    testSection: 'popularCities'
  };
  
  console.log(`Testing edits for ${testLocation.name} (${testLocation.canonicalSlug})...`);
  
  try {
    // Fetch current content from CMS
    const rawContent = await getLocationContentByCanonicalSlug(testLocation.canonicalSlug);
    console.log(`Raw content fetched: ${!!rawContent}`);
    
    if (rawContent) {
      // Normalize content
      const normalizedContent = normalizeLocation(rawContent);
      console.log(`Normalized sections: ${normalizedContent.sections?.length || 0}`);
      
      // Find the section we want to test
      const testSection = normalizedContent.sections?.find(s => 
        s.type === testLocation.testSection || s.key === testLocation.testSection
      );
      
      if (testSection) {
        console.log(`\n=== Testing ${testLocation.testSection} Section ===`);
        console.log(`Section ID: ${testSection.id}`);
        console.log(`Section Type: ${testSection.type || testSection.key}`);
        
        // Display section data
        if (testSection.data) {
          console.log(`Section Data Keys: ${Object.keys(testSection.data).join(', ')}`);
          
          // Show specific fields if they exist
          if (testSection.data.title) {
            console.log(`Title: ${testSection.data.title}`);
          }
          
          if (testSection.data.cities) {
            console.log(`Cities Count: ${testSection.data.cities.length}`);
            testSection.data.cities.slice(0, 3).forEach((city, index) => {
              console.log(`  City ${index + 1}: ${city.name || city.title || 'Unnamed'}`);
            });
          }
          
          if (testSection.data.items) {
            console.log(`Items Count: ${testSection.data.items.length}`);
            testSection.data.items.slice(0, 3).forEach((item, index) => {
              console.log(`  Item ${index + 1}: ${item.name || item.title || 'Unnamed'}`);
            });
          }
        }
        
        console.log('\n=== Test Instructions ===');
        console.log('1. Edit the Popular Cities section title in the CMS admin panel');
        console.log('2. Add a new city to the list');
        console.log('3. Save the changes');
        console.log('4. Run this script again to verify the updates appear');
        console.log('5. Check the live page to confirm changes are visible');
        
      } else {
        console.log(`\nSection ${testLocation.testSection} not found in content`);
        console.log('Available sections:');
        normalizedContent.sections?.forEach((section, index) => {
          console.log(`  ${index + 1}. ${section.type || section.key || 'unnamed'} (ID: ${section.id})`);
        });
      }
    } else {
      console.log(`No content found for ${testLocation.canonicalSlug}`);
      console.log('\n=== Setup Instructions ===');
      console.log('1. Create content for this location in the CMS admin panel');
      console.log('2. Add a Popular Cities section with some cities');
      console.log('3. Save the content');
      console.log('4. Run this script again');
    }
  } catch (error) {
    console.error('Test failed:', error);
    process.exit(1);
  }
  
  console.log('\n=== Test Complete ===');
}

// Run the test
if (require.main === module) {
  testCMSEdits().catch(error => {
    console.error('Test failed:', error);
    process.exit(1);
  });
}

module.exports = { testCMSEdits };