-- SQL script to make jodierey.fernandez@ustp.edu.ph an admin
-- User UID: c2b0d1ef-6bc0-4aaf-aba3-e0353bbfddff

-- First, check if the user profile exists
SELECT * FROM public.profiles WHERE id = 'c2b0d1ef-6bc0-4aaf-aba3-e0353bbfddff';

-- If the profile doesn't exist, create it
INSERT INTO public.profiles (id, email, full_name, role)
VALUES (
  'c2b0d1ef-6bc0-4aaf-aba3-e0353bbfddff',
  'jodierey.fernandez@ustp.edu.ph',
  'JODIE Rey Fernandez',
  'admin'
)
ON CONFLICT (id) DO UPDATE SET
  role = 'admin',
  email = 'jodierey.fernandez@ustp.edu.ph',
  full_name = 'JODIE Rey Fernandez';

-- Verify the update
SELECT id, email, full_name, role FROM public.profiles WHERE id = 'c2b0d1ef-6bc0-4aaf-aba3-e0353bbfddff';

-- If you also need to create the user in Supabase Auth (requires admin privileges),
-- you would use the Supabase Admin API, not SQL. But for the database profile, the above is sufficient.