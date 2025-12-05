# Canonical Slug Implementation

## Summary

This implementation fixes the canonical slug mismatch in the admin UI and improves the location content editor. The changes include:

1. Added `canonical_slug` column to countries, regions, and cities tables
2. Created migration to backfill canonical_slug using parent chain
3. Implemented `buildCanonicalSlug()` service function
4. Updated create/update endpoints to maintain canonical_slug
5. Created new admin API endpoint `/admin/locations/tree` with hierarchical data
6. Enhanced admin pages editor with improved UI and array editors
7. Replaced raw JSON textareas with user-friendly array editors for FAQs/resources

## Why This Fixes Admin Slug Mismatch

The frontend expects canonical slugs like `/foster-agency/england/redcar-and-cleveland/redcar`, but the admin API was returning simple slugs without the `/foster-agency` prefix. This caused the CMS to show wrong paths and made content editing inconsistent.

## Implementation Details

### Database Changes

- Added `canonical_slug` column to `countries`, `regions`, and `cities` tables
- Migration backfills existing records with proper canonical paths
- Updated create/update flows automatically maintain canonical_slug

### New API Endpoints

1. `GET /admin/locations/tree?includeContent=true` - Returns hierarchical location tree
2. Enhanced existing CMS endpoints to work with canonical slugs

### Admin UI Improvements

1. Location tree now shows:
   - Icons for folders vs pages
   - Canonical slug under each node
   - Editable badges for editable nodes
   - Proper selection handling

2. Editor form enhancements:
   - Mirror public page structure
   - Array editors for FAQs and resources (no more raw JSON)
   - Validation and error handling
   - Loading states and user feedback

## How to Test

1. Run migration: `npm run migrate` (or however migrations are run in this project)
2. Start backend + frontend
3. Open admin -> Location Content
4. You should see canonical slugs including `/foster-agency` prefix
5. Click a city node (editable ones) — editor loads full form
6. Edit FAQ/Resources using array UI and save
7. Verify public page updated

## Files Created/Modified

### New Files
- `migrations/20251108120000_add_canonical_slug.js` - Database migration
- `services/locationService.js` - Location service with canonical slug functions
- `app/api/admin/locations/tree/route.js` - New API endpoint
- `components/FAQEditor.jsx` - FAQ array editor component
- `components/ResourceEditor.jsx` - Resource array editor component
- `__tests__/services/locationService.test.js` - Unit tests for location service
- `__tests__/migrations/canonicalSlugMigration.test.js` - Migration tests
- `__tests__/e2e/admin/pagesEditor.test.js` - E2E tests

### Modified Files
- `app/admin/pages-editor/page.js` - Updated admin UI
- `app/api/admin/cms/route.js` - Enhanced CMS API
- `lib/cms.js` - Minor updates (if needed)

## Technical Details

### Canonical Slug Format
The canonical slug follows the pattern: `/foster-agency/{country}/{region}/{city}`

Examples:
- Country: `/foster-agency/england`
- Region: `/foster-agency/england/greater-london`
- City: `/foster-agency/england/greater-london/london`

### Location Hierarchy
The implementation maintains the existing database structure:
- Countries → Regions → Cities (3-level hierarchy)
- Each level has its own table with foreign key relationships
- Canonical slug is built by traversing the parent chain

### Editable Content
- Countries and regions are folder-only (not editable)
- Cities are editable content nodes
- Editable flag is determined by node type

## Future Improvements

1. Add support for editing region content (if needed)
2. Implement caching for location tree API
3. Add search functionality to location tree
4. Implement bulk operations for content management