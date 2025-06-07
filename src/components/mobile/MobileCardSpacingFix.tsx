
import React from 'react';
import { cn } from '@/lib/utils';

interface MobileCardSpacingProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileCardSpacing: React.FC<MobileCardSpacingProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn(
      "space-y-2 p-2 md:space-y-4 md:p-4",
      className
    )}>
      {children}
    </div>
  );
};

interface MobileCardGridProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileCardGrid: React.FC<MobileCardGridProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn(
      "grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-3 md:gap-4",
      className
    )}>
      {children}
    </div>
  );
};

interface MobileResponsiveCardProps {
  children: React.ReactNode;
  className?: string;
}

export const MobileResponsiveCard: React.FC<MobileResponsiveCardProps> = ({
  children,
  className
}) => {
  return (
    <div className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      "p-3 md:p-6",
      className
    )}>
      {children}
    </div>
  );
};
