import { Navigate, Route, Routes } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import Dashboard from "../pages/client/Dashboard";
import Requests from "../pages/client/Requests";
import Payments from "../pages/client/Payments";

function ClientRoutes() {
	return (
		<Routes>
			<Route element={<ClientLayout />}>
				<Route index element={<Dashboard />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="requests" element={<Requests />} />
				<Route path="payments" element={<Payments />} />
			</Route>
			<Route path="*" element={<Navigate to="/client" replace />} />
		</Routes>
	);
}

export default ClientRoutes;
