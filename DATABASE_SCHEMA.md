# Database Schema for Location Pages

## Prisma Schema Version

```prisma
model LocationsPage {
  id               String   @id @default(uuid())
  page_type        String
  country_slug     String?
  region_slug      String?
  city_slug        String?
  canonical_slug   String   @unique
  title            String?
  meta_title       String?
  meta_description String?
  hero             Json?
  overview         Json?
  foster_system    Json?
  reasons          Json?
  popular_locations Json?
  regions_grid     Json?
  faqs             Json?
  regulatory       Json?
  final_cta        Json?
  sections         Json[]
  created_at       DateTime @default(now())
  updated_at       DateTime @updatedAt
}
```

## Supabase Types Script (for db-types.ts)

```typescript
export type LocationsPage = {
  id: string;
  page_type: 'country' | 'region' | 'city';
  country_slug: string | null;
  region_slug: string | null;
  city_slug: string | null;
  canonical_slug: string;
  title: string | null;
  meta_title: string | null;
  meta_description: string | null;
  hero: any | null;
  overview: any | null;
  foster_system: any | null;
  reasons: any | null;
  popular_locations: any | null;
  regions_grid: any | null;
  faqs: any | null;
  regulatory: any | null;
  final_cta: any | null;
  sections: any[] | null;
  created_at: string;
  updated_at: string;
};
```

## Canonical Slug Format Examples

- Country: `/foster-agency/england`
- Region: `/foster-agency/england/greater-london`
- City: `/foster-agency/england/greater-london/london`

## Implementation Notes

This schema provides a flexible structure for storing CMS content for location-based pages with the following benefits:

1. **Hierarchical Organization**: 
   - `page_type` field distinguishes between country, region, and city pages
   - Slug fields allow for proper URL construction and navigation

2. **Flexible Content Structure**:
   - JSON fields for each content section allow for dynamic content without rigid schema constraints
   - `sections` array provides ordering flexibility for content presentation

3. **SEO Optimization**:
   - Dedicated fields for meta title and description
   - Canonical slug for consistent URL structure

4. **Content Management**:
   - Separate fields for different content sections (hero, overview, faqs, etc.)
   - Timestamps for content tracking and cache invalidation

This structure will support the dynamic content loading and CMS integration for the location pages.