
import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { GlassCard } from '@/components/layout/GlassCard';
import { CommunityJoinCard } from '@/components/community/CommunityJoinCard';
import { CommunityChatWindow } from '@/components/community/CommunityChatWindow';
import { useCommunityChat } from '@/hooks/useCommunityChat';
import { GoBackHomeButton } from '@/components/ui/GoBackHomeButton';
import { MobileCardGrid, MobileCardSpacing } from '@/components/mobile/MobileCardSpacingFix';

const CommunityIndex: React.FC = () => {
  const [selectedCommunity, setSelectedCommunity] = useState<string | null>(null);
  const { communities, userMemberships, loading } = useCommunityChat();

  const selectedCommunityData = communities.find(c => c.id === selectedCommunity);

  if (selectedCommunity && selectedCommunityData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#fff7f0] to-[#ffe4d6]">
        <Navbar />
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-[#2d0000] mb-2 font-rajdhani">
                {selectedCommunityData.name}
              </h1>
              <p className="text-sm sm:text-base text-[#8b4513] font-dmsans">
                {selectedCommunityData.city}, {selectedCommunityData.state} • {selectedCommunityData.role_access}
              </p>
            </div>
            <div className="flex gap-2 justify-center sm:justify-end">
              <button
                onClick={() => setSelectedCommunity(null)}
                className="px-4 py-2 text-[#ff4500] hover:bg-[#fff7f0] rounded-lg transition-colors text-sm font-dmsans"
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
    <div className="min-h-screen bg-gradient-to-br from-[#fff7f0] to-[#ffe4d6]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
          <div className="text-center sm:text-left flex-1">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#2d0000] mb-2 font-rajdhani">Real Estate Communities</h1>
            <p className="text-sm sm:text-base text-[#8b4513] font-dmsans">
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
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  U
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[#2d0000] font-rajdhani">Join Communities</h3>
                <p className="text-sm text-[#8b4513] font-dmsans">
                  Connect with professionals and enthusiasts in your city and role
                </p>
              </div>
            </GlassCard>
            
            <GlassCard>
              <div className="p-4 sm:p-6 text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full flex items-center justify-center text-white font-bold text-xl">
                  AI
                </div>
                <h3 className="text-lg font-semibold mb-2 text-[#2d0000] font-rajdhani">AI Moderated</h3>
                <p className="text-sm text-[#8b4513] font-dmsans">
                  All messages are monitored by AI to maintain quality discussions
                </p>
              </div>
            </GlassCard>
          </div>
        </MobileCardSpacing>

        <MobileCardSpacing>
          <h2 className="text-xl sm:text-2xl font-bold text-[#2d0000] mb-4 sm:mb-6 font-rajdhani">Available Communities</h2>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ff4500] mx-auto"></div>
              <p className="text-[#8b4513] mt-2 font-dmsans">Loading communities...</p>
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
                        className="w-full px-4 py-2 bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] hover:from-[#ff3c00] hover:to-[#ff6a00] text-white rounded-lg transition-all duration-300 text-sm font-medium font-rajdhani"
                      >
                        <span className="mr-2">💬</span>
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
              <div className="p-6 text-center text-[#8b4513] font-dmsans">
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
