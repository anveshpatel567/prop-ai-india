
import React from 'react';
import { AiPricingSuggestionCard } from '@/components/ai/AiPricingSuggestionCard';
import { useAiPricingSuggestions } from '@/hooks/useAiPricingSuggestions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign } from 'lucide-react';

export default function AiPricingPage() {
  const { suggestions, loading } = useAiPricingSuggestions();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">AI Smart Pricing</h1>
          <p className="text-gray-600">
            Get AI-powered pricing suggestions based on market analysis and property features
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <AiPricingSuggestionCard />
          </div>

          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Your Pricing History
                </CardTitle>
                <CardDescription>
                  Previous AI pricing suggestions and market analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-8">Loading suggestions...</div>
                ) : suggestions.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No pricing suggestions yet. Generate your first one!
                  </div>
                ) : (
                  <div className="space-y-4">
                    {suggestions.map((suggestion) => (
                      <Card key={suggestion.id} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                            <span className="font-semibold">
                              ₹{suggestion.suggested_price?.toLocaleString()}
                            </span>
                          </div>
                          <Badge variant="outline">
                            {Math.round(suggestion.confidence_score * 100)}% confidence
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {new Date(suggestion.created_at).toLocaleDateString()}
                        </p>
                        {suggestion.market_analysis?.recommendations && (
                          <div className="mt-2 text-sm">
                            <strong>Recommendations:</strong>
                            <p className="text-gray-600">
                              {suggestion.market_analysis.recommendations}
                            </p>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
