-- Check current structure of location_content table
SELECT 
    column_name,
    data_type,
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_name = 'location_content' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check if location_content table exists
SELECT table_name 
FROM information_schema.tables 
WHERE table_name = 'location_content' 
AND table_schema = 'public';

-- Check constraints on location_content table
SELECT 
    constraint_name,
    constraint_type
FROM information_schema.table_constraints
WHERE table_name = 'location_content'
AND table_schema = 'public';