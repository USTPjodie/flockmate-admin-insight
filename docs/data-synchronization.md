# Data Synchronization Guide

This guide explains how to ensure your Flockmate web application data coincides with the Supabase database.

## Current Database Connection

The application is currently connected to:
- **Project ID**: `weonltiidlnpgvanwvba`
- **URL**: `https://weonltiidlnpgvanwvba.supabase.co`

## Verification Scripts

We've created several scripts to help you verify data synchronization:

1. **Verify Database Connection**: `npm run verify-db`
2. **Verify Data Synchronization**: `npm run verify-sync`
3. **Test Admin Setup**: `npm run test-admin`

## How to Ensure Data Coincides

### 1. Run Verification Scripts

```bash
# Check database connection
npm run verify-db

# Check data synchronization
npm run verify-sync
```

### 2. Check Real-time Updates

The application uses @tanstack/react-query for data fetching, which provides automatic caching and refetching. To ensure data is synchronized:

1. Make sure you're logged in as a user with appropriate permissions
2. Check that the UI updates when you make changes in the database
3. Verify that new data appears in the UI without requiring a full page refresh

### 3. Verify Admin Access

To ensure you have proper access to all data:

```bash
# Test if jodierey.fernandez@ustp.edu.ph is properly set as admin
npm run test-admin
```

### 4. Check Row Level Security (RLS)

The database uses RLS policies to control data access:
- Admin users can access all data
- Regular users can only access their own data
- Make sure your user account has the correct role assigned

### 5. Monitor for Errors

Check the browser console for any errors related to:
- Supabase connection issues
- Authentication failures
- Permission denied errors
- Network errors

## Common Issues and Solutions

### Issue: Data not appearing in the UI
**Solution**: 
1. Refresh the page
2. Check if you're logged in
3. Verify your user role has proper permissions
4. Check the browser console for errors

### Issue: Changes not saving to database
**Solution**:
1. Check your internet connection
2. Verify you have write permissions for the data you're trying to change
3. Check the browser console for errors
4. Verify the Supabase connection is working

### Issue: Outdated data in UI
**Solution**:
1. The app uses automatic refetching, but you can force a refresh
2. Check if there are any network issues
3. Verify the database triggers are working correctly

## Manual Database Verification

You can also manually verify data synchronization by:

1. Going to the Supabase dashboard
2. Navigating to the Table Editor
3. Checking that the data in the tables matches what you see in the UI
4. Making a test change directly in the database and verifying it appears in the UI

## Troubleshooting

If you're experiencing synchronization issues:

1. **Clear browser cache and localStorage**
2. **Check that environment variables are correct**
3. **Verify your user account has the correct role**
4. **Check Supabase logs for errors**
5. **Ensure you're using the latest version of the application**

## Contact Support

If you continue to experience synchronization issues:
1. Run the verification scripts and save the output
2. Check the browser console for error messages
3. Contact your system administrator or the development team