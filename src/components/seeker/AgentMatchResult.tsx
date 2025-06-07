
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, User, MapPin, DollarSign, Clock } from 'lucide-react';
import { AgentMatchResult } from '@/hooks/useAgentMatch';
import { supabase } from '@/integrations/supabase/client';

interface AgentMatchResultProps {
  result: AgentMatchResult;
}

interface AgentInfo {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  role: string;
}

interface AgentResume {
  name: string;
  experience_years: number;
  city: string;
  specialization: string;
}

export default function AgentMatchResultCard({ result }: AgentMatchResultProps) {
  const [agentInfo, setAgentInfo] = useState<AgentInfo | null>(null);
  const [agentResume, setAgentResume] = useState<AgentResume | null>(null);

  useEffect(() => {
    const fetchAgentDetails = async () => {
      if (!result.matched_agent_id) return;

      // Fetch agent basic info
      const { data: userInfo } = await supabase
        .from('users')
        .select('id, full_name, email, phone, role')
        .eq('id', result.matched_agent_id)
        .single();

      if (userInfo) setAgentInfo(userInfo);

      // Fetch agent resume
      const { data: resumeInfo } = await supabase
        .from('ai_resumes')
        .select('name, experience_years, city, specialization')
        .eq('user_id', result.matched_agent_id)
        .single();

      if (resumeInfo) setAgentResume(resumeInfo);
    };

    fetchAgentDetails();
  }, [result.matched_agent_id]);

  const formatBudget = (budget: number) => {
    if (budget >= 10000000) {
      return `₹${(budget / 10000000).toFixed(1)} Cr`;
    } else if (budget >= 100000) {
      return `₹${(budget / 100000).toFixed(1)} L`;
    }
    return `₹${budget.toLocaleString()}`;
  };

  const getUrgencyColor = (level: string) => {
    switch (level) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <CardTitle className="text-green-700">Perfect Match Found!</CardTitle>
          </div>
          <CardDescription>
            Our AI has found the ideal agent for your requirements
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Your Requirements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span>{result.match_request.preferred_city}</span>
            </div>
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-gray-500" />
              <span>{formatBudget(result.match_request.budget)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-500" />
              <Badge className={getUrgencyColor(result.match_request.urgency_level)}>
                {result.match_request.urgency_level} urgency
              </Badge>
            </div>
            <div className="mt-3">
              <Badge variant="outline">{result.match_request.property_type}</Badge>
            </div>
            {result.match_request.notes && (
              <div className="mt-3 p-3 bg-gray-50 rounded text-sm">
                <strong>Notes:</strong> {result.match_request.notes}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Matched Agent
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {agentInfo && (
              <>
                <div>
                  <h3 className="font-semibold text-lg">{agentInfo.full_name}</h3>
                  <p className="text-gray-600">{agentInfo.email}</p>
                </div>
                {agentResume && (
                  <>
                    <div className="flex gap-2">
                      <Badge variant="outline">{agentResume.experience_years} years exp</Badge>
                      <Badge variant="outline">{agentResume.city}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">
                        <strong>Specialization:</strong> {agentResume.specialization}
                      </p>
                    </div>
                  </>
                )}
                <Button className="w-full mt-4">
                  Contact Agent
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI Recommendation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm leading-relaxed">{result.ai_comment}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
