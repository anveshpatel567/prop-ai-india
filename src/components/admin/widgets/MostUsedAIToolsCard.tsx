
import { useEffect } from 'react';
import { useCrmAiTrails } from '@/hooks/useCrmAiTrails';

export default function MostUsedAIToolsCard() {
  const { trails, loading, fetchUserTrails } = useCrmAiTrails();

  useEffect(() => {
    fetchUserTrails();
  }, []);

  const toolCount: { [key: string]: number } = {};

  trails.forEach((trail) => {
    toolCount[trail.ai_tool] = (toolCount[trail.ai_tool] || 0) + 1;
  });

  const sortedTools = Object.entries(toolCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="p-4 rounded-2xl shadow bg-white">
      <h2 className="text-lg font-semibold mb-2">🧠 Most Used AI Tools</h2>
      {loading ? (
        <div className="text-sm text-gray-500">Loading...</div>
      ) : (
        <ul className="text-sm space-y-1">
          {sortedTools.length > 0 ? (
            sortedTools.map(([tool, count]) => (
              <li key={tool} className="flex justify-between">
                <span className="truncate">{tool}</span>
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
