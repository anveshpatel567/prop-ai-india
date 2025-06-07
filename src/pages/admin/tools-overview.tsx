
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { 
  Video, 
  Target, 
  FileText, 
  Shield, 
  GitBranch, 
  Download, 
  Zap,
  TrendingUp,
  Users,
  Activity
} from 'lucide-react';

interface AiTool {
  id: string;
  name: string;
  icon: React.ReactNode;
  enabled: boolean;
  creditCost: number;
  usage: number;
  lastUsed: string;
  description: string;
}

export default function AdminToolsOverviewPage() {
  const [tools, setTools] = React.useState<AiTool[]>([
    {
      id: 'video-generator',
      name: 'AI Video Generator',
      icon: <Video className="h-5 w-5" />,
      enabled: true,
      creditCost: 15,
      usage: 145,
      lastUsed: '2 hours ago',
      description: 'Generate property videos from listings'
    },
    {
      id: 'pricing-suggestions',
      name: 'Smart Pricing Engine',
      icon: <Target className="h-5 w-5" />,
      enabled: true,
      creditCost: 25,
      usage: 98,
      lastUsed: '4 hours ago',
      description: 'AI-powered property pricing recommendations'
    },
    {
      id: 'locality-reports',
      name: 'Locality Reports',
      icon: <FileText className="h-5 w-5" />,
      enabled: true,
      creditCost: 30,
      usage: 67,
      lastUsed: '1 day ago',
      description: 'Generate detailed locality market insights'
    },
    {
      id: 'fraud-detection',
      name: 'Fraud Detection',
      icon: <Shield className="h-5 w-5" />,
      enabled: true,
      creditCost: 10,
      usage: 23,
      lastUsed: '6 hours ago',
      description: 'Automated listing fraud detection'
    },
    {
      id: 'brochure-matcher',
      name: 'Brochure Matcher',
      icon: <FileText className="h-5 w-5" />,
      enabled: true,
      creditCost: 25,
      usage: 34,
      lastUsed: '3 hours ago',
      description: 'Match properties from brochure uploads'
    },
    {
      id: 'title-chain',
      name: 'Title Chain Visualizer',
      icon: <GitBranch className="h-5 w-5" />,
      enabled: true,
      creditCost: 20,
      usage: 12,
      lastUsed: '2 days ago',
      description: 'Generate property title chain visualization'
    },
    {
      id: 'resume-tracker',
      name: 'Resume Download Tracker',
      icon: <Download className="h-5 w-5" />,
      enabled: true,
      creditCost: 0,
      usage: 156,
      lastUsed: '1 hour ago',
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
  const totalUsage = tools.reduce((sum, tool) => sum + tool.usage, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI Tools Overview</h1>
          <p className="text-gray-600">
            Monitor and manage all AI-powered features and tools
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-orange-200 hover:shadow-lg hover:shadow-orange-200/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Zap className="h-8 w-8 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold text-orange-600">{enabledTools}</div>
                  <div className="text-sm text-gray-600">Active Tools</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-200 hover:shadow-lg hover:shadow-green-200/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-600">{totalCreditsUsed}</div>
                  <div className="text-sm text-gray-600">Credits Used</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-200 hover:shadow-lg hover:shadow-blue-200/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Users className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">{totalUsage}</div>
                  <div className="text-sm text-gray-600">Total Usage</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-200 hover:shadow-lg hover:shadow-purple-200/50 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Activity className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-purple-600">24h</div>
                  <div className="text-sm text-gray-600">Avg Response</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Card key={tool.id} className="border hover:shadow-lg hover:shadow-orange-200/30 transition-all duration-300 group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-orange-600 group-hover:scale-110 transition-transform duration-300">
                      {tool.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      <p className="text-sm text-gray-600">{tool.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={tool.enabled}
                    onCheckedChange={() => toggleTool(tool.id)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-orange-600">{tool.creditCost}</div>
                    <div className="text-xs text-gray-500">Credits/Use</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-blue-600">{tool.usage}</div>
                    <div className="text-xs text-gray-500">Total Uses</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-green-600">{tool.lastUsed}</div>
                    <div className="text-xs text-gray-500">Last Used</div>
                  </div>
                </div>
                <div className="mt-4">
                  <Badge 
                    variant={tool.enabled ? "default" : "secondary"}
                    className={tool.enabled ? "bg-green-100 text-green-800" : ""}
                  >
                    {tool.enabled ? "Active" : "Disabled"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
