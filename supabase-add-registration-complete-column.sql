-- Migration script to add registration_complete column to agencies table
-- This script can be run on an existing database to add the missing column

-- Add the registration_complete column to the agencies table
ALTER TABLE agencies 
ADD COLUMN IF NOT EXISTS registration_complete BOOLEAN DEFAULT FALSE;

-- Update any existing agencies to have the registration_complete column set to false by default
-- (This is already handled by the DEFAULT FALSE, but we're being explicit)
UPDATE agencies 
SET registration_complete = FALSE 
WHERE registration_complete IS NULL;

-- Add a comment to document the column purpose
COMMENT ON COLUMN agencies.registration_complete IS 'Indicates if the agency has completed initial registration';