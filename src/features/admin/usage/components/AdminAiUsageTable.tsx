import React from 'react';

type UsageRow = {
  id: string;
  email: string;
  fullName: string;
  totalCreditsUsed: number;
  lastActiveDate: string;
  topTool: string;
  status: string;
  joinedDate: string;
};

type Props = {
  data: UsageRow[];
};

export function AdminAiUsageTable({ data }: Props) {
  return (
    <div className="overflow-x-auto border rounded-xl">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3">Email</th>
            <th className="p-3">Full Name</th>
            <th className="p-3">Credits Used</th>
            <th className="p-3">Top Tool</th>
            <th className="p-3">Status</th>
            <th className="p-3">Last Active</th>
            <th className="p-3">Joined</th>
          </tr>
        </thead>
        <tbody>
          {data.map((user) => (
            <tr key={user.id} className="border-t">
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.fullName || '-'}</td>
              <td className="p-3">{user.totalCreditsUsed}</td>
              <td className="p-3">{user.topTool || '-'}</td>
              <td className="p-3">{user.status}</td>
              <td className="p-3">{user.lastActiveDate}</td>
              <td className="p-3">{user.joinedDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
