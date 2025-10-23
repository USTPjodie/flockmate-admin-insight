import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';

export type Alert = Tables<'alerts'>;

export const useAlerts = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: alerts = [], isLoading, isError, error } = useQuery({
    queryKey: ['alerts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as Alert[];
    },
  });

  const addAlertMutation = useMutation({
    mutationFn: async (newAlert: Omit<Alert, 'id' | 'created_at' | 'read'>) => {
      const { data, error } = await supabase
        .from('alerts')
        .insert({
          ...newAlert,
          read: false
        })
        .select()
        .single();
      
      if (error) throw error;
      return data as Alert;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
      toast({
        title: 'Success',
        description: 'Alert created successfully',
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

  const updateAlertMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Alert> }) => {
      const { data, error } = await supabase
        .from('alerts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Alert;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
      toast({
        title: 'Success',
        description: 'Alert updated successfully',
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

  const markAlertAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from('alerts')
        .update({ read: true })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as Alert;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
    },
    onError: (error: any) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const deleteAlertMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('alerts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['alerts'] });
      toast({
        title: 'Success',
        description: 'Alert deleted successfully',
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
    alerts,
    isLoading,
    isError,
    error,
    addAlert: addAlertMutation.mutate,
    updateAlert: updateAlertMutation.mutate,
    markAlertAsRead: markAlertAsReadMutation.mutate,
    deleteAlert: deleteAlertMutation.mutate,
  };
};