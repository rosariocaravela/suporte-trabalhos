import { supabase } from "../lib/supabase";

async function getAuthenticatedUser() {
	const { data, error } = await supabase.auth.getUser();
	if (error) throw error;
	if (!data.user) throw new Error("Inicie sessão para continuar.");
	return data.user;
}

export async function listClientPayments() {
	const user = await getAuthenticatedUser();
	const { data, error } = await supabase
		.from("payments")
		.select("id, request_id, amount, currency, status, provider, provider_reference, created_at, updated_at, paid_at")
		.eq("user_id", user.id)
		.order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
}

export async function listProviderPayments() {
	await getAuthenticatedUser();
	const { data, error } = await supabase
		.from("payments")
		.select("id, request_id, user_id, amount, currency, status, provider, provider_reference, created_at, updated_at, paid_at, request:requests(id, subject, provider_id)")
		.order("created_at", { ascending: false });
	if (error) throw error;
	return (data ?? []).filter((payment) => payment.request?.provider_id);
}
