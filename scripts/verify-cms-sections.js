#!/usr/bin/env node

// Script to verify that CMS edits reflect on live pages
const { getLocationContentByCanonicalSlug } = require('../services/locationService');
const { normalizeLocation } = require('../lib/normalizeLocation');

async function verifyCMSSections() {
  console.log('=== CMS Section Verification Script ===\n');
  
  // Test cases - these should be updated with actual locations in your system
  const testLocations = [
    {
      name: 'England',
      canonicalSlug: '/foster-agency/england',
      expectedSections: ['hero', 'overview', 'agencyFinder']
    },
    {
      name: 'Greater London',
      canonicalSlug: '/foster-agency/england/greater-london',
      expectedSections: ['hero', 'about', 'popularCities', 'topAgencies']
    },
    {
      name: 'London',
      canonicalSlug: '/foster-agency/england/greater-london/london',
      expectedSections: ['hero', 'about', 'topAgencies']
    }
  ];
  
  for (const location of testLocations) {
    console.log(`Testing ${location.name} (${location.canonicalSlug})...`);
    
    try {
      // Fetch content from CMS
      const rawContent = await getLocationContentByCanonicalSlug(location.canonicalSlug);
      console.log(`  Raw content fetched: ${!!rawContent}`);
      
      if (rawContent) {
        // Normalize content
        const normalizedContent = normalizeLocation(rawContent);
        console.log(`  Normalized content sections: ${normalizedContent.sections?.length || 0}`);
        
        // Check if sections are present
        if (normalizedContent.sections && normalizedContent.sections.length > 0) {
          console.log(`  ✓ Sections found: ${normalizedContent.sections.length}`);
          
          // List section types
          const sectionTypes = normalizedContent.sections.map(s => s.type || s.key).filter(Boolean);
          console.log(`  Section types: ${sectionTypes.join(', ')}`);
          
          // Check for expected sections
          const missingSections = location.expectedSections.filter(expected => 
            !sectionTypes.includes(expected)
          );
          
          if (missingSections.length === 0) {
            console.log(`  ✓ All expected sections present`);
          } else {
            console.log(`  ⚠ Missing sections: ${missingSections.join(', ')}`);
          }
        } else {
          console.log(`  ✗ No sections found in normalized content`);
        }
      } else {
        console.log(`  ✗ No content found for ${location.canonicalSlug}`);
      }
    } catch (error) {
      console.error(`  ✗ Error testing ${location.name}:`, error.message);
    }
    
    console.log(''); // Empty line for readability
  }
  
  console.log('=== Verification Complete ===');
}

// Run the verification
if (require.main === module) {
  verifyCMSSections().catch(error => {
    console.error('Verification failed:', error);
    process.exit(1);
  });
}

module.exports = { verifyCMSSections };