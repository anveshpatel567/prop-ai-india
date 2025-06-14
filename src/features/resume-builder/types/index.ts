
export type ResumeUploadRow = {
  id: string;
  user_id: string;
  file_url: string;
  extracted_text: string | null;
  file_name: string;
  status: string;
  error_message: string | null;
  created_at: string;
};
export type ResumeSummaryRow = {
  id: string;
  resume_id: string;
  user_id: string;
  summary: string;
  status: string;
  error_message: string | null;
  credits_used: number;
  created_at: string;
};
export type ResumeUploadPanelProps = {
  onUploaded: (resume: ResumeUploadRow) => void;
};
export type ResumePreviewPanelProps = {
  resume: ResumeUploadRow | null;
};
export type ResumeSummaryOutputProps = {
  summary: string | null;
  status: "idle" | "loading" | "done" | "error";
  error?: string | null;
};
