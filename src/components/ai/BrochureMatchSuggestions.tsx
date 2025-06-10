
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useBrochureMatches } from '@/hooks/useBrochureMatches';
import { FileText, Upload, Search } from 'lucide-react';

export const BrochureMatchSuggestions: React.FC = () => {
  const { matches, loading, generateMatches } = useBrochureMatches();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    try {
      await generateMatches(file);
    } catch (error) {
      console.error('Error generating matches:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          AI Brochure Matcher
          <Badge className="ml-2">350 Credits</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload Property Brochure (PDF, JPG, PNG)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                id="brochure-upload"
              />
              <label
                htmlFor="brochure-upload"
                className="cursor-pointer text-blue-600 hover:text-blue-500"
              >
                Choose file or drag and drop
              </label>
              {file && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected: {file.name}
                </p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={!file || uploading}>
            <Search className="mr-2 h-4 w-4" />
            {uploading ? 'Analyzing Brochure...' : 'Find Matching Properties'}
          </Button>
        </form>

        {matches.length > 0 && (
          <div className="mt-6">
            <h3 className="font-semibold mb-4">AI Match Results</h3>
            <div className="space-y-3">
              {matches.map((match) => (
                <Card key={match.id} className="p-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Match #{match.id.slice(-8)}</p>
                      <p className="text-sm text-gray-600">
                        Created: {new Date(match.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline">
                      {match.status}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
