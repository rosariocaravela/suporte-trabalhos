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

import demoUsers from "../data/users";

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
		const normalizedEmail = String(email).trim().toLowerCase();
		const isProvider = normalizedEmail.includes("provider") || normalizedEmail.includes("prestador");
		const baseUser = isProvider ? demoUsers.provider : demoUsers.client;
		const authenticatedUser = {
			...baseUser,
			email: normalizedEmail.includes("@") ? normalizedEmail : baseUser.email,
			name: baseUser.name,
			role: isProvider ? "provider" : "client",
		};
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
		const registeredUser = {
			name: String(name).trim(),
			email: String(email).trim(),
			phone: String(phone).trim(),
			role: "client",
		};
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
