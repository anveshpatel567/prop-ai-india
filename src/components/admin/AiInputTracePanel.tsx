
import React, { useEffect, useState } from 'react';
import { useAiInputTraces } from '@/hooks/useAiInputTraces';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, FileText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export function AiInputTracePanel(): JSX.Element {
  const { user } = useAuth();
  const { traces, loading, fetchTraces, getTracesByLevel } = useAiInputTraces();
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchTraces();
    }
  }, [user?.role]);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchTraces(selectedLevel);
    }
  }, [selectedLevel]);

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
          <p>Loading input traces...</p>
        </CardContent>
      </Card>
    );
  }

  const getBadgeColor = (level: string) => {
    switch (level) {
      case 'info': return 'bg-gray-100 text-gray-700';
      case 'warning': return 'bg-yellow-100 text-yellow-700';
      case 'error': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const truncateInput = (inputData: Record<string, any>): string => {
    const jsonString = JSON.stringify(inputData);
    return jsonString.length > 100 ? jsonString.substring(0, 100) + '...' : jsonString;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          AI Input Trace Logs ({traces.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {traces.length === 0 ? (
          <p className="text-gray-500">No input traces recorded yet.</p>
        ) : (
          <div className="space-y-4">
            <div className="flex gap-2">
              <button
                onClick={() => setSelectedLevel('all')}
                className={`px-3 py-1 rounded ${
                  selectedLevel === 'all' 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedLevel('info')}
                className={`px-3 py-1 rounded ${
                  selectedLevel === 'info' 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition`}
              >
                Info
              </button>
              <button
                onClick={() => setSelectedLevel('warning')}
                className={`px-3 py-1 rounded ${
                  selectedLevel === 'warning' 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition`}
              >
                Warning
              </button>
              <button
                onClick={() => setSelectedLevel('error')}
                className={`px-3 py-1 rounded ${
                  selectedLevel === 'error' 
                    ? 'bg-gray-700 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition`}
              >
                Error
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 p-2 text-left">Feature</th>
                    <th className="border border-gray-200 p-2 text-left">Input</th>
                    <th className="border border-gray-200 p-2 text-left">Level</th>
                    <th className="border border-gray-200 p-2 text-left">Time</th>
                    <th className="border border-gray-200 p-2 text-left">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {traces.map((trace) => (
                    <tr key={trace.id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-2 font-medium">
                        {trace.feature_area}
                      </td>
                      <td className="border border-gray-200 p-2 text-sm">
                        {truncateInput(trace.input_data)}
                      </td>
                      <td className="border border-gray-200 p-2">
                        <Badge className={`text-xs ${getBadgeColor(trace.trace_level)}`}>
                          {trace.trace_level}
                        </Badge>
                      </td>
                      <td className="border border-gray-200 p-2 text-sm text-gray-600">
                        {new Date(trace.logged_at).toLocaleString()}
                      </td>
                      <td className="border border-gray-200 p-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <button className="p-1 text-gray-500 hover:text-gray-700">
                              <FileText className="h-4 w-4" />
                            </button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Input Data - {trace.feature_area}</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4">
                              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
                                {JSON.stringify(trace.input_data, null, 2)}
                              </pre>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
