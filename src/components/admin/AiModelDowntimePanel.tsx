
import React, { useEffect, useState } from 'react';
import { useModelDowntimeLogs } from '@/hooks/useModelDowntimeLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Plus, CheckCircle } from 'lucide-react';

export function AiModelDowntimePanel(): JSX.Element {
  const { user } = useAuth();
  const { logs, loading, fetchDowntimeLogs, addDowntimeLog, resolveDowntime } = useModelDowntimeLogs();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newDowntime, setNewDowntime] = useState({
    modelName: '',
    reason: '',
    startedAt: ''
  });

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchDowntimeLogs();
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
          <p>Loading downtime logs...</p>
        </CardContent>
      </Card>
    );
  }

  const handleAddDowntime = async () => {
    if (!newDowntime.modelName || !newDowntime.startedAt) return;
    
    await addDowntimeLog(newDowntime.modelName, newDowntime.reason, newDowntime.startedAt);
    setNewDowntime({ modelName: '', reason: '', startedAt: '' });
    setShowAddForm(false);
  };

  const getDuration = (startedAt: string, resolvedAt: string | null) => {
    const start = new Date(startedAt);
    const end = resolvedAt ? new Date(resolvedAt) : new Date();
    const diffMs = end.getTime() - start.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 60) return `${diffMins}m`;
    const hours = Math.floor(diffMins / 60);
    const mins = diffMins % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Model Downtime Logs ({logs.length})
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1 px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition text-sm"
          >
            <Plus className="h-3 w-3" />
            Add
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {showAddForm && (
            <div className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-medium mb-3">Add Downtime Log</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  placeholder="Model Name"
                  value={newDowntime.modelName}
                  onChange={(e) => setNewDowntime({...newDowntime, modelName: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <input
                  type="datetime-local"
                  value={newDowntime.startedAt}
                  onChange={(e) => setNewDowntime({...newDowntime, startedAt: e.target.value})}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <input
                type="text"
                placeholder="Downtime Reason"
                value={newDowntime.reason}
                onChange={(e) => setNewDowntime({...newDowntime, reason: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 mb-3"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleAddDowntime}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition"
                >
                  Add Downtime
                </button>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {logs.length === 0 ? (
            <p className="text-gray-500">No downtime logs found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-2 text-left">Model</th>
                    <th className="border border-gray-200 p-2 text-left">Reason</th>
                    <th className="border border-gray-200 p-2 text-left">Started</th>
                    <th className="border border-gray-200 p-2 text-left">Duration</th>
                    <th className="border border-gray-200 p-2 text-left">Status</th>
                    <th className="border border-gray-200 p-2 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-2 font-medium">
                        {log.model_name}
                      </td>
                      <td className="border border-gray-200 p-2 text-sm">
                        {log.downtime_reason || 'No reason provided'}
                      </td>
                      <td className="border border-gray-200 p-2 text-sm">
                        {new Date(log.started_at).toLocaleString()}
                      </td>
                      <td className="border border-gray-200 p-2 text-sm">
                        {getDuration(log.started_at, log.resolved_at)}
                      </td>
                      <td className="border border-gray-200 p-2">
                        {log.resolved_at ? (
                          <span className="text-green-600 font-medium">Resolved</span>
                        ) : (
                          <span className="text-red-600 font-medium">Active</span>
                        )}
                      </td>
                      <td className="border border-gray-200 p-2">
                        {!log.resolved_at && (
                          <button
                            onClick={() => resolveDowntime(log.id)}
                            className="flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 transition"
                          >
                            <CheckCircle className="h-3 w-3" />
                            Resolve
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
