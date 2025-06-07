
import React from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { GlassCard } from '../../components/layout/GlassCard';
import { useAiTool } from '../../context/AiToolContext';

const AiTools: React.FC = () => {
  const { toolConfigs } = useAiTool();

  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">AI-Powered Tools</h1>
          <p className="text-gray-600">Enhance your real estate experience with our advanced AI tools</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolConfigs.map((tool, index) => (
            <GlassCard key={index}>
              <div className="text-center space-y-4">
                <div className="text-4xl">🤖</div>
                <h3 className="text-xl font-semibold capitalize">
                  {tool.tool_name.replace('_', ' ')}
                </h3>
                <p className="text-gray-600 text-sm">{tool.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-orange-600">
                    {tool.credit_cost} credits
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    tool.is_enabled 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {tool.is_enabled ? 'Available' : 'Disabled'}
                  </span>
                </div>
                <button 
                  className="w-full fire-gradient text-white py-2 rounded-lg disabled:opacity-50"
                  disabled={!tool.is_enabled}
                >
                  Use Tool
                </button>
              </div>
            </GlassCard>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">How AI Tools Work</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <GlassCard className="text-center">
              <div className="text-3xl mb-4">1️⃣</div>
              <h3 className="font-semibold mb-2">Select Tool</h3>
              <p className="text-sm text-gray-600">Choose the AI tool that fits your needs</p>
            </GlassCard>
            <GlassCard className="text-center">
              <div className="text-3xl mb-4">2️⃣</div>
              <h3 className="font-semibold mb-2">Provide Input</h3>
              <p className="text-sm text-gray-600">Upload data or enter information</p>
            </GlassCard>
            <GlassCard className="text-center">
              <div className="text-3xl mb-4">3️⃣</div>
              <h3 className="font-semibold mb-2">Get Results</h3>
              <p className="text-sm text-gray-600">Receive AI-generated insights and recommendations</p>
            </GlassCard>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AiTools;
