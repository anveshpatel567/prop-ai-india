
-- AI tool usage tracking
CREATE TABLE ai_tool_transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    tool_name VARCHAR(50) NOT NULL,
    credit_cost INTEGER NOT NULL,
    input_data JSONB,
    output_data JSONB,
    status VARCHAR(20) CHECK (status IN ('pending', 'success', 'failed')) DEFAULT 'pending',
    processing_time_ms INTEGER,
    error_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE ai_tool_transactions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own transactions" ON ai_tool_transactions
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create transactions" ON ai_tool_transactions
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admin can view all transactions" ON ai_tool_transactions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
