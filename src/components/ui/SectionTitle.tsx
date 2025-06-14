
import React from 'react';

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xl font-bold text-gray-900 mb-4">{children}</h2>
  );
}
