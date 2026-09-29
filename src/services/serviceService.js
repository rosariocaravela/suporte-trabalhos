import { supabase } from "../lib/supabase";

const SERVICE_FIELDS = "id, name, description, price, provider_id, is_active, duration_minutes, created_at, updated_at";

async function getAuthenticatedUser() {
	const { data, error } = await supabase.auth.getUser();
	if (error) throw error;
	if (!data.user) throw new Error("Inicie sessão para continuar.");
	return data.user;
}

function normalizeService(service) {
	return {
		name: String(service.name ?? "").trim(),
		description: String(service.description ?? "").trim(),
		price: service.price === "" || service.price == null ? null : Number(service.price),
		duration_minutes: service.duration_minutes === "" || service.duration_minutes == null
			? null
			: Number(service.duration_minutes),
	};
}

export async function listActiveServices() {
	const { data, error } = await supabase
		.from("services")
		.select(SERVICE_FIELDS)
		.eq("is_active", true)
		.order("name");

	if (error) throw error;
	return data ?? [];
}

export async function listProviderServices() {
	const user = await getAuthenticatedUser();
	const { data, error } = await supabase
		.from("services")
		.select(SERVICE_FIELDS)
		.eq("provider_id", user.id)
		.order("created_at", { ascending: false });

	if (error) throw error;
	return data ?? [];
}

export async function createService(input) {
	const user = await getAuthenticatedUser();
	const service = normalizeService(input);
	if (!service.name) throw new Error("Indique o nome do serviço.");
	if (service.price !== null && (!Number.isFinite(service.price) || service.price < 0)) {
		throw new Error("Indique um preço válido.");
	}
	if (service.duration_minutes !== null && (!Number.isInteger(service.duration_minutes) || service.duration_minutes <= 0)) {
		throw new Error("Indique uma duração válida em minutos.");
	}

	const { data, error } = await supabase
		.from("services")
		.insert({ ...service, provider_id: user.id, is_active: true })
		.select(SERVICE_FIELDS)
		.single();

	if (error) throw error;
	return data;
}

export async function updateService(serviceId, input) {
	const user = await getAuthenticatedUser();
	const service = normalizeService(input);
	if (!service.name) throw new Error("Indique o nome do serviço.");
	if (service.price !== null && (!Number.isFinite(service.price) || service.price < 0)) {
		throw new Error("Indique um preço válido.");
	}
	if (service.duration_minutes !== null && (!Number.isInteger(service.duration_minutes) || service.duration_minutes <= 0)) {
		throw new Error("Indique uma duração válida em minutos.");
	}

	const { data, error } = await supabase
		.from("services")
		.update(service)
		.eq("id", serviceId)
		.eq("provider_id", user.id)
		.select(SERVICE_FIELDS)
		.single();

	if (error) throw error;
	return data;
}

export async function setServiceActive(serviceId, isActive) {
	const user = await getAuthenticatedUser();
	const { data, error } = await supabase
		.from("services")
		.update({ is_active: Boolean(isActive) })
		.eq("id", serviceId)
		.eq("provider_id", user.id)
		.select(SERVICE_FIELDS)
		.single();

	if (error) throw error;
	return data;
}

export async function deleteService(serviceId) {
	const user = await getAuthenticatedUser();
	const { error } = await supabase
		.from("services")
		.delete()
		.eq("id", serviceId)
		.eq("provider_id", user.id);

	if (error) throw error;
}
