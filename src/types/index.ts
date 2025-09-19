// Core TypeScript interfaces for scalability

export interface Farm {
  id: string;
  name: string;
  location: string;
  manager: string;
  capacity: number;
  status: 'active' | 'inactive' | 'maintenance';
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface Batch {
  id: string;
  farmId: string;
  startDate: string;
  endDate?: string;
  birdCount: number;
  breed: string;
  status: 'active' | 'completed' | 'sold';
  currentAge: number;
  targetWeight: number;
  currentWeight: number;
}

export interface FinancialData {
  batchId: string;
  revenue: number;
  costs: {
    feed: number;
    labor: number;
    healthcare: number;
    utilities: number;
    other: number;
  };
  profit: number;
  margin: number;
  roi: number;
}

export interface PerformanceMetrics {
  batchId: string;
  fcr: number;
  mortality: number;
  adg: number; // Average Daily Gain
  feedEfficiency: number;
  date: string;
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  farmId?: string;
  batchId?: string;
  timestamp: string;
  acknowledged: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'technician';
  farmAccess: string[];
  lastLogin: string;
  status: 'active' | 'inactive';
}

export interface Report {
  id: string;
  title: string;
  type: 'financial' | 'performance' | 'comparison' | 'operational';
  status: 'generating' | 'completed' | 'failed';
  format: 'pdf' | 'excel' | 'csv';
  size?: string;
  generatedAt: string;
  parameters: Record<string, any>;
}

export interface ExportTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  format: string[];
  fields: string[];
  estimatedSize: string;
}

export interface DashboardConfig {
  widgets: string[];
  layout: 'grid' | 'list';
  refreshInterval: number;
  filters: Record<string, any>;
}