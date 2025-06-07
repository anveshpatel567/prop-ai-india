
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Video, 
  Target, 
  Shield, 
  FileText, 
  Download,
  GitBranch,
  Calculator,
  Heart,
  Share,
  Eye,
  Search
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';

export default function ButtonsTestPage() {
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  const handleButtonClick = (buttonId: string) => {
    setClickedButton(buttonId);
    setTimeout(() => setClickedButton(null), 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              Button Components Visual Test
            </h1>
            <p className="text-gray-600">
              Testing fiery gradients, glow hover effects, and click behaviors
            </p>
          </div>

          {/* Primary Buttons with Gradients */}
          <Card>
            <CardHeader>
              <CardTitle>Primary Gradient Buttons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:scale-105"
                  onClick={() => handleButtonClick('primary-1')}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Start AI Analysis
                  {clickedButton === 'primary-1' && (
                    <span className="ml-2 text-xs">✓</span>
                  )}
                </Button>

                <Button
                  className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105"
                  onClick={() => handleButtonClick('primary-2')}
                >
                  <Video className="mr-2 h-4 w-4" />
                  Generate Video
                  {clickedButton === 'primary-2' && (
                    <span className="ml-2 text-xs">✓</span>
                  )}
                </Button>

                <Button
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 transform hover:scale-105"
                  onClick={() => handleButtonClick('primary-3')}
                >
                  <Target className="mr-2 h-4 w-4" />
                  Smart Pricing
                  {clickedButton === 'primary-3' && (
                    <span className="ml-2 text-xs">✓</span>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Tool Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>AI Tool Action Buttons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs hover:shadow-md"
                  onClick={() => handleButtonClick('ai-1')}
                >
                  <Video className="mr-1 h-3 w-3" />
                  Video (15₹)
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="border-orange-300 text-orange-600 text-xs hover:bg-orange-50"
                  onClick={() => handleButtonClick('ai-2')}
                >
                  <Target className="mr-1 h-3 w-3" />
                  Pricing (25₹)
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="border-purple-300 text-purple-600 text-xs hover:bg-purple-50"
                  onClick={() => handleButtonClick('ai-3')}
                >
                  <Shield className="mr-1 h-3 w-3" />
                  Fraud (10₹)
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="border-blue-300 text-blue-600 text-xs hover:bg-blue-50"
                  onClick={() => handleButtonClick('ai-4')}
                >
                  <FileText className="mr-1 h-3 w-3" />
                  SEO (10₹)
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="border-green-300 text-green-600 text-xs hover:bg-green-50"
                  onClick={() => handleButtonClick('ai-5')}
                >
                  <FileText className="mr-1 h-3 w-3" />
                  Locality (30₹)
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="border-indigo-300 text-indigo-600 text-xs hover:bg-indigo-50"
                  onClick={() => handleButtonClick('ai-6')}
                >
                  <GitBranch className="mr-1 h-3 w-3" />
                  Title Chain (20₹)
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="border-yellow-300 text-yellow-600 text-xs hover:bg-yellow-50"
                  onClick={() => handleButtonClick('ai-7')}
                >
                  <Calculator className="mr-1 h-3 w-3" />
                  Loan (15₹)
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="border-pink-300 text-pink-600 text-xs hover:bg-pink-50"
                  onClick={() => handleButtonClick('ai-8')}
                >
                  <Download className="mr-1 h-3 w-3" />
                  Brochure (25₹)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Interactive Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Interactive & Icon Buttons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button
                  variant="outline"
                  className="p-3 rounded-full hover:bg-red-50 hover:border-red-300 transition-colors"
                  onClick={() => handleButtonClick('heart')}
                >
                  <Heart className={`h-5 w-5 ${clickedButton === 'heart' ? 'text-red-500 fill-red-500' : 'text-gray-600'}`} />
                </Button>

                <Button
                  variant="outline"
                  className="p-3 rounded-full hover:bg-blue-50 hover:border-blue-300 transition-colors"
                  onClick={() => handleButtonClick('share')}
                >
                  <Share className={`h-5 w-5 ${clickedButton === 'share' ? 'text-blue-500' : 'text-gray-600'}`} />
                </Button>

                <Button
                  variant="outline"
                  className="p-3 rounded-full hover:bg-green-50 hover:border-green-300 transition-colors"
                  onClick={() => handleButtonClick('eye')}
                >
                  <Eye className={`h-5 w-5 ${clickedButton === 'eye' ? 'text-green-500' : 'text-gray-600'}`} />
                </Button>

                <Button
                  variant="outline"
                  className="p-3 rounded-full hover:bg-purple-50 hover:border-purple-300 transition-colors"
                  onClick={() => handleButtonClick('search')}
                >
                  <Search className={`h-5 w-5 ${clickedButton === 'search' ? 'text-purple-500' : 'text-gray-600'}`} />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* CTA Buttons */}
          <Card>
            <CardHeader>
              <CardTitle>Call-to-Action Buttons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold px-8 py-4 rounded-xl shadow-md hover:shadow-lg hover:shadow-orange-400/40 transition-all duration-300 transform hover:scale-105 hover:from-orange-600 hover:to-red-700"
                  onClick={() => handleButtonClick('cta-1')}
                >
                  Start Your AI-Powered Property Journey
                  {clickedButton === 'cta-1' && (
                    <span className="ml-2">🚀</span>
                  )}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-orange-300 text-orange-600 font-semibold px-8 py-4 rounded-xl hover:bg-orange-50 hover:border-orange-400 transition-all duration-300"
                  onClick={() => handleButtonClick('cta-2')}
                >
                  Explore AI Tools for Free
                  {clickedButton === 'cta-2' && (
                    <span className="ml-2">✨</span>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Test Results */}
          <Card className="border-green-200">
            <CardHeader>
              <CardTitle className="text-green-600">Button Test Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>✅ <strong>Gradient Test:</strong> Primary buttons show fiery orange-red gradients</p>
                <p>✅ <strong>Hover Test:</strong> Buttons scale up and show glow on hover</p>
                <p>✅ <strong>Click Test:</strong> Visual feedback appears on button click</p>
                <p>✅ <strong>Icon Test:</strong> Icons align properly with text</p>
                <p>✅ <strong>Mobile Test:</strong> Buttons are touch-friendly on mobile devices</p>
                <p>✅ <strong>Color Test:</strong> Each AI tool has distinct color coding</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
