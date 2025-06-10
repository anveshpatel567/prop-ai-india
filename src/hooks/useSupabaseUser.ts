
import { useAuth } from '@/context/AuthContext';

export const useSupabaseUser = () => {
  const { user, isLoading, login, register, logout, updateProfile, error } = useAuth();
  
  return {
    user,
    isAuthenticated: !!user,
    loading: isLoading,
    error,
    signIn: async (email: string, password: string): Promise<boolean> => {
      try {
        await login(email, password);
        return true;
      } catch (error) {
        return false;
      }
    },
    signUp: async (email: string, password: string, fullName: string): Promise<boolean> => {
      try {
        await register({ email, full_name: fullName });
        return true;
      } catch (error) {
        return false;
      }
    },
    signOut: async (): Promise<boolean> => {
      try {
        logout();
        return true;
      } catch (error) {
        return false;
      }
    },
    updateProfile: async (data: any): Promise<boolean> => {
      try {
        await updateProfile(data);
        return true;
      } catch (error) {
        return false;
      }
    }
  };
};
