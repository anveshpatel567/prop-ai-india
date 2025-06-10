
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
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Iframe-safe state initialization
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Ensure we only run client-side logic after mount
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    setIsMounted(true);
    
    // Simulate loading user data only after mount
    const loadUser = async () => {
      try {
        // Check for existing session only in browser
        const savedUser = localStorage.getItem('freeproplist_user');
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.error('Error loading user:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    // Small delay to ensure DOM is ready in iframe environments
    const timeoutId = setTimeout(loadUser, 50);
    return () => clearTimeout(timeoutId);
  }, []);

  const login = async (email: string, password: string) => {
    if (!isMounted || typeof window === 'undefined') return;
    
    setIsLoading(true);
    try {
      // Simulate API call
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
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<UserProfile>) => {
    if (!isMounted || typeof window === 'undefined') return;
    
    setIsLoading(true);
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
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (!isMounted || typeof window === 'undefined') return;
    
    setUser(null);
    localStorage.removeItem('freeproplist_user');
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user || !isMounted || typeof window === 'undefined') return;
    
    const updatedUser = { ...user, ...data, updated_at: new Date().toISOString() };
    setUser(updatedUser);
    localStorage.setItem('freeproplist_user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{
      user,
      isLoading,
      isMounted,
      login,
      register,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
