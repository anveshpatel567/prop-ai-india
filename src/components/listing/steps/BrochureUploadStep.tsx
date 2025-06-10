
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileText, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useParsedBrochure } from '@/hooks/useParsedBrochure';

interface BrochureUploadStepProps {
  data: any;
  onDataChange: (data: any) => void;
  onNext: () => void;
}

export const BrochureUploadStep: React.FC<BrochureUploadStepProps> = ({ data, onDataChange, onNext }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadMode, setUploadMode] = useState<'manual' | 'ai'>('ai');
  const { parsing, parsedData, parseBrochure } = useParsedBrochure();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  const handleParseBrochure = async () => {
    if (!selectedFile) return;

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        const result = await parseBrochure(text);
        if (result) {
          onDataChange({
            brochure_data: result,
            title: result.title || data.title,
            property_type: result.property_type || data.property_type,
            price: result.price || data.price,
            city: result.city || data.city,
            locality: result.locality || data.locality,
            amenities: result.amenities || data.amenities,
            description: result.description || data.description
          });
        }
      };
      reader.readAsText(selectedFile);
    } catch (error) {
      console.error('Error parsing brochure:', error);
    }
  };

  const skipBrochure = () => {
    onNext();
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Upload Property Brochure (Optional)</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          variant={uploadMode === 'ai' ? 'default' : 'outline'}
          onClick={() => setUploadMode('ai')}
          className="flex items-center gap-2"
        >
          <Sparkles className="h-4 w-4" />
          AI-Powered Parsing
        </Button>
        <Button
          variant={uploadMode === 'manual' ? 'default' : 'outline'}
          onClick={() => setUploadMode('manual')}
          className="flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          Manual Upload
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {uploadMode === 'ai' ? 'AI Brochure Parser' : 'Manual Upload'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <Input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileSelect}
              className="hidden"
              id="brochure-upload"
            />
            <label htmlFor="brochure-upload" className="cursor-pointer">
              <span className="text-sm text-gray-600">
                {selectedFile ? selectedFile.name : 'Click to upload brochure (PDF, DOC, TXT)'}
              </span>
            </label>
          </div>

          {selectedFile && uploadMode === 'ai' && (
            <Button
              onClick={handleParseBrochure}
              disabled={parsing}
              className="w-full"
            >
              {parsing ? 'Parsing with AI...' : 'Parse with AI (10 Credits)'}
            </Button>
          )}

          {parsedData && (
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">AI Parsing Complete!</h4>
              <p className="text-sm text-green-600">
                Successfully extracted property details from your brochure.
              </p>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" onClick={skipBrochure} className="flex-1">
              Skip This Step
            </Button>
            <Button onClick={onNext} className="flex-1">
              Continue
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
