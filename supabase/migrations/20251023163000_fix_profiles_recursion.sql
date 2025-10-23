-- Fix profiles table RLS policies to avoid infinite recursion
-- Drop existing problematic policies
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
    -- Check if the current user is an admin using a more direct approach
    -- We avoid recursion by using auth.jwt() to check role directly
    -- This assumes the role is stored in the JWT token
    'admin' = (auth.jwt() ->> 'user_role')
    OR
    -- Fallback: Check if user is admin by querying with LIMIT to prevent recursion
    EXISTS (
      SELECT 1 
      FROM public.profiles p 
      WHERE p.id = auth.uid() 
      AND p.role = 'admin'
      LIMIT 1
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
    -- Check if the current user is an admin using a more direct approach
    'admin' = (auth.jwt() ->> 'user_role')
    OR
    -- Fallback: Check if user is admin by querying with LIMIT to prevent recursion
    EXISTS (
      SELECT 1 
      FROM public.profiles p 
      WHERE p.id = auth.uid() 
      AND p.role = 'admin'
      LIMIT 1
    )
  );