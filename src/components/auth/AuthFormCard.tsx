
import React from 'react';
import { Link } from 'react-router-dom';
import { AuthFormHeader } from './AuthFormHeader';
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, FireIcon } from '@/components/icons/AuthIcons';
import { useAuthForm } from '@/hooks/useAuthForm';

export const AuthFormCard: React.FC = () => {
  const {
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
  } = useAuthForm();

  return (
    <div className="w-full max-w-[420px] mx-auto">
      <div className="bg-white/10 backdrop-blur-xl border border-white/30 rounded-2xl p-8 
                     shadow-2xl hover:ring-2 hover:ring-orange-400/70 transition-all duration-300">
        
        <AuthFormHeader mode={mode} onModeChange={setMode} />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-sm font-rajdhani font-medium text-gray-200">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) clearError();
                }}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl
                         text-white placeholder-gray-400 font-rajdhani
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent
                         transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-sm font-rajdhani font-medium text-gray-200">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) clearError();
                }}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl
                         text-white placeholder-gray-400 font-rajdhani
                         focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent
                         transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </button>
            </div>
          </div>

          {/* Confirm Password Input (Register Only) */}
          {mode === 'register' && (
            <div className="space-y-2">
              <label className="block text-sm font-rajdhani font-medium text-gray-200">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (error) clearError();
                  }}
                  placeholder="Confirm your password"
                  className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/20 rounded-xl
                           text-white placeholder-gray-400 font-rajdhani
                           focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent
                           transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowConfirmPassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                >
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-300 text-sm font-rajdhani">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-6 bg-gradient-to-r from-orange-500 to-red-600 
                     text-white font-orbitron font-medium rounded-xl
                     hover:from-orange-600 hover:to-red-700 hover:shadow-lg hover:shadow-orange-500/30
                     focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-transparent
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300 animate-pulse-glow
                     flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <FireIcon className="w-5 h-5" />
                <span>{mode === 'login' ? 'Login Now' : 'Create Account'}</span>
              </>
            )}
          </button>
        </form>

        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <Link 
            to="/" 
            className="text-gray-400 hover:text-white font-rajdhani text-sm transition-colors duration-300"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
