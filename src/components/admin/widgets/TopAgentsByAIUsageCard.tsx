
import { useEffect } from 'react';
import { useCrmAiTrails } from '@/hooks/useCrmAiTrails';

export default function TopAgentsByAIUsageCard() {
  const { trails, loading, fetchUserTrails } = useCrmAiTrails();

  useEffect(() => {
    fetchUserTrails();
  }, []);

  const usageMap: { [key: string]: number } = {};

  trails.forEach((trail) => {
    usageMap[trail.user_id] = (usageMap[trail.user_id] || 0) + 1;
  });

  const sortedAgents = Object.entries(usageMap)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="p-4 rounded-2xl shadow bg-white">
      <h2 className="text-lg font-semibold mb-2">🏆 Top AI-Using Agents</h2>
      {loading ? (
        <div className="text-sm text-gray-500">Loading...</div>
      ) : (
        <ul className="text-sm space-y-1">
          {sortedAgents.length > 0 ? (
            sortedAgents.map(([userId, count]) => (
              <li key={userId} className="flex justify-between">
                <span>{userId.slice(0, 8)}...</span>
                <span className="font-medium">{count} uses</span>
              </li>
            ))
          ) : (
            <li className="text-gray-500">No data available</li>
          )}
        </ul>
      )}
    </div>
  );
}
