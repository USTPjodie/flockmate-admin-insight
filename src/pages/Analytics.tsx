import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { FinancialOverview } from "@/components/analytics/FinancialOverview";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, TrendingUp, TrendingDown, Calendar, Download, Filter, BarChart3, PieChart, LineChart } from "lucide-react";
import { useState } from "react";

const revenueData = [
  { month: "Jan", revenue: 45000, cost: 32000, profit: 13000 },
  { month: "Feb", revenue: 52000, cost: 38000, profit: 14000 },
  { month: "Mar", revenue: 48000, cost: 35000, profit: 13000 },
  { month: "Apr", revenue: 61000, cost: 42000, profit: 19000 },
  { month: "May", revenue: 58000, cost: 40000, profit: 18000 },
  { month: "Jun", revenue: 67000, cost: 45000, profit: 22000 },
];

const batchProfitability = [
  { batch: "Batch #2024-15", revenue: 18450, cost: 12800, profit: 5650, margin: 30.6 },
  { batch: "Batch #2024-14", revenue: 16200, cost: 11500, profit: 4700, margin: 29.0 },
  { batch: "Batch #2024-13", revenue: 19800, cost: 13200, profit: 6600, margin: 33.3 },
  { batch: "Batch #2024-12", revenue: 17600, cost: 12100, profit: 5500, margin: 31.2 },
];

const costBreakdown = [
  { name: "Feed", value: 45, color: "hsl(var(--primary))" },
  { name: "Labor", value: 25, color: "hsl(var(--accent))" },
  { name: "Healthcare", value: 15, color: "hsl(var(--warning))" },
  { name: "Utilities", value: 10, color: "hsl(var(--secondary))" },
  { name: "Other", value: 5, color: "hsl(var(--muted))" },
];

const Analytics = () => {
  const [activeView, setActiveView] = useState('overview');

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Financial Analytics</h1>
            <p className="text-muted-foreground">Comprehensive P&L analysis and financial insights</p>
          </div>
          <div className="flex items-center space-x-3">
            <Select defaultValue="overview" onValueChange={setActiveView}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="overview">Financial Overview</SelectItem>
                <SelectItem value="profitability">Batch Profitability</SelectItem>
                <SelectItem value="costs">Cost Analysis</SelectItem>
                <SelectItem value="trends">Trend Analysis</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="6months">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1month">Last Month</SelectItem>
                <SelectItem value="3months">Last 3 Months</SelectItem>
                <SelectItem value="6months">Last 6 Months</SelectItem>
                <SelectItem value="1year">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Analysis
            </Button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Card className="p-1">
          <div className="flex items-center gap-1">
            <Button 
              variant={activeView === 'overview' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setActiveView('overview')}
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Financial Overview
            </Button>
            <Button 
              variant={activeView === 'profitability' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setActiveView('profitability')}
              className="flex items-center gap-2"
            >
              <DollarSign className="h-4 w-4" />
              Batch Analysis
            </Button>
            <Button 
              variant={activeView === 'costs' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setActiveView('costs')}
              className="flex items-center gap-2"
            >
              <PieChart className="h-4 w-4" />
              Cost Breakdown
            </Button>
            <Button 
              variant={activeView === 'trends' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setActiveView('trends')}
              className="flex items-center gap-2"
            >
              <LineChart className="h-4 w-4" />
              Trend Analysis
            </Button>
          </div>
        </Card>

        {/* Dynamic Content */}
        {activeView === 'overview' && <FinancialOverview />}
        
        {activeView === 'profitability' && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Batch Profitability Analysis</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground">Batch ID</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Revenue</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Total Cost</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Net Profit</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground">Margin %</th>
                    <th className="text-center py-3 px-4 font-medium text-muted-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {batchProfitability.map((batch, index) => (
                    <tr key={index} className="border-b border-border hover:bg-muted/50">
                      <td className="py-4 px-4 font-medium text-foreground">{batch.batch}</td>
                      <td className="py-4 px-4 text-right text-foreground">${batch.revenue.toLocaleString()}</td>
                      <td className="py-4 px-4 text-right text-foreground">${batch.cost.toLocaleString()}</td>
                      <td className="py-4 px-4 text-right font-medium text-success">${batch.profit.toLocaleString()}</td>
                      <td className="py-4 px-4 text-right">
                        <Badge variant={batch.margin > 30 ? "default" : "secondary"}>
                          {batch.margin}%
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Button variant="ghost" size="sm" onClick={() => {
                          console.log('Viewing details for:', batch.batch);
                        }}>
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}

        {(activeView === 'costs' || activeView === 'trends') && (
          <Card className="p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {activeView === 'costs' ? 'Cost Analysis' : 'Trend Analysis'}
            </h3>
            <p className="text-muted-foreground">
              Detailed {activeView === 'costs' ? 'cost breakdown' : 'trend analysis'} dashboard coming soon
            </p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Analytics;