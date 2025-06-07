
import React from 'react';
import { Users } from 'lucide-react';

export function UserManagementSection(): JSX.Element {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-5 w-5 text-blue-500" />
        <h2 className="text-xl font-semibold">User Management</h2>
      </div>
      <p className="text-gray-600 mb-4">
        Manage users, verify RERA credentials, and handle user permissions.
      </p>
      <div className="flex flex-wrap gap-2">
        <a
          href="/admin/users"
          className="px-4 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition"
        >
          Manage Users
        </a>
        <a
          href="/admin/rera-verification"
          className="px-4 py-2 bg-green-50 text-green-700 rounded-md hover:bg-green-100 transition"
        >
          RERA Verification
        </a>
      </div>
    </div>
  );
}
