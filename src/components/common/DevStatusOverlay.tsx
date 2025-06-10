
import React, { useState, useEffect } from 'react';
import { isGptKeyConfigured } from '@/lib/gptService';

export const DevStatusOverlay: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || typeof window === 'undefined') return null;

  const isIframe = window.self !== window.top;
  const hasGptKey = isGptKeyConfigured();
  const isDev = import.meta.env.DEV;

  if (!isDev || !isVisible) return null;

  const SafeContextStatus = () => {
    try {
      // Dynamically import and use contexts only if available
      const { useAuth } = require('@/context/AuthContext');
      const { useWallet } = require('@/context/WalletContext');
      const { useNotification } = require('@/context/NotificationContext');
      const { useAi } = require('@/context/AiContext');

      const { isMounted: authMounted, user } = useAuth();
      const { balance } = useWallet();
      const { getUnreadCount } = useNotification();
      const { aiTools } = useAi();

      return (
        <>
          <div>Auth: {authMounted ? '✅' : '❌'}</div>
          <div>User: {user?.email ? '✅' : '❌'}</div>
          <div>Balance: ₹{balance?.balance || 0}</div>
          <div>Notifications: {getUnreadCount()}</div>
          <div>AI Tools: {aiTools.length}</div>
        </>
      );
    } catch (error) {
      return <div>Context: ❌ {error instanceof Error ? error.message.slice(0, 30) : 'Error'}</div>;
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 bg-black/80 text-white text-xs p-2 rounded font-mono">
      <div className="flex items-center justify-between mb-1">
        <span className="font-bold">DEV STATUS</span>
        <button 
          onClick={() => setIsVisible(false)}
          className="ml-2 text-gray-400 hover:text-white"
        >
          ×
        </button>
      </div>
      <div className="space-y-1">
        <div>System: DEV {isDev ? '✅' : '❌'}</div>
        <div>GPT: {hasGptKey ? '✅' : '❌'}</div>
        <div>Toast: ✅</div>
        <SafeContextStatus />
        <div>IFrame Safe: {isIframe ? '✅' : 'N/A'}</div>
      </div>
    </div>
  );
};
