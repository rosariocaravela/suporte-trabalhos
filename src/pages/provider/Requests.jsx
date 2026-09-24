import { BriefcaseBusiness, Search } from "lucide-react";

function Requests() {
	return (
		<div><header><p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Atendimento</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Pedidos recebidos</h1><p className="mt-2 text-slate-500">Analise e acompanhe os pedidos enviados pelos clientes.</p></header><div className="mt-8 flex flex-col gap-3 sm:flex-row"><label className="relative block flex-1"><span className="sr-only">Pesquisar pedidos</span><Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" /><input type="search" placeholder="Pesquisar por assunto ou cliente" className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10" /></label><select defaultValue="todos" className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-secondary"><option value="todos">Todos os estados</option><option value="novo">Novos</option><option value="andamento">Em andamento</option><option value="concluido">Concluídos</option></select></div><section className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-secondary"><BriefcaseBusiness className="h-7 w-7" /></div><h2 className="mt-5 text-xl font-bold text-primary">Ainda não recebeu pedidos</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">Os pedidos dos clientes aparecerão aqui quando os seus serviços estiverem publicados.</p></section></div>
	);
}

export default Requests;
