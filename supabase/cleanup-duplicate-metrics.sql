-- Clean up duplicate dashboard metrics
-- This script will keep the most recent entry for each metric name and delete the older duplicates

-- First, let's identify duplicates
WITH duplicates AS (
  SELECT 
    metric_name,
    COUNT(*) as count
  FROM public.dashboard_metrics
  GROUP BY metric_name
  HAVING COUNT(*) > 1
)
SELECT 
  dm.metric_name,
  dm.id,
  dm.created_at,
  d.count as total_duplicates
FROM public.dashboard_metrics dm
JOIN duplicates d ON dm.metric_name = d.metric_name
ORDER BY dm.metric_name, dm.created_at DESC;

-- Now, let's delete the duplicate entries, keeping only the most recent one for each metric
DELETE FROM public.dashboard_metrics
WHERE id NOT IN (
  SELECT DISTINCT ON (metric_name) id
  FROM public.dashboard_metrics
  ORDER BY metric_name, created_at DESC
);

-- Verify the cleanup
SELECT 
  metric_name,
  COUNT(*) as count
FROM public.dashboard_metrics
GROUP BY metric_name
HAVING COUNT(*) > 1;