import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const DashboardDebug = () => {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('dashboard_metrics')
          .select('*')
          .order('metric_name', { ascending: true });
        
        if (error) {
          setError(error.message);
        } else {
          setMetrics(data || []);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) return <div className="p-4">Loading dashboard metrics...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  // Group metrics by name to identify duplicates
  const metricsByName: Record<string, any[]> = {};
  metrics.forEach(metric => {
    if (!metricsByName[metric.metric_name]) {
      metricsByName[metric.metric_name] = [];
    }
    metricsByName[metric.metric_name].push(metric);
  });

  // Find duplicates
  const duplicates = Object.entries(metricsByName).filter(([name, items]) => items.length > 1);

  return (
    <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-2">Dashboard Debug Information</h3>
      
      <div className="mb-4">
        <h4 className="font-medium">Total Metrics: {metrics.length}</h4>
      </div>
      
      {duplicates.length > 0 ? (
        <div className="mb-4">
          <h4 className="font-medium text-red-600">⚠️ Duplicate Metrics Found:</h4>
          {duplicates.map(([name, items]) => (
            <div key={name} className="ml-4 mt-2">
              <p className="font-medium">{name} ({items.length} entries)</p>
              <ul className="list-disc list-inside ml-4">
                {items.map((item, index) => (
                  <li key={item.id} className="text-sm">
                    Value: {item.metric_value} | Change: {item.change_percentage || 'N/A'} | Created: {new Date(item.created_at).toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="mb-4">
          <h4 className="font-medium text-green-600">✅ No Duplicate Metrics Found</h4>
        </div>
      )}
      
      <div>
        <h4 className="font-medium">All Metrics:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
          {metrics.map((metric) => (
            <div key={metric.id} className="p-2 bg-white border rounded">
              <p className="font-medium text-sm">{metric.metric_name}</p>
              <p className="text-xs text-muted-foreground">{metric.metric_value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};