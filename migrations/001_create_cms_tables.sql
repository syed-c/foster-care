-- Create CMS tables for content management system

-- Create cms_pages table for general pages
CREATE TABLE IF NOT EXISTS cms_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  type VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cms_page_sections table for page sections
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

-- Create cms_section_fields table for individual text elements within sections
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