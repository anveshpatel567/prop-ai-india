
export type AiToolUsageSummary = {
  tool: string;
  credits_used: number;
  call_count: number;
};

export type DeveloperAiSummary = {
  total_credits: number;
  total_calls: number;
  tool_breakdown: AiToolUsageSummary[];
  daily_trend: { date: string; count: number }[];
};

export type AiToolError = {
  id: string;
  tool_name: string;
  error_message: string;
  created_at: string;
  user_id: string;
};
