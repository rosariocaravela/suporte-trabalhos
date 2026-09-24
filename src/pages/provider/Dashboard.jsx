import { ArrowRight, BriefcaseBusiness, CircleCheck, Clock3, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Dashboard() {
	const { user } = useAuth();
	const firstName = user?.name?.split(" ")[0] || "prestador";

	return (
		<div>
			<header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Visão geral</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Olá, {firstName}</h1><p className="mt-2 text-slate-500">Gira os seus serviços e acompanhe os pedidos dos clientes.</p></div><Link to="/provider/services" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><Plus className="h-5 w-5" />Adicionar serviço</Link></header>
			<section className="mt-8 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-3 flex items-center justify-between"><p className="text-sm text-slate-500">Pedidos novos</p><span className="rounded-full bg-blue-50 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-primary">Novo</span></div><p className="mt-3 text-3xl font-bold text-primary">0</p><p className="mt-2 flex items-center gap-1 text-xs text-slate-400"><BriefcaseBusiness className="h-3.5 w-3.5" />Aguardam resposta</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-3 flex items-center justify-between"><p className="text-sm text-slate-500">Em andamento</p><span className="rounded-full bg-cyan-50 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-secondary">Exec</span></div><p className="mt-3 text-3xl font-bold text-amber-600">0</p><p className="mt-2 flex items-center gap-1 text-xs text-slate-400"><Clock3 className="h-3.5 w-3.5" />Serviços ativos</p></div><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="mb-3 flex items-center justify-between"><p className="text-sm text-slate-500">Concluídos</p><span className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-emerald-600">OK</span></div><p className="mt-3 text-3xl font-bold text-emerald-600">0</p><p className="mt-2 flex items-center gap-1 text-xs text-slate-400"><CircleCheck className="h-3.5 w-3.5" />Este mês</p></div></section>
			<section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8"><h2 className="text-xl font-bold text-primary">Comece a receber pedidos</h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Adicione os serviços que presta para que os clientes possam encontrar a sua experiência e solicitar suporte.</p><Link to="/provider/services" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-primary">Gerir serviços <ArrowRight className="h-4 w-4" /></Link></section>
		</div>
	);
}

export default Dashboard;
