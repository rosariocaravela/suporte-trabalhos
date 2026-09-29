import { useEffect, useState } from "react";
import { listActiveServices } from "../services/serviceService";

function usePublicServices() {
	const [services, setServices] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;
		listActiveServices()
			.then((result) => {
				if (active) setServices(result);
			})
			.catch((loadError) => {
				console.error("Não foi possível carregar os serviços:", loadError);
				if (active) setError("Não foi possível carregar os serviços. Tente novamente.");
			})
			.finally(() => {
				if (active) setLoading(false);
			});

		return () => {
			active = false;
		};
	}, []);

	const retry = async () => {
		setLoading(true);
		setError("");
		try {
			setServices(await listActiveServices());
		} catch (loadError) {
			console.error("Não foi possível carregar os serviços:", loadError);
			setError("Não foi possível carregar os serviços. Tente novamente.");
		} finally {
			setLoading(false);
		}
	};

	return { services, loading, error, retry };
}

export default usePublicServices;