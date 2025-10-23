import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Download, Database, FileText, Table, BarChart3, Filter, Clock, CheckCircle, Settings, Eye } from "lucide-react";
import { ReportGenerator } from "@/components/reports/ReportGenerator";
import { useExportTemplates } from "@/hooks/useExportTemplates";
import { useState } from "react";

const exportOptions = [
  {
    category: "Financial Data",
    icon: BarChart3,
    exports: [
      { name: "Batch P&L Summary", description: "Profit & loss data for all batches", format: ["CSV", "Excel", "PDF"], size: "~2.5 MB" },
      { name: "Revenue Analysis", description: "Revenue breakdown by farm and period", format: ["CSV", "Excel"], size: "~1.8 MB" },
      { name: "Cost Breakdown", description: "Detailed cost analysis by category", format: ["CSV", "Excel"], size: "~3.2 MB" },
      { name: "Profit Margins", description: "Margin analysis across all operations", format: ["CSV", "PDF"], size: "~1.1 MB" }
    ]
  },
  {
    category: "Performance Metrics",
    icon: Database,
    exports: [
      { name: "FCR Data", description: "Feed conversion ratio for all batches", format: ["CSV", "Excel"], size: "~1.5 MB" },
      { name: "Mortality Records", description: "Mortality data with trends", format: ["CSV", "Excel"], size: "~2.1 MB" },
      { name: "Weight Data", description: "Bird weight progression data", format: ["CSV", "Excel"], size: "~4.2 MB" },
      { name: "Health Metrics", description: "Comprehensive health indicators", format: ["CSV", "Excel"], size: "~2.8 MB" }
    ]
  },
  {
    category: "Operational Data",
    icon: Table,
    exports: [
      { name: "Feed Consumption", description: "Feed usage data by farm and batch", format: ["CSV", "Excel"], size: "~3.5 MB" },
      { name: "Labor Records", description: "Labor cost and efficiency data", format: ["CSV", "Excel"], size: "~1.9 MB" },
      { name: "Farm Utilization", description: "Farm capacity and utilization rates", format: ["CSV", "PDF"], size: "~1.2 MB" },
      { name: "Batch Schedules", description: "Batch timing and scheduling data", format: ["CSV", "Excel"], size: "~0.8 MB" }
    ]
  },
  {
    category: "Compliance Reports",
    icon: FileText,
    exports: [
      { name: "Regulatory Compliance", description: "Compliance status and documentation", format: ["PDF"], size: "~5.1 MB" },
      { name: "Audit Trail", description: "Complete audit trail for all operations", format: ["PDF"], size: "~8.3 MB" },
      { name: "Quality Assurance", description: "QA metrics and compliance data", format: ["CSV", "PDF"], size: "~2.7 MB" },
      { name: "Certification Records", description: "Certification and standards compliance", format: ["PDF"], size: "~3.9 MB" }
    ]
  }
];

const recentExports = [
  {
    id: "EXP-2024-001",
    name: "Q1 2024 Financial Summary",
    type: "Financial Data",
    format: "Excel",
    size: "3.2 MB",
    exported: "2024-03-31 14:32",
    status: "completed"
  },
  {
    id: "EXP-2024-002",
    name: "FCR Performance Data",
    type: "Performance Metrics", 
    format: "CSV",
    size: "1.5 MB",
    exported: "2024-03-30 09:15",
    status: "completed"
  },
  {
    id: "EXP-2024-003",
    name: "Compliance Report March",
    type: "Compliance Reports",
    format: "PDF",
    size: "5.1 MB",
    exported: "2024-03-29 16:45",
    status: "processing"
  },
  {
    id: "EXP-2024-004",
    name: "Feed Consumption Analysis",
    type: "Operational Data",
    format: "Excel",
    size: "3.5 MB",
    exported: "2024-03-28 11:20",
    status: "failed"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-success text-success-foreground">Completed</Badge>;
    case "processing":
      return <Badge variant="secondary">Processing</Badge>;
    case "failed":
      return <Badge variant="destructive">Failed</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const Export = () => {
  const { templates } = useExportTemplates();
  const [showGenerator, setShowGenerator] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleGenerate = (template: any, config: any) => {
    console.log('Generating report:', template, config);
    setShowGenerator(false);
  };

  const filteredExports = selectedCategory === 'all' 
    ? exportOptions 
    : exportOptions.filter(cat => cat.category === selectedCategory);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Data Export</h1>
            <p className="text-muted-foreground">Export comprehensive farm data for analysis and reporting</p>
          </div>
          <div className="flex items-center space-x-3">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Financial Data">Financial Data</SelectItem>
                <SelectItem value="Performance Metrics">Performance Metrics</SelectItem>
                <SelectItem value="Operational Data">Operational Data</SelectItem>
                <SelectItem value="Compliance Reports">Compliance Reports</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Advanced Settings
            </Button>
            <Button onClick={() => setShowGenerator(true)} size="sm">
              <Download className="h-4 w-4 mr-2" />
              Generate Custom Report
            </Button>
          </div>
        </div>

        {/* Export Configuration */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Export Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Date Range</label>
              <Select defaultValue="3months">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Farm Selection</label>
              <Select defaultValue="all">
                <SelectTrigger>
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
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">File Format</label>
              <Select defaultValue="excel">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="csv">CSV</SelectItem>
                  <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground mb-2 block">Compression</label>
              <Select defaultValue="none">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Compression</SelectItem>
                  <SelectItem value="zip">ZIP Archive</SelectItem>
                  <SelectItem value="gzip">GZIP</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="headers" defaultChecked />
              <label htmlFor="headers" className="text-sm text-foreground">Include Headers</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="metadata" defaultChecked />
              <label htmlFor="metadata" className="text-sm text-foreground">Include Metadata</label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="timestamps" />
              <label htmlFor="timestamps" className="text-sm text-foreground">Include Timestamps</label>
            </div>
          </div>
        </Card>

        {/* Custom Report Generator */}
        {showGenerator && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Custom Report Generator</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowGenerator(false)}>
                Close
              </Button>
            </div>
            <ReportGenerator onGenerate={handleGenerate} />
          </Card>
        )}

        {/* Export Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredExports.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <Card key={categoryIndex} className="p-6">
                <div className="flex items-center mb-4">
                  <Icon className="h-6 w-6 text-primary mr-3" />
                  <h3 className="text-lg font-semibold text-foreground">{category.category}</h3>
                </div>
                <div className="space-y-3">
                  {category.exports.map((exportItem, itemIndex) => (
                    <div key={itemIndex} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{exportItem.name}</h4>
                          <p className="text-sm text-muted-foreground">{exportItem.description}</p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => {
                          console.log('Exporting:', exportItem.name);
                        }}>
                          <Download className="h-4 w-4 mr-1" />
                          Export
                        </Button>
                      </div>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <div className="flex items-center space-x-3">
                          <span>Formats: {exportItem.format.join(", ")}</span>
                          <span>Est. Size: {exportItem.size}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* Recent Exports */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-foreground">Recent Exports</h3>
            <Button variant="outline" size="sm">
              <Clock className="h-4 w-4 mr-2" />
              View All History
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Export Name</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Format</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Size</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Exported</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentExports.map((exportItem, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-foreground">{exportItem.name}</div>
                        <div className="text-sm text-muted-foreground">{exportItem.id}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-foreground">{exportItem.type}</td>
                    <td className="py-4 px-4 text-center">
                      <Badge variant="outline">{exportItem.format}</Badge>
                    </td>
                    <td className="py-4 px-4 text-center text-foreground">{exportItem.size}</td>
                    <td className="py-4 px-4 text-foreground">{exportItem.exported}</td>
                    <td className="py-4 px-4 text-center">
                      {getStatusBadge(exportItem.status)}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        {exportItem.status === "completed" && (
                          <Button variant="ghost" size="sm" onClick={() => {
                            console.log('Downloading:', exportItem.name);
                          }}>
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                        {exportItem.status === "failed" && (
                          <Button variant="ghost" size="sm" onClick={() => {
                            console.log('Retrying:', exportItem.name);
                          }}>
                            Retry
                          </Button>
                        )}
                        {exportItem.status === "processing" && (
                          <div className="text-sm text-muted-foreground">Processing...</div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Export Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <Download className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">156</div>
            <div className="text-sm text-muted-foreground">Total Exports</div>
          </Card>
          
          <Card className="p-6 text-center">
            <Database className="h-8 w-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">45.2 GB</div>
            <div className="text-sm text-muted-foreground">Data Exported</div>
          </Card>
          
          <Card className="p-6 text-center">
            <CheckCircle className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">12</div>
            <div className="text-sm text-muted-foreground">This Month</div>
          </Card>
          
          <Card className="p-6 text-center">
            <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">4.2</div>
            <div className="text-sm text-muted-foreground">Avg Processing Time (min)</div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Export;