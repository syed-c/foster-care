-- I. DB audit & SQL (run these first in Supabase SQL editor)

-- 1) Confirm the `locations` and `location_content` tables exist:
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('locations','location_content');

-- If locations missing — create it (option A — recommended):
CREATE TABLE IF NOT EXISTS public.locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  parent_id uuid REFERENCES public.locations(id) ON DELETE CASCADE,
  type text CHECK (type IN ('country','region','county','city')) NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create location_content if missing (option keeps FK):
CREATE TABLE IF NOT EXISTS public.location_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id uuid NOT NULL REFERENCES public.locations(id) ON DELETE CASCADE,
  template_type text DEFAULT 'city',
  content_json jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Ensure UNIQUE constraint exists on location_id for upsert-on-conflict:
-- First check if constraint exists
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

-- Fix old stringified JSON rows (one-time migration):
-- Only run if some rows are stringified JSON (jsonb_typeof returns null for strings)
UPDATE public.location_content
SET content_json = (content_json::text)::jsonb
WHERE jsonb_typeof(content_json) IS NULL;

-- Verify content saved recently:
SELECT l.id, l.name, c.template_type, jsonb_pretty(c.content_json) as content, c.updated_at
FROM public.locations l
LEFT JOIN public.location_content c ON l.id = c.location_id
ORDER BY c.updated_at DESC
LIMIT 10;