
import { useAuth } from '@/context/AuthContext';

export const useSupabaseUser = () => {
  const { user } = useAuth();
  
  return {
    user,
    isAuthenticated: !!user
  };
};
