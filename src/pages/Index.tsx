import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
// Removed AlertsFeed import since it's being removed from the dashboard
import { DollarSign, TrendingUp, Users, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { DashboardDebug } from "@/components/Debug/DashboardDebug";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [showDebug, setShowDebug] = useState(false);
  const { data: metrics = [] } = useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dashboard_metrics')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const getMetricIcon = (name: string) => {
    if (name.toLowerCase().includes('profit')) return <DollarSign className="h-5 w-5 text-success" />;
    if (name.toLowerCase().includes('fcr')) return <TrendingUp className="h-5 w-5 text-primary" />;
    if (name.toLowerCase().includes('bird')) return <Users className="h-5 w-5 text-accent" />;
    return <AlertTriangle className="h-5 w-5 text-warning" />;
  };

  // Filter out profit margin metrics
  const filteredMetrics = metrics.filter(metric => 
    !metric.metric_name.toLowerCase().includes('profit margin')
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Debug Toggle */}
        <div className="flex justify-end">
          <button 
            onClick={() => setShowDebug(!showDebug)}
            className="px-3 py-1 text-sm bg-muted rounded hover:bg-muted/80"
          >
            {showDebug ? "Hide" : "Show"} Debug
          </button>
        </div>
        
        {/* Debug Information */}
        {showDebug && <DashboardDebug />}
        
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Farm Operations Dashboard</h1>
            <p className="text-muted-foreground">Monitor and analyze your poultry farm performance</p>
          </div>
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Last updated</div>
            <div className="text-sm font-medium text-foreground">2 minutes ago</div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMetrics.map((metric) => (
            <MetricCard
              key={metric.id}
              title={metric.metric_name}
              value={metric.metric_value}
              change={metric.change_percentage}
              changeType={metric.change_type as "positive" | "negative" | "neutral"}
              icon={getMetricIcon(metric.metric_name)}
            />
          ))}
        </div>

        {/* Performance Chart - Removed AlertsFeed since it's available in the notification bell */}
        <div className="grid grid-cols-1 gap-6 mt-8">
          <PerformanceChart />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-primary p-6 rounded-lg text-primary-foreground">
            <h3 className="text-lg font-semibold mb-2">Financial Analytics</h3>
            <p className="text-sm opacity-90 mb-4">View detailed P&L and batch profitability</p>
            <button 
              className="bg-primary-foreground text-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors"
              onClick={() => navigate('/analytics')}
            >
              View Reports
            </button>
          </div>
          
          <div className="bg-gradient-success p-6 rounded-lg text-success-foreground">
            <h3 className="text-lg font-semibold mb-2">Performance Benchmarks</h3>
            <p className="text-sm opacity-90 mb-4">Compare farms and track improvements</p>
            <button 
              className="bg-success-foreground text-success px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors"
              onClick={() => navigate('/comparisons')}
            >
              Compare Now
            </button>
          </div>

          <div className="bg-card border border-card-border p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-foreground">Export Data</h3>
            <p className="text-sm text-muted-foreground mb-4">Download reports and analytics data</p>
            <button 
              className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary-light transition-colors"
              onClick={() => navigate('/export')}
            >
              Export Options
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;