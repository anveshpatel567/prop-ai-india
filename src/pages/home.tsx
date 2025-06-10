
import React from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/home/HeroSection';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <HeroSection />
      <Footer />
    </div>
  );
};

export default Home;
