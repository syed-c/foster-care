# Location Pages Editor Implementation

## Overview

This document describes the implementation of a clean, human-friendly Location Pages Editor for an admin route that manages country, region, and city pages for a foster-care directory.

## File Structure

```
lib/
  types/
    locationPageContent.ts        # TypeScript interfaces for location page content
  location-pages-api.ts           # Helper functions for Supabase operations

components/
  admin/
    location-pages/
      location-pages-editor.tsx   # Main client component

app/
  admin/
    location-pages/
      page.tsx                    # Server component wrapper
```

## TypeScript Types

### LocationPageContent Interfaces

Defined in `lib/types/locationPageContent.ts`:

1. **Base Types**:
   - `PageType`: 'country' | 'region' | 'city'
   - `BaseSeo`: title, meta_title, meta_description
   - `HeroSection`: heading, subheading, body, CTA fields, image_url
   - `FaqItem`: question, answer
   - `PopularLocationItem`: name, link
   - `ReasonItem`: title, description
   - `FosterSystemItem`: title, description
   - `TrustBarItem`: label, sublabel, icon_key
   - `CtaSection`: heading, subheading, cta_text, cta_href

2. **Page-Specific Content Types**:
   - `CountryPageContent`: Extends BaseSeo with country-specific sections
   - `RegionPageContent`: Extends BaseSeo with region-specific sections
   - `CityPageContent`: Extends BaseSeo with city-specific sections

3. **LocationPage Interface**:
   - `id`: uuid
   - `canonical_slug`: text (unique)
   - `template_type`: PageType
   - `content_json`: LocationPageJson
   - `created_at`: timestamptz
   - `updated_at`: timestamptz

## API Helper Functions

Defined in `lib/location-pages-api.ts`:

1. **Page Operations**:
   - `listLocationPages(templateType?)`: List all location pages, optionally filtered by template type
   - `getLocationPageBySlug(canonicalSlug)`: Get a single location page by canonical slug
   - `createLocationPage(canonicalSlug, templateType)`: Create a new location page with empty content
   - `updateLocationPage(id, updates)`: Update a location page
   - `deleteLocationPage(id)`: Delete a location page

2. **Location Data Operations**:
   - `getCountries()`: Get all countries
   - `getRegionsByCountry(countrySlug)`: Get regions for a specific country
   - `getCitiesByRegion(regionSlug)`: Get cities for a specific region

## Component Structure

### Server Component Wrapper

`app/admin/location-pages/page.tsx`:
- Fetches initial list of location pages
- Renders the client component with initial data

### Client Component

`components/admin/location-pages/location-pages-editor.tsx`:
- Two-column layout (sidebar + main editor)
- State management for all form fields
- Data fetching for location selects
- Page creation and saving functionality

## UI/UX Features

### Layout

1. **Header**:
   - Title: "Location Pages Editor"
   - Save buttons and status indicators

2. **Tabs**:
   - Filter pages by template type (country, region, city)

3. **Left Sidebar**:
   - Filterable list of existing pages
   - "New page" button with creation dialog
   - Page selection with visual feedback

4. **Main Editor**:
   - SEO & Basics section (title, meta fields, canonical slug)
   - Section-based editing using accordions
   - Context-aware sections based on page type

5. **Right Preview Panel**:
   - JSON tab: Pretty-printed content JSON
   - Preview tab: Simplified content preview

### Page Creation Workflow

1. Select template type (country/region/city)
2. Choose location values from selects (filtered hierarchically)
3. System automatically generates canonical slug
4. Creates empty page with appropriate content structure
5. Opens new page in editor

### Data Management

1. **Hierarchical Location Selects**:
   - Countries: Always available
   - Regions: Filtered by selected country
   - Cities: Filtered by selected region

2. **Automatic Canonical Slug Generation**:
   - Country: `/foster-agency/{countrySlug}`
   - Region: `/foster-agency/{countrySlug}/{regionSlug}`
   - City: `/foster-agency/{countrySlug}/{regionSlug}/{citySlug}`

3. **Content Structure**:
   - Empty content objects created based on template type
   - Type-safe content updates
   - Proper JSON serialization for Supabase storage

## Section Order & Fields

### Country Pages

1. Hero Section
2. England Overview Content Block
3. Foster System in England Info Section
4. Reasons to Foster in England
5. Featured Popular Areas
6. Full Regions List Grid
7. FAQs About Fostering in England
8. Regulatory & Trust Bar
9. Final CTA Section

### Region Pages

1. Hero Section
2. About Fostering in {Region}
3. Benefits and Support for Foster Carers
4. Popular Cities in {Region}
5. Foster Allowances & Agency Support Info
6. Testimonials / Trust Signals
7. Region-Specific FAQs
8. Local Authorities & Regulation Trust Bar
9. Final CTA Section

### City Pages

1. Hero Section
2. City Overview Content
3. Types of Fostering in {City}
4. Top Foster Agencies in {City}
5. Why Foster in {City}? (benefits & emotional impact)
6. Foster Allowances & Support in {City}
7. Local Support & Resources
8. FAQs (10+ per city, with Schema)
9. Trust Assurance / Regulation Bar
10. Final Action CTA

## Technical Implementation Details

### State Management

- React hooks for all state management
- useEffect for data fetching and filtering
- TypeScript interfaces for type safety
- Proper error handling and loading states

### Data Flow

1. Server component fetches initial page list
2. Client component manages all UI state
3. API helpers handle Supabase operations
4. Type-safe data transformations between UI and database

### Performance Considerations

- Initial data loading in server component
- Client-side filtering for better responsiveness
- Loading states for async operations
- Efficient state updates

## Future Enhancements

1. **Rich Text Editors**:
   - Replace textareas with proper rich text editors for content sections
   - Add formatting controls and media embedding

2. **Drag-and-Drop Sorting**:
   - Implement sortable lists for FAQ items, reasons, popular areas
   - Visual reordering interface

3. **Media Library Integration**:
   - File upload for hero images
   - Media selection interface

4. **Validation & Error Handling**:
   - Form validation with user feedback
   - Better error messaging

5. **Collaboration Features**:
   - Real-time editing indicators
   - Version history and rollback

6. **Preview Improvements**:
   - Full page preview matching frontend
   - Device simulation

## Dependencies

- Next.js App Router
- TypeScript
- TailwindCSS
- shadcn/ui components
- Supabase JavaScript client
- Lucide React icons

## Usage Instructions

1. Navigate to `/admin/location-pages`
2. Select a page type using the tabs
3. Choose an existing page from the sidebar or create a new one
4. Edit content in the main editor panel
5. Save changes using the save buttons
6. Preview content using the right panel tabs