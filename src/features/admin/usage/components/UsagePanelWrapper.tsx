import React from 'react';

export function UsagePanelWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 md:p-6 lg:p-8 bg-white rounded-2xl shadow-md border">
      {children}
    </div>
  );
}
