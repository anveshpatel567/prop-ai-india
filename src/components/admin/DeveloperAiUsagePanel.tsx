
import { useDeveloperAiSummary } from '@/hooks/useDeveloperAiSummary';
import { useAiToolErrorLogs } from '@/hooks/useAiToolErrorLogs';
import { AiUsageDonutChart } from '@/components/ui/AiUsageDonutChart';
import { AiUsageTrendGraph } from '@/components/ui/AiUsageTrendGraph';
import { Skeleton } from '@/components/ui/skeleton';

export default function DeveloperAiUsagePanel() {
  const { summary, loading: summaryLoading, error: summaryError } = useDeveloperAiSummary();
  const { errors, loading: errorsLoading } = useAiToolErrorLogs();

  if (summaryLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton className="h-80" />
          <Skeleton className="h-80" />
        </div>
      </div>
    );
  }

  if (summaryError) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500">
        Error loading AI usage data: {summaryError}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-card p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total Credits Used</h3>
          <p className="text-3xl font-bold text-blue-600">{summary.total_credits.toLocaleString()}</p>
        </div>
        
        <div className="glass-card p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Total API Calls</h3>
          <p className="text-3xl font-bold text-green-600">{summary.total_calls.toLocaleString()}</p>
        </div>
        
        <div className="glass-card p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Active Tools</h3>
          <p className="text-3xl font-bold text-purple-600">{summary.tool_breakdown.length}</p>
        </div>
        
        <div className="glass-card p-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Avg Credits/Call</h3>
          <p className="text-3xl font-bold text-orange-600">
            {summary.total_calls > 0 ? (summary.total_credits / summary.total_calls).toFixed(1) : '0'}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Credits Usage by Tool</h3>
          <AiUsageDonutChart data={summary.tool_breakdown} />
        </div>
        
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">Daily Usage Trend (Last 7 Days)</h3>
          <AiUsageTrendGraph data={summary.daily_trend} />
        </div>
      </div>

      {/* Tool Breakdown & Errors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">🛠️ Tool Usage Breakdown</h3>
          <div className="space-y-3">
            {summary.tool_breakdown.length > 0 ? (
              summary.tool_breakdown
                .sort((a, b) => b.credits_used - a.credits_used)
                .map((tool) => (
                  <div key={tool.tool} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium">{tool.tool}</p>
                      <p className="text-sm text-gray-600">{tool.call_count} calls</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-blue-600">{tool.credits_used} credits</p>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-gray-500 text-center py-4">No tool usage data available</p>
            )}
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold mb-4">⚠️ Recent Errors</h3>
          <div className="space-y-3">
            {errorsLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton key={i} className="h-16" />
                ))}
              </div>
            ) : errors.length > 0 ? (
              errors.map((error) => (
                <div key={error.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-red-800">{error.tool_name}</p>
                    <p className="text-xs text-red-600">
                      {new Date(error.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <p className="text-sm text-red-700 truncate">{error.error_message}</p>
                </div>
              ))
            ) : (
              <p className="text-green-600 text-center py-4">✅ No recent AI tool errors</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
