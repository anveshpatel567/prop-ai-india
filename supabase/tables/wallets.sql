
-- Wallet balance tracking
CREATE TABLE wallets (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    balance INTEGER DEFAULT 0,
    status VARCHAR(20) CHECK (status IN ('active', 'suspended')) DEFAULT 'active',
    last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE wallets ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own wallet" ON wallets
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admin can view all wallets" ON wallets
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
