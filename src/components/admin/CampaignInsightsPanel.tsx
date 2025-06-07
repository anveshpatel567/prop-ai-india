
import { Card } from '@/components/ui/card';
import { useCampaignReports } from '@/hooks/useCampaignReports';
import CampaignReportCard from './CampaignReportCard';
import { BarChart3, TrendingUp, Eye, MousePointer } from 'lucide-react';

interface Props {
  listingId: string;
}

export default function CampaignInsightsPanel({ listingId }: Props) {
  const { data, loading, error } = useCampaignReports(listingId);

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500">Loading campaign insights...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <Card className="p-4 border-red-200 bg-red-50">
          <p className="text-red-600">Error loading insights: {error}</p>
        </Card>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-6">
        <Card className="p-6 text-center">
          <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-3" />
          <p className="text-gray-500 mb-2">No campaign reports available yet</p>
          <p className="text-sm text-gray-400">
            Create some listing offers and they'll appear here once they start getting engagement.
          </p>
        </Card>
      </div>
    );
  }

  // Calculate summary statistics
  const totalViews = data.reduce((sum, report) => sum + report.views, 0);
  const totalClicks = data.reduce((sum, report) => sum + report.clicks, 0);
  const avgCTR = totalViews > 0 ? (totalClicks * 100) / totalViews : 0;

  return (
    <div className="p-6 space-y-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Campaign Insights
        </h2>
        <p className="text-gray-600">Performance metrics for your listing offers</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50">
          <div className="flex items-center gap-3">
            <Eye className="h-8 w-8 text-blue-600" />
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Views</p>
              <p className="text-2xl font-bold text-blue-800">{totalViews}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50">
          <div className="flex items-center gap-3">
            <MousePointer className="h-8 w-8 text-purple-600" />
            <div>
              <p className="text-sm text-purple-600 font-medium">Total Clicks</p>
              <p className="text-2xl font-bold text-purple-800">{totalClicks}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100/50">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-green-600" />
            <div>
              <p className="text-sm text-green-600 font-medium">Avg CTR</p>
              <p className="text-2xl font-bold text-green-800">{avgCTR.toFixed(2)}%</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Individual Reports */}
      <div className="space-y-4">
        <h3 className="text-md font-semibold">Individual Campaign Reports</h3>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {data.map((report) => (
            <CampaignReportCard key={report.id} report={report} />
          ))}
        </div>
      </div>
    </div>
  );
}
