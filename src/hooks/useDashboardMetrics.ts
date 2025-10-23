import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

export type DashboardMetric = Tables<'dashboard_metrics'>;

export const useDashboardMetrics = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: dashboardMetrics = [], isLoading, isError, error } = useQuery({
    queryKey: ['dashboard-metrics'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('dashboard_metrics')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as DashboardMetric[];
    },
  });

  const addDashboardMetricMutation = useMutation({
    mutationFn: async (newMetric: Omit<DashboardMetric, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('dashboard_metrics')
        .insert(newMetric)
        .select()
        .single();
      
      if (error) throw error;
      return data as DashboardMetric;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-metrics'] });
      toast({
        title: 'Success',
        description: 'Dashboard metric added successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const updateDashboardMetricMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<DashboardMetric> }) => {
      const { data, error } = await supabase
        .from('dashboard_metrics')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as DashboardMetric;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-metrics'] });
      toast({
        title: 'Success',
        description: 'Dashboard metric updated successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteDashboardMetricMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('dashboard_metrics')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dashboard-metrics'] });
      toast({
        title: 'Success',
        description: 'Dashboard metric deleted successfully',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  return {
    dashboardMetrics,
    isLoading,
    isError,
    error,
    addDashboardMetric: addDashboardMetricMutation.mutate,
    updateDashboardMetric: updateDashboardMetricMutation.mutate,
    deleteDashboardMetric: deleteDashboardMetricMutation.mutate,
  };
};