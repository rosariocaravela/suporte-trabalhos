import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import useAuth from "../hooks/useAuth";

function LoginEntry() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={user?.role === "provider" ? "/provider" : "/client"} replace />;
  }

  return <Login />;
}

function RegisterEntry() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/client" replace />;
  }

  return <Register />;
}

function AuthRoutes() {
  return (
    <Routes>
      <Route path="login" element={<LoginEntry />} />
      <Route path="registar" element={<RegisterEntry />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
}

export default AuthRoutes;
