import { useEffect, useState } from "react";
import { BriefcaseBusiness, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { listProviderRequests } from "../../services/requestService";
import useAuth from "../../hooks/useAuth";
import useRequestRealtime from "../../hooks/useRequestRealtime";

const statusStyles = {
  PENDING: "bg-slate-100 text-slate-700",
  IN_REVIEW: "bg-amber-100 text-amber-700",
  SCHEDULED: "bg-sky-100 text-sky-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  COMPLETED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-rose-100 text-rose-700",
};

const statusLabels = {
  PENDING: "Pendente",
  IN_REVIEW: "Em análise",
  SCHEDULED: "Agendado",
  IN_PROGRESS: "Em execução",
  COMPLETED: "Concluído",
  CANCELLED: "Cancelado",
};

function Requests() {
	const { user } = useAuth();
	const revision = useRequestRealtime("provider_id", user?.id);
	const [requests, setRequests] = useState([]);
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState("all");
	const [serviceId, setServiceId] = useState("all");
	const [clientId, setClientId] = useState("all");
	const [dateFrom, setDateFrom] = useState("");
	const [dateTo, setDateTo] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;
		listProviderRequests()
			.then((result) => { if (active) setRequests(result); })
			.catch((loadError) => {
				console.error("Não foi possível carregar os pedidos recebidos:", loadError);
				if (active) setError("Não foi possível carregar os pedidos recebidos.");
			})
			.finally(() => { if (active) setLoading(false); });
		return () => { active = false; };
	}, [revision, user?.id]);

	const retry = async () => {
		setLoading(true);
		setError("");
		try {
			setRequests(await listProviderRequests());
		} catch (loadError) {
			console.error("Não foi possível carregar os pedidos recebidos:", loadError);
			setError("Não foi possível carregar os pedidos recebidos.");
		} finally {
			setLoading(false);
		}
	};

	const query = search.trim().toLowerCase();
	const serviceOptions = [...new Map(requests.filter((request) => request.service).map((request) => [request.service.id, request.service.name])).entries()];
	const clientOptions = [...new Map(requests.filter((request) => request.client).map((request) => [request.client.id, request.client.name])).entries()];
	const visibleRequests = requests.filter((request) => {
		const matchesStatus = status === "all" || request.status === status;
		const matchesSearch = !query || `${request.subject} ${request.client?.name ?? ""} ${request.service?.name ?? ""}`.toLowerCase().includes(query);
		const matchesService = serviceId === "all" || request.service_id === serviceId;
		const matchesClient = clientId === "all" || request.client_id === clientId;
		const createdDate = request.created_at.slice(0, 10);
		const matchesFrom = !dateFrom || createdDate >= dateFrom;
		const matchesTo = !dateTo || createdDate <= dateTo;
		return matchesStatus && matchesSearch && matchesService && matchesClient && matchesFrom && matchesTo;
	});

	return (
		<div>
			<header>
				<p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Atendimento</p>
				<h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Pedidos recebidos</h1>
				<p className="mt-2 text-slate-500">Analise e acompanhe os pedidos enviados pelos clientes.</p>
			</header>
			<div className="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
				<label className="relative block"><span className="sr-only">Pesquisar pedidos</span><Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Pesquisar pedido" className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10" /></label>
				<select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filtrar por estado" className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-secondary"><option value="all">Todos os estados</option>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select>
				<select value={serviceId} onChange={(event) => setServiceId(event.target.value)} aria-label="Filtrar por serviço" className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-secondary"><option value="all">Todos os serviços</option>{serviceOptions.map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select>
				<select value={clientId} onChange={(event) => setClientId(event.target.value)} aria-label="Filtrar por cliente" className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-secondary"><option value="all">Todos os clientes</option>{clientOptions.map(([id, name]) => <option key={id} value={id}>{name}</option>)}</select>
			</div>
			<div className="mt-3 grid gap-3 sm:grid-cols-2">
				<label className="text-xs font-semibold text-slate-500">Desde<input type="date" value={dateFrom} onChange={(event) => setDateFrom(event.target.value)} className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-normal text-slate-700" /></label>
				<label className="text-xs font-semibold text-slate-500">Até<input type="date" value={dateTo} onChange={(event) => setDateTo(event.target.value)} className="mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-normal text-slate-700" /></label>
			</div>
			<div className="mt-6 space-y-4">
				{loading && <p className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500" role="status">A carregar pedidos...</p>}
				{error && <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700" role="alert"><p>{error}</p><button type="button" onClick={retry} className="mt-2 font-bold underline">Tentar novamente</button></div>}
				{!loading && !error && visibleRequests.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><BriefcaseBusiness className="mx-auto h-8 w-8 text-slate-400" /><p className="mt-3 font-semibold text-slate-700">{requests.length ? "Nenhum pedido corresponde aos filtros." : "Ainda não recebeste pedidos."}</p></div>}
				{!loading && !error && visibleRequests.map((request) => (
					<Link key={request.id} to={`/provider/requests/${request.id}`} className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-secondary hover:shadow-md">
						<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{request.id.slice(0, 8).toUpperCase()}</p>
								<h2 className="mt-2 text-lg font-bold text-primary">{request.subject}</h2>
								<p className="mt-1 text-sm text-slate-500">Cliente: {request.client?.name ?? "Cliente"}</p>
							</div>
							<span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${statusStyles[request.status] ?? statusStyles.PENDING}`}>{statusLabels[request.status] ?? request.status}</span>
						</div>
						<div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm text-slate-600">
							<div>
								<p className="text-slate-400">Serviço</p>
								<p className="mt-1 font-semibold text-primary">{request.service?.name ?? "Pedido geral"}</p>
							</div>
							<div>
								<p className="text-slate-400">Prioridade</p>
								<p className="mt-1 font-semibold text-primary">{request.priority}</p>
							</div>
							<div>
								<p className="text-slate-400">Valor</p>
								<p className="mt-1 font-semibold text-primary">{request.service?.price == null ? "A definir" : `${Number(request.service.price).toLocaleString("pt-MZ")} MT`}</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

export default Requests;
