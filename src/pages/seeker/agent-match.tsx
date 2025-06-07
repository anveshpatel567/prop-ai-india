
import React from 'react';
import { useAgentMatch } from '@/hooks/useAgentMatch';
import AgentMatchForm from '@/components/seeker/AgentMatchForm';
import AgentMatchResult from '@/components/seeker/AgentMatchResult';

export default function AgentMatchPage() {
  const { data } = useAgentMatch();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            🎯 AI Agent Matcher
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Let our AI find the perfect real estate agent for your needs. Get matched with agents who specialize in your requirements and location.
          </p>
        </div>

        {!data ? (
          <AgentMatchForm />
        ) : (
          <AgentMatchResult result={data} />
        )}
      </div>
    </div>
  );
}
