import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicRoutes from "./PublicRoutes";
import AuthRoutes from "./AuthRoutes";
import ClientRoutes from "./ClientRoutes";
import ProviderRoutes from "./ProviderRoutes";
import ProtectedRoute from "../components/common/ProtectedRoute";
/*import ProviderRoutes from "./ProviderRoutes";*/

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth/*" element={<AuthRoutes />} />
        <Route
          path="/client/*"
          element={
            <ProtectedRoute role="client">
              <ClientRoutes />
            </ProtectedRoute>
          }
        />
        <Route path="/provider/*" element={<ProtectedRoute role="provider"><ProviderRoutes /></ProtectedRoute>} />
        <Route path="/*" element={<PublicRoutes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;