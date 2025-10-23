import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Download, FileText, Search, Filter, Eye, Plus, Clock, Settings } from "lucide-react";
import { ReportGenerator } from "@/components/reports/ReportGenerator";
import { useReports } from "@/hooks/useReports";
import { useState } from "react";

const reports = [
  {
    id: "RPT-2024-001",
    title: "Monthly P&L Report - March 2024",
    type: "Financial",
    period: "March 2024",
    status: "completed",
    generated: "2024-03-31",
    size: "2.4 MB",
    format: "PDF"
  },
  {
    id: "RPT-2024-002", 
    title: "Batch Performance Analysis - Q1 2024",
    type: "Performance",
    period: "Q1 2024",
    status: "completed",
    generated: "2024-03-28",
    size: "1.8 MB",
    format: "Excel"
  },
  {
    id: "RPT-2024-003",
    title: "Farm Comparison Report",
    type: "Comparison",
    period: "Last 6 Months",
    status: "generating",
    generated: "2024-03-30",
    size: "-",
    format: "PDF"
  },
  {
    id: "RPT-2024-004",
    title: "Cost Analysis Report - Feed Efficiency",
    type: "Cost Analysis",
    period: "February 2024",
    status: "completed",
    generated: "2024-02-29",
    size: "3.1 MB",
    format: "PDF"
  },
  {
    id: "RPT-2024-005",
    title: "Mortality Trend Analysis",
    type: "Health",
    period: "Last 12 Weeks",
    status: "failed",
    generated: "2024-03-29",
    size: "-",
    format: "Excel"
  }
];

const reportTemplates = [
  {
    name: "Batch Profitability Report",
    description: "Detailed P&L analysis for individual batches",
    type: "Financial",
    estimatedTime: "5 minutes"
  },
  {
    name: "Farm Performance Comparison",
    description: "Compare operational metrics across multiple farms",
    type: "Performance", 
    estimatedTime: "8 minutes"
  },
  {
    name: "Monthly Operations Summary",
    description: "Comprehensive monthly operational overview",
    type: "Operations",
    estimatedTime: "12 minutes"
  },
  {
    name: "Cost Breakdown Analysis",
    description: "Detailed cost analysis by category and farm",
    type: "Financial",
    estimatedTime: "7 minutes"
  }
];

const getStatusBadge = (status: string) => {
  switch (status) {
    case "completed":
      return <Badge className="bg-success text-success-foreground">Completed</Badge>;
    case "generating":
      return <Badge variant="secondary">Generating</Badge>;
    case "failed":
      return <Badge variant="destructive">Failed</Badge>;
    default:
      return <Badge variant="outline">Unknown</Badge>;
  }
};

const getTypeColor = (type: string) => {
  const colors: { [key: string]: string } = {
    "Financial": "bg-primary/10 text-primary",
    "Performance": "bg-success/10 text-success", 
    "Comparison": "bg-accent/10 text-accent",
    "Cost Analysis": "bg-warning/10 text-warning",
    "Health": "bg-error/10 text-error",
    "Operations": "bg-secondary/10 text-secondary"
  };
  return colors[type] || "bg-muted/10 text-muted-foreground";
};

const Reports = () => {
  const { reports, filters, setFilters, createReport, downloadReport, retryReport } = useReports();
  const [showGenerator, setShowGenerator] = useState(false);

  const handleGenerate = async (template: any, config: any) => {
    await createReport({
      title: config.title || template.name,
      type: 'operational',
      format: config.format,
      parameters: config
    });
    setShowGenerator(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Batch Reports</h1>
            <p className="text-muted-foreground">Generate, manage and export comprehensive farm reports</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="lg">
              <Settings className="h-4 w-4 mr-2" />
              Report Settings
            </Button>
            <Button onClick={() => setShowGenerator(true)} size="lg">
              <Plus className="h-4 w-4 mr-2" />
              Generate New Report
            </Button>
          </div>
        </div>

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

        {/* Report Templates */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Report Templates</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {reportTemplates.map((template, index) => (
              <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className={`text-xs px-2 py-1 rounded-full ${getTypeColor(template.type)}`}>
                    {template.type}
                  </div>
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
                <h4 className="font-medium text-foreground mb-2">{template.name}</h4>
                <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{template.estimatedTime}</span>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      createReport({
                        title: template.name,
                        type: 'operational',
                        format: 'pdf',
                        parameters: { template: template.name }
                      });
                    }}
                  >
                    Generate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Filters and Search */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Report History</h3>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search reports..."
                  className="pl-10 w-64"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="financial">Financial</SelectItem>
                  <SelectItem value="performance">Performance</SelectItem>
                  <SelectItem value="comparison">Comparison</SelectItem>
                  <SelectItem value="health">Health</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Reports Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Report</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Period</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Generated</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Size</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((report, index) => (
                  <tr key={index} className="border-b border-border hover:bg-muted/50">
                    <td className="py-4 px-4">
                      <div>
                        <div className="font-medium text-foreground">{report.title}</div>
                        <div className="text-sm text-muted-foreground">{report.id}</div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className={`text-xs px-2 py-1 rounded-full inline-block ${getTypeColor(report.type)}`}>
                        {report.type}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-foreground">Last 6 Months</td>
                    <td className="py-4 px-4 text-center">
                      {getStatusBadge(report.status)}
                    </td>
                    <td className="py-4 px-4 text-foreground">{new Date(report.generatedAt).toLocaleDateString()}</td>
                    <td className="py-4 px-4 text-center text-foreground">{report.size}</td>
                    <td className="py-4 px-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        {report.status === "completed" && (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => downloadReport(report.id)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => downloadReport(report.id)}>
                              <Download className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        {report.status === "failed" && (
                          <Button variant="ghost" size="sm" onClick={() => retryReport(report.id)}>
                            Retry
                          </Button>
                        )}
                        {report.status === "generating" && (
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

        {/* Report Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 text-center">
            <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">24</div>
            <div className="text-sm text-muted-foreground">Total Reports</div>
          </Card>
          
          <Card className="p-6 text-center">
            <Download className="h-8 w-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">18</div>
            <div className="text-sm text-muted-foreground">Downloads This Month</div>
          </Card>
          
          <Card className="p-6 text-center">
            <Calendar className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">5</div>
            <div className="text-sm text-muted-foreground">Scheduled Reports</div>
          </Card>
          
          <Card className="p-6 text-center">
            <Clock className="h-8 w-8 text-warning mx-auto mb-2" />
            <div className="text-2xl font-bold text-foreground">3.2</div>
            <div className="text-sm text-muted-foreground">Avg Generation Time (min)</div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;