
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AiResumeCard } from '@/components/resume/AiResumeCard';
import { Badge } from '@/components/ui/badge';
import { Calendar, Zap, TrendingUp, Clock } from 'lucide-react';
import { useMyToolSummary } from '@/hooks/useMyToolSummary';
import { useMyToolAttempts } from '@/hooks/useMyToolAttempts';
import { useNegotiationThreads } from '@/hooks/useNegotiationThreads';
import { MobileCardSpacing, MobileCardGrid, MobileResponsiveCard } from '@/components/mobile/MobileCardSpacingFix';
import { StickyWalletBadge } from '@/components/mobile/StickyWalletBadge';

export default function MyAiUsagePage() {
  const { summary, loading: summaryLoading } = useMyToolSummary();
  const { attempts, loading: attemptsLoading } = useMyToolAttempts();
  const { negotiations } = useNegotiationThreads();

  const recentActivity = attempts?.slice(0, 10) || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <StickyWalletBadge />
      
      <MobileCardSpacing>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-2">My AI Usage</h1>
          <p className="text-gray-600 text-sm md:text-base">
            Track your AI tool usage, credits spent, and generated content
          </p>
        </div>

        <MobileCardGrid>
          <MobileResponsiveCard>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-lg md:text-2xl font-bold">
                  {summaryLoading ? '...' : summary?.total_credits_used || 0}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">Total Credits Used</p>
              </div>
            </div>
          </MobileResponsiveCard>

          <MobileResponsiveCard>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-lg md:text-2xl font-bold">
                  {summaryLoading ? '...' : summary?.tools_used || 0}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">Tools Used</p>
              </div>
            </div>
          </MobileResponsiveCard>

          <MobileResponsiveCard>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-lg md:text-2xl font-bold">
                  {summaryLoading ? '...' : summary?.last_used_days_ago || 0}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground">Days Since Last Use</p>
              </div>
            </div>
          </MobileResponsiveCard>
        </MobileCardGrid>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">AI Resume Builder</CardTitle>
            </CardHeader>
            <CardContent>
              <AiResumeCard />
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg md:text-xl">Negotiation Threads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {negotiations.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No active negotiations yet
                  </p>
                ) : (
                  negotiations.slice(0, 5).map((thread) => (
                    <div key={thread.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="text-sm font-medium">Thread #{thread.id.slice(0, 8)}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(thread.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={
                        thread.status === 'accepted' ? 'default' :
                        thread.status === 'rejected' ? 'destructive' :
                        'secondary'
                      }>
                        {thread.status}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg md:text-xl">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {attemptsLoading ? (
                <p className="text-sm text-muted-foreground">Loading...</p>
              ) : recentActivity.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No recent activity
                </p>
              ) : (
                recentActivity.map((attempt) => (
                  <div key={attempt.id} className="flex items-center justify-between p-3 border rounded">
                    <div className="flex items-center gap-3">
                      <div className="p-1.5 bg-primary/10 rounded">
                        <Clock className="h-3 w-3 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{attempt.tool_name}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(attempt.attempted_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant={attempt.was_allowed ? 'default' : 'destructive'}>
                        {attempt.was_allowed ? 'Success' : 'Failed'}
                      </Badge>
                      {attempt.credits_required && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {attempt.credits_required} credits
                        </p>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </MobileCardSpacing>
    </div>
  );
}
