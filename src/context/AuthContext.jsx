import AuthContext from "./authContextValue";
import useSupabaseAuth from "../hooks/useSupabaseAuth";

export function AuthProvider({ children }) {
	const auth = useSupabaseAuth();

	return (
		<AuthContext.Provider value={auth}>
			{children}
		</AuthContext.Provider>
	);
}
