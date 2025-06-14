
import React from 'react';
import { Settings, Users } from 'lucide-react';

export default function AdminToolsHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <Settings className="h-8 w-8 text-orange-500" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">AI Tool Controls</h1>
          <p className="text-gray-600">Manage tool access and monitor usage across the platform</p>
        </div>
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Users className="h-4 w-4" />
        <span>Admin Panel</span>
      </div>
    </div>
  );
}
