# Country System Scripts

This directory contains scripts to help set up and manage the country page system.

## Available Scripts

### `output-migration-sql.js`
Outputs the complete SQL migration to the terminal for easy copying to Supabase SQL Editor.
```bash
node scripts/output-migration-sql.js
```

### `run-country-migration.js`
Runs the migration using the Supabase CLI (requires Supabase CLI to be installed).
```bash
node scripts/run-country-migration.js
```

### `seed-country-data.js`
Seeds the database with initial country, region, and county data.
```bash
node scripts/seed-country-data.js
```

### `test-country-setup.js`
Tests that the country system is properly set up.
```bash
node scripts/test-country-setup.js
```

### `check-db-state.js`
Diagnoses the current database state and checks for conflicting tables.
```bash
node scripts/check-db-state.js
```

## Usage Instructions

1. **Run the migration** (choose one method):
   - **Recommended**: Use `output-migration-sql.js` to get SQL for Supabase SQL Editor
   - Alternative: Use `run-country-migration.js` if you have Supabase CLI installed

2. **Seed the data**:
   ```bash
   node scripts/seed-country-data.js
   ```

3. **Test the setup**:
   ```bash
   node scripts/test-country-setup.js
   ```