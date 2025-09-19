import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Calendar, FileText, Download, Settings, Clock } from 'lucide-react';
import { useExportTemplates } from '@/hooks/useExportTemplates';
import { ExportTemplate } from '@/types';

interface ReportGeneratorProps {
  onGenerate: (template: ExportTemplate, config: any) => void;
}

export const ReportGenerator = ({ onGenerate }: ReportGeneratorProps) => {
  const { templates, isGenerating, generateReport } = useExportTemplates();
  const [selectedTemplate, setSelectedTemplate] = useState<ExportTemplate | null>(null);
  const [config, setConfig] = useState({
    title: '',
    format: 'pdf',
    dateRange: '3months',
    farms: ['all'],
    includeCharts: true,
    includeRawData: false,
    includeMetadata: true
  });

  const handleGenerate = async () => {
    if (!selectedTemplate) return;
    
    try {
      const result = await generateReport(selectedTemplate.id, config.format, config);
      onGenerate(selectedTemplate, { ...config, result });
    } catch (error) {
      console.error('Failed to generate report:', error);
    }
  };

  const categories = [...new Set(templates.map(t => t.category))];

  return (
    <div className="space-y-6">
      {/* Template Selection */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Select Report Template</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {categories.map(category => (
            <div key={category} className="space-y-3">
              <h4 className="font-medium text-muted-foreground text-sm uppercase tracking-wide">
                {category}
              </h4>
              {templates
                .filter(t => t.category === category)
                .map(template => (
                  <div
                    key={template.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedTemplate?.id === template.id 
                        ? 'border-primary bg-primary/5' 
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h5 className="font-medium text-foreground">{template.name}</h5>
                      <div className="flex gap-1">
                        {template.format.map(fmt => (
                          <Badge key={fmt} variant="outline" className="text-xs">
                            {fmt}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Est. Size: {template.estimatedSize}</span>
                      <span>{template.fields.length} data fields</span>
                    </div>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </Card>

      {/* Configuration */}
      {selectedTemplate && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Report Configuration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Report Title</Label>
                <Input
                  id="title"
                  value={config.title}
                  onChange={(e) => setConfig(prev => ({ ...prev, title: e.target.value }))}
                  placeholder={selectedTemplate.name}
                />
              </div>
              
              <div>
                <Label htmlFor="format">Output Format</Label>
                <Select value={config.format} onValueChange={(value) => setConfig(prev => ({ ...prev, format: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedTemplate.format.map(fmt => (
                      <SelectItem key={fmt} value={fmt.toLowerCase()}>
                        {fmt}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="dateRange">Date Range</Label>
                <Select value={config.dateRange} onValueChange={(value) => setConfig(prev => ({ ...prev, dateRange: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">Last Month</SelectItem>
                    <SelectItem value="3months">Last 3 Months</SelectItem>
                    <SelectItem value="6months">Last 6 Months</SelectItem>
                    <SelectItem value="1year">Last Year</SelectItem>
                    <SelectItem value="custom">Custom Range</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Report Options</Label>
                <div className="space-y-3 mt-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="charts"
                      checked={config.includeCharts}
                      onCheckedChange={(checked) => setConfig(prev => ({ ...prev, includeCharts: !!checked }))}
                    />
                    <Label htmlFor="charts" className="text-sm">Include Charts & Graphs</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="rawdata"
                      checked={config.includeRawData}
                      onCheckedChange={(checked) => setConfig(prev => ({ ...prev, includeRawData: !!checked }))}
                    />
                    <Label htmlFor="rawdata" className="text-sm">Include Raw Data Tables</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="metadata"
                      checked={config.includeMetadata}
                      onCheckedChange={(checked) => setConfig(prev => ({ ...prev, includeMetadata: !!checked }))}
                    />
                    <Label htmlFor="metadata" className="text-sm">Include Metadata & Timestamps</Label>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Estimated Generation Time</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selectedTemplate.category === 'Compliance Reports' ? '8-12 minutes' : '3-5 minutes'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="h-4 w-4" />
              <span>Template: {selectedTemplate.name}</span>
            </div>
            <Button 
              onClick={handleGenerate}
              disabled={isGenerating === selectedTemplate.id}
              size="lg"
            >
              {isGenerating === selectedTemplate.id ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </>
              )}
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};