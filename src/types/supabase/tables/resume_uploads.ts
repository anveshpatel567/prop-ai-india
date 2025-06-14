
export type ResumeUploadsRow = {
  id: string;
  user_id: string;
  file_url: string;
  extracted_text: string | null;
  file_name: string;
  status: string;
  error_message: string | null;
  created_at: string;
};
