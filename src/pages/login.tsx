
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { GlassCard } from '../components/layout/GlassCard';
import { InputField } from '../components/common/InputField';
import { ButtonPrimary } from '../components/common/ButtonPrimary';
import { UserProfile } from '../types';

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserProfile['role']>('seeker');
  const [reraNumber, setReraNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setIsLoading(false);
          return;
        }
        await register({
          full_name: fullName,
          email,
          phone,
          role,
          rera_number: reraNumber || null
        });
      }
      navigate('/dashboard');
    } catch (err) {
      setError(isLogin ? 'Invalid credentials. Please try again.' : 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
        <div className="w-full max-w-2xl">
          <GlassCard>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {isLogin ? 'Welcome Back' : 'Join FreePropList'}
              </h1>
              <p className="text-gray-600">
                {isLogin ? 'Sign in to your FreePropList account' : 'Create your account and start your property journey'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <div className="grid md:grid-cols-2 gap-6">
                  <InputField
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={setFullName}
                    required
                  />
                  <InputField
                    label="Phone Number"
                    type="tel"
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={setPhone}
                    required
                  />
                </div>
              )}

              <InputField
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={setEmail}
                required
              />

              <InputField
                label="Password"
                type="password"
                placeholder={isLogin ? "Enter your password" : "Create a password"}
                value={password}
                onChange={setPassword}
                required
              />

              {!isLogin && (
                <>
                  <InputField
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={setConfirmPassword}
                    required
                  />

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      I am a <span className="text-red-500 ml-1">*</span>
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as UserProfile['role'])}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg 
                        focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="seeker">Property Seeker</option>
                      <option value="owner">Property Owner</option>
                      <option value="agent">Real Estate Agent</option>
                      <option value="rera_agent">RERA Agent</option>
                      <option value="builder">Builder/Developer</option>
                    </select>
                  </div>

                  {(role === 'rera_agent' || role === 'builder') && (
                    <InputField
                      label="RERA Number"
                      placeholder="Enter your RERA registration number"
                      value={reraNumber}
                      onChange={setReraNumber}
                      required
                    />
                  )}

                  <div className="flex items-center space-x-2">
                    <input type="checkbox" required className="rounded" />
                    <span className="text-sm text-gray-600">
                      I agree to the Terms of Service and Privacy Policy
                    </span>
                  </div>
                </>
              )}

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <ButtonPrimary
                type="submit"
                loading={isLoading}
                className="w-full"
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </ButtonPrimary>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-orange-500 hover:text-orange-600 font-medium"
                >
                  {isLogin ? 'Register here' : 'Sign in here'}
                </button>
              </p>
            </div>

            {isLogin && (
              <div className="mt-8 text-center">
                <div className="glass-card bg-blue-50 border-blue-200 p-4">
                  <h3 className="font-medium text-blue-800 mb-2">Demo Credentials</h3>
                  <p className="text-sm text-blue-600">
                    Email: demo@freeproplist.com<br />
                    Password: demo123
                  </p>
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
