
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isMounted: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; full_name: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: any) => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    // Set up auth state listener AFTER mounting
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [isMounted]);

  const login = async (email: string, password: string): Promise<void> => {
    try {
      setError(null);
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: { email: string; full_name: string }): Promise<void> => {
    try {
      setError(null);
      setIsLoading(true);
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: 'temporary_password_123', // This should be provided by user
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: data.full_name,
          }
        }
      });
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const updateProfile = async (data: any): Promise<void> => {
    try {
      setError(null);
      const { error } = await supabase.auth.updateUser(data);
      if (error) throw error;
    } catch (error: any) {
      setError(error.message);
      throw error;
    }
  };

  if (!isMounted) return null;

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isLoading,
      isMounted,
      login,
      register,
      logout,
      updateProfile,
      error
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
