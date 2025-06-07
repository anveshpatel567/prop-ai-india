import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/types/supabase-db';
import type { UserRole } from '@/types/global';

type User = Database['public']['Tables']['users']['Row'];

export const useSupabaseUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (authUser) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', authUser.id)
          .single();

        if (userError) {
          console.error('Error fetching user:', userError);
          setError(userError.message);
        } else {
          // Safely cast the role to UserRole
          const userWithRole = {
            ...userData,
            role: (userData.role || 'seeker') as UserRole
          };
          setUser(userWithRole);
        }
      }
    } catch (err) {
      console.error('Error in fetchUser:', err);
      setError('Failed to fetch user');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        setError(error.message);
        return false;
      }

      await fetchUser();
      return true;
    } catch (err) {
      console.error('Sign in error:', err);
      setError('Failed to sign in');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (error) {
        setError(error.message);
        return false;
      }

      // Create user profile
      if (data.user) {
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email: data.user.email!,
            full_name: fullName,
            role: 'seeker' as UserRole
          });

        if (profileError) {
          console.error('Profile creation error:', profileError);
        }
      }

      return true;
    } catch (err) {
      console.error('Sign up error:', err);
      setError('Failed to sign up');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      setUser(null);
    }
    return !error;
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return false;

    try {
      const { error } = await supabase
        .from('users')
        .update(updates)
        .eq('id', user.id);

      if (error) {
        setError(error.message);
        return false;
      }

      setUser({ ...user, ...updates });
      return true;
    } catch (err) {
      console.error('Update profile error:', err);
      setError('Failed to update profile');
      return false;
    }
  };

  return {
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
    updateProfile,
    fetchUser
  };
};
