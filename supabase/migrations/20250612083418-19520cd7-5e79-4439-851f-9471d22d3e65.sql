
-- Fix missing RLS policies on AI tables

-- Enable RLS on ai_followups if not already enabled
ALTER TABLE ai_followups ENABLE ROW LEVEL SECURITY;

-- RLS policies for ai_followups
DROP POLICY IF EXISTS "Users can view own followups" ON ai_followups;
DROP POLICY IF EXISTS "Users can create followups" ON ai_followups;
DROP POLICY IF EXISTS "Users can update own followups" ON ai_followups;
DROP POLICY IF EXISTS "Admins can view all followups" ON ai_followups;

CREATE POLICY "Users can view own followups" ON ai_followups
    FOR SELECT USING (agent_id = auth.uid() OR lead_id = auth.uid());

CREATE POLICY "Users can create followups" ON ai_followups
    FOR INSERT WITH CHECK (agent_id = auth.uid());

CREATE POLICY "Users can update own followups" ON ai_followups
    FOR UPDATE USING (agent_id = auth.uid());

CREATE POLICY "Admins can view all followups" ON ai_followups
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Enable RLS on ai_negotiation_logs if not already enabled
ALTER TABLE ai_negotiation_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies for ai_negotiation_logs
DROP POLICY IF EXISTS "Users can view own negotiations" ON ai_negotiation_logs;
DROP POLICY IF EXISTS "Users can create negotiations" ON ai_negotiation_logs;
DROP POLICY IF EXISTS "Admins can view all negotiations" ON ai_negotiation_logs;

CREATE POLICY "Users can view own negotiations" ON ai_negotiation_logs
    FOR SELECT USING (seeker_id = auth.uid() OR agent_id = auth.uid());

CREATE POLICY "Users can create negotiations" ON ai_negotiation_logs
    FOR INSERT WITH CHECK (seeker_id = auth.uid() OR agent_id = auth.uid());

CREATE POLICY "Admins can view all negotiations" ON ai_negotiation_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Enable RLS on ai_pricing_suggestions if not already enabled
ALTER TABLE ai_pricing_suggestions ENABLE ROW LEVEL SECURITY;

-- RLS policies for ai_pricing_suggestions
DROP POLICY IF EXISTS "Users can view own pricing suggestions" ON ai_pricing_suggestions;
DROP POLICY IF EXISTS "Users can create pricing suggestions" ON ai_pricing_suggestions;
DROP POLICY IF EXISTS "Admins can view all pricing suggestions" ON ai_pricing_suggestions;

CREATE POLICY "Users can view own pricing suggestions" ON ai_pricing_suggestions
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create pricing suggestions" ON ai_pricing_suggestions
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all pricing suggestions" ON ai_pricing_suggestions
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Enable RLS on ai_locality_reports if not already enabled
ALTER TABLE ai_locality_reports ENABLE ROW LEVEL SECURITY;

-- RLS policies for ai_locality_reports
DROP POLICY IF EXISTS "Users can view own locality reports" ON ai_locality_reports;
DROP POLICY IF EXISTS "Users can create locality reports" ON ai_locality_reports;
DROP POLICY IF EXISTS "Admins can view all locality reports" ON ai_locality_reports;

CREATE POLICY "Users can view own locality reports" ON ai_locality_reports
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create locality reports" ON ai_locality_reports
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can view all locality reports" ON ai_locality_reports
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Create payment_logs table for Stripe transactions
CREATE TABLE IF NOT EXISTS payment_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    stripe_session_id TEXT NOT NULL,
    amount INTEGER NOT NULL,
    currency TEXT DEFAULT 'usd' NOT NULL,
    status TEXT DEFAULT 'pending' NOT NULL,
    credits_added INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on payment_logs
ALTER TABLE payment_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies for payment_logs
CREATE POLICY "Users can view own payment logs" ON payment_logs
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "System can insert payment logs" ON payment_logs
    FOR INSERT WITH CHECK (true);

CREATE POLICY "System can update payment logs" ON payment_logs
    FOR UPDATE USING (true);

CREATE POLICY "Admins can view all payment logs" ON payment_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
