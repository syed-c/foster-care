# CMS Location Page Editor Implementation

## Overview

This document describes the implementation of a dynamic CMS page editor UI for managing location pages (country, region, city) using shadcn UI components. The editor loads and saves data to the Supabase table `locations_pages` using `canonical_slug` as the unique page key.

## File Structure

```
app/
  admin/
    locations-editor/
      page.js                 # Main editor UI component
      api/
        route.js              # API routes for CRUD operations
services/
  locationPageService.js    # Service functions for data operations
```

## Features Implemented

### 1. Dynamic Page Configuration
- Page type selector (country | region | city)
- Location selectors based on page type
- Auto-generated canonical slug
- SEO fields (Title, Meta Title, Meta Description)

### 2. Section-Based Editing
- Collapsible accordion-style sections
- Context-aware sections based on page type
- Section completeness indicators
- Individual section save buttons

### 3. Content Sections by Page Type

#### Country Pages
1. Hero Section
2. Overview Content
3. Foster System Info
4. Reasons to Foster
5. Featured Popular Areas
6. Regions Grid
7. FAQs
8. Regulatory & Trust Bar
9. Final CTA Section

#### Region Pages
1. Hero Section
2. About Fostering in Region
3. Benefits & Support
4. Popular Cities in Region
5. Allowances & Support info
6. Testimonials
7. Region FAQs
8. Trust Bar
9. Final CTA

#### City Pages
1. Hero Section
2. City Overview Content
3. Types of Fostering
4. Top Agencies
5. Reasons to Foster in City
6. Allowances & support in city
7. Local Support Resources
8. FAQ Section
9. Regulation / Trust Bar
10. Final CTA

### 4. Editor Features
- Live preview panel
- Auto-save on blur
- Instant field validation
- Section completeness indicators
- Preview link generation
- Copy canonical slug functionality

## Technical Implementation

### Frontend (shadcn/UI)
- Built with React hooks for state management
- Uses shadcn UI components for consistent design
- Responsive layout with preview panel
- Dynamic form rendering based on page type
- Client-side validation

### Backend (Supabase Integration)
- RESTful API endpoints for CRUD operations
- Service layer for data operations
- Canonical slug as unique identifier
- Automatic creation/update logic

### Data Model
Follows the Prisma schema defined in DATABASE_SCHEMA.md:
- `page_type` field determines section visibility
- JSON fields for flexible content storage
- Canonical slug for consistent URL structure
- Timestamps for content tracking

## Usage Instructions

1. Navigate to `/admin/locations-editor`
2. Select page type (country/region/city)
3. Choose appropriate location values
4. Edit content sections as needed
5. Use Save buttons to persist changes
6. Preview changes using the preview panel or link

## Future Enhancements

1. **Real-time Collaboration**: Implement WebSocket connections for multi-user editing
2. **Version History**: Add revision tracking and rollback capabilities
3. **Media Library**: Integrate file upload and management for images
4. **Content Scheduling**: Add publish/unpublish dates for content
5. **Advanced Permissions**: Role-based access control for different user types
6. **SEO Analysis**: Integration with SEO tools for content optimization
7. **A/B Testing**: Support for testing different content variations
8. **Analytics Dashboard**: Track page performance and engagement metrics

## Known Limitations

1. Currently uses mock data for location selectors
2. Preview panel shows placeholder content
3. No real-time synchronization with database
4. Media uploads not implemented
5. User authentication/authorization not included

## Dependencies

- Next.js 15.5.6
- shadcn/ui components
- Supabase JavaScript client
- Lucide React icons

## API Endpoints

### GET `/api/admin/locations-editor`
Fetch location page data by canonical slug

### POST `/api/admin/locations-editor`
Create or update location page data

### DELETE `/api/admin/locations-editor`
Delete location page by canonical slug

## Service Functions

Located in `services/locationPageService.js`:
- `getLocationPageByCanonicalSlug(canonicalSlug)`
- `saveLocationPage(pageData)`
- `deleteLocationPage(canonicalSlug)`
- `getRegionsForCountry(countrySlug)`
- `getCitiesForRegion(regionSlug)`
- `getAgenciesForLocation(locationSlug)`