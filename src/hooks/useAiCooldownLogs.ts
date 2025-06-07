
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AiCooldownLog {
  id: string;
  feature: string;
  cooldown_triggered_at: string;
  duration_minutes: number;
  user_id: string | null;
  resolved: boolean;
}

export const useAiCooldownLogs = () => {
  const [cooldowns, setCooldowns] = useState<AiCooldownLog[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchCooldownLogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_feature_cooldowns')
        .select('*')
        .order('cooldown_triggered_at', { ascending: false });

      if (error) throw error;

      setCooldowns(data || []);
    } catch (error) {
      console.error('Error fetching cooldown logs:', error);
      toast({
        title: "Error",
        description: "Failed to fetch cooldown logs",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resolveCooldown = async (id: string) => {
    try {
      const { error } = await supabase
        .from('ai_feature_cooldowns')
        .update({
          resolved: true
        })
        .eq('id', id);

      if (error) throw error;

      console.log('Cooldown resolved successfully');
      fetchCooldownLogs();
      
      toast({
        title: "Success",
        description: "Cooldown resolved",
      });
    } catch (error) {
      console.error('Error resolving cooldown:', error);
      toast({
        title: "Error",
        description: "Failed to resolve cooldown",
        variant: "destructive",
      });
    }
  };

  const addCooldown = async (
    feature: string,
    durationMinutes: number,
    userId: string
  ) => {
    try {
      const { error } = await supabase
        .from('ai_feature_cooldowns')
        .insert({
          feature,
          duration_minutes: durationMinutes,
          user_id: userId
        });

      if (error) throw error;

      console.log('Cooldown added successfully');
      fetchCooldownLogs();
    } catch (error) {
      console.error('Error adding cooldown:', error);
      toast({
        title: "Error",
        description: "Failed to add cooldown",
        variant: "destructive",
      });
    }
  };

  return {
    cooldowns,
    loading,
    fetchCooldownLogs,
    resolveCooldown,
    addCooldown,
  };
};
