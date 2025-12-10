# Manual Migration Steps

If you prefer to run the SQL statements manually instead of using the automated script, follow these steps:

## Step 1: Create Tables

Run the following SQL statements in your Supabase SQL Editor:

```sql
-- Create countries table
CREATE TABLE countries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  intro_html TEXT,
  meta_title TEXT,
  meta_description TEXT,
  order INTEGER DEFAULT 0
);

-- Create regions table
CREATE TABLE regions (
  id UUID DEFAULT gen_random_uid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  country_id UUID REFERENCES countries(id) ON DELETE CASCADE,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  order INTEGER DEFAULT 0
);

-- Create counties table
CREATE TABLE counties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  country_id UUID REFERENCES countries(id) ON DELETE CASCADE,
  region_id UUID REFERENCES regions(id) ON DELETE SET NULL,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  order INTEGER DEFAULT 0
);

-- Create country_page_blocks table
CREATE TABLE country_page_blocks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  country_id UUID REFERENCES countries(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  content JSONB,
  order INTEGER DEFAULT 0
);

-- Create indexes for better performance
CREATE INDEX idx_countries_slug ON countries(slug);
CREATE INDEX idx_regions_country_id ON regions(country_id);
CREATE INDEX idx_regions_slug ON regions(slug);
CREATE INDEX idx_counties_country_id ON counties(country_id);
CREATE INDEX idx_counties_region_id ON counties(region_id);
CREATE INDEX idx_counties_slug ON counties(slug);
CREATE INDEX idx_country_page_blocks_country_id ON country_page_blocks(country_id);
CREATE INDEX idx_country_page_blocks_type ON country_page_blocks(type);
CREATE INDEX idx_country_page_blocks_order ON country_page_blocks(order);
```

## Step 2: Enable Row Level Security (RLS)

Enable RLS on all tables:

```sql
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE counties ENABLE ROW LEVEL SECURITY;
ALTER TABLE country_page_blocks ENABLE ROW LEVEL SECURITY;
```

## Step 3: Create Policies

Create policies to allow public read access:

```sql
-- Allow public read access to countries
CREATE POLICY "Public countries are viewable by everyone" ON countries
  FOR SELECT USING (true);

-- Allow public read access to regions
CREATE POLICY "Public regions are viewable by everyone" ON regions
  FOR SELECT USING (true);

-- Allow public read access to counties
CREATE POLICY "Public counties are viewable by everyone" ON counties
  FOR SELECT USING (true);

-- Allow public read access to country page blocks
CREATE POLICY "Public country page blocks are viewable by everyone" ON country_page_blocks
  FOR SELECT USING (true);
```

## Step 4: Grant Permissions

Grant permissions to authenticated and anonymous users:

```sql
-- Grant access to countries
GRANT ALL ON TABLE countries TO authenticated;
GRANT SELECT ON TABLE countries TO anon;

-- Grant access to regions
GRANT ALL ON TABLE regions TO authenticated;
GRANT SELECT ON TABLE regions TO anon;

-- Grant access to counties
GRANT ALL ON TABLE counties TO authenticated;
GRANT SELECT ON TABLE counties TO anon;

-- Grant access to country_page_blocks
GRANT ALL ON TABLE country_page_blocks TO authenticated;
GRANT SELECT ON TABLE country_page_blocks TO anon;
```

## Step 5: Test the Setup

After running the migration, test the setup:

```bash
node scripts/test-country-setup.js
```

## Step 6: Seed Initial Data

Seed the database with initial data:

```bash
node scripts/seed-country-data.js
```

## Step 7: Access the Pages

After setup, you can access:

1. Visit `/foster-agency/england` to see the country page
2. Visit `/cms` to access the CMS dashboard