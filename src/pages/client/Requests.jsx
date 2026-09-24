import { ClipboardList, FilePlus2, Search } from "lucide-react";
import { Link } from "react-router-dom";

function Requests() {
	return (
		<div>
			<header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
				<div>
					<p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Acompanhamento</p>
					<h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Meus pedidos</h1>
					<p className="mt-2 text-slate-500">Consulte o estado dos seus pedidos de suporte.</p>
				</div>
				<Link
					to="/solicitar-servico"
					className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-accent-hover"
				>
					<FilePlus2 className="h-5 w-5" />
					Novo pedido
				</Link>
			</header>

			<div className="mt-8 flex flex-col gap-3 sm:flex-row">
				<label className="relative block flex-1">
					<span className="sr-only">Pesquisar pedidos</span>
					<Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
					<input
						type="search"
						placeholder="Pesquisar por assunto ou número"
						className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-secondary focus:ring-4 focus:ring-secondary/10"
					/>
				</label>
				<select className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none focus:border-secondary focus:ring-4 focus:ring-secondary/10" defaultValue="todos">
					<option value="todos">Todos os estados</option>
					<option value="pendente">Pendente</option>
					<option value="andamento">Em andamento</option>
					<option value="concluido">Concluído</option>
				</select>
			</div>

			<section className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm sm:px-10">
				<div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-secondary">
					<ClipboardList className="h-7 w-7" />
				</div>
				<h2 className="mt-5 text-xl font-bold text-primary">Ainda não existem pedidos</h2>
				<p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
					Quando enviar um pedido de suporte, poderá acompanhar aqui o estado, a data e as atualizações do atendimento.
				</p>
				<Link to="/solicitar-servico" className="mt-6 inline-flex items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white transition hover:bg-secondary">
					Criar primeiro pedido
				</Link>
			</section>
		</div>
	);
}

export default Requests;
