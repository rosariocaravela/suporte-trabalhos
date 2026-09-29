import { Navigate, Route, Routes } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PasswordReset from "../pages/auth/PasswordReset";
import useAuth from "../hooks/useAuth";

function LoginEntry() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={user?.role === "provider" ? "/provider" : "/client"} replace />;
  }

  return <Login />;
}

function RegisterEntry() {
  const { isAuthenticated, user } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={user?.role === "provider" ? "/provider" : "/client"} replace />;
  }

  return <Register />;
}

function AuthRoutes() {
  return (
    <Routes>
      <Route path="login" element={<LoginEntry />} />
      <Route path="registar" element={<RegisterEntry />} />
      <Route path="password-reset" element={<PasswordReset />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
}

export default AuthRoutes;
