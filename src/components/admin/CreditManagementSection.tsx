
import React from 'react';
import { CreditCard } from 'lucide-react';

export function CreditManagementSection(): JSX.Element {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="h-5 w-5 text-purple-500" />
        <h2 className="text-xl font-semibold">Credit Management</h2>
      </div>
      <p className="text-gray-600 mb-4">
        Manage credit packs, approve payment receipts, and monitor credit usage.
      </p>
      <div className="flex flex-wrap gap-2">
        <a
          href="/admin/credit-packs"
          className="px-4 py-2 bg-purple-50 text-purple-700 rounded-md hover:bg-purple-100 transition"
        >
          Credit Packs
        </a>
        <a
          href="/admin/payment-receipts"
          className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-md hover:bg-indigo-100 transition"
        >
          Payment Receipts
        </a>
      </div>
    </div>
  );
}
