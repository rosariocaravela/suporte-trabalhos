import { Navigate, Route, Routes } from "react-router-dom";
import ProviderLayout from "../layouts/ProviderLayout";
import Dashboard from "../pages/provider/Dashboard";
import Requests from "../pages/provider/Requests";
import Services from "../pages/provider/Services";
import Payments from "../pages/provider/Payments";
import Profile from "../pages/provider/Profile";

function ProviderRoutes() {
	return (
		<Routes>
			<Route element={<ProviderLayout />}>
				<Route index element={<Dashboard />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="requests" element={<Requests />} />
				<Route path="services" element={<Services />} />
				<Route path="payments" element={<Payments />} />
				<Route path="profile" element={<Profile />} />
			</Route>
			<Route path="*" element={<Navigate to="/provider" replace />} />
		</Routes>
	);
}

export default ProviderRoutes;
