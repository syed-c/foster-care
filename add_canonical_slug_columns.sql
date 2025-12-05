-- Add canonical_slug columns to location tables
ALTER TABLE countries 
ADD COLUMN IF NOT EXISTS canonical_slug TEXT UNIQUE;

ALTER TABLE regions 
ADD COLUMN IF NOT EXISTS canonical_slug TEXT UNIQUE;

ALTER TABLE cities 
ADD COLUMN IF NOT EXISTS canonical_slug TEXT UNIQUE;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_countries_canonical_slug ON countries(canonical_slug);
CREATE INDEX IF NOT EXISTS idx_regions_canonical_slug ON regions(canonical_slug);
CREATE INDEX IF NOT EXISTS idx_cities_canonical_slug ON cities(canonical_slug);