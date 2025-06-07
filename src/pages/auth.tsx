
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthForm } from '@/components/forms/AuthForm';

const Auth: React.FC = () => {
  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <AuthForm />
      </div>
      <Footer />
    </div>
  );
};

export default Auth;
