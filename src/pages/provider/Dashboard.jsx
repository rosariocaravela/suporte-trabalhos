import { useEffect, useState } from "react";
import { ArrowRight, BriefcaseBusiness, CircleCheck, Clock3, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRequestRealtime from "../../hooks/useRequestRealtime";
import { listProviderRequests } from "../../services/requestService";

const statuses = [
	{ value: "PENDING", label: "Pendentes", icon: <BriefcaseBusiness className="h-4 w-4" />, color: "text-amber-600" },
	{ value: "IN_REVIEW", label: "Em análise", icon: <Clock3 className="h-4 w-4" />, color: "text-blue-600" },
	{ value: "SCHEDULED", label: "Agendados", icon: <Clock3 className="h-4 w-4" />, color: "text-cyan-600" },
	{ value: "IN_PROGRESS", label: "Em execução", icon: <Clock3 className="h-4 w-4" />, color: "text-primary" },
	{ value: "COMPLETED", label: "Concluídos", icon: <CircleCheck className="h-4 w-4" />, color: "text-emerald-600" },
	{ value: "CANCELLED", label: "Cancelados", icon: <CircleCheck className="h-4 w-4" />, color: "text-rose-600" },
];

const statusLabels = Object.fromEntries(statuses.map(({ value, label }) => [value, label]));

function Dashboard() {
	const { user } = useAuth();
	const revision = useRequestRealtime("provider_id", user?.id);
	const firstName = user?.name?.split(" ")[0] || "prestador";
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;
		listProviderRequests()
			.then((result) => { if (active) setRequests(result); })
			.catch((loadError) => {
				console.error("Não foi possível carregar o dashboard do prestador:", loadError);
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
			console.error("Não foi possível carregar o dashboard do prestador:", loadError);
			setError("Não foi possível carregar os pedidos recebidos.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div>
			<header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Visão geral</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Olá, {firstName}</h1><p className="mt-2 text-slate-500">Gira os seus serviços e acompanhe os pedidos dos clientes.</p></div><Link to="/provider/services" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><Plus className="h-5 w-5" />Adicionar serviço</Link></header>
			{error && <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700" role="alert"><p>{error}</p><button type="button" onClick={retry} className="mt-2 font-bold underline">Tentar novamente</button></div>}
			<section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Resumo dos pedidos">
				{statuses.map(({ value, label, icon, color }) => <div key={value} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between gap-3"><p className="text-sm text-slate-500">{label}</p><span className={color}>{icon}</span></div><p className={`mt-3 text-3xl font-bold ${color}`}>{loading || error ? "—" : requests.filter((request) => request.status === value).length}</p></div>)}
			</section>
			{loading && <p className="mt-6 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-500" role="status">A carregar pedidos...</p>}
			{!loading && !error && requests.length === 0 && <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><h2 className="text-xl font-bold text-primary">Ainda não recebeste pedidos</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Adiciona serviços ativos para os clientes poderem solicitar suporte.</p><Link to="/provider/services" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-secondary">Gerir serviços <ArrowRight className="h-4 w-4" /></Link></section>}
			{!loading && !error && requests.length > 0 && <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><div className="flex items-center justify-between gap-3"><h2 className="text-xl font-bold text-primary">Pedidos recentes</h2><Link to="/provider/requests" className="text-sm font-bold text-secondary">Ver todos</Link></div><div className="mt-4 divide-y divide-slate-100">{requests.slice(0, 3).map((request) => <Link key={request.id} to={`/provider/requests/${request.id}`} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"><span><span className="block font-semibold text-primary">{request.subject}</span><span className="mt-1 block text-sm text-slate-500">{request.client?.name ?? "Cliente"} · {request.service?.name ?? "Pedido geral"}</span></span><span className="text-sm font-semibold text-secondary">{statusLabels[request.status] ?? request.status}</span></Link>)}</div></section>}
		</div>
	);
}

export default Dashboard;
