
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { AuthToggleWindow } from '@/components/auth/AuthToggleWindow';

const Auth: React.FC = () => {
  return (
    <div className="min-h-screen bg-global-bg">
      <Navbar />
      <section className="section-hero py-16">
        <AuthToggleWindow />
      </section>
      <Footer />
    </div>
  );
};

export default Auth;
