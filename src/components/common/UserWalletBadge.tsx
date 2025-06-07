
import React from 'react';
import { Zap } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';

interface UserWalletBadgeProps {
  showIcon?: boolean;
  className?: string;
}

export const UserWalletBadge: React.FC<UserWalletBadgeProps> = ({
  showIcon = true,
  className = ''
}) => {
  const { balance } = useWallet();

  if (!balance) {
    return null;
  }

  const getColorClass = () => {
    if (balance.balance >= 100) return 'bg-green-50 text-green-700 border-green-200';
    if (balance.balance >= 50) return 'bg-yellow-50 text-yellow-700 border-yellow-200';
    return 'bg-red-50 text-red-700 border-red-200';
  };

  return (
    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full border text-sm font-medium ${getColorClass()} ${className}`}>
      {showIcon && <Zap className="h-3 w-3" />}
      {balance.balance} Credits
    </div>
  );
};
