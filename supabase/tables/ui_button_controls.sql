
-- UI Button Controls table for managing allowed button variants per page
create table public.ui_button_controls (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null unique,
  allowed_variants text[] not null default array['primary', 'secondary', 'glass'],
  fallback_variant text not null default 'primary',
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.ui_button_controls enable row level security;

-- Allow read access to all authenticated users
create policy "Allow read to all authenticated users" 
  on public.ui_button_controls
  for select 
  using (auth.role() = 'authenticated');

-- Only admins can insert/update/delete
create policy "Admins can manage button controls" 
  on public.ui_button_controls
  for all 
  using (
    exists (
      select 1 from public.users 
      where id = auth.uid() 
      and role = 'admin'
    )
  );

-- Insert default configurations for existing pages
insert into public.ui_button_controls (page_slug, allowed_variants, fallback_variant) values
  ('HeroSection', array['primary', 'glass'], 'primary'),
  ('Navbar', array['primary', 'secondary', 'glass'], 'primary'),
  ('Dashboard', array['primary', 'secondary'], 'primary'),
  ('Admin', array['primary', 'secondary', 'glass'], 'primary');
