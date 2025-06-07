
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Eye, MousePointer, TrendingUp, Calendar } from 'lucide-react';

interface Props {
  report: {
    id: string;
    offer_id: string;
    views: number;
    clicks: number;
    ctr: number;
    last_interaction_at: string | null;
    created_at: string;
  };
}

export default function CampaignReportCard({ report }: Props) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString();
  };

  const getCTRBadgeVariant = (ctr: number) => {
    if (ctr >= 5) return 'default';
    if (ctr >= 2) return 'secondary';
    return 'outline';
  };

  const getCTRColor = (ctr: number) => {
    if (ctr >= 5) return 'text-green-600';
    if (ctr >= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card className="p-4 bg-gradient-to-br from-white/90 to-gray-50/90 backdrop-blur-sm border border-white/20 hover:shadow-lg transition-all duration-300">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant={getCTRBadgeVariant(report.ctr)} className="font-semibold">
            CTR: <span className={getCTRColor(report.ctr)}>{report.ctr?.toFixed(2)}%</span>
          </Badge>
          <TrendingUp className="h-4 w-4 text-gray-400" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-blue-500" />
            <div>
              <p className="text-xs text-gray-500">Views</p>
              <p className="font-semibold">{report.views}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <MousePointer className="h-4 w-4 text-purple-500" />
            <div>
              <p className="text-xs text-gray-500">Clicks</p>
              <p className="font-semibold">{report.clicks}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
          <Calendar className="h-3 w-3 text-gray-400" />
          <p className="text-xs text-gray-500">
            Last Active: {formatDate(report.last_interaction_at)}
          </p>
        </div>

        <div className="text-xs text-gray-400">
          Offer ID: {report.offer_id.slice(0, 8)}...
        </div>
      </div>
    </Card>
  );
}
