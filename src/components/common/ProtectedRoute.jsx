import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function ProtectedRoute({ children, role }) {
	const { user, isAuthenticated, loading } = useAuth();
	const location = useLocation();

	if (loading) {
		return <div className="flex min-h-screen items-center justify-center text-sm text-slate-500">A carregar...</div>;
	}

	if (!isAuthenticated) {
		return <Navigate to="/auth/login" replace state={{ from: location.pathname }} />;
	}

	if (role && user?.role !== role) {
		return <Navigate to={user?.role === "provider" ? "/provider" : "/client"} replace />;
	}

	return children;
}

export default ProtectedRoute;