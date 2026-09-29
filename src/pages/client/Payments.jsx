import { useEffect, useState } from "react";
import { CreditCard, ReceiptText } from "lucide-react";
import { listClientPayments } from "../../services/paymentService";

const paymentStatus = {
	PENDING: "Pendente",
	PROCESSING: "A processar",
	PAID: "Pago",
	FAILED: "Falhou",
	CANCELLED: "Cancelado",
	REFUNDED: "Reembolsado",
};

function formatMoney(amount, currency) {
	return new Intl.NumberFormat("pt-MZ", { style: "currency", currency: currency || "MZN" }).format(Number(amount));
}

function Payments() {
	const [payments, setPayments] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let active = true;
		listClientPayments()
			.then((result) => { if (active) setPayments(result); })
			.catch((loadError) => {
				console.error("Não foi possível carregar os pagamentos:", loadError);
				if (active) setError("Não foi possível carregar o histórico de pagamentos.");
			})
			.finally(() => { if (active) setLoading(false); });
		return () => { active = false; };
	}, []);

	const retry = async () => {
		setLoading(true); setError("");
		try { setPayments(await listClientPayments()); }
		catch (loadError) { console.error("Não foi possível carregar os pagamentos:", loadError); setError("Não foi possível carregar o histórico de pagamentos."); }
		finally { setLoading(false); }
	};

	const totalPaid = payments.filter((payment) => payment.status === "PAID").reduce((total, payment) => total + Number(payment.amount), 0);
	const pendingPayments = payments.filter((payment) => ["PENDING", "PROCESSING"].includes(payment.status));

	return (
		<div>
			<header>
				<p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Área financeira</p>
				<h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Pagamentos</h1>
				<p className="mt-2 text-slate-500">Consulte o histórico de pagamentos registados.</p>
			</header>

			<section className="mt-8 grid gap-4 sm:grid-cols-3" aria-label="Resumo dos pagamentos">
				<SummaryCard title="Total pago" value={loading ? "—" : formatMoney(totalPaid, "MZN")} icon={<ReceiptText className="h-5 w-5 text-emerald-600" />} />
				<SummaryCard title="Por pagar" value={loading ? "—" : String(pendingPayments.length)} icon={<CreditCard className="h-5 w-5 text-amber-600" />} />
				<SummaryCard title="Registos" value={loading ? "—" : String(payments.length)} icon={<ReceiptText className="h-5 w-5 text-secondary" />} />
			</section>

			{pendingPayments.length > 0 && <p className="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-800">O pagamento online ainda não está disponível. Não introduza dados de cartão ou carteira móvel nesta aplicação.</p>}
			{error && <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm text-red-700" role="alert"><p>{error}</p><button type="button" onClick={retry} className="mt-2 font-bold underline">Tentar novamente</button></div>}
			{loading && <p className="mt-6 rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500" role="status">A carregar pagamentos...</p>}
			{!loading && !error && payments.length === 0 && <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center"><ReceiptText className="mx-auto h-8 w-8 text-slate-400" /><h2 className="mt-4 font-bold text-primary">Ainda não há pagamentos registados</h2><p className="mt-2 text-sm text-slate-500">Os movimentos aparecerão aqui quando um gateway de pagamento seguro estiver configurado.</p></div>}
			{!loading && !error && payments.length > 0 && <section className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white" aria-label="Histórico de pagamentos"><div className="divide-y divide-slate-100">{payments.map((payment) => <article key={payment.id} className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-primary">Pagamento · {payment.request_id.slice(0, 8).toUpperCase()}</p><p className="mt-1 text-sm text-slate-500">{new Date(payment.created_at).toLocaleString("pt-PT")}</p></div><div className="flex items-center gap-4"><span className="text-sm font-semibold text-slate-600">{paymentStatus[payment.status] ?? payment.status}</span><span className="font-bold text-primary">{formatMoney(payment.amount, payment.currency)}</span></div></article>)}</div></section>}
		</div>
	);
}

function SummaryCard({ title, value, icon }) {
	return <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><p className="text-sm text-slate-500">{title}</p>{icon}</div><p className="mt-3 text-2xl font-bold text-primary">{value}</p></div>;
}

export default Payments;