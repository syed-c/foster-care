-- Add Country System Tables to Supabase Schema

-- Create countries table
CREATE TABLE IF NOT EXISTS countries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  meta_title TEXT,
  meta_description TEXT,
  intro_html TEXT,
  hero_image TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create regions table
CREATE TABLE IF NOT EXISTS regions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  long_html TEXT,
  hero_image TEXT,
  "order" INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(country_id, slug)
);

-- Create counties table
CREATE TABLE IF NOT EXISTS counties (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  region_id UUID NOT NULL REFERENCES regions(id) ON DELETE CASCADE,
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  slug TEXT NOT NULL,
  title TEXT NOT NULL,
  summary TEXT,
  long_html TEXT,
  hero_image TEXT,
  stats_json JSONB,
  faq_json JSONB,
  "order" INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(region_id, slug)
);

-- Create country_page_blocks table for CMS content
CREATE TABLE IF NOT EXISTS country_page_blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  country_id UUID NOT NULL REFERENCES countries(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- e.g., "hero", "intro", "whyFosteringMatters", "typesOfFostering", "supportInfo", "faq", "cta"
  content_json JSONB NOT NULL, -- Flexible JSON structure for different block types
  "order" INTEGER,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create admin_users table for CMS access
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL, -- "admin", "editor", etc.
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_countries_slug ON countries(slug);
CREATE INDEX IF NOT EXISTS idx_regions_country_id ON regions(country_id);
CREATE INDEX IF NOT EXISTS idx_regions_slug ON regions(slug);
CREATE INDEX IF NOT EXISTS idx_counties_region_id ON counties(region_id);
CREATE INDEX IF NOT EXISTS idx_counties_country_id ON counties(country_id);
CREATE INDEX IF NOT EXISTS idx_counties_slug ON counties(slug);
CREATE INDEX IF NOT EXISTS idx_country_page_blocks_country_id ON country_page_blocks(country_id);
CREATE INDEX IF NOT EXISTS idx_country_page_blocks_type ON country_page_blocks(type);
CREATE INDEX IF NOT EXISTS idx_admin_users_email ON admin_users(email);

-- Add updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_countries_updated_at ON countries;
DROP TRIGGER IF EXISTS update_regions_updated_at ON regions;
DROP TRIGGER IF EXISTS update_counties_updated_at ON counties;
DROP TRIGGER IF EXISTS update_country_page_blocks_updated_at ON country_page_blocks;
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;

CREATE TRIGGER update_countries_updated_at 
  BEFORE UPDATE ON countries 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_regions_updated_at 
  BEFORE UPDATE ON regions 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_counties_updated_at 
  BEFORE UPDATE ON counties 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_country_page_blocks_updated_at 
  BEFORE UPDATE ON country_page_blocks 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_admin_users_updated_at 
  BEFORE UPDATE ON admin_users 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for England
-- First check if the record exists, and if not, insert it
INSERT INTO countries (id, slug, title, meta_title, meta_description)
SELECT 
  gen_random_uuid(),
  'england',
  'England',
  'Foster Care in England | UK Foster Care Directory',
  'Find accredited foster agencies across England. Discover fostering opportunities in your region.'
WHERE NOT EXISTS (
  SELECT 1 FROM countries WHERE slug = 'england'
);

-- Get England's ID
WITH england_id AS (
  SELECT id FROM countries WHERE slug = 'england' LIMIT 1
)
INSERT INTO regions (id, country_id, slug, title, "order")
SELECT 
  gen_random_uuid(),
  england_id.id,
  'north-east',
  'North East',
  1
FROM england_id
WHERE NOT EXISTS (
  SELECT 1 FROM regions WHERE country_id = england_id.id AND slug = 'north-east'
);

WITH england_id AS (
  SELECT id FROM countries WHERE slug = 'england' LIMIT 1
)
INSERT INTO regions (id, country_id, slug, title, "order")
SELECT 
  gen_random_uuid(),
  england_id.id,
  'north-west',
  'North West',
  2
FROM england_id
WHERE NOT EXISTS (
  SELECT 1 FROM regions WHERE country_id = england_id.id AND slug = 'north-west'
);

WITH england_id AS (
  SELECT id FROM countries WHERE slug = 'england' LIMIT 1
)
INSERT INTO regions (id, country_id, slug, title, "order")
SELECT 
  gen_random_uuid(),
  england_id.id,
  'london',
  'London',
  3
FROM england_id
WHERE NOT EXISTS (
  SELECT 1 FROM regions WHERE country_id = england_id.id AND slug = 'london'
);

-- Insert sample counties
WITH england_id AS (
  SELECT id FROM countries WHERE slug = 'england' LIMIT 1
),
ne_region AS (
  SELECT id FROM regions WHERE country_id = (SELECT id FROM england_id) AND slug = 'north-east' LIMIT 1
)
INSERT INTO counties (id, region_id, country_id, slug, title, summary, stats_json)
SELECT 
  gen_random_uuid(),
  ne_region.id,
  england_id.id,
  'tyne-and-wear',
  'Tyne and Wear',
  'Urban county in North East England known for Newcastle upon Tyne.',
  '{"population": 1150000, "agencies": 12, "averageAllowance": "£450-£600"}'::jsonb
FROM england_id, ne_region
WHERE NOT EXISTS (
  SELECT 1 FROM counties WHERE region_id = ne_region.id AND slug = 'tyne-and-wear'
);

WITH england_id AS (
  SELECT id FROM countries WHERE slug = 'england' LIMIT 1
),
nw_region AS (
  SELECT id FROM regions WHERE country_id = (SELECT id FROM england_id) AND slug = 'north-west' LIMIT 1
)
INSERT INTO counties (id, region_id, country_id, slug, title, summary, stats_json)
SELECT 
  gen_random_uuid(),
  nw_region.id,
  england_id.id,
  'greater-manchester',
  'Greater Manchester',
  'Metropolitan county in North West England with major cities like Manchester.',
  '{"population": 2800000, "agencies": 25, "averageAllowance": "£400-£550"}'::jsonb
FROM england_id, nw_region
WHERE NOT EXISTS (
  SELECT 1 FROM counties WHERE region_id = nw_region.id AND slug = 'greater-manchester'
);

WITH england_id AS (
  SELECT id FROM countries WHERE slug = 'england' LIMIT 1
),
london_region AS (
  SELECT id FROM regions WHERE country_id = (SELECT id FROM england_id) AND slug = 'london' LIMIT 1
)
INSERT INTO counties (id, region_id, country_id, slug, title, summary, stats_json)
SELECT 
  gen_random_uuid(),
  london_region.id,
  england_id.id,
  'greater-london',
  'Greater London',
  'The capital city region with diverse fostering opportunities.',
  '{"population": 9000000, "agencies": 45, "averageAllowance": "£500-£700"}'::jsonb
FROM england_id, london_region
WHERE NOT EXISTS (
  SELECT 1 FROM counties WHERE region_id = london_region.id AND slug = 'greater-london'
);