import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, FileSpreadsheet } from 'lucide-react';

// ✅ FIX: Define the type explicitly
type UsageExportRow = {
  id: string;
  email: string;
  fullName: string;
  totalCreditsUsed: number;
  lastActiveDate: string;
  topTool: string;
  status: string;
  joinedDate: string;
};

export function AdminUsageCSVExport({ 
  data,
  filename = "user-usage-report" 
}: { 
  data: UsageExportRow[];
  filename?: string;
}) {
  const [isExporting, setIsExporting] = useState<boolean>(false);

  // ✅ Fix this line to avoid referencing itself
  const convertToCSV = (rows: UsageExportRow[]) => {
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

    const csvContent = [
      headers.join(','),
      ...rows.map(row => [
        row.id,
        `"${row.email}"`,
        `"${row.fullName || ''}"`,
        row.totalCreditsUsed,
        row.lastActiveDate,
        `"${row.topTool || ''}"`,
        row.status,
        row.joinedDate
      ].join(','))
    ].join('\n');

    return csvContent;
  };

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const csvContent = convertToCSV(data);
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
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
          <span>Export CSV ({data.length} records)</span>
        </>
      )}
    </Button>
  );
}
