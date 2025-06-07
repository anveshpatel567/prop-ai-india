
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
              <h3 className="text-xl font-semibold mb-4">Saved Properties</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium">3BHK in Bandra West</div>
                    <div className="text-sm text-gray-600">₹2.5 Cr</div>
                  </div>
                  <div className="text-sm text-green-600">92% Match</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                  <div>
                    <div className="font-medium">2BHK in Andheri</div>
                    <div className="text-sm text-gray-600">₹1.8 Cr</div>
                  </div>
                  <div className="text-sm text-green-600">85% Match</div>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl font-semibold mb-4">Recent Searches</h3>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">"3BHK near metro Mumbai"</div>
                <div className="text-sm text-gray-600">"Budget 2cr Bandra"</div>
                <div className="text-sm text-gray-600">"Ready to move Andheri"</div>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl font-semibold mb-4">Property Alerts</h3>
              <div className="space-y-2">
                <div className="text-sm text-gray-600">New matches: 3</div>
                <div className="text-sm text-gray-600">Price drops: 1</div>
                <div className="text-sm text-gray-600">Similar properties: 5</div>
              </div>
            </GlassCard>
          </div>
        );

      case 'agent':
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard>
              <h3 className="text-xl font-semibold mb-4">Leads Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>New Leads</span>
                  <span className="font-semibold text-orange-600">12</span>
                </div>
                <div className="flex justify-between">
                  <span>Qualified</span>
                  <span className="font-semibold text-green-600">8</span>
                </div>
                <div className="flex justify-between">
                  <span>Converted</span>
                  <span className="font-semibold text-blue-600">3</span>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl font-semibold mb-4">AI Tools Usage</h3>
              <div className="space-y-2">
                <div className="text-sm">Lead Scoring: 25 times</div>
                <div className="text-sm">Follow-up Generator: 18 times</div>
                <div className="text-sm">Property Matcher: 12 times</div>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl font-semibold mb-4">Performance</h3>
              <div className="space-y-2">
                <div className="text-sm">Conversion Rate: 15%</div>
                <div className="text-sm">Response Time: 2.5 hours</div>
                <div className="text-sm">Client Satisfaction: 4.8/5</div>
              </div>
            </GlassCard>
          </div>
        );

      default:
        return (
          <GlassCard>
            <h3 className="text-xl font-semibold mb-4">Welcome to FreePropList</h3>
            <p className="text-gray-600">
              Your dashboard is being prepared. Start exploring our AI-powered features!
            </p>
          </GlassCard>
        );
    }
  };

  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Welcome back, {user.full_name}!
              </h1>
              <p className="text-gray-600 capitalize">
                {user.role.replace('_', ' ')} Dashboard
              </p>
            </div>
            
            {balance && (
              <GlassCard className="text-center">
                <div className="text-2xl font-bold text-fire">{balance.balance}</div>
                <div className="text-sm text-gray-600">AI Credits</div>
                <ButtonGradient size="sm" className="mt-2">
                  Add Credits
                </ButtonGradient>
              </GlassCard>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">250</div>
              <div className="text-sm text-gray-600">Total Searches</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-green-600">15</div>
              <div className="text-sm text-gray-600">Saved Properties</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">8</div>
              <div className="text-sm text-gray-600">AI Tools Used</div>
            </div>
            <div className="glass-card p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">95%</div>
              <div className="text-sm text-gray-600">Match Accuracy</div>
            </div>
          </div>
        </div>

        {/* Role-specific Content */}
        {getDashboardContent()}

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ButtonGradient className="p-6 h-auto flex flex-col">
              <div className="text-2xl mb-2">🔍</div>
              <span>Smart Search</span>
            </ButtonGradient>
            <ButtonGradient className="p-6 h-auto flex flex-col">
              <div className="text-2xl mb-2">🏠</div>
              <span>List Property</span>
            </ButtonGradient>
            <ButtonGradient className="p-6 h-auto flex flex-col">
              <div className="text-2xl mb-2">🤖</div>
              <span>AI Tools</span>
            </ButtonGradient>
            <ButtonGradient className="p-6 h-auto flex flex-col">
              <div className="text-2xl mb-2">📊</div>
              <span>Analytics</span>
            </ButtonGradient>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
