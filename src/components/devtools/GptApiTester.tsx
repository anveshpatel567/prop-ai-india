
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { callGptApi, isGptKeyConfigured } from '@/lib/gptService';
import { AlertTriangle, Send, CheckCircle } from 'lucide-react';

export const GptApiTester: React.FC = () => {
  const [prompt, setPrompt] = useState('Suggest a good title for a 2BHK flat in Andheri');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);

  // Iframe-safe mounting
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleTest = async () => {
    if (!isMounted || typeof window === 'undefined') return;
    
    setIsLoading(true);
    setError('');
    setResponse('');

    try {
      const result = await callGptApi(prompt);
      setResponse(result);
      console.log('✅ GPT Test Success');
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMsg);
      console.error('❌ GPT Test Failed:', errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // Don't render until mounted
  if (!isMounted) return <div>Loading...</div>;

  const hasApiKey = isGptKeyConfigured();

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            GPT-4o API Test Console
            <Badge variant={hasApiKey ? "default" : "destructive"}>
              {hasApiKey ? <CheckCircle className="h-3 w-3 mr-1" /> : <AlertTriangle className="h-3 w-3 mr-1" />}
              {hasApiKey ? 'API Key Found' : 'API Key Missing'}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {!hasApiKey && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-sm text-yellow-800">
                ⚠️ No API key detected. Create a <code>.env</code> file with:
              </p>
              <code className="block bg-yellow-100 p-2 rounded mt-2 text-xs">
                VITE_OPENAI_API_KEY=sk-your-key-here
              </code>
            </div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Test Prompt:</label>
            <Textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your GPT prompt here..."
              rows={3}
            />
          </div>

          <Button 
            onClick={handleTest} 
            disabled={isLoading || !hasApiKey || !prompt.trim()}
            className="w-full"
          >
            <Send className="h-4 w-4 mr-2" />
            {isLoading ? 'Testing GPT...' : 'Run GPT Test'}
          </Button>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-800">❌ Error: {error}</p>
            </div>
          )}

          {response && (
            <div className="space-y-2">
              <label className="text-sm font-medium">GPT Response:</label>
              <pre className="bg-gray-50 border rounded-lg p-4 text-sm whitespace-pre-wrap overflow-auto max-h-64">
                {response}
              </pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
