-- Add phone column to contact_inquiries table
ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS phone TEXT;

-- Add updated_at column to contact_inquiries table
ALTER TABLE contact_inquiries ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for contact_inquiries
DROP TRIGGER IF EXISTS update_contact_inquiries_updated_at ON contact_inquiries;
CREATE TRIGGER update_contact_inquiries_updated_at 
BEFORE UPDATE ON contact_inquiries 
FOR EACH ROW 
EXECUTE FUNCTION update_updated_at_column();