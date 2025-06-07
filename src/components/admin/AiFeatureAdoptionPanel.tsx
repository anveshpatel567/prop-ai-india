
import React, { useEffect } from 'react';
import { useAiFeatureAdoptionLogs } from '@/hooks/useAiFeatureAdoptionLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, CheckCircle, XCircle, Clock } from 'lucide-react';

export default function AiFeatureAdoptionPanel() {
  const { user } = useAuth();
  const { adoptionLogs, loading, fetchAdoptionLogs, getAdoptionRate } = useAiFeatureAdoptionLogs();

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchAdoptionLogs();
    }
  }, [user?.role]);

  if (!user || user.role !== 'admin') {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-gray-500">Access restricted to administrators only.</p>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <p>Loading feature adoption logs...</p>
        </CardContent>
      </Card>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'enabled': return 'bg-green-100 text-green-700';
      case 'ignored': return 'bg-red-100 text-red-700';
      case 'delayed': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'enabled': return <CheckCircle className="h-3 w-3" />;
      case 'ignored': return <XCircle className="h-3 w-3" />;
      case 'delayed': return <Clock className="h-3 w-3" />;
      default: return null;
    }
  };

  const uniqueFeatures = [...new Set(adoptionLogs.map(log => log.feature_name))];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          AI Feature Adoption ({adoptionLogs.length} logs)
        </CardTitle>
        <div className="flex items-center gap-4 flex-wrap">
          {uniqueFeatures.slice(0, 3).map(feature => (
            <Badge key={feature} className="bg-blue-100 text-blue-700 text-sm">
              <TrendingUp className="h-3 w-3 mr-1" />
              {feature}: {getAdoptionRate(feature).toFixed(1)}% adoption
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent>
        {adoptionLogs.length === 0 ? (
          <p className="text-gray-500">No feature adoption logs available yet.</p>
        ) : (
          <div className="space-y-4">
            {adoptionLogs.map((log) => (
              <div
                key={log.id}
                className="p-4 border rounded-lg bg-gradient-to-br from-white to-gray-50"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {log.feature_name}
                    </Badge>
                    <Badge className={`text-xs ${getStatusColor(log.adoption_status)}`}>
                      {getStatusIcon(log.adoption_status)}
                      <span className="ml-1">{log.adoption_status}</span>
                    </Badge>
                  </div>
                  <div className="text-xs text-gray-500">
                    {new Date(log.adopted_at).toLocaleDateString()}
                  </div>
                </div>
                
                {log.reason && (
                  <div className="text-sm bg-blue-50 p-3 rounded">
                    <strong>Reason:</strong> {log.reason}
                  </div>
                )}
                
                <div className="mt-2 text-xs text-gray-600">
                  User: {log.user_id.slice(0, 8)}...
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
