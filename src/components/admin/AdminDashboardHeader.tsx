
import React from 'react';
import { Shield } from 'lucide-react';

export function AdminDashboardHeader(): JSX.Element {
  return (
    <div className="flex items-center gap-2 mb-8">
      <Shield className="h-6 w-6" />
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
    </div>
  );
}
