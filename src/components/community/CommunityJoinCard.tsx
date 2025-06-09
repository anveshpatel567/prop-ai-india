
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCommunityChat } from '@/hooks/useCommunityChat';
import { useCreditStatus } from '@/hooks/useCreditStatus';
import { AiCreditTooltip } from '@/components/ai/AiCreditTooltip';
import { Users, MapPin, DollarSign, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Community {
  id: string;
  name: string;
  role_access: string;
  city: string;
  state: string;
  monthly_fee: number;
  created_at: string;
}

interface CommunityJoinCardProps {
  community: Community;
  isMember: boolean;
  memberCount?: number;
}

export const CommunityJoinCard: React.FC<CommunityJoinCardProps> = ({
  community,
  isMember,
  memberCount = 0
}) => {
  const { joinCommunity, loading } = useCommunityChat();
  const { userCredits } = useCreditStatus();

  const handleJoin = async () => {
    try {
      await joinCommunity(community.id);
      toast({
        title: "Welcome to the Community!",
        description: `You've successfully joined ${community.name}. Your membership expires in 30 days.`,
      });
    } catch (error) {
      toast({
        title: "Failed to Join",
        description: error instanceof Error ? error.message : "Unable to join community. Please try again.",
        variant: "destructive"
      });
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'buyer': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'agent': return 'bg-green-100 text-green-700 border-green-300';
      case 'developer': return 'bg-purple-100 text-purple-700 border-purple-300';
      case 'tenant': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  return (
    <Card className="border-orange-200 hover:shadow-lg hover:shadow-orange-200/50 transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg text-gray-800 flex-1">{community.name}</CardTitle>
          {isMember && (
            <Badge className="bg-green-100 text-green-700 border-green-300">
              Member
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="h-4 w-4" />
          <span>{community.city}, {community.state}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className={getRoleColor(community.role_access)}>
              {community.role_access}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <Users className="h-3 w-3" />
              <span>{memberCount} members</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-sm font-medium text-orange-600">
            <DollarSign className="h-3 w-3" />
            <span>{community.monthly_fee} credits/month</span>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Created {new Date(community.created_at).toLocaleDateString()}
        </div>
        
        {!isMember && (
          <AiCreditTooltip
            credits_required={community.monthly_fee}
            tool_name="Community Membership"
            user_credits={userCredits}
          >
            <Button
              onClick={handleJoin}
              disabled={loading || userCredits < community.monthly_fee}
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white"
            >
              <Users className="mr-2 h-4 w-4" />
              {loading ? 'Joining...' : `Join Community (${community.monthly_fee} credits)`}
            </Button>
          </AiCreditTooltip>
        )}
        
        {isMember && (
          <Button
            variant="outline"
            className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
            disabled
          >
            <Users className="mr-2 h-4 w-4" />
            Already a Member
          </Button>
        )}
      </CardContent>
    </Card>
  );
};
