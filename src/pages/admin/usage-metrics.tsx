
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  Users, 
  DollarSign, 
  Activity, 
  Shield, 
  Download,
  TrendingUp,
  Eye
} from 'lucide-react';

export default function AdminUsageMetricsPage() {
  const metrics = {
    totalUsers: 1247,
    totalCreditsUsed: 8456,
    recentVisits: 567,
    fraudFlags: 23,
    resumeDownloads: 189,
    avgResponseTime: 1.2
  };

  const topTools = [
    { name: 'Video Generation', usage: 145, trend: '+12%' },
    { name: 'Pricing Suggestions', usage: 98, trend: '+8%' },
    { name: 'Locality Reports', usage: 67, trend: '+15%' },
    { name: 'Fraud Detection', usage: 23, trend: '+25%' },
    { name: 'Resume Tracker', usage: 156, trend: '+5%' }
  ];

  const usageByHour = [
    { hour: '00', usage: 12 },
    { hour: '06', usage: 8 },
    { hour: '12', usage: 45 },
    { hour: '18', usage: 67 },
    { hour: '24', usage: 23 }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Usage Analytics</h1>
          <p className="text-gray-600">
            Monitor platform usage, user engagement, and AI tool performance
          </p>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="border-blue-200 hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Users className="h-6 w-6 text-blue-600" />
                <div>
                  <div className="text-xl font-bold text-blue-600">{metrics.totalUsers}</div>
                  <div className="text-xs text-gray-600">Total Users</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg hover:shadow-green-200/50 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-6 w-6 text-green-600" />
                <div>
                  <div className="text-xl font-bold text-green-600">{metrics.totalCreditsUsed}</div>
                  <div className="text-xs text-gray-600">Credits Used</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 hover:shadow-lg hover:shadow-orange-200/50 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Eye className="h-6 w-6 text-orange-600" />
                <div>
                  <div className="text-xl font-bold text-orange-600">{metrics.recentVisits}</div>
                  <div className="text-xs text-gray-600">Weekly Visits</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 hover:shadow-lg hover:shadow-red-200/50 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-red-600" />
                <div>
                  <div className="text-xl font-bold text-red-600">{metrics.fraudFlags}</div>
                  <div className="text-xs text-gray-600">Fraud Flags</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 hover:shadow-lg hover:shadow-purple-200/50 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Download className="h-6 w-6 text-purple-600" />
                <div>
                  <div className="text-xl font-bold text-purple-600">{metrics.resumeDownloads}</div>
                  <div className="text-xs text-gray-600">Resume DLs</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-teal-200 hover:shadow-lg hover:shadow-teal-200/50 transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <Activity className="h-6 w-6 text-teal-600" />
                <div>
                  <div className="text-xl font-bold text-teal-600">{metrics.avgResponseTime}s</div>
                  <div className="text-xs text-gray-600">Avg Response</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top AI Tools Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-700">
                <BarChart3 className="mr-2 h-5 w-5" />
                Top AI Tools Usage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topTools.map((tool, index) => (
                  <div key={tool.name} className="flex items-center justify-between p-3 border rounded-lg hover:bg-orange-50 transition-colors">
                    <div className="flex items-center space-x-3">
                      <Badge variant="outline" className="bg-orange-100 text-orange-700">
                        #{index + 1}
                      </Badge>
                      <span className="font-medium">{tool.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-lg font-bold text-orange-600">{tool.usage}</div>
                      <Badge variant="secondary" className="text-green-600 bg-green-100">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {tool.trend}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Usage by Time */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-gray-700">
                <Activity className="mr-2 h-5 w-5" />
                Usage by Time (24h)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {usageByHour.map((data) => (
                  <div key={data.hour} className="flex items-center space-x-4">
                    <div className="w-12 text-sm font-medium text-gray-600">{data.hour}:00</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3 relative overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-500"
                        style={{ width: `${(data.usage / 67) * 100}%` }}
                      />
                    </div>
                    <div className="w-12 text-sm font-bold text-orange-600">{data.usage}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Activity Feed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-gray-700">
              <Activity className="mr-2 h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border-l-4 border-l-green-500 bg-green-50 rounded">
                <span className="text-sm">User generated AI video for property #1234</span>
                <span className="text-xs text-gray-500">2 min ago</span>
              </div>
              <div className="flex items-center justify-between p-3 border-l-4 border-l-blue-500 bg-blue-50 rounded">
                <span className="text-sm">Agent resume downloaded by seeker</span>
                <span className="text-xs text-gray-500">5 min ago</span>
              </div>
              <div className="flex items-center justify-between p-3 border-l-4 border-l-orange-500 bg-orange-50 rounded">
                <span className="text-sm">AI pricing suggestion accepted</span>
                <span className="text-xs text-gray-500">8 min ago</span>
              </div>
              <div className="flex items-center justify-between p-3 border-l-4 border-l-red-500 bg-red-50 rounded">
                <span className="text-sm">Fraud flag raised for listing #5678</span>
                <span className="text-xs text-gray-500">12 min ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
