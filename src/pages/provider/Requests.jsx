import { BriefcaseBusiness, Search } from "lucide-react";
import { Link } from "react-router-dom";
import requests, { requestStatuses } from "../../data/requests";

const statusStyles = {
  pending: "bg-slate-100 text-slate-700",
  reviewing: "bg-amber-100 text-amber-700",
  waiting_client: "bg-sky-100 text-sky-700",
  quote_sent: "bg-violet-100 text-violet-700",
  awaiting_payment: "bg-amber-100 text-amber-700",
  in_progress: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-rose-100 text-rose-700",
};

function Requests() {
	return (
		<div>
			<header>
				<p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Atendimento</p>
				<h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Pedidos recebidos</h1>
				<p className="mt-2 text-slate-500">Analise e acompanhe os pedidos enviados pelos clientes.</p>
			</header>
			<div className="mt-8 flex flex-col gap-3 sm:flex-row">
				<label className="relative block flex-1"><span className="sr-only">Pesquisar pedidos</span><Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input type="search" placeholder="Pesquisar por assunto ou cliente" className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10" /></label>
				<select defaultValue="todos" className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-secondary"><option value="todos">Todos os estados</option><option value="novo">Novos</option><option value="andamento">Em andamento</option><option value="concluido">Concluídos</option></select>
			</div>
			<div className="mt-6 space-y-4">
				{requests.map((request) => (
					<Link key={request.id} to={`/provider/requests/${request.id}`} className="block rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-secondary hover:shadow-md">
						<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
							<div>
								<p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">{request.id}</p>
								<h2 className="mt-2 text-lg font-bold text-primary">{request.clientName}</h2>
							</div>
							<span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold ${statusStyles[request.status]}`}>{requestStatuses[request.status]}</span>
						</div>
						<div className="mt-4 grid gap-3 sm:grid-cols-3 text-sm text-slate-600">
							<div>
								<p className="text-slate-400">Serviço</p>
								<p className="mt-1 font-semibold text-primary">{request.service}</p>
							</div>
							<div>
								<p className="text-slate-400">Prioridade</p>
								<p className="mt-1 font-semibold text-primary">Alta</p>
							</div>
							<div>
								<p className="text-slate-400">Valor</p>
								<p className="mt-1 font-semibold text-primary">{request.budget}</p>
							</div>
						</div>
					</Link>
				))}
			</div>
		</div>
	);
}

export default Requests;
