# Supabase Migration Guide

## ✅ Fixed Issues

1. **Removed CSV Parser Dependency** - No more `csv-parse/sync` errors
2. **Migrated to Supabase Database** - All location data now stored in Supabase
3. **Created SQL Schema** - Ready to import to Supabase

## 📋 Step-by-Step Setup

### 1. Create Supabase Tables

Run the SQL schema in your Supabase SQL Editor:

```bash
# Copy the contents of supabase-foster-agency-schema.sql
# Paste and run in Supabase Dashboard > SQL Editor
```

Or run via Supabase CLI:
```bash
supabase db push
```

### 2. Import CSV Data to Supabase

Install dotenv if needed:
```bash
npm install dotenv --save-dev
```

Run the import script:
```bash
node scripts/import-csv-to-supabase.js
```

This will:
- Read `uk-foster-agency-location-urls.csv`
- Parse the data
- Import countries, regions, and cities to Supabase
- Show progress and results

### 3. Verify Environment Variables

Make sure `.env.local` has:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key  # Recommended for import script
```

### 4. Test the Application

```bash
npm run dev
```

Visit:
- `http://localhost:3000/foster-agency` - Should show countries from Supabase
- `http://localhost:3000/foster-agency/england` - Should show regions
- `http://localhost:3000/foster-agency/england/greater-london` - Should show cities
- `http://localhost:3000/foster-agency/england/greater-london/london` - Should show city page

## 📊 Database Structure

### Tables

1. **countries**
   - `id` (UUID, Primary Key)
   - `name` (TEXT, Unique)
   - `slug` (TEXT, Unique)
   - `created_at`, `updated_at`

2. **regions**
   - `id` (UUID, Primary Key)
   - `country_id` (UUID, Foreign Key → countries.id)
   - `name` (TEXT)
   - `slug` (TEXT)
   - `created_at`, `updated_at`
   - Unique constraint on (country_id, slug)

3. **cities**
   - `id` (UUID, Primary Key)
   - `region_id` (UUID, Foreign Key → regions.id)
   - `country_id` (UUID, Foreign Key → countries.id)
   - `name` (TEXT)
   - `slug` (TEXT)
   - `url` (TEXT)
   - `created_at`, `updated_at`
   - Unique constraint on (region_id, slug)

### Helper Functions

The schema includes PostgreSQL functions:
- `get_countries_with_stats()` - Get countries with region counts
- `get_regions_for_country(country_slug)` - Get regions for a country
- `get_cities_for_region(country_slug, region_slug)` - Get cities for a region
- `slugify(text)` - Convert text to URL-friendly slug

## 🔧 Code Changes

### Updated Files

1. **lib/locationData.js**
   - Now uses Supabase instead of CSV parser
   - All functions are async
   - New functions: `loadCountries()`, `loadRegionsForCountry()`, `loadCitiesForRegion()`

2. **lib/supabase-server.js**
   - New server-side Supabase client for use with `require()`
   - Used by `lib/locationData.js`

3. **app/foster-agency/** pages
   - All pages now use async/await
   - Fetch data from Supabase
   - Generate static params from database

4. **scripts/import-csv-to-supabase.js**
   - New script to import CSV data to Supabase
   - Handles batches for large datasets
   - Shows progress and results

## 🐛 Troubleshooting

### Import Script Fails

1. Check environment variables are set correctly
2. Verify Supabase credentials in `.env.local`
3. Make sure tables exist (run schema SQL first)
4. Check CSV file path is correct

### Pages Show Empty Data

1. Verify data was imported successfully
2. Check Supabase dashboard to see if tables have data
3. Check browser console for errors
4. Verify RLS policies allow public read access

### Build Errors

1. Make sure all async functions use `await`
2. Check `generateStaticParams` functions are async
3. Verify Supabase client is configured correctly

## 📝 SQL Queries for Verification

### Check imported data:

```sql
-- Count countries
SELECT COUNT(*) FROM countries;

-- Count regions
SELECT COUNT(*) FROM regions;

-- Count cities
SELECT COUNT(*) FROM cities;

-- View sample data
SELECT c.name as country, COUNT(DISTINCT r.id) as regions, COUNT(DISTINCT ci.id) as cities
FROM countries c
LEFT JOIN regions r ON r.country_id = c.id
LEFT JOIN cities ci ON ci.country_id = c.id
GROUP BY c.id, c.name
ORDER BY c.name;

-- View cities in a region
SELECT ci.name, ci.slug, ci.url
FROM cities ci
JOIN regions r ON ci.region_id = r.id
JOIN countries co ON ci.country_id = co.id
WHERE co.slug = 'england' AND r.slug = 'greater-london'
ORDER BY ci.name;
```

## ✅ Next Steps

1. ✅ Run SQL schema in Supabase
2. ✅ Import CSV data
3. ✅ Test pages
4. ✅ Verify data in Supabase dashboard
5. ✅ Update CMS content via admin panel

## 🎯 Benefits of Supabase Migration

- ✅ No external CSV parser dependency
- ✅ Fast queries with indexes
- ✅ Scalable for large datasets
- ✅ Easy to update via API
- ✅ Can add more fields later (e.g., agency listings, ratings)
- ✅ Supports real-time updates
- ✅ Better for production use

---

**All CSV parsing removed!** Data now comes entirely from Supabase. 🚀

