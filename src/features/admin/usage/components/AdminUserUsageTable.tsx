
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export function AdminUserUsageTable({ 
  users 
}: { 
  users: Array<{
    id: string;
    email: string;
    fullName: string;
    totalCreditsUsed: number;
    lastActiveDate: string;
    topTool: string;
    status: string;
    joinedDate: string;
  }>;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User AI Usage Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No user data available</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Credits Used</TableHead>
                <TableHead>Top Tool</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="text-xs">
                          {getInitials(user.fullName || user.email)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.fullName || 'Unknown'}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-sm">
                      {user.totalCreditsUsed.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {user.topTool || 'None'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {formatDate(user.lastActiveDate)}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="secondary"
                      className={getStatusColor(user.status)}
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {formatDate(user.joinedDate)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
