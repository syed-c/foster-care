const { locationSchemas } = require('./lib/locationSchemas');

// Test the country schema
console.log('Country schema sections:');
console.log(JSON.stringify(locationSchemas.country.sections, null, 2));

// Test default content generation
const { getDefaultContent } = require('./lib/locationSchemas');

const countryLocation = {
  id: 'test-country-id',
  name: 'England',
  slug: 'england',
  type: 'country',
  canonical_slug: '/foster-agency/england'
};

const defaultContent = getDefaultContent(countryLocation);
console.log('\nDefault country content:');
console.log(JSON.stringify(defaultContent, null, 2));

// Verify that all sections from the schema are present in the default content
console.log('\nSchema section keys:');
const schemaSectionKeys = locationSchemas.country.sections.map(section => section.key);
console.log(schemaSectionKeys);

console.log('\nDefault content keys:');
const contentKeys = Object.keys(defaultContent);
console.log(contentKeys);

// Check if all schema sections are present in default content
const missingSections = schemaSectionKeys.filter(key => !contentKeys.includes(key));
console.log('\nMissing sections in default content:');
console.log(missingSections);