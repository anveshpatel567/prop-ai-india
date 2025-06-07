
import React, { useEffect } from 'react';
import { useUserBadges } from '@/hooks/useUserBadges';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Star, Award, Zap } from 'lucide-react';

const getBadgeIcon = (badgeType: string) => {
  switch (badgeType) {
    case 'crm':
      return <Star className="h-4 w-4" />;
    case 'listing':
      return <Award className="h-4 w-4" />;
    case 'referral':
      return <Trophy className="h-4 w-4" />;
    case 'ai_power':
      return <Zap className="h-4 w-4" />;
    default:
      return <Award className="h-4 w-4" />;
  }
};

const getBadgeColor = (badgeLevel: string) => {
  switch (badgeLevel) {
    case 'bronze':
      return 'bg-amber-600';
    case 'silver':
      return 'bg-gray-400';
    case 'gold':
      return 'bg-yellow-500';
    default:
      return 'bg-blue-500';
  }
};

export default function UserBadgeDisplay() {
  const { user } = useAuth();
  const { badges, loading, fetchUserBadges } = useUserBadges();

  useEffect(() => {
    if (user?.id) {
      fetchUserBadges(user.id);
    }
  }, [user?.id]);

  if (!user || loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading badges...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5" />
          Your Badges ({badges.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {badges.length === 0 ? (
          <p className="text-gray-500">No badges earned yet. Keep using AI features to unlock badges!</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className={`p-3 rounded-full ${getBadgeColor(badge.badge_level)} text-white mb-2`}>
                  {getBadgeIcon(badge.badge_type)}
                </div>
                <h3 className="font-semibold text-sm text-center mb-1">{badge.badge_name}</h3>
                <Badge variant="outline" className="text-xs">
                  {badge.badge_level}
                </Badge>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(badge.unlocked_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
