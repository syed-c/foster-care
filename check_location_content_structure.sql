-- Check the structure of location_content table
SELECT 
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'location_content' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check if canonical_slug column exists
SELECT 
    column_name
FROM information_schema.columns 
WHERE table_name = 'location_content' 
AND column_name = 'canonical_slug'
AND table_schema = 'public';