import { Navigate, Route, Routes } from "react-router-dom";
import ProviderLayout from "../layouts/ProviderLayout";
import Dashboard from "../pages/provider/Dashboard";
import Requests from "../pages/provider/Requests";
import RequestDetail from "../pages/provider/RequestDetail";
import Services from "../pages/provider/Services";
import Contents from "../pages/provider/Contents";
import Videos from "../pages/provider/Videos";
import Payments from "../pages/provider/Payments";
import Profile from "../pages/provider/Profile";

function ProviderRoutes() {
	return (
		<Routes>
			<Route element={<ProviderLayout />}>
				<Route index element={<Dashboard />} />
				<Route path="dashboard" element={<Dashboard />} />
				<Route path="requests" element={<Requests />} />
				<Route path="requests/:requestId" element={<RequestDetail />} />
				<Route path="services" element={<Services />} />
				<Route path="contents" element={<Contents />} />
				<Route path="videos" element={<Videos />} />
				<Route path="payments" element={<Payments />} />
				<Route path="profile" element={<Profile />} />
			</Route>
			<Route path="*" element={<Navigate to="/provider" replace />} />
		</Routes>
	);
}

export default ProviderRoutes;
