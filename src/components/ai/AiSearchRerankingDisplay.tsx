
import React, { useEffect } from 'react';
import { useAiSearchRerankings } from '@/hooks/useAiSearchRerankings';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, ArrowUpDown } from 'lucide-react';

export default function AiSearchRerankingDisplay() {
  const { user } = useAuth();
  const { rerankings, loading, fetchUserRerankings, parseRerankedResults } = useAiSearchRerankings();

  useEffect(() => {
    if (user?.id) {
      fetchUserRerankings(user.id);
    }
  }, [user?.id]);

  if (!user || loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading search rerankings...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          AI Search Rerankings ({rerankings.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {rerankings.length === 0 ? (
          <p className="text-gray-500">No search rerankings yet. Your search results will be optimized by AI!</p>
        ) : (
          <div className="space-y-4">
            {rerankings.map((reranking) => (
              <div
                key={reranking.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center gap-2 mb-3">
                  <ArrowUpDown className="h-4 w-4 text-blue-500" />
                  <span className="font-medium">"{reranking.original_query}"</span>
                  <Badge variant="outline" className="text-xs">
                    {parseRerankedResults(reranking.reranked_results).length} results
                  </Badge>
                </div>
                
                {reranking.reason_summary && (
                  <p className="text-sm text-gray-600 mb-2">
                    <strong>AI Reasoning:</strong> {reranking.reason_summary}
                  </p>
                )}
                
                <div className="text-xs text-gray-500">
                  Reranked on {new Date(reranking.created_at).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
