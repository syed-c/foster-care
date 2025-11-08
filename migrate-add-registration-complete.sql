-- Migration script to add registration_complete column to agencies table
-- Run this in your Supabase SQL editor to update your existing database

-- Check if the column exists, and add it if it doesn't
ALTER TABLE agencies 
ADD COLUMN IF NOT EXISTS registration_complete BOOLEAN DEFAULT FALSE;

-- Add a comment to document the column purpose
COMMENT ON COLUMN agencies.registration_complete IS 'Indicates if the agency has completed initial registration';

-- Update any existing agencies to have the registration_complete column set to false by default
-- (This is already handled by the DEFAULT FALSE, but we're being explicit)
UPDATE agencies 
SET registration_complete = FALSE 
WHERE registration_complete IS NULL;

-- Refresh the schema cache
-- Note: You may need to refresh your Supabase schema cache after running this