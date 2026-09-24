import { Banknote, CreditCard, ReceiptText } from "lucide-react";

function Payments() {
	return (
		<div><header><p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Área financeira</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Pagamentos</h1><p className="mt-2 text-slate-500">Acompanhe os seus ganhos e pagamentos recebidos.</p></header><section className="mt-8 grid gap-4 sm:grid-cols-3"><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Ganhos totais</p><p className="mt-3 text-3xl font-bold text-primary">0,00 MT</p><Banknote className="mt-2 h-5 w-5 text-emerald-600" /></div><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Por receber</p><p className="mt-3 text-3xl font-bold text-primary">0,00 MT</p><CreditCard className="mt-2 h-5 w-5 text-amber-600" /></div><div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><p className="text-sm text-slate-500">Transações</p><p className="mt-3 text-3xl font-bold text-primary">0</p><ReceiptText className="mt-2 h-5 w-5 text-secondary" /></div></section><section className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm"><h2 className="text-xl font-bold text-primary">Ainda não existem pagamentos</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">Os seus ganhos e transferências aparecerão aqui depois de concluir serviços.</p></section></div>
	);
}

export default Payments;
