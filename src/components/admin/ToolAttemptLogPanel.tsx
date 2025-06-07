
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToolAttemptLogs } from '@/hooks/useToolAttemptLogs';
import { RefreshCw, Filter, Download } from 'lucide-react';

export const ToolAttemptLogPanel: React.FC = () => {
  const [toolFilter, setToolFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  
  const { logs, loading, error, refetch } = useToolAttemptLogs({
    toolName: toolFilter || undefined,
    wasAllowed: statusFilter === 'allowed' ? true : statusFilter === 'blocked' ? false : undefined,
    limit: 100
  });

  const handleExport = () => {
    const csv = [
      ['Date', 'User ID', 'Tool', 'Status', 'Reason', 'Credits Required'].join(','),
      ...logs.map(log => [
        new Date(log.attempted_at).toLocaleString(),
        log.user_id,
        log.tool_name,
        log.was_allowed ? 'Allowed' : 'Blocked',
        log.reason || '',
        log.credits_required || ''
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tool-attempts.csv';
    a.click();
  };

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-red-600">Error loading tool attempts: {error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Tool Attempt Logs
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" onClick={refetch}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <Input
              placeholder="Filter by tool name..."
              value={toolFilter}
              onChange={(e) => setToolFilter(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Status</SelectItem>
              <SelectItem value="allowed">Allowed</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>User ID</TableHead>
                <TableHead>Tool</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Credits</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-sm">
                    {new Date(log.attempted_at).toLocaleString()}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {log.user_id.substring(0, 8)}...
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{log.tool_name}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={log.was_allowed ? "default" : "destructive"}>
                      {log.was_allowed ? 'Allowed' : 'Blocked'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {log.reason || '-'}
                  </TableCell>
                  <TableCell>
                    {log.credits_required ? `${log.credits_required} credits` : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {logs.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            No tool attempts found
          </div>
        )}
      </CardContent>
    </Card>
  );
};
