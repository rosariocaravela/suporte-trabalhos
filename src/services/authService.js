import { supabase } from "../lib/supabase";
import { buildProfileAvatarPath, isValidProfileImage } from "../utils/profileAvatar";

async function getAuthenticatedUser() {
	const { data, error } = await supabase.auth.getUser();
	if (error) throw error;
	if (!data.user) throw new Error("Inicie sessão para continuar.");
	return data.user;
}

export async function updateProfile({ name, phone, avatar_url }) {
	const user = await getAuthenticatedUser();
	const cleanName = String(name ?? "").trim();
	if (!cleanName) throw new Error("O nome é obrigatório.");

	const updates = {
		name: cleanName,
		phone: String(phone ?? "").trim() || null,
	};
	if (avatar_url !== undefined) updates.avatar_url = avatar_url || null;

	const { data, error } = await supabase
		.from("profiles")
		.update(updates)
		.eq("id", user.id)
		.select("id, email, name, phone, role, avatar_url")
		.single();

	if (error) throw error;
	return data;
}

export async function uploadProfileImage(file) {
	const validation = isValidProfileImage(file);
	if (!validation.valid) throw new Error(validation.reason);

	const user = await getAuthenticatedUser();
	const uploadPath = buildProfileAvatarPath(user.id, file.name);
	const { error: uploadError } = await supabase.storage
		.from("avatars")
		.upload(uploadPath, file, {
			cacheControl: "3600",
			upsert: true,
			contentType: file.type,
		});
	if (uploadError) throw uploadError;

	const { data: publicUrlData } = supabase.storage.from("avatars").getPublicUrl(uploadPath);
	return publicUrlData?.publicUrl ?? null;
}

export async function requestPasswordReset(email) {
	const normalizedEmail = String(email ?? "").trim().toLowerCase();
	if (!normalizedEmail) throw new Error("Indique o email da conta.");

	const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
		redirectTo: `${window.location.origin}/auth/password-reset`,
	});
	if (error) throw error;
}

export async function updatePassword(password) {
	if (String(password ?? "").length < 6) throw new Error("A palavra-passe deve ter pelo menos 6 caracteres.");
	const { error } = await supabase.auth.updateUser({ password });
	if (error) throw error;
}

export async function signInWithProvider(provider) {
	if (!["google", "github"].includes(provider)) throw new Error("Fornecedor de autenticação inválido.");
	const { error } = await supabase.auth.signInWithOAuth({
		provider,
		options: { redirectTo: `${window.location.origin}/auth/login` },
	});
	if (error) throw error;
}
