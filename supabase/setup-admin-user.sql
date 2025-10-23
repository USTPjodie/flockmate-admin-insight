-- Comprehensive script to set up jodierey.fernandez@ustp.edu.ph as admin
-- User UID: c2b0d1ef-6bc0-4aaf-aba3-e0353bbfddff

-- First, check if the user already exists in auth.users
-- Note: This query requires admin privileges and may not work in the SQL editor
-- SELECT * FROM auth.users WHERE id = 'c2b0d1ef-6bc0-4aaf-aba3-e0353bbfddff';

-- If the user doesn't exist in auth.users, you would need to create it via the Supabase Admin API
-- This cannot be done via SQL directly in the Supabase SQL editor

-- Create or update the profile in the public.profiles table
INSERT INTO public.profiles (id, email, full_name, role)
VALUES (
  'c2b0d1ef-6bc0-4aaf-aba3-e0353bbfddff',
  'jodierey.fernandez@ustp.edu.ph',
  'JODIE Rey Fernandez',
  'admin'
)
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name;

-- Verify the profile was created/updated correctly
SELECT 
  id, 
  email, 
  full_name, 
  role, 
  created_at, 
  updated_at 
FROM public.profiles 
WHERE id = 'c2b0d1ef-6bc0-4aaf-aba3-e0353bbfddff';

-- Grant additional permissions if needed
-- Since this user is now an admin, they will have access to all data through RLS policies

-- Test that the user can access admin-only data
-- This would typically be done in the application, but you can test with:
-- SELECT * FROM public.financial_data LIMIT 1;
-- (This should work if the user is properly authenticated as admin)

-- If you need to manually verify RLS is working correctly, you can temporarily disable it:
-- ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;
-- SELECT * FROM public.profiles WHERE id = 'c2b0d1ef-6bc0-4aaf-aba3-e0353bbfddff';
-- ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;