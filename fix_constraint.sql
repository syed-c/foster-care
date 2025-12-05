-- Alternative approach to ensure UNIQUE constraint exists on location_id for upsert-on-conflict:
-- Drop and recreate the constraint (safer approach)

-- First, try to drop the constraint if it exists
ALTER TABLE public.location_content
  DROP CONSTRAINT IF EXISTS location_content_location_id_unique;

-- Then add the constraint
ALTER TABLE public.location_content
  ADD CONSTRAINT location_content_location_id_unique UNIQUE (location_id);