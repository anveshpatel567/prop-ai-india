
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export type CreditPack = {
  id: string;
  name: string;
  description: string | null;
  price_inr: number;
  credits: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type CreateCreditPackInput = {
  name: string;
  description?: string;
  price_inr: number;
  credits: number;
};

export type UpdateCreditPackInput = {
  id: string;
  name?: string;
  description?: string;
  price_inr?: number;
  credits?: number;
  is_active?: boolean;
};

export function useCreditPacks() {
  return useQuery({
    queryKey: ['credit-packs'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('credit_packs')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as CreditPack[];
    }
  });
}

export function useCreateCreditPack() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: CreateCreditPackInput) => {
      const { data, error } = await supabase
        .from('credit_packs')
        .insert([input])
        .select()
        .single();
      
      if (error) throw error;
      return data as CreditPack;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credit-packs'] });
    }
  });
}

export function useUpdateCreditPack() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (input: UpdateCreditPackInput) => {
      const { id, ...updateData } = input;
      const { data, error } = await supabase
        .from('credit_packs')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data as CreditPack;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credit-packs'] });
    }
  });
}

export function useDeleteCreditPack() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('credit_packs')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['credit-packs'] });
    }
  });
}
