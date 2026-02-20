create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text default 'user'
);

alter table profiles enable row level security;

create policy "Users can view their own profile"
on profiles
for select
to authenticated
using (auth.uid() = id);

update profiles
set role = 'admin'
where id = 'YOUR_USER_ID';

select id, email from auth.users;