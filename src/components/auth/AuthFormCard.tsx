
import React from 'react';
import { Link } from 'react-router-dom';
import { AuthFormHeader } from './AuthFormHeader';
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
                     shadow-[0_0_40px_rgba(255,102,0,0.6)] hover:ring-2 hover:ring-[#ff4500]/70 transition-all duration-300">
        
        <AuthFormHeader mode={mode} onModeChange={setMode} />

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-sm font-rajdhani font-medium text-white">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="h-5 w-5 text-[#ff4500]">@</div>
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
                         text-white placeholder-[#8b4513] font-rajdhani
                         focus:outline-none focus:ring-2 focus:ring-[#ff4500] focus:border-transparent
                         transition-all duration-300"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <label className="block text-sm font-rajdhani font-medium text-white">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <div className="h-5 w-5 text-[#ff4500]">🔒</div>
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
                         text-white placeholder-[#8b4513] font-rajdhani
                         focus:outline-none focus:ring-2 focus:ring-[#ff4500] focus:border-transparent
                         transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#8b4513] hover:text-white"
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
          </div>

          {/* Confirm Password Input (Register Only) */}
          {mode === 'register' && (
            <div className="space-y-2">
              <label className="block text-sm font-rajdhani font-medium text-white">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <div className="h-5 w-5 text-[#ff4500]">🔒</div>
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
                           text-white placeholder-[#8b4513] font-rajdhani
                           focus:outline-none focus:ring-2 focus:ring-[#ff4500] focus:border-transparent
                           transition-all duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowConfirmPassword}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#8b4513] hover:text-white"
                >
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
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
            className="w-full py-3 px-6 bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] 
                     text-white font-orbitron font-medium rounded-xl
                     hover:from-[#ff3c00] hover:to-[#ff6a00] hover:shadow-[0_0_40px_rgba(255,102,0,0.6)]
                     focus:outline-none focus:ring-2 focus:ring-[#ff4500] focus:ring-offset-2 focus:ring-offset-transparent
                     disabled:opacity-50 disabled:cursor-not-allowed
                     transition-all duration-300 pulse-glow
                     flex items-center justify-center space-x-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <div className="w-5 h-5 text-white">🔥</div>
                <span>{mode === 'login' ? 'Login Now' : 'Create Account'}</span>
              </>
            )}
          </button>
        </form>

        {/* Back to Home Link */}
        <div className="mt-6 text-center">
          <Link 
            to="/" 
            className="text-[#8b4513] hover:text-white font-rajdhani text-sm transition-colors duration-300"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
