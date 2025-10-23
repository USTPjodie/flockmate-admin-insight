# Flockmate Database Schema

This directory contains the complete database schema for the Flockmate poultry farm management system.

## Schema Overview

The Flockmate database consists of 6 main tables:

1. **profiles** - User profiles and roles
2. **financial_data** - Financial metrics and profitability data
3. **cost_breakdown** - Detailed cost analysis
4. **farm_performance** - Farm performance metrics (FCR, mortality, etc.)
5. **alerts** - System alerts and notifications
6. **dashboard_metrics** - Key dashboard metrics and KPIs

## Files

- `schema.sql` - Complete database schema with all tables, constraints, and policies
- `make-user-admin.sql` - Script to make a specific user an admin
- `setup-admin-user.sql` - Comprehensive script to set up an admin user
- `migrations/` - Migration files for incremental schema updates

## Key Features

### Row Level Security (RLS)
All tables have Row Level Security enabled with policies that:
- Restrict access to authenticated users only
- Allow admins to manage all data
- Provide appropriate access controls for different user roles

### Triggers
- Automatic profile creation when new users sign up
- Automatic timestamp updates for modified records

### Data Integrity
- Foreign key constraints
- Check constraints for data validation
- Default values for timestamps and UUIDs

## Applying the Schema

To apply this schema to a new Supabase project:

1. Create a new Supabase project
2. Go to the SQL editor in the Supabase dashboard
3. Copy and paste the contents of `schema.sql`
4. Run the SQL to create all tables and policies

## Setting Up Admin Users

To make a specific user an admin:

1. Use `make-user-admin.sql` to update an existing user's role to 'admin'
2. Use `setup-admin-user.sql` for a more comprehensive setup including verification

Example usage:
```sql
-- Make jodierey.fernandez@ustp.edu.ph an admin
INSERT INTO public.profiles (id, email, full_name, role)
VALUES (
  'c2b0d1ef-6bc0-4aaf-aba3-e0353bbfddff',
  'jodierey.fernandez@ustp.edu.ph',
  'JODIE Rey Fernandez',
  'admin'
)
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

## Tables

### profiles
Stores user information and roles:
- `id` (UUID) - Primary key, references auth.users
- `email` (TEXT) - User email
- `full_name` (TEXT) - User's full name
- `role` (TEXT) - User role (admin, manager, operator)
- `avatar_url` (TEXT) - URL to user's avatar
- `created_at` (TIMESTAMPTZ) - Record creation timestamp
- `updated_at` (TIMESTAMPTZ) - Record update timestamp

### financial_data
Stores financial metrics:
- `id` (UUID) - Primary key
- `month` (TEXT) - Month identifier
- `revenue` (DECIMAL) - Revenue amount
- `cost` (DECIMAL) - Cost amount
- `profit` (DECIMAL) - Profit amount
- `margin` (DECIMAL) - Profit margin
- `created_at` (TIMESTAMPTZ) - Record creation timestamp

### cost_breakdown
Stores detailed cost analysis:
- `id` (UUID) - Primary key
- `name` (TEXT) - Cost category name
- `value` (INTEGER) - Percentage value
- `amount` (DECIMAL) - Cost amount
- `created_at` (TIMESTAMPTZ) - Record creation timestamp

### farm_performance
Stores farm performance metrics:
- `id` (UUID) - Primary key
- `farm_name` (TEXT) - Name of the farm
- `fcr` (DECIMAL) - Feed Conversion Ratio
- `mortality` (DECIMAL) - Mortality rate
- `avg_weight` (DECIMAL) - Average weight
- `cost_per_kg` (DECIMAL) - Cost per kilogram
- `created_at` (TIMESTAMPTZ) - Record creation timestamp
- `updated_at` (TIMESTAMPTZ) - Record update timestamp

### alerts
Stores system alerts:
- `id` (UUID) - Primary key
- `type` (TEXT) - Alert type (critical, warning, info, success)
- `title` (TEXT) - Alert title
- `message` (TEXT) - Alert message
- `farm` (TEXT) - Associated farm
- `created_at` (TIMESTAMPTZ) - Record creation timestamp
- `read` (BOOLEAN) - Read status

### dashboard_metrics
Stores dashboard KPIs:
- `id` (UUID) - Primary key
- `metric_name` (TEXT) - Name of the metric
- `metric_value` (TEXT) - Metric value
- `change_percentage` (TEXT) - Percentage change
- `change_type` (TEXT) - Type of change (positive, negative, neutral)
- `created_at` (TIMESTAMPTZ) - Record creation timestamp
- `updated_at` (TIMESTAMPTZ) - Record update timestamp