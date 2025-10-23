import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { Tables } from '@/integrations/supabase/types';

export type PerformanceData = Tables<'farm_performance'>;

export const usePerformanceData = () => {
  const { data: farmPerformance = [], isLoading } = useQuery({
    queryKey: ['farm-performance'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('farm_performance')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as PerformanceData[];
    },
  });

  return {
    farmPerformance,
    isLoading,
  };
};