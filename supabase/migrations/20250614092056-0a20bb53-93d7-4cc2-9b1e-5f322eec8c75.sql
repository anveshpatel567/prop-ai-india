
-- Table for uploaded resumes (stores raw files and extracted text)
CREATE TABLE resume_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  file_url TEXT NOT NULL,
  extracted_text TEXT,
  file_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'uploaded', -- uploaded | parsed | error
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for AI summaries generated from resumes
CREATE TABLE resume_summaries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  resume_id UUID NOT NULL REFERENCES resume_uploads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  summary TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending', -- pending | completed | error
  error_message TEXT,
  credits_used INTEGER NOT NULL DEFAULT 50,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Indexes for fast lookup
CREATE INDEX idx_resume_uploads_user_id ON resume_uploads(user_id);
CREATE INDEX idx_resume_summaries_user_id ON resume_summaries(user_id);

-- Enable Row Level Security
ALTER TABLE resume_uploads ENABLE ROW LEVEL SECURITY;
ALTER TABLE resume_summaries ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own resumes
CREATE POLICY "Users can view their own resumes"
  ON resume_uploads
  FOR SELECT
  USING (user_id = auth.uid());

-- Policy: Users can insert their own resumes
CREATE POLICY "Users can insert own resumes"
  ON resume_uploads
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Policy: Users can view their own summaries
CREATE POLICY "Users can view their own resume summaries"
  ON resume_summaries
  FOR SELECT
  USING (user_id = auth.uid());

-- Policy: Users can insert summaries for their own resumes
CREATE POLICY "Users can insert own resume summaries"
  ON resume_summaries
  FOR INSERT
  WITH CHECK (user_id = auth.uid());

-- Admin policy: Allow admins to view all uploads and summaries
CREATE POLICY "Admin can view all resumes"
  ON resume_uploads
  FOR SELECT
  USING (exists (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));

CREATE POLICY "Admin can view all summaries"
  ON resume_summaries
  FOR SELECT
  USING (exists (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin'));
