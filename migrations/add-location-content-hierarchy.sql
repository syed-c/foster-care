-- Migration script to add hierarchical columns to location_content table
-- This will help with organizing content by country/region/city hierarchy

-- Add columns for hierarchical organization
-- Add columns for hierarchical organization
ALTER TABLE location_content 
ADD COLUMN IF NOT EXISTS country_id UUID REFERENCES countries(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS region_id UUID REFERENCES regions(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS city_id UUID REFERENCES cities(id) ON DELETE SET NULL,
ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES location_content(id) ON DELETE SET NULL;

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_location_content_country_id ON location_content(country_id);
CREATE INDEX IF NOT EXISTS idx_location_content_region_id ON location_content(region_id);
CREATE INDEX IF NOT EXISTS idx_location_content_city_id ON location_content(city_id);
CREATE INDEX IF NOT EXISTS idx_location_content_parent_id ON location_content(parent_id);

-- Add a column to store the full hierarchical path for easier querying
ALTER TABLE location_content 
ADD COLUMN IF NOT EXISTS hierarchy_path TEXT;

-- Create index for hierarchy path
CREATE INDEX IF NOT EXISTS idx_location_content_hierarchy_path ON location_content(hierarchy_path);

-- Update existing records to set the appropriate IDs based on template_type
-- For country-level content
UPDATE location_content 
SET country_id = location_id 
WHERE template_type = 'country' AND country_id IS NULL;

-- For region-level content, we need to find the associated country
-- For region-level content, we need to find the associated country
UPDATE location_content lc
SET country_id = r.country_id
FROM regions r
WHERE lc.template_type = 'region' 
AND lc.location_id = r.id 
AND lc.country_id IS NULL;

-- For city-level content, we need to find the associated region and country
-- For city-level content, we need to find the associated region and country
UPDATE location_content lc
SET region_id = c.region_id,
    country_id = c.country_id
FROM cities c
WHERE lc.template_type = 'city' 
AND lc.location_id = c.id 
AND (lc.region_id IS NULL OR lc.country_id IS NULL);

-- Update hierarchy path for existing records
-- Country level
UPDATE location_content 
SET hierarchy_path = CONCAT('/', country_id)
WHERE template_type = 'country' AND country_id IS NOT NULL;

-- Region level
UPDATE location_content 
SET hierarchy_path = CONCAT('/', country_id, '/', region_id)
WHERE template_type = 'region' AND country_id IS NOT NULL AND region_id IS NOT NULL;

-- City level
UPDATE location_content 
SET hierarchy_path = CONCAT('/', country_id, '/', region_id, '/', city_id)
WHERE template_type = 'city' AND country_id IS NOT NULL AND region_id IS NOT NULL AND city_id IS NOT NULL;

-- Add constraints to ensure data integrity
ALTER TABLE location_content 
ADD CONSTRAINT chk_location_content_hierarchy CHECK (
    (template_type = 'country' AND country_id IS NOT NULL AND region_id IS NULL AND city_id IS NULL) OR
    (template_type = 'region' AND country_id IS NOT NULL AND region_id IS NOT NULL AND city_id IS NULL) OR
    (template_type = 'city' AND country_id IS NOT NULL AND region_id IS NOT NULL AND city_id IS NOT NULL)
);