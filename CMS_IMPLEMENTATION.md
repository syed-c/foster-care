# CMS Implementation

## Overview

This document describes the implementation of the new CMS system for location pages using structured sections stored in Supabase.

## Database Schema

### Location Content Table

```sql
create table location_content (
  id uuid primary key default uuid_generate_v4(),
  canonical_slug text not null,
  sections jsonb,
  meta_title text,
  meta_description text,
  updated_at timestamp default now()
);

create index location_content_slug_idx
  on location_content (canonical_slug);
```

### Section Structure

Each location page stores its content as an array of sections in the `sections` JSONB field:

```json
[
  {
    "id": "section_1234567890",
    "type": "hero",
    "data": {
      "heading": "Foster Agencies in England",
      "subheading": "Find accredited foster agencies in England",
      "body": "Welcome to our directory...",
      "image": "https://example.com/image.jpg",
      "ctaText": "Get Started",
      "ctaLink": "/contact"
    }
  },
  {
    "id": "section_1234567891",
    "type": "overview",
    "data": {
      "body": "Detailed overview content..."
    }
  }
]
```

## Section Types

The CMS supports the following section types:

1. **breadcrumb** - Navigation breadcrumbs
2. **hero** - Hero section with heading, subheading, image, and CTAs
3. **overview** - Overview content with rich text body
4. **systemInfo** - Foster system information
5. **reasons** - Reasons to foster with repeatable items
6. **featuredAreas** - Featured locations
7. **regionsGrid** - Grid of regions
8. **faq** - Frequently asked questions
9. **trustBar** - Trust and regulation information
10. **finalCta** - Final call to action

## Implementation Files

### 1. Country Page (`app/foster-agency/[country]/page.js`)

- Fetches content from Supabase using `getLocationContentByCanonicalSlug`
- Extracts sections using `extractSectionsFromContent`
- Renders sections in a predefined order using `SectionRenderer`

### 2. Section Renderer (`components/sections/SectionRenderer.jsx`)

- Handles both old and new section structures
- Maps section types to appropriate components
- Provides fallback rendering for unknown sections
- Includes error boundaries for robust rendering

### 3. CMS Editor (`app/admin/cms-editor/page.tsx`)

- Allows editing of location content by canonical slug
- Provides section-based editing interface
- Supports adding, removing, and reordering sections
- Real-time JSON preview of content

### 4. Section Components (`components/admin/cms-editor/`)

- **SectionList** - Manages list of sections with add/remove/reorder
- **SectionCard** - Renders editor fields for specific section types

## Data Flow

1. **Content Creation/Editing**:
   - Admin navigates to CMS editor
   - Selects page by canonical slug
   - Adds/modifies/removes sections
   - Saves content to Supabase `location_content` table

2. **Content Rendering**:
   - User visits location page
   - Page fetches content by canonical slug
   - Sections extracted and ordered
   - Each section rendered by SectionRenderer

## API Functions

### Content Loading
```javascript
const { data, error } = await supabase
  .from('location_content')
  .select('sections')
  .eq('canonical_slug', slug)
  .single();
```

### Content Saving
```javascript
const { error } = await supabase
  .from('location_content')
  .upsert({
    canonical_slug: slug,
    sections: sections,
    updated_at: new Date().toISOString()
  }, {
    onConflict: 'canonical_slug'
  });
```

## Section Component Mapping

| Section Type | Component |
|--------------|-----------|
| hero | HeroSectionComponent |
| overview | OverviewSectionComponent |
| reasons | ReasonsSectionComponent |
| faq | FaqSectionComponent |
| *others* | Dynamic components or GenericBlock |

## Features

### 1. Structured Content
- Content organized in typed sections
- Consistent data structure across pages
- Easy to extend with new section types

### 2. Flexible Editing
- Drag-and-drop section reordering
- Section-specific field editors
- Real-time preview

### 3. Robust Rendering
- Error boundaries for component failures
- Fallback rendering for unknown sections
- Support for both old and new content structures

### 4. Performance
- Efficient database queries
- Client-side section rendering
- Caching strategies

## Usage Instructions

### For Content Editors
1. Navigate to `/admin/cms-editor`
2. Enter the canonical slug of the page to edit
3. Add, remove, or reorder sections as needed
4. Edit section-specific fields
5. Click "Save Content" to publish changes

### For Developers
1. Add new section types by:
   - Creating a new component in SectionRenderer
   - Adding editor fields in SectionCard
   - Updating the SECTION_TYPES array in SectionList

2. Extend the database schema by:
   - Adding new fields to the location_content table
   - Updating the migration script

## Future Enhancements

1. **Rich Text Editing** - Replace textareas with rich text editors
2. **Media Library** - Integrated image management
3. **Preview Modes** - Desktop/tablet/mobile previews
4. **Version History** - Content versioning and rollback
5. **Collaboration** - Multi-user editing with conflict resolution
6. **Validation** - Form validation and error handling
7. **SEO Tools** - Integrated SEO analysis and optimization