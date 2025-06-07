
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMyToolAttempts } from '@/hooks/useMyToolAttempts';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

export const UserAiToolUsagePanel: React.FC = () => {
  const { attempts, loading, error } = useMyToolAttempts(20);

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-red-600">Error loading your AI tool usage: {error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Your AI Tool Usage History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Tool</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Credits Used</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attempts.map((attempt) => (
                <TableRow key={attempt.id}>
                  <TableCell className="text-sm">
                    {new Date(attempt.attempted_at).toLocaleDateString()} {' '}
                    {new Date(attempt.attempted_at).toLocaleTimeString()}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {attempt.tool_name.replace('_', ' ').toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {attempt.was_allowed ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <Badge variant={attempt.was_allowed ? "default" : "destructive"}>
                        {attempt.was_allowed ? 'Success' : 'Blocked'}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    {attempt.was_allowed && attempt.credits_required ? (
                      <span className="text-sm font-medium">
                        {attempt.credits_required} credits
                      </span>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {attempt.reason || (attempt.was_allowed ? 'Tool used successfully' : 'Access denied')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {attempts.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            You haven't used any AI tools yet
          </div>
        )}
      </CardContent>
    </Card>
  );
};
