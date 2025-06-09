
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Sparkles, Download } from 'lucide-react';
import { useAiImageEnhancer } from '@/hooks/useAiImageEnhancer';
import { AiCreditTooltip } from './AiCreditTooltip';
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
    <div className="space-y-6">
      <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 shadow-lg hover:shadow-xl hover:shadow-orange-200/50 transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-600">
            <Sparkles className="mr-2 h-5 w-5" />
            AI Image Enhancer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Image URL</label>
            <Input
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="border-orange-200 focus:border-orange-500"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Enhancement Style</label>
            <Select value={style} onValueChange={setStyle}>
              <SelectTrigger className="border-orange-200 focus:border-orange-500">
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
              className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Upload className="mr-2 h-4 w-4" />
              {loading ? 'Enhancing...' : 'Enhance Image (150 credits)'}
            </Button>
          </AiCreditTooltip>
        </CardContent>
      </Card>

      {enhancements.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-700">Enhancement History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {enhancements.map((enhancement) => (
                <div key={enhancement.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={enhancement.input_image_url} 
                        alt="Original" 
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium">{enhancement.style} Enhancement</div>
                        <div className="text-sm text-gray-500">
                          {new Date(enhancement.created_at).toLocaleDateString()}
                        </div>
                        <div className={`text-xs px-2 py-1 rounded-full inline-block ${
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
                    <div className="flex items-center space-x-2">
                      <img 
                        src={enhancement.output_image_url} 
                        alt="Enhanced" 
                        className="w-16 h-16 object-cover rounded"
                      />
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
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
