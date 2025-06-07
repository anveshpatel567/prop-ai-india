
import React, { useEffect, useState } from 'react';
import { useAdminDecisionLogs } from '@/hooks/useAdminDecisionLogs';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight, Gavel, Filter } from 'lucide-react';

export function AdminDecisionLogPanel(): JSX.Element {
  const { user } = useAuth();
  const { decisionLogs, loading, fetchDecisionLogs } = useAdminDecisionLogs();
  const [moduleFilter, setModuleFilter] = useState('all');
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchDecisionLogs(moduleFilter);
    }
  }, [user?.role, moduleFilter]);

  const toggleModule = (module: string) => {
    setOpenModules(prev => ({
      ...prev,
      [module]: !prev[module]
    }));
  };

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
          <p>Loading admin decision logs...</p>
        </CardContent>
      </Card>
    );
  }

  const modules = Array.from(new Set(decisionLogs.map(log => log.module)));
  const logsByModule = modules.reduce((acc, module) => {
    acc[module] = decisionLogs.filter(log => log.module === module);
    return acc;
  }, {} as Record<string, typeof decisionLogs>);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gavel className="h-5 w-5" />
          Admin Decision History ({decisionLogs.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <select
                  value={moduleFilter}
                  onChange={(e) => setModuleFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <option value="all">All Modules</option>
                  {modules.map((module) => (
                    <option key={module} value={module}>{module}</option>
                  ))}
                </select>
              </div>
            </div>
            <Badge variant="outline" className="bg-blue-50 text-blue-700">
              Modules: {modules.length}
            </Badge>
          </div>

          {decisionLogs.length === 0 ? (
            <p className="text-gray-500">No admin decision logs found.</p>
          ) : (
            <div className="space-y-3">
              {modules.map((module) => (
                <Collapsible
                  key={module}
                  open={openModules[module]}
                  onOpenChange={() => toggleModule(module)}
                >
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-2">
                      {openModules[module] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                      <span className="font-medium text-gray-900">{module}</span>
                      <Badge className="bg-blue-100 text-blue-700">
                        {logsByModule[module].length}
                      </Badge>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2">
                    <div className="space-y-2 ml-6">
                      {logsByModule[module].map((log) => (
                        <div key={log.id} className="border border-gray-200 p-3 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className="bg-purple-100 text-purple-700">
                                {log.action}
                              </Badge>
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(log.decided_at).toLocaleString()}
                            </span>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-medium text-gray-700 mb-1">Decision:</h4>
                            <p className="text-sm text-gray-600 bg-green-50 p-2 rounded">
                              {log.decision}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
