-- Fix existing stringified JSON rows
-- Convert stringified JSON to proper JSONB

UPDATE public.location_content
SET content_json = content_json::jsonb
WHERE jsonb_typeof(content_json) IS NULL;