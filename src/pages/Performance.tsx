import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter } from "recharts";
import { Activity, Target, Users, AlertTriangle, TrendingUp, Filter, Download } from "lucide-react";

const farmComparison = [
  { farm: "Greenfield A", fcr: 1.65, mortality: 2.1, weight: 2.45, cost: 2.15 },
  { farm: "Valley B", fcr: 1.72, mortality: 2.8, weight: 2.38, cost: 2.22 },
  { farm: "Hillside C", fcr: 1.58, mortality: 1.9, weight: 2.52, cost: 2.08 },
  { farm: "Riverside D", fcr: 1.69, mortality: 2.4, weight: 2.42, cost: 2.18 },
];

const performanceTrends = [
  { week: "Week 1", fcr: 1.68, mortality: 2.1, adg: 65 },
  { week: "Week 2", fcr: 1.66, mortality: 2.3, adg: 67 },
  { week: "Week 3", fcr: 1.64, mortality: 2.0, adg: 69 },
  { week: "Week 4", fcr: 1.67, mortality: 2.2, adg: 66 },
  { week: "Week 5", fcr: 1.63, mortality: 1.9, adg: 71 },
  { week: "Week 6", fcr: 1.65, mortality: 2.1, adg: 68 },
];

const fcrVsMortality = [
  { fcr: 1.58, mortality: 1.9, farm: "Hillside C" },
  { fcr: 1.65, mortality: 2.1, farm: "Greenfield A" },
  { fcr: 1.69, mortality: 2.4, farm: "Riverside D" },
  { fcr: 1.72, mortality: 2.8, farm: "Valley B" },
];

const Performance = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Farm Performance</h1>
            <p className="text-muted-foreground">Benchmark and analyze operational performance across all farms</p>
          </div>
          <div className="flex items-center space-x-3">
            <Select defaultValue="all">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Farms</SelectItem>
                <SelectItem value="greenfield">Greenfield A</SelectItem>
                <SelectItem value="valley">Valley B</SelectItem>
                <SelectItem value="hillside">Hillside C</SelectItem>
                <SelectItem value="riverside">Riverside D</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Performance KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <MetricCard
            title="Average FCR"
            value="1.66"
            change="-0.02"
            changeType="positive"
            icon={<Target className="h-5 w-5 text-primary" />}
          />
          <MetricCard
            title="Mortality Rate"
            value="2.2%"
            change="+0.1%"
            changeType="negative"
            icon={<AlertTriangle className="h-5 w-5 text-warning" />}
          />
          <MetricCard
            title="Avg Daily Gain"
            value="68g"
            change="+3g"
            changeType="positive"
            icon={<TrendingUp className="h-5 w-5 text-success" />}
          />
          <MetricCard
            title="Feed Efficiency"
            value="92.5%"
            change="+1.5%"
            changeType="positive"
            icon={<Activity className="h-5 w-5 text-accent" />}
          />
        </div>

        {/* Performance Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Performance Trends</h3>
              <Badge variant="outline">6 Weeks</Badge>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="week" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px"
                    }}
                  />
                  <Line type="monotone" dataKey="fcr" stroke="hsl(var(--primary))" strokeWidth={3} name="FCR" />
                  <Line type="monotone" dataKey="mortality" stroke="hsl(var(--error))" strokeWidth={3} name="Mortality %" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">FCR vs Mortality Analysis</h3>
              <Badge variant="outline">Current Batches</Badge>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={fcrVsMortality}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="fcr" stroke="hsl(var(--muted-foreground))" name="FCR" />
                  <YAxis dataKey="mortality" stroke="hsl(var(--muted-foreground))" name="Mortality %" />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-card border border-border rounded-lg p-3 shadow-elevated">
                            <p className="font-medium">{data.farm}</p>
                            <p>FCR: {data.fcr}</p>
                            <p>Mortality: {data.mortality}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter dataKey="mortality" fill="hsl(var(--primary))" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Farm Comparison Table */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Farm Performance Comparison</h3>
            <Button variant="outline" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              Rank by Performance
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Farm</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">FCR</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Mortality %</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Avg Weight (kg)</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Cost/kg</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Performance</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {farmComparison.map((farm, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-4 font-medium text-foreground">{farm.farm}</td>
                    <td className="py-4 px-4 text-center">
                      <Badge variant={farm.fcr < 1.65 ? "default" : farm.fcr < 1.70 ? "secondary" : "destructive"}>
                        {farm.fcr}
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <Badge variant={farm.mortality < 2.2 ? "default" : farm.mortality < 2.5 ? "secondary" : "destructive"}>
                        {farm.mortality}%
                      </Badge>
                    </td>
                    <td className="py-4 px-4 text-center text-foreground">{farm.weight}</td>
                    <td className="py-4 px-4 text-center text-foreground">${farm.cost}</td>
                    <td className="py-4 px-4 text-center">
                      {farm.fcr < 1.65 && farm.mortality < 2.2 ? (
                        <Badge className="bg-success text-success-foreground">Excellent</Badge>
                      ) : farm.fcr < 1.70 && farm.mortality < 2.5 ? (
                        <Badge variant="secondary">Good</Badge>
                      ) : (
                        <Badge variant="destructive">Needs Attention</Badge>
                      )}
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

        {/* Performance Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <h4 className="font-semibold text-foreground mb-2">Best Performing Farm</h4>
            <p className="text-2xl font-bold text-success mb-2">Hillside C</p>
            <p className="text-sm text-muted-foreground">FCR: 1.58 | Mortality: 1.9%</p>
          </Card>
          
          <Card className="p-6">
            <h4 className="font-semibold text-foreground mb-2">Improvement Opportunity</h4>
            <p className="text-2xl font-bold text-warning mb-2">Valley B</p>
            <p className="text-sm text-muted-foreground">Focus on mortality reduction</p>
          </Card>
          
          <Card className="p-6">
            <h4 className="font-semibold text-foreground mb-2">Average Performance</h4>
            <p className="text-2xl font-bold text-primary mb-2">Industry +5%</p>
            <p className="text-sm text-muted-foreground">Above industry benchmark</p>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Performance;