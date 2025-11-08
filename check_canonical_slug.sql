-- Check if the canonical_slug is set correctly for the Bath location
SELECT content_json
FROM public.location_content
WHERE canonical_slug = '/foster-agency/england/bath-and-north-east-somerset/bath';

-- Check the most recently updated record
SELECT * FROM public.location_content ORDER BY updated_at DESC LIMIT 1;

-- Check if there are any records without canonical_slug
SELECT location_id, content_json FROM public.location_content WHERE canonical_slug IS NULL OR canonical_slug = '' ORDER BY updated_at DESC LIMIT 5;