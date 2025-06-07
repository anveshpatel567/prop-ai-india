
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface AgentMatchRequest {
  preferred_city: string;
  budget: number;
  property_type: string;
  urgency_level: string;
  notes: string;
}

export interface AgentMatchResult {
  matched_agent_id: string;
  ai_comment: string;
  match_request: {
    id: string;
    seeker_id: string;
    preferred_city: string;
    budget: number;
    property_type: string;
    urgency_level: string;
    notes: string;
    matched_agent_id: string;
    ai_comment: string;
    created_at: string;
  };
}

export function useAgentMatch() {
  const [data, setData] = useState<AgentMatchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const findMatch = async (request: AgentMatchRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const { data: result, error: functionError } = await supabase.functions.invoke('matchAgentWithSeeker', {
        body: request
      });

      if (functionError) throw functionError;
      
      setData(result);
      toast({
        title: "Agent Match Found",
        description: "We've found the perfect agent for your requirements!",
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to find agent match';
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return { 
    data, 
    loading, 
    error, 
    findMatch 
  };
}
