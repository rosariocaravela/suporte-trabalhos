import { ArrowRight, Clock3, CircleCheck, FilePlus2 } from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Dashboard() {
	const { user } = useAuth();
	const firstName = user?.name?.split(" ")[0] || "cliente";

	return (
		<div>
			<header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
				<div>
					<p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Visão geral</p>
					<h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Olá, {firstName}</h1>
					<p className="mt-2 text-slate-500">Acompanhe os seus pedidos e o suporte da nossa equipa.</p>
				</div>
				<Link to="/solicitar-servico" className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-accent-hover">
					<FilePlus2 className="h-5 w-5" />
					Novo pedido
				</Link>
			</header>

			<section className="mt-8 grid gap-4 sm:grid-cols-3" aria-label="Resumo dos pedidos">
				<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<p className="text-sm text-slate-500">Pedidos ativos</p>
					<p className="mt-3 text-3xl font-bold text-primary">0</p>
					<p className="mt-2 text-xs text-slate-400">Nenhum pedido em andamento</p>
				</div>
				<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<p className="text-sm text-slate-500">Em espera</p>
					<p className="mt-3 text-3xl font-bold text-amber-600">0</p>
					<p className="mt-2 flex items-center gap-1 text-xs text-slate-400"><Clock3 className="h-3.5 w-3.5" /> Aguardam atendimento</p>
				</div>
				<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<p className="text-sm text-slate-500">Concluídos</p>
					<p className="mt-3 text-3xl font-bold text-emerald-600">0</p>
					<p className="mt-2 flex items-center gap-1 text-xs text-slate-400"><CircleCheck className="h-3.5 w-3.5" /> Histórico de serviços</p>
				</div>
			</section>

			<section className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
				<div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
					<div>
						<h2 className="text-xl font-bold text-primary">Ainda não tem pedidos</h2>
						<p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">Crie o seu primeiro pedido de suporte e descreva o problema. A nossa equipa entrará em contacto consigo.</p>
					</div>
					<Link to="/solicitar-servico" className="inline-flex items-center gap-2 text-sm font-bold text-secondary transition hover:text-primary">
						Solicitar suporte <ArrowRight className="h-4 w-4" />
					</Link>
				</div>
			</section>

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
