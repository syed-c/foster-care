-- Add canonical_slug column to location_content table
ALTER TABLE public.location_content
ADD COLUMN IF NOT EXISTS canonical_slug TEXT;

-- Update existing records with canonical_slug from locations table
UPDATE public.location_content lc
SET canonical_slug = l.canonical_slug
FROM public.locations l
WHERE lc.location_id = l.id;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_location_content_canonical_slug ON public.location_content(canonical_slug);