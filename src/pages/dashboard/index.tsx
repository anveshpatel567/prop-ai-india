
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
              <h3 className="text-xl font-rajdhani font-semibold mb-4 text-text-primary">Saved Properties</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-section-alt rounded">
                  <div>
                    <div className="font-dmsans font-medium text-text-primary">3BHK in Bandra West</div>
                    <div className="text-sm font-dmsans text-text-muted">₹2.5 Cr</div>
                  </div>
                  <div className="text-sm font-dmsans text-accent-green">92% Match</div>
                </div>
                <div className="flex justify-between items-center p-3 bg-section-alt rounded">
                  <div>
                    <div className="font-dmsans font-medium text-text-primary">2BHK in Andheri</div>
                    <div className="text-sm font-dmsans text-text-muted">₹1.8 Cr</div>
                  </div>
                  <div className="text-sm font-dmsans text-accent-green">85% Match</div>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl font-rajdhani font-semibold mb-4 text-text-primary">Recent Searches</h3>
              <div className="space-y-2">
                <div className="text-sm font-dmsans text-text-muted">"3BHK near metro Mumbai"</div>
                <div className="text-sm font-dmsans text-text-muted">"Budget 2cr Bandra"</div>
                <div className="text-sm font-dmsans text-text-muted">"Ready to move Andheri"</div>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl font-rajdhani font-semibold mb-4 text-text-primary">Property Alerts</h3>
              <div className="space-y-2">
                <div className="text-sm font-dmsans text-text-muted">New matches: 3</div>
                <div className="text-sm font-dmsans text-text-muted">Price drops: 1</div>
                <div className="text-sm font-dmsans text-text-muted">Similar properties: 5</div>
              </div>
            </GlassCard>
          </div>
        );

      case 'agent':
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GlassCard>
              <h3 className="text-xl font-rajdhani font-semibold mb-4 text-text-primary">Leads Overview</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-dmsans text-text-secondary">New Leads</span>
                  <span className="font-rajdhani font-semibold text-orange-600">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-dmsans text-text-secondary">Qualified</span>
                  <span className="font-rajdhani font-semibold text-accent-green">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-dmsans text-text-secondary">Converted</span>
                  <span className="font-rajdhani font-semibold text-accent-blue">3</span>
                </div>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl font-rajdhani font-semibold mb-4 text-text-primary">AI Tools Usage</h3>
              <div className="space-y-2">
                <div className="text-sm font-dmsans">Lead Scoring: 25 times</div>
                <div className="text-sm font-dmsans">Follow-up Generator: 18 times</div>
                <div className="text-sm font-dmsans">Property Matcher: 12 times</div>
              </div>
            </GlassCard>

            <GlassCard>
              <h3 className="text-xl font-rajdhani font-semibold mb-4 text-text-primary">Performance</h3>
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
            <h3 className="text-xl font-rajdhani font-semibold mb-4 text-text-primary">Welcome to FreePropList</h3>
            <p className="font-dmsans text-text-muted">
              Your dashboard is being prepared. Start exploring our AI-powered features!
            </p>
          </GlassCard>
        );
    }
  };

  return (
    <div className="min-h-screen bg-global-bg">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="font-rajdhani text-3xl font-bold text-text-primary">
                Welcome back, {user.full_name}!
              </h1>
              <p className="font-dmsans text-text-muted capitalize">
                {user.role.replace('_', ' ')} Dashboard
              </p>
            </div>
            
            {balance && (
              <GlassCard className="text-center">
                <div className="text-2xl font-rajdhani font-bold text-accent-blue">{balance.balance}</div>
                <div className="text-sm font-dmsans text-text-muted">AI Credits</div>
                <ButtonGradient size="sm" className="mt-2">
                  Add Credits
                </ButtonGradient>
              </GlassCard>
            )}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="glass-card-light p-4 text-center">
              <div className="text-2xl font-rajdhani font-bold text-orange-600">250</div>
              <div className="text-sm font-dmsans text-text-muted">Total Searches</div>
            </div>
            <div className="glass-card-light p-4 text-center">
              <div className="text-2xl font-rajdhani font-bold text-accent-green">15</div>
              <div className="text-sm font-dmsans text-text-muted">Saved Properties</div>
            </div>
            <div className="glass-card-light p-4 text-center">
              <div className="text-2xl font-rajdhani font-bold text-accent-blue">8</div>
              <div className="text-sm font-dmsans text-text-muted">AI Tools Used</div>
            </div>
            <div className="glass-card-light p-4 text-center">
              <div className="text-2xl font-rajdhani font-bold text-accent-violet">95%</div>
              <div className="text-sm font-dmsans text-text-muted">Match Accuracy</div>
            </div>
          </div>
        </div>

        {/* Role-specific Content */}
        {getDashboardContent()}

        {/* Quick Actions */}
        <div className="mt-12">
          <h2 className="font-rajdhani text-2xl font-bold text-text-primary mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ButtonGradient className="p-6 h-auto flex flex-col">
              <div className="text-2xl mb-2">🔍</div>
              <span className="font-rajdhani">Smart Search</span>
            </ButtonGradient>
            <ButtonGradient className="p-6 h-auto flex flex-col">
              <div className="text-2xl mb-2">🏠</div>
              <span className="font-rajdhani">List Property</span>
            </ButtonGradient>
            <ButtonGradient className="p-6 h-auto flex flex-col">
              <div className="text-2xl mb-2">🤖</div>
              <span className="font-rajdhani">AI Tools</span>
            </ButtonGradient>
            <ButtonGradient className="p-6 h-auto flex flex-col">
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
