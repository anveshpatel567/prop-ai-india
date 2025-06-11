
import React, { useState, useEffect, useContext, createContext } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { email: string; full_name: string }) => Promise<void>;
  logout: () => void;
  updateProfile: (data: any) => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  console.log('=== AuthProvider Debug ===');
  console.log('AuthProvider mounting...');

  // Enhanced defensive check with error boundary approach
  try {
    // Test if hooks are actually callable
    const testState = useState(null);
    console.log('✅ useState test successful');
  } catch (error) {
    console.error('❌ useState test failed:', error);
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center p-8">
          <h1 className="text-xl font-bold text-red-600 mb-4">React Hooks Error</h1>
          <p className="text-gray-700 mb-4">useState is not available in AuthProvider</p>
          <pre className="bg-white p-4 rounded mb-4 text-left text-sm text-gray-800">{String(error)}</pre>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }

  console.log('✅ React hooks verified in AuthProvider - proceeding with state setup');

  // Use hooks normally now that we've verified they work
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('AuthProvider useEffect running...');
    
    // Get initial session first
    const getSession = async () => {
      try {
        console.log('Getting initial session...');
        const { data: { session } } = await supabase.auth.getSession();
        console.log('Initial session result:', session?.user?.email || 'No session');
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      } catch (error) {
        console.error('Error getting initial session:', error);
        setIsLoading(false);
      }
    };

    getSession();

    // Set up auth state listener
    console.log('Setting up auth state listener...');
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state change:', event, session?.user?.email || 'No session');
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    return () => {
      console.log('Cleaning up auth subscription...');
      subscription.unsubscribe();
    };
  }, []);

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
        password: 'temporary_password_123',
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

  console.log('AuthProvider rendering with user:', user?.email || 'No user');

  return (
    <AuthContext.Provider value={{
      user,
      session,
      isLoading,
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

export default AuthProvider;
