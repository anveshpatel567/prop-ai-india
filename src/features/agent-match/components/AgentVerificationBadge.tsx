
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Shield, Star } from 'lucide-react';

export function AgentVerificationBadge({ 
  verificationType,
  level = "basic" 
}: { 
  verificationType: string;
  level?: string;
}) {
  const getVerificationConfig = (type: string, level: string) => {
    const configs = {
      'rera': {
        icon: Shield,
        label: 'RERA Verified',
        color: 'bg-green-100 text-green-800 border-green-300'
      },
      'phone': {
        icon: CheckCircle,
        label: 'Phone Verified',
        color: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      'email': {
        icon: CheckCircle,
        label: 'Email Verified',
        color: 'bg-blue-100 text-blue-800 border-blue-300'
      },
      'premium': {
        icon: Star,
        label: level === 'gold' ? 'Gold Agent' : 'Premium Agent',
        color: level === 'gold' 
          ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
          : 'bg-purple-100 text-purple-800 border-purple-300'
      },
      'identity': {
        icon: CheckCircle,
        label: 'ID Verified',
        color: 'bg-green-100 text-green-800 border-green-300'
      }
    };

    return configs[type as keyof typeof configs] || {
      icon: CheckCircle,
      label: 'Verified',
      color: 'bg-gray-100 text-gray-800 border-gray-300'
    };
  };

  const config = getVerificationConfig(verificationType, level);
  const IconComponent = config.icon;

  return (
    <Badge 
      variant="outline" 
      className={`flex items-center gap-1 ${config.color}`}
    >
      <IconComponent className="h-3 w-3" />
      <span className="text-xs font-medium">{config.label}</span>
    </Badge>
  );
}
