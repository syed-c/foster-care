# CMS Schema Fixes and Dynamic Section Rendering Implementation

## Summary

This document describes the implementation of dynamic section rendering for the foster care directory application, which fully reconnects all region pages to CMS data so that every section in the admin pages-editor renders dynamically on the live region pages.

## Changes Made

### 1. Created Utility Functions

#### normalizeLocation.js
- Created a utility function to normalize CMS data into a consistent structure
- Ensures all location content has a predictable shape with id, slug, title, and sections fields

#### updateNested.js
- Created a utility function for updating nested data structures
- Helps with updating deeply nested fields in the CMS editor

#### cmsSchemaMap.js
- Created mapping between old CMS structure and new frontend structure
- Provides bidirectional mapping (CMS to Frontend and Frontend to CMS)

### 2. Created Dynamic Section Renderer

#### SectionRenderer.jsx
- Created a dynamic section renderer component that can render any section type
- Uses dynamic imports for section components to improve performance
- Falls back to a generic block component for unknown section types
- Includes specific implementations for common section types:
  - HeroSection
  - OverviewSection
  - BenefitsSection
  - PopularCities
  - FaqSection
  - TopAgencies
  - AgencyFinder

### 3. Updated Page Components

#### Region Page ([country]/[region]/page.js)
- Added dynamic section rendering capability
- Falls back to existing static implementation if no dynamic sections are available
- Maintains backward compatibility

#### Country Page ([country]/page.js)
- Added dynamic section rendering capability
- Falls back to existing static implementation if no dynamic sections are available
- Maintains backward compatibility

#### City Page ([country]/[region]/[city]/page.js)
- Added dynamic section rendering capability
- Falls back to existing static implementation if no dynamic sections are available
- Maintains backward compatibility

### 4. Enhanced Location Service

#### locationService.js
- Added helper functions for getting agencies by region
- Added helper functions for getting cities by region
- Improved error handling and logging

### 5. Documentation

#### README-cms-schema.md
- Created comprehensive documentation of the normalized CMS schema
- Describes section types and their structures
- Provides implementation notes

#### ADMIN_CMS_SCHEMA_FIXES.md
- This document summarizing all changes

## Key Features

### Dynamic Section Rendering
- Any section saved in CMS now shows up on the live page without adding new code per-section
- Uses a map to components for dynamic imports
- Each section component reads data defensively with optional chaining and fallback content

### Server-Side Helpers
- Implemented server-side helpers for dynamic lists:
  - `getCitiesByRegion(regionSlug)` - queries DB or CMS children for region
  - `getAgenciesByRegion(regionSlug, limit, filters)` - real query for dynamic content

### Admin Editor Fixes
- Added updateNested utility for controlled inputs with value + onChange
- Proper key usage for lists (id or slug instead of index)
- Rehydration protections with isEditing guard

### Route Priority
- Confirmed that catch-all route does not shadow nested routes
- Verified region route is being used via debug logs

## Implementation Details

### Normalized Schema
All location content follows a consistent structure:
- `id` - Unique identifier
- `type` - Content type (country, region, city)
- `data` - The actual content data with sections array

### Section Structure
Each section has:
- `id` - Unique section identifier
- `type` - Section type (hero, overview, benefits, etc.)
- `data` - Section-specific data

### Fallback-Safe Loader
The loader now:
- Loads raw CMS payload for the location
- Normalizes to a predictable shape
- Returns `{ notFound: true }` only when slug truly absent
- Otherwise renders a friendly fallback

## Testing

### Verification Script
Created a test script that verifies:
- normalizeLocation function works correctly
- updateNested function works correctly
- CMS schema mapping is correct
- All sections have required fields

### Manual Testing
The implementation should be tested manually by:
1. Editing 3 different section fields in CMS (text, lists, nested items), saving, and reloading page
2. Checking 5 region pages with different content to ensure all sections render
3. Verifying that console has no undefined property access errors

## Edge Cases Handled

1. **Temporary Keys**: If CMS saves section ids as temporary keys (tmp-xxx), renderer can use fallback key={sectionIndex} but logs a warning for missing permanent id
2. **Backend Model Changes**: If backend model must change, created a compatibility shim in the loader rather than changing DB directly
3. **Backward Compatibility**: All changes maintain backward compatibility with existing static content

## Commit Message
```
fix(cms): normalize cms schema + dynamic SectionRenderer + loaders

- Added normalizeLocation utility for consistent data structure
- Created SectionRenderer with dynamic import map
- Updated region/country/city pages to render data.sections.map(...)
- Added dynamic lists served by server-side helper functions
- Fixed admin editor onChange for nested arrays
- Added CMS schema mapping documentation
```