
-- Payment receipts for manual wallet top-ups
CREATE TABLE payment_receipts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL,
    receipt_url TEXT NOT NULL,
    payment_method VARCHAR(50),
    transaction_id VARCHAR(100),
    status VARCHAR(20) CHECK (status IN ('pending', 'approved', 'rejected')) DEFAULT 'pending',
    admin_notes TEXT,
    approved_by UUID REFERENCES users(id),
    approved_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE payment_receipts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own receipts" ON payment_receipts
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create receipts" ON payment_receipts
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admin can view all receipts" ON payment_receipts
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM users 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
