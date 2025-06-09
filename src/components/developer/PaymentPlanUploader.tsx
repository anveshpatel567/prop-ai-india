
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, FileText, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PaymentPlanUploaderProps {
  onUploadComplete?: (planId: string) => void;
}

export const PaymentPlanUploader: React.FC<PaymentPlanUploaderProps> = ({
  onUploadComplete
}) => {
  const [planName, setPlanName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      toast({
        title: "Error",
        description: "Please select a PDF file",
        variant: "destructive"
      });
    }
  };

  const handleUpload = async () => {
    if (!planName || !selectedFile) {
      toast({
        title: "Error",
        description: "Please provide a plan name and select a PDF file",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    try {
      // Simulate upload - replace with actual implementation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Success",
        description: "Payment plan uploaded successfully",
      });
      
      onUploadComplete?.('plan-123');
      setPlanName('');
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload payment plan",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-orange-500" />
          Upload Payment Plan
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="plan-name">Plan Name</Label>
          <Input
            id="plan-name"
            placeholder="e.g., Premium Payment Plan 2024"
            value={planName}
            onChange={(e) => setPlanName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pdf-upload">PDF Document</Label>
          <div className="flex items-center gap-2">
            <Input
              id="pdf-upload"
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              className="flex-1"
            />
            {selectedFile && (
              <div className="flex items-center gap-1 text-green-600">
                <Check className="h-4 w-4" />
                <span className="text-sm">{selectedFile.name}</span>
              </div>
            )}
          </div>
        </div>

        <Button 
          onClick={handleUpload}
          disabled={uploading || !planName || !selectedFile}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white hover:brightness-110"
        >
          {uploading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Uploading...
            </div>
          ) : (
            <>
              <FileText className="h-4 w-4 mr-2" />
              Upload Payment Plan
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
