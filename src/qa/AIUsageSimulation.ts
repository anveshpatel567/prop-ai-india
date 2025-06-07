
import { supabase } from '@/integrations/supabase/client';

export interface AISimulationResult {
  tool: string;
  responseTime: number;
  creditsUsed: number;
  success: boolean;
  error?: string;
  timestamp: string;
}

export class AIUsageSimulator {
  private results: AISimulationResult[] = [];

  async simulateAllTools(): Promise<AISimulationResult[]> {
    this.results = [];

    await this.simulateResume();
    await this.simulateNegotiation();
    await this.simulateLocalityReport();

    return this.results;
  }

  private async simulateResume() {
    const startTime = Date.now();
    
    try {
      const { data, error } = await supabase.functions.invoke('generateResume', {
        body: {
          experience_years: 5,
          regions_covered: 'Mumbai, Pune',
          rera_id: 'TEST123',
          specializations: 'Residential properties',
          achievements: 'Top performer'
        }
      });

      const responseTime = Date.now() - startTime;

      if (error) {
        this.addResult('ai_resume', responseTime, 0, false, error.message);
      } else {
        this.addResult('ai_resume', responseTime, 100, true);
      }
    } catch (error) {
      this.addResult('ai_resume', Date.now() - startTime, 0, false, error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private async simulateNegotiation() {
    const startTime = Date.now();
    
    try {
      const { data, error } = await supabase.functions.invoke('sendNegotiationMessage', {
        body: {
          thread_id: 'test-thread',
          message: 'Test negotiation message',
          use_ai_generation: true
        }
      });

      const responseTime = Date.now() - startTime;

      if (error) {
        this.addResult('ai_negotiation', responseTime, 0, false, error.message);
      } else {
        this.addResult('ai_negotiation', responseTime, 50, true);
      }
    } catch (error) {
      this.addResult('ai_negotiation', Date.now() - startTime, 0, false, error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private async simulateLocalityReport() {
    const startTime = Date.now();
    
    try {
      const { data, error } = await supabase.functions.invoke('generateLocalityReport', {
        body: {
          locality: 'Bandra',
          city: 'Mumbai'
        }
      });

      const responseTime = Date.now() - startTime;

      if (error) {
        this.addResult('ai_locality_report', responseTime, 0, false, error.message);
      } else {
        this.addResult('ai_locality_report', responseTime, 30, true);
      }
    } catch (error) {
      this.addResult('ai_locality_report', Date.now() - startTime, 0, false, error instanceof Error ? error.message : 'Unknown error');
    }
  }

  private addResult(tool: string, responseTime: number, creditsUsed: number, success: boolean, error?: string) {
    this.results.push({
      tool,
      responseTime,
      creditsUsed,
      success,
      error,
      timestamp: new Date().toISOString()
    });
  }
}
