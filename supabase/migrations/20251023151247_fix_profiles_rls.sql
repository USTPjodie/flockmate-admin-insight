-- Fix profiles table RLS policies to avoid infinite recursion
-- Drop existing policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;

-- Create new policies that don't cause recursion
-- For SELECT: Allow users to view their own profile, and admins to view all profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (
    -- First check if user is viewing their own profile
    id = auth.uid()
    OR
    -- Check if the current user is an admin
    -- We avoid recursion by using a subquery that limits the scope
    EXISTS (
      SELECT 1 FROM (
        SELECT role FROM public.profiles WHERE id = auth.uid()
      ) AS user_profile 
      WHERE user_profile.role = 'admin'
    )
  );

-- For UPDATE: Allow users to update their own profile, and admins to update all profiles
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Admins can update all profiles"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (
    -- Check if the current user is an admin
    -- We avoid recursion by using a subquery that limits the scope
    EXISTS (
      SELECT 1 FROM (
        SELECT role FROM public.profiles WHERE id = auth.uid()
      ) AS user_profile 
      WHERE user_profile.role = 'admin'
    )
  );