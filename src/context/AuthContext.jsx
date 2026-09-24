import { useEffect, useState } from "react";
import AuthContext from "./authContextValue";

const STORAGE_KEY = "suporte-trabalhos-user";

function getStoredUser() {
	try {
		const storedUser = localStorage.getItem(STORAGE_KEY);
		return storedUser ? JSON.parse(storedUser) : null;
	} catch {
		return null;
	}
}

export function AuthProvider({ children }) {
	const [user, setUser] = useState(getStoredUser);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (user) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
		} else {
			localStorage.removeItem(STORAGE_KEY);
		}
	}, [user]);

	const login = async (email, password) => {
		if (!email || !password) {
			return false;
		}

		setLoading(true);
		await Promise.resolve();
		const normalizedEmail = email.toLowerCase();
		const role = normalizedEmail.includes("provider") || normalizedEmail.includes("prestador") ? "provider" : "client";
		const authenticatedUser = { email, name: email.split("@")[0] || "Utilizador", role };
		setUser(authenticatedUser);
		setLoading(false);
		return authenticatedUser;
	};

	const register = async ({ name, email, phone, password }) => {
		if (!name || !email || !phone || !password) {
			return null;
		}

		setLoading(true);
		await Promise.resolve();
		const registeredUser = { name, email, phone, role: "client" };
		setUser(registeredUser);
		setLoading(false);
		return registeredUser;
	};

	const logout = () => {
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, loading, isAuthenticated: Boolean(user), login, register, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
