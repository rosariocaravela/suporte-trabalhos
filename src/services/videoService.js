import { supabase } from "../lib/supabase";

const VIDEO_FIELDS = "id, title, description, url, category, provider_id, is_published, created_at, updated_at";

async function getAuthenticatedUser() {
	const { data, error } = await supabase.auth.getUser();
	if (error) throw error;
	if (!data.user) throw new Error("Inicie sessão para continuar.");
	return data.user;
}

function normalizeVideo(video) {
	const url = String(video.url ?? "").trim();
	if (!url) throw new Error("Indique o endereço do vídeo.");
	let parsedUrl;
	try {
		parsedUrl = new URL(url);
	} catch {
		throw new Error("Indique um endereço de vídeo válido.");
	}
	if (!["http:", "https:"].includes(parsedUrl.protocol)) throw new Error("O endereço deve começar por http ou https.");

	return {
		title: String(video.title ?? "").trim(),
		description: String(video.description ?? "").trim() || null,
		url,
		category: String(video.category ?? "").trim() || null,
		is_published: Boolean(video.is_published),
	};
}

export async function listPublishedVideos() {
	const { data, error } = await supabase
		.from("videos")
		.select(VIDEO_FIELDS)
		.eq("is_published", true)
		.order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
}

export async function listProviderVideos() {
	const user = await getAuthenticatedUser();
	const { data, error } = await supabase
		.from("videos")
		.select(VIDEO_FIELDS)
		.eq("provider_id", user.id)
		.order("created_at", { ascending: false });
	if (error) throw error;
	return data ?? [];
}

export async function createVideo(input) {
	const user = await getAuthenticatedUser();
	const video = normalizeVideo(input);
	if (!video.title) throw new Error("Indique o título do vídeo.");
	const { data, error } = await supabase
		.from("videos")
		.insert({ ...video, provider_id: user.id })
		.select(VIDEO_FIELDS)
		.single();
	if (error) throw error;
	return data;
}

export async function updateVideo(videoId, input) {
	const user = await getAuthenticatedUser();
	const video = normalizeVideo(input);
	if (!video.title) throw new Error("Indique o título do vídeo.");
	const { data, error } = await supabase
		.from("videos")
		.update(video)
		.eq("id", videoId)
		.eq("provider_id", user.id)
		.select(VIDEO_FIELDS)
		.single();
	if (error) throw error;
	return data;
}

export async function deleteVideo(videoId) {
	const user = await getAuthenticatedUser();
	const { error } = await supabase
		.from("videos")
		.delete()
		.eq("id", videoId)
		.eq("provider_id", user.id);
	if (error) throw error;
}