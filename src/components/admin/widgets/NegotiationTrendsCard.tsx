
import { useEffect } from 'react';
import { useAiNegotiationLogs } from '@/hooks/useAiNegotiationLogs';

export default function NegotiationTrendsCard() {
  const { logs, loading, fetchNegotiationLogs } = useAiNegotiationLogs();

  useEffect(() => {
    fetchNegotiationLogs();
  }, []);

  const outcomeCount: { [key: string]: number } = {};

  logs.forEach((log) => {
    const outcome = log.step_outcome || 'unknown';
    outcomeCount[outcome] = (outcomeCount[outcome] || 0) + 1;
  });

  const sortedOutcomes = Object.entries(outcomeCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="p-4 rounded-2xl shadow bg-white">
      <h2 className="text-lg font-semibold mb-2">🤝 Negotiation Trends</h2>
      {loading ? (
        <div className="text-sm text-gray-500">Loading...</div>
      ) : (
        <ul className="text-sm space-y-1">
          {sortedOutcomes.length > 0 ? (
            sortedOutcomes.map(([outcome, count]) => (
              <li key={outcome} className="flex justify-between">
                <span className="capitalize truncate">{outcome}</span>
                <span className="font-medium">{count} times</span>
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
