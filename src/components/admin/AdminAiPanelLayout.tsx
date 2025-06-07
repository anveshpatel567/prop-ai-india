
import React from 'react';

interface AdminAiPanelLayoutProps {
  children: React.ReactNode;
}

export function AdminAiPanelLayout({ children }: AdminAiPanelLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {children}
      </div>
    </div>
  );
}
