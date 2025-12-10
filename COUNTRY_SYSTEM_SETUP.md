# Country System Setup

This document explains how to set up the new country page system with CMS foundation.

## Prerequisites

1. Node.js v18+ (the project currently uses v18.19.1)
2. A Supabase project with credentials configured in `.env.local`
3. Supabase CLI installed (optional, for running migrations)

## Setup Instructions

### 1. Run the Database Migration

You can run the migration in one of three ways:

#### Option A: Using Supabase SQL Editor (Recommended)

1. Run this command to output the SQL to your terminal:
   ```bash
   node scripts/output-migration-sql.js
   ```
2. Copy the SQL output and paste it into your Supabase SQL Editor
3. Click RUN to execute the migration

#### Option B: Manual SQL Execution

If you prefer to run the SQL statements manually, follow the steps in `scripts/manual-migration-steps.md`

#### Option C: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
node scripts/run-country-migration.js
```

### 2. Seed Initial Data

After running the migration, seed the database with initial data:

```bash
node scripts/seed-country-data.js
```

### 3. Access the Pages

After setup, you can access:

- Foster agency page: `/foster-agency/england`
- CMS dashboard: `/cms`
- CMS editor: `/cms/edit/england`

## File Structure

The implementation creates these key files:

- Routes in `app/foster-agency/` and `app/cms/`
- API endpoints in `app/api/foster-agency/` and `app/api/cms/`

## Troubleshooting

If you encounter issues:

1. **Supabase CLI not found error**: Use `node scripts/output-migration-sql.js` to output the SQL directly to your terminal, then copy and paste it into your Supabase SQL Editor.

2. **Column does not exist errors**: This usually means an existing table with a different schema is conflicting. Drop all existing tables first:
   ```sql
   DROP TABLE IF EXISTS counties CASCADE;
   DROP TABLE IF EXISTS regions CASCADE;
   DROP TABLE IF EXISTS countries CASCADE;
   DROP TABLE IF EXISTS country_page_blocks CASCADE;
   DROP TABLE IF EXISTS admin_users CASCADE;
   ```
   
   Then verify they're gone:
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public' 
   AND table_name IN ('countries', 'regions', 'counties', 'country_page_blocks', 'admin_users');
   ```

3. **Other issues**: Refer to the detailed troubleshooting guide in `TROUBLESHOOTING.md`

## Testing

After setup, you can test:

1. Navigate to `/foster-agency/england` to see the country page
2. Click on county cards to see the expand animation
3. Use the close button to return to the country view
4. Visit `/cms` to access the CMS dashboard