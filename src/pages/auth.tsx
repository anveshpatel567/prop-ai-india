
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthToggleWindow } from '@/components/auth/AuthToggleWindow';

const Auth: React.FC = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <AuthToggleWindow />
      <Footer />
    </div>
  );
};

export default Auth;
