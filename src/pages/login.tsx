
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/layout/Navbar';
import { GlassCard } from '../components/layout/GlassCard';
import { InputField } from '../components/common/InputField';
import { ButtonPrimary } from '../components/common/ButtonPrimary';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="w-full max-w-md">
          <GlassCard>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your FreePropList account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
                placeholder="Enter your password"
                value={password}
                onChange={setPassword}
                required
              />

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <ButtonPrimary
                type="submit"
                loading={isLoading}
                className="w-full"
              >
                Sign In
              </ButtonPrimary>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-orange-500 hover:text-orange-600 font-medium">
                  Register here
                </Link>
              </p>
            </div>

            <div className="mt-8 text-center">
              <div className="glass-card bg-blue-50 border-blue-200 p-4">
                <h3 className="font-medium text-blue-800 mb-2">Demo Credentials</h3>
                <p className="text-sm text-blue-600">
                  Email: demo@freeproplist.com<br />
                  Password: demo123
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Login;
