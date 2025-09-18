import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { DollarSign, TrendingUp, TrendingDown, Calendar, Download, Filter } from "lucide-react";

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
              Filters
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Financial KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Total Revenue"
            value="$331,200"
            change="+15.2%"
            changeType="positive"
            icon={<DollarSign className="h-5 w-5 text-success" />}
          />
          <MetricCard
            title="Total Costs"
            value="$232,000"
            change="+8.1%"
            changeType="neutral"
            icon={<TrendingUp className="h-5 w-5 text-primary" />}
          />
          <MetricCard
            title="Net Profit"
            value="$99,200"
            change="+28.5%"
            changeType="positive"
            icon={<TrendingUp className="h-5 w-5 text-success" />}
          />
          <MetricCard
            title="Profit Margin"
            value="29.9%"
            change="+3.2%"
            changeType="positive"
            icon={<TrendingUp className="h-5 w-5 text-accent" />}
          />
        </div>

        {/* Revenue & Profit Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Revenue vs Profit Trend</h3>
              <Badge variant="outline">6 Months</Badge>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={3} />
                  <Line type="monotone" dataKey="profit" stroke="hsl(var(--success))" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Cost Breakdown</h3>
              <Badge variant="outline">Current Quarter</Badge>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costBreakdown}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {costBreakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Batch Profitability Analysis */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Batch Profitability Analysis</h3>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Select Period
            </Button>
          </div>
          
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
                      <Button variant="ghost" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h4 className="font-semibold text-foreground mb-2">P&L Report Generator</h4>
            <p className="text-sm text-muted-foreground mb-4">Generate comprehensive profit & loss reports</p>
            <Button className="w-full">Generate Report</Button>
          </Card>
          
          <Card className="p-6">
            <h4 className="font-semibold text-foreground mb-2">Cost Analysis</h4>
            <p className="text-sm text-muted-foreground mb-4">Detailed breakdown of operational costs</p>
            <Button variant="outline" className="w-full">Analyze Costs</Button>
          </Card>
          
          <Card className="p-6">
            <h4 className="font-semibold text-foreground mb-2">ROI Calculator</h4>
            <p className="text-sm text-muted-foreground mb-4">Calculate return on investment for batches</p>
            <Button variant="outline" className="w-full">Calculate ROI</Button>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;