
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent } from '@/components/ui/card';
import { Shield } from 'lucide-react';

interface AdminRoleGateProps {
  children: React.ReactNode;
}

export function AdminRoleGate({ children }: AdminRoleGateProps) {
  const { user } = useAuth();

  if (!user) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardContent className="p-6 text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-lg font-semibold mb-2">Authentication Required</h2>
          <p className="text-muted-foreground">Please log in to access this area.</p>
        </CardContent>
      </Card>
    );
  }

  // Note: In a real application, you would check user.role === 'admin'
  // For now, we'll allow access since we don't have role enforcement
  return <>{children}</>;
}
