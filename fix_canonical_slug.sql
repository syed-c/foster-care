-- Fix the canonical_slug for the Bath location
UPDATE public.location_content
SET canonical_slug = '/foster-agency/england/bath-and-north-east-somerset/bath'
WHERE location_id = '26118208-ebf9-47c7-9188-7d8a98ed6171';

-- Verify the update
SELECT location_id, canonical_slug, content_json 
FROM public.location_content 
WHERE location_id = '26118208-ebf9-47c7-9188-7d8a98ed6171';