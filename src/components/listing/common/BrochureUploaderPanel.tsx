
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';
import { useParsedBrochure } from '@/hooks/useParsedBrochure';
import { BrochureFileUpload } from './BrochureFileUpload';
import { BrochureModeSelector } from './BrochureModeSelector';
import { BrochureParsedData } from './BrochureParsedData';
import { BrochureLegalAgreement } from './BrochureLegalAgreement';

export const BrochureUploaderPanel: React.FC = () => {
  const { parsing, parsedData, parseBrochure } = useParsedBrochure();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mode, setMode] = useState<'manual' | 'ai'>('ai');
  const [agreementAccepted, setAgreementAccepted] = useState(false);

  const handleParseBrochure = async () => {
    if (!selectedFile) return;

    if (mode === 'ai') {
      try {
        const reader = new FileReader();
        reader.onload = async (e) => {
          const text = e.target?.result as string;
          await parseBrochure(text);
        };
        reader.readAsText(selectedFile);
      } catch (error) {
        console.error('Error parsing brochure:', error);
      }
    }
  };

  // Safely extract parsed fields with null checks
  const parsedFields = parsedData?.parsed_fields || [];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Brochure Upload
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <BrochureModeSelector mode={mode} onModeChange={setMode} />
          
          <BrochureFileUpload 
            selectedFile={selectedFile} 
            onFileSelect={setSelectedFile} 
          />

          {mode === 'ai' && selectedFile && (
            <Button
              onClick={handleParseBrochure}
              disabled={parsing}
              className="w-full"
            >
              {parsing ? 'Parsing...' : 'Parse with AI'}
            </Button>
          )}

          {parsedFields.length > 0 && (
            <BrochureParsedData parsedFields={parsedFields} />
          )}

          <BrochureLegalAgreement 
            agreed={agreementAccepted} 
            onAgreementChange={setAgreementAccepted} 
          />

          <Button
            className="w-full"
            disabled={!agreementAccepted || (mode === 'ai' && !parsedData)}
          >
            Submit Listing
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
