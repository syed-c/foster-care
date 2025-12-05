-- Verify that content is now stored as proper JSONB
SELECT 
    l.id, 
    l.name, 
    c.template_type, 
    jsonb_typeof(c.content_json) as json_type,
    jsonb_pretty(c.content_json) as content,
    c.updated_at
FROM public.locations l
LEFT JOIN public.location_content c ON l.id = c.location_id
WHERE l.id = '26118208-ebf9-47c7-9188-7d8a98ed6171'
ORDER BY c.updated_at DESC
LIMIT 10;