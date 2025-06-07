
import { useEffect } from 'react';
import { useLeadScores } from '@/hooks/useLeadScores';

export default function TopScoringLeadsCard() {
  const { scores, loading, fetchLeadScores } = useLeadScores();

  useEffect(() => {
    fetchLeadScores();
  }, []);

  const topScores = scores
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  return (
    <div className="p-4 rounded-2xl shadow bg-white">
      <h2 className="text-lg font-semibold mb-2">📈 Top Scoring Leads</h2>
      {loading ? (
        <div className="text-sm text-gray-500">Loading...</div>
      ) : (
        <ul className="text-sm space-y-1">
          {topScores.length > 0 ? (
            topScores.map((lead) => (
              <li key={lead.id} className="flex justify-between">
                <span>{lead.lead_id.slice(0, 8)}...</span>
                <span className="font-medium">{lead.score}/100</span>
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
