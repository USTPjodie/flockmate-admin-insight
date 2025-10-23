import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, LineChart, Line } from "recharts";
import { BarChart3, Target, TrendingUp, Plus, RefreshCw, Download } from "lucide-react";

const batchComparison = [
  { metric: "FCR", batch1: 1.65, batch2: 1.72, batch3: 1.58, batch4: 1.69, target: 1.60 },
  { metric: "Mortality %", batch1: 2.1, batch2: 2.8, batch3: 1.9, batch4: 2.4, target: 2.0 },
  { metric: "Avg Weight (kg)", batch1: 2.45, batch2: 2.38, batch3: 2.52, batch4: 2.42, target: 2.50 },
  { metric: "Cost/kg ($)", batch1: 2.15, batch2: 2.22, batch3: 2.08, batch4: 2.18, target: 2.10 },
  { metric: "Profit Margin %", batch1: 30.6, batch2: 28.2, batch3: 33.1, batch4: 29.8, target: 32.0 },
];

const managerComparison = [
  { manager: "John Smith", farms: 3, avgFCR: 1.65, avgMortality: 2.1, totalBirds: 15420, profitMargin: 31.2 },
  { manager: "Sarah Johnson", farms: 2, avgFCR: 1.72, avgMortality: 2.8, totalBirds: 12800, profitMargin: 28.5 },
  { manager: "Mike Chen", farms: 4, avgFCR: 1.58, avgMortality: 1.9, totalBirds: 18600, profitMargin: 33.8 },
  { manager: "Lisa Davis", farms: 2, avgFCR: 1.69, avgMortality: 2.4, totalBirds: 11200, profitMargin: 29.9 },
];

const seasonalComparison = [
  { season: "Spring 2023", fcr: 1.68, mortality: 2.3, profit: 28.5 },
  { season: "Summer 2023", fcr: 1.72, mortality: 2.8, profit: 26.2 },
  { season: "Fall 2023", fcr: 1.64, mortality: 2.0, profit: 31.1 },
  { season: "Winter 2023", fcr: 1.66, mortality: 2.2, profit: 29.8 },
  { season: "Spring 2024", fcr: 1.63, mortality: 1.9, profit: 32.4 },
];

const radarData = [
  { metric: "FCR", batch1: 85, batch2: 78, batch3: 92, batch4: 80, fullMark: 100 },
  { metric: "Weight", batch1: 88, batch2: 85, batch3: 95, batch4: 87, fullMark: 100 },
  { metric: "Health", batch1: 82, batch2: 75, batch3: 88, batch4: 78, fullMark: 100 },
  { metric: "Cost Efficiency", batch1: 90, batch2: 83, batch3: 95, batch4: 86, fullMark: 100 },
  { metric: "Profitability", batch1: 87, batch2: 80, batch3: 92, batch4: 84, fullMark: 100 },
];

const Comparisons = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Performance Comparisons</h1>
            <p className="text-muted-foreground">Compare batches, farms, managers, and seasonal performance</p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Data
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Comparison
            </Button>
          </div>
        </div>

        {/* Comparison Setup */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Comparison Setup</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Comparison Type</label>
              <Select defaultValue="batches">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="batches">Compare Batches</SelectItem>
                  <SelectItem value="farms">Compare Farms</SelectItem>
                  <SelectItem value="managers">Compare Managers</SelectItem>
                  <SelectItem value="seasons">Seasonal Analysis</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Time Period</label>
              <Select defaultValue="3months">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Metrics</label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Metrics</SelectItem>
                  <SelectItem value="performance">Performance Only</SelectItem>
                  <SelectItem value="financial">Financial Only</SelectItem>
                  <SelectItem value="operational">Operational Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
            <Button className="w-full" onClick={() => {
              console.log('Generating comparison with selected filters');
            }}>
              <BarChart3 className="h-4 w-4 mr-2" />
              Generate Comparison
            </Button>
            </div>
          </div>
        </Card>

        {/* Key Comparison Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Best Performing Batch"
            value="#2024-13"
            change="FCR: 1.58"
            changeType="positive"
            icon={<Target className="h-5 w-5 text-success" />}
          />
          <MetricCard
            title="Highest Profit Margin"
            value="33.1%"
            change="Batch #2024-13"
            changeType="positive"
            icon={<TrendingUp className="h-5 w-5 text-success" />}
          />
          <MetricCard
            title="Most Improved"
            value="Valley B"
            change="+15% vs last quarter"
            changeType="positive"
            icon={<TrendingUp className="h-5 w-5 text-primary" />}
          />
          <MetricCard
            title="Needs Attention"
            value="Batch #2024-14"
            change="FCR: 1.72"
            changeType="negative"
            icon={<Target className="h-5 w-5 text-warning" />}
          />
        </div>

        {/* Comparison Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Batch Performance Comparison</h3>
              <Badge variant="outline">4 Batches Selected</Badge>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={batchComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="metric" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Bar dataKey="batch1" fill="hsl(var(--primary))" name="Batch #2024-15" />
                  <Bar dataKey="batch2" fill="hsl(var(--accent))" name="Batch #2024-14" />
                  <Bar dataKey="batch3" fill="hsl(var(--success))" name="Batch #2024-13" />
                  <Bar dataKey="batch4" fill="hsl(var(--warning))" name="Batch #2024-12" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Multi-Metric Radar Analysis</h3>
              <Badge variant="outline">Performance Score</Badge>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="hsl(var(--border))" />
                  <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 100]} 
                    tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  />
                  <Radar dataKey="batch1" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.1} strokeWidth={2} />
                  <Radar dataKey="batch3" stroke="hsl(var(--success))" fill="hsl(var(--success))" fillOpacity={0.1} strokeWidth={2} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Manager Performance Comparison */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Manager Performance Comparison</h3>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Comparison
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Manager</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Farms</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Avg FCR</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Avg Mortality</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Total Birds</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Profit Margin</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Ranking</th>
                </tr>
              </thead>
              <tbody>
                {managerComparison.map((manager, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-4 font-medium text-foreground">{manager.manager}</td>
                    <td className="py-4 px-4 text-center text-foreground">{manager.farms}</td>
                    <td className="py-4 px-4 text-center">
                      <Badge variant={manager.avgFCR < 1.65 ? "default" : manager.avgFCR < 1.70 ? "secondary" : "destructive"}>
                        {manager.avgFCR}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge variant={manager.avgMortality < 2.2 ? "default" : manager.avgMortality < 2.5 ? "secondary" : "destructive"}>
                        {manager.avgMortality}%
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-center text-foreground">{manager.totalBirds.toLocaleString()}</td>
                    <td className="py-4 px-4 text-center">
                      <Badge variant={manager.profitMargin > 32 ? "default" : manager.profitMargin > 29 ? "secondary" : "destructive"}>
                        {manager.profitMargin}%
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          index === 0 ? 'bg-success text-success-foreground' :
                          index === 1 ? 'bg-primary text-primary-foreground' :
                          index === 2 ? 'bg-accent text-accent-foreground' :
                          'bg-muted text-muted-foreground'
                        }`}>
                          {index + 1}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Seasonal Trends */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Seasonal Performance Trends</h3>
            <Badge variant="outline">5 Seasons</Badge>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={seasonalComparison}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="season" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Line type="monotone" dataKey="fcr" stroke="hsl(var(--primary))" strokeWidth={3} name="FCR" />
                <Line type="monotone" dataKey="profit" stroke="hsl(var(--success))" strokeWidth={3} name="Profit Margin %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Comparisons;