
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/layout/Navbar';
import { GlassCard } from '../components/layout/GlassCard';
import { InputField } from '../components/common/InputField';
import { ButtonPrimary } from '../components/common/ButtonPrimary';
import { UserProfile } from '../types';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    role: 'seeker' as UserProfile['role'],
    rera_number: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      await register({
        full_name: formData.full_name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        rera_number: formData.rera_number || null
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
        <div className="w-full max-w-2xl">
          <GlassCard>
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Join FreePropList</h1>
              <p className="text-gray-600">Create your account and start your property journey</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  label="Full Name"
                  placeholder="Enter your full name"
                  value={formData.full_name}
                  onChange={(value) => updateFormData('full_name', value)}
                  required
                />

                <InputField
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(value) => updateFormData('email', value)}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  label="Phone Number"
                  type="tel"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={(value) => updateFormData('phone', value)}
                  required
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    I am a <span className="text-red-500 ml-1">*</span>
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => updateFormData('role', e.target.value)}
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
              </div>

              {(formData.role === 'rera_agent' || formData.role === 'builder') && (
                <InputField
                  label="RERA Number"
                  placeholder="Enter your RERA registration number"
                  value={formData.rera_number}
                  onChange={(value) => updateFormData('rera_number', value)}
                  required
                />
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <InputField
                  label="Password"
                  type="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(value) => updateFormData('password', value)}
                  required
                />

                <InputField
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(value) => updateFormData('confirmPassword', value)}
                  required
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}

              <div className="flex items-center space-x-2">
                <input type="checkbox" required className="rounded" />
                <span className="text-sm text-gray-600">
                  I agree to the Terms of Service and Privacy Policy
                </span>
              </div>

              <ButtonPrimary
                type="submit"
                loading={isLoading}
                className="w-full"
              >
                Create Account
              </ButtonPrimary>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-orange-500 hover:text-orange-600 font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Register;
