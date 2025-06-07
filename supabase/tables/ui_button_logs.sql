
-- UI Button Logs table for tracking button variant usage
create table public.ui_button_logs (
  id uuid primary key default gen_random_uuid(),
  page text not null,
  variant text not null,
  user_id uuid references auth.users(id),
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.ui_button_logs enable row level security;

-- Only admins can read logs
create policy "Admins can read button logs" 
  on public.ui_button_logs
  for select 
  using (
    exists (
      select 1 from public.users 
      where id = auth.uid() 
      and role = 'admin'
    )
  );

-- All authenticated users can insert logs
create policy "Authenticated users can log button usage" 
  on public.ui_button_logs
  for insert 
  with check (auth.uid() = user_id);
