import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { DollarSign, TrendingUp, Users, AlertTriangle } from "lucide-react";

const Index = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
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
          <MetricCard
            title="Total Gross Profit"
            value="$284,590"
            change="+12.5%"
            changeType="positive"
            icon={<DollarSign className="h-5 w-5 text-success" />}
          />
          <MetricCard
            title="Average FCR"
            value="1.68"
            change="-0.03"
            changeType="positive"
            icon={<TrendingUp className="h-5 w-5 text-primary" />}
          />
          <MetricCard
            title="Active Birds"
            value="45,230"
            change="+2,850"
            changeType="positive"
            icon={<Users className="h-5 w-5 text-accent" />}
          />
          <MetricCard
            title="Avg Mortality Rate"
            value="2.4%"
            change="+0.2%"
            changeType="negative"
            icon={<AlertTriangle className="h-5 w-5 text-warning" />}
          />
        </div>

        {/* Performance Chart */}
        <div className="mt-8">
          <PerformanceChart />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-primary p-6 rounded-lg text-primary-foreground">
            <h3 className="text-lg font-semibold mb-2">Financial Analytics</h3>
            <p className="text-sm opacity-90 mb-4">View detailed P&L and batch profitability</p>
            <button className="bg-primary-foreground text-primary px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors">
              View Reports
            </button>
          </div>
          
          <div className="bg-gradient-success p-6 rounded-lg text-success-foreground">
            <h3 className="text-lg font-semibold mb-2">Performance Benchmarks</h3>
            <p className="text-sm opacity-90 mb-4">Compare farms and track improvements</p>
            <button className="bg-success-foreground text-success px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors">
              Compare Now
            </button>
          </div>

          <div className="bg-card border border-card-border p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2 text-foreground">Export Data</h3>
            <p className="text-sm text-muted-foreground mb-4">Download reports and analytics data</p>
            <button className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary-light transition-colors">
              Export Options
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
