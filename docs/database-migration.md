# Database Migration Guide

This document explains how to migrate the Flockmate application to a new Supabase database.

## Current Database Configuration

The application has been updated to use the new Supabase database with the following credentials:

- **Project ID**: `weonltiidlnpgvanwvba`
- **URL**: `https://weonltiidlnpgvanwvba.supabase.co`
- **Anon Key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indlb25sdGlpZGxucGd2YW53dmJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjExNzgzMzAsImV4cCI6MjA3Njc1NDMzMH0.0DS5-ILmlYMYygWrJKfyv2qcS-5kS505KmM4vZPKtX8`

## Changes Made

1. **Environment Variables** (`.env` file):
   - Updated `VITE_SUPABASE_PROJECT_ID`
   - Updated `VITE_SUPABASE_PUBLISHABLE_KEY`
   - Updated `VITE_SUPABASE_URL`

2. **Supabase Configuration** (`supabase/config.toml`):
   - Updated `project_id` to `weonltiidlnpgvanwvba`

## Applying Database Migrations

To set up the new database with the required schema, run the following migrations:

```bash
# Navigate to the project directory
cd c:\Users\JODIE\Desktop\React\flockmate-admin-insight

# Link to the new Supabase project (if using Supabase CLI)
supabase link --project-ref weonltiidlnpgvanwvba

# Apply migrations
supabase migration up
```

## Regenerating TypeScript Types (Optional)

If you need to regenerate the TypeScript types from the new database schema:

```bash
# Generate types from the remote database
supabase gen types typescript --project-id weonltiidlnpgvanwvba > src/integrations/supabase/types.ts
```

## Testing the Migration

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to the application in your browser
3. Test user authentication and data access
4. Verify that all features work correctly with the new database

## Troubleshooting

If you encounter issues after migration:

1. Clear browser localStorage and cookies for the application
2. Ensure all environment variables are correctly set
3. Check that the database migrations have been applied successfully
4. Verify that the RLS policies are correctly configured

## Rollback Procedure

If you need to rollback to the previous database:

1. Restore the previous values in `.env` file
2. Restore the previous `project_id` in `supabase/config.toml`
3. Reapply any necessary migrations to the old database