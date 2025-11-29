CREATE TABLE IF NOT EXISTS public.location_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  canonical_slug text UNIQUE NOT NULL,
  page_type text NOT NULL, -- country | region | city
  sections jsonb DEFAULT '[]'::jsonb,
  meta_title text,
  meta_description text,
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS location_content_slug_idx
  ON location_content (canonical_slug);