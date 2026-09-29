import { useEffect, useState } from "react";
import { ArrowRight, CircleCheck, Clock3, FilePlus2 } from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRequestRealtime from "../../hooks/useRequestRealtime";
import { listClientRequests } from "../../services/requestService";

const statusCards = [
	{ status: "PENDING", label: "Pendentes", color: "text-amber-600", icon: <Clock3 className="h-4 w-4" /> },
	{ status: "IN_REVIEW", label: "Em análise", color: "text-blue-600", icon: <Clock3 className="h-4 w-4" /> },
	{ status: "SCHEDULED", label: "Agendados", color: "text-cyan-600", icon: <Clock3 className="h-4 w-4" /> },
	{ status: "IN_PROGRESS", label: "Em execução", color: "text-primary", icon: <Clock3 className="h-4 w-4" /> },
	{ status: "COMPLETED", label: "Concluídos", color: "text-emerald-600", icon: <CircleCheck className="h-4 w-4" /> },
	{ status: "CANCELLED", label: "Cancelados", color: "text-rose-600", icon: <CircleCheck className="h-4 w-4" /> },
];

const statusLabels = Object.fromEntries(statusCards.map(({ status, label }) => [status, label]));

function Dashboard() {
	const { user } = useAuth();
	const revision = useRequestRealtime("client_id", user?.id);
	const firstName = user?.name?.split(" ")[0] || "cliente";
	const [requests, setRequests] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;
		listClientRequests()
			.then((result) => { if (active) setRequests(result); })
			.catch((loadError) => {
				console.error("Não foi possível carregar o dashboard:", loadError);
				if (active) setError("Não foi possível carregar os seus pedidos.");
			})
			.finally(() => { if (active) setLoading(false); });
		return () => { active = false; };
	}, [revision, user?.id]);

	const retry = async () => {
		setLoading(true);
		setError("");
		try {
			setRequests(await listClientRequests());
		} catch (loadError) {
			console.error("Não foi possível carregar o dashboard:", loadError);
			setError("Não foi possível carregar os seus pedidos.");
		} finally {
			setLoading(false);
		}
	};

	const recentRequests = requests.slice(0, 3);

	return (
		<div>
			<header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
				<div>
					<p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Visão geral</p>
					<h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Olá, {firstName}</h1>
					<p className="mt-2 text-slate-500">Acompanhe os seus pedidos e o suporte da nossa equipa.</p>
				</div>
				<Link to="/client/request" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
					<FilePlus2 className="h-5 w-5" />
					Novo pedido
				</Link>
			</header>

			<section className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Resumo dos pedidos">
				{statusCards.map(({ status, label, color, icon }) => (
					<div key={status} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
						<div className="flex items-center justify-between gap-3"><p className="text-sm text-slate-500">{label}</p><span className={color}>{icon}</span></div>
						<p className={`mt-3 text-3xl font-bold ${color}`}>{loading || error ? "—" : requests.filter((request) => request.status === status).length}</p>
					</div>
				))}
			</section>

			{error && <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700" role="alert"><p>{error}</p><button type="button" onClick={retry} className="mt-2 font-bold underline">Tentar novamente</button></div>}

			{loading && <p className="mt-6 rounded-xl border border-slate-200 bg-white p-5 text-sm text-slate-500" role="status">A carregar pedidos...</p>}

			{!loading && !error && requests.length === 0 && <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
				<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
					<div>
						<h2 className="text-xl font-bold text-primary">Ainda não tem pedidos</h2>
						<p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Crie o seu primeiro pedido de suporte e descreva o problema. A nossa equipa entrará em contacto consigo.</p>
					</div>
					<Link to="/client/request" className="inline-flex items-center gap-2 text-sm font-bold text-secondary transition hover:text-primary">
						Solicitar suporte <ArrowRight className="h-4 w-4" />
					</Link>
				</div>
			</section>}

			{!loading && !error && recentRequests.length > 0 && <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
				<div className="flex items-center justify-between gap-3"><h2 className="text-xl font-bold text-primary">Pedidos recentes</h2><Link to="/client/requests" className="text-sm font-bold text-secondary">Ver todos</Link></div>
				<div className="mt-4 divide-y divide-slate-100">
					{recentRequests.map((request) => <Link key={request.id} to={`/client/requests/${request.id}`} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between"><span><span className="block font-semibold text-primary">{request.subject}</span><span className="mt-1 block text-sm text-slate-500">{request.service?.name ?? "Pedido geral"} · {new Date(request.created_at).toLocaleDateString("pt-PT")}</span></span><span className="text-sm font-semibold text-secondary">{statusLabels[request.status] ?? request.status}</span></Link>)}
				</div>
			</section>}

			<section className="mt-6 grid gap-4 sm:grid-cols-2">
				<Link to="/client/requests" className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-secondary hover:shadow-md">
					<p className="text-sm font-bold text-primary">Acompanhar pedidos</p>
					<p className="mt-2 text-sm leading-6 text-slate-500">Veja atualizações e o estado dos seus pedidos.</p>
					<span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-secondary">Ver pedidos <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
				</Link>
				<Link to="/client/payments" className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-secondary hover:shadow-md">
					<p className="text-sm font-bold text-primary">Consultar pagamentos</p>
					<p className="mt-2 text-sm leading-6 text-slate-500">Consulte faturas, valores pendentes e métodos de pagamento.</p>
					<span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-secondary">Abrir pagamentos <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
				</Link>
			</section>
		</div>
	);
}

export default Dashboard;
