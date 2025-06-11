
import React, { createContext, useContext, useState, useEffect } from 'react';
import { WalletBalance, PaymentReceipt } from '../types';

interface WalletContextType {
  balance: WalletBalance | null;
  receipts: PaymentReceipt[];
  addCredits: (amount: number, receiptUrl: string) => Promise<void>;
  deductCredits: (amount: number, toolName: string) => Promise<boolean>;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | null>(null);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [receipts, setReceipts] = useState<PaymentReceipt[]>([]);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    const initializeWallet = () => {
      const dummyBalance: WalletBalance = {
        id: '1',
        user_id: '1',
        balance: 250,
        last_updated: new Date().toISOString(),
        status: 'active'
      };
      setBalance(dummyBalance);
    };

    const timeoutId = setTimeout(initializeWallet, 50);
    return () => clearTimeout(timeoutId);
  }, [hasMounted]);

  const addCredits = async (amount: number, receiptUrl: string) => {
    const newReceipt: PaymentReceipt = {
      id: Date.now().toString(),
      user_id: '1',
      amount,
      receipt_url: receiptUrl,
      status: 'pending',
      admin_notes: '',
      created_at: new Date().toISOString()
    };

    setReceipts(prev => [newReceipt, ...prev]);
    
    if (balance) {
      const tempCredits = amount * 0.25;
      setBalance(prev => prev ? {
        ...prev,
        balance: prev.balance + tempCredits,
        last_updated: new Date().toISOString()
      } : null);
    }
  };

  const deductCredits = async (amount: number, toolName: string): Promise<boolean> => {
    if (!balance || balance.balance < amount) {
      return false;
    }

    setBalance(prev => prev ? {
      ...prev,
      balance: prev.balance - amount,
      last_updated: new Date().toISOString()
    } : null);

    console.log(`Deducted ${amount} credits for ${toolName}`);
    return true;
  };

  const refreshBalance = async () => {
    console.log('Refreshing wallet balance...');
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <WalletContext.Provider value={{
      balance,
      receipts,
      addCredits,
      deductCredits,
      refreshBalance
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
};
