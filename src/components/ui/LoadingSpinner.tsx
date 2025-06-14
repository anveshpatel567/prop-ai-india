
import React from 'react';

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="h-6 w-6 animate-spin rounded-full border-4 border-t-transparent border-orange-500"></div>
    </div>
  );
}
