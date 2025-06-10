
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthForm } from '@/components/forms/AuthForm';

const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <div className="flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <AuthForm />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AuthPage;
