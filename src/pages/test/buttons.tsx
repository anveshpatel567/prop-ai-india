
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/layout/Navbar';

export default function ButtonsTestPage() {
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  const handleButtonClick = (buttonId: string) => {
    setClickedButton(buttonId);
    setTimeout(() => setClickedButton(null), 1000);
  };

  return (
    <div className="min-h-screen bg-[#fff7f0]">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] bg-clip-text text-transparent">
              Button Components Visual Test
            </h1>
            <p className="text-[#8b4513]">
              Testing fiery gradients, glow hover effects, and click behaviors
            </p>
          </div>

          {/* Primary Buttons with Gradients */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(255,102,0,0.45)]">
            <CardHeader>
              <CardTitle className="text-[#2d0000]">Primary Gradient Buttons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  className="bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] text-white hover:from-[#ff3c00] hover:to-[#ff6a00] shadow-[0_0_30px_rgba(255,102,0,0.45)] hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] transition-all duration-300 transform hover:scale-105"
                  onClick={() => handleButtonClick('primary-1')}
                >
                  ⚡ Start AI Analysis
                  {clickedButton === 'primary-1' && (
                    <span className="ml-2 text-xs">✓</span>
                  )}
                </Button>

                <Button
                  className="bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] text-white hover:from-[#ff3c00] hover:to-[#ff6a00] shadow-[0_0_30px_rgba(255,102,0,0.45)] hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] transition-all duration-300 transform hover:scale-105"
                  onClick={() => handleButtonClick('primary-2')}
                >
                  🎥 Generate Video
                  {clickedButton === 'primary-2' && (
                    <span className="ml-2 text-xs">✓</span>
                  )}
                </Button>

                <Button
                  className="bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] text-white hover:from-[#ff3c00] hover:to-[#ff6a00] shadow-[0_0_30px_rgba(255,102,0,0.45)] hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] transition-all duration-300 transform hover:scale-105"
                  onClick={() => handleButtonClick('primary-3')}
                >
                  🎯 Smart Pricing
                  {clickedButton === 'primary-3' && (
                    <span className="ml-2 text-xs">✓</span>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* AI Tool Buttons */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(255,102,0,0.45)]">
            <CardHeader>
              <CardTitle className="text-[#2d0000]">AI Tool Action Buttons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] text-white text-xs hover:shadow-md"
                  onClick={() => handleButtonClick('ai-1')}
                >
                  🎥 Video (15₹)
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#ff4500] text-[#ff4500] text-xs hover:bg-gradient-to-r hover:from-[#ff3c00] hover:to-[#ff6a00] hover:text-white"
                  onClick={() => handleButtonClick('ai-2')}
                >
                  🎯 Pricing (25₹)
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#ff4500] text-[#ff4500] text-xs hover:bg-gradient-to-r hover:from-[#ff3c00] hover:to-[#ff6a00] hover:text-white"
                  onClick={() => handleButtonClick('ai-3')}
                >
                  🛡️ Fraud (10₹)
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#ff4500] text-[#ff4500] text-xs hover:bg-gradient-to-r hover:from-[#ff3c00] hover:to-[#ff6a00] hover:text-white"
                  onClick={() => handleButtonClick('ai-4')}
                >
                  📄 SEO (10₹)
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="border-[#ff4500] text-[#ff4500] text-xs hover:bg-gradient-to-r hover:from-[#ff3c00] hover:to-[#ff6a00] hover:text-white"
                  onClick={() => handleButtonClick('ai-5')}
                >
                  📍 Locality (30₹)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Interactive States */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(255,102,0,0.45)]">
            <CardHeader>
              <CardTitle className="text-[#2d0000]">Interactive Button States</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button
                  className="bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] hover:scale-110 transition-all duration-300"
                  onClick={() => handleButtonClick('heart')}
                >
                  ❤️
                </Button>

                <Button
                  className="bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] hover:scale-110 transition-all duration-300"
                  onClick={() => handleButtonClick('share')}
                >
                  📤
                </Button>

                <Button
                  className="bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] hover:scale-110 transition-all duration-300"
                  onClick={() => handleButtonClick('view')}
                >
                  👁️
                </Button>

                <Button
                  className="bg-gradient-to-r from-[#ff6a00] to-[#ff0000] rounded-full hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] hover:scale-110 transition-all duration-300"
                  onClick={() => handleButtonClick('search')}
                >
                  🔍
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* CTA Buttons */}
          <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-[0_0_30px_rgba(255,102,0,0.45)]">
            <CardHeader>
              <CardTitle className="text-[#2d0000]">Call-to-Action Buttons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button
                  className="w-full bg-gradient-to-r from-[#ff6a00] via-[#ff3c00] to-[#ff0000] text-white hover:from-[#ff3c00] hover:to-[#ff6a00] shadow-[0_0_30px_rgba(255,102,0,0.45)] hover:shadow-[0_0_40px_rgba(255,102,0,0.6)] transition-all duration-300 transform hover:scale-105 py-4 text-lg font-bold pulse-glow"
                  onClick={() => handleButtonClick('cta-primary')}
                >
                  🚀 Start Your AI Journey
                </Button>

                <Button
                  variant="outline"
                  className="w-full border-[#ff4500] text-[#ff4500] hover:bg-gradient-to-r hover:from-[#ff3c00] hover:to-[#ff6a00] hover:text-white py-4 text-lg font-bold transition-all duration-300"
                  onClick={() => handleButtonClick('cta-secondary')}
                >
                  📚 Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
