import { useEffect, useState } from "react";
import { ClipboardList, FilePlus2, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { listClientRequests } from "../../services/requestService";
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
	const revision = useRequestRealtime("client_id", user?.id);
	const [requests, setRequests] = useState([]);
	const [search, setSearch] = useState("");
	const [status, setStatus] = useState("all");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;
		listClientRequests()
			.then((result) => { if (active) setRequests(result); })
			.catch((loadError) => {
				console.error("Não foi possível carregar os pedidos:", loadError);
				if (active) setError("Não foi possível carregar os pedidos. Verifique a ligação e tente novamente.");
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
			console.error("Não foi possível carregar os pedidos:", loadError);
			setError("Não foi possível carregar os pedidos. Verifique a ligação e tente novamente.");
		} finally {
			setLoading(false);
		}
	};

	const normalizedSearch = search.trim().toLowerCase();
	const visibleRequests = requests.filter((request) => {
		const matchesStatus = status === "all" || request.status === status;
		const matchesSearch = !normalizedSearch || `${request.subject} ${request.id} ${request.service?.name ?? ""}`.toLowerCase().includes(normalizedSearch);
		return matchesStatus && matchesSearch;
	});

	return (
		<div>
			<header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
				<div>
					<p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Acompanhamento</p>
					<h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Meus pedidos</h1>
					<p className="mt-2 text-slate-500">Consulte o estado dos seus pedidos de suporte.</p>
				</div>
				<Link to="/client/request" className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-accent-hover">
					<FilePlus2 className="h-5 w-5" />
					Novo pedido
				</Link>
			</header>

			<div className="mt-8 flex flex-col gap-3 sm:flex-row">
				<label className="relative block flex-1">
					<span className="sr-only">Pesquisar pedidos</span>
					<Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
					<input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Pesquisar por assunto ou número" className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-secondary focus:ring-4 focus:ring-secondary/10" />
				</label>
				<select value={status} onChange={(event) => setStatus(event.target.value)} className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10">
					<option value="all">Todos os estados</option>
					{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
				</select>
			</div>

			<div className="mt-6 space-y-4">
				{loading && <p className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500" role="status">A carregar pedidos...</p>}
				{error && <div className="rounded-xl bg-red-50 p-4 text-sm text-red-700" role="alert"><p>{error}</p><button type="button" onClick={retry} className="mt-2 font-bold underline">Tentar novamente</button></div>}
				{!loading && !error && visibleRequests.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center"><ClipboardList className="mx-auto h-8 w-8 text-slate-400" /><p className="mt-3 font-semibold text-slate-700">{requests.length ? "Nenhum pedido corresponde aos filtros." : "Ainda não tens pedidos."}</p>{!requests.length && <Link to="/client/request" className="mt-4 inline-flex font-bold text-secondary">Criar pedido</Link>}</div>}
				{!loading && !error && visibleRequests.map((request) => (
					<Link key={request.id} to={`/client/requests/${request.id}`} className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-secondary hover:shadow-md">
						<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{request.id.slice(0, 8).toUpperCase()}</p>
								<h2 className="mt-2 text-lg font-bold text-primary">{request.subject}</h2>
							</div>
							<span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${statusStyles[request.status] ?? statusStyles.PENDING}`}>{statusLabels[request.status] ?? request.status}</span>
						</div>
						<div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm text-slate-600">
							<div>
								<p className="text-slate-400">Serviço</p>
								<p className="mt-1 font-semibold text-primary">{request.service?.name ?? "Pedido geral"}</p>
							</div>
							<div>
								<p className="text-slate-400">Última atualização</p>
								<p className="mt-1 font-semibold text-primary">{new Date(request.updated_at).toLocaleDateString("pt-PT")}</p>
							</div>
							<div>
								<p className="text-slate-400">Orçamento</p>
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
