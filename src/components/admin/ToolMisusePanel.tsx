
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useMisuseFlags } from '@/hooks/useMisuseFlags';
import { useAuth } from '@/context/AuthContext';
import { RefreshCw, Check, AlertTriangle } from 'lucide-react';

export const ToolMisusePanel: React.FC = () => {
  const { user } = useAuth();
  const { flags, loading, error, refetch, resolveFlag } = useMisuseFlags();

  const handleResolve = async (flagId: string) => {
    if (!user?.id) return;
    await resolveFlag(flagId, user.id);
  };

  const getFlagTypeColor = (flagType: string) => {
    switch (flagType) {
      case 'bot': return 'destructive';
      case 'suspicious': return 'destructive';
      case 'overuse': return 'secondary';
      case 'spam': return 'destructive';
      default: return 'outline';
    }
  };

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-red-600">Error loading misuse flags: {error}</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-500" />
            Tool Misuse Flags
          </div>
          <Button variant="outline" size="sm" onClick={refetch}>
            <RefreshCw className="h-4 w-4" />
          </Button>
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
                <TableHead>User ID</TableHead>
                <TableHead>Tool</TableHead>
                <TableHead>Flag Type</TableHead>
                <TableHead>Notes</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {flags.map((flag) => (
                <TableRow key={flag.id}>
                  <TableCell className="text-sm">
                    {new Date(flag.flagged_at).toLocaleString()}
                  </TableCell>
                  <TableCell className="font-mono text-xs">
                    {flag.user_id.substring(0, 8)}...
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{flag.tool_name}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getFlagTypeColor(flag.flag_type)}>
                      {flag.flag_type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600 max-w-xs truncate">
                    {flag.notes || '-'}
                  </TableCell>
                  <TableCell>
                    <Badge variant={flag.resolved ? "default" : "secondary"}>
                      {flag.resolved ? 'Resolved' : 'Active'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {!flag.resolved && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleResolve(flag.id)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Resolve
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {flags.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            No misuse flags found
          </div>
        )}
      </CardContent>
    </Card>
  );
};
