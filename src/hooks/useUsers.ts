import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useSupabaseAuth } from '@/hooks/useSupabaseAuth';

export const useUsers = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { user: currentUser } = useSupabaseAuth();

  const { data: users = [], isLoading, isError, error } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          // Log the specific error for debugging
          console.error('Error fetching users:', error);
          
          // Handle specific Supabase errors
          if (error.message && error.message.includes('infinite recursion')) {
            throw new Error('Database policy error: Please contact administrator to fix user permissions.');
          }
          
          throw error;
        }
        
        return data || [];
      } catch (error: any) {
        // Handle specific Supabase errors
        if (error.message && error.message.includes('infinite recursion')) {
          throw new Error('Database policy error: Please contact administrator to fix user permissions.');
        }
        throw error;
      }
    },
  });

  // Fallback query for current user's profile only
  const { data: currentUserProfile, isLoading: isCurrentUserLoading } = useQuery({
    queryKey: ['current-user-profile', currentUser?.id],
    queryFn: async () => {
      if (!currentUser?.id) return null;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!currentUser?.id && isError,
  });

  const addUserMutation = useMutation({
    mutationFn: async ({ full_name, email, role }: { full_name: string; email: string; role: string }) => {
      // First, create the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email: email,
        email_confirm: true,
        user_metadata: { full_name: full_name },
      });

      if (authError) throw new Error(`Failed to create auth user: ${authError.message}`);

      // Then, create the profile in the profiles table
      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        email: email,
        full_name: full_name,
        role: role,
      });

      if (profileError) throw new Error(`Failed to create profile: ${profileError.message}`);

      return authData.user;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: 'Success',
        description: 'User created successfully',
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

  const updateUserMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: any }) => {
      const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: 'Success',
        description: 'User updated successfully',
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
    users,
    currentUserProfile,
    isLoading: isLoading || isCurrentUserLoading,
    isError,
    error,
    addUser: addUserMutation.mutate,
    updateUser: updateUserMutation.mutate,
  };
};