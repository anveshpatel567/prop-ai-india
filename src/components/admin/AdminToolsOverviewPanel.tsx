
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Brain, Video, DollarSign, Shield, FileText, Users } from 'lucide-react';

export const AdminToolsOverviewPanel: React.FC = () => {
  const aiTools = [
    {
      name: 'AI Resume Generator',
      icon: FileText,
      status: 'active',
      usage: 1247,
      credits: 100,
      color: 'bg-blue-500'
    },
    {
      name: 'AI Negotiation',
      icon: Users,
      status: 'active',
      usage: 892,
      credits: 50,
      color: 'bg-green-500'
    },
    {
      name: 'AI Video Generator',
      icon: Video,
      status: 'active',
      usage: 156,
      credits: 15,
      color: 'bg-red-500'
    },
    {
      name: 'AI Smart Pricing',
      icon: DollarSign,
      status: 'active',
      usage: 334,
      credits: 25,
      color: 'bg-orange-500'
    },
    {
      name: 'AI Fraud Detection',
      icon: Shield,
      status: 'active',
      usage: 67,
      credits: 0,
      color: 'bg-purple-500'
    },
    {
      name: 'Locality Reports',
      icon: Brain,
      status: 'active',
      usage: 289,
      credits: 30,
      color: 'bg-indigo-500'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>AI Tools Overview</CardTitle>
          <CardDescription>Manage and monitor all AI-powered features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aiTools.map((tool) => {
              const IconComponent = tool.icon;
              return (
                <Card key={tool.name} className="relative">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg ${tool.color}`}>
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
                      <Switch defaultChecked={tool.status === 'active'} />
                    </div>
                    
                    <h3 className="font-semibold text-sm mb-2">{tool.name}</h3>
                    
                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="flex justify-between">
                        <span>Usage this month:</span>
                        <Badge variant="secondary">{tool.usage}</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Credit cost:</span>
                        <Badge variant="outline">{tool.credits} credits</Badge>
                      </div>
                    </div>
                    
                    <Button size="sm" variant="outline" className="w-full mt-3">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">₹2,34,567</div>
            <p className="text-sm text-gray-600">Total Credits Sold</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">3,421</div>
            <p className="text-sm text-gray-600">Active AI Sessions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">98.5%</div>
            <p className="text-sm text-gray-600">AI Uptime</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
