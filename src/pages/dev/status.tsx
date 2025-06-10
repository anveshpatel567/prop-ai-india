
import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useSupabaseUser } from '@/hooks/useSupabaseUser';
import { useWallet } from '@/context/WalletContext';
import { isGptKeyConfigured } from '@/lib/gptService';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, XCircle, AlertCircle, Zap } from 'lucide-react';

const DevStatus: React.FC = () => {
  const { user, isAuthenticated, loading } = useSupabaseUser();
  const { balance } = useWallet();
  const [edgeFunctionStatus, setEdgeFunctionStatus] = useState<any>({});
  const [testing, setTesting] = useState(false);

  const gptConfigured = isGptKeyConfigured();

  const testEdgeFunction = async (functionName: string) => {
    setTesting(true);
    try {
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: { test: true }
      });
      
      setEdgeFunctionStatus(prev => ({
        ...prev,
        [functionName]: { status: error ? 'error' : 'success', error: error?.message }
      }));
    } catch (err: any) {
      setEdgeFunctionStatus(prev => ({
        ...prev,
        [functionName]: { status: 'error', error: err.message }
      }));
    } finally {
      setTesting(false);
    }
  };

  const getStatusIcon = (status: boolean | string) => {
    if (status === true || status === 'success') {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    } else if (status === false || status === 'error') {
      return <XCircle className="h-5 w-5 text-red-600" />;
    } else {
      return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusBadge = (status: boolean | string) => {
    if (status === true || status === 'success') {
      return <Badge className="bg-green-100 text-green-800">Working</Badge>;
    } else if (status === false || status === 'error') {
      return <Badge className="bg-red-100 text-red-800">Error</Badge>;
    } else {
      return <Badge className="bg-yellow-100 text-yellow-800">Unknown</Badge>;
    }
  };

  const edgeFunctions = [
    'generatePricingSuggestion',
    'quality-enhancer',
    'ai/search-match',
    'generateBrochureMatches',
    'generateVideoFromListing'
  ];

  return (
    <div className="min-h-screen warm-gradient">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">System Status</h1>
          <p className="text-gray-600">Development and integration status dashboard</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Authentication Status */}
          <Card>
            <CardHeader>
              <CardTitle>Authentication System</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(!loading)}
                  <span>Auth Context</span>
                </div>
                {getStatusBadge(!loading)}
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(isAuthenticated)}
                  <span>User Session</span>
                </div>
                {getStatusBadge(isAuthenticated)}
              </div>
              
              {user && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm"><strong>User:</strong> {user.email}</p>
                  <p className="text-sm"><strong>Role:</strong> {user.role}</p>
                  <p className="text-sm"><strong>ID:</strong> {user.id}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Wallet System */}
          <Card>
            <CardHeader>
              <CardTitle>Wallet System</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(balance !== null)}
                  <span>Wallet Context</span>
                </div>
                {getStatusBadge(balance !== null)}
              </div>
              
              {balance && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-orange-600" />
                    <span className="font-medium">Balance: {balance.balance} credits</span>
                  </div>
                  <p className="text-sm text-gray-600">Status: {balance.status}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* GPT Integration */}
          <Card>
            <CardHeader>
              <CardTitle>GPT Integration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getStatusIcon(gptConfigured)}
                  <span>API Key Configured</span>
                </div>
                {getStatusBadge(gptConfigured)}
              </div>
              
              {!gptConfigured && (
                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    GPT API key not configured. Add VITE_OPENAI_API_KEY to environment variables.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Edge Functions */}
          <Card>
            <CardHeader>
              <CardTitle>Edge Functions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {edgeFunctions.map((functionName) => (
                <div key={functionName} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(edgeFunctionStatus[functionName]?.status)}
                    <span className="text-sm">{functionName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(edgeFunctionStatus[functionName]?.status || 'unknown')}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => testEdgeFunction(functionName)}
                      disabled={testing}
                    >
                      Test
                    </Button>
                  </div>
                </div>
              ))}
              
              {testing && (
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">Testing edge functions...</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* System Info */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium">Environment</p>
                <p className="text-sm text-gray-600">
                  {import.meta.env.DEV ? 'Development' : 'Production'}
                </p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium">Build Time</p>
                <p className="text-sm text-gray-600">{new Date().toLocaleString()}</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm font-medium">Browser</p>
                <p className="text-sm text-gray-600">{navigator.userAgent.split(' ')[0]}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DevStatus;
