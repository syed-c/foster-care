#!/usr/bin/env node

// Script to generate mock location content for testing
const fs = require('fs');
const path = require('path');

// Mock location data
const mockLocations = {
  countries: [
    { id: 'england', name: 'England', slug: 'england' },
    { id: 'scotland', name: 'Scotland', slug: 'scotland' },
    { id: 'wales', name: 'Wales', slug: 'wales' },
    { id: 'northern-ireland', name: 'Northern Ireland', slug: 'northern-ireland' }
  ],
  regions: [
    { id: 'greater-london', name: 'Greater London', slug: 'greater-london', country_id: 'england' },
    { id: 'west-midlands', name: 'West Midlands', slug: 'west-midlands', country_id: 'england' },
    { id: 'greater-manchester', name: 'Greater Manchester', slug: 'greater-manchester', country_id: 'england' },
    { id: 'glasgow-city', name: 'Glasgow City', slug: 'glasgow-city', country_id: 'scotland' },
    { id: 'cardiff', name: 'Cardiff', slug: 'cardiff', country_id: 'wales' }
  ],
  cities: [
    { id: 'london', name: 'London', slug: 'london', region_id: 'greater-london', country_id: 'england' },
    { id: 'birmingham', name: 'Birmingham', slug: 'birmingham', region_id: 'west-midlands', country_id: 'england' },
    { id: 'manchester', name: 'Manchester', slug: 'manchester', region_id: 'greater-manchester', country_id: 'england' },
    { id: 'glasgow', name: 'Glasgow', slug: 'glasgow', region_id: 'glasgow-city', country_id: 'scotland' },
    { id: 'cardiff-city', name: 'Cardiff', slug: 'cardiff', region_id: 'cardiff', country_id: 'wales' }
  ]
};

// Function to generate default content for a location
function generateDefaultContent(location, type) {
  const locationName = location.name;
  
  switch (type) {
    case 'country':
      return {
        title: `Foster Agencies in ${locationName}`,
        meta_title: `Foster Agencies in ${locationName} | UK Foster Care Directory`,
        meta_description: `Find accredited foster agencies in ${locationName}. Expert support and guidance for prospective foster carers.`,
        hero: {
          heading: `Foster Agencies in ${locationName}`,
          subheading: `Find accredited foster agencies in ${locationName}`,
          cta_primary: { text: "Get Foster Agency Support", link: "/contact" },
          cta_secondary: { text: "Explore Regions", link: "#regions" }
        },
        overview: {
          title: `About Fostering in ${locationName}`,
          body: `Welcome to our directory of foster agencies in ${locationName}. We've compiled a list of accredited and trusted agencies to help you start your fostering journey. Fostering in ${locationName} offers a rewarding opportunity to make a positive impact on a child's life while being part of a supportive community.`
        }
      };
      
    case 'region':
      return {
        title: `Foster Agencies in ${locationName}`,
        meta_title: `Foster Agencies in ${locationName} | UK Foster Care Directory`,
        meta_description: `Find accredited foster agencies in ${locationName}. Expert support and guidance for prospective foster carers.`,
        hero: {
          heading: `Foster Agencies in ${locationName}`,
          subheading: `Find accredited foster agencies in ${locationName}`,
          cta_primary: { text: "Get Foster Agency Support", link: "/contact" },
          cta_secondary: { text: "Explore Cities", link: "#cities" }
        },
        about: {
          title: `About Fostering in ${locationName}`,
          body: `Welcome to our directory of foster agencies in ${locationName}. We've compiled a list of accredited and trusted agencies to help you start your fostering journey. ${locationName} offers diverse fostering opportunities with strong community support networks.`
        }
      };
      
    case 'city':
    default:
      return {
        title: `Foster Agencies in ${locationName}`,
        meta_title: `Foster Agencies in ${locationName} | UK Foster Care Directory`,
        meta_description: `Find accredited foster agencies in ${locationName}. Expert support and guidance for prospective foster carers.`,
        hero: {
          heading: `Foster Agencies in ${locationName}`,
          subheading: `Find accredited foster agencies in ${locationName}`,
          cta_primary: { text: "Talk to a Foster Advisor", link: "/contact" },
          cta_secondary: { text: "View Agencies", link: "#agencies" }
        },
        about: {
          title: `About Fostering in ${locationName}`,
          body: `Welcome to our directory of foster agencies in ${locationName}. We've compiled a list of accredited and trusted agencies to help you start your fostering journey. Fostering in ${locationName} offers a rewarding opportunity to make a positive impact on a child's life while being part of a supportive community.`
        }
      };
  }
}

// Generate mock location content
function generateMockLocationContent() {
  const locationContent = [];
  
  // Generate content for countries
  for (const country of mockLocations.countries) {
    const content = generateDefaultContent(country, 'country');
    locationContent.push({
      id: `country-${country.id}`,
      location_id: country.id,
      country_id: country.id,
      template_type: 'country',
      canonical_slug: `/foster-agency/${country.slug}`,
      content_json: content,
      hierarchy_path: `/${country.id}`
    });
  }
  
  // Generate content for regions
  for (const region of mockLocations.regions) {
    const content = generateDefaultContent(region, 'region');
    locationContent.push({
      id: `region-${region.id}`,
      location_id: region.id,
      country_id: region.country_id,
      region_id: region.id,
      template_type: 'region',
      canonical_slug: `/foster-agency/${mockLocations.countries.find(c => c.id === region.country_id).slug}/${region.slug}`,
      content_json: content,
      hierarchy_path: `/${region.country_id}/${region.id}`
    });
  }
  
  // Generate content for cities
  for (const city of mockLocations.cities) {
    const content = generateDefaultContent(city, 'city');
    const country = mockLocations.countries.find(c => c.id === city.country_id);
    const region = mockLocations.regions.find(r => r.id === city.region_id);
    
    locationContent.push({
      id: `city-${city.id}`,
      location_id: city.id,
      country_id: city.country_id,
      region_id: city.region_id,
      city_id: city.id,
      template_type: 'city',
      canonical_slug: `/foster-agency/${country.slug}/${region.slug}/${city.slug}`,
      content_json: content,
      hierarchy_path: `/${city.country_id}/${city.region_id}/${city.id}`
    });
  }
  
  return locationContent;
}

// Save mock content to a JSON file
function saveMockContent() {
  const content = generateMockLocationContent();
  const outputPath = path.join(__dirname, '..', 'data', 'mock-location-content.json');
  
  // Ensure data directory exists
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }
  
  fs.writeFileSync(outputPath, JSON.stringify(content, null, 2));
  console.log(`Mock location content saved to ${outputPath}`);
  console.log(`Generated content for ${content.length} locations`);
}

// Run the script
saveMockContent();