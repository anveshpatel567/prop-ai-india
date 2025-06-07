
-- Property listings table
CREATE TABLE listings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(500) NOT NULL,
    description TEXT,
    property_type VARCHAR(20) CHECK (property_type IN ('residential', 'commercial', 'plot')) NOT NULL,
    listing_type VARCHAR(10) CHECK (listing_type IN ('sale', 'rent')) NOT NULL,
    price DECIMAL(15,2) NOT NULL,
    area_sqft INTEGER,
    bedrooms INTEGER,
    bathrooms INTEGER,
    city VARCHAR(100) NOT NULL,
    locality VARCHAR(200),
    google_maps_pin TEXT NOT NULL,
    rera_number VARCHAR(50),
    is_rera_verified BOOLEAN DEFAULT FALSE,
    amenities JSONB,
    photos JSONB,
    status VARCHAR(20) CHECK (status IN ('active', 'sold', 'rented', 'draft')) DEFAULT 'active',
    ai_generated_title BOOLEAN DEFAULT FALSE,
    ai_parsed_data JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view active listings" ON listings
    FOR SELECT USING (status = 'active');

CREATE POLICY "Users can view own listings" ON listings
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create listings" ON listings
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own listings" ON listings
    FOR UPDATE USING (user_id = auth.uid());
