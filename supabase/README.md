# Flockmate Supabase Database Setup

This directory contains all the necessary SQL files to set up your Flockmate poultry farm management system database in Supabase.

## Files Overview

1. **[complete-schema.sql](file:///c%3A/Users/JODIE/Desktop/React/flockmate-admin-insight/supabase/schema.sql)** - Contains the complete database schema including:
   - All table definitions
   - Row Level Security (RLS) policies
   - Functions and triggers
   - Proper security configurations

2. **[sample-data.sql](file:///c%3A/Users/JODIE/Desktop/React/flockmate-admin-insight/supabase/sample-data.sql)** - Contains sample data for testing and development

3. **[setup-admin-user.sql](file:///c%3A/Users/JODIE/Desktop/React/flockmate-admin-insight/supabase/setup-admin-user.sql)** - Script to set up the initial admin user

4. **Migration files** - Incremental changes to the schema over time

## Setup Instructions

### 1. Run the Complete Schema

Execute [complete-schema.sql](file:///c%3A/Users/JODIE/Desktop/React/flockmate-admin-insight/supabase/schema.sql) in your Supabase SQL editor to create all tables, functions, and policies.

### 2. Set Up Admin User

Run [setup-admin-user.sql](file:///c%3A/Users/JODIE/Desktop/React/flockmate-admin-insight/supabase/setup-admin-user.sql) to create or update your admin user.

### 3. (Optional) Add Sample Data

For development/testing purposes, run [sample-data.sql](file:///c%3A/Users/JODIE/Desktop/React/flockmate-admin-insight/supabase/sample-data.sql) to populate tables with sample data.

## Database Schema

The Flockmate database consists of the following tables:

- **profiles** - User information and roles
- **financial_data** - Revenue, costs, and profit data
- **cost_breakdown** - Detailed cost breakdown information
- **farm_performance** - Farm performance metrics (FCR, mortality, etc.)
- **alerts** - System alerts and notifications
- **dashboard_metrics** - Key metrics displayed on the dashboard
- **farms** - Farm information and details

## Security

All tables have Row Level Security (RLS) enabled with policies that restrict access based on user roles. Only admin users can access all data, while other roles have limited access as defined in the policies.

## Functions and Triggers

- **handle_new_user()** - Automatically creates a profile when a new user signs up
- **update_updated_at()** - Updates the `updated_at` timestamp when records are modified
- **update_farms_updated_at()** - Updates the `updated_at` timestamp for farms table

These functions are triggered automatically and should not require manual intervention.
