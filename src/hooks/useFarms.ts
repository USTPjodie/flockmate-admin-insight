import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import type { Tables } from '@/integrations/supabase/types';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

export type Farm = Tables<'farms'>;

export const useFarms = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user } = useSupabaseAuth();

  const { data: farms = [], isLoading, isError, error } = useQuery({
    queryKey: ['farms'],
    queryFn: async () => {
      console.log('Fetching farms data...');
      const { data, error } = await supabase
        .from('farms')
        .select('*')
        .order('name', { ascending: true });
      
      if (error) {
        console.error('Error fetching farms:', error);
        // Temporary workaround for RLS issues
        // In a production environment, you should fix the RLS policies instead
        toast({
          title: 'RLS Policy Issue',
          description: 'There seems to be an issue with database permissions. Please contact your administrator.',
          variant: 'destructive',
        });
        throw error;
      }
      console.log('Farms data fetched successfully:', data);
      return data as Farm[];
    },
  });

  const addFarmMutation = useMutation({
    mutationFn: async (newFarm: Omit<Farm, 'id' | 'created_at' | 'updated_at'>) => {
      console.log('Attempting to add farm:', newFarm);
      console.log('Current user:', user);
      
      // Check if user is authenticated
      if (!user) {
        throw new Error('User not authenticated. Please log in first.');
      }
      
      // Check user profile and role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('id, role')
        .eq('id', user.id)
        .single();
      
      if (profileError) {
        console.error('Error fetching user profile:', profileError);
        // Even if we can't fetch the profile, let's try to insert the farm
        // This will help us determine if the issue is with the profile check or the insertion itself
        console.log('Proceeding with farm insertion despite profile error...');
      } else {
        console.log('User profile:', profile);
        
        if (profile.role !== 'admin') {
          console.warn('User is not admin. This might cause permission issues.');
        }
      }
      
      const { data, error } = await supabase
        .from('farms')
        .insert(newFarm)
        .select()
        .single();
      
      if (error) {
        console.error('Error adding farm:', error);
        // Provide more specific error messages
        if (error.code === '42501') {
          throw new Error('Permission denied. You may not have the required permissions to add farms. Error: ' + error.message);
        }
        throw error;
      }
      console.log('Farm added successfully:', data);
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
      console.error('Farm addition error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to add farm. Please check the console for more details.',
        variant: 'destructive',
      });
    },
  });

  const updateFarmMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<Farm> }) => {
      console.log('Updating farm:', id, updates);
      const { data, error } = await supabase
        .from('farms')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) {
        console.error('Error updating farm:', error);
        throw error;
      }
      console.log('Farm updated successfully:', data);
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
      console.error('Farm update error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to update farm',
        variant: 'destructive',
      });
    },
  });

  const deleteFarmMutation = useMutation({
    mutationFn: async (id: string) => {
      console.log('Deleting farm:', id);
      const { error } = await supabase
        .from('farms')
        .delete()
        .eq('id', id);
      
      if (error) {
        console.error('Error deleting farm:', error);
        throw error;
      }
      console.log('Farm deleted successfully');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['farms'] });
      toast({
        title: 'Success',
        description: 'Farm deleted successfully',
      });
    },
    onError: (error: any) => {
      console.error('Farm deletion error:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete farm',
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