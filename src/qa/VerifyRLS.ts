
export interface RLSTestResult {
  table: string;
  test: string;
  passed: boolean;
  error?: string;
  timestamp: string;
}

export class RLSVerifier {
  private results: RLSTestResult[] = [];

  async testAllTables(): Promise<RLSTestResult[]> {
    this.results = [];
    
    const tables = [
      'ai_negotiation_threads',
      'ai_negotiation_messages', 
      'ai_resumes',
      'ai_tool_attempt_logs',
      'ai_tool_misuse_flags',
      'wallets',
      'wallet_transactions'
    ];

    for (const table of tables) {
      await this.testTableRLS(table);
    }

    return this.results;
  }

  private async testTableRLS(table: string) {
    try {
      const { supabase } = await import('@/integrations/supabase/client');
      
      // Test 1: Unauthorized read should fail
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .limit(1);

      if (error && error.message.includes('RLS')) {
        this.addResult(table, 'Unauthorized read blocked', true);
      } else {
        this.addResult(table, 'Unauthorized read blocked', false, 'RLS not enforced');
      }

      // Test 2: Check policies exist
      const { data: policies } = await supabase
        .from('pg_policies')
        .select('*')
        .eq('tablename', table);

      if (policies && policies.length > 0) {
        this.addResult(table, 'Policies exist', true);
      } else {
        this.addResult(table, 'Policies exist', false, 'No policies found');
      }

    } catch (error) {
      this.addResult(table, 'RLS test', false, error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private addResult(table: string, test: string, passed: boolean, error?: string) {
    this.results.push({
      table,
      test,
      passed,
      error,
      timestamp: new Date().toISOString()
    });
  }
}
