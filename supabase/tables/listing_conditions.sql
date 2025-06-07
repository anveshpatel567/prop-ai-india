
-- Listing conditions table for dynamic form fields
CREATE TABLE listing_conditions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    label VARCHAR(200) NOT NULL,
    applies_to_category_id UUID REFERENCES listing_categories(id) ON DELETE CASCADE,
    input_type VARCHAR(20) CHECK (input_type IN ('dropdown', 'input', 'checkbox', 'date', 'number')) NOT NULL,
    options JSONB,
    is_required BOOLEAN DEFAULT FALSE,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE listing_conditions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view active conditions" ON listing_conditions
    FOR SELECT USING (TRUE);

CREATE POLICY "Only admins can manage conditions" ON listing_conditions
    FOR ALL USING (auth.jwt() ->> 'role' = 'admin');

-- Create indexes for performance
CREATE INDEX idx_listing_conditions_category_id ON listing_conditions(applies_to_category_id);
CREATE INDEX idx_listing_conditions_input_type ON listing_conditions(input_type);
CREATE INDEX idx_listing_conditions_display_order ON listing_conditions(display_order);

-- Insert sample conditions for residential apartments
INSERT INTO listing_conditions (label, applies_to_category_id, input_type, options, is_required, display_order) VALUES
('Number of Bedrooms', (SELECT id FROM listing_categories WHERE slug = 'residential-apartment'), 'dropdown', '["1 BHK", "2 BHK", "3 BHK", "4 BHK", "5+ BHK"]', TRUE, 1),
('Number of Bathrooms', (SELECT id FROM listing_categories WHERE slug = 'residential-apartment'), 'dropdown', '["1", "2", "3", "4", "5+"]', TRUE, 2),
('Furnishing Status', (SELECT id FROM listing_categories WHERE slug = 'residential-apartment'), 'dropdown', '["Fully Furnished", "Semi Furnished", "Unfurnished"]', FALSE, 3),
('Balcony', (SELECT id FROM listing_categories WHERE slug = 'residential-apartment'), 'dropdown', '["0", "1", "2", "3+"]', FALSE, 4),
('Floor Number', (SELECT id FROM listing_categories WHERE slug = 'residential-apartment'), 'number', NULL, FALSE, 5),
('Total Floors', (SELECT id FROM listing_categories WHERE slug = 'residential-apartment'), 'number', NULL, FALSE, 6),
('Parking', (SELECT id FROM listing_categories WHERE slug = 'residential-apartment'), 'dropdown', '["None", "Open", "Covered", "Stilt"]', FALSE, 7),
('Age of Property', (SELECT id FROM listing_categories WHERE slug = 'residential-apartment'), 'dropdown', '["Under Construction", "Ready to Move", "1-2 Years", "3-5 Years", "5-10 Years", "10+ Years"]', FALSE, 8),
('Facing Direction', (SELECT id FROM listing_categories WHERE slug = 'residential-apartment'), 'dropdown', '["North", "South", "East", "West", "North-East", "North-West", "South-East", "South-West"]', FALSE, 9);
