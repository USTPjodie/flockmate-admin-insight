-- Flockmate - Sample Data
-- This file contains sample data to populate the Flockmate poultry farm management system

-- Sample financial data
INSERT INTO public.financial_data (month, revenue, cost, profit, margin) VALUES
  ('January 2025', 15000.00, 10000.00, 5000.00, 33.33),
  ('February 2025', 18000.00, 12000.00, 6000.00, 33.33),
  ('March 2025', 20000.00, 13000.00, 7000.00, 35.00),
  ('April 2025', 17500.00, 11500.00, 6000.00, 34.29),
  ('May 2025', 19000.00, 12500.00, 6500.00, 34.21),
  ('June 2025', 21000.00, 13500.00, 7500.00, 35.71);

-- Sample cost breakdown
INSERT INTO public.cost_breakdown (name, value, amount) VALUES
  ('Feed', 40, 5000.00),
  ('Labor', 25, 3000.00),
  ('Medication', 15, 1500.00),
  ('Utilities', 10, 1000.00),
  ('Other', 10, 1000.00);

-- Sample farm performance data
INSERT INTO public.farm_performance (farm_name, fcr, mortality, avg_weight, cost_per_kg) VALUES
  ('Farm A', 1.65, 3.2, 2.4, 3.75),
  ('Farm B', 1.58, 2.8, 2.5, 3.60),
  ('Farm C', 1.72, 4.1, 2.3, 3.90),
  ('Farm D', 1.60, 3.0, 2.45, 3.65),
  ('Farm E', 1.68, 3.5, 2.35, 3.80);

-- Sample alerts
INSERT INTO public.alerts (type, title, message, farm) VALUES
  ('critical', 'High Mortality Rate', 'Farm B is reporting mortality rates above threshold', 'Farm B'),
  ('warning', 'Feed Shortage', 'Low feed inventory reported at Farm A', 'Farm A'),
  ('info', 'New Batch Started', 'New batch initiated at Farm C', 'Farm C'),
  ('success', 'Vaccination Complete', 'All birds vaccinated at Farm D', 'Farm D'),
  ('warning', 'Temperature Fluctuation', 'Unstable temperatures detected at Farm E', 'Farm E');

-- Sample dashboard metrics
INSERT INTO public.dashboard_metrics (metric_name, metric_value, change_percentage, change_type) VALUES
  ('Total Revenue', '$105,500', '+12%', 'positive'),
  ('Avg. FCR', '1.65', '-0.02', 'positive'),
  ('Mortality Rate', '3.37%', '+0.15%', 'negative'),
  ('Profit Margin', '33.89%', '+0.56%', 'positive'),
  ('Active Farms', '5', '0', 'neutral');

-- Sample farms
INSERT INTO public.farms (name, location, capacity, status) VALUES
  ('Farm A', 'North Region', 10000, 'active'),
  ('Farm B', 'South Region', 15000, 'active'),
  ('Farm C', 'East Region', 12000, 'maintenance'),
  ('Farm D', 'West Region', 8000, 'active'),
  ('Farm E', 'Central Region', 11000, 'active');