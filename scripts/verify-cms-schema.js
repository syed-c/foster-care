#!/usr/bin/env node

// Script to verify CMS schema mapping and dynamic section rendering

const { cmsToFrontendMap, frontendToCmsMap } = require('../lib/cmsSchemaMap');
const { normalizeLocation } = require('../lib/normalizeLocation');
const { updateNested } = require('../lib/updateNested');

// Test data structure
const testCmsData = {
  id: 'test-region-1',
  slug: 'test-region',
  title: 'Test Region Page',
  meta_title: 'Test Region - Foster Care Directory',
  meta_description: 'Test region description',
  sections: [
    {
      id: 'hero-1',
      type: 'hero',
      data: {
        heading: 'Welcome to Test Region',
        subheading: 'Find foster agencies in Test Region',
        cta_primary: {
          text: 'Get Started',
          link: '/contact'
        },
        cta_secondary: {
          text: 'Learn More',
          link: '#learn-more'
        }
      }
    },
    {
      id: 'overview-1',
      type: 'overview',
      data: {
        title: 'About Fostering in Test Region',
        body: '<p>Test region overview content</p>'
      }
    },
    {
      id: 'benefits-1',
      type: 'benefits',
      data: {
        title: 'Benefits and Support',
        description: 'Comprehensive support for foster carers',
        items: [
          {
            title: 'Financial Support',
            description: 'Weekly allowances to cover child care costs'
          },
          {
            title: 'Training',
            description: 'Comprehensive training programs'
          }
        ]
      }
    }
  ]
};

// Test the normalizeLocation function
console.log('Testing normalizeLocation function...');
const normalized = normalizeLocation(testCmsData);
console.log('Normalized data:', JSON.stringify(normalized, null, 2));

// Test the updateNested function
console.log('\nTesting updateNested function...');
const updated = updateNested(testCmsData, 'sections.0.data.heading', 'Updated Hero Heading');
console.log('Updated data:', JSON.stringify(updated, null, 2));

// Test the CMS schema mapping
console.log('\nTesting CMS schema mapping...');
console.log('CMS to Frontend mapping for region:', cmsToFrontendMap.region);
console.log('Frontend to CMS mapping for region:', frontendToCmsMap.region);

// Verify that all sections have the required fields
console.log('\nVerifying section structure...');
if (normalized.sections && Array.isArray(normalized.sections)) {
  normalized.sections.forEach((section, index) => {
    console.log(`Section ${index + 1}:`);
    console.log(`  ID: ${section.id}`);
    console.log(`  Type: ${section.type}`);
    console.log(`  Has data: ${!!section.data}`);
    
    if (!section.id) {
      console.warn(`  WARNING: Section ${index + 1} is missing ID`);
    }
    
    if (!section.type) {
      console.warn(`  WARNING: Section ${index + 1} is missing type`);
    }
    
    if (!section.data) {
      console.warn(`  WARNING: Section ${index + 1} is missing data`);
    }
  });
} else {
  console.warn('No sections found in normalized data');
}

console.log('\nVerification complete!');