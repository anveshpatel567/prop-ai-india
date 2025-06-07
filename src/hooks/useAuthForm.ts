
import { useState } from 'react';
import { useSupabaseUser } from './useSupabaseUser';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';

export type AuthMode = 'login' | 'register';

export interface UseAuthFormReturn {
  mode: AuthMode;
  loading: boolean;
  error: string | null;
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  setMode: (mode: AuthMode) => void;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  setConfirmPassword: (password: string) => void;
  toggleShowPassword: () => void;
  toggleShowConfirmPassword: () => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  clearError: () => void;
}

export const useAuthForm = (): UseAuthFormReturn => {
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { signIn, signUp, loading } = useSupabaseUser();
  const navigate = useNavigate();

  const toggleShowPassword = () => setShowPassword(!showPassword);
  const toggleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const clearError = () => setError(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    if (mode === 'register') {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
    }

    try {
      let success = false;
      if (mode === 'login') {
        success = await signIn(email, password);
      } else {
        success = await signUp(email, password, email.split('@')[0]);
      }

      if (success) {
        toast({
          title: mode === 'login' ? 'Welcome back!' : 'Account created!',
          description: mode === 'login' ? 'You have been signed in successfully.' : 'Your account has been created successfully.',
        });
        navigate('/profile');
      } else {
        setError(mode === 'login' ? 'Invalid email or password' : 'Failed to create account');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    }
  };

  return {
    mode,
    loading,
    error,
    email,
    password,
    confirmPassword,
    showPassword,
    showConfirmPassword,
    setMode,
    setEmail,
    setPassword,
    setConfirmPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
    handleSubmit,
    clearError,
  };
};
