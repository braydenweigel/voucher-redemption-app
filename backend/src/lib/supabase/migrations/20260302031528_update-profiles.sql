alter table public.profiles
add column email text unique,
add column first_name text not null default '',
add column last_name text not null default '';

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    profileID,
    first_name,
    last_name,
    email
  )
  values (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.email
  );

  return new;
end;
$$;

create or replace function public.sync_user_email()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
  set email = new.email
  where profileID = new.id;

  return new;
end;
$$;

create trigger on_auth_user_updated
after update of email on auth.users
for each row
execute procedure public.sync_user_email();