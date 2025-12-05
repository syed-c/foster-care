-- Corrected fix for location_content table schema based on actual structure
-- Run this in your Supabase SQL editor

-- Add missing constraints and indexes based on actual table structure

-- Ensure location_id column has proper foreign key constraint
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.table_constraints tc 
    JOIN information_schema.key_column_usage kcu 
      ON tc.constraint_name = kcu.constraint_name
    WHERE tc.table_name = 'location_content' 
    AND tc.constraint_type = 'FOREIGN KEY'
    AND kcu.column_name = 'location_id'
  ) THEN
    ALTER TABLE public.location_content
      ADD CONSTRAINT location_content_location_id_fkey 
      FOREIGN KEY (location_id) REFERENCES public.locations(id) ON DELETE CASCADE;
  END IF;
END $$;

-- Ensure location_id column has proper index
CREATE INDEX IF NOT EXISTS idx_location_content_location_id ON public.location_content(location_id);

-- Ensure canonical_slug column has proper index
CREATE INDEX IF NOT EXISTS idx_location_content_canonical_slug ON public.location_content(canonical_slug);

-- Refresh schema cache
NOTIFY pgrst, 'reload schema';

-- Final verification
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'location_content' 
AND table_schema = 'public'
ORDER BY ordinal_position;