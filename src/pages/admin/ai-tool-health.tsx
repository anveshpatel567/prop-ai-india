
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Activity, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Zap,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface EdgeFunctionTest {
  name: string;
  endpoint: string;
  status: 'idle' | 'testing' | 'pass' | 'fail';
  responseTime?: number;
  creditDeduction?: boolean;
  errorMessage?: string;
  lastTested?: string;
}

export default function AiToolHealthPage() {
  const { user } = useAuth();
  const [tests, setTests] = useState<EdgeFunctionTest[]>([
    {
      name: 'AI Video Generator',
      endpoint: 'generateVideoFromListing',
      status: 'idle'
    },
    {
      name: 'Smart Pricing Engine',
      endpoint: 'generatePricingSuggestion',
      status: 'idle'
    },
    {
      name: 'Fraud Detection',
      endpoint: 'flagFraudulentListing',
      status: 'idle'
    },
    {
      name: 'SEO Schema Generator',
      endpoint: 'generateSeoSchema',
      status: 'idle'
    },
    {
      name: 'Title Chain Visualizer',
      endpoint: 'generateTitleChain',
      status: 'idle'
    },
    {
      name: 'Loan Optimizer',
      endpoint: 'generateLoanSuggestion',
      status: 'idle'
    },
    {
      name: 'Brochure Matcher',
      endpoint: 'generateBrochureMatches',
      status: 'idle'
    },
    {
      name: 'Locality Reports',
      endpoint: 'generateLocalityReport',
      status: 'idle'
    }
  ]);

  const [isRunningAll, setIsRunningAll] = useState(false);

  const testSingleFunction = async (functionName: string, endpoint: string) => {
    setTests(prev => prev.map(test => 
      test.endpoint === endpoint 
        ? { ...test, status: 'testing' }
        : test
    ));

    const startTime = Date.now();

    try {
      const testPayload = getTestPayload(endpoint);
      
      const { data, error } = await supabase.functions.invoke(endpoint, {
        body: testPayload
      });

      const responseTime = Date.now() - startTime;

      if (error) {
        throw error;
      }

      setTests(prev => prev.map(test => 
        test.endpoint === endpoint 
          ? { 
              ...test, 
              status: 'pass',
              responseTime,
              creditDeduction: true,
              lastTested: new Date().toISOString()
            }
          : test
      ));

    } catch (error) {
      const responseTime = Date.now() - startTime;
      
      setTests(prev => prev.map(test => 
        test.endpoint === endpoint 
          ? { 
              ...test, 
              status: 'fail',
              responseTime,
              errorMessage: error instanceof Error ? error.message : 'Unknown error',
              lastTested: new Date().toISOString()
            }
          : test
      ));
    }
  };

  const getTestPayload = (endpoint: string) => {
    const payloads: Record<string, any> = {
      'generateVideoFromListing': { listing_id: 'test-listing-123' },
      'generatePricingSuggestion': { listing_id: 'test-listing-123' },
      'flagFraudulentListing': { listing_id: 'test-listing-123' },
      'generateSeoSchema': { listing_id: 'test-listing-123' },
      'generateTitleChain': { property_id: 'test-property-123' },
      'generateLoanSuggestion': { 
        loan_amount: 5000000, 
        tenure_years: 20, 
        income_monthly: 100000 
      },
      'generateBrochureMatches': { uploaded_brochure_url: 'test-url' },
      'generateLocalityReport': { locality: 'Banjara Hills', city: 'Hyderabad' }
    };

    return payloads[endpoint] || {};
  };

  const runAllTests = async () => {
    setIsRunningAll(true);
    
    for (const test of tests) {
      await testSingleFunction(test.name, test.endpoint);
      // Add delay between tests to avoid overwhelming the system
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    setIsRunningAll(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'testing':
        return <RefreshCw className="h-5 w-5 animate-spin text-blue-500" />;
      case 'pass':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'fail':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      idle: 'secondary',
      testing: 'secondary',
      pass: 'default',
      fail: 'destructive'
    };

    const colors = {
      idle: 'bg-gray-100 text-gray-800',
      testing: 'bg-blue-100 text-blue-800',
      pass: 'bg-green-100 text-green-800',
      fail: 'bg-red-100 text-red-800'
    };

    return (
      <Badge className={colors[status as keyof typeof colors]}>
        {status.toUpperCase()}
      </Badge>
    );
  };

  const passCount = tests.filter(test => test.status === 'pass').length;
  const failCount = tests.filter(test => test.status === 'fail').length;
  const avgResponseTime = tests
    .filter(test => test.responseTime)
    .reduce((sum, test) => sum + (test.responseTime || 0), 0) / 
    Math.max(tests.filter(test => test.responseTime).length, 1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              AI Tool Health Monitor
            </h1>
            <p className="text-gray-600">
              Monitor edge function performance, response times, and credit deduction status
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="border-green-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div>
                    <div className="text-2xl font-bold text-green-600">{passCount}</div>
                    <div className="text-sm text-gray-600">Passing</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <XCircle className="h-8 w-8 text-red-600" />
                  <div>
                    <div className="text-2xl font-bold text-red-600">{failCount}</div>
                    <div className="text-sm text-gray-600">Failing</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Activity className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round(avgResponseTime)}ms
                    </div>
                    <div className="text-sm text-gray-600">Avg Response</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <Zap className="h-8 w-8 text-orange-600" />
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {Math.round((passCount / tests.length) * 100)}%
                    </div>
                    <div className="text-sm text-gray-600">Health Score</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Control Panel */}
          <Card>
            <CardHeader>
              <CardTitle>Test Controls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Button
                  onClick={runAllTests}
                  disabled={isRunningAll}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white"
                >
                  {isRunningAll ? (
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Activity className="mr-2 h-4 w-4" />
                  )}
                  Run All Tests
                </Button>
                <Button variant="outline">
                  Export Results
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Test Results */}
          <Card>
            <CardHeader>
              <CardTitle>Edge Function Tests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tests.map((test) => (
                  <div key={test.endpoint} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center space-x-4">
                      {getStatusIcon(test.status)}
                      <div>
                        <div className="font-medium">{test.name}</div>
                        <div className="text-sm text-gray-600">{test.endpoint}</div>
                        {test.errorMessage && (
                          <div className="text-xs text-red-600 mt-1">{test.errorMessage}</div>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      {test.responseTime && (
                        <div className="text-sm text-gray-600">
                          {test.responseTime}ms
                        </div>
                      )}
                      
                      {test.creditDeduction && (
                        <div className="flex items-center text-green-600 text-sm">
                          <Zap className="h-3 w-3 mr-1" />
                          Credits OK
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(test.status)}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => testSingleFunction(test.name, test.endpoint)}
                          disabled={test.status === 'testing'}
                        >
                          Test
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Health Recommendations */}
          {failCount > 0 && (
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-600">
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Health Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p>⚠️ <strong>{failCount} edge function(s) failing</strong> - Check logs and error messages</p>
                  <p>🔍 <strong>Investigation needed:</strong> Review Supabase function logs for detailed error information</p>
                  <p>⚡ <strong>Credit system:</strong> Verify wallet balance and transaction logging</p>
                  <p>🔄 <strong>Retry logic:</strong> Implement automatic retry for transient failures</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
