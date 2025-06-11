
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

export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  console.log('WalletProvider mounting...');
  
  const [hasMounted, setHasMounted] = useState(false);
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [receipts, setReceipts] = useState<PaymentReceipt[]>([]);

  useEffect(() => {
    console.log('WalletProvider initial mount effect...');
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;

    console.log('WalletProvider initializing wallet...');
    const initializeWallet = () => {
      const dummyBalance: WalletBalance = {
        id: '1',
        user_id: '1',
        balance: 250,
        last_updated: new Date().toISOString(),
        status: 'active'
      };
      setBalance(dummyBalance);
      console.log('Wallet initialized with balance:', dummyBalance);
    };

    const timeoutId = setTimeout(initializeWallet, 50);
    return () => clearTimeout(timeoutId);
  }, [hasMounted]);

  const addCredits = async (amount: number, receiptUrl: string) => {
    console.log('Adding credits:', amount, receiptUrl);
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
    console.log('Deducting credits:', amount, 'for tool:', toolName);
    if (!balance || balance.balance < amount) {
      console.log('Insufficient credits for deduction');
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
    console.log('WalletProvider not mounted yet, returning null');
    return null;
  }

  const contextValue: WalletContextType = {
    balance,
    receipts,
    addCredits,
    deductCredits,
    refreshBalance
  };

  return (
    <WalletContext.Provider value={contextValue}>
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
