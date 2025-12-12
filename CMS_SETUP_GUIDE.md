# CMS Setup Guide

This guide explains how to set up the Content Management System (CMS) for the foster care website.

## Prerequisites

1. Supabase project set up
2. Environment variables configured in `.env`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`

## Setting Up CMS Tables

### Method 1: Using Supabase Dashboard (Recommended)

1. Log in to your Supabase dashboard
2. Navigate to the SQL editor
3. Copy the contents of `migrations/001_create_cms_tables.sql`
4. Run the SQL script to create all CMS tables

### Method 2: Manual Table Creation

If you prefer to create tables manually, create the following tables:

#### cms_pages
```sql
CREATE TABLE IF NOT EXISTS cms_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  type VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### cms_page_sections
```sql
CREATE TABLE IF NOT EXISTS cms_page_sections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_id UUID REFERENCES cms_pages(id) ON DELETE CASCADE,
  section_key VARCHAR(100) NOT NULL,
  section_type VARCHAR(100) NOT NULL,
  title VARCHAR(255),
  content JSONB,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

#### cms_section_fields
```sql
CREATE TABLE IF NOT EXISTS cms_section_fields (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section_id UUID REFERENCES cms_page_sections(id) ON DELETE CASCADE,
  field_key VARCHAR(100) NOT NULL,
  field_type VARCHAR(50) NOT NULL,
  field_label VARCHAR(255) NOT NULL,
  field_value TEXT,
  sort_order INTEGER DEFAULT 0,
  is_required BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## Adding Indexes and Security Policies

After creating the tables, run the following commands:

```sql
-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cms_pages_slug ON cms_pages(slug);
CREATE INDEX IF NOT EXISTS idx_cms_pages_type ON cms_pages(type);
CREATE INDEX IF NOT EXISTS idx_cms_page_sections_page_id ON cms_page_sections(page_id);
CREATE INDEX IF NOT EXISTS idx_cms_page_sections_section_key ON cms_page_sections(section_key);
CREATE INDEX IF NOT EXISTS idx_cms_section_fields_section_id ON cms_section_fields(section_id);
CREATE INDEX IF NOT EXISTS idx_cms_section_fields_field_key ON cms_section_fields(field_key);

-- Enable Row Level Security (RLS) for CMS tables
ALTER TABLE cms_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_page_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE cms_section_fields ENABLE ROW LEVEL SECURITY;

-- Create policies for admin access (adjust as needed for your auth setup)
CREATE POLICY "Admins can manage CMS pages" ON cms_pages
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admins can manage CMS sections" ON cms_page_sections
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Admins can manage CMS fields" ON cms_section_fields
  FOR ALL USING (true) WITH CHECK (true);

-- Grant permissions (adjust based on your auth roles)
GRANT ALL ON cms_pages TO authenticated;
GRANT ALL ON cms_page_sections TO authenticated;
GRANT ALL ON cms_section_fields TO authenticated;
```

## Populating CMS with Content

### 1. Run the Migration Script

After setting up the tables, run the migration script to populate the CMS with existing content:

```bash
node scripts/migrate-content-to-cms.js
```

### 2. Populate All Regions

To populate all regions with structured content:

```bash
node scripts/populate-cms-with-all-regions.js
```

## Accessing the CMS

The CMS admin interface is available at `/admin/cms`. From here you can:

1. Manage pages (create, edit, delete)
2. Manage sections within pages
3. Edit individual text elements (fields)

## How Content Synchronization Works

1. Live pages fetch content from the CMS first
2. If no CMS content is found, they fall back to the existing `location_content` table
3. Updates in the CMS admin are immediately reflected on live pages
4. All content is stored in the database for real-time synchronization

## API Routes

The CMS provides the following API routes:

- `GET /api/cms/pages` - Get all pages
- `POST /api/cms/pages` - Create a new page
- `DELETE /api/cms/pages/:id` - Delete a page

- `GET /api/cms/sections?pageId=:pageId` - Get sections for a page
- `POST /api/cms/sections` - Create a new section
- `PUT /api/cms/sections/:id` - Update a section
- `DELETE /api/cms/sections/:id` - Delete a section

- `GET /api/cms/fields?sectionId=:sectionId` - Get fields for a section
- `POST /api/cms/fields` - Create a new field
- `PUT /api/cms/fields/:id` - Update a field
- `DELETE /api/cms/fields/:id` - Delete a field

## Troubleshooting

### Tables Not Found

If you see errors about tables not being found:

1. Ensure you've run the SQL migration script
2. Check that your Supabase credentials are correct in `.env`
3. Verify the tables exist in your Supabase dashboard

### Content Not Updating

If content changes aren't reflected on live pages:

1. Check the browser console for errors
2. Verify the CMS tables contain the expected data
3. Ensure the `fetchLocationContent` function is being called correctly