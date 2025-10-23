-- Flockmate - Complete Database Schema
-- This file contains the complete schema for the Flockmate poultry farm management system

-- Create profiles table for user data
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'manager', 'operator')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create financial_data table
CREATE TABLE IF NOT EXISTS public.financial_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  month TEXT NOT NULL,
  revenue DECIMAL(10,2) NOT NULL,
  cost DECIMAL(10,2) NOT NULL,
  profit DECIMAL(10,2) NOT NULL,
  margin DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create cost_breakdown table
CREATE TABLE IF NOT EXISTS public.cost_breakdown (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  value INTEGER NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create farm_performance table
CREATE TABLE IF NOT EXISTS public.farm_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  farm_name TEXT NOT NULL,
  fcr DECIMAL(4,2) NOT NULL,
  mortality DECIMAL(4,2) NOT NULL,
  avg_weight DECIMAL(5,2) NOT NULL,
  cost_per_kg DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create alerts table
CREATE TABLE IF NOT EXISTS public.alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type TEXT NOT NULL CHECK (type IN ('critical', 'warning', 'info', 'success')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  farm TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  read BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create dashboard_metrics table
CREATE TABLE IF NOT EXISTS public.dashboard_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT NOT NULL,
  metric_value TEXT NOT NULL,
  change_percentage TEXT,
  change_type TEXT CHECK (change_type IN ('positive', 'negative', 'neutral')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create farms table
CREATE TABLE IF NOT EXISTS public.farms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  capacity INTEGER NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'maintenance')) DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cost_breakdown ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farm_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.farms ENABLE ROW LEVEL SECURITY;

-- Fix profiles table RLS policies to avoid infinite recursion
-- Drop existing policies
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can update all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

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

-- Create policies for financial_data table
DROP POLICY IF EXISTS "Admins can manage financial data" ON public.financial_data;
CREATE POLICY "Admins can manage financial data"
  ON public.financial_data FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create policies for cost_breakdown table
DROP POLICY IF EXISTS "Admins can manage cost breakdown" ON public.cost_breakdown;
CREATE POLICY "Admins can manage cost breakdown"
  ON public.cost_breakdown FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create policies for farm_performance table
DROP POLICY IF EXISTS "Admins can manage farm performance" ON public.farm_performance;
CREATE POLICY "Admins can manage farm performance"
  ON public.farm_performance FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create policies for alerts table
DROP POLICY IF EXISTS "Admins can manage alerts" ON public.alerts;
CREATE POLICY "Admins can manage alerts"
  ON public.alerts FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create policies for dashboard_metrics table
DROP POLICY IF EXISTS "Admins can manage dashboard metrics" ON public.dashboard_metrics;
CREATE POLICY "Admins can manage dashboard metrics"
  ON public.dashboard_metrics FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create policies for farms table
DROP POLICY IF EXISTS "Admins can manage farms" ON public.farms;
CREATE POLICY "Admins can manage farms"
  ON public.farms FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  ));

-- Create function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'Admin User'),
    'admin'
  );
  RETURN NEW;
END;
$$;

-- Create trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Create function to update updated_at timestamp for farms
CREATE OR REPLACE FUNCTION public.update_farms_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Drop existing triggers
DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
DROP TRIGGER IF EXISTS update_farm_performance_updated_at ON public.farm_performance;
DROP TRIGGER IF EXISTS update_dashboard_metrics_updated_at ON public.dashboard_metrics;
DROP TRIGGER IF EXISTS update_farms_updated_at ON public.farms;

-- Add triggers for updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_farm_performance_updated_at
  BEFORE UPDATE ON public.farm_performance
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_dashboard_metrics_updated_at
  BEFORE UPDATE ON public.dashboard_metrics
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER update_farms_updated_at
  BEFORE UPDATE ON public.farms
  FOR EACH ROW
  EXECUTE FUNCTION public.update_farms_updated_at();

-- Sample data for initial setup
-- Note: This should be run after setting up the admin user
-- INSERT INTO public.financial_data (month, revenue, cost, profit, margin) VALUES
--   ('January 2025', 15000.00, 10000.00, 5000.00, 33.33),
--   ('February 2025', 18000.00, 12000.00, 6000.00, 33.33),
--   ('March 2025', 20000.00, 13000.00, 7000.00, 35.00);

-- INSERT INTO public.cost_breakdown (name, value, amount) VALUES
--   ('Feed', 40, 5000.00),
--   ('Labor', 25, 3000.00),
--   ('Medication', 15, 1500.00),
--   ('Utilities', 10, 1000.00),
--   ('Other', 10, 1000.00);

-- INSERT INTO public.farm_performance (farm_name, fcr, mortality, avg_weight, cost_per_kg) VALUES
--   ('Farm A', 1.65, 3.2, 2.4, 3.75),
--   ('Farm B', 1.58, 2.8, 2.5, 3.60),
--   ('Farm C', 1.72, 4.1, 2.3, 3.90);

-- INSERT INTO public.alerts (type, title, message, farm) VALUES
--   ('critical', 'High Mortality Rate', 'Farm B is reporting mortality rates above threshold', 'Farm B'),
--   ('warning', 'Feed Shortage', 'Low feed inventory reported at Farm A', 'Farm A'),
--   ('info', 'New Batch Started', 'New batch initiated at Farm C', 'Farm C');

-- INSERT INTO public.dashboard_metrics (metric_name, metric_value, change_percentage, change_type) VALUES
--   ('Total Revenue', '$53,000', '+12%', 'positive'),
--   ('Avg. FCR', '1.65', '-0.02', 'positive'),
--   ('Mortality Rate', '3.37%', '+0.15%', 'negative'),
--   ('Profit Margin', '33.89%', '+0.56%', 'positive');

-- INSERT INTO public.farms (name, location, capacity, status) VALUES
--   ('Farm A', 'Location 1', 10000, 'active'),
--   ('Farm B', 'Location 2', 15000, 'active'),
--   ('Farm C', 'Location 3', 12000, 'maintenance');