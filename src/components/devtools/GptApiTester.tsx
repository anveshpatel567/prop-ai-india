
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { fetchGpt4oResponse, testGptConnection } from '@/services/gptService';

export const GptApiTester: React.FC = () => {
  const [prompt, setPrompt] = useState('Hello, can you help me with real estate?');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'connected' | 'failed'>('unknown');
  const [error, setError] = useState<string | null>(null);

  const testConnection = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const isConnected = await testGptConnection();
      setConnectionStatus(isConnected ? 'connected' : 'failed');
      
      if (!isConnected) {
        setError('Failed to connect to OpenAI API. Check your API key.');
      }
    } catch (err) {
      setConnectionStatus('failed');
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const sendPrompt = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);
    setResponse('');
    
    try {
      const result = await fetchGpt4oResponse(prompt);
      
      if (result.success) {
        setResponse(result.content);
        setConnectionStatus('connected');
      } else {
        setError(result.error || 'Failed to get response');
        setConnectionStatus('failed');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setConnectionStatus('failed');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="h-3 w-3 mr-1" />Connected</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="h-3 w-3 mr-1" />Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          GPT-4o API Tester
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button 
            onClick={testConnection} 
            disabled={loading}
            variant="outline"
            className="flex items-center gap-2"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            Test Connection
          </Button>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Test Prompt:</label>
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter a test prompt..."
          />
        </div>

        <Button 
          onClick={sendPrompt} 
          disabled={loading || !prompt.trim()}
          className="w-full"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
          Send Prompt
        </Button>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
            <strong>Error:</strong> {error}
          </div>
        )}

        {response && (
          <div className="space-y-2">
            <label className="text-sm font-medium">Response:</label>
            <Textarea
              value={response}
              readOnly
              className="min-h-[100px] bg-gray-50"
            />
          </div>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p><strong>API Key Status:</strong> {import.meta.env.VITE_OPENAI_API_KEY ? 'Set' : 'Missing'}</p>
          <p><strong>Environment:</strong> {import.meta.env.MODE}</p>
          {!import.meta.env.VITE_OPENAI_API_KEY && (
            <p className="text-red-600">⚠️ Set VITE_OPENAI_API_KEY in your environment variables</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
