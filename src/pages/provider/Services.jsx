import { Plus, Wrench } from "lucide-react";

function Services() {
	return (
		<div><header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Oferta profissional</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Meus serviços</h1><p className="mt-2 text-slate-500">Publique e mantenha atualizados os serviços que oferece.</p></div><button type="button" className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-bold text-white hover:bg-accent-hover"><Plus className="h-5 w-5" />Adicionar serviço</button></header><section className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-50 text-secondary"><Wrench className="h-7 w-7" /></div><h2 className="mt-5 text-xl font-bold text-primary">Ainda não publicou serviços</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">Adicione serviços para apresentar a sua experiência aos clientes.</p><button type="button" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-secondary"><Plus className="h-4 w-4" />Criar primeiro serviço</button></section></div>
	);
}

export default Services;
