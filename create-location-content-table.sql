-- Create location_content table for CMS content
CREATE TABLE IF NOT EXISTS location_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    location_id UUID NOT NULL,
    template_type VARCHAR(10) NOT NULL CHECK (template_type IN ('country', 'region', 'city')),
    canonical_slug TEXT UNIQUE NOT NULL,
    content_json JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_location_content_canonical_slug ON location_content(canonical_slug);
CREATE INDEX IF NOT EXISTS idx_location_content_location_id ON location_content(location_id);
CREATE INDEX IF NOT EXISTS idx_location_content_template_type ON location_content(template_type);

-- Add foreign key constraint
ALTER TABLE location_content 
ADD CONSTRAINT fk_location_content_location_id 
FOREIGN KEY (location_id) REFERENCES locations(id);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_location_content_updated_at ON location_content;

CREATE TRIGGER update_location_content_updated_at 
BEFORE UPDATE ON location_content 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();