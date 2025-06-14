
export type ResumeSummariesRow = {
  id: string;
  resume_id: string;
  user_id: string;
  summary: string;
  status: string;
  error_message: string | null;
  credits_used: number;
  created_at: string;
};
