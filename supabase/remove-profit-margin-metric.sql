-- Remove profit margin metrics from dashboard_metrics table
DELETE FROM public.dashboard_metrics 
WHERE metric_name ILIKE '%profit margin%';

-- Verify that the profit margin metrics have been removed
SELECT 
    id,
    metric_name,
    metric_value,
    change_percentage,
    change_type,
    created_at
FROM public.dashboard_metrics
WHERE metric_name ILIKE '%profit margin%'
ORDER BY created_at DESC;