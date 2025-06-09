
import { useWallet } from '@/context/WalletContext';

export const useCreditStatus = () => {
  const { balance } = useWallet();
  
  const userCredits = balance?.balance || 0;
  
  const canAfford = (toolCost: number): boolean => {
    return userCredits >= toolCost;
  };
  
  const getRemainingCredits = (): number => {
    return userCredits;
  };
  
  const getCreditStatus = (toolCost: number) => {
    return {
      canAfford: canAfford(toolCost),
      userCredits,
      difference: userCredits - toolCost
    };
  };
  
  return {
    userCredits,
    canAfford,
    getRemainingCredits,
    getCreditStatus
  };
};
