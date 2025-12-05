-- verify_changes.sql
-- Verification queries to run after applying changes

-- 1. Check that tables exist with correct structure
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name IN ('locations', 'location_content') 
AND table_schema = 'public'
ORDER BY table_name, ordinal_position;

-- 2. Check that constraints exist
SELECT 
    constraint_name,
    constraint_type,
    table_name
FROM information_schema.table_constraints 
WHERE table_name IN ('locations', 'location_content')
AND constraint_name IN ('location_content_location_id_unique');

-- 3. Check that indices exist
SELECT 
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename IN ('locations', 'location_content')
AND indexname IN ('idx_location_content_location_id', 'idx_locations_slug', 'idx_locations_canonical_slug');

-- 4. Verify content is stored as proper JSONB (not stringified)
SELECT 
    location_id,
    jsonb_typeof(content_json) as json_type,
    LENGTH(content_json::text) as json_length
FROM public.location_content 
WHERE location_id = '26118208-ebf9-47c7-9188-7d8a98ed6171'  -- Replace with actual test ID
LIMIT 1;

-- 5. Check sample content structure
SELECT 
    l.id,
    l.name,
    l.canonical_slug,
    c.template_type,
    jsonb_pretty(c.content_json) as content
FROM public.locations l
JOIN public.location_content c ON l.id = c.location_id
WHERE l.id = '26118208-ebf9-47c7-9188-7d8a98ed6171'  -- Replace with actual test ID
LIMIT 1;