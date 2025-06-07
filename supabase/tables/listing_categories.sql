
-- Listing categories table for scalable category management
CREATE TABLE listing_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    label VARCHAR(200) NOT NULL,
    parent_id UUID REFERENCES listing_categories(id) ON DELETE SET NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE listing_categories ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view active categories" ON listing_categories
    FOR SELECT USING (is_active = TRUE);

CREATE POLICY "Only admins can manage categories" ON listing_categories
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Create indexes for performance
CREATE INDEX idx_listing_categories_slug ON listing_categories(slug);
CREATE INDEX idx_listing_categories_parent_id ON listing_categories(parent_id);
CREATE INDEX idx_listing_categories_active ON listing_categories(is_active);

-- Insert sample data
INSERT INTO listing_categories (slug, label, parent_id, is_active) VALUES
('residential', 'Residential', NULL, TRUE),
('commercial', 'Commercial', NULL, TRUE),
('land', 'Land & Plots', NULL, TRUE),
('residential-apartment', 'Apartment', (SELECT id FROM listing_categories WHERE slug = 'residential'), TRUE),
('residential-villa', 'Villa/House', (SELECT id FROM listing_categories WHERE slug = 'residential'), TRUE),
('residential-builder-floor', 'Builder Floor', (SELECT id FROM listing_categories WHERE slug = 'residential'), TRUE),
('commercial-office', 'Office Space', (SELECT id FROM listing_categories WHERE slug = 'commercial'), TRUE),
('commercial-retail', 'Retail/Showroom', (SELECT id FROM listing_categories WHERE slug = 'commercial'), TRUE),
('commercial-warehouse', 'Warehouse/Godown', (SELECT id FROM listing_categories WHERE slug = 'commercial'), TRUE);
