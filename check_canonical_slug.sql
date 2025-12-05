-- Check if canonical_slug columns exist
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'countries' AND column_name = 'canonical_slug';

SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'regions' AND column_name = 'canonical_slug';

SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'cities' AND column_name = 'canonical_slug';