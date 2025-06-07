
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { GitBranch, Search, CheckCircle } from 'lucide-react';
import { useTitleChain } from '@/hooks/useTitleChain';
import { useToast } from '@/hooks/use-toast';

export const TitleChainVisualizer: React.FC = () => {
  const { chains, loading, generateTitleChain } = useTitleChain();
  const { toast } = useToast();
  const [propertyId, setPropertyId] = useState('');

  const handleGenerate = async () => {
    if (!propertyId.trim()) {
      toast({
        title: "Missing Property ID",
        description: "Please enter a property ID",
        variant: "destructive"
      });
      return;
    }

    try {
      await generateTitleChain(propertyId);
      toast({
        title: "Title Chain Generated",
        description: "Property title chain visualization created",
      });
      setPropertyId('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate title chain",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-600">
            <GitBranch className="mr-2 h-5 w-5" />
            AI Title Chain Visualizer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter Property ID"
              value={propertyId}
              onChange={(e) => setPropertyId(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleGenerate} disabled={loading} className="bg-orange-500 hover:bg-orange-600">
              <Search className="mr-2 h-4 w-4" />
              Generate (20 credits)
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-gray-700">Title Chain History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chains.map((chain) => (
              <div key={chain.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <GitBranch className="h-4 w-4 text-blue-500" />
                    <span className="font-medium">Property: {chain.property_id}</span>
                  </div>
                  <Badge variant="secondary">
                    {Math.round(chain.confidence_score * 100)}% confidence
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <div className="font-medium text-lg">{chain.event_label}</div>
                  <div className="text-sm text-gray-600">{chain.description}</div>
                  <div className="text-sm text-blue-600">
                    Date: {new Date(chain.event_date).toLocaleDateString()}
                  </div>
                </div>
                
                {chain.chain_json && Object.keys(chain.chain_json).length > 0 && (
                  <div className="bg-gray-50 p-3 rounded text-sm">
                    <div className="font-medium mb-2">Chain Details:</div>
                    {chain.chain_json.events?.map((step: any, index: number) => (
                      <div key={index} className="flex items-center space-x-2 mb-1">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>{step.description || step.event_label || `Step ${index + 1}`}</span>
                      </div>
                    )) || (
                      <div className="text-gray-600">
                        Additional chain data available
                      </div>
                    )}
                  </div>
                )}
                
                <div className="text-xs text-gray-500">
                  Generated: {new Date(chain.created_at).toLocaleString()}
                </div>
              </div>
            ))}
            
            {chains.length === 0 && !loading && (
              <div className="text-center py-8 text-gray-500">
                No title chains generated yet. Enter a property ID above to get started.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
