import React from 'react';

type Props = {
  totalCreditsUsed: number;
  totalUsers: number;
  activeUsers: number;
};

export function AdminAiUsageStats({ totalCreditsUsed, totalUsers, activeUsers }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="p-4 bg-orange-100 rounded-xl shadow-sm text-center">
        <p className="text-sm font-medium text-orange-800">Total Credits Used</p>
        <p className="text-2xl font-bold text-orange-900">{totalCreditsUsed}</p>
      </div>
      <div className="p-4 bg-rose-100 rounded-xl shadow-sm text-center">
        <p className="text-sm font-medium text-rose-800">Total Users</p>
        <p className="text-2xl font-bold text-rose-900">{totalUsers}</p>
      </div>
      <div className="p-4 bg-pink-100 rounded-xl shadow-sm text-center">
        <p className="text-sm font-medium text-pink-800">Active This Week</p>
        <p className="text-2xl font-bold text-pink-900">{activeUsers}</p>
      </div>
    </div>
  );
}
