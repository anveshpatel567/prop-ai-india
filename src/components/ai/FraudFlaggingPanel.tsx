
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Shield, AlertTriangle, CheckCircle } from 'lucide-react';

export const FraudFlaggingPanel: React.FC = () => {
  const [content, setContent] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    // Simulate AI analysis
    setTimeout(() => {
      setResult({
        fraudScore: Math.random() * 100,
        indicators: ['Unrealistic pricing', 'Missing contact details'],
        confidence: 0.85
      });
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Shield className="mr-2 h-5 w-5" />
          AI Fraud Detection
          <Badge className="ml-2">250 Credits</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Property Listing Content to Analyze
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste the property listing description, contact details, and any other content you want to analyze for potential fraud indicators..."
              rows={6}
            />
          </div>

          <Button 
            onClick={handleAnalyze} 
            className="w-full" 
            disabled={!content || analyzing}
          >
            <Shield className="mr-2 h-4 w-4" />
            {analyzing ? 'Analyzing...' : 'Analyze for Fraud'}
          </Button>

          {result && (
            <div className="mt-6 p-4 rounded-lg bg-gray-50">
              <h3 className="font-semibold mb-3 flex items-center">
                {result.fraudScore > 70 ? (
                  <AlertTriangle className="mr-2 h-5 w-5 text-red-500" />
                ) : (
                  <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                )}
                Analysis Results
              </h3>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Fraud Risk Score:</span>
                  <Badge variant={result.fraudScore > 70 ? 'destructive' : 'default'}>
                    {Math.round(result.fraudScore)}%
                  </Badge>
                </div>
                
                <div className="flex justify-between">
                  <span>Analysis Confidence:</span>
                  <span>{Math.round(result.confidence * 100)}%</span>
                </div>

                {result.indicators && result.indicators.length > 0 && (
                  <div>
                    <p className="font-medium mt-3 mb-2">Risk Indicators:</p>
                    <ul className="list-disc list-inside space-y-1">
                      {result.indicators.map((indicator: string, index: number) => (
                        <li key={index} className="text-sm text-gray-600">
                          {indicator}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
