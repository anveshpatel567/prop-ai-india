
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AiRuleViolation {
  id: string;
  rule_id: string | null;
  offending_value: string;
  detected_at: string;
  auto_action_taken: boolean;
  ai_enforcement_rules?: {
    rule_name: string;
    target_module: string;
  };
}

export function useAiRuleViolations() {
  const [violations, setViolations] = useState<AiRuleViolation[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRuleViolations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ai_rule_violations')
        .select(`
          *,
          ai_enforcement_rules (
            rule_name,
            target_module
          )
        `)
        .order('detected_at', { ascending: false });

      if (error) throw error;
      setViolations(data || []);
    } catch (error) {
      console.error('Error fetching rule violations:', error);
      toast({
        title: "Error",
        description: "Failed to fetch rule violations",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const logRuleViolation = async (rule_id: string, offending_value: string, auto_action_taken = false) => {
    try {
      const { error } = await supabase.functions.invoke('logRuleViolation', {
        body: { rule_id, offending_value, auto_action_taken }
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Rule violation logged successfully",
      });
      
      fetchRuleViolations();
    } catch (error) {
      console.error('Error logging rule violation:', error);
      toast({
        title: "Error",
        description: "Failed to log rule violation",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchRuleViolations();
  }, []);

  return {
    violations,
    loading,
    fetchRuleViolations,
    logRuleViolation
  };
}
