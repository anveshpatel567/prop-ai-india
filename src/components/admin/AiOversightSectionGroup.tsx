
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface AiOversightSectionGroupProps {
  title: string;
  icon: LucideIcon;
  description: string;
  children: React.ReactNode;
}

export function AiOversightSectionGroup({ 
  title, 
  icon: Icon, 
  description, 
  children 
}: AiOversightSectionGroupProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Icon className="h-6 w-6 text-primary" />
        <div>
          <h2 className="text-xl font-semibold">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  );
}
