
import React, { useState, useEffect } from 'react';
import { isGptKeyConfigured } from '@/lib/gptService';
import { useAuth } from '@/context/AuthContext';

export const DevStatusOverlay: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [authStatus, setAuthStatus] = useState('❌');

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Safe auth check
  useEffect(() => {
    if (!isMounted) return;
    
    try {
      const { isMounted: authMounted } = useAuth();
      setAuthStatus(authMounted ? '✅' : '❌');
    } catch (error) {
      setAuthStatus('❌');
      console.log('🔧 DevStatusOverlay: Auth context not ready yet');
    }
  }, [isMounted]);

  // Don't render until mounted
  if (!isMounted) return null;

  const isIframe = typeof window !== 'undefined' && window.self !== window.top;
  const hasGptKey = isGptKeyConfigured();
  const isDev = import.meta.env.DEV;

  if (!isDev || !isVisible) return null;

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
        <div>Auth: {authStatus}</div>
        <div>IFrame Safe: {isIframe ? '✅' : 'N/A'}</div>
      </div>
    </div>
  );
};
