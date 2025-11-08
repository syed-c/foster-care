-- PHASE 1 — DATABASE AUDIT & FIXES (run in Supabase SQL editor)

-- A. Verify the existence of tables:
SELECT table_name FROM information_schema.tables WHERE table_schema='public' AND table_name IN ('locations','location_content');

-- B. Create tables if missing (safe idempotent SQL):

-- locations
CREATE TABLE IF NOT EXISTS public.locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT 'Unnamed Location',
  slug text NOT NULL DEFAULT '',
  canonical_slug text,
  parent_id uuid REFERENCES public.locations(id) ON DELETE CASCADE,
  type text CHECK (type IN ('country','region','county','city')) NOT NULL DEFAULT 'city',
  editable boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- location_content
CREATE TABLE IF NOT EXISTS public.location_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id uuid NOT NULL REFERENCES public.locations(id) ON DELETE CASCADE,
  template_type text DEFAULT 'city',
  content_json jsonb DEFAULT '{}'::jsonb,
  canonical_slug text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- C. Add canonical_slug column to location_content if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'location_content' AND column_name = 'canonical_slug'
  ) THEN
    ALTER TABLE public.location_content ADD COLUMN canonical_slug text;
  END IF;
END $$;

-- D. Add canonical_slug column to locations if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'locations' AND column_name = 'canonical_slug'
  ) THEN
    ALTER TABLE public.locations ADD COLUMN canonical_slug text;
  END IF;
END $$;

-- E. Ensure unique constraint for upsert:
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'location_content_location_id_unique' 
    AND table_name = 'location_content'
  ) THEN
    ALTER TABLE public.location_content
      ADD CONSTRAINT location_content_location_id_unique UNIQUE (location_id);
  END IF;
END $$;

-- F. Convert any stringified JSONB -> proper jsonb:
UPDATE public.location_content
SET content_json = (content_json::text)::jsonb
WHERE jsonb_typeof(content_json) IS NULL;

-- G. Create indices for speed:
CREATE INDEX IF NOT EXISTS idx_location_content_location_id ON public.location_content(location_id);
CREATE INDEX IF NOT EXISTS idx_locations_slug ON public.locations(slug);
CREATE INDEX IF NOT EXISTS idx_locations_canonical_slug ON public.locations(canonical_slug);
CREATE INDEX IF NOT EXISTS idx_location_content_canonical_slug ON public.location_content(canonical_slug);

-- Log results
SELECT 'Database audit complete' as status;