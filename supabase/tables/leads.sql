
-- CRM Leads table
CREATE TABLE leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    agent_id UUID REFERENCES users(id) ON DELETE CASCADE,
    seeker_id UUID REFERENCES users(id) ON DELETE CASCADE,
    property_id UUID REFERENCES listings(id) ON DELETE CASCADE,
    lead_score INTEGER DEFAULT 0,
    status VARCHAR(20) CHECK (status IN ('new', 'contacted', 'qualified', 'converted', 'lost')) DEFAULT 'new',
    notes TEXT,
    follow_up_date TIMESTAMP WITH TIME ZONE,
    ai_insights JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Agents can view own leads" ON leads
    FOR SELECT USING (agent_id = auth.uid());

CREATE POLICY "Seekers can view leads about them" ON leads
    FOR SELECT USING (seeker_id = auth.uid());

CREATE POLICY "Agents can manage own leads" ON leads
    FOR ALL USING (agent_id = auth.uid());
