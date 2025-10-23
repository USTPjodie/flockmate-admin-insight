# Flockmate Scripts

This directory contains utility scripts for managing and testing your Flockmate application.

## Available Scripts

### Database Verification
```bash
npm run verify-db
```
Verifies database connectivity and checks if all required tables are accessible.

### Database Population
```bash
npm run populate-db
```
Populates the database with sample data for testing. Requires the Supabase Service Role Key.

### Admin User Creation
```bash
npm run create-admin
```
Creates an admin user for the application. Requires the Supabase Service Role Key.

### Get Service Role Key Instructions
```bash
npm run get-service-key
```
Displays instructions for obtaining and configuring the Supabase Service Role Key.

## Prerequisites

Most scripts require the following environment variables in your `.env` file:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

The `SUPABASE_SERVICE_ROLE_KEY` is required for scripts that need to bypass Row Level Security (RLS) policies, such as:
- `populate-db`
- `create-admin`

## Security Notes

⚠️ **Important**: Never use the `SUPABASE_SERVICE_ROLE_KEY` in frontend code. It should only be used in backend scripts and server-side code as it bypasses all RLS policies and has full access to your database.

## Troubleshooting

### RLS Policy Errors
If you see "new row violates row-level security policy" errors, make sure you've added the `SUPABASE_SERVICE_ROLE_KEY` to your `.env` file.

### Authentication Errors
If you see authentication-related errors, verify that:
1. Your Supabase URL is correct
2. Your API keys are valid
3. Your Supabase project is properly configured

### Network Errors
If you see network connectivity errors:
1. Check your internet connection
2. Verify that your Supabase project is active
3. Ensure that your firewall isn't blocking connections to Supabase