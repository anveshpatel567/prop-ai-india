
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isMounted: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Partial<UserProfile>) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  if (typeof window === 'undefined') return null;
  return <AuthProviderInner>{children}</AuthProviderInner>;
};

const AuthProviderInner: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('🔧 AuthContext: Initializing...');
    setIsMounted(true);
    
    const loadUser = async () => {
      try {
        const savedUser = localStorage.getItem('freeproplist_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
          console.log('🔧 AuthContext: User loaded from storage');
        }
      } catch (error) {
        setError('Failed to load user data');
        if (import.meta.env.DEV) {
          console.error('🚨 AuthContext: Error loading user:', error);
        }
      } finally {
        setIsLoading(false);
        console.log('🔧 AuthContext: Ready ✅');
      }
    };

    const timeoutId = setTimeout(loadUser, 50);
    return () => clearTimeout(timeoutId);
  }, []);

  const login = async (email: string, password: string) => {
    if (!isMounted) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const mockUser: UserProfile = {
        id: '1',
        email,
        full_name: 'John Doe',
        phone: '+91 9876543210',
        role: 'seeker',
        rera_number: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      setUser(mockUser);
      localStorage.setItem('freeproplist_user', JSON.stringify(mockUser));
      console.log('🔧 AuthContext: Login successful');
    } catch (error) {
      console.error('🚨 AuthContext: Login error:', error);
      setError('Login failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<UserProfile>) => {
    if (!isMounted) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const newUser: UserProfile = {
        id: Date.now().toString(),
        email: userData.email || '',
        full_name: userData.full_name || '',
        phone: userData.phone || '',
        role: userData.role || 'seeker',
        rera_number: userData.rera_number || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      setUser(newUser);
      localStorage.setItem('freeproplist_user', JSON.stringify(newUser));
      console.log('🔧 AuthContext: Registration successful');
    } catch (error) {
      console.error('🚨 AuthContext: Registration error:', error);
      setError('Registration failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (!isMounted) return;
    
    setUser(null);
    setError(null);
    localStorage.removeItem('freeproplist_user');
    console.log('🔧 AuthContext: Logout successful');
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user || !isMounted) return;
    
    setError(null);
    try {
      const updatedUser = { ...user, ...data, updated_at: new Date().toISOString() };
      setUser(updatedUser);
      localStorage.setItem('freeproplist_user', JSON.stringify(updatedUser));
      console.log('🔧 AuthContext: Profile updated');
    } catch (error) {
      console.error('🚨 AuthContext: Profile update error:', error);
      setError('Failed to update profile.');
      throw error;
    }
  };

  if (!isMounted) {
    return <div>Loading auth...</div>;
  }

  return (
    <AuthContext.Provider value={{
      user,
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
    throw new Error('useAuth must be used within AuthProvider. Make sure AuthProvider wraps your component tree.');
  }
  return context;
};
