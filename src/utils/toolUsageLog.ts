export interface ToolUsageAttempt {
  tool_name: string;
  user_id: string | null;
  has_credits: boolean;
  credits_required: number;
  current_credits: number;
  timestamp: string;
  access_granted: boolean;
}

export class ToolUsageLogger {
  private static attempts: ToolUsageAttempt[] = [];

  static logAttempt(attempt: Omit<ToolUsageAttempt, 'timestamp'>) {
    const logEntry: ToolUsageAttempt = {
      ...attempt,
      timestamp: new Date().toISOString()
    };

    this.attempts.push(logEntry);
    
    // Keep only last 1000 attempts to prevent memory issues
    if (this.attempts.length > 1000) {
      this.attempts = this.attempts.slice(-1000);
    }

    // Log to console for debugging
    console.log('Tool usage attempt:', logEntry);

    // In a real implementation, this would be sent to the backend
    // for admin dashboard visibility and analytics
  }

  static getAttempts(): ToolUsageAttempt[] {
    return [...this.attempts];
  }

  static getAttemptsByTool(toolName: string): ToolUsageAttempt[] {
    return this.attempts.filter(attempt => attempt.tool_name === toolName);
  }

  static getRecentAttempts(minutes: number = 60): ToolUsageAttempt[] {
    const cutoff = new Date(Date.now() - minutes * 60 * 1000);
    return this.attempts.filter(attempt => new Date(attempt.timestamp) > cutoff);
  }
}
