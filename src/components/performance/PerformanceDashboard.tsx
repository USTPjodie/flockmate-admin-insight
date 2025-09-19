import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ScatterChart, Scatter, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Activity, Target, Users, AlertTriangle, TrendingUp, Filter, Download, Award } from 'lucide-react';
import { MetricCard } from '@/components/dashboard/MetricCard';

const performanceTrends = [
  { week: "Week 1", fcr: 1.68, mortality: 2.1, adg: 65, feedEfficiency: 88 },
  { week: "Week 2", fcr: 1.66, mortality: 2.3, adg: 67, feedEfficiency: 90 },
  { week: "Week 3", fcr: 1.64, mortality: 2.0, adg: 69, feedEfficiency: 92 },
  { week: "Week 4", fcr: 1.67, mortality: 2.2, adg: 66, feedEfficiency: 89 },
  { week: "Week 5", fcr: 1.63, mortality: 1.9, adg: 71, feedEfficiency: 94 },
  { week: "Week 6", fcr: 1.65, mortality: 2.1, adg: 68, feedEfficiency: 91 },
];

const farmPerformance = [
  { farm: "Greenfield A", fcr: 1.65, mortality: 2.1, weight: 2.45, efficiency: 92, rank: 2 },
  { farm: "Valley B", fcr: 1.72, mortality: 2.8, weight: 2.38, efficiency: 85, rank: 4 },
  { farm: "Hillside C", fcr: 1.58, mortality: 1.9, weight: 2.52, efficiency: 96, rank: 1 },
  { farm: "Riverside D", fcr: 1.69, mortality: 2.4, weight: 2.42, efficiency: 88, rank: 3 },
];

const benchmarkData = [
  { metric: "FCR", actual: 1.66, target: 1.60, industry: 1.75 },
  { metric: "Mortality", actual: 2.2, target: 2.0, industry: 3.5 },
  { metric: "ADG", actual: 68, target: 70, industry: 65 },
  { metric: "Feed Efficiency", actual: 91, target: 95, industry: 85 },
  { metric: "Weight Gain", actual: 89, target: 92, industry: 82 },
];

const radarData = [
  { metric: "FCR", value: 85 },
  { metric: "Mortality", value: 78 },
  { metric: "ADG", value: 91 },
  { metric: "Feed Efficiency", value: 88 },
  { metric: "Weight Consistency", value: 92 },
  { metric: "Health Score", value: 86 },
];

export const PerformanceDashboard = () => {
  const avgFCR = performanceTrends.reduce((sum, item) => sum + item.fcr, 0) / performanceTrends.length;
  const avgMortality = performanceTrends.reduce((sum, item) => sum + item.mortality, 0) / performanceTrends.length;
  const avgADG = performanceTrends.reduce((sum, item) => sum + item.adg, 0) / performanceTrends.length;
  const avgEfficiency = performanceTrends.reduce((sum, item) => sum + item.feedEfficiency, 0) / performanceTrends.length;

  return (
    <div className="space-y-6">
      {/* Performance KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Average FCR"
          value={avgFCR.toFixed(2)}
          change="-0.02"
          changeType="positive"
          icon={<Target className="h-5 w-5 text-primary" />}
        />
        <MetricCard
          title="Mortality Rate"
          value={`${avgMortality.toFixed(1)}%`}
          change="+0.1%"
          changeType="negative"
          icon={<AlertTriangle className="h-5 w-5 text-warning" />}
        />
        <MetricCard
          title="Avg Daily Gain"
          value={`${Math.round(avgADG)}g`}
          change="+3g"
          changeType="positive"
          icon={<TrendingUp className="h-5 w-5 text-success" />}
        />
        <MetricCard
          title="Feed Efficiency"
          value={`${Math.round(avgEfficiency)}%`}
          change="+1.5%"
          changeType="positive"
          icon={<Activity className="h-5 w-5 text-accent" />}
        />
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trends */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Performance Trends</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline">6 Weeks</Badge>
              <Button variant="ghost" size="sm">
                <Download className="h-4 w-4" />
              </Button>
            </div>
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
                <Line type="monotone" dataKey="adg" stroke="hsl(var(--success))" strokeWidth={3} name="ADG (g)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Performance Radar */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Overall Performance Score</h3>
            <Badge className="bg-success text-success-foreground">88/100</Badge>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="metric" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
                <PolarRadiusAxis 
                  angle={0} 
                  domain={[0, 100]} 
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                />
                <Radar 
                  name="Performance" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Benchmark Comparison */}
        <Card className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Performance vs Benchmarks</h3>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Industry Comparison</Badge>
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Metrics</SelectItem>
                  <SelectItem value="fcr">FCR Only</SelectItem>
                  <SelectItem value="mortality">Mortality Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={benchmarkData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" stroke="hsl(var(--muted-foreground))" />
                <YAxis dataKey="metric" type="category" stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px"
                  }}
                />
                <Bar dataKey="actual" fill="hsl(var(--primary))" name="Actual" />
                <Bar dataKey="target" fill="hsl(var(--success))" name="Target" />
                <Bar dataKey="industry" fill="hsl(var(--muted-foreground))" name="Industry Avg" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Farm Rankings */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Farm Performance Rankings</h3>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter by Metric
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Rank</th>
                <th className="text-left py-3 px-4 font-medium text-muted-foreground">Farm</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">FCR</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Mortality %</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Avg Weight (kg)</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Efficiency</th>
                <th className="text-center py-3 px-4 font-medium text-muted-foreground">Performance</th>
              </tr>
            </thead>
            <tbody>
              {farmPerformance
                .sort((a, b) => a.rank - b.rank)
                .map((farm, index) => (
                <tr key={farm.farm} className="border-b border-border hover:bg-muted/50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {farm.rank === 1 && <Award className="h-4 w-4 text-warning" />}
                      <span className="font-medium text-foreground">#{farm.rank}</span>
                    </div>
                  </td>
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
                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-12 bg-muted rounded-full h-2">
                        <div 
                          className="h-2 bg-primary rounded-full transition-all" 
                          style={{ width: `${farm.efficiency}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{farm.efficiency}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-center">
                    {farm.rank === 1 ? (
                      <Badge className="bg-success text-success-foreground">Excellent</Badge>
                    ) : farm.rank === 2 ? (
                      <Badge variant="default">Very Good</Badge>
                    ) : farm.rank === 3 ? (
                      <Badge variant="secondary">Good</Badge>
                    ) : (
                      <Badge variant="destructive">Needs Attention</Badge>
                    )}
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
          <div className="flex items-center gap-2 mb-3">
            <Award className="h-5 w-5 text-warning" />
            <h4 className="font-semibold text-foreground">Top Performer</h4>
          </div>
          <p className="text-2xl font-bold text-success mb-2">Hillside C</p>
          <p className="text-sm text-muted-foreground">Best overall performance with 96% efficiency</p>
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex justify-between text-sm">
              <span>FCR:</span>
              <span className="font-medium text-success">1.58</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Mortality:</span>
              <span className="font-medium text-success">1.9%</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <h4 className="font-semibold text-foreground">Improvement Area</h4>
          </div>
          <p className="text-2xl font-bold text-warning mb-2">Valley B</p>
          <p className="text-sm text-muted-foreground">Focus on mortality reduction and FCR optimization</p>
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex justify-between text-sm">
              <span>Priority:</span>
              <span className="font-medium text-warning">Mortality Control</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Gap:</span>
              <span className="font-medium text-error">-0.9% vs target</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Target className="h-5 w-5 text-primary" />
            <h4 className="font-semibold text-foreground">Overall Status</h4>
          </div>
          <p className="text-2xl font-bold text-primary mb-2">Above Target</p>
          <p className="text-sm text-muted-foreground">5% above industry benchmark</p>
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex justify-between text-sm">
              <span>vs Industry:</span>
              <span className="font-medium text-success">+5%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>vs Target:</span>
              <span className="font-medium text-primary">+2%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};