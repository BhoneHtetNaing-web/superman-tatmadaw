create extension if not exists "uuid-ossp";

create table if not exists messages (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id),
  email text not null,
  message text not null,
  created_at timestamp with time zone default now()
);

alter table messages enable row level security;

create policy "Users can insert their own message"
on messages
for insert
to authenticated
with check (auth.uid() = user_id);