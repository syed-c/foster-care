# Troubleshooting Guide

This guide helps you resolve common issues that may occur when setting up the country page system.

## Quick Solution for Supabase CLI Not Found Error

Since you're getting a "supabase: not found" error, the easiest solution is to use our new script that outputs the SQL directly to your terminal:

```bash
node scripts/output-migration-sql.js
```

Then copy and paste the SQL into your Supabase SQL Editor.

## Common Issues and Solutions

### 1. Column Does Not Exist Error

**Error Message:**
```
ERROR: 42703: column "title" of relation "countries" does not exist
```

**Cause:**
This error occurs when:
1. An existing `countries` table exists but with a different schema (missing the `title` column)
2. Partial migration was run previously
3. Conflicting table structures from previous attempts

**Solution:**

1. **Diagnose the current database state:**
   ```bash
   node scripts/check-db-state.js
   ```

2. **Drop all existing country system tables:**
   ```sql
   -- Run these commands in your Supabase SQL Editor
   DROP TABLE IF EXISTS counties CASCADE;
   DROP TABLE IF EXISTS regions CASCADE;
   DROP TABLE IF EXISTS countries CASCADE;
   DROP TABLE IF EXISTS country_page_blocks CASCADE;
   DROP TABLE IF EXISTS admin_users CASCADE;
   ```

3. **Verify tables are dropped:**
   ```sql
   -- Check that no country system tables remain
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name IN ('countries', 'regions', 'counties', 'country_page_blocks', 'admin_users');
   ```

4. **Run the full migration:**
   - Use `node scripts/output-migration-sql.js` to get the SQL
   - Copy and paste into Supabase SQL Editor
   - Click RUN

### 2. Duplicate Key Value Violates Unique Constraint

**Error Message:**
```
ERROR: 23505: duplicate key value violates unique constraint
```

**Cause:**
This happens when trying to insert a record that already exists with the same unique key.

**Solution:**

1. **Use UPSERT instead of INSERT:**
   The updated migration script now uses conditional inserts that check if records exist before inserting.

2. **Clear existing data (if needed):**
   ```sql
   DELETE FROM country_page_blocks WHERE country_id IN (SELECT id FROM countries WHERE slug = 'england');
   DELETE FROM counties WHERE country_id IN (SELECT id FROM countries WHERE slug = 'england');
   DELETE FROM regions WHERE country_id IN (SELECT id FROM countries WHERE slug = 'england');
   DELETE FROM countries WHERE slug = 'england';
   ```

### 3. UUID Generation Function Not Found

**Error Message:**
```
ERROR: function gen_random_uuid() does not exist
```

**Cause:**
The `gen_random_uuid()` function requires the `pgcrypto` extension to be enabled.

**Solution:**

1. **Enable the pgcrypto extension:**
   ```sql
   CREATE EXTENSION IF NOT EXISTS "pgcrypto";
   ```

2. **Run the migration again**

### 4. Foreign Key Constraint Violation

**Error Message:**
```
ERROR: insert or update on table "regions" violates foreign key constraint
```

**Cause:**
This happens when trying to insert a record with a foreign key that doesn't exist in the referenced table.

**Solution:**

1. **Ensure parent records exist before inserting child records**
2. **Use the updated migration script which handles this with proper sequencing**

### 5. Permission Denied Errors

**Error Message:**
```
ERROR: permission denied for table countries
```

**Cause:**
The database user doesn't have the necessary permissions to create or modify tables.

**Solution:**

1. **Check your Supabase credentials in `.env.local`**
2. **Ensure you're using the service role key for administrative operations**
3. **Verify your user has the necessary permissions in Supabase**

### 6. Supabase CLI Not Found

**Error Message:**
```
supabase: not found
```

**Cause:**
The Supabase CLI is not installed or not in your system PATH.

**Solution:**

1. **Use our new script to output SQL directly to your terminal:**
   ```bash
   node scripts/output-migration-sql.js
   ```
2. **Copy the SQL output and paste it into your Supabase SQL Editor**
3. **Click RUN to execute the migration**

**Alternative Solution (if you want to install Supabase CLI):**

1. Install the Supabase CLI:
   ```bash
   npm install -g supabase
   ```
2. Login to your Supabase account:
   ```bash
   supabase login
   ```
3. Link your project:
   ```bash
   supabase link
   ```
4. Run the migration:
   ```bash
   node scripts/run-country-migration.js
   ```

## Testing Your Fix

After applying any of the above solutions:

1. **Test the database connection:**
   ```bash
   node scripts/test-country-setup.js
   ```

2. **Run the seed script:**
   ```bash
   node scripts/seed-country-data.js
   ```

3. **Verify the setup:**
   ```bash
   node scripts/test-country-setup.js
   ```

## Still Having Issues?

If you continue to experience problems:

1. **Check the Supabase logs** in your project dashboard
2. **Verify all environment variables** in your `.env.local` file
3. **Ensure you're using the correct Supabase project** and credentials
4. **Try running the migration manually** using the steps in `scripts/manual-migration-steps.md`

For additional help, please share:
- The exact error message
- The steps you took before encountering the error
- Your Supabase project configuration (without sensitive information)