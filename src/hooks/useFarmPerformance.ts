import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

export type FarmPerformance = Tables<'farm_performance'>;

export const useFarmPerformance = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: farmPerformance = [], isLoading, isError, error } = useQuery({
    queryKey: ['farm-performance'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('farm_performance')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as FarmPerformance[];
    },
  });

  const addFarmPerformanceMutation = useMutation({
    mutationFn: async (newFarmPerformance: Omit<FarmPerformance, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('farm_performance')
        .insert(newFarmPerformance)
        .select()
        .single();
      
      if (error) throw error;
      return data as FarmPerformance;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farm-performance'] });
      toast({
        title: 'Success',
        description: 'Farm performance data added successfully',
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

  const updateFarmPerformanceMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<FarmPerformance> }) => {
      const { data, error } = await supabase
        .from('farm_performance')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as FarmPerformance;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farm-performance'] });
      toast({
        title: 'Success',
        description: 'Farm performance data updated successfully',
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

  const deleteFarmPerformanceMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('farm_performance')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farm-performance'] });
      toast({
        title: 'Success',
        description: 'Farm performance data deleted successfully',
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
    farmPerformance,
    isLoading,
    isError,
    error,
    addFarmPerformance: addFarmPerformanceMutation.mutate,
    updateFarmPerformance: updateFarmPerformanceMutation.mutate,
    deleteFarmPerformance: deleteFarmPerformanceMutation.mutate,
  };
};