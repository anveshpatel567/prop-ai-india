
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/layout/GlassCard';
import { CommunityJoinCard } from '@/components/community/CommunityJoinCard';
import { CommunityChatWindow } from '@/components/community/CommunityChatWindow';
import { useCommunityChat } from '@/hooks/useCommunityChat';
import { GoBackHomeButton } from '@/components/ui/GoBackHomeButton';
import { MobileCardGrid, MobileCardSpacing } from '@/components/mobile/MobileCardSpacingFix';
import { Users, MessageSquare } from 'lucide-react';

const CommunityIndex: React.FC = () => {
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const { communities, userMemberships, loading } = useCommunityChat();

  const selectedCommunityData = communities.find(c => c.id === selectedCommunity);

  if (selectedCommunity && selectedCommunityData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                {selectedCommunityData.name}
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                {selectedCommunityData.city}, {selectedCommunityData.state} • {selectedCommunityData.role_access}
              </p>
            </div>
            <div className="flex gap-2 justify-center sm:justify-end">
              <button
                onClick={() => setSelectedCommunity(null)}
                className="px-4 py-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors text-sm"
              >
                ← Back to Communities
              </button>
              <GoBackHomeButton />
            </div>
          </div>

          <MobileCardSpacing>
            <CommunityChatWindow
              communityId={selectedCommunity}
              communityName={selectedCommunityData.name}
            />
          </MobileCardSpacing>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">Real Estate Communities</h1>
            <p className="text-sm sm:text-base text-gray-600">
              Connect with buyers, agents, developers, and tenants in your area
            </p>
          </div>
          <div className="flex justify-center sm:justify-end">
            <GoBackHomeButton />
          </div>
        </div>

        <MobileCardSpacing>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <GlassCard>
              <div className="p-4 sm:p-6 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-orange-500" />
                <h3 className="text-lg font-semibold mb-2">Join Communities</h3>
                <p className="text-sm text-gray-600">
                  Connect with professionals and enthusiasts in your city and role
                </p>
              </div>
            </GlassCard>
            
            <GlassCard>
              <div className="p-4 sm:p-6 text-center">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 text-red-500" />
                <h3 className="text-lg font-semibold mb-2">AI Moderated</h3>
                <p className="text-sm text-gray-600">
                  All messages are monitored by AI to maintain quality discussions
                </p>
              </div>
            </GlassCard>
          </div>
        </MobileCardSpacing>

        <MobileCardSpacing>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6">Available Communities</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
              <p className="text-gray-600 mt-2">Loading communities...</p>
            </div>
          ) : (
            <MobileCardGrid>
              {communities.map((community) => (
                <div key={community.id}>
                  <CommunityJoinCard
                    community={community}
                    isMember={userMemberships.includes(community.id)}
                  />
                  
                  {userMemberships.includes(community.id) && (
                    <div className="mt-2">
                      <button
                        onClick={() => setSelectedCommunity(community.id)}
                        className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300 text-sm font-medium"
                      >
                        <MessageSquare className="mr-2 h-4 w-4 inline" />
                        Open Chat
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </MobileCardGrid>
          )}
          
          {!loading && communities.length === 0 && (
            <GlassCard>
              <div className="p-6 text-center text-gray-500">
                No communities available yet. Check back soon!
              </div>
            </GlassCard>
          )}
        </MobileCardSpacing>
      </div>
      <Footer />
    </div>
  );
};

export default CommunityIndex;
