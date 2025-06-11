
import React, { useState } from 'react';
import { useWallet } from '@/context/WalletContext';
import { useIsAiToolEnabled } from '@/hooks/useIsAiToolEnabled';
import { useToolCreditRequirements } from '@/hooks/useToolCreditRequirements';
import { LockedToolCard } from '@/components/common/LockedToolCard';
import { InsufficientCreditsModal } from '@/components/common/InsufficientCreditsModal';
import { useToast } from '@/hooks/use-toast';

interface CreditGateConfig {
  toolName: string;
  toolTitle: string;
  fallbackComponent?: React.ComponentType<any>;
  showModal?: boolean;
}

export function withCreditGate<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  config: CreditGateConfig
) {
  return function CreditGatedComponent(props: P) {
    const { toolName, toolTitle, fallbackComponent: FallbackComponent, showModal = true } = config;
    const [modalOpen, setModalOpen] = useState(false);
    
    const { balance } = useWallet();
    const isToolEnabled = useIsAiToolEnabled(toolName);
    const { getRequiredCredits, getToolRequirement } = useToolCreditRequirements();
    const { toast } = useToast();
    
    const creditsRequired = getRequiredCredits(toolName);
    const toolRequirement = getToolRequirement(toolName);
    const currentCredits = balance?.balance || 0;
    
    // Check if tool is enabled by admin
    if (!isToolEnabled) {
      if (FallbackComponent) {
        return <FallbackComponent {...props} />;
      }
      
      return (
        <LockedToolCard
          toolName={toolName}
          title={toolTitle}
          description="This AI feature is currently disabled by the administrator."
          creditsRequired={0}
        />
      );
    }
    
    // Check if user has enough credits
    if (currentCredits < creditsRequired) {
      const handleAttempt = () => {
        if (showModal) {
          setModalOpen(true);
        } else {
          toast({
            title: "Insufficient Credits",
            description: `You need ${creditsRequired} credits to use ${toolTitle}`,
            variant: "destructive"
          });
        }
      };
      
      if (FallbackComponent) {
        return <FallbackComponent {...props} onAttempt={handleAttempt} />;
      }
      
      const description = toolRequirement?.description || `Requires ${creditsRequired} credits`;
      
      return (
        <>
          <div onClick={handleAttempt} className="cursor-pointer">
            <LockedToolCard
              toolName={toolName}
              title={toolTitle}
              description={description}
              creditsRequired={creditsRequired}
            />
          </div>
          
          {showModal && (
            <InsufficientCreditsModal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              toolName={toolName}
              toolTitle={toolTitle}
              creditsRequired={creditsRequired}
            />
          )}
        </>
      );
    }
    
    // User has enough credits and tool is enabled
    return <WrappedComponent {...props} />;
  };
}
