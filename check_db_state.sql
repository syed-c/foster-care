-- check_db_state.sql
-- Check current database structure

-- Check if locations table exists and its columns
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'locations' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check if location_content table exists and its columns
SELECT 
    table_name,
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns 
WHERE table_name = 'location_content' 
AND table_schema = 'public'
ORDER BY ordinal_position;

-- Check constraints
SELECT 
    constraint_name,
    constraint_type,
    table_name
FROM information_schema.table_constraints 
WHERE table_name IN ('locations', 'location_content')
AND constraint_name IN ('location_content_location_id_unique');

-- Check if indices exist
SELECT 
    indexname,
    indexdef
FROM pg_indexes 
WHERE tablename IN ('locations', 'location_content');