
import { supabase } from '@/integrations/supabase/client';

export interface CreditTestResult {
  tool: string;
  expectedCredits: number;
  actualDeduction: number;
  passed: boolean;
  error?: string;
  timestamp: string;
}

export class CreditDeductionTester {
  private results: CreditTestResult[] = [];

  async testAllTools(): Promise<CreditTestResult[]> {
    this.results = [];

    const tools = [
      { name: 'ai_negotiation', credits: 50 },
      { name: 'ai_resume', credits: 100 },
      { name: 'ai_pricing', credits: 25 },
      { name: 'ai_locality_report', credits: 30 }
    ];

    for (const tool of tools) {
      await this.testToolCredits(tool.name, tool.credits);
    }

    return this.results;
  }

  private async testToolCredits(toolName: string, expectedCredits: number) {
    try {
      // Get current wallet balance
      const { data: wallet } = await supabase
        .from('wallets')
        .select('balance')
        .single();

      if (!wallet) {
        this.addResult(toolName, expectedCredits, 0, false, 'No wallet found');
        return;
      }

      const initialBalance = wallet.balance;

      // Simulate tool usage (this would call the actual function in real test)
      await supabase.functions.invoke('logToolAttempt', {
        body: {
          tool_name: toolName,
          was_allowed: true,
          credits_required: expectedCredits,
          user_credits: initialBalance - expectedCredits
        }
      });

      // Check if transaction was logged
      const { data: transaction } = await supabase
        .from('wallet_transactions')
        .select('amount')
        .eq('transaction_type', 'debit')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      const actualDeduction = Math.abs(transaction?.amount || 0);
      const passed = actualDeduction === expectedCredits;

      this.addResult(toolName, expectedCredits, actualDeduction, passed);

    } catch (error) {
      this.addResult(toolName, expectedCredits, 0, false, error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private addResult(tool: string, expected: number, actual: number, passed: boolean, error?: string) {
    this.results.push({
      tool,
      expectedCredits: expected,
      actualDeduction: actual,
      passed,
      error,
      timestamp: new Date().toISOString()
    });
  }
}
