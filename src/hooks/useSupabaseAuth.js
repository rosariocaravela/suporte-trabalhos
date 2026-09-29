import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { updateProfile as persistProfile } from "../services/authService";

function useSupabaseAuth() {
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		let active = true;

		const loadProfile = async (authUser) => {
			if (!authUser) {
				if (active) setUser(null);
				return null;
			}

			const { data, error } = await supabase
				.from("profiles")
				.select("id, email, name, phone, role")
				.eq("id", authUser.id)
				.maybeSingle();

			if (error) throw error;

			const profile = data ?? {
				id: authUser.id,
				email: authUser.email,
				name: authUser.user_metadata?.name ?? "",
				phone: authUser.user_metadata?.phone ?? "",
				role: "client",
			};

			if (active) setUser(profile);
			return profile;
		};

		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			if (!session) {
				setUser(null);
				return;
			}

			queueMicrotask(() => {
				void loadProfile(session.user).catch((error) => {
					console.error("Não foi possível carregar o perfil:", error);
					if (active) setUser(null);
				});
			});
		});

		void supabase.auth.getSession()
			.then(async ({ data, error }) => {
				if (error) throw error;
				await loadProfile(data.session?.user ?? null);
			})
			.catch((error) => {
				console.error("Não foi possível restaurar a sessão:", error);
				if (active) setUser(null);
			})
			.finally(() => {
				if (active) setLoading(false);
			});

		return () => {
			active = false;
			subscription.unsubscribe();
		};
	}, []);

	const login = async (emailOrPhone, password) => {
		setLoading(true);
		try {
			const identifier = String(emailOrPhone).trim();
			const credentials = identifier.includes("@")
				? { email: identifier.toLowerCase(), password }
				: { phone: identifier, password };
			const { data, error } = await supabase.auth.signInWithPassword(credentials);
			if (error) throw error;

			const { data: profile, error: profileError } = await supabase
				.from("profiles")
				.select("id, email, name, phone, role")
				.eq("id", data.user.id)
				.maybeSingle();
			if (profileError) throw profileError;

			const authenticatedUser = profile ?? {
				id: data.user.id,
				email: data.user.email,
				name: data.user.user_metadata?.name ?? "",
				phone: data.user.user_metadata?.phone ?? "",
				role: "client",
			};
			setUser(authenticatedUser);
			return authenticatedUser;
		} finally {
			setLoading(false);
		}
	};

	const register = async ({ name, email, phone, password }) => {
		setLoading(true);
		try {
			const { data, error } = await supabase.auth.signUp({
				email: String(email).trim().toLowerCase(),
				password,
				options: {
					data: { name: String(name).trim(), phone: String(phone).trim() },
				},
			});
			if (error) throw error;

			if (!data.session) return { requiresEmailConfirmation: true };

			const authenticatedUser = {
				id: data.user.id,
				email: data.user.email,
				name: data.user.user_metadata?.name ?? "",
				phone: data.user.user_metadata?.phone ?? "",
				role: "client",
			};
			setUser(authenticatedUser);
			return authenticatedUser;
		} finally {
			setLoading(false);
		}
	};

	const logout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) throw error;
		setUser(null);
	};

	const saveProfile = async (profile) => {
		setLoading(true);
		try {
			const updatedProfile = await persistProfile(profile);
			setUser(updatedProfile);
			return updatedProfile;
		} finally {
			setLoading(false);
		}
	};

	return { user, loading, isAuthenticated: Boolean(user), login, register, logout, updateProfile: saveProfile };
}

export default useSupabaseAuth;