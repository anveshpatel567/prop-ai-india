
import React from 'react';

export function PanelWrapper({ 
  title, 
  children 
}: { 
  title: string; 
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      {children}
    </div>
  );
}
