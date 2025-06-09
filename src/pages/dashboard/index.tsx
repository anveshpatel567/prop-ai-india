import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';
import { Navbar } from '../../components/layout/Navbar';
import { Footer } from '../../components/layout/Footer';
import { GlassCard } from '../../components/layout/GlassCard';
import { ButtonGradient } from '../../components/common/ButtonGradient';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { balance } = useWallet();

  if (!user) {
    return <div>Please login to access dashboard</div>;
  }

  const getDashboardContent = () => {
    switch (user.role) {
      case 'seeker':
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard>
              <h3 className="text-xl font-rajdhani font-semibold mb-4 text-[#2d0000]">Saved Properties</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-white/20 rounded">
                  <div>
                    <div className="font-dmsans font-medium text-[#2d0000]">3BHK in Bandra West</div>
                    <div className="text-sm font-dmsans text-[#8b4513]">₹2.5 Cr</div>
                  </div>
                  <div className="text-sm font-dmsans text-[#ff4500] font-bold">92% Match</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/20 rounded">
                  <div>
                    <div className="font-dmsans font-medium text-[#2d0000]">2BHK in Andheri</div>
                    <div className="text-sm font-dmsans text-[#8b4513]">₹1.8 Cr</div>
                  </div>
                  <div className="text-sm font-dmsans text-[#ff4500] font-bold">85% Match</div>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl font-rajdhani font-semibold mb-4 text-[#2d0000]">Recent Searches</h3>
              <div className="space-y-2">
                <div className="text-sm font-dmsans text-[#8b4513]">"3BHK near metro Mumbai"</div>
                <div className="text-sm font-dmsans text-[#8b4513]">"Budget 2cr Bandra"</div>
                <div className="text-sm font-dmsans text-[#8b4513]">"Ready to move Andheri"</div>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl font-rajdhani font-semibold mb-4 text-[#2d0000]">Property Alerts</h3>
              <div className="space-y-2">
                <div className="text-sm font-dmsans text-[#8b4513]">New matches: 3</div>
                <div className="text-sm font-dmsans text-[#8b4513]">Price drops: 1</div>
                <div className="text-sm font-dmsans text-[#8b4513]">Similar properties: 5</div>
              </div>
            </GlassCard>
          </div>
        );

      case 'agent':
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard>
              <h3 className="text-xl font-rajdhani font-semibold mb-4 text-[#2d0000]">Leads Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-dmsans text-[#8b4513]">New Leads</span>
                  <span className="font-rajdhani font-semibold text-[#ff4500]">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-dmsans text-[#8b4513]">Qualified</span>
                  <span className="font-rajdhani font-semibold text-[#ff4500]">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-dmsans text-[#8b4513]">Converted</span>
                  <span className="font-rajdhani font-semibold text-[#ff4500]">3</span>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl font-rajdhani font-semibold mb-4 text-[#2d0000]">AI Tools Usage</h3>
              <div className="space-y-2">
                <div className="text-sm font-dmsans">Lead Scoring: 25 times</div>
                <div className="text-sm font-dmsans">Follow-up Generator: 18 times</div>
                <div className="text-sm font-dmsans">Property Matcher: 12 times</div>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl font-rajdhani font-semibold mb-4 text-[#2d0000]">Performance</h3>
              <div className="space-y-2">
                <div className="text-sm font-dmsans">Conversion Rate: 15%</div>
                <div className="text-sm font-dmsans">Response Time: 2.5 hours</div>
                <div className="text-sm font-dmsans">Client Satisfaction: 4.8/5</div>
              </div>
            </GlassCard>
          </div>
        );

      default:
        return (
          <GlassCard>
            <h3 className="text-xl font-rajdhani font-semibold mb-4 text-[#2d0000]">Welcome to FreePropList</h3>
            <p className="font-dmsans text-[#8b4513]">
              Your dashboard is being prepared. Start exploring our AI-powered features!
            </p>
          </GlassCard>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#fff7f0]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="font-rajdhani text-3xl font-bold text-[#2d0000]">
                Welcome back, {user.full_name}!
              </h1>
              <p className="font-dmsans text-[#8b4513] capitalize">
                {user.role.replace('_', ' ')} Dashboard
              </p>
            </div>
            
            {balance && (
              <GlassCard className="text-center">
                <div className="text-2xl font-rajdhani font-bold bg-gradient-to-r from-[#ff6a00] to-[#ff0000] bg-clip-text text-transparent">{balance.balance}</div>
                <div className="text-sm font-dmsans text-[#8b4513]">AI Credits</div>
                <ButtonGradient variant="ai" className="mt-2">
                  Add Credits
                </ButtonGradient>
              </GlassCard>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass-card-light p-4 text-center">
              <div className="text-2xl font-rajdhani font-bold text-[#ff4500]">250</div>
              <div className="text-sm font-dmsans text-[#8b4513]">Total Searches</div>
            </div>
            <div className="glass-card-light p-4 text-center">
              <div className="text-2xl font-rajdhani font-bold text-[#ff4500]">15</div>
              <div className="text-sm font-dmsans text-[#8b4513]">Saved Properties</div>
            </div>
            <div className="glass-card-light p-4 text-center">
              <div className="text-2xl font-rajdhani font-bold text-[#ff4500]">8</div>
              <div className="text-sm font-dmsans text-[#8b4513]">AI Tools Used</div>
            </div>
            <div className="glass-card-light p-4 text-center">
              <div className="text-2xl font-rajdhani font-bold text-[#ff4500]">95%</div>
              <div className="text-sm font-dmsans text-[#8b4513]">Match Accuracy</div>
            </div>
          </div>
        </div>

        {/* Role-specific Content */}
        {getDashboardContent()}

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="font-rajdhani text-2xl font-bold text-[#2d0000] mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ButtonGradient variant="ai" className="p-6 h-auto flex flex-col">
              <div className="text-2xl mb-2">🔍</div>
              <span className="font-rajdhani">Smart Search</span>
            </ButtonGradient>
            <ButtonGradient variant="ai" className="p-6 h-auto flex flex-col">
              <div className="text-2xl mb-2">🏠</div>
              <span className="font-rajdhani">List Property</span>
            </ButtonGradient>
            <ButtonGradient variant="ai" className="p-6 h-auto flex flex-col">
              <div className="text-2xl mb-2">🤖</div>
              <span className="font-rajdhani">AI Tools</span>
            </ButtonGradient>
            <ButtonGradient variant="manual" className="p-6 h-auto flex flex-col">
              <div className="text-2xl mb-2">📊</div>
              <span className="font-rajdhani">Analytics</span>
            </ButtonGradient>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
