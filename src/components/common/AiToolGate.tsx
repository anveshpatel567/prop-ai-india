
import React from 'react';
import { withCreditGate } from '@/hoc/withCreditGate';

interface AiToolGateProps {
  toolName: string;
  toolTitle: string;
  children: React.ReactNode;
  fallbackComponent?: React.ComponentType<any>;
  showModal?: boolean;
}

const AiToolGateComponent: React.FC<AiToolGateProps> = ({ children }) => {
  return <>{children}</>;
};

export const AiToolGate: React.FC<AiToolGateProps> = ({
  toolName,
  toolTitle,
  children,
  fallbackComponent,
  showModal = true
}) => {
  const GatedComponent = withCreditGate(AiToolGateComponent, {
    toolName,
    toolTitle,
    fallbackComponent,
    showModal
  });

  return (
    <GatedComponent toolName={toolName} toolTitle={toolTitle}>
      {children}
    </GatedComponent>
  );
};
