
import { Card } from '@/components/ui/card';
import { useAllCampaignReports } from '@/hooks/useCampaignReports';
import CampaignReportCard from '@/components/admin/CampaignReportCard';
import { BarChart3, TrendingUp, Eye, MousePointer } from 'lucide-react';

export default function AdminCampaignInsightsPage() {
  const { data, loading, error } = useAllCampaignReports();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-gray-500">Loading all campaign reports...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <Card className="p-6 border-red-200 bg-red-50">
          <p className="text-red-600">Error loading reports: {error}</p>
        </Card>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Campaign Insights Overview</h1>
          <p className="text-gray-600">Monitor performance across all listing offer campaigns</p>
        </div>
        
        <Card className="p-8 text-center">
          <BarChart3 className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-500 mb-2">No campaign reports found</p>
          <p className="text-sm text-gray-400">
            Campaign reports will appear here once listing offers start receiving engagement.
          </p>
        </Card>
      </div>
    );
  }

  // Calculate global summary statistics
  const totalViews = data.reduce((sum, report) => sum + report.views, 0);
  const totalClicks = data.reduce((sum, report) => sum + report.clicks, 0);
  const avgCTR = totalViews > 0 ? (totalClicks * 100) / totalViews : 0;
  const activeCampaigns = data.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">Campaign Insights Overview</h1>
        <p className="text-gray-600">Monitor performance across all listing offer campaigns</p>
      </div>

      {/* Global Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50">
          <div className="flex items-center gap-3">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-blue-600 font-medium">Active Campaigns</p>
              <p className="text-2xl font-bold text-blue-800">{activeCampaigns}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-indigo-50 to-indigo-100/50">
          <div className="flex items-center gap-3">
            <Eye className="h-8 w-8 text-indigo-600" />
            <div>
              <p className="text-sm text-indigo-600 font-medium">Total Views</p>
              <p className="text-2xl font-bold text-indigo-800">{totalViews.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50">
          <div className="flex items-center gap-3">
            <MousePointer className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-sm text-purple-600 font-medium">Total Clicks</p>
              <p className="text-2xl font-bold text-purple-800">{totalClicks.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100/50">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-green-600 font-medium">Global CTR</p>
              <p className="text-2xl font-bold text-green-800">{avgCTR.toFixed(2)}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* All Campaign Reports */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">All Campaign Reports</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data.map((report) => (
            <CampaignReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>
    </div>
  );
}
