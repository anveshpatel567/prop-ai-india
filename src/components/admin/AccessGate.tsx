
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { isAdmin } from '@/lib/adminCheck';
import { Shield, ShieldX } from 'lucide-react';

export function AdminAccessGate({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const userEmail = user?.email || null;
  const hasAdminAccess = isAdmin(userEmail);

  if (!user) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardContent className="p-6 text-center">
          <ShieldX className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">Authentication Required</h2>
          <p className="text-gray-600">Please log in to access this area.</p>
        </CardContent>
      </Card>
    );
  }

  if (!hasAdminAccess) {
    return (
      <Card className="max-w-md mx-auto mt-8">
        <CardContent className="p-6 text-center">
          <ShieldX className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-lg font-semibold mb-2">Access Denied</h2>
          <p className="text-gray-600">Admin privileges required to access this area.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="mb-4 flex items-center gap-2 text-green-600">
        <Shield className="h-4 w-4" />
        <span className="text-sm">Admin Access Granted</span>
      </div>
      {children}
    </>
  );
}
