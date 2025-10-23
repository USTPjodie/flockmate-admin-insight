# Debugging Guide

This guide explains how to debug and verify that your Flockmate web application data coincides with the database.

## Debug Page

We've added a debug page at `/debug` that shows the current database connection status and helps verify data synchronization.

### Accessing the Debug Page

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:XXXX/debug` (where XXXX is the port number)
3. View the database connection status and other diagnostic information

### What the Debug Page Shows

1. **Database Connection Status**
   - Whether the app is connected to the database
   - Whether the user is authenticated
   - Number of profiles found in the database
   - Any errors that occurred during the connection

2. **Data Synchronization Information**
   - Guidance on how to ensure data coincides between the app and database

## Verification Scripts

We've also created several command-line scripts to verify the connection and data:

### 1. Verify Database Connection
```bash
npm run verify-db
```
This script checks if the application can connect to the Supabase database.

### 2. Verify Data Synchronization
```bash
npm run verify-sync
```
This script checks if the data in the frontend matches the data in the database.

### 3. Test Admin Setup
```bash
npm run test-admin
```
This script verifies that the admin user (jodierey.fernandez@ustp.edu.ph) is properly configured.

### 4. Test Frontend Hooks
```bash
npm run test-hooks
```
This script verifies that the frontend hooks can be imported without errors.

## Ensuring Data Coincides

To ensure your data from the web app coincides with the database:

1. **Check Connection Status**
   - Visit the debug page to verify the database connection
   - Make sure you're logged in as a user with appropriate permissions

2. **Verify Real-time Updates**
   - Make a change in the UI and verify it appears in the database
   - Make a change in the database and verify it appears in the UI

3. **Check Row Level Security (RLS)**
   - Ensure your user account has the correct role assigned
   - Verify that you can access the data you expect to see

4. **Monitor for Errors**
   - Check the browser console for any errors
   - Look for network errors or permission denied messages

## Common Issues and Solutions

### Issue: "Disconnected" Status
**Solution**: 
1. Check your internet connection
2. Verify the Supabase credentials in the .env file
3. Make sure the Supabase project is active

### Issue: "Not Authenticated" Status
**Solution**:
1. Log in to the application
2. Check that your user account exists in the database
3. Verify your credentials

### Issue: Data Not Appearing
**Solution**:
1. Refresh the page
2. Check if you have proper permissions for the data
3. Verify that RLS policies allow access to the data

## Manual Verification

You can also manually verify data synchronization by:

1. Going to the Supabase dashboard
2. Navigating to the Table Editor
3. Checking that the data in the tables matches what you see in the UI
4. Making a test change directly in the database and verifying it appears in the UI

## Contact Support

If you continue to experience synchronization issues:
1. Take a screenshot of the debug page
2. Check the browser console for error messages
3. Run the verification scripts and save the output
4. Contact your system administrator or the development team