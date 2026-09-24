import { Navigate, Route, Routes } from "react-router-dom";
import ClientLayout from "../layouts/ClientLayout";
import Dashboard from "../pages/client/Dashboard";
import Requests from "../pages/client/Requests";
import RequestDetail from "../pages/client/RequestDetail";
import Payments from "../pages/client/Payments";
import Profile from "../pages/client/Profile";
import ServiceRequest from "../pages/client/ServiceRequest";

function ClientRoutes() {
	return (
		<Routes>
			<Route element={<ClientLayout />}>
				<Route index element={<Dashboard />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="requests" element={<Requests />} />
				<Route path="requests/:requestId" element={<RequestDetail />} />
				<Route path="request" element={<ServiceRequest />} />
				<Route path="payments" element={<Payments />} />
				<Route path="profile" element={<Profile />} />
			</Route>
			<Route path="*" element={<Navigate to="/client" replace />} />
		</Routes>
	);
}

export default ClientRoutes;
