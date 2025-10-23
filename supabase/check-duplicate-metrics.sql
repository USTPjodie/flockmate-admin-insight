-- Check for duplicate dashboard metrics
SELECT 
    metric_name,
    COUNT(*) as count,
    STRING_AGG(metric_value || ' (' || created_at || ')', '; ') as values
FROM public.dashboard_metrics
GROUP BY metric_name
HAVING COUNT(*) > 1
ORDER BY metric_name;

-- Also check all metrics to see what we have
SELECT 
    id,
    metric_name,
    metric_value,
    change_percentage,
    change_type,
    created_at
FROM public.dashboard_metrics
ORDER BY metric_name, created_at DESC;