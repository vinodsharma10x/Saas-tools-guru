-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create tools table
create table if not exists public.tools (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  logo text not null,
  description text not null,
  founder text not null,
  features jsonb not null,
  pricing jsonb not null,
  website text not null,
  video_url text,
  screenshots jsonb not null,
  how_to_use text not null,
  pros jsonb not null,
  cons jsonb not null,
  best_for jsonb not null,
  category text not null,
  
  constraint tools_name_unique unique (name)
);

-- Create indexes
create index if not exists idx_tools_category on public.tools(category);
create index if not exists idx_tools_name on public.tools(name);
create index if not exists idx_tools_search on public.tools using gin (
  to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, ''))
);

-- Set up Row Level Security (RLS)
alter table public.tools enable row level security;

-- Create policies
create policy "Allow public read access"
  on public.tools for select
  to anon
  using (true);

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

create trigger handle_tools_updated_at
  before update on public.tools
  for each row
  execute function public.handle_updated_at();

-- Add full-text search function
create or replace function public.tools_search(search_query text)
returns setof public.tools as $$
  select *
  from public.tools
  where
    to_tsvector('english', name || ' ' || description) @@ plainto_tsquery('english', search_query)
    or name ilike '%' || search_query || '%'
    or description ilike '%' || search_query || '%'
  order by ts_rank(to_tsvector('english', name || ' ' || description), plainto_tsquery('english', search_query)) desc;
$$ language sql stable;