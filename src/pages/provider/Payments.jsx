import { useEffect, useState } from "react";
import { Banknote, CreditCard, ReceiptText } from "lucide-react";
import { listProviderPayments } from "../../services/paymentService";

function Payments() {
	const [payments, setPayments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;
		listProviderPayments()
			.then((result) => { if (active) setPayments(result); })
			.catch((loadError) => {
				console.error("Não foi possível carregar os pagamentos:", loadError);
				if (active) setError("Não foi possível carregar os pagamentos.");
			})
			.finally(() => { if (active) setLoading(false); });
		return () => { active = false; };
	}, []);

	const retry = async () => {
		setLoading(true); setError("");
		try { setPayments(await listProviderPayments()); }
		catch (loadError) { console.error("Não foi possível carregar os pagamentos:", loadError); setError("Não foi possível carregar os pagamentos."); }
		finally { setLoading(false); }
	};
	const paid = payments.filter((payment) => payment.status === "PAID");
	const pending = payments.filter((payment) => ["PENDING", "PROCESSING"].includes(payment.status));
	const totalPaid = paid.reduce((total, payment) => total + Number(payment.amount), 0);
	const totalPending = pending.reduce((total, payment) => total + Number(payment.amount), 0);
	const formatMoney = (amount) => new Intl.NumberFormat("pt-MZ", { style: "currency", currency: "MZN" }).format(amount);

	return (
		<div>
			<header><p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Área financeira</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Pagamentos</h1><p className="mt-2 text-slate-500">Acompanhe pagamentos confirmados pelo sistema seguro.</p></header>
			<section className="mt-8 grid gap-4 sm:grid-cols-3" aria-label="Resumo de pagamentos">
				<SummaryCard title="Ganhos confirmados" value={loading ? "—" : formatMoney(totalPaid)} icon={<Banknote className="h-5 w-5 text-emerald-600" />} />
				<SummaryCard title="Por receber" value={loading ? "—" : formatMoney(totalPending)} icon={<CreditCard className="h-5 w-5 text-amber-600" />} />
				<SummaryCard title="Transações" value={loading ? "—" : String(payments.length)} icon={<ReceiptText className="h-5 w-5 text-secondary" />} />
			</section>
			{error && <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700" role="alert"><p>{error}</p><button type="button" onClick={retry} className="mt-2 font-bold underline">Tentar novamente</button></div>}
			{loading && <p className="mt-6 rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500" role="status">A carregar pagamentos...</p>}
			{!loading && !error && payments.length === 0 && <section className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center shadow-sm"><h2 className="text-xl font-bold text-primary">Ainda não há pagamentos registados</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">Os pagamentos aparecerão aqui depois da integração segura com um gateway.</p></section>}
			{!loading && !error && payments.length > 0 && <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white" aria-label="Transações"><div className="divide-y divide-slate-100">{payments.map((payment) => <article key={payment.id} className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-primary">{payment.request?.subject ?? `Pedido ${payment.request_id.slice(0, 8).toUpperCase()}`}</p><p className="mt-1 text-sm text-slate-500">{new Date(payment.created_at).toLocaleString("pt-PT")}</p></div><div className="flex items-center gap-4"><span className="text-sm text-slate-600">{payment.status}</span><span className="font-bold text-primary">{new Intl.NumberFormat("pt-MZ", { style: "currency", currency: payment.currency || "MZN" }).format(Number(payment.amount))}</span></div></article>)}</div></section>}
		</div>
	);
}

function SummaryCard({ title, value, icon }) {
	return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><p className="text-sm text-slate-500">{title}</p>{icon}</div><p className="mt-3 text-2xl font-bold text-primary">{value}</p></div>;
}

export default Payments;
