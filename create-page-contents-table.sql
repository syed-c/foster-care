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

-- Insert sample data for England
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
  "regions_section": {
    "badge_label": "Regions",
    "heading": "All Regions in England",
    "description": "Discover the best foster agencies across England by region. Our comprehensive directory helps you find the perfect match for your fostering journey.",
    "card_button_label": "View Agencies"
  },
  "top_agencies_section": {
    "heading": "Top Agencies in England",
    "description": "Discover the highest-rated foster agencies in England with excellent support and competitive allowances."
  },
  "sections": []
}')
ON CONFLICT (canonical_slug) DO NOTHING;