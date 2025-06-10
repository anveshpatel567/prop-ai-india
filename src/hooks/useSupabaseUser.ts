
import { useAuth } from '@/context/AuthContext';

export const useSupabaseUser = () => {
  const { user, isLoading, login, register, logout, updateProfile } = useAuth();
  
  return {
    user,
    isAuthenticated: !!user,
    loading: isLoading,
    signIn: login,
    signUp: async (email: string, password: string, fullName: string) => {
      try {
        await register({ email, full_name: fullName });
        return true;
      } catch (error) {
        return false;
      }
    },
    signOut: async () => {
      try {
        logout();
        return true;
      } catch (error) {
        return false;
      }
    },
    updateProfile: async (data: any) => {
      try {
        await updateProfile(data);
        return true;
      } catch (error) {
        return false;
      }
    }
  };
};
