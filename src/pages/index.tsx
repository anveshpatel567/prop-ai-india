
import React from 'react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/home/HeroSection';
import { AiTeaserCards } from '../components/home/AiTeaserCards';
import { RoleSelectorCards } from '../components/home/RoleSelectorCards';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <AiTeaserCards />
      <RoleSelectorCards />
      <Footer />
    </div>
  );
};

export default Index;
