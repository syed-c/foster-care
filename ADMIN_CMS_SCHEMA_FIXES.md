# CMS Schema Fixes and Setup

## Location Content Table Setup

The CMS functionality requires a `location_content` table to store editable content for pages. If you're getting errors about this table not existing, you need to create it.

### Creating the Table

Run the following SQL in your Supabase SQL editor:

```sql
-- Create location_content table for CMS content
CREATE TABLE IF NOT EXISTS location_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  canonical_slug TEXT UNIQUE NOT NULL,
  content_json JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_location_content_canonical_slug ON location_content(canonical_slug);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Drop trigger if exists
DROP TRIGGER IF EXISTS update_location_content_updated_at ON location_content;

-- Create trigger
CREATE TRIGGER update_location_content_updated_at 
BEFORE UPDATE ON location_content 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();
```

### Sample Data

Insert sample data for testing:

```sql
INSERT INTO location_content (canonical_slug, content_json)
VALUES ('/foster-agency/england', '{
  "hero": {
    "badge_label": "England",
    "title": "Foster Agencies in England",
    "subtitle": "Find accredited foster agencies in England",
    "primary_cta_label": "Get Foster Agency Support",
    "primary_cta_href": "/contact",
    "secondary_cta_label": "Explore Regions",
    "secondary_cta_href": "#regions",
    "search_placeholder": "Search for agencies in England..."
  },
  "overview": {
    "heading": "Foster Care in England",
    "content": "England has the largest fostering system in the UK with diverse opportunities across urban and rural areas."
  },
  "fosterSystem": {
    "heading": "The English Fostering System",
    "content": "The fostering system in England is regulated by Ofsted and offers various types of fostering arrangements."
  },
  "whyFoster": {
    "heading": "Why Foster in England",
    "content": "Fostering in England provides the opportunity to make a real difference in a child''s life while receiving comprehensive support."
  },
  "popularLocations": {
    "heading": "Popular Fostering Locations",
    "content": "Discover the best areas for fostering in England with high demand and excellent support services."
  },
  "faqs": {
    "heading": "Frequently Asked Questions",
    "content": "Get answers to common questions about fostering in England."
  },
  "regulated": {
    "heading": "Regulated and Trusted",
    "content": "All our fostering agencies in England are fully regulated and trusted by local authorities."
  },
  "finalCta": {
    "heading": "Ready to Begin Your Fostering Journey?",
    "subheading": "Connect with UK accredited foster agencies",
    "button_text": "Get Support",
    "button_link": "/contact"
  },
  "regions_section": {
    "badge_label": "Regions",
    "heading": "All Regions in England",
    "description": "Discover the best foster agencies across England by region. Our comprehensive directory helps you find the perfect match for your fostering journey.",
    "card_button_label": "View Agencies"
  },
  "top_agencies_section": {
    "heading": "Top Agencies in England",
    "description": "Discover the highest-rated foster agencies in England with excellent support and competitive allowances."
  }
}')
ON CONFLICT (canonical_slug) DO NOTHING;
```

### Running Migrations

Alternatively, you can run the migration:

```bash
node scripts/run-migration.js 20251128153000_create_page_contents_table.js
```

## Troubleshooting

If you're still getting errors:

1. Check that the table was created successfully by running:
   ```sql
   SELECT * FROM location_content LIMIT 1;
   ```

2. Verify the table structure:
   ```sql
   \d location_content
   ```

3. Make sure you have the correct permissions to access the table.