
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Sparkles, Download } from 'lucide-react';
import { useAiImageEnhancer } from '@/hooks/useAiImageEnhancer';
import { AiCreditTooltip } from './AiCreditTooltip';
import { CreditStatusIndicator } from './CreditStatusIndicator';
import { AiToolHelp } from './AiToolHelp';
import { useCreditStatus } from '@/hooks/useCreditStatus';

export const ImageEnhancerPanel: React.FC = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [style, setStyle] = useState('HD');
  const { loading, enhancements, enhanceImage } = useAiImageEnhancer();
  const { userCredits } = useCreditStatus();

  const handleEnhance = async () => {
    if (!imageUrl.trim()) return;
    
    await enhanceImage({
      input_image_url: imageUrl,
      style
    });
    
    setImageUrl('');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card className="relative border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg hover:shadow-xl hover:shadow-orange-200/50 transition-all duration-300">
        <CreditStatusIndicator />
        <AiToolHelp 
          toolName="AI Image Enhancer"
          description="Transform your property images with AI-powered upscaling, sharpening, and professional enhancement. Perfect for making listings stand out."
        />
        
        <CardHeader className="pt-12 pb-4">
          <CardTitle className="flex items-center text-orange-600 text-lg sm:text-xl">
            <Sparkles className="mr-2 h-5 w-5" />
            AI Image Enhancer
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4 px-4 sm:px-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Image URL</label>
            <Input
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="border-orange-200 focus:border-orange-500 text-sm sm:text-base"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Enhancement Style</label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger className="border-orange-200 focus:border-orange-500 h-10 sm:h-11">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HD">HD Enhancement</SelectItem>
                <SelectItem value="Sharpened">AI Sharpened</SelectItem>
                <SelectItem value="AI Cleaned">AI Cleaned</SelectItem>
                <SelectItem value="Professional">Professional Grade</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <AiCreditTooltip
            credits_required={150}
            tool_name="AI Image Enhancer"
            user_credits={userCredits}
          >
            <Button 
              onClick={handleEnhance}
              disabled={loading || !imageUrl.trim()}
              className="w-full h-11 sm:h-12 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base"
            >
              <Upload className="mr-2 h-4 w-4" />
              {loading ? 'Enhancing...' : 'Enhance Image (150 credits)'}
            </Button>
          </AiCreditTooltip>
        </CardContent>
      </Card>

      {enhancements.length > 0 && (
        <Card className="border border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-gray-700 text-lg">Enhancement History</CardTitle>
          </CardHeader>
          <CardContent className="px-4 sm:px-6">
            <div className="space-y-3 sm:space-y-4">
              {enhancements.map((enhancement) => (
                <div key={enhancement.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border rounded-lg space-y-3 sm:space-y-0">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                      <img 
                        src={enhancement.input_image_url} 
                        alt="Original" 
                        className="w-full sm:w-16 h-32 sm:h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm sm:text-base">{enhancement.style} Enhancement</div>
                        <div className="text-xs sm:text-sm text-gray-500">
                          {new Date(enhancement.created_at).toLocaleDateString()}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full inline-block mt-1 ${
                          enhancement.status === 'completed' ? 'bg-green-100 text-green-700' :
                          enhancement.status === 'processing' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {enhancement.status}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {enhancement.output_image_url && (
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
                      <img 
                        src={enhancement.output_image_url} 
                        alt="Enhanced" 
                        className="w-full sm:w-16 h-32 sm:h-16 object-cover rounded"
                      />
                      <Button variant="outline" size="sm" className="w-full sm:w-auto min-h-[44px]">
                        <Download className="h-4 w-4 sm:mr-2" />
                        <span className="hidden sm:inline">Download</span>
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
