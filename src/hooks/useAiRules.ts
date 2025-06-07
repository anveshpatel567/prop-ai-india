
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AiRule {
  id: string;
  rule_name: string;
  target_module: string;
  rule_condition: string;
  action: string;
  enabled: boolean;
  created_by: string | null;
  created_at: string;
}

export function useAiRules() {
  const [rules, setRules] = useState<AiRule[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchAiRules = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_enforcement_rules')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRules(data || []);
    } catch (error) {
      console.error('Error fetching AI rules:', error);
      toast({
        title: "Error",
        description: "Failed to fetch AI rules",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const createAiRule = async (rule_name: string, target_module: string, rule_condition: string, action: string, enabled = true) => {
    try {
      const { error } = await supabase.functions.invoke('createAiRule', {
        body: { rule_name, target_module, rule_condition, action, enabled }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "AI rule created successfully",
      });
      
      fetchAiRules();
    } catch (error) {
      console.error('Error creating AI rule:', error);
      toast({
        title: "Error",
        description: "Failed to create AI rule",
        variant: "destructive",
      });
    }
  };

  const toggleRule = async (id: string, enabled: boolean) => {
    try {
      const { error } = await supabase
        .from('ai_enforcement_rules')
        .update({ enabled })
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Success",
        description: `Rule ${enabled ? 'enabled' : 'disabled'} successfully`,
      });
      
      fetchAiRules();
    } catch (error) {
      console.error('Error toggling rule:', error);
      toast({
        title: "Error",
        description: "Failed to toggle rule",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchAiRules();
  }, []);

  return {
    rules,
    loading,
    fetchAiRules,
    createAiRule,
    toggleRule
  };
}
