import { supabase } from "../lib/supabase";

async function getAuthenticatedUser() {
	const { data, error } = await supabase.auth.getUser();
	if (error) throw error;
	if (!data.user) throw new Error("Inicie sessão para continuar.");
	return data.user;
}

export async function updateProfile({ name, phone }) {
	const user = await getAuthenticatedUser();
	const cleanName = String(name ?? "").trim();
	if (!cleanName) throw new Error("O nome é obrigatório.");

	const { data, error } = await supabase
		.from("profiles")
		.update({ name: cleanName, phone: String(phone ?? "").trim() || null })
		.eq("id", user.id)
		.select("id, email, name, phone, role")
		.single();

	if (error) throw error;
	return data;
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
