
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface WalletTransaction {
  id: string;
  user_id: string;
  wallet_id: string;
  transaction_type: 'debit' | 'credit' | 'refund';
  amount: number;
  description: string | null;
  reference_id: string | null;
  reference_type: string | null;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
}

export const useWalletTransactions = () => {
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = async (userId?: string) => {
    setLoading(true);
    try {
      let query = supabase
        .from('wallet_transactions')
        .select('*')
        .order('created_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching wallet transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const createTransaction = async (transaction: Omit<WalletTransaction, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('wallet_transactions')
        .insert([transaction])
        .select()
        .single();

      if (error) throw error;
      
      // Refresh transactions list
      await fetchTransactions();
      return data;
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw error;
    }
  };

  return {
    transactions,
    loading,
    fetchTransactions,
    createTransaction
  };
};
