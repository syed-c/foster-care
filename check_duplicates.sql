-- Check for duplicate location_id values that might prevent unique constraint
SELECT location_id, COUNT(*) as count
FROM public.location_content
GROUP BY location_id
HAVING COUNT(*) > 1;

-- If duplicates are found, you might need to clean them up first