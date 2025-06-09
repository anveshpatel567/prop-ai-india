
import React from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { GlassCard } from '../../components/layout/GlassCard';
import { ImageEnhancerPanel } from '../../components/ai/ImageEnhancerPanel';
import { AiCreditTooltip } from '../../components/ai/AiCreditTooltip';
import { useCreditStatus } from '../../hooks/useCreditStatus';
import { GoBackHomeButton } from '../../components/ui/GoBackHomeButton';
import { Button } from '@/components/ui/button';
import { Zap, Video, Target, FileText, Shield, GitBranch, Download, Users } from 'lucide-react';

const AiTools: React.FC = () => {
  const { userCredits } = useCreditStatus();

  const aiTools = [
    {
      name: 'AI Image Enhancer',
      description: 'Enhance property images with AI-powered upscaling and cleaning',
      icon: <Zap className="h-8 w-8" />,
      credits: 150,
      component: <ImageEnhancerPanel />
    },
    {
      name: 'AI Video Generator',
      description: 'Generate promotional videos from property listings',
      icon: <Video className="h-8 w-8" />,
      credits: 100,
      available: true
    },
    {
      name: 'Smart Pricing',
      description: 'AI-powered property pricing recommendations',
      icon: <Target className="h-8 w-8" />,
      credits: 30,
      available: true
    },
    {
      name: 'Locality Report',
      description: 'Generate detailed locality market insights',
      icon: <FileText className="h-8 w-8" />,
      credits: 50,
      available: true
    },
    {
      name: 'Fraud Detection',
      description: 'Automated listing fraud detection',
      icon: <Shield className="h-8 w-8" />,
      credits: 25,
      available: true
    },
    {
      name: 'Title Chain Visualizer',
      description: 'Generate property title chain visualization',
      icon: <GitBranch className="h-8 w-8" />,
      credits: 40,
      available: true
    },
    {
      name: 'Resume Builder',
      description: 'AI-powered agent resume creation',
      icon: <Users className="h-8 w-8" />,
      credits: 35,
      available: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">AI-Powered Tools</h1>
            <p className="text-gray-600">Enhance your real estate experience with our advanced AI tools</p>
            <div className="mt-4 inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md">
              <Zap className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">Your Credits: {userCredits}</span>
            </div>
          </div>
          <GoBackHomeButton />
        </div>

        {/* Featured Tool - Image Enhancer */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Featured Tool</h2>
          <ImageEnhancerPanel />
        </div>

        {/* All AI Tools Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">All AI Tools</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiTools.map((tool, index) => (
              <AiCreditTooltip
                key={index}
                credits_required={tool.credits}
                tool_name={tool.name}
                user_credits={userCredits}
              >
                <GlassCard className="h-full hover:shadow-xl hover:shadow-orange-200/50 transition-all duration-300 cursor-pointer group">
                  <div className="p-6 text-center space-y-4 h-full flex flex-col">
                    <div className="text-orange-500 group-hover:scale-110 transition-transform duration-300 flex justify-center">
                      {tool.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {tool.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">{tool.description}</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-orange-600">
                          {tool.credits} credits
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          tool.available !== false
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {tool.available !== false ? 'Available' : 'Coming Soon'}
                        </span>
                      </div>
                      <Button 
                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white transition-all duration-300"
                        disabled={tool.available === false || userCredits < tool.credits}
                      >
                        {tool.available === false ? 'Coming Soon' : 'Use Tool'}
                      </Button>
                    </div>
                  </div>
                </GlassCard>
              </AiCreditTooltip>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">How AI Tools Work</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <GlassCard className="text-center">
              <div className="p-6">
                <div className="text-3xl mb-4">1️⃣</div>
                <h3 className="font-semibold mb-2 text-gray-800">Select Tool</h3>
                <p className="text-sm text-gray-600">Choose the AI tool that fits your needs and check credit requirements</p>
              </div>
            </GlassCard>
            <GlassCard className="text-center">
              <div className="p-6">
                <div className="text-3xl mb-4">2️⃣</div>
                <h3 className="font-semibold mb-2 text-gray-800">Provide Input</h3>
                <p className="text-sm text-gray-600">Upload data or enter information required by the AI tool</p>
              </div>
            </GlassCard>
            <GlassCard className="text-center">
              <div className="p-6">
                <div className="text-3xl mb-4">3️⃣</div>
                <h3 className="font-semibold mb-2 text-gray-800">Get Results</h3>
                <p className="text-sm text-gray-600">Receive AI-generated insights, enhancements, and recommendations</p>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AiTools;
