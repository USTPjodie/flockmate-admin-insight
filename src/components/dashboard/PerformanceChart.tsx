import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";

const performanceData = [
  { day: "Day 1", mortality: 0.1, fcr: 0.8, weight: 45 },
  { day: "Day 7", mortality: 0.3, fcr: 1.1, weight: 180 },
  { day: "Day 14", mortality: 0.8, fcr: 1.3, weight: 420 },
  { day: "Day 21", mortality: 1.2, fcr: 1.45, weight: 750 },
  { day: "Day 28", mortality: 1.8, fcr: 1.58, weight: 1200 },
  { day: "Day 35", mortality: 2.1, fcr: 1.65, weight: 1750 },
  { day: "Day 42", mortality: 2.4, fcr: 1.68, weight: 2400 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-card-border rounded-lg p-3 shadow-elevated">
        <p className="font-medium text-foreground mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.value}{entry.name === "Mortality" ? "%" : entry.name === "FCR" ? "" : "g"}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export const PerformanceChart = () => {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Farm Performance Trends</h3>
          <p className="text-sm text-muted-foreground">7-day rolling average across all active batches</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline">FCR</Badge>
          <Badge variant="outline">Mortality</Badge>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="day" 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="fcr" 
              stroke="hsl(var(--primary))" 
              strokeWidth={3}
              dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              name="FCR"
            />
            <Line 
              type="monotone" 
              dataKey="mortality" 
              stroke="hsl(var(--error))" 
              strokeWidth={3}
              dot={{ fill: "hsl(var(--error))", strokeWidth: 2, r: 4 }}
              name="Mortality"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};