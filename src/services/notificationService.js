import { supabase } from "../lib/supabase";

async function getAuthenticatedUser() {
	const { data, error } = await supabase.auth.getUser();
	if (error) throw error;
	if (!data.user) throw new Error("Inicie sessão para continuar.");
	return data.user;
}

export async function listNotifications(limit = 30) {
	const user = await getAuthenticatedUser();
	const { data, error } = await supabase
		.from("notifications")
		.select("id, request_id, title, message, type, read_at, created_at")
		.eq("user_id", user.id)
		.order("created_at", { ascending: false })
		.limit(limit);
	if (error) throw error;
	return data ?? [];
}

export async function markNotificationRead(notificationId) {
	const user = await getAuthenticatedUser();
	const { data, error } = await supabase
		.from("notifications")
		.update({ read_at: new Date().toISOString() })
		.eq("id", notificationId)
		.eq("user_id", user.id)
		.is("read_at", null)
		.select("id, request_id, title, message, type, read_at, created_at")
		.maybeSingle();
	if (error) throw error;
	return data;
}

export async function markAllNotificationsRead() {
	const user = await getAuthenticatedUser();
	const { error } = await supabase
		.from("notifications")
		.update({ read_at: new Date().toISOString() })
		.eq("user_id", user.id)
		.is("read_at", null);
	if (error) throw error;
}