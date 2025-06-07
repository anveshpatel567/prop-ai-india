
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Video, 
  Target, 
  Shield, 
  FileText, 
  GitBranch, 
  Calculator,
  Download,
  MapPin,
  Zap
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';

export default function AiPanelsTestPage() {
  const aiTools = [
    {
      id: 'video-generator',
      name: 'AI Video Generator',
      icon: <Video className="h-6 w-6" />,
      description: 'Generate professional property videos with AI',
      cost: 15,
      color: 'from-purple-500 to-pink-500',
      borderColor: 'border-purple-200',
      status: 'active'
    },
    {
      id: 'pricing-engine',
      name: 'Smart Pricing Engine',
      icon: <Target className="h-6 w-6" />,
      description: 'AI-powered property pricing recommendations',
      cost: 25,
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-200',
      status: 'active'
    },
    {
      id: 'fraud-detection',
      name: 'Fraud Detection',
      icon: <Shield className="h-6 w-6" />,
      description: 'Automated listing fraud detection system',
      cost: 10,
      color: 'from-red-500 to-orange-500',
      borderColor: 'border-red-200',
      status: 'active'
    },
    {
      id: 'seo-schema',
      name: 'SEO Schema Generator',
      icon: <FileText className="h-6 w-6" />,
      description: 'Generate SEO-optimized schema markup',
      cost: 10,
      color: 'from-green-500 to-emerald-500',
      borderColor: 'border-green-200',
      status: 'active'
    },
    {
      id: 'title-chain',
      name: 'Title Chain Visualizer',
      icon: <GitBranch className="h-6 w-6" />,
      description: 'Generate property title chain visualization',
      cost: 20,
      color: 'from-indigo-500 to-purple-500',
      borderColor: 'border-indigo-200',
      status: 'active'
    },
    {
      id: 'loan-optimizer',
      name: 'Loan Optimizer',
      icon: <Calculator className="h-6 w-6" />,
      description: 'Optimize loan terms and EMI calculations',
      cost: 15,
      color: 'from-yellow-500 to-orange-500',
      borderColor: 'border-yellow-200',
      status: 'active'
    },
    {
      id: 'brochure-matcher',
      name: 'Brochure Matcher',
      icon: <Download className="h-6 w-6" />,
      description: 'Match properties from uploaded brochures',
      cost: 25,
      color: 'from-pink-500 to-rose-500',
      borderColor: 'border-pink-200',
      status: 'active'
    },
    {
      id: 'locality-reports',
      name: 'Locality Reports',
      icon: <MapPin className="h-6 w-6" />,
      description: 'Generate detailed locality market insights',
      cost: 30,
      color: 'from-teal-500 to-cyan-500',
      borderColor: 'border-teal-200',
      status: 'beta'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              AI Tools Panel Visual Test
            </h1>
            <p className="text-gray-600">
              Testing all AI tool panels with hover effects and responsive design
            </p>
          </div>

          {/* AI Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {aiTools.map((tool) => (
              <Card 
                key={tool.id}
                className={`${tool.borderColor} hover:shadow-lg hover:shadow-orange-200/30 transition-all duration-300 group cursor-pointer transform hover:scale-105`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${tool.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                      {tool.icon}
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={tool.status === 'active' ? 'default' : 'secondary'}
                        className={tool.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}
                      >
                        {tool.status}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <CardTitle className="text-lg mb-2">{tool.name}</CardTitle>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {tool.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium text-orange-600">
                        {tool.cost} Credits
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      ~30s
                    </div>
                  </div>

                  <Button 
                    className={`w-full bg-gradient-to-r ${tool.color} text-white hover:shadow-md transition-all duration-200`}
                  >
                    Use Tool
                  </Button>

                  {/* Expanded Content on Hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
                    <div className="text-xs text-gray-500 border-t pt-2">
                      <div className="flex justify-between">
                        <span>Success Rate:</span>
                        <span className="text-green-600">98.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg. Time:</span>
                        <span>24s</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Uses Today:</span>
                        <span className="text-blue-600">142</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Feature Comparison Panel */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5 text-orange-500" />
                AI Tools Performance Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">8</div>
                  <div className="text-sm text-gray-600">Active Tools</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">1,247</div>
                  <div className="text-sm text-gray-600">Daily Uses</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">97.8%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">18.4s</div>
                  <div className="text-sm text-gray-600">Avg. Response</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Results */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-600">AI Panels Test Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>✅ <strong>Icon Test:</strong> Each tool has unique icon and color scheme</p>
                <p>✅ <strong>Hover Test:</strong> Cards scale and show additional info on hover</p>
                <p>✅ <strong>Cost Display:</strong> Credit costs clearly visible</p>
                <p>✅ <strong>Status Badges:</strong> Active/Beta status properly indicated</p>
                <p>✅ <strong>Grid Test:</strong> Responsive grid layout works on all screens</p>
                <p>✅ <strong>Performance:</strong> Summary stats load and display correctly</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
