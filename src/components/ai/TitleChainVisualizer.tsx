
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { FileText, GitBranch } from 'lucide-react';

export const TitleChainVisualizer: React.FC = () => {
  const [documents, setDocuments] = useState('');
  const [generating, setGenerating] = useState(false);
  const [titleChain, setTitleChain] = useState<any>(null);

  const handleGenerate = async () => {
    setGenerating(true);
    // Simulate AI title chain generation
    setTimeout(() => {
      setTitleChain({
        chain: [
          { owner: 'Original Developer', year: '2010', type: 'Construction' },
          { owner: 'First Buyer', year: '2012', type: 'Sale' },
          { owner: 'Current Owner', year: '2018', type: 'Purchase' }
        ],
        confidence: 0.92
      });
      setGenerating(false);
    }, 3000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <GitBranch className="mr-2 h-5 w-5" />
          AI Title Chain Visualizer
          <Badge className="ml-2">250 Credits</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Property Documents & Records
            </label>
            <Textarea
              value={documents}
              onChange={(e) => setDocuments(e.target.value)}
              placeholder="Paste property documents, sale deeds, registration details, or any ownership records you want to analyze..."
              rows={6}
            />
          </div>

          <Button 
            onClick={handleGenerate} 
            className="w-full" 
            disabled={!documents || generating}
          >
            <FileText className="mr-2 h-4 w-4" />
            {generating ? 'Generating Title Chain...' : 'Generate Title Chain'}
          </Button>

          {titleChain && (
            <div className="mt-6 p-4 rounded-lg bg-blue-50">
              <h3 className="font-semibold mb-3 flex items-center">
                <GitBranch className="mr-2 h-5 w-5 text-blue-600" />
                Property Title Chain
              </h3>
              
              <div className="space-y-3">
                {titleChain.chain.map((item: any, index: number) => (
                  <div key={index} className="flex items-center space-x-4 p-3 bg-white rounded border">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{item.owner}</p>
                      <p className="text-sm text-gray-600">{item.type} - {item.year}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t">
                <div className="flex justify-between text-sm">
                  <span>Analysis Confidence:</span>
                  <Badge variant="outline">
                    {Math.round(titleChain.confidence * 100)}%
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
