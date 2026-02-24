create extension if not exists "pgcrypto";

-- Profile Table
create table public.profiles (
  profileID uuid not null references auth.users on delete cascade,
  primary key (profileID)
);

alter table public.profiles enable row level security;

-- inserts a row into public.profiles
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (profileID)
  values (new.id);
  return new;
end;
$$;

-- trigger the function every time a user is created
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Voucher Table
create table public.vouchers (
    voucherID uuid primary key default gen_random_uuid(),
    registered boolean not null default false,
    redeemed boolean not null default false,
    redeemedAt timestamptz,
    createdAt timestamptz default now(),
    batch int
);