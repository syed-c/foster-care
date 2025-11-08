-- fix_indices.sql
-- Create indices only if columns exist

-- Create index for location_content.location_id
CREATE INDEX IF NOT EXISTS idx_location_content_location_id ON public.location_content(location_id);

-- Create index for locations.slug
CREATE INDEX IF NOT EXISTS idx_locations_slug ON public.locations(slug);

-- Create index for locations.canonical_slug only if column exists
DO $$ 
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'locations' AND column_name = 'canonical_slug'
  ) THEN
    CREATE INDEX IF NOT EXISTS idx_locations_canonical_slug ON public.locations(canonical_slug);
  END IF;
END $$;

SELECT 'Indices created successfully' as status;