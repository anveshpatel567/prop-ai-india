
import React, { useState } from 'react';
import { QAStatusCard } from '@/components/admin/QAStatusCard';
import { RLSVerifier } from '@/qa/VerifyRLS';
import { CreditDeductionTester } from '@/qa/TestCreditDeduction';
import { AIUsageSimulator } from '@/qa/AIUsageSimulation';
import { GatedToolFallbackTester } from '@/qa/GatedToolFallback';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Play, RefreshCw } from 'lucide-react';

export default function QAToolsPage() {
  const [rlsResults, setRlsResults] = useState<any[]>([]);
  const [creditResults, setCreditResults] = useState<any[]>([]);
  const [aiResults, setAiResults] = useState<any[]>([]);
  const [fallbackResults, setFallbackResults] = useState<any[]>([]);
  const [running, setRunning] = useState<string | null>(null);

  const runRLSTests = async () => {
    setRunning('rls');
    try {
      const verifier = new RLSVerifier();
      const results = await verifier.testAllTables();
      setRlsResults(results.map(r => ({
        test: `${r.table} - ${r.test}`,
        status: r.passed ? 'passed' : 'failed',
        message: r.error,
        timestamp: r.timestamp
      })));
    } catch (error) {
      console.error('RLS test failed:', error);
    } finally {
      setRunning(null);
    }
  };

  const runCreditTests = async () => {
    setRunning('credits');
    try {
      const tester = new CreditDeductionTester();
      const results = await tester.testAllTools();
      setCreditResults(results.map(r => ({
        test: `${r.tool} (${r.expectedCredits} credits)`,
        status: r.passed ? 'passed' : 'failed',
        message: r.error || `Expected: ${r.expectedCredits}, Actual: ${r.actualDeduction}`,
        timestamp: r.timestamp
      })));
    } catch (error) {
      console.error('Credit test failed:', error);
    } finally {
      setRunning(null);
    }
  };

  const runAITests = async () => {
    setRunning('ai');
    try {
      const simulator = new AIUsageSimulator();
      const results = await simulator.simulateAllTools();
      setAiResults(results.map(r => ({
        test: `${r.tool} (${r.responseTime}ms)`,
        status: r.success ? 'passed' : 'failed',
        message: r.error || `Response time: ${r.responseTime}ms, Credits: ${r.creditsUsed}`,
        timestamp: r.timestamp
      })));
    } catch (error) {
      console.error('AI test failed:', error);
    } finally {
      setRunning(null);
    }
  };

  const runFallbackTests = async () => {
    setRunning('fallback');
    try {
      const tester = new GatedToolFallbackTester();
      const results = await tester.testAllFallbacks();
      setFallbackResults(results.map(r => ({
        test: `${r.tool} - ${r.scenario}`,
        status: r.passed ? 'passed' : 'failed',
        message: `Expected: ${r.expectedBehavior}, Actual: ${r.actualBehavior}`,
        timestamp: r.timestamp
      })));
    } catch (error) {
      console.error('Fallback test failed:', error);
    } finally {
      setRunning(null);
    }
  };

  const runAllTests = async () => {
    await runRLSTests();
    await runCreditTests();
    await runAITests();
    await runFallbackTests();
  };

  const exportResults = () => {
    const allResults = {
      rls: rlsResults,
      credits: creditResults,
      ai: aiResults,
      fallback: fallbackResults,
      timestamp: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(allResults, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qa-report-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">QA Testing Tools</h1>
          <p className="text-gray-600">
            Run comprehensive tests on the AI system before launch
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Test Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button onClick={runAllTests} disabled={!!running}>
                <Play className="h-4 w-4 mr-2" />
                Run All Tests
              </Button>
              <Button variant="outline" onClick={exportResults}>
                <Download className="h-4 w-4 mr-2" />
                Export Results
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <QAStatusCard
            title="Row Level Security"
            results={rlsResults}
            onRunTest={running === 'rls' ? undefined : runRLSTests}
          />

          <QAStatusCard
            title="Credit Deduction"
            results={creditResults}
            onRunTest={running === 'credits' ? undefined : runCreditTests}
          />

          <QAStatusCard
            title="AI Tool Simulation"
            results={aiResults}
            onRunTest={running === 'ai' ? undefined : runAITests}
          />

          <QAStatusCard
            title="Gated Tool Fallbacks"
            results={fallbackResults}
            onRunTest={running === 'fallback' ? undefined : runFallbackTests}
          />
        </div>
      </div>
    </div>
  );
}
