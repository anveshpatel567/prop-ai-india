
import React from 'react';
import { AuthMode } from '@/hooks/useAuthForm';

interface AuthFormHeaderProps {
  mode: AuthMode;
  onModeChange: (mode: AuthMode) => void;
}

export const AuthFormHeader: React.FC<AuthFormHeaderProps> = ({ mode, onModeChange }) => {
  return (
    <div className="relative mb-8">
      <div className="flex space-x-1 bg-white/10 rounded-xl p-1">
        <button
          type="button"
          onClick={() => onModeChange('login')}
          className={`flex-1 py-3 px-6 rounded-lg font-orbitron font-medium text-sm transition-all duration-300 ${
            mode === 'login'
              ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => onModeChange('register')}
          className={`flex-1 py-3 px-6 rounded-lg font-orbitron font-medium text-sm transition-all duration-300 ${
            mode === 'register'
              ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg'
              : 'text-gray-300 hover:text-white'
          }`}
        >
          Register
        </button>
      </div>
      
      <div className="mt-6 text-center">
        <h2 className="text-2xl font-orbitron font-bold text-white">
          {mode === 'login' ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p className="text-gray-300 mt-2 font-rajdhani">
          {mode === 'login' 
            ? 'Sign in to your FreePropList account' 
            : 'Join FreePropList and find your perfect property'
          }
        </p>
      </div>
    </div>
  );
};
