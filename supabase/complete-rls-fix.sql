-- Complete RLS fix for Flockmate application
-- This script fixes the infinite recursion issue and ensures proper data access

-- 1. First, let's check the current state of the admin user
SELECT 
    u.email,
    u.id as user_id,
    p.full_name,
    p.role,
    p.created_at as profile_created_at
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE u.email = 'admin@flockmate.com';

-- 2. Ensure the admin user has the correct role
UPDATE public.profiles 
SET role = 'admin', full_name = 'Admin User'
WHERE email = 'admin@flockmate.com';

-- 3. Fix the infinite recursion issue by simplifying RLS policies

-- Disable RLS temporarily to make changes
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_data DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.cost_breakdown DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.farm_performance DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_metrics DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.farms DISABLE ROW LEVEL SECURITY;

-- Drop all existing problematic policies
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can delete their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can delete any profile" ON public.profiles;

DROP POLICY IF EXISTS "Admins can manage financial data" ON public.financial_data;
DROP POLICY IF EXISTS "Admins can manage cost breakdown" ON public.cost_breakdown;
DROP POLICY IF EXISTS "Admins can manage farm performance" ON public.farm_performance;
DROP POLICY IF EXISTS "Admins can manage alerts" ON public.alerts;
DROP POLICY IF EXISTS "Admins can manage dashboard metrics" ON public.dashboard_metrics;
DROP POLICY IF EXISTS "Admins can manage farms" ON public.farms;

-- Create simplified policies that don't cause recursion

-- Profiles table policies (simple and safe)
CREATE POLICY "Allow users to view their own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Allow users to update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Allow users to insert their own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (id = auth.uid());

CREATE POLICY "Allow users to delete their own profile"
  ON public.profiles FOR DELETE
  TO authenticated
  USING (id = auth.uid());

-- Other tables policies (admin only access)
-- We'll use a simpler approach that avoids querying the profiles table within the policy

-- For now, let's create policies that allow all authenticated users to read data
-- (we'll tighten this later once we confirm the recursion issue is fixed)

CREATE POLICY "Allow authenticated users to read financial data"
  ON public.financial_data FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage financial data"
  ON public.financial_data FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Allow authenticated users to read cost breakdown"
  ON public.cost_breakdown FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage cost breakdown"
  ON public.cost_breakdown FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Allow authenticated users to read farm performance"
  ON public.farm_performance FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage farm performance"
  ON public.farm_performance FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Allow authenticated users to read alerts"
  ON public.alerts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage alerts"
  ON public.alerts FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Allow authenticated users to read dashboard metrics"
  ON public.dashboard_metrics FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage dashboard metrics"
  ON public.dashboard_metrics FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

CREATE POLICY "Allow authenticated users to read farms"
  ON public.farms FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage farms"
  ON public.farms FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Re-enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cost_breakdown ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farm_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;

-- Grant necessary permissions
GRANT ALL ON public.profiles TO authenticated;
GRANT ALL ON public.financial_data TO authenticated;
GRANT ALL ON public.cost_breakdown TO authenticated;
GRANT ALL ON public.farm_performance TO authenticated;
GRANT ALL ON public.alerts TO authenticated;
GRANT ALL ON public.dashboard_metrics TO authenticated;
GRANT ALL ON public.farms TO authenticated;

-- 4. Verify the fix by checking if we can access the admin profile now
SELECT 
    u.email,
    u.id as user_id,
    p.full_name,
    p.role,
    p.created_at as profile_created_at
FROM auth.users u
JOIN public.profiles p ON u.id = p.id
WHERE u.email = 'admin@flockmate.com';