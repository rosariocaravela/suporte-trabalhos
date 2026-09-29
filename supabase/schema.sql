-- Estrutura inicial para Supabase

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text unique not null,
  name text not null,
  phone text,
  role text not null default 'client' constraint profiles_role_check check (role in ('client', 'provider', 'admin')),
  created_at timestamptz default now()
);

create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric,
  provider_id uuid references auth.users(id) on delete cascade,
  is_active boolean not null default true,
  duration_minutes integer,
  created_at timestamptz default now()
);

create table if not exists requests (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references auth.users(id) on delete cascade,
  provider_id uuid references auth.users(id) on delete cascade,
  service_id uuid references services(id) on delete set null,
  subject text not null default 'Pedido de suporte',
  description text not null default '',
  contact_phone text,
  priority text not null default 'MEDIUM',
  scheduled_at timestamptz,
  status text not null default 'PENDING',
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint requests_status_check check (status in ('PENDING', 'IN_REVIEW', 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
  constraint requests_priority_check check (priority in ('LOW', 'MEDIUM', 'HIGH', 'URGENT'))
);

create table if not exists contents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  url text,
  category text,
  image_url text,
  provider_id uuid references auth.users(id) on delete cascade,
  is_published boolean not null default false,
  created_at timestamptz default now()
);

create table if not exists videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  url text not null,
  description text,
  category text,
  provider_id uuid references auth.users(id) on delete cascade,
  is_published boolean not null default false,
  created_at timestamptz default now()
);

alter table public.profiles
  add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_role_check'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_role_check
      check (role in ('client', 'provider', 'admin')) not valid;
  end if;
end;
$$;

alter table public.services
  add column if not exists is_active boolean not null default true,
  add column if not exists duration_minutes integer,
  add column if not exists updated_at timestamptz not null default now();

alter table public.requests
  add column if not exists subject text not null default 'Pedido de suporte',
  add column if not exists description text not null default '',
  add column if not exists contact_phone text,
  add column if not exists priority text not null default 'MEDIUM',
  add column if not exists scheduled_at timestamptz,
  add column if not exists updated_at timestamptz not null default now();

update public.requests
set description = coalesce(nullif(description, ''), notes, ''),
    status = case lower(coalesce(status, 'pending'))
      when 'pending' then 'PENDING'
      when 'reviewing' then 'IN_REVIEW'
      when 'in_review' then 'IN_REVIEW'
      when 'waiting_client' then 'IN_REVIEW'
      when 'quote_sent' then 'IN_REVIEW'
      when 'awaiting_payment' then 'IN_REVIEW'
      when 'scheduled' then 'SCHEDULED'
      when 'in_progress' then 'IN_PROGRESS'
      when 'completed' then 'COMPLETED'
      when 'cancelled' then 'CANCELLED'
      else 'PENDING'
    end;

alter table public.requests
  alter column status set default 'PENDING',
  alter column status set not null;

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'requests_status_check'
      and conrelid = 'public.requests'::regclass
  ) then
    alter table public.requests
      add constraint requests_status_check
      check (status in ('PENDING', 'IN_REVIEW', 'SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')) not valid;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'requests_priority_check'
      and conrelid = 'public.requests'::regclass
  ) then
    alter table public.requests
      add constraint requests_priority_check
      check (priority in ('LOW', 'MEDIUM', 'HIGH', 'URGENT')) not valid;
  end if;
end;
$$;

alter table public.contents
  add column if not exists category text,
  add column if not exists image_url text,
  add column if not exists provider_id uuid references auth.users(id) on delete cascade,
  add column if not exists is_published boolean not null default false,
  add column if not exists updated_at timestamptz not null default now();

alter table public.videos
  add column if not exists description text,
  add column if not exists category text,
  add column if not exists provider_id uuid references auth.users(id) on delete cascade,
  add column if not exists is_published boolean not null default false,
  add column if not exists updated_at timestamptz not null default now();

create table if not exists public.request_status_history (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.requests(id) on delete cascade,
  old_status text,
  new_status text not null,
  changed_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  request_id uuid references public.requests(id) on delete cascade,
  title text not null,
  message text not null,
  type text not null default 'SYSTEM',
  read_at timestamptz,
  created_at timestamptz not null default now()
);

alter table public.notifications
  add column if not exists request_id uuid references public.requests(id) on delete cascade;

create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.requests(id) on delete cascade,
  sender_id uuid not null references auth.users(id) on delete cascade,
  message text not null,
  read_at timestamptz,
  created_at timestamptz not null default now(),
  constraint messages_body_check check (length(trim(message)) between 1 and 5000)
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  request_id uuid not null references public.requests(id) on delete restrict,
  user_id uuid not null references auth.users(id) on delete restrict,
  amount numeric(12, 2) not null check (amount > 0),
  currency char(3) not null default 'MZN',
  status text not null default 'PENDING' check (status in ('PENDING', 'PROCESSING', 'PAID', 'FAILED', 'CANCELLED', 'REFUNDED')),
  provider text,
  provider_reference text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  paid_at timestamptz
);

create index if not exists requests_client_created_idx on public.requests (client_id, created_at desc);
create index if not exists requests_provider_status_idx on public.requests (provider_id, status, created_at desc);
create index if not exists requests_service_id_idx on public.requests (service_id);
create index if not exists request_status_history_request_idx on public.request_status_history (request_id, created_at);
create index if not exists notifications_user_unread_idx on public.notifications (user_id, created_at desc) where read_at is null;
create index if not exists services_active_idx on public.services (is_active, name);
create index if not exists messages_request_created_idx on public.messages (request_id, created_at);
create index if not exists payments_user_created_idx on public.payments (user_id, created_at desc);
create index if not exists payments_request_idx on public.payments (request_id, created_at desc);

create or replace function public.is_provider()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role in ('provider', 'admin')
  );
$$;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.record_request_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if tg_op = 'INSERT' then
    insert into public.request_status_history (request_id, old_status, new_status, changed_by)
    values (new.id, null, new.status, auth.uid());

    insert into public.notifications (user_id, request_id, title, message, type)
    values (new.client_id, new.id, 'Pedido registado', 'O seu pedido foi recebido.', 'REQUEST_CREATED');

    if new.provider_id is not null then
      insert into public.notifications (user_id, request_id, title, message, type)
      values (new.provider_id, new.id, 'Novo pedido', 'Recebeu um novo pedido de suporte.', 'REQUEST_CREATED');
    end if;
  elsif old.status is distinct from new.status then
    if auth.uid() = old.client_id then
      if old.status <> 'PENDING' or new.status <> 'CANCELLED' then
        raise exception 'O cliente só pode cancelar pedidos pendentes.' using errcode = '42501';
      end if;
    elsif not public.is_provider() or old.provider_id <> auth.uid() then
      raise exception 'Sem permissão para alterar este pedido.' using errcode = '42501';
    elsif not (
      (old.status = 'PENDING' and new.status = 'IN_REVIEW') or
      (old.status = 'IN_REVIEW' and new.status in ('SCHEDULED', 'IN_PROGRESS', 'CANCELLED')) or
      (old.status = 'SCHEDULED' and new.status in ('IN_PROGRESS', 'CANCELLED')) or
      (old.status = 'IN_PROGRESS' and new.status in ('COMPLETED', 'CANCELLED'))
    ) then
      raise exception 'Transição de estado inválida.' using errcode = '22023';
    end if;

    insert into public.request_status_history (request_id, old_status, new_status, changed_by)
    values (new.id, old.status, new.status, auth.uid());

    insert into public.notifications (user_id, request_id, title, message, type)
    values (
      new.client_id,
      new.id,
      'Pedido atualizado',
      'O estado do seu pedido foi atualizado para ' || new.status || '.',
      'REQUEST_STATUS_CHANGED'
    );
  end if;

  return new;
end;
$$;

create or replace function public.schedule_request(target_request_id uuid, starts_at timestamptz)
returns public.requests
language plpgsql
security definer
set search_path = ''
as $$
declare
  scheduled_request public.requests;
begin
  if not public.is_provider() then
    raise exception 'Apenas prestadores podem agendar pedidos.' using errcode = '42501';
  end if;

  if starts_at is null or starts_at <= now() then
    raise exception 'A data de agendamento deve ser futura.' using errcode = '22023';
  end if;

  update public.requests
  set status = 'SCHEDULED', scheduled_at = starts_at
  where id = target_request_id
    and provider_id = auth.uid()
    and status = 'IN_REVIEW'
  returning * into scheduled_request;

  if not found then
    raise exception 'Pedido inexistente ou não está em análise.' using errcode = 'P0002';
  end if;

  return scheduled_request;
end;
$$;

create or replace function public.notify_new_message()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  recipient_id uuid;
begin
  select case
    when r.client_id = new.sender_id then r.provider_id
    else r.client_id
  end
  into recipient_id
  from public.requests r
  where r.id = new.request_id
    and (r.client_id = new.sender_id or r.provider_id = new.sender_id);

  if recipient_id is null then
    raise exception 'O remetente não participa deste pedido.' using errcode = '42501';
  end if;

  insert into public.notifications (user_id, request_id, title, message, type)
  values (recipient_id, new.request_id, 'Nova mensagem', 'Recebeu uma mensagem sobre um pedido de suporte.', 'MESSAGE');

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

drop trigger if exists services_set_updated_at on public.services;
create trigger services_set_updated_at
  before update on public.services
  for each row execute procedure public.set_updated_at();

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

drop trigger if exists requests_set_updated_at on public.requests;
create trigger requests_set_updated_at
  before update on public.requests
  for each row execute procedure public.set_updated_at();

drop trigger if exists contents_set_updated_at on public.contents;
create trigger contents_set_updated_at
  before update on public.contents
  for each row execute procedure public.set_updated_at();

drop trigger if exists videos_set_updated_at on public.videos;
create trigger videos_set_updated_at
  before update on public.videos
  for each row execute procedure public.set_updated_at();

drop trigger if exists requests_record_change on public.requests;
create trigger requests_record_change
  after insert or update of status on public.requests
  for each row execute procedure public.record_request_change();

drop trigger if exists messages_notify_recipient on public.messages;
create trigger messages_notify_recipient
  after insert on public.messages
  for each row execute procedure public.notify_new_message();

drop trigger if exists payments_set_updated_at on public.payments;
create trigger payments_set_updated_at
  before update on public.payments
  for each row execute procedure public.set_updated_at();

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'requests'
    ) then
      execute 'alter publication supabase_realtime add table public.requests';
    end if;
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'notifications'
    ) then
      execute 'alter publication supabase_realtime add table public.notifications';
    end if;
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'messages'
    ) then
      execute 'alter publication supabase_realtime add table public.messages';
    end if;
  end if;
end;
$$;
