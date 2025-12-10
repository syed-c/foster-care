# Foster Care Directory UK - Setup Guide

This guide walks you through setting up the complete Foster Care Directory UK project.

## Prerequisites

1. Node.js v18+ (project tested with v18.19.1)
2. Supabase account with a new project
3. Google Maps API key (for location features)
4. Sanity CMS account (for content management)

## Environment Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Update `.env.local` with your credentials:
   ```
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   # Sanity CMS
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=your_sanity_dataset
   
   # Google Maps
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   
   # Site URL (for API calls)
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

## Database Setup

### 1. Run Supabase Migrations

The project uses Supabase for database storage. Run the migrations to set up the schema:

```bash
supabase migration up
```

Or manually run the SQL files in the `supabase/migrations/` directory.

### 2. Run Database Migration

Since we're using Supabase instead of Prisma, run the migration using one of these methods:

#### Method A: Using Supabase SQL Editor (Recommended)

1. Run this command to output the SQL to your terminal:
   ```bash
   node scripts/output-migration-sql.js
   ```
2. Copy the SQL output and paste it into your Supabase SQL Editor
3. Click RUN to execute the migration

#### Method B: Manual SQL Execution

If you prefer to run the SQL statements manually, follow the steps in `scripts/manual-migration-steps.md`

#### Method C: Using Supabase CLI

If you have the Supabase CLI installed:

```bash
node scripts/run-country-migration.js
```

### 3. Seed Initial Data

After running the migration, seed the database with initial data:

```bash
node scripts/seed-country-data.js
```

## Install Dependencies

Install all project dependencies:

```bash
npm install
```

## Start Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at http://localhost:3000

## Key Files and Directories

### Core Application Structure

- `app/` - Next.js App Router pages
  - `foster-agency/[countrySlug]/page.tsx` - Foster agency page route
  - `cms/` - CMS dashboard and editor
  - `api/foster-agency/[countrySlug]/route.ts` - Fetch country data
  - `api/cms/save/route.ts` - Save CMS edits

## Testing the Implementation

After setup, test these features:

1. Navigate to `/foster-agency/england` to see the country page
2. Click on county cards to see the expand animation
3. Use the close button to return to the country view
4. Visit `/cms` to access the CMS dashboard
5. Try editing content in `/cms/edit/england`

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

## Next Steps

1. Customize the content in the CMS
2. Add more countries, regions, and counties as needed
3. Extend the CMS functionality for more content types
4. Implement additional animations or transitions as desired