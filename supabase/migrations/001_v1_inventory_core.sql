-- V1 relational schema for warehouse inventory orchestration
-- Vector table creation is user-owned and intentionally excluded.

create extension if not exists pgcrypto;

create table if not exists public.inventory (
  id uuid primary key default gen_random_uuid(),
  item_name text not null,
  category text not null,
  stock_level integer not null check (stock_level >= 0),
  reorder_point integer not null check (reorder_point >= 0),
  price numeric(12,2) not null check (price >= 0),
  supplier_email text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_inventory_item_name on public.inventory (item_name);
create index if not exists idx_inventory_low_stock on public.inventory (stock_level, reorder_point);

create table if not exists public.order_logs (
  id uuid primary key default gen_random_uuid(),
  item_name text not null,
  category text not null,
  price numeric(12,2) not null check (price >= 0),
  action text not null check (action in ('inbound', 'outbound')),
  quantity integer not null check (quantity > 0),
  event_timestamp timestamptz not null default now(),
  request_id uuid,
  created_at timestamptz not null default now()
);

create index if not exists idx_order_logs_item_action_ts on public.order_logs (item_name, action, event_timestamp desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_inventory_set_updated_at on public.inventory;
create trigger trg_inventory_set_updated_at
before update on public.inventory
for each row
execute function public.set_updated_at();

-- RLS baseline (no-auth v1, keep explicit policy surface for future migration)
alter table public.inventory enable row level security;
alter table public.order_logs enable row level security;

-- Temporary permissive read policies for no-auth v1 rollout.
drop policy if exists inventory_read_all on public.inventory;
create policy inventory_read_all on public.inventory
for select using (true);

drop policy if exists order_logs_read_all on public.order_logs;
create policy order_logs_read_all on public.order_logs
for select using (true);
