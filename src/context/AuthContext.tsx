
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

// Create context with null default - this is safe because we'll check for it
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Early return guard - don't render anything until we're in a proper browser environment
  if (typeof window === 'undefined') {
    return null;
  }

  return <AuthProviderInner>{children}</AuthProviderInner>;
};

// Separate inner component to ensure hooks are only called in safe environment
const AuthProviderInner: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Only execute after component mounts in browser
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
        if (import.meta.env.DEV) {
          console.error('🚨 AuthContext: Error loading user:', error);
        }
      } finally {
        setIsLoading(false);
        console.log('🔧 AuthContext: Ready ✅');
      }
    };

    // Small delay to ensure iframe environment is stable
    const timeoutId = setTimeout(loadUser, 100);
    return () => clearTimeout(timeoutId);
  }, []);

  const login = async (email: string, password: string) => {
    if (!isMounted) return;
    
    setIsLoading(true);
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
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<UserProfile>) => {
    if (!isMounted) return;
    
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
      console.log('🔧 AuthContext: Registration successful');
    } catch (error) {
      console.error('🚨 AuthContext: Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    if (!isMounted) return;
    
    setUser(null);
    localStorage.removeItem('freeproplist_user');
    console.log('🔧 AuthContext: Logout successful');
  };

  const updateProfile = async (data: Partial<UserProfile>) => {
    if (!user || !isMounted) return;
    
    const updatedUser = { ...user, ...data, updated_at: new Date().toISOString() };
    setUser(updatedUser);
    localStorage.setItem('freeproplist_user', JSON.stringify(updatedUser));
    console.log('🔧 AuthContext: Profile updated');
  };

  // Don't render children until mounted and ready
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
      updateProfile
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
