import { supabase } from "../lib/supabase";

const REQUEST_FIELDS = "id, client_id, provider_id, service_id, subject, description, contact_phone, priority, status, scheduled_at, created_at, updated_at, service:services(name, price)";

async function getAuthenticatedUser() {
	const { data, error } = await supabase.auth.getUser();
	if (error) throw error;
	if (!data.user) throw new Error("Inicie sessão para continuar.");
	return data.user;
}

export async function createSupportRequest({ serviceId, subject, description, contactPhone, priority = "MEDIUM" }) {
	const user = await getAuthenticatedUser();
	const cleanSubject = String(subject ?? "").trim();
	const cleanDescription = String(description ?? "").trim();
	if (!serviceId || !cleanSubject || !cleanDescription) {
		throw new Error("Selecione um serviço e preencha o assunto e a descrição.");
	}
	if (!["LOW", "MEDIUM", "HIGH", "URGENT"].includes(priority)) {
		throw new Error("Selecione uma prioridade válida.");
	}

	const { data: service, error: serviceError } = await supabase
		.from("services")
		.select("id, provider_id, is_active")
		.eq("id", serviceId)
		.eq("is_active", true)
		.maybeSingle();
	if (serviceError) throw serviceError;
	if (!service?.provider_id) throw new Error("Este serviço já não está disponível.");

	const { data, error } = await supabase
		.from("requests")
		.insert({
			client_id: user.id,
			provider_id: service.provider_id,
			service_id: service.id,
			subject: cleanSubject,
			description: cleanDescription,
			contact_phone: String(contactPhone ?? "").trim() || null,
			priority,
		})
		.select(REQUEST_FIELDS)
		.single();

	if (error) throw error;
	return data;
}

export async function listClientRequests() {
	const user = await getAuthenticatedUser();
	const { data, error } = await supabase
		.from("requests")
		.select(REQUEST_FIELDS)
		.eq("client_id", user.id)
		.order("created_at", { ascending: false });

	if (error) throw error;
	return data ?? [];
}

export async function listProviderRequests() {
	const user = await getAuthenticatedUser();
	const { data: requests, error } = await supabase
		.from("requests")
		.select(REQUEST_FIELDS)
		.eq("provider_id", user.id)
		.order("created_at", { ascending: false });

	if (error) throw error;
	if (!requests?.length) return [];

	const clientIds = [...new Set(requests.map((request) => request.client_id))];
	const { data: profiles, error: profilesError } = await supabase
		.from("profiles")
		.select("id, name, email, phone")
		.in("id", clientIds);
	if (profilesError) throw profilesError;

	const profileById = new Map((profiles ?? []).map((profile) => [profile.id, profile]));
	return requests.map((request) => ({ ...request, client: profileById.get(request.client_id) ?? null }));
}

export async function getRequestById(requestId) {
	const { data: request, error } = await supabase
		.from("requests")
		.select(REQUEST_FIELDS)
		.eq("id", requestId)
		.maybeSingle();
	if (error) throw error;
	if (!request) return null;

	const user = await getAuthenticatedUser();
	if (request.provider_id === user.id) {
		const { data: client, error: profileError } = await supabase
			.from("profiles")
			.select("id, name, email, phone")
			.eq("id", request.client_id)
			.maybeSingle();
		if (profileError) throw profileError;
		return { ...request, client };
	}
	if (request.client_id === user.id && request.provider_id) {
		const { data: provider, error: profileError } = await supabase
			.from("profiles")
			.select("id, name, email, phone")
			.eq("id", request.provider_id)
			.maybeSingle();
		if (profileError) throw profileError;
		return { ...request, provider };
	}

	return request;
}

export async function getRequestHistory(requestId) {
	const { data, error } = await supabase
		.from("request_status_history")
		.select("id, old_status, new_status, changed_by, created_at")
		.eq("request_id", requestId)
		.order("created_at");

	if (error) throw error;
	return data ?? [];
}

export async function updateRequestStatus(requestId, status) {
	if (!["IN_REVIEW", "SCHEDULED", "IN_PROGRESS", "COMPLETED", "CANCELLED"].includes(status)) {
		throw new Error("Selecione um estado válido.");
	}

	const { data, error } = await supabase
		.from("requests")
		.update({ status })
		.eq("id", requestId)
		.select(REQUEST_FIELDS)
		.single();

	if (error) throw error;
	return data;
}

export async function scheduleRequest(requestId, startsAt) {
	const startDate = new Date(startsAt);
	if (Number.isNaN(startDate.getTime()) || startDate <= new Date()) {
		throw new Error("Escolha uma data futura válida.");
	}

	const { data, error } = await supabase.rpc("schedule_request", {
		target_request_id: requestId,
		starts_at: startDate.toISOString(),
	});
	if (error) throw error;
	return data;
}

export async function cancelClientRequest(requestId) {
	return updateRequestStatus(requestId, "CANCELLED");
}
