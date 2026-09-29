import { supabase } from "../lib/supabase";

const CONTENT_FIELDS = "id, title, description, url, category, image_url, provider_id, is_published, created_at, updated_at";

async function getAuthenticatedUser() {
	const { data, error } = await supabase.auth.getUser();
	if (error) throw error;
	if (!data.user) throw new Error("Inicie sessão para continuar.");
	return data.user;
}

function normalizeContent(content) {
	return {
		title: String(content.title ?? "").trim(),
		description: String(content.description ?? "").trim(),
		url: String(content.url ?? "").trim() || null,
		category: String(content.category ?? "").trim() || null,
		image_url: String(content.image_url ?? "").trim() || null,
		is_published: Boolean(content.is_published),
	};
}

export async function listPublishedContents() {
	const { data, error } = await supabase
		.from("contents")
		.select(CONTENT_FIELDS)
		.eq("is_published", true)
		.order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
}

export async function listProviderContents() {
	const user = await getAuthenticatedUser();
	const { data, error } = await supabase
		.from("contents")
		.select(CONTENT_FIELDS)
		.eq("provider_id", user.id)
		.order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
}

export async function createContent(input) {
	const user = await getAuthenticatedUser();
	const content = normalizeContent(input);
	if (!content.title || !content.description) throw new Error("Título e descrição são obrigatórios.");

	const { data, error } = await supabase
		.from("contents")
		.insert({ ...content, provider_id: user.id })
		.select(CONTENT_FIELDS)
		.single();
	if (error) throw error;
	return data;
}

export async function updateContent(contentId, input) {
	const user = await getAuthenticatedUser();
	const content = normalizeContent(input);
	if (!content.title || !content.description) throw new Error("Título e descrição são obrigatórios.");

	const { data, error } = await supabase
		.from("contents")
		.update(content)
		.eq("id", contentId)
		.eq("provider_id", user.id)
		.select(CONTENT_FIELDS)
		.single();
	if (error) throw error;
	return data;
}

export async function deleteContent(contentId) {
	const user = await getAuthenticatedUser();
	const { error } = await supabase
		.from("contents")
		.delete()
		.eq("id", contentId)
		.eq("provider_id", user.id);
	if (error) throw error;
}
