-- Execute schema.sql before this file. Safe to run again.

alter table public.profiles
  add column if not exists avatar_url text;

alter table public.profiles enable row level security;
alter table public.services enable row level security;
alter table public.requests enable row level security;
alter table public.contents enable row level security;
alter table public.videos enable row level security;
alter table public.request_status_history enable row level security;
alter table public.notifications enable row level security;
alter table public.messages enable row level security;
alter table public.payments enable row level security;

drop policy if exists "Usuário pode ver seu próprio perfil" on public.profiles;
drop policy if exists "Usuário pode atualizar seu próprio perfil" on public.profiles;
drop policy if exists "Prestador pode ver clientes dos pedidos atribuídos" on public.profiles;
drop policy if exists "Cliente pode ver prestadores dos próprios pedidos" on public.profiles;
drop policy if exists "Qualquer pessoa pode listar serviços" on public.services;
drop policy if exists "Prestador pode inserir serviços" on public.services;
drop policy if exists "Prestador pode atualizar seus serviços" on public.services;
drop policy if exists "Prestador pode eliminar seus serviços" on public.services;
drop policy if exists "Qualquer pessoa pode ver conteúdos" on public.contents;
drop policy if exists "Qualquer pessoa pode ver conteúdos publicados" on public.contents;
drop policy if exists "Cliente pode ver seus pedidos" on public.requests;
drop policy if exists "Cliente pode criar pedidos" on public.requests;
drop policy if exists "Prestador pode atualizar pedidos atribuídos" on public.requests;
drop policy if exists "Cliente pode cancelar pedidos pendentes" on public.requests;
drop policy if exists "Prestador pode ver seus conteúdos" on public.contents;
drop policy if exists "Prestador pode criar conteúdos" on public.contents;
drop policy if exists "Prestador pode atualizar conteúdos" on public.contents;
drop policy if exists "Prestador pode eliminar conteúdos" on public.contents;
drop policy if exists "Qualquer pessoa pode ver vídeos" on public.videos;
drop policy if exists "Qualquer pessoa pode ver vídeos publicados" on public.videos;
drop policy if exists "Prestador pode ver seus vídeos" on public.videos;
drop policy if exists "Prestador pode criar vídeos" on public.videos;
drop policy if exists "Prestador pode atualizar vídeos" on public.videos;
drop policy if exists "Prestador pode eliminar vídeos" on public.videos;
drop policy if exists "Participantes podem ver histórico do pedido" on public.request_status_history;
drop policy if exists "Utilizador pode ver as próprias notificações" on public.notifications;
drop policy if exists "Utilizador pode marcar as próprias notificações" on public.notifications;
drop policy if exists "Participantes podem ver mensagens do pedido" on public.messages;
drop policy if exists "Participante pode enviar mensagens no pedido" on public.messages;
drop policy if exists "Destinatário pode marcar mensagens como lidas" on public.messages;
drop policy if exists "Utilizador pode ver pagamentos relacionados" on public.payments;
drop policy if exists "Avatar storage public read" on storage.objects;
drop policy if exists "Avatar storage user insert" on storage.objects;
drop policy if exists "Avatar storage user update" on storage.objects;
drop policy if exists "Avatar storage user delete" on storage.objects;
drop function if exists public.is_provider(uuid);

insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do update set public = true;

create policy "Avatar storage public read"
on storage.objects for select to public
using (bucket_id = 'avatars');

create policy "Avatar storage user insert"
on storage.objects for insert to authenticated
with check (
  bucket_id = 'avatars'
  and auth.uid()::text = any (storage.foldername(name))
);

create policy "Avatar storage user update"
on storage.objects for update to authenticated
using (
  bucket_id = 'avatars'
  and auth.uid()::text = any (storage.foldername(name))
)
with check (
  bucket_id = 'avatars'
  and auth.uid()::text = any (storage.foldername(name))
);

create policy "Avatar storage user delete"
on storage.objects for delete to authenticated
using (
  bucket_id = 'avatars'
  and auth.uid()::text = any (storage.foldername(name))
);

revoke all on public.profiles, public.services, public.requests, public.contents,
	public.videos, public.request_status_history, public.notifications, public.messages,
	public.payments
from anon, authenticated;
grant usage on schema public to anon, authenticated;
revoke all on function public.is_provider() from public, anon;
grant execute on function public.is_provider() to authenticated;
revoke all on function public.schedule_request(uuid, timestamptz) from public, anon;
grant execute on function public.schedule_request(uuid, timestamptz) to authenticated;

grant select on public.profiles to authenticated;
grant update (name, phone, avatar_url) on public.profiles to authenticated;

grant select on public.services to anon, authenticated;
grant insert, update, delete on public.services to authenticated;

grant select on public.requests to authenticated;
grant insert (client_id, provider_id, service_id, subject, description, contact_phone, priority)
	on public.requests to authenticated;
grant update (status) on public.requests to authenticated;

grant select on public.contents, public.videos to anon, authenticated;
grant insert, update, delete on public.contents, public.videos to authenticated;

grant select on public.request_status_history to authenticated;
grant select on public.notifications to authenticated;
grant update (read_at) on public.notifications to authenticated;
grant select, insert on public.messages to authenticated;
grant update (read_at) on public.messages to authenticated;
grant select on public.payments to authenticated;

create policy "Usuário pode ver seu próprio perfil"
on public.profiles for select to authenticated
using (auth.uid() = id);

create policy "Prestador pode ver clientes dos pedidos atribuídos"
on public.profiles for select to authenticated
using (
	exists (
		select 1 from public.requests r
		where r.client_id = profiles.id and r.provider_id = auth.uid()
	)
);

create policy "Cliente pode ver prestadores dos próprios pedidos"
on public.profiles for select to authenticated
using (
	exists (
		select 1 from public.requests r
		where r.provider_id = profiles.id and r.client_id = auth.uid()
	)
);

create policy "Usuário pode atualizar seu próprio perfil"
on public.profiles for update to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create policy "Qualquer pessoa pode listar serviços"
on public.services for select to anon, authenticated
using (is_active or provider_id = auth.uid());

create policy "Prestador pode inserir serviços"
on public.services for insert to authenticated
with check (auth.uid() = provider_id and public.is_provider());

create policy "Prestador pode atualizar seus serviços"
on public.services for update to authenticated
using (auth.uid() = provider_id and public.is_provider())
with check (auth.uid() = provider_id and public.is_provider());

create policy "Prestador pode eliminar seus serviços"
on public.services for delete to authenticated
using (auth.uid() = provider_id and public.is_provider());

create policy "Cliente pode ver seus pedidos"
on public.requests for select to authenticated
using (auth.uid() = client_id or auth.uid() = provider_id);

create policy "Cliente pode criar pedidos"
on public.requests for insert to authenticated
with check (
	auth.uid() = client_id
	and status = 'PENDING'
	and exists (
		select 1 from public.services s
		where s.id = service_id
			and s.provider_id = requests.provider_id
			and s.is_active
	)
);

create policy "Prestador pode atualizar pedidos atribuídos"
on public.requests for update to authenticated
using (auth.uid() = provider_id and public.is_provider())
with check (auth.uid() = provider_id and public.is_provider());

create policy "Cliente pode cancelar pedidos pendentes"
on public.requests for update to authenticated
using (auth.uid() = client_id and status = 'PENDING')
with check (auth.uid() = client_id and status = 'CANCELLED');

create policy "Qualquer pessoa pode ver conteúdos publicados"
on public.contents for select to anon
using (is_published);

create policy "Prestador pode ver seus conteúdos"
on public.contents for select to authenticated
using (is_published or (provider_id = auth.uid() and public.is_provider()));

create policy "Prestador pode criar conteúdos"
on public.contents for insert to authenticated
with check (provider_id = auth.uid() and public.is_provider());

create policy "Prestador pode atualizar conteúdos"
on public.contents for update to authenticated
using (provider_id = auth.uid() and public.is_provider())
with check (provider_id = auth.uid() and public.is_provider());

create policy "Prestador pode eliminar conteúdos"
on public.contents for delete to authenticated
using (provider_id = auth.uid() and public.is_provider());

create policy "Qualquer pessoa pode ver vídeos publicados"
on public.videos for select to anon
using (is_published);

create policy "Prestador pode ver seus vídeos"
on public.videos for select to authenticated
using (is_published or (provider_id = auth.uid() and public.is_provider()));

create policy "Prestador pode criar vídeos"
on public.videos for insert to authenticated
with check (provider_id = auth.uid() and public.is_provider());

create policy "Prestador pode atualizar vídeos"
on public.videos for update to authenticated
using (provider_id = auth.uid() and public.is_provider())
with check (provider_id = auth.uid() and public.is_provider());

create policy "Prestador pode eliminar vídeos"
on public.videos for delete to authenticated
using (provider_id = auth.uid() and public.is_provider());

create policy "Participantes podem ver histórico do pedido"
on public.request_status_history for select to authenticated
using (
	exists (
		select 1 from public.requests r
		where r.id = request_status_history.request_id
			and (r.client_id = auth.uid() or r.provider_id = auth.uid())
	)
);

create policy "Utilizador pode ver as próprias notificações"
on public.notifications for select to authenticated
using (user_id = auth.uid());

create policy "Utilizador pode marcar as próprias notificações"
on public.notifications for update to authenticated
using (user_id = auth.uid())
with check (user_id = auth.uid());

create policy "Participantes podem ver mensagens do pedido"
on public.messages for select to authenticated
using (
	exists (
		select 1 from public.requests r
		where r.id = messages.request_id
			and (r.client_id = auth.uid() or r.provider_id = auth.uid())
	)
);

create policy "Participante pode enviar mensagens no pedido"
on public.messages for insert to authenticated
with check (
	sender_id = auth.uid()
	and exists (
		select 1 from public.requests r
		where r.id = messages.request_id
			and (r.client_id = auth.uid() or r.provider_id = auth.uid())
	)
);

create policy "Destinatário pode marcar mensagens como lidas"
on public.messages for update to authenticated
using (
	sender_id <> auth.uid()
	and exists (
		select 1 from public.requests r
		where r.id = messages.request_id
			and (r.client_id = auth.uid() or r.provider_id = auth.uid())
	)
)
with check (
	sender_id <> auth.uid()
	and exists (
		select 1 from public.requests r
		where r.id = messages.request_id
			and (r.client_id = auth.uid() or r.provider_id = auth.uid())
	)
);

create policy "Utilizador pode ver pagamentos relacionados"
on public.payments for select to authenticated
using (
	user_id = auth.uid()
	or exists (
		select 1 from public.requests r
		where r.id = payments.request_id and r.provider_id = auth.uid()
	)
);
