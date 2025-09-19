import { useState, useCallback } from 'react';
import { ExportTemplate } from '@/types';

const EXPORT_TEMPLATES: ExportTemplate[] = [
  {
    id: 'batch-pl',
    name: 'Batch P&L Summary',
    description: 'Comprehensive profit & loss analysis for selected batches',
    category: 'Financial Data',
    format: ['PDF', 'Excel', 'CSV'],
    fields: ['revenue', 'costs', 'profit', 'margin', 'roi', 'feedCosts', 'laborCosts'],
    estimatedSize: '~2.5 MB'
  },
  {
    id: 'performance-comparison',
    name: 'Farm Performance Comparison',
    description: 'Side-by-side performance metrics across farms',
    category: 'Performance Metrics',
    format: ['PDF', 'Excel'],
    fields: ['fcr', 'mortality', 'adg', 'feedEfficiency', 'batchPerformance'],
    estimatedSize: '~1.8 MB'
  },
  {
    id: 'cost-breakdown',
    name: 'Detailed Cost Analysis',
    description: 'Granular cost breakdown by category and time period',
    category: 'Financial Data',
    format: ['Excel', 'CSV'],
    fields: ['feedCosts', 'laborCosts', 'healthcareCosts', 'utilityCosts', 'overheadCosts'],
    estimatedSize: '~3.2 MB'
  },
  {
    id: 'mortality-trends',
    name: 'Mortality & Health Analysis',
    description: 'Health trends and mortality patterns across batches',
    category: 'Performance Metrics',
    format: ['PDF', 'Excel'],
    fields: ['mortality', 'healthMetrics', 'treatmentCosts', 'vaccinationRecords'],
    estimatedSize: '~2.1 MB'
  },
  {
    id: 'feed-consumption',
    name: 'Feed Consumption Report',
    description: 'Feed usage efficiency and consumption patterns',
    category: 'Operational Data',
    format: ['Excel', 'CSV'],
    fields: ['feedConsumption', 'fcr', 'feedCosts', 'inventoryLevels'],
    estimatedSize: '~1.9 MB'
  },
  {
    id: 'regulatory-compliance',
    name: 'Compliance Documentation',
    description: 'Complete regulatory compliance and audit trail',
    category: 'Compliance Reports',
    format: ['PDF'],
    fields: ['auditTrail', 'certifications', 'inspectionRecords', 'complianceStatus'],
    estimatedSize: '~5.1 MB'
  }
];

export const useExportTemplates = () => {
  const [templates] = useState<ExportTemplate[]>(EXPORT_TEMPLATES);
  const [isGenerating, setIsGenerating] = useState<string | null>(null);

  const generateReport = useCallback(async (
    templateId: string,
    format: string,
    parameters: Record<string, any>
  ) => {
    setIsGenerating(templateId);
    
    try {
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const template = templates.find(t => t.id === templateId);
      if (!template) throw new Error('Template not found');
      
      // In a real app, this would trigger backend processing
      const reportData = {
        id: `RPT-${Date.now()}`,
        templateId,
        format,
        parameters,
        status: 'completed',
        downloadUrl: `#download-${templateId}-${format.toLowerCase()}`,
        generatedAt: new Date().toISOString()
      };
      
      return reportData;
    } finally {
      setIsGenerating(null);
    }
  }, [templates]);

  const getTemplatesByCategory = useCallback((category: string) => {
    return templates.filter(template => template.category === category);
  }, [templates]);

  const getTemplateById = useCallback((id: string) => {
    return templates.find(template => template.id === id);
  }, [templates]);

  return {
    templates,
    isGenerating,
    generateReport,
    getTemplatesByCategory,
    getTemplateById
  };
};