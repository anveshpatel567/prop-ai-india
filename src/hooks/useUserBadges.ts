
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface UserBadge {
  id: string;
  user_id: string;
  badge_name: string;
  badge_type: string;
  badge_level: string;
  unlocked_at: string;
}

export const useUserBadges = () => {
  const [badges, setBadges] = useState<UserBadge[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchUserBadges = async (userId?: string) => {
    try {
      setLoading(true);
      let query = supabase
        .from('ai_user_badges')
        .select('*')
        .order('unlocked_at', { ascending: false });

      if (userId) {
        query = query.eq('user_id', userId);
      }

      const { data, error } = await query;

      if (error) throw error;

      setBadges(data || []);
    } catch (error) {
      console.error('Error fetching user badges:', error);
      toast({
        title: "Error",
        description: "Failed to fetch badges",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const awardBadge = async (userId: string, badgeName: string, badgeType: string, badgeLevel: string) => {
    try {
      const { error } = await supabase
        .from('ai_user_badges')
        .insert({
          user_id: userId,
          badge_name: badgeName,
          badge_type: badgeType,
          badge_level: badgeLevel
        });

      if (error) throw error;

      toast({
        title: "Badge Unlocked!",
        description: `You've earned the ${badgeName} ${badgeLevel} badge!`,
      });

      // Refresh badges
      fetchUserBadges(userId);
    } catch (error) {
      console.error('Error awarding badge:', error);
      toast({
        title: "Error",
        description: "Failed to award badge",
        variant: "destructive",
      });
    }
  };

  return {
    badges,
    loading,
    fetchUserBadges,
    awardBadge,
  };
};
