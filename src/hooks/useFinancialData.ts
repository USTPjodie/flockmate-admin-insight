import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

export type FinancialData = Tables<'financial_data'>;
export type CostBreakdown = Tables<'cost_breakdown'>;

export const useFinancialData = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: financialData = [], isLoading, isError, error } = useQuery({
    queryKey: ['financial-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('financial_data')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as FinancialData[];
    },
  });

  const { data: costBreakdown = [], isLoading: isCostBreakdownLoading } = useQuery({
    queryKey: ['cost-breakdown'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('cost_breakdown')
        .select('*')
        .order('created_at', { ascending: true });
      
      if (error) throw error;
      return data as CostBreakdown[];
    },
  });

  const addFinancialDataMutation = useMutation({
    mutationFn: async (newFinancialData: Omit<FinancialData, 'id' | 'created_at'>) => {
      const { data, error } = await supabase
        .from('financial_data')
        .insert(newFinancialData)
        .select()
        .single();
      
      if (error) throw error;
      return data as FinancialData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financial-data'] });
      toast({
        title: 'Success',
        description: 'Financial data added successfully',
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

  const updateFinancialDataMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<FinancialData> }) => {
      const { data, error } = await supabase
        .from('financial_data')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as FinancialData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financial-data'] });
      toast({
        title: 'Success',
        description: 'Financial data updated successfully',
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

  const deleteFinancialDataMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('financial_data')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['financial-data'] });
      toast({
        title: 'Success',
        description: 'Financial data deleted successfully',
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
    financialData,
    costBreakdown,
    isLoading: isLoading || isCostBreakdownLoading,
    isError,
    error,
    addFinancialData: addFinancialDataMutation.mutate,
    updateFinancialData: updateFinancialDataMutation.mutate,
    deleteFinancialData: deleteFinancialDataMutation.mutate,
  };
};