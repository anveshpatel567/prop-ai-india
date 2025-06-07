
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/types/supabase-db';

type AiToolTransaction = Database['public']['Tables']['ai_tool_transactions']['Row'];
type AiToolTransactionInsert = Database['public']['Tables']['ai_tool_transactions']['Insert'];

export const useAiToolTransactions = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createTransaction = async (transactionData: AiToolTransactionInsert) => {
    try {
      setLoading(true);
      const { data, error: createError } = await supabase
        .from('ai_tool_transactions')
        .insert(transactionData)
        .select()
        .single();

      if (createError) {
        setError(createError.message);
        return null;
      }

      return data;
    } catch (err) {
      console.error('Error creating AI tool transaction:', err);
      setError('Failed to create transaction');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getUserTransactions = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from('ai_tool_transactions')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
        return [];
      }

      return data || [];
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to fetch transactions');
      return [];
    } finally {
      setLoading(false);
    }
  };

  const updateTransactionStatus = async (id: string, status: 'pending' | 'success' | 'failed', outputData?: any, errorMessage?: string) => {
    try {
      setLoading(true);
      const updates: any = { status };
      
      if (outputData) updates.output_data = outputData;
      if (errorMessage) updates.error_message = errorMessage;

      const { data, error: updateError } = await supabase
        .from('ai_tool_transactions')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        setError(updateError.message);
        return null;
      }

      return data;
    } catch (err) {
      console.error('Error updating transaction:', err);
      setError('Failed to update transaction');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createTransaction,
    getUserTransactions,
    updateTransactionStatus
  };
};
