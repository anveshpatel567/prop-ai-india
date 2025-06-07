
import React, { useState } from 'react';
import { useTitleChain, TitleChainInput } from '@/hooks/useTitleChain';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, FileText } from 'lucide-react';

interface TitleChainEditorProps {
  listingId: string;
  onGenerated?: () => void;
}

export default function TitleChainEditor({ listingId, onGenerated }: TitleChainEditorProps) {
  const { generateTitleChain, loading } = useTitleChain();
  const [legalSummary, setLegalSummary] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!legalSummary.trim()) return;

    try {
      await generateTitleChain(listingId);
      if (onGenerated) onGenerated();
      setLegalSummary('');
    } catch (error) {
      console.error('Error generating title chain:', error);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-purple-500" />
          <CardTitle>Generate Title Chain</CardTitle>
        </div>
        <CardDescription>
          Enter legal documents or summary to generate property title chain timeline
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="legal_summary">Legal Summary or Documents</Label>
            <Textarea
              id="legal_summary"
              value={legalSummary}
              onChange={(e) => setLegalSummary(e.target.value)}
              placeholder="Paste legal documents, title deeds, or summary of property ownership history..."
              rows={8}
              required
            />
          </div>

          <Button type="submit" disabled={loading || !legalSummary.trim()} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing Documents...
              </>
            ) : (
              'Generate Title Chain'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
