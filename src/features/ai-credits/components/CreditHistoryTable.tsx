
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function CreditHistoryTable({ 
  transactions 
}: { 
  transactions: Array<{
    id: string;
    type: string;
    amount: number;
    description: string;
    timestamp: string;
    status: string;
  }>;
}) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'purchase': return 'bg-green-100 text-green-800';
      case 'usage': return 'bg-blue-100 text-blue-800';
      case 'refund': return 'bg-yellow-100 text-yellow-800';
      case 'bonus': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAmount = (amount: number, type: string) => {
    const prefix = type === 'usage' ? '-' : '+';
    return `${prefix}${amount}`;
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit History</CardTitle>
      </CardHeader>
      <CardContent>
        {transactions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No credit transactions found</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map(transaction => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    <Badge 
                      variant="secondary"
                      className={getTypeColor(transaction.type)}
                    >
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">
                    {transaction.description}
                  </TableCell>
                  <TableCell className={`text-right font-mono ${
                    transaction.type === 'usage' ? 'text-red-600' : 'text-green-600'
                  }`}>
                    {formatAmount(transaction.amount, transaction.type)}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {formatDate(transaction.timestamp)}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                    >
                      {transaction.status}
                    </Badge>
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
