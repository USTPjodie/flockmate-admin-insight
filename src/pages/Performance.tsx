import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { PerformanceDashboard } from "@/components/performance/PerformanceDashboard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity, Target, Users, AlertTriangle, TrendingUp, Filter, Download, BarChart3, LineChart } from "lucide-react";
import { useState } from "react";
import { usePerformanceData } from "@/hooks/usePerformanceData";
import { Badge } from "@/components/ui/badge";

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
  const [activeView, setActiveView] = useState('dashboard');
  const { farmPerformance, isLoading } = usePerformanceData();
  const [selectedFarm, setSelectedFarm] = useState('all');

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
            <Select defaultValue="dashboard" onValueChange={setActiveView}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dashboard">Performance Dashboard</SelectItem>
                <SelectItem value="comparison">Farm Comparison</SelectItem>
                <SelectItem value="trends">Trend Analysis</SelectItem>
                <SelectItem value="benchmarks">Benchmarks</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedFarm} onValueChange={setSelectedFarm}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Farms</SelectItem>
                {farmPerformance.map(farm => (
                  <SelectItem key={farm.id} value={farm.farm_name}>
                    {farm.farm_name}
                  </SelectItem>
                ))}
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
              variant={activeView === 'dashboard' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setActiveView('dashboard')}
              className="flex items-center gap-2"
            >
              <BarChart3 className="h-4 w-4" />
              Performance Dashboard
            </Button>
            <Button 
              variant={activeView === 'comparison' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setActiveView('comparison')}
              className="flex items-center gap-2"
            >
              <Target className="h-4 w-4" />
              Farm Comparison
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
            <Button 
              variant={activeView === 'benchmarks' ? 'default' : 'ghost'} 
              size="sm"
              onClick={() => setActiveView('benchmarks')}
              className="flex items-center gap-2"
            >
              <Activity className="h-4 w-4" />
              Benchmarks
            </Button>
          </div>
        </Card>

        {/* Dynamic Content */}
        {activeView === 'dashboard' && <PerformanceDashboard />}
        
        {activeView === 'comparison' && (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Farm Performance Comparison</h3>
            {isLoading ? (
              <p className="text-center text-muted-foreground">Loading...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Farm</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">FCR</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">Mortality %</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">Avg Weight (kg)</th>
                      <th className="text-center py-3 px-4 font-medium text-muted-foreground">Cost/kg ($)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {farmPerformance.map((farm) => (
                      <tr key={farm.id} className="border-b border-border hover:bg-muted/50">
                        <td className="py-4 px-4 font-medium text-foreground">{farm.farm_name}</td>
                        <td className="py-4 px-4 text-center">
                          <Badge variant={Number(farm.fcr) < 1.65 ? "default" : "secondary"}>
                            {Number(farm.fcr).toFixed(2)}
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <Badge variant={Number(farm.mortality) < 2.2 ? "default" : "secondary"}>
                            {Number(farm.mortality).toFixed(1)}%
                          </Badge>
                        </td>
                        <td className="py-4 px-4 text-center text-foreground">
                          {Number(farm.avg_weight).toFixed(2)}
                        </td>
                        <td className="py-4 px-4 text-center text-foreground">
                          ${Number(farm.cost_per_kg).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Card>
        )}
        
        {(activeView === 'trends' || activeView === 'benchmarks') && (
          <Card className="p-6 text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {activeView === 'trends' ? 'Trend Analysis' : 'Benchmarks'}
            </h3>
            <p className="text-muted-foreground">
              Detailed {activeView} dashboard coming soon
            </p>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Performance;