
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Zap, Video, FileText, Shield, GitBranch, Download, Target } from 'lucide-react';

interface AiTool {
  id: string;
  name: string;
  icon: React.ReactNode;
  enabled: boolean;
  creditCost: number;
  usage: number;
  description: string;
}

export const AdminToolsOverviewPanel: React.FC = () => {
  const [tools, setTools] = useState<AiTool[]>([
    {
      id: 'video-generator',
      name: 'AI Video Generator',
      icon: <Video className="h-5 w-5" />,
      enabled: true,
      creditCost: 15,
      usage: 145,
      description: 'Generate property videos from listings'
    },
    {
      id: 'pricing-suggestions',
      name: 'Smart Pricing Engine',
      icon: <Target className="h-5 w-5" />,
      enabled: true,
      creditCost: 25,
      usage: 98,
      description: 'AI-powered property pricing recommendations'
    },
    {
      id: 'locality-reports',
      name: 'Locality Reports',
      icon: <FileText className="h-5 w-5" />,
      enabled: true,
      creditCost: 30,
      usage: 67,
      description: 'Generate detailed locality market insights'
    },
    {
      id: 'fraud-detection',
      name: 'Fraud Detection',
      icon: <Shield className="h-5 w-5" />,
      enabled: true,
      creditCost: 10,
      usage: 23,
      description: 'Automated listing fraud detection'
    },
    {
      id: 'brochure-matcher',
      name: 'Brochure Matcher',
      icon: <FileText className="h-5 w-5" />,
      enabled: true,
      creditCost: 25,
      usage: 34,
      description: 'Match properties from brochure uploads'
    },
    {
      id: 'title-chain',
      name: 'Title Chain Visualizer',
      icon: <GitBranch className="h-5 w-5" />,
      enabled: false,
      creditCost: 20,
      usage: 12,
      description: 'Generate property title chain visualization'
    },
    {
      id: 'resume-tracker',
      name: 'Resume Download Tracker',
      icon: <Download className="h-5 w-5" />,
      enabled: true,
      creditCost: 0,
      usage: 156,
      description: 'Track agent resume downloads and analytics'
    }
  ]);

  const toggleTool = (toolId: string) => {
    setTools(tools.map(tool => 
      tool.id === toolId ? { ...tool, enabled: !tool.enabled } : tool
    ));
  };

  const totalCreditsUsed = tools.reduce((sum, tool) => sum + (tool.usage * tool.creditCost), 0);
  const enabledTools = tools.filter(tool => tool.enabled).length;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-orange-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Zap className="h-8 w-8 text-orange-600" />
              <div>
                <div className="text-2xl font-bold text-orange-600">{enabledTools}</div>
                <div className="text-sm text-gray-600">Active AI Tools</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Target className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-600">{totalCreditsUsed}</div>
                <div className="text-sm text-gray-600">Credits Consumed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Video className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-600">{tools.reduce((sum, tool) => sum + tool.usage, 0)}</div>
                <div className="text-sm text-gray-600">Total Usage</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-gray-700">AI Tools Management</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tools.map((tool) => (
              <div key={tool.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-orange-600">{tool.icon}</div>
                  <div>
                    <div className="font-medium">{tool.name}</div>
                    <div className="text-sm text-gray-600">{tool.description}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-center">
                    <div className="text-sm font-medium">{tool.creditCost} credits</div>
                    <div className="text-xs text-gray-500">per use</div>
                  </div>
                  
                  <Badge variant="secondary">{tool.usage} uses</Badge>
                  
                  <Switch
                    checked={tool.enabled}
                    onCheckedChange={() => toggleTool(tool.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
