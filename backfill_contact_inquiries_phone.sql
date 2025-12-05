-- This script can be used to backfill phone numbers if they exist in the message field
-- It's a simple example and should be customized based on your actual data structure

-- Example: Extract phone numbers from message field (if they follow a pattern)
-- This is a basic example and may need to be adjusted for your specific data
UPDATE contact_inquiries 
SET phone = SUBSTRING(message FROM '\d{10,11}') 
WHERE phone IS NULL 
AND message ~ '\d{10,11}';

-- You can add more specific patterns based on your data
-- For example, if phone numbers are mentioned with "Phone:" or "Tel:"
UPDATE contact_inquiries 
SET phone = TRIM(BOTH FROM REGEXP_REPLACE(SUBSTRING(message FROM 'Phone:\s*([0-9\s\-\+\(\)]+)'), '[^\d\+\(\)\s\-]', '', 'g'))
WHERE phone IS NULL 
AND message ~* 'Phone:';

UPDATE contact_inquiries 
SET phone = TRIM(BOTH FROM REGEXP_REPLACE(SUBSTRING(message FROM 'Tel:\s*([0-9\s\-\+\(\)]+)'), '[^\d\+\(\)\s\-]', '', 'g'))
WHERE phone IS NULL 
AND message ~* 'Tel:';

-- Add more patterns as needed based on your data