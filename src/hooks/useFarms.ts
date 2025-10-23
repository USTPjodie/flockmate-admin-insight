import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

export type Farm = Tables<'farms'>;

export const useFarms = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: farms = [], isLoading, isError, error } = useQuery({
    queryKey: ['farms'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('farms')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) throw error;
      return data as Farm[];
    },
  });

  const addFarmMutation = useMutation({
    mutationFn: async (newFarm: Omit<Farm, 'id' | 'created_at' | 'updated_at'>) => {
      const { data, error } = await supabase
        .from('farms')
        .insert(newFarm)
        .select()
        .single();
      
      if (error) throw error;
      return data as Farm;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farms'] });
      toast({
        title: 'Success',
        description: 'Farm added successfully',
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

  const updateFarmMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Farm> }) => {
      const { data, error } = await supabase
        .from('farms')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Farm;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farms'] });
      toast({
        title: 'Success',
        description: 'Farm updated successfully',
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

  const deleteFarmMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('farms')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farms'] });
      toast({
        title: 'Success',
        description: 'Farm deleted successfully',
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
    farms,
    isLoading,
    isError,
    error,
    addFarm: addFarmMutation.mutate,
    updateFarm: updateFarmMutation.mutate,
    deleteFarm: deleteFarmMutation.mutate,
  };
};