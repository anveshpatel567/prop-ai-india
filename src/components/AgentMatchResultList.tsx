
import { useAgentMatches } from '@/hooks/useAgentMatches';
import { useAuth } from '@/context/AuthContext';

export function AgentMatchResultList() {
  const { user } = useAuth();
  const { matches, loading, error } = useAgentMatches(user?.id || '');

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map(i => (
          <div key={i} className="animate-pulse p-4 border rounded-lg">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-600">Error loading matches: {error}</p>
      </div>
    );
  }

  if (matches.length === 0) {
    return (
      <div className="p-8 text-center text-gray-500">
        <p>No agent matches found. Try updating your preferences.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Agent Matches</h3>
      {matches.map(match => (
        <div key={match.id} className="p-4 border border-gray-200 rounded-lg hover:border-orange-300 transition-colors">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium text-gray-900">{match.agent_name}</h4>
            <span className="text-sm font-medium text-green-600">{match.match_score}% match</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{match.specialization}</p>
          <div className="flex gap-4 text-xs text-gray-500">
            <span>{match.agent_email}</span>
            <span>{match.agent_phone}</span>
          </div>
          <button className="mt-3 px-3 py-1 text-sm bg-orange-100 text-orange-700 rounded hover:bg-orange-200 transition-colors">
            Contact Agent
          </button>
        </div>
      ))}
    </div>
  );
}
