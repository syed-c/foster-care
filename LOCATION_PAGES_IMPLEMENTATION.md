# Location Pages Implementation

## Overview

This document describes the implementation of the hierarchical location-based pages for the Foster Care Directory UK platform. The implementation includes dynamic pages for countries, regions, and cities with CMS-driven content.

## File Structure

```
app/
├── foster-agency/
│   ├── page.js                          # Main directory page
│   ├── [country]/
│   │   └── page.js                      # Country pages
│   ├── [country]/
│   │   └── [region]/
│   │       └── page.js                  # Region pages
│   └── [country]/
│       └── [region]/
│           └── [city]/
│               └── page.js              # City pages
```

## Implementation Details

### 1. Country Pages (`/foster-agency/[country]`)

- Displays an overview of fostering in the selected country
- Shows a list of regions within the country
- Uses CMS content for dynamic text and sections
- Includes pagination for regions

### 2. Region Pages (`/foster-agency/[country]/[region]`)

- Displays detailed information about fostering in the selected region
- Shows a list of cities within the region
- Uses CMS content for all page sections
- Includes pagination for cities

### 3. City Pages (`/foster-agency/[country]/[region]/[city]`)

- Displays detailed information about fostering in the selected city
- Shows a list of foster agencies in the city
- Uses CMS content for all page sections

## CMS Integration

All location pages are integrated with the CMS through the `location_content` table:

- `template_type`: Specifies the page type (country, region, city)
- `canonical_slug`: Unique identifier for the page URL
- `content_json`: JSON object containing all CMS-editable content
- `hierarchy_path`: Path representing the location hierarchy

## Database Schema Updates

The `location_content` table has been enhanced with hierarchical columns:

- `country_id`: Reference to the country
- `region_id`: Reference to the region
- `city_id`: Reference to the city
- `parent_id`: Reference to parent content (for nesting)
- `hierarchy_path`: Text path for easy querying

## Scripts

### Populate Location Content

Populates the `location_content` table with default CMS content for all locations:

```bash
node scripts/populate-location-content.js
```

### Update Canonical Slugs

Updates canonical slugs for all locations based on their hierarchy:

```bash
node scripts/update-canonical-slugs.js
```

## Migration

SQL migration script to update the database schema:

```bash
psql -f migrations/add-location-content-hierarchy.sql
```

## Section Rendering

Location pages use the `SectionRenderer` component to dynamically render CMS content:

- Hero sections with call-to-action buttons
- Overview content with rich text
- Benefits and support information
- City/region listings with pagination
- Testimonials and FAQs
- Agency listings
- Final call-to-action sections

## SEO Features

- Dynamic meta titles and descriptions from CMS
- Breadcrumb navigation
- JSON-LD schema markup (planned)
- Semantic HTML structure

## Error Handling

- Graceful fallbacks for missing content
- User-friendly error pages
- Comprehensive logging
- Safe destructuring of CMS data

## Performance

- Dynamic rendering mode for fresh content
- Pagination for large location lists
- Efficient database queries
- Caching strategies (configurable)

## Testing

To test the location pages:

1. Visit `/foster-agency` to see the main directory
2. Click on a country to view country details
3. Click on a region to view region details
4. Click on a city to view city details and agencies

## Future Enhancements

- Add JSON-LD schema markup for better SEO
- Implement advanced filtering for agencies
- Add location-based search functionality
- Include interactive maps on location pages
- Add user reviews for locations
- Implement location-based statistics