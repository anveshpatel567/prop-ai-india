
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { X, Download, Smartphone } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PwaInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      
      // Only show on mobile devices
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) {
        setShowBanner(true);
        setTimeout(() => setIsVisible(true), 100);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    
    handleDismiss();
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setTimeout(() => {
      setShowBanner(false);
      setDeferredPrompt(null);
    }, 300);
  };

  if (!showBanner || !deferredPrompt) {
    return null;
  }

  return (
    <div className={`fixed bottom-4 left-4 right-4 z-50 transition-all duration-300 transform ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
    }`}>
      <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 rounded-xl shadow-2xl shadow-orange-500/30 max-w-sm mx-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-white/20 rounded-full">
              <Smartphone className="h-5 w-5" />
            </div>
            <span className="font-bold text-lg">Install FreePropList</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDismiss}
            className="text-white hover:bg-white/20 p-1 h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm mb-4 opacity-90 leading-relaxed">
          Add FreePropList to your Home Screen for instant access to AI tools and offline features!
        </p>
        
        <Button
          onClick={handleInstall}
          className="w-full bg-white text-orange-600 hover:bg-gray-100 font-semibold shadow-md hover:shadow-lg transition-all duration-200"
        >
          <Download className="mr-2 h-4 w-4" />
          Add to Home Screen
        </Button>

        <div className="mt-2 text-center">
          <span className="text-xs opacity-75">Tap once to install instantly</span>
        </div>
      </div>
    </div>
  );
};
