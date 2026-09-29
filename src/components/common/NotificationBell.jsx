import { useEffect, useState } from "react";
import { Bell, CheckCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import useAuth from "../../hooks/useAuth";
import { listNotifications, markAllNotificationsRead, markNotificationRead } from "../../services/notificationService";

function NotificationBell() {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [notifications, setNotifications] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [open, setOpen] = useState(false);
	const [saving, setSaving] = useState(false);

	useEffect(() => {
		if (!user?.id) return undefined;
		let active = true;
		const refresh = async () => {
			try {
				const result = await listNotifications();
				if (active) { setNotifications(result); setError(""); }
			} catch (loadError) {
				console.error("Não foi possível carregar as notificações:", loadError);
				if (active) setError("Não foi possível carregar as notificações.");
			} finally {
				if (active) setLoading(false);
			}
		};

		void refresh();
		const channel = supabase
			.channel(`notifications-${user.id}`)
			.on("postgres_changes", {
				event: "*",
				schema: "public",
				table: "notifications",
				filter: `user_id=eq.${user.id}`,
			}, () => { void refresh(); })
			.subscribe();

		return () => {
			active = false;
			void supabase.removeChannel(channel);
		};
	}, [user?.id]);

	const retry = async () => {
		setLoading(true);
		setError("");
		try { setNotifications(await listNotifications()); }
		catch (loadError) { console.error("Não foi possível carregar as notificações:", loadError); setError("Não foi possível carregar as notificações."); }
		finally { setLoading(false); }
	};

	const handleRead = async (notification) => {
		if (notification.read_at) return;
		try {
			const updated = await markNotificationRead(notification.id);
			if (updated) setNotifications((current) => current.map((item) => item.id === updated.id ? updated : item));
		} catch (readError) {
			console.error("Não foi possível marcar a notificação:", readError);
			setError("Não foi possível atualizar a notificação.");
		}
	};

	const handleOpen = async (notification) => {
		await handleRead(notification);
		setOpen(false);
		if (notification.request_id) {
			const basePath = user?.role === "provider" ? "/provider/requests" : "/client/requests";
			navigate(`${basePath}/${notification.request_id}`);
		}
	};

	const handleReadAll = async () => {
		setSaving(true);
		setError("");
		try {
			await markAllNotificationsRead();
			const readAt = new Date().toISOString();
			setNotifications((current) => current.map((item) => ({ ...item, read_at: item.read_at ?? readAt })));
		} catch (readError) {
			console.error("Não foi possível marcar as notificações:", readError);
			setError("Não foi possível atualizar as notificações.");
		} finally { setSaving(false); }
	};

	const unreadCount = notifications.filter((item) => !item.read_at).length;

	return (
		<div className="relative">
			<button type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-label={`Notificações, ${unreadCount} por ler`} className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-primary">
				<Bell className="h-5 w-5" />
				{unreadCount > 0 && <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white">{unreadCount > 99 ? "99+" : unreadCount}</span>}
			</button>
			{open && <section className="absolute left-0 top-12 z-50 w-[min(22rem,calc(100vw-2rem))] rounded-xl border border-slate-200 bg-white shadow-xl lg:left-auto lg:right-0" aria-label="Notificações">
				<div className="flex items-center justify-between gap-3 border-b border-slate-100 p-4"><h2 className="font-bold text-slate-900">Notificações</h2><button type="button" disabled={saving || unreadCount === 0} onClick={handleReadAll} className="inline-flex items-center gap-1 text-xs font-semibold text-secondary disabled:opacity-50"><CheckCheck className="h-4 w-4" />Marcar todas lidas</button></div>
				{error && <div className="p-4 text-sm text-red-700" role="alert"><p>{error}</p><button type="button" onClick={retry} className="mt-2 font-bold underline">Tentar novamente</button></div>}
				{loading ? <p className="p-5 text-sm text-slate-500" role="status">A carregar notificações...</p> : !error && notifications.length === 0 ? <p className="p-5 text-sm text-slate-500">Ainda não tens notificações.</p> : <ul className="max-h-96 divide-y divide-slate-100 overflow-y-auto">{notifications.map((notification) => <li key={notification.id}><button type="button" onClick={() => handleOpen(notification)} className={`w-full p-4 text-left hover:bg-slate-50 ${notification.read_at ? "" : "bg-sky-50/60"}`}><span className="flex items-start justify-between gap-3"><span className="font-semibold text-slate-900">{notification.title}</span>{!notification.read_at && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-secondary" />}</span><span className="mt-1 block text-sm leading-5 text-slate-600">{notification.message}</span><time className="mt-2 block text-xs text-slate-400">{new Date(notification.created_at).toLocaleString("pt-PT")}</time></button></li>)}</ul>}
			</section>}
		</div>
	);
}

export default NotificationBell;