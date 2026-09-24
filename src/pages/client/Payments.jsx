import { useState } from "react";
import { CheckCircle2, CreditCard, FileText, ReceiptText } from "lucide-react";
import MpesaIcon from "../../assets/icons/mpesa.svg";
import EmolaIcon from "../../assets/icons/emola.svg";
import CardPaymentIcon from "../../assets/icons/card-payment.svg";

function Payments() {
	const [method, setMethod] = useState("mpesa");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		setSubmitted(true);
	};

	return (
		<div>
			<header>
				<p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Área financeira</p>
				<h1 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">Pagamentos</h1>
				<p className="mt-2 text-slate-500">Consulte os pagamentos e faturas dos seus serviços.</p>
			</header>

			<section className="mt-8 grid gap-4 sm:grid-cols-3" aria-label="Resumo dos pagamentos">
				<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<div className="flex items-center justify-between">
						<p className="text-sm text-slate-500">Total pago</p>
						<ReceiptText className="h-5 w-5 text-emerald-600" />
					</div>
					<p className="mt-3 text-3xl font-bold text-primary">0,00 MT</p>
				</div>
				<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<div className="flex items-center justify-between">
						<p className="text-sm text-slate-500">Por pagar</p>
						<CreditCard className="h-5 w-5 text-amber-600" />
					</div>
					<p className="mt-3 text-3xl font-bold text-primary">1 500,00 MT</p>
				</div>
				<div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
					<div className="flex items-center justify-between">
						<p className="text-sm text-slate-500">Faturas</p>
						<FileText className="h-5 w-5 text-secondary" />
					</div>
					<p className="mt-3 text-3xl font-bold text-primary">0</p>
				</div>
			</section>

			<section className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
				<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
					<div className="flex items-start justify-between gap-4">
						<div>
							<p className="text-sm font-bold uppercase tracking-[0.14em] text-secondary">Pagamento pendente</p>
							<h2 className="mt-2 text-xl font-bold text-primary">Pedido de suporte #0001</h2>
						</div>
						<span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">Por pagar</span>
					</div>
					<div className="mt-6 border-t border-slate-100 pt-5">
						<div className="flex justify-between text-sm text-slate-500"><span>Serviço de suporte</span><span>1 500,00 MT</span></div>
						<div className="mt-3 flex justify-between text-lg font-bold text-primary"><span>Total</span><span>1 500,00 MT</span></div>
					</div>
				</div>

				<div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
					{submitted ? (
						<div className="py-8 text-center">
							<CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
							<h2 className="mt-4 text-xl font-bold text-primary">Pedido de pagamento enviado</h2>
							<p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">A confirmação será apresentada aqui quando a integração com o provedor de pagamentos estiver ativa.</p>
						</div>
					) : (
						<form onSubmit={handleSubmit}>
							<h2 className="text-xl font-bold text-primary">Escolha como pagar</h2>
							<p className="mt-2 text-sm text-slate-500">Selecione um método para continuar.</p>
							<div className="mt-5 grid gap-3 sm:grid-cols-3">
								{[
									{ id: "mpesa", label: "M-Pesa", icon: MpesaIcon },
									{ id: "emola", label: "e-Mola", icon: EmolaIcon },
									{ id: "card", label: "Cartão", icon: CardPaymentIcon },
								].map(({ id, label, icon: Icon }) => (
									<button key={id} type="button" onClick={() => setMethod(id)} className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-sm font-bold transition ${method === id ? "border-secondary bg-sky-50 text-secondary" : "border-slate-200 text-slate-600 hover:bg-slate-50"}`}>
										<img src={Icon} alt="" className="h-8 w-8" />
										{label}
									</button>
								))}
							</div>
							<label className="mt-5 block text-sm font-semibold text-slate-700" htmlFor="payment-contact">
								{method === "card" ? "Número do cartão" : "Número de telefone"}
							</label>
							<input id="payment-contact" type={method === "card" ? "text" : "tel"} required placeholder={method === "card" ? "0000 0000 0000 0000" : "+258 84 000 0000"} className="mt-2 h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:border-secondary focus:bg-white focus:ring-4 focus:ring-secondary/10" />
							<button type="submit" className="mt-5 h-12 w-full rounded-xl bg-primary text-sm font-bold text-white transition hover:bg-secondary">Continuar pagamento</button>
							<p className="mt-3 text-center text-xs text-slate-400">Modo de demonstração: nenhum valor será debitado.</p>
						</form>
					)}
				</div>
			</section>
		</div>
	);
}

export default Payments;
