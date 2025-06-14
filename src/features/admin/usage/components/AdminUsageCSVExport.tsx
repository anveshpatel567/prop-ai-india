import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileSpreadsheet } from 'lucide-react';

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
  filename?: string;
};

export function AdminUsageCSVExport({ data, filename = "user-usage-report" }: Props) {
  const [isExporting, setIsExporting] = useState(false);

  const convertToCSV = () => {
    const headers = [
      'User ID',
      'Email',
      'Full Name',
      'Total Credits Used',
      'Last Active Date',
      'Top Tool',
      'Status',
      'Joined Date'
    ];

    const csvRows = data.map(row => [
      row.id,
      `"${row.email}"`,
      `"${row.fullName || ''}"`,
      row.totalCreditsUsed.toString(),
      row.lastActiveDate,
      `"${row.topTool || ''}"`,
      row.status,
      row.joinedDate
    ]);

    return [headers, ...csvRows].map(row => row.join(',')).join('\n');
  };

  const handleExport = () => {
    setIsExporting(true);

    try {
      const csvContent = convertToCSV();
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.href = url;
      link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
      link.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error("CSV Export failed:", e);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={isExporting || data.length === 0}
      variant="outline"
      className="flex items-center gap-2"
    >
      {isExporting ? (
        <>
          <FileSpreadsheet className="h-4 w-4 animate-pulse" />
          <span>Exporting...</span>
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          <span>Export CSV ({data.length})</span>
        </>
      )}
    </Button>
  );
}
