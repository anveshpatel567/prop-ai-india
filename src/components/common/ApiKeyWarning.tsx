
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { isGptKeyConfigured } from '@/lib/gptService';

export const ApiKeyWarning: React.FC = () => {
  const [showWarning, setShowWarning] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  // Iframe-safe initialization
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    // Only check after component is mounted and in browser
    if (!isMounted || typeof window === 'undefined') return;
    
    try {
      const hasKey = isGptKeyConfigured();
      setShowWarning(!hasKey);
      
      if (import.meta.env.DEV) {
        console.log('🔧 API Key Check:', hasKey ? 'Found ✅' : 'Missing ❌');
        if (!hasKey) {
          console.warn('⚠️ Create .env file with VITE_OPENAI_API_KEY=sk-your-key-here');
        }
      }
    } catch (error) {
      // Silent fail in iframe environments
      if (import.meta.env.DEV) {
        console.warn('⚠️ API key check failed in iframe environment');
      }
    }
  }, [isMounted]);

  // Don't render until mounted (prevents SSR/iframe issues)
  if (!isMounted || !showWarning) return null;

  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-700">
            <strong>⚠️ DEVELOPMENT MODE: GPT API key not set.</strong> Add{' '}
            <code className="bg-yellow-100 px-1 rounded">VITE_OPENAI_API_KEY</code>{' '}
            to your .env file. Hot reload will detect changes immediately.
          </p>
          <div className="mt-2 text-xs text-yellow-600">
            <p>Create a .env file in your project root with:</p>
            <code className="block bg-yellow-100 p-2 rounded mt-1">
              VITE_OPENAI_API_KEY=sk-PASTE-YOUR-KEY-HERE
            </code>
          </div>
        </div>
        <div className="ml-auto pl-3">
          <button
            onClick={() => setShowWarning(false)}
            className="text-yellow-400 hover:text-yellow-600"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};
