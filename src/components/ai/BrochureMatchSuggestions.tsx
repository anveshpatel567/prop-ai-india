
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { FileText, Upload, Zap } from 'lucide-react';
import { useBrochureMatches } from '@/hooks/useBrochureMatches';
import { useToast } from '@/hooks/use-toast';

export const BrochureMatchSuggestions: React.FC = () => {
  const { matches, loading, generateMatches } = useBrochureMatches();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleGenerateMatches = async () => {
    if (!selectedFile) {
      toast({
        title: "No File Selected",
        description: "Please select a brochure file first",
        variant: "destructive"
      });
      return;
    }

    try {
      await generateMatches(selectedFile);
      toast({
        title: "Matches Generated",
        description: "AI has analyzed your brochure and found property matches",
      });
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate matches",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-600">
            <FileText className="mr-2 h-5 w-5" />
            AI Brochure Matcher
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100"
            />
            {selectedFile && (
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Upload className="h-4 w-4" />
                <span>{selectedFile.name}</span>
              </div>
            )}
          </div>
          <Button 
            onClick={handleGenerateMatches} 
            disabled={loading || !selectedFile}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Zap className="mr-2 h-4 w-4" />
            Generate Matches (25 credits)
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-gray-700">Match Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {matches.map((match) => (
              <div key={match.id} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">
                    {match.matched_listings?.length || 0} matches found
                  </Badge>
                  <span className="text-xs text-gray-500">
                    {new Date(match.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Brochure: {match.uploaded_brochure_url}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
