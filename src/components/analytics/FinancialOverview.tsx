import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Target, Download } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';

const revenueData = [
  { month: "Jan", revenue: 45000, cost: 32000, profit: 13000, margin: 28.9 },
  { month: "Feb", revenue: 52000, cost: 38000, profit: 14000, margin: 26.9 },
  { month: "Mar", revenue: 48000, cost: 35000, profit: 13000, margin: 27.1 },
  { month: "Apr", revenue: 61000, cost: 42000, profit: 19000, margin: 31.1 },
  { month: "May", revenue: 58000, cost: 40000, profit: 18000, margin: 31.0 },
  { month: "Jun", revenue: 67000, cost: 45000, profit: 22000, margin: 32.8 },
];

const costBreakdown = [
  { name: "Feed", value: 45, amount: 101250, color: "hsl(var(--primary))" },
  { name: "Labor", value: 25, amount: 56250, color: "hsl(var(--accent))" },
  { name: "Healthcare", value: 15, amount: 33750, color: "hsl(var(--warning))" },
  { name: "Utilities", value: 10, amount: 22500, color: "hsl(var(--secondary))" },
  { name: "Other", value: 5, amount: 11250, color: "hsl(var(--muted-foreground))" },
];

const profitMargins = [
  { month: "Jan", margin: 28.9, target: 30 },
  { month: "Feb", margin: 26.9, target: 30 },
  { month: "Mar", margin: 27.1, target: 30 },
  { month: "Apr", margin: 31.1, target: 30 },
  { month: "May", margin: 31.0, target: 30 },
  { month: "Jun", margin: 32.8, target: 30 },
];

export const FinancialOverview = () => {
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalCosts = revenueData.reduce((sum, item) => sum + item.cost, 0);
  const totalProfit = totalRevenue - totalCosts;
  const avgMargin = revenueData.reduce((sum, item) => sum + item.margin, 0) / revenueData.length;

  return (
    <div className="space-y-6">
      {/* Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change="+15.2%"
          changeType="positive"
          icon={<DollarSign className="h-5 w-5 text-success" />}
        />
        <MetricCard
          title="Total Costs"
          value={`$${totalCosts.toLocaleString()}`}
          change="+8.1%"
          changeType="neutral"
          icon={<TrendingUp className="h-5 w-5 text-primary" />}
        />
        <MetricCard
          title="Net Profit"
          value={`$${totalProfit.toLocaleString()}`}
          change="+28.5%"
          changeType="positive"
          icon={<TrendingUp className="h-5 w-5 text-success" />}
        />
        <MetricCard
          title="Profit Margin"
          value={`${avgMargin.toFixed(1)}%`}
          change="+3.2%"
          changeType="positive"
          icon={<Target className="h-5 w-5 text-accent" />}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Revenue vs Profit Trend</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline">6 Months</Badge>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
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
                  formatter={(value, name) => [
                    `$${value.toLocaleString()}`,
                    name === 'revenue' ? 'Revenue' : name === 'profit' ? 'Profit' : name
                  ]}
                />
                <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={3} name="revenue" />
                <Line type="monotone" dataKey="profit" stroke="hsl(var(--success))" strokeWidth={3} name="profit" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Cost Breakdown */}
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
                <Tooltip 
                  formatter={(value, name, props) => [
                    `$${props.payload.amount.toLocaleString()}`,
                    name
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Profit Margin Trend */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Profit Margin vs Target</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Target: 30%</Badge>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={profitMargins}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" domain={[20, 35]} />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                  formatter={(value, name) => [
                    `${value}%`,
                    name === 'margin' ? 'Actual Margin' : 'Target Margin'
                  ]}
                />
                <Bar dataKey="margin" fill="hsl(var(--primary))" name="margin" />
                <Line type="monotone" dataKey="target" stroke="hsl(var(--error))" strokeWidth={2} name="target" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Cost Analysis Summary */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Cost Analysis Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Largest Cost Categories</h4>
            {costBreakdown.slice(0, 3).map((cost, index) => (
              <div key={cost.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: cost.color }}
                  />
                  <span className="text-sm text-foreground">{cost.name}</span>
                </div>
                <div className="text-right">
                  <div className="font-medium text-foreground">{cost.value}%</div>
                  <div className="text-xs text-muted-foreground">${cost.amount.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Month-over-Month</h4>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Feed Costs</span>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-3 w-3 text-error" />
                <span className="text-error">+5.2%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Labor Costs</span>
              <div className="flex items-center gap-1 text-sm">
                <TrendingDown className="h-3 w-3 text-success" />
                <span className="text-success">-2.1%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-foreground">Healthcare</span>
              <div className="flex items-center gap-1 text-sm">
                <TrendingUp className="h-3 w-3 text-warning" />
                <span className="text-warning">+1.8%</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Cost Efficiency</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-foreground">Cost per Bird</span>
                <span className="font-medium text-foreground">$8.42</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-foreground">Cost per Kg</span>
                <span className="font-medium text-foreground">$2.18</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-foreground">Feed Conversion Cost</span>
                <span className="font-medium text-foreground">$1.32</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};