import { supabase } from "../lib/supabase";

async function getAuthenticatedUser() {
	const { data, error } = await supabase.auth.getUser();
	if (error) throw error;
	if (!data.user) throw new Error("Inicie sessão para continuar.");
	return data.user;
}

export async function listRequestMessages(requestId) {
	const { data, error } = await supabase
		.from("messages")
		.select("id, request_id, sender_id, message, read_at, created_at")
		.eq("request_id", requestId)
		.order("created_at");
	if (error) throw error;
	return data ?? [];
}

export async function sendRequestMessage(requestId, message) {
	const user = await getAuthenticatedUser();
	const cleanMessage = String(message ?? "").trim();
	if (!cleanMessage) throw new Error("Escreva uma mensagem antes de enviar.");
	if (cleanMessage.length > 5000) throw new Error("A mensagem não pode exceder 5000 caracteres.");

	const { data, error } = await supabase
		.from("messages")
		.insert({ request_id: requestId, sender_id: user.id, message: cleanMessage })
		.select("id, request_id, sender_id, message, read_at, created_at")
		.single();
	if (error) throw error;
	return data;
}

export async function markRequestMessagesRead(requestId) {
	const user = await getAuthenticatedUser();
	const { error } = await supabase
		.from("messages")
		.update({ read_at: new Date().toISOString() })
		.eq("request_id", requestId)
		.neq("sender_id", user.id)
		.is("read_at", null);
	if (error) throw error;
}