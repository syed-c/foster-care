# CMS Schema Documentation

## Normalized Schema Structure

This document describes the normalized schema used for CMS content across country, region, and city pages.

## Core Fields

All location content follows this normalized structure:

```javascript
{
  id: String,           // Location ID or slug
  slug: String,         // Location slug
  title: String,        // Page title (h1)
  metaTitle: String,    // Meta title for SEO
  sections: Array,      // Array of section objects
  raw: Object           // Original raw data
}
```

## Section Structure

Each section in the `sections` array follows this structure:

```javascript
{
  id: String,           // Unique section identifier
  type: String,         // Section type (e.g., 'hero', 'popularCities')
  key: String,          // Alternative identifier (if type not present)
  data: Object          // Section-specific data
}
```

## Section Types

### Hero Section
```javascript
{
  type: 'hero',
  data: {
    heading: String,
    subheading: String,
    cta_primary: {
      text: String,
      link: String
    },
    cta_secondary: {
      text: String,
      link: String
    }
  }
}
```

### Popular Cities Section
```javascript
{
  type: 'popularCities',
  data: {
    title: String,
    description: String,
    cities: Array
  }
}
```

### Top Agencies Section
```javascript
{
  type: 'topAgencies',
  data: {
    title: String,
    description: String,
    items: Array
  }
}
```

### Overview Section
```javascript
{
  type: 'overview',
  data: {
    title: String,
    body: String
  }
}
```

### Benefits Section
```javascript
{
  type: 'benefits',
  data: {
    title: String,
    description: String,
    items: Array
  }
}
```

### FAQ Section
```javascript
{
  type: 'faqs',
  data: {
    title: String,
    description: String,
    items: Array
  }
}
```

## Data Flow

1. **Raw Data**: Content loaded from Supabase/location_content table
2. **Normalization**: `normalizeLocation()` utility processes raw data into consistent structure
3. **Rendering**: `SectionRenderer` component dynamically renders sections based on type
4. **Dynamic Lists**: Popular cities and agencies fetched via API helpers

## Schema Mapping

The CMS uses different field names depending on the location type:

### Country Pages
- Hero: `hero.heading`, `hero.subheading`
- Overview: `overview.title`, `overview.body`

### Region Pages
- Hero: `hero.heading`, `hero.subheading`
- About: `about.title`, `about.body`
- Popular Cities: `popularCities.title`, `popularCities.cities`

### City Pages
- Hero: `hero.heading`, `hero.subheading`
- About: `about.title`, `about.body`
- Top Agencies: `topAgencies.title`, `topAgencies.items`

## Dynamic Components

Dynamic sections use server-side helpers:
- `getCitiesByRegion(regionSlug)` - Fetches cities for a region
- `getAgenciesByRegion(regionSlug, limit, filters)` - Fetches agencies for a region

## Error Handling

- Fallback to static content if CMS data unavailable
- Graceful handling of missing section types
- Default values for missing fields
- Proper key generation for React lists

## Best Practices

1. Always use `normalizeLocation()` when loading CMS data
2. Use `SectionRenderer` for all section rendering
3. Pass `regionSlug` to dynamic components for data fetching
4. Use proper keys in React lists (`id` preferred, with fallbacks)
5. Handle loading states in dynamic components
6. Use error boundaries for dynamic imports