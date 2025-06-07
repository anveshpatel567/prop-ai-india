
import React, { useEffect } from 'react';
import { useAiListerChatSummaries } from '@/hooks/useAiListerChatSummaries';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Calendar } from 'lucide-react';

export default function AiChatSummaryDisplay() {
  const { user } = useAuth();
  const { summaries, loading, fetchUserSummaries } = useAiListerChatSummaries();

  useEffect(() => {
    if (user?.id) {
      fetchUserSummaries(user.id);
    }
  }, [user?.id]);

  if (!user || loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading chat summaries...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          AI Chat Summaries ({summaries.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {summaries.length === 0 ? (
          <p className="text-gray-500">No chat summaries generated yet. Start chatting to create summaries!</p>
        ) : (
          <div className="space-y-4">
            {summaries.map((summary) => (
              <div
                key={summary.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-xs">
                    {summary.summary_type}
                  </Badge>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    {new Date(summary.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  Thread: {summary.chat_thread_id}
                </div>
                <div className="prose prose-sm max-w-none">
                  <pre className="whitespace-pre-wrap text-sm bg-gray-50 p-3 rounded">
                    {summary.summary_markdown}
                  </pre>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
