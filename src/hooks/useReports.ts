import { useState, useCallback, useEffect } from 'react';
import { Report } from '@/types';

const MOCK_REPORTS: Report[] = [
  {
    id: 'RPT-2024-001',
    title: 'Q1 2024 Financial Summary',
    type: 'financial',
    status: 'completed',
    format: 'pdf',
    size: '3.2 MB',
    generatedAt: '2024-03-31T14:32:00Z',
    parameters: { period: 'Q1 2024', farms: ['all'] }
  },
  {
    id: 'RPT-2024-002',
    title: 'Farm Performance Comparison',
    type: 'performance',
    status: 'completed',
    format: 'excel',
    size: '1.8 MB',
    generatedAt: '2024-03-30T09:15:00Z',
    parameters: { farms: ['greenfield', 'valley', 'hillside'] }
  },
  {
    id: 'RPT-2024-003',
    title: 'Cost Analysis - March 2024',
    type: 'operational',
    status: 'generating',
    format: 'pdf',
    generatedAt: '2024-03-29T16:45:00Z',
    parameters: { period: 'March 2024', costCategories: ['feed', 'labor', 'healthcare'] }
  }
];

export const useReports = () => {
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);
  const [isLoading, setIsLoading] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    status: 'all',
    period: 'all'
  });

  const filteredReports = reports.filter(report => {
    if (filters.type !== 'all' && report.type !== filters.type) return false;
    if (filters.status !== 'all' && report.status !== filters.status) return false;
    return true;
  });

  const createReport = useCallback(async (reportData: Partial<Report>) => {
    setIsLoading(true);
    try {
      const newReport: Report = {
        id: `RPT-${Date.now()}`,
        title: reportData.title || 'Untitled Report',
        type: reportData.type || 'operational',
        status: 'generating',
        format: reportData.format || 'pdf',
        generatedAt: new Date().toISOString(),
        parameters: reportData.parameters || {}
      };
      
      setReports(prev => [newReport, ...prev]);
      
      // Simulate report generation
      setTimeout(() => {
        setReports(prev => prev.map(report => 
          report.id === newReport.id 
            ? { ...report, status: 'completed' as const, size: '2.1 MB' }
            : report
        ));
      }, 3000);
      
      return newReport;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteReport = useCallback((reportId: string) => {
    setReports(prev => prev.filter(report => report.id !== reportId));
  }, []);

  const retryReport = useCallback((reportId: string) => {
    setReports(prev => prev.map(report => 
      report.id === reportId 
        ? { ...report, status: 'generating' as const }
        : report
    ));
    
    // Simulate retry
    setTimeout(() => {
      setReports(prev => prev.map(report => 
        report.id === reportId 
          ? { ...report, status: 'completed' as const, size: '2.1 MB' }
          : report
      ));
    }, 2000);
  }, []);

  const downloadReport = useCallback((reportId: string) => {
    const report = reports.find(r => r.id === reportId);
    if (report && report.status === 'completed') {
      // In a real app, this would download the actual file
      const link = document.createElement('a');
      link.href = `#download-${reportId}`;
      link.download = `${report.title}.${report.format}`;
      link.click();
    }
  }, [reports]);

  return {
    reports: filteredReports,
    allReports: reports,
    isLoading,
    filters,
    setFilters,
    createReport,
    deleteReport,
    retryReport,
    downloadReport
  };
};